export const colors = {
  ink: '#18343A',
  muted: '#62777A',
  paper: '#F5F7F2',
  white: '#FFFFFF',
  teal: '#087E78',
  tealLight: '#DDF2EC',
  coral: '#E66D52',
  yellow: '#F2C14E',
  line: '#DCE5E0',
  danger: '#A83B36',
};

export const styles = {
  page: { flex: 1, backgroundColor: colors.paper },
  content: { width: '100%', maxWidth: 900, alignSelf: 'center', padding: 24, paddingBottom: 42 },
  title: { color: colors.ink, fontSize: 34, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 17, lineHeight: 25, marginTop: 8, marginBottom: 24 },
  button: { minHeight: 54, borderRadius: 12, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingVertical: 14 },
  buttonText: { color: colors.white, fontSize: 17, fontWeight: '700' },
  secondaryButton: { backgroundColor: colors.ink },
  buttonDisabled: { opacity: 0.5 },
  error: { color: colors.danger, backgroundColor: '#FCE9E5', borderRadius: 10, padding: 14, marginTop: 14, fontSize: 15 },
  panel: { backgroundColor: colors.white, borderRadius: 14, padding: 20, borderWidth: 1, borderColor: colors.line, marginBottom: 18 },
};