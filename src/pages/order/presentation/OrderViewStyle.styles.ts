import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    fullView: {
        paddingTop: 70,
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#F9FAFB',
    },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  id: {
    fontWeight: '600',
  },
  status: {
    marginTop: 6,
    fontSize: 12,
    color: '#6366F1',
  },
  total: {
    fontWeight: '700',
    fontSize: 16,
  },
  emptyText: {
  textAlign: 'center',
  marginTop: 40,
  color: '#888',
  fontSize: 15,
},
});
