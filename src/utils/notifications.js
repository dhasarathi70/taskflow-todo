const NOTIFICATION_KEY = "taskflow_notifications_enabled";

export const isNotificationSupported = () => {
  return "Notification" in window;
};

export const getNotificationPermission = () => {
  if (!isNotificationSupported()) {
    return "unsupported";
  }

  return Notification.permission;
};

export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    localStorage.setItem(NOTIFICATION_KEY, "true");
    return "granted";
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    localStorage.setItem(NOTIFICATION_KEY, "true");
  }

  return permission;
};

export const sendNotification = (title, options = {}) => {
  if (!isNotificationSupported()) {
    return;
  }

  if (Notification.permission !== "granted") {
    return;
  }

  new Notification(title, {
    icon: "/favicon.ico",
    ...options,
  });
};

export const notificationsEnabled = () => {
  return localStorage.getItem(NOTIFICATION_KEY) === "true";
};