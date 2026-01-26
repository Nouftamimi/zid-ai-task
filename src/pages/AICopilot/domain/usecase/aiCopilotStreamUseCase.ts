import { ChatMessage } from '../entities/ChatMessage';
import { AICopilotRepository } from '../repositories/aiCopilotRepository';
import { buildConversationContext } from '../../data/aiConversationManager';

export const aiCopilotStreamUseCase =
  (repo: AICopilotRepository & {
    streamMessage?: (
      messages: ChatMessage[],
      onChunk: (text: string) => void,
      signal: AbortSignal
    ) => Promise<void>;
  }) =>
  async (
    conversation: ChatMessage[],
    userInput: string,
    onChunk: (text: string) => void,
    signal: AbortSignal,
  ) => {

    // 1️⃣ Build bounded conversation
    const context = buildConversationContext(
      conversation,
      userInput,
    );

    if (!repo.streamMessage) {
      throw new Error('Streaming not supported by repository');
    }

    // 2️⃣ Stream from repo
    await repo.streamMessage(
      context,
      onChunk,
      signal,
    );

    // 3️⃣ Final assistant message is built in the View
    return context;
  };
