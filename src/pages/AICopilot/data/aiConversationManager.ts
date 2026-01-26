import { ChatMessage } from '../domain/entities/ChatMessage';

const MAX_MESSAGES = 12; // 👈 important

export const buildConversationContext = (
  conversation: ChatMessage[],
  userInput: string,
): ChatMessage[] => {
  const updated: ChatMessage[] = [
    ...conversation,
    { role: 'user', content: userInput },
  ];

  // Keep only the last N messages
  return updated.slice(-MAX_MESSAGES);
};
