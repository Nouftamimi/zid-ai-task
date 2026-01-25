import { AICopilotRepository } from '../domain/repositories/aiCopilotRepository';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { getAIContext } from './aiContextProvider';
import { formatAIContext } from './formatAIContext';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export const aiCopilotRepositoryImpl: AICopilotRepository = {
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

      You can:
      - Answer questions about orders and products
      - Provide business insights
      - Execute actions via structured JSON responses

      Here is the current store data:
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
};
