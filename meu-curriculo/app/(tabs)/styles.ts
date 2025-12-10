import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // --- Cabeçalho Principal ---
  header: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 110,
    backgroundColor: '#2563EB',
    opacity: 0.9,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  avatar: {
  width: 80,
  height: 80,
  borderRadius: 40, // metade do tamanho → deixa redondo
}
,
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  role: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // --- Redes Sociais ---
  socialRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
  },
  socialBtn: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 50,
  },

  // --- Área de Conteúdo ---
  content: {
    paddingHorizontal: 20,
    gap: 16, // Espaço entre os acordeões
  },

  // --- Estilos do Acordeão (Accordion) ---
  accordionContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  accordionBody: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FAFAFA', // Cor levemente diferente para o conteúdo
  },

  // --- Componentes Internos (Cards, Badges, Textos) ---
  textBlock: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  badgeText: {
    fontSize: 12,
    color: '#1D4ED8',
    fontWeight: '500',
  },
  softBadge: {
    backgroundColor: '#ECFDF5',
    borderColor: '#D1FAE5',
  },
  softBadgeText: {
    color: '#059669',
  },
});