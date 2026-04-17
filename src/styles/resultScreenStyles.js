import { StyleSheet } from 'react-native';

export const resultScreenStyles = StyleSheet.create({
  screen: {
    padding: 20,
    paddingBottom: 28,
  },
  headerContent: {
    gap: 14,
    marginBottom: 14,
  },
  cardItem: {
    marginBottom: 14,
  },
  hero: {
    gap: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    padding: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#111827',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '900',
  },
  copy: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 22,
  },
  weatherBox: {
    gap: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  boxLabel: {
    color: '#6b7280',
    fontWeight: '800',
  },
  weatherValue: {
    color: '#2563eb',
    fontSize: 30,
    fontWeight: '900',
  },
  answerBox: {
    gap: 10,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  answerIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: '900',
    lineHeight: 42,
    textAlign: 'center',
  },
  answerTitleGroup: {
    flex: 1,
    gap: 2,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '900',
  },
  listTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  smallText: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyText: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
});
