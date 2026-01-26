import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

    header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    },

    headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
    },

  headerStatus: {
    marginTop: 4,
    fontSize: 12,
  },

  list: {
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },

  rowReverse: {
    flexDirection: 'row-reverse',
  },

  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },

  userBubble: {
    backgroundColor: '#5146e625',
  },

  aiBubble: {
    backgroundColor: '#EEE',
  },

  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#5146e625',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  sendBtn: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 20,
  },

  stopBtn: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 20,
  },

  sendText: {
    color: 'white',
  },
});
