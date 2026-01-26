import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import { ChatMessage } from '../domain/entities/ChatMessage';
import { aiCopilotUseCase } from '../domain/usecase/aiCopilotUseCase';
import { aiCopilotRepositoryImpl } from '../data/aiCopilotRepositoryImpl';
import { styles } from './aiCopilotViewStyle.styles';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function AICopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const updatedMessages = await aiCopilotUseCase(
        aiCopilotRepositoryImpl
      )(messages, userMessage.content);

      setMessages(updatedMessages);
    } catch (e: any) {
      // ✅ Extract readable error message
      const errorMessage =
        e?.message ||
        e?.error?.message ||
        t('errorMsg');


      Alert.alert(
        'AI Copilot',
        errorMessage,
        [{ text: 'OK' }],
        { cancelable: true }
      );

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
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isUser = item.role === 'user';

          return (
            <View style={[styles.row, isUser && styles.rowReverse]}>
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
          placeholder={loading ? t('AIisthinking') : t('Typeyourmessage')}
          editable={!loading}
          style={styles.input}
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
