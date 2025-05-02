// hooks/UserAuth.ts
"use client"

import {  useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {Role } from "../models/role";
import { RoleService } from "../service/RoleService";
import { queryClient } from "../providers/providers";

const roleService = new RoleService();

export function useGetRole() {
  return useSuspenseQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: () => roleService.get(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnReconnect: false,
  });
}

  export function useCreateRole() {
    return useMutation({
      mutationFn: (rol: Role) => new RoleService().createRole(rol),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      },
    })
  };
export function useUpdateRole() {
    return useMutation({
      mutationFn: (rol: Role) => new RoleService().updateRol(rol),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      },
    })
  };
export function useDeleteRole() {
    return useMutation({
      mutationFn: (rolId: number) => new RoleService().deleteRol(rolId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      },
    })
  }
