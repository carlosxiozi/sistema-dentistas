"use client";

import {  useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Historial} from "@/src/app/models/historial";
import { HistorialService } from "../service/Historial";
const historialServiceInstance = new HistorialService();

export function useGet() {
    return useSuspenseQuery<Historial[], Error>({
      queryKey: ["hisorial"],
      queryFn: new HistorialService().get,
    });
  }
export function useCreateHistorial() {
  const queryClient = useQueryClient(); // ✅ debe estar DENTRO del hook
  return useMutation({
    mutationFn: (historial: Historial) => historialServiceInstance.create(historial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hisorial"] });
    },
  });
}

export function UseUpdateHistorial() {
  const queryClient = useQueryClient(); // ✅ también aquí dentro
  return useMutation({
    mutationFn: (historial: Historial) => historialServiceInstance.update(historial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hisorial"] });
    },
  });
}

export function UseDeleteHistorial() {
  const queryClient = useQueryClient(); // ✅ también aquí dentro
  return useMutation({
    mutationFn: (id: number) => historialServiceInstance.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hisorial"] });
    },
  });
}

