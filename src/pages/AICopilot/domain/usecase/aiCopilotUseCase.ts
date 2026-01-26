import { ChatMessage } from '../entities/ChatMessage';
import { AICopilotRepository } from '../repositories/aiCopilotRepository';
import { buildConversationContext } from '../../data/aiConversationManager';
import { parseAIAction } from '../../../../utils/parseAIAction';
import { executeAIAction } from '../../data/aiActionExecutor';

export const aiCopilotUseCase =
  (repo: AICopilotRepository) =>
  async (
    conversation: ChatMessage[],
    userInput: string,
  ): Promise<ChatMessage[]> => {

    // 1️⃣ Build bounded conversation context
    const context = buildConversationContext(
      conversation,
      userInput,
    );

    // 2️⃣ Send to AI
    const aiReply = await repo.sendMessage(context);

    // 3️⃣ Try to parse action
    const action = parseAIAction(aiReply.content);

    // 4️⃣ If action → execute it and replace message
    if (action) {
      const resultText = await executeAIAction(action);

      return [
        ...context,
        {
          role: 'assistant',
          content: resultText, // ✅ HUMAN MESSAGE ONLY
        },
      ];
    }

    // 5️⃣ Normal chat response
    return [
      ...context,
      {
        role: 'assistant',
        content: aiReply.content,
      },
    ];
  };
