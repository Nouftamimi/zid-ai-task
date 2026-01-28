import React from 'react';
import { I18nManager, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  size?: number;
  color?: string;
};

export const BackArrow = ({
  onPress,
  size = 22,
  color = '#222',
}: Props) => {
  const iconName = I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
};
