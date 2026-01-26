import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { aiCopilotStreamUseCase } from '../domain/usecase/aiCopilotStreamUseCase';
import { aiCopilotRepositoryImpl } from '../data/aiCopilotRepositoryImpl';
import { styles } from './aiCopilotViewStyle.styles';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function AICopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const { t } = useTranslation();
  const navigation = useNavigation();

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
    } catch (e: any) {
      // 👇 This is the key line
      if (e.name !== 'AbortError') {
        console.error(e);
      }
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
    <View style={styles.container}>
      
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#222" />
      </Pressable>

      <Text style={styles.headerTitle}>{t('AICopilot')}</Text>
    </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isUser = item.role === 'user';

          return (
            <View
              style={[
                styles.row,
                isUser && styles.rowReverse,
              ]}
            >
              {!isUser && (
                <View style={styles.aiAvatar}>
                  <Text style={{ color: 'white', fontSize: 12 }}>AI</Text>
                </View>
              )}

              <View
                style={[
                  styles.bubble,
                  isUser ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text>{item.content}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={streaming ? t('AIisthinking') : t('Typeyourmessage')}
          editable={!streaming}
          style={styles.input}
        />

        {!streaming ? (
          <Pressable onPress={send} style={styles.sendBtn}>
            <Ionicons name="send" size={13} color="white" />
          </Pressable>
        ) : (
          <Pressable onPress={stop} style={styles.stopBtn}>
            <Text style={styles.sendText}>■</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
