import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  icon: {
    fontSize: 20,
  },

  title: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },

  value: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },

  change: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },

  sub: {
    fontWeight: '400',
    color: '#9CA3AF',
  },
});
