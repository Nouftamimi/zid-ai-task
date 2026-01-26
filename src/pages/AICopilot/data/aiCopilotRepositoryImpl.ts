import { AICopilotRepository } from '../domain/repositories/aiCopilotRepository';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { getAIContext } from './aiContextProvider';
import { formatAIContext } from './formatAIContext';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export const aiCopilotRepositoryImpl: AICopilotRepository & {
  streamMessage?: (
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    signal: AbortSignal,
  ) => Promise<void>;
} = {
  // ✅ EXISTING METHOD (UNCHANGED)
  async sendMessage(messages: ChatMessage[]) {
    const { orders, products } = getAIContext();
    const businessContext = formatAIContext(orders, products);

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
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
                You can:
              - Provide business insights
              - You remember conversation context.
              - You NEVER show JSON to the user.

            Store data:
            ${businessContext}
            `,
          },
          ...messages,
        ],
      }),
    });

    const json = await response.json();

    return {
      role: 'assistant',
      content: json.choices[0].message.content,
    };
  },

  // 🆕 ADD THIS — STREAMING SUPPORT
  async streamMessage(
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    signal: AbortSignal,
  ) {
    const { orders, products } = getAIContext();
    const businessContext = formatAIContext(orders, products);

    const response = await fetch(OPENAI_URL, {
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
                You can:
              - Provide business insights
              - You remember conversation context.
              - You NEVER show JSON to the user.

            Store data:
            ${businessContext}
            `,
          },
          ...messages,
        ],
      }),
      signal,
    });

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

          if (token) {
            onChunk(token);
          }
        } catch {
          // ignore
        }
      }
    }
  },
};
