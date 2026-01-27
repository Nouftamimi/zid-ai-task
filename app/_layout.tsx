import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { initI18n } from '@/src/i18n';
import { setupInterceptors } from '@/src/lib/interceptors';
import { initNotifications } from '@/src/notifications';

setupInterceptors();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
    initNotifications();
  }, []);

  if (!ready) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
