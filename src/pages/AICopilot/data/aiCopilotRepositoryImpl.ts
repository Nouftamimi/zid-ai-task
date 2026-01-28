import { AICopilotRepository } from '../domain/repositories/aiCopilotRepository';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { getAIContext } from './aiContextProvider';
import { formatAIContext } from './formatAIContext';
import { endpoints } from '../../../lib/endpoints';
import { apiClient } from '@/src/lib/apiClient';
import { realm } from '@/src/database';
import { v4 as uuid } from 'uuid';

export const aiCopilotRepositoryImpl: AICopilotRepository & {
  streamMessage?: (
    messages: ChatMessage[],
    onChunk: (text: string) => void,
    signal: AbortSignal,
  ) => Promise<void>;
} = {

async sendMessage(messages: ChatMessage[]) {

  const lastUserMessage = messages[messages.length - 1];

  realm.write(() => {
    realm.create("ChatMessage", {
      _id: Date.now().toString(),
      role: lastUserMessage.role,
      content: lastUserMessage.content,
      updatedAt: new Date(),
    });
  });

  const { orders, products } = getAIContext();
  const businessContext = formatAIContext(orders, products);

  const { data } = await apiClient.post<OpenAIResponse>(
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
    }
  );

  const aiMessage: ChatMessage = {
    role: 'assistant',
    content: data.choices[0].message.content,
  };

  realm.write(() => {
    realm.create("ChatMessage", {
      _id: Date.now().toString(),
      role: aiMessage.role,
      content: aiMessage.content,
      updatedAt: new Date(),
    });
  });

  return aiMessage;
}


};
