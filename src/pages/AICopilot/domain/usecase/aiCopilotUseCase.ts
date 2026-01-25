import { ChatMessage } from '../entities/ChatMessage';
import { AICopilotRepository } from '../repositories/aiCopilotRepository';

export const aiCopilotUseCase =
  (repo: AICopilotRepository) =>
  async (
    conversation: ChatMessage[],
    userInput: string,
  ): Promise<ChatMessage[]> => {

    const updatedConversation: ChatMessage[] = [
      ...conversation,
      {
        role: 'user', // ✅ now typed correctly
        content: userInput,
      },
    ];

    const aiReply: ChatMessage = await repo.sendMessage(
      updatedConversation,
    );

    return [
      ...updatedConversation,
      {
        role: aiReply.role,      // must be 'assistant'
        content: aiReply.content,
      },
    ];
  };
