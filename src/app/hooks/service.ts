// hooks/UserAuth.ts
"use client"

import {  useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {Service } from "../models/service";
import { ServiceService } from "../service/useService";
import { queryClient } from "../providers/providers";

export function useGetService() {
    return useSuspenseQuery<Service[], Error>({
      queryKey: ["services"],
      queryFn: new ServiceService().get,
    });
  }
  export function useCreateService() {
    return useMutation({
      mutationFn: (service: Service) => new ServiceService().createService(service),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
    })
  };
export function useUpdateService() {
    return useMutation({
      mutationFn: (service: Service) => new ServiceService().updateService(service),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
    })
  };
export function useDeletesService() {
    return useMutation({
      mutationFn: (rolId: number) => new ServiceService().deleteService(rolId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
    })
  }
