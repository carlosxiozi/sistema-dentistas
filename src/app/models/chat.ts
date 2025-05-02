export interface chatMessage {
    id: number;
    user_id: number;
    message: string;
    created_at: string;
    updated_at: string;
    }

export interface chatResponse {
    type: string;
    message: string;
    chat: chatMessage[];
    }