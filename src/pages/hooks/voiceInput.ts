// app/hooks/useVoiceRecorder.ts
import { Audio } from 'expo-av';
import { useState } from 'react';

export function useVoiceRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const start = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    await rec.startAsync();

    setRecording(rec);
    setIsRecording(true);
  };

  const stop = async (): Promise<string | null> => {
    if (!recording) return null;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    setRecording(null);
    setIsRecording(false);

    return uri ?? null;
  };

  return { start, stop, isRecording };
}
