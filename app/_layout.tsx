// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { initI18n } from '@/src/i18n';
import { setupInterceptors } from '@/src/lib/interceptors';
setupInterceptors();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (!ready) return null; // ⛔ no flicker

  return <Stack screenOptions={{ headerShown: false }} />;
}
