import { StyleSheet } from 'react-native';

export const resultScreenStyles = StyleSheet.create({
  screen: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#eef2f7',
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
    backgroundColor: '#f5f3ff',
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#071b70',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: '#071b70',
    fontSize: 30,
    fontWeight: '900',
  },
  copy: {
    color: '#525252',
    fontSize: 16,
    lineHeight: 22,
  },
  weatherBox: {
    gap: 4,
    borderWidth: 1,
    borderColor: '#bae6fd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  boxLabel: {
    color: '#737373',
    fontWeight: '800',
  },
  weatherValue: {
    color: '#38c7f3',
    fontSize: 30,
    fontWeight: '900',
  },
  answerBox: {
    gap: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
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
    backgroundColor: '#4f46e5',
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
    color: '#071b70',
    fontSize: 18,
    fontWeight: '900',
  },
  listTitle: {
    color: '#071b70',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  smallText: {
    color: '#737373',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyText: {
    color: '#737373',
    fontStyle: 'italic',
  },
});
