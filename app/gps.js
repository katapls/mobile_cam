import { useState } from 'react';
import { Linking, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import { ActionButton, ErrorMessage, Panel, Screen } from '../components/Screen';
import { colors } from '../theme';

export default function GpsScreen() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function getLocation() {
    setLoading(true);
    setError('');
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setError('Permissão de localização negada. Ative-a nas configurações do tablet para usar o GPS.');
        return;
      }
      const result = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setPosition(result);
    } catch (_) { setError('Não foi possível obter a localização. Verifique se o GPS está ligado e tente novamente.'); }
    finally { setLoading(false); }
  }

  return (
    <Screen title="Localização GPS" description="Solicite sua posição atual enquanto usa o aplicativo.">
      <ActionButton title={loading ? 'Buscando localização…' : 'Obter localização'} icon="crosshairs-gps" disabled={loading} onPress={getLocation} />
      <ErrorMessage>{error}</ErrorMessage>
      {position && <Panel style={styles.panel}>
        <Text style={styles.label}>LATITUDE</Text><Text style={styles.value}>{position.coords.latitude.toFixed(6)}</Text>
        <Text style={styles.label}>LONGITUDE</Text><Text style={styles.value}>{position.coords.longitude.toFixed(6)}</Text>
        <Text style={styles.label}>PRECISÃO</Text><Text style={styles.value}>{Math.round(position.coords.accuracy ?? 0)} m</Text>
        <ActionButton title="Abrir no Google Maps" icon="map-outline" secondary onPress={async () => {
          const url = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`;
          try { await Linking.openURL(url); } catch (_) { setError('Não foi possível abrir o Google Maps neste tablet.'); }
        }} style={styles.mapButton} />
      </Panel>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: { marginTop: 20 },
  label: { color: colors.muted, fontSize: 12, fontWeight: '800', marginTop: 12 },
  value: { color: colors.ink, fontSize: 21, fontWeight: '700', marginTop: 3 },
  mapButton: { marginTop: 20 },
});