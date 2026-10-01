# Sensores em ação

Demonstração escolar em JavaScript com Expo Router. Foi preparada para abrir no Expo Go em um tablet com SDK 57.

## Estrutura

```text
controle_alimento/
├── app/
│   ├── _layout.js
│   ├── index.js
│   ├── camera.js
│   ├── acelerometro.js
│   ├── gps.js
│   ├── audio.js
│   └── notificacao.js
├── components/
│   └── Screen.js
├── theme.js
├── app.json
└── package.json
```

## Criar, instalar e executar

```bash
npx create-expo-app@latest sensores-demo
cd sensores-demo
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-font expo-asset expo-camera expo-sensors expo-location expo-audio expo-notifications expo-haptics @expo/vector-icons
npx expo start
```

Ao criar do zero, configure `main` como `expo-router/entry`, use o diretório `app/` e copie as opções de permissões de `app.json` deste projeto. Neste repositório, as dependências já estão declaradas; para executar, entre em `controle_alimento` e rode `npx expo start`.

## Verificações

- [ ] **Início:** abra no tablet, confira os cinco atalhos e entre em cada recurso.
- [ ] **Câmera:** autorize o acesso, veja a prévia, alterne frontal/traseira e tire uma foto.
- [ ] **Acelerômetro:** incline o tablet, confira X/Y/Z e veja a bolinha acompanhar o movimento; ao voltar, o sensor deve parar.
- [ ] **GPS:** autorize localização, confira latitude, longitude e precisão; teste abrir no Google Maps. Negue a permissão e confirme a mensagem explicativa.
- [ ] **Áudio:** autorize o microfone, grave alguns segundos, pare e reproduza.
- [ ] **Notificação:** autorize notificações, agende o aviso e confirme a entrega após cinco segundos, inclusive com o app em primeiro plano.
- [ ] **Voltar:** em cada tela, retorne ao início pelo botão no topo.

## Problemas comuns

- **Expo Go informa SDK incompatível:** atualize o Expo Go pela loja do tablet para uma versão que aceite o SDK usado pelo projeto; não atualize pacotes nativos manualmente com `npm install`.
- **Permissão negada ou não aparece de novo:** altere câmera, microfone, localização ou notificações em Configurações do sistema > Aplicativos > Expo Go. Feche e reabra o projeto após alterar permissões.
- **GPS não encontra posição:** ative a localização do tablet, teste em espaço aberto e aguarde alguns segundos; em emuladores, configure uma posição simulada.
- **Prévia da câmera vazia:** feche outros apps usando a câmera, permita o acesso ao Expo Go e teste em dispositivo físico (câmera não está disponível em todo emulador).
- **Áudio sem som:** aumente o volume, encerre outra gravação em andamento e confira a permissão do microfone.
- **Notificação não aparece:** permita notificações do Expo Go nas configurações do sistema e mantenha o app aberto para testar o aviso local.
