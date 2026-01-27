import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function initNotifications() {
  // Show notifications even when app is foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Ask permission
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } =
      await Notifications.requestPermissionsAsync();

    if (newStatus !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      }
    );
  }
}
