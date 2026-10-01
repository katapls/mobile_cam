import { useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
import { ActionButton, ErrorMessage, Panel, Screen } from '../components/Screen';
import { colors } from '../theme';

export default function NotificationScreen() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [scheduled, setScheduled] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  async function scheduleNotification() {
    if (isScheduling) return;
    setIsScheduling(true);
    setMessage('');
    setError('');
    setScheduled(false);
    try {
      if (Platform.OS === 'ios') {
        const current = await getPermissionsAsync();
        const permission = current.granted ? current : await requestPermissionsAsync();
        if (!permission.granted) {
          setError('Permissão de notificação negada. Ative-a nas configurações do tablet.');
          return;
        }
      }
      await scheduleNotificationAsync({
        content: { title: 'Lembrete do laboratório', body: 'Sua notificação local de demonstração chegou.' },
        trigger: {
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
      setScheduled(true);
      setMessage('Notificação agendada para daqui a 5 segundos.');
    } catch (cause) {
      const detail = cause instanceof Error ? cause.message : String(cause);
      if (Platform.OS === 'android' && detail.includes('Push notifications')) {
        setError('Esta versão do Expo Go não permite agendar notificações locais neste Android. Atualize o Expo Go; se persistir, use uma development build.');
      } else {
        setError(`Não foi possível agendar a notificação: ${detail}`);
      }
    } finally {
      setIsScheduling(false);
    }
  }

  return (
    <Screen title="Notificação" description="Agende um lembrete local, sem usar notificações remotas.">
      <Panel>
        <Text style={styles.message}>O aviso será entregue pelo próprio tablet após 5 segundos.</Text>
        <ActionButton title={isScheduling ? 'Solicitando permissão…' : 'Agendar notificação'} icon="bell-ring-outline" disabled={isScheduling} onPress={scheduleNotification} />
      </Panel>
      {scheduled && <Text accessibilityRole="status" style={styles.success}>{message}</Text>}
      <ErrorMessage>{error}</ErrorMessage>
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: { color: colors.muted, fontSize: 16, lineHeight: 24, marginBottom: 18 },
  success: { color: colors.teal, fontSize: 16, fontWeight: '700', marginTop: 8 },
});