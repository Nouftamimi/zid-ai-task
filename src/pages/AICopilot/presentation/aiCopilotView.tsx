import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { useRef, useState } from 'react';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { aiCopilotStreamUseCase } from '../domain/usecase/aiCopilotStreamUseCase';
import { aiCopilotRepositoryImpl } from '../data/aiCopilotRepositoryImpl';

export default function AICopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const send = async () => {
    if (!input.trim() || streaming) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
    };

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: '',
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await aiCopilotStreamUseCase(aiCopilotRepositoryImpl)(
        messages,
        userMessage.content,
        chunk => {
          setMessages(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];

            if (last.role === 'assistant') {
              last.content += chunk;
            }

            return [...updated];
          });
        },
        controller.signal,
      );
    } catch (e) {
      // aborted or failed
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setStreaming(false);
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

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={{ flex: 1, borderWidth: 1, padding: 8 }}
        />

        {!streaming ? (
          <Pressable onPress={send}>
            <Text>Send</Text>
          </Pressable>
        ) : (
          <Pressable onPress={stop}>
            <Text style={{ color: 'red' }}>Stop</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
