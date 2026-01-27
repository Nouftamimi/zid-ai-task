import { aiCopilotUseCase } from '../aiCopilotUseCase';
import { ChatMessage } from '../../entities/ChatMessage';
import { AICopilotRepository } from '../../repositories/aiCopilotRepository';

describe('aiCopilotUseCase', () => {
  it('executes AI action and returns human message', async () => {
    const mockRepo: AICopilotRepository = {
      sendMessage: async (_messages: ChatMessage[]) => ({
        role: 'assistant',
        content: JSON.stringify({
          action: 'MARK_ORDER_SHIPPED',
          orderId: 'ORD-1002',
        }),
      }),
    };

    const useCase = aiCopilotUseCase(mockRepo);

    const result = await useCase([], 'Mark order ORD-1002 as shipped');

    const lastMessage = result[result.length - 1];

    expect(lastMessage.role).toBe('assistant');
    expect(lastMessage.content).toContain('ORD-1002');
    expect(lastMessage.content).toContain('shipped');
    expect(lastMessage.content).not.toContain('{');
  });

  it('returns normal AI text when no action', async () => {
    const mockRepo: AICopilotRepository = {
      sendMessage: async () => ({
        role: 'assistant',
        content: 'You have 5 pending orders today.',
      }),
    };

    const useCase = aiCopilotUseCase(mockRepo);

    const result = await useCase([], 'How many orders today?');

    expect(result[result.length - 1].content).toBe(
      'You have 5 pending orders today.',
    );
  });
});
