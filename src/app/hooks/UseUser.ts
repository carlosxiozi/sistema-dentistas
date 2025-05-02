// hooks/UserAuth.ts
"use client"

import {  useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {User } from "../models/user";
import { UserService } from "../service/UserService";
import { queryClient } from "../providers/providers";
import { Sessions } from "../models/Sessions";
export function useGetUser() {
    return useSuspenseQuery<User[], Error>({
      queryKey: ["users"],
      queryFn: new UserService().get,
    });
  }
  export function useCreateUser() {
    return useMutation({
      mutationFn: (user: User) => new UserService().createUser(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    })
  };
export function useUpdateUser() {
    return useMutation({
      mutationFn: (user: User) => new UserService().updateUser(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    })
  };
export function useDeleteUser() {
    return useMutation({
      mutationFn: (userId: number) => new UserService().deleteUser(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    })
  }
  export function useSyncUserRole() {
    return useMutation({
      mutationFn: ({ userId, role }: { userId: number; role: string }) => new UserService().syncUserRole(userId, role),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    })
  }
  export function useSyncPermissions() {
    return useMutation({
      mutationFn: ({ userId, permissions }: { userId: number; permissions: string[] }) => new UserService().syncPermissions(userId, permissions),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    })
  }
  export function useGetSessions(userId: number) {
    return useSuspenseQuery<Sessions[], Error>({
      queryKey: ["sessions", userId],
      queryFn: ({ queryKey }) => {
        const [, userId] = queryKey;
        return new UserService().getSessions(userId as number);
      },
    });
  }

  export function useDeleteSession() {
    return useMutation({
      mutationFn: (sesions: Sessions) => new UserService().deleteSession(sesions),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      },
    })
  }