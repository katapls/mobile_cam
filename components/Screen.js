import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, styles as shared } from '../theme';

export function Screen({ title, description, children }) {
  const router = useRouter();
  return (
    <ScrollView style={shared.page} contentContainerStyle={shared.content}>
      <TouchableOpacity accessibilityRole="button" onPress={() => router.replace('/')} style={local.back}>
        <Text style={local.backText}>‹  Início</Text>
      </TouchableOpacity>
      <Text style={shared.title}>{title}</Text>
      {!!description && <Text style={shared.subtitle}>{description}</Text>}
      {children}
    </ScrollView>
  );
}

export function ActionButton({ title, icon, onPress, disabled, secondary, style }) {
  const { MaterialCommunityIcons } = require('@expo/vector-icons');
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled}
      onPress={async () => {
        try { await require('expo-haptics').impactAsync(require('expo-haptics').ImpactFeedbackStyle.Light); } catch (_) {}
        onPress?.();
      }}
      style={[shared.button, secondary && shared.secondaryButton, disabled && shared.buttonDisabled, style]}
    >
      {!!icon && <MaterialCommunityIcons name={icon} size={21} color={colors.white} />}
      <Text style={shared.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function ErrorMessage({ children }) {
  return children ? <Text accessibilityRole="alert" style={shared.error}>{children}</Text> : null;
}

export const Panel = ({ children, style }) => <View style={[shared.panel, style]}>{children}</View>;

const local = StyleSheet.create({
  back: { alignSelf: 'flex-start', paddingVertical: 8, paddingRight: 14, marginBottom: 14 },
  backText: { color: colors.teal, fontSize: 17, fontWeight: '700' },
});