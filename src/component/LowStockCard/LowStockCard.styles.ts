import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },

  criticalBorder: {
    borderColor: '#FCA5A5',
  },

  lowBorder: {
    borderColor: '#FCD34D',
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  criticalIconBg: {
    backgroundColor: '#FEE2E2',
  },

  lowIconBg: {
    backgroundColor: '#FEF3C7',
  },

  icon: {
    fontSize: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
  },

  sku: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  stockText: {
    fontSize: 13,
    color: '#374151',
  },

  stockNumber: {
    fontWeight: '600',
    color: '#DC2626',
  },

  reorder: {
    color: '#6366F1',
    fontWeight: '600',
    fontSize: 13,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  criticalBadge: {
    backgroundColor: '#FEE2E2',
  },

  lowBadge: {
    backgroundColor: '#FEF3C7',
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  criticalText: {
    color: '#DC2626',
  },

  lowText: {
    color: '#D97706',
  },
});
