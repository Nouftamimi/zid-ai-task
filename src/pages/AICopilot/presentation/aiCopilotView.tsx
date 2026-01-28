import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { aiCopilotUseCase } from '../domain/usecase/aiCopilotUseCase';
import { aiCopilotRepositoryImpl } from '../data/aiCopilotRepositoryImpl';
import { styles } from './aiCopilotViewStyle.styles';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import TypingIndicator from '../../../component/TypingDots/TypingDots';
import { realm } from '@/src/database';

export default function AICopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);

  /** Load stored messages */
  useEffect(() => {
    const stored = realm
      .objects<ChatMessage>('ChatMessage')
      .sorted('updatedAt');

    setMessages(JSON.parse(JSON.stringify(stored)));
  }, []);

  /** Send message */
  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
    };

    const typingMessage: ChatMessage = {
      role: 'assistant',
      content: '',
    };

    setMessages(prev => [...prev, userMessage, typingMessage]);
    setInput('');
    setLoading(true);

    try {
      const updatedMessages = await aiCopilotUseCase(
        aiCopilotRepositoryImpl
      )(messages, userMessage.content);

      setMessages(updatedMessages);
    } catch (e: any) {
      const errorMessage =
        e?.message ||
        e?.response?.data?.error?.message ||
        t('errorMsg');

      Alert.alert('AI Copilot', errorMessage, [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#222" />
        </Pressable>
        <Text style={styles.headerTitle}>{t('AICopilot')}</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        keyboardDismissMode="on-drag"
        onLayout={() =>
          flatListRef.current?.scrollToEnd({ animated: false })
        }
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => {
          const isUser = item.role === 'user';

          return (
            <View style={[styles.row, isUser && styles.rowReverse]}>
              {!isUser && (
                <View style={styles.aiAvatar}>
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    AI
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.bubble,
                  isUser ? styles.userBubble : styles.aiBubble,
                ]}
              >
                {item.role === 'assistant' &&
                loading &&
                item === messages[messages.length - 1] &&
                item.content === '' ? (
                  <TypingIndicator />
                ) : (
                  <Text>{item.content}</Text>
                )}
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
          placeholder={
            loading ? t('AIisthinking') : t('Typeyourmessage')
          }
          editable={!loading}
          style={styles.input}
          multiline
        />

        <Pressable
          onPress={send}
          style={[
            styles.sendBtn,
            loading && { opacity: 0.5 },
          ]}
        >
          <Ionicons name="send" size={13} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
