export interface Notification {
   id: number;
    user_id: number;
    title: string;
    message: string;
    isRead?: boolean | null;
    created_at: string;
    updated_at: string;
} export interface NotificationResponse {
    type: string;
    message: string;
    notifications: Notification[];
} export interface NotificationCreateResponse {
    type: string;
    message: string;
    notification: Notification;
} export interface NotificationUpdateResponse {
    type: string;
    message: string;
    notification: Notification;
} export interface NotificationDeleteResponse {
    type: string;
    message: string;
} export interface NotificationMarkAsReadResponse {
    type: string;
    message: string;
} export interface NotificationMarkAsUnreadResponse {
    type: string;
    message: string;
}