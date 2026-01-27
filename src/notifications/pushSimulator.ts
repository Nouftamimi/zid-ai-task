// app/notifications/pushSimulator.ts
import * as Notifications from 'expo-notifications';

export function simulateOrderUpdate(orderId: string) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Update 📦",
      body: `Order ${orderId} has been shipped`,
    },
    trigger: {
      type: 'timeInterval',
      seconds: 2,
      repeats: false,
    } as Notifications.NotificationTriggerInput,
  });
}

export function simulateLowStock(productName: string) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Low Stock ⚠️",
      body: `${productName} is running low`,
    },
    trigger: {
      type: 'timeInterval',
      seconds: 2,
      repeats: false,
    } as Notifications.NotificationTriggerInput,
  });
}
