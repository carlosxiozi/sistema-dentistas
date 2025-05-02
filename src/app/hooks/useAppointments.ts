// hooks/UserAuth.ts
"use client"

import {  useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { Appointment } from '../models/appointments';
import { queryClient } from "../providers/providers";
import { AppointmentsService } from "../service/AppoinmentsService";

export function useGetAppointments() {
    return useSuspenseQuery<Appointment[], Error>({
      queryKey: ["appointments"],
      queryFn: new AppointmentsService().get,
    });
  }
  export function useCreateAppointments() {
    return useMutation({
      mutationFn: (appointment: Appointment) => new AppointmentsService().createAppointments(appointment),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
    })
  };
export function useUpdateAppointments() {
    return useMutation({
      mutationFn: (appointment: Appointment) => new AppointmentsService().updateAppointments(appointment),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
    })
  };
export function useDeleteRole() {
    return useMutation({
      mutationFn: (appointmentId: number) => new AppointmentsService().deleteAppointments(appointmentId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
    })
  }
