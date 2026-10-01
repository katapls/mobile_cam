import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';
import { Panel, Screen } from '../components/Screen';
import { colors } from '../theme';

export default function AccelerometerScreen() {
  const [values, setValues] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(setValues);
    return () => subscription.remove();
  }, []);

  const left = `${50 + Math.max(-1, Math.min(1, values.x)) * 38}%`;
  const top = `${50 + Math.max(-1, Math.min(1, values.y)) * 38}%`;

  return (
    <Screen title="Acelerômetro" description="Incline o tablet e acompanhe a resposta do sensor.">
      <Panel>
        <View style={styles.readings}>
          {['x', 'y', 'z'].map((axis) => <View key={axis} style={styles.reading}><Text style={styles.axis}>{axis.toUpperCase()}</Text><Text style={styles.number}>{values[axis].toFixed(2)}</Text></View>)}
        </View>
      </Panel>
      <View style={styles.track}><View style={[styles.dot, { left, top }]} /></View>
      <Text style={styles.hint}>A bolinha se move com a inclinação do tablet.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  readings: { flexDirection: 'row', justifyContent: 'space-around', gap: 12 },
  reading: { alignItems: 'center', flex: 1 },
  axis: { color: colors.muted, fontSize: 14, fontWeight: '800' },
  number: { color: colors.ink, fontSize: 28, fontWeight: '800', fontVariant: ['tabular-nums'], marginTop: 6 },
  track: { height: 300, maxHeight: 360, borderRadius: 16, backgroundColor: colors.tealLight, borderColor: '#B9DED4', borderWidth: 1, position: 'relative', overflow: 'hidden' },
  dot: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.coral, position: 'absolute', marginLeft: -17, marginTop: -17, borderWidth: 3, borderColor: colors.white },
  hint: { textAlign: 'center', color: colors.muted, marginTop: 14, fontSize: 15 },
});