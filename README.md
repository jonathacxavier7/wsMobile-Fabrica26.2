# wsMobile-Fabrica26.2

Aplicativo mobile desenvolvido com React Native, Expo e Expo Router para autenticar um usuario e exibir materias vinculadas a sua conta.

## Funcionalidades

- Login com e-mail e senha
- Armazenamento seguro do token com `expo-secure-store`
- Navegacao protegida para telas autenticadas
- Listagem de materias com `FlatList`
- Filtros por status: todas, ativas, pendentes e inativas
- Pull-to-Refresh na tela de materias
- Detalhes da materia com imagem, status, progresso, nota e descricao
- Perfil do usuario autenticado
- Logout com remocao do token
- Tratamento de erro para API, credenciais invalidas e sessao expirada

## Tecnologias

- React Native
- Expo
- Expo Router
- TypeScript
- Axios
- Expo SecureStore
- Expo Vector Icons

## Estrutura

```text
src/
├── app/         # Rotas e telas principais
├── assets/      # Arquivos estaticos usados dentro do app
├── components/  # Componentes reutilizaveis
└── constants/   # Cores e configuracao da API
```

## Requisitos

- Node.js instalado
- pnpm instalado
- Expo CLI via `npx expo`
- Android Studio, emulador Android ou Expo Go
- API backend rodando

## Instalacao

Clone o repositorio:

```bash
git clone https://github.com/jonathacxavier7/wsMobile-Fabrica26.2.git
cd wsMobile-Fabrica26.2
```

Instale as dependencias:

```bash
pnpm install
```

## Configuracao da API

O app usa a variavel de ambiente `EXPO_PUBLIC_API_URL` para definir a URL da API.

Exemplo:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

No Android Emulator, caso a API esteja rodando na mesma maquina, pode ser necessario usar:

```bash
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

Em celular fisico, use o IP da maquina na mesma rede Wi-Fi:

```bash
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000
```

Se a variavel nao for informada, o app usa:

```text
http://localhost:3000
```

## Endpoints Esperados

```text
POST /auth/login
GET /subjects
GET /subjects/:id
GET /auth/me
```

O login deve retornar um `accessToken`:

```json
{
  "accessToken": "token_jwt"
}
```

## Como Rodar

Inicie o projeto:

```bash
pnpm start
```

Rodar no Android:

```bash
pnpm android
```

Rodar no navegador:

```bash
pnpm web
```

## Validacao

Para verificar se o TypeScript esta correto:

```bash
pnpm exec tsc --noEmit
```

## Fluxo do App

1. O usuario acessa a tela de Login.
2. Ao autenticar com sucesso, o token e salvo com seguranca.
3. O app navega para a tela de Materias.
4. As chamadas protegidas enviam o token no header `Authorization`.
5. Ao abrir uma materia, o app carrega seus detalhes pela API.
6. Na tela de Perfil, o usuario pode sair da conta.
7. Em caso de `401`, o token e removido e o usuario volta para o Login.

## Observacoes

- A parte de APK/EAS Build nao e obrigatoria para esta entrega.
- Para testar em dispositivo fisico, a API precisa estar acessivel pela rede.
- O projeto utiliza `pnpm-lock.yaml` como lockfile principal.
