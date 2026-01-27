import { Animated, View } from 'react-native';
import { useEffect, useRef } from 'react';

export default function TypingIndicator() {
  const dots = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];

  useEffect(() => {
    Animated.loop(
      Animated.stagger(
        60,
        dots.map(dot =>
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1.5,
              duration: 130, 
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 1,
              duration: 130,
              useNativeDriver: true,
            }),
          ])
        )
      )
    ).start();
  }, []);

  return (
    <View style={{ flexDirection: 'row' }}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            marginHorizontal: 3,
            backgroundColor: '#555',
            transform: [{ scale: dot }],
          }}
        />
      ))}
    </View>
  );
}
