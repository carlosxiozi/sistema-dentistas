"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "@/src/app/service/Chat";
import { chatMessage, chatResponse } from "@/src/app/models/chat";

const chatService = new ChatService();

export function useGetChat() {
  return useQuery<chatResponse, Error>({
    queryKey: ["chats"],
    queryFn: async () => {
      const messages = await chatService.get();
      return { type: "success", message: "Fetched successfully", chat: messages };
    },
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient(); // ✅ debe estar DENTRO del hook

  return useMutation({
    mutationFn: (chat: chatMessage) => chatService.create(chat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function UseUpdateChat() {
  const queryClient = useQueryClient(); // ✅ también aquí dentro

  return useMutation({
    mutationFn: (chat: chatMessage) => chatService.update(chat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function UseDeleteChat() {
  const queryClient = useQueryClient(); // ✅ también aquí dentro

  return useMutation({
    mutationFn: (id: number) => chatService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}
