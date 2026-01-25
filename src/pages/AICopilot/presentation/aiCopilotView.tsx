import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { aiCopilotUseCase } from '../domain/usecase/aiCopilotUseCase';
import { aiCopilotRepositoryImpl } from '../data/aiCopilotRepositoryImpl';

export default function AICopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const updated = await aiCopilotUseCase(aiCopilotRepositoryImpl)(
      messages,
      input,
    );

    setMessages(updated);
    setInput('');
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
              marginVertical: 6,
            }}
          >
            {item.content}
          </Text>
        )}
      />

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={{ flex: 1, borderWidth: 1, padding: 8 }}
        />
        <Pressable onPress={send}>
          <Text>{loading ? '...' : 'Send'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
 