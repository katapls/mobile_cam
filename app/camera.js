import { useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ActionButton, ErrorMessage, Panel, Screen } from '../components/Screen';
import { colors } from '../theme';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const camera = useRef(null);

  async function takePhoto() {
    try {
      setError('');
      const result = await camera.current?.takePictureAsync({ quality: 0.8 });
      if (result?.uri) setPhoto(result.uri);
    } catch (_) { setError('Não foi possível tirar a foto. Feche outros apps que estejam usando a câmera e tente novamente.'); }
  }

  return (
    <Screen title="Câmera" description="Enquadre a imagem e guarde uma foto nesta tela.">
      {!permission?.granted ? (
        <Panel>
          <Text style={styles.message}>A câmera só é ativada nesta tela, quando você autoriza.</Text>
          <ActionButton title="Permitir câmera" icon="camera" onPress={requestPermission} />
        </Panel>
      ) : (
        <>
          <View style={styles.preview}>
            <CameraView ref={camera} style={StyleSheet.absoluteFill} facing={facing} onCameraReady={() => setReady(true)} onMountError={() => setError('A câmera não pôde ser iniciada neste dispositivo.')} />
          </View>
          <View style={styles.actions}>
            <ActionButton title="Alternar" icon="camera-flip-outline" secondary onPress={() => { setReady(false); setFacing((current) => current === 'back' ? 'front' : 'back'); }} style={styles.action} />
            <ActionButton title="Tirar foto" icon="camera-outline" disabled={!ready} onPress={takePhoto} style={styles.action} />
          </View>
        </>
      )}
      <ErrorMessage>{error}</ErrorMessage>
      {photo && <Panel><Text style={styles.photoTitle}>Última foto</Text><Image source={{ uri: photo }} style={styles.photo} resizeMode="contain" /></Panel>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: { color: colors.muted, fontSize: 16, lineHeight: 24, marginBottom: 18 },
  preview: { width: '100%', height: 340, maxHeight: 420, overflow: 'hidden', borderRadius: 14, backgroundColor: '#193337', marginBottom: 14 },
  actions: { flexDirection: 'row', gap: 12 },
  action: { flex: 1 },
  photoTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 12 },
  photo: { width: '100%', height: 280, backgroundColor: '#EDF1EE', borderRadius: 8 },
});