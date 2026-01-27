export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  _id?: string;
  role: ChatRole;
  content: string;
}
