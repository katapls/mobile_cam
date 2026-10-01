import { useState } from 'react';
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioPlayer, useAudioRecorder, useAudioRecorderState } from 'expo-audio';
import { StyleSheet, Text } from 'react-native';
import { ActionButton, ErrorMessage, Panel, Screen } from '../components/Screen';
import { colors } from '../theme';

const DEMO_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export default function AudioScreen() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 100);
  const [uri, setUri] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const player = useAudioPlayer(null);

  async function startRecording() {
    setError('');
    setMessage('');
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) { setError('Permissão de microfone negada. Ative-a nas configurações do tablet para gravar.'); return; }
      player.pause();
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setMessage('Gravação iniciada.');
    } catch (_) { setError('Não foi possível iniciar a gravação. Verifique a permissão do microfone.'); }
  }

  async function stopRecording() {
    setError('');
    try {
      await recorder.stop();
      const recordingUri = recorder.uri;
      if (!recordingUri) {
        setError('A gravação terminou, mas o arquivo não ficou disponível. Tente gravar novamente.');
        return;
      }
      setUri(recordingUri);
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
      setMessage('Gravação pronta para reproduzir.');
    } catch (_) { setError('Não foi possível finalizar a gravação. Tente novamente.'); }
  }

  async function playRecording() {
    setError('');
    try {
      if (!uri) return;
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
      player.replace(uri);
      await player.seekTo(0);
      player.play();
      setMessage('Reproduzindo gravação.');
    }
    catch (_) { setError('Não foi possível reproduzir a gravação. Grave um novo áudio e tente novamente.'); }
  }

  async function playDemoAudio() {
    setError('');
    try {
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
      player.replace(DEMO_AUDIO_URL);
      player.play();
      setMessage('Reproduzindo áudio de demonstração.');
    } catch (_) {
      setError('Não foi possível carregar o áudio de demonstração. Verifique a conexão com a internet.');
    }
  }

  return (
    <Screen title="Áudio" description="Grave uma mensagem curta e ouça sua gravação.">
      <Panel>
        <Text style={styles.statusLabel}>STATUS</Text>
        <Text style={[styles.status, recorderState.isRecording && styles.recording]}>{recorderState.isRecording ? '●  Gravando' : 'Pronto para gravar'}</Text>
        {recorderState.isRecording && <Text style={styles.duration}>{Math.floor(recorderState.durationMillis / 1000)} s</Text>}
      </Panel>
      <ActionButton title="Gravar áudio" icon="microphone" disabled={recorderState.isRecording} onPress={startRecording} />
      <ActionButton title="Parar gravação" icon="stop-circle-outline" secondary disabled={!recorderState.isRecording} onPress={stopRecording} style={styles.button} />
      <ActionButton title="Reproduzir" icon="play-circle-outline" secondary disabled={!uri || recorderState.isRecording} onPress={playRecording} style={styles.button} />
      <ActionButton title="Tocar áudio de demonstração" icon="music-note" secondary disabled={recorderState.isRecording} onPress={playDemoAudio} style={styles.button} />
      <Text style={styles.note}>O áudio de demonstração é transmitido pela internet.</Text>
      {!!message && <Text style={styles.saved}>{message}</Text>}
      {uri && <Text style={styles.saved}>Gravação pronta para reprodução.</Text>}
      <ErrorMessage>{error}</ErrorMessage>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statusLabel: { color: colors.muted, fontSize: 12, fontWeight: '800' },
  status: { color: colors.ink, fontSize: 22, fontWeight: '800', marginTop: 8 },
  recording: { color: colors.coral },
  duration: { color: colors.muted, marginTop: 6, fontSize: 16 },
  button: { marginTop: 12 },
  note: { color: colors.muted, fontSize: 14, marginTop: 12 },
  saved: { color: colors.teal, marginTop: 14, fontWeight: '700' },
});