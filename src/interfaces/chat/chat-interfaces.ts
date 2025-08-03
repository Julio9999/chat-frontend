export interface ChatMessage {
  id?: number; // Optional for new messages
  message: string;
  timestamp: number;
}