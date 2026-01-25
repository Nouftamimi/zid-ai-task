import { StyleSheet, I18nManager } from 'react-native';

export const styles = StyleSheet.create({
  fullView: {
    paddingTop: 70,
    flex: 1,
    paddingStart: 15,
    paddingEnd: 15,
    backgroundColor: '#F9FAFB',
  },

  header: {
    backgroundColor: '#6C4AF2',
    padding: 20,
    paddingTop: 60,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },

  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white',
    textAlign: 'auto',
  },

  headerSubtitle: {
    color: '#E0D9FF',
    marginTop: 4,
    textAlign: 'auto',
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  balanceCard: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceLabel: {
    color: '#E0D9FF',
    textAlign: 'auto',
  },

  balanceValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'auto',
  },

  balanceBadge: {
    backgroundColor: '#6EE7B7',
    paddingStart: 12,
    paddingEnd: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#065F46',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: -30,
    paddingStart: 16,
    paddingEnd: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'auto',
  },

  content: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 40,
  },

  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
    overflow: 'hidden',
  },

  langSwitcher: {
    flexDirection: 'row',
    gap: 8,
  },

  langButton: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
  },

  langText: {
    fontWeight: '600',
    color: '#4F46E5',
  },
});
