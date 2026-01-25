import { View, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';

type Props = {
  placeholder?: string;
  onSearch: (text: string) => void;
  delay?: number;
};

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  delay = 400,
}: Props) {
  const [value, setValue] = useState('');
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return; // ⛔ skip first call
    }

    const handler = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <View
      style={{
        backgroundColor: '#f1f1f3',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
      }}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={{
          height: 44,
          fontSize: 14,
        }}
      />
    </View>
  );
}
