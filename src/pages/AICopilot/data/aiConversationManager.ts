import { ChatMessage } from '../domain/entities/ChatMessage';

const MAX_MESSAGES = 12;

export const buildConversationContext = (
  conversation: ChatMessage[],
  userInput: string,
): ChatMessage[] => {
  const updated: ChatMessage[] = [
    ...conversation,
    { role: 'user', content: userInput },
  ];

  return updated.slice(-MAX_MESSAGES);
};
