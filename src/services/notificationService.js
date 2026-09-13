import storageService from "./storageService";
import { STORAGE_KEYS } from "../utils/constants";

const notificationService = {
  sendNotification(farmerId, type, message, messageHi) {
    const notification = {
      id: `notif-${Date.now()}`,
      farmerId,
      type,
      message,
      messageHi: messageHi || message,
      sentAt: new Date().toISOString(),
      read: false,
    };

    const notifications = storageService.get(STORAGE_KEYS.NOTIFICATIONS) || [];
    notifications.unshift(notification);
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, notifications);

    return notification;
  },

  getNotifications(farmerId) {
    const notifications = storageService.get(STORAGE_KEYS.NOTIFICATIONS) || [];
    if (farmerId) {
      return notifications.filter((n) => n.farmerId === farmerId);
    }
    return notifications;
  },

  markAsRead(notifId) {
    let notifications = storageService.get(STORAGE_KEYS.NOTIFICATIONS) || [];
    notifications = notifications.map((n) =>
      n.id === notifId ? { ...n, read: true } : n
    );
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },

  getAllNotifications() {
    return storageService.get(STORAGE_KEYS.NOTIFICATIONS) || [];
  },
};

export default notificationService;