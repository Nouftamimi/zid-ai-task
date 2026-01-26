import { AICopilotRepository } from '../domain/repositories/aiCopilotRepository';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { getAIContext } from './aiContextProvider';
import { formatAIContext } from './formatAIContext';

import { HttpClient } from '../../../lib/api-client/httpClient';
import { endpoints } from '../../../lib/api-client/endpoints';

type OpenAIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export const aiCopilotRepositoryImpl: AICopilotRepository & {
  streamMessage?: (
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    signal: AbortSignal,
  ) => Promise<void>;
} = {

  async sendMessage(messages: ChatMessage[]) {
    const { orders, products } = getAIContext();
    const businessContext = formatAIContext(orders, products);

    const response = await HttpClient.post<OpenAIResponse>(
      endpoints.ai.chat,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
You are an AI Copilot for an ecommerce admin dashboard.

RULES:
- Answer ONLY based on store data
- NEVER show JSON to the user
- Respond with human-readable sentences

Store data:
${businessContext}
            `,
          },
          ...messages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    return {
      role: 'assistant',
      content: response.choices[0].message.content,
    };
  },

  // =========================
  // STREAMING (fetch stays)
  // =========================
  async streamMessage(
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    signal: AbortSignal,
  ) {
    const { orders, products } = getAIContext();
    const businessContext = formatAIContext(orders, products);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}${endpoints.ai.chat}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          stream: true,
          messages: [
            {
              role: 'system',
              content: `
You are an AI Copilot for an ecommerce admin dashboard.

RULES:
- Answer ONLY based on store data
- NEVER show JSON to the user
- Respond with human-readable sentences

Store data:
${businessContext}
              `,
            },
            ...messages,
          ],
        }),
        signal,
      }
    );

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('data:'));

      for (const line of lines) {
        if (line === 'data: [DONE]') return;

        try {
          const json = JSON.parse(line.replace('data:', '').trim());
          const token = json?.choices?.[0]?.delta?.content;
          if (token) onChunk(token);
        } catch {
          // ignore malformed chunks
        }
      }
    }
  },
};
