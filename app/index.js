import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme';

const features = [
  { title: 'Câmera', detail: 'Capture uma foto', icon: 'camera-outline', route: '/camera', color: colors.teal },
  { title: 'Acelerômetro', detail: 'Incline o tablet', icon: 'axis-arrow', route: '/acelerometro', color: colors.coral },
  { title: 'GPS', detail: 'Veja sua localização', icon: 'map-marker-outline', route: '/gps', color: '#356B9A' },
  { title: 'Áudio', detail: 'Grave e reproduza', icon: 'microphone-outline', route: '/audio', color: '#A27514' },
  { title: 'Notificação', detail: 'Agende um lembrete', icon: 'bell-outline', route: '/notificacao', color: '#725A88' },
];

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>LABORATÓRIO MOBILE</Text>
        <Text style={styles.title}>Sensores{'\n'}em ação.</Text>
        <Text style={styles.description}>Uma demonstração prática dos recursos do seu tablet.</Text>
      </View>
      <View style={styles.grid}>
        {features.map((feature) => (
          <Link key={feature.route} href={feature.route} asChild onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}); }}>
            <TouchableOpacity accessibilityRole="button" style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: feature.color }]}>
                <MaterialCommunityIcons name={feature.icon} size={27} color={colors.white} />
              </View>
              <View style={styles.copy}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.detail}>{feature.detail}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      <Text style={styles.footer}>PROJETO ESCOLAR  /  EXPO GO</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, backgroundColor: colors.paper, padding: 28, paddingTop: 44, width: '100%', maxWidth: 1000, alignSelf: 'center' },
  heading: { marginBottom: 28 },
  eyebrow: { color: colors.teal, fontWeight: '800', fontSize: 13, marginBottom: 12 },
  title: { color: colors.ink, fontSize: 42, lineHeight: 48, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 18, marginTop: 12, lineHeight: 26 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  card: { flexGrow: 1, flexBasis: 290, minHeight: 100, borderRadius: 13, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconBox: { width: 54, height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  detail: { color: colors.muted, fontSize: 14, marginTop: 4 },
  arrow: { fontSize: 30, color: colors.muted },
  footer: { color: colors.muted, fontSize: 12, fontWeight: '700', marginTop: 30 },
});