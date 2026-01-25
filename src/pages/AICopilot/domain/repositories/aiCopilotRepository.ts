import { ChatMessage } from '../entities/ChatMessage';

export interface AICopilotRepository {
  sendMessage(
    messages: ChatMessage[],
  ): Promise<ChatMessage>;
}
