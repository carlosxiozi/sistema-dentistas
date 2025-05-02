"use client"

import {  useSuspenseQuery } from "@tanstack/react-query";
import {Notification } from "../models/notifications";
import { NotificationService } from "../service/Notifications";

const notifacations = new NotificationService();

export function useGetNoti() {
  return useSuspenseQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: () => notifacations.get(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnReconnect: false,
  });
}