# Studyloom

Plataforma web de estudo gamificado para concursos públicos. O aluno escolhe a carreira-alvo, recebe uma trilha de edital e resolve baterias de questões com cronômetro. A mascote Lumi, uma raposa 3D, comenta o gabarito e tem guarda-roupa. O diferencial do produto é o edital no centro (trilha por edital, banca, lei seca, caderno de erros), e não a gamificação em si.

Este arquivo é o contexto fixo do projeto. Leia tudo antes de agir e siga o plano da seção "Plano passo a passo".

## Como trabalhar neste projeto

- Responda sempre em português do Brasil, com tom profissional, natural e direto. Sem emojis nas suas respostas, nos comentários de código e na documentação.
- A interface do app mantém os ícones e textos do protótipo (os emojis da navegação e dos cards fazem parte do design). Em texto novo da interface, siga o estilo do que já existe.
- Trabalhe uma etapa por vez. Antes de começar cada etapa, faça a análise junto com o dono do projeto: leia a referência do protótipo, apresente o que existe, as opções e uma recomendação, e espere o ok antes de implementar.
- Durante a execução, informe o que está fazendo a cada passo, para manter a coerência entre o que foi combinado e o que está sendo feito.
- Ao terminar cada etapa, rode a verificação (seção "Definição de pronto") e mostre o resultado.
- Git: o repositório é https://github.com/samirsousa/fitloom e a raiz dele é a pasta `Documents\studyloom` (este arquivo, o protótipo e o app). O trabalho em andamento fica na branch `feat/migracao-react`. Faça commit ao fim de cada etapa, mas só faça push ou crie branch quando o dono do projeto pedir. Os commits locais usam o autor configurado no próprio repositório; não altere a configuração global do git.
- Antes de instalar qualquer dependência nova, pergunte. As dependências aprovadas hoje são `react`, `react-dom`, `react-router-dom`, `zustand` e `@tanstack/react-query`.
- Antes de uma decisão de produto ou de arquitetura que não esteja neste arquivo, apresente as opções e recomende uma. Não decida sozinho.
- Nunca altere a pasta do protótipo. Ela é só referência.
- Não mexa em `vite.config.ts`, `tsconfig*.json` e `eslint.config.js`, a não ser que a etapa exija e você avise antes.

## Ambiente e restrições

Esta seção descreve a máquina do Lucas. Quem trabalha em outra máquina segue as próprias condições, mas mantém as versões de Node e npm.

- Windows, em um computador de trabalho, sem permissão de administrador garantida.
- Node 22.12.0 e npm 10.9.0. Não atualize o npm.
- Use o Prompt de Comando (CMD). O PowerShell desta máquina bloqueia scripts `.ps1`, então `npm run dev` falha nele. No PowerShell, use `npm.cmd run dev`.
- A rede da empresa pode bloquear downloads. Se um comando falhar por rede, proxy, certificado ou permissão, pare e mostre o erro completo em vez de contornar.
- O projeto é pessoal. Não use contas, repositórios, chaves ou serviços da empresa.
- Instalação global de pacotes só com aviso prévio.

## Pastas

```
Documents\studyloom\       raiz do repositório git
  CLAUDE.md                este arquivo (inicie o Claude Code a partir desta pasta ou de studyloom-web)
  studyloom-prototipo\     protótipo original em HTML, CSS e JS puro (somente leitura)
    index.html             1.525 linhas
    app.js                 1.129 linhas
    styles.css             2.565 linhas
    assets\                imagens da Lumi usadas pelo protótipo
  studyloom-web\           app React (onde se trabalha)
  studyloom-api\           backend Spring Boot (ainda não existe)
  docs\                    pendencias.md (o que falta antes do lançamento) e brand\ (arte original do ícone)
```

Estrutura atual de `studyloom-web`:

```
public/assets/             imagens da Lumi em WebP 768 px (lumi-hero.webp, lumi-celebrate.webp, lumi-coach.webp e as fantasias)
src/
  main.tsx                 BrowserRouter + QueryClientProvider
  App.tsx                  rotas
  index.css                cópia integral do styles.css do protótipo
  components/
    layout/                AppShell, Sidebar, BottomNav, MobileHeader, RightPanel, LumiPushBanner, navItems.ts
    lumi/                  LumiAvatar.tsx
    quiz/                  QuestionCard.tsx
  data/                    trailNodes.ts, questions.ts, errorNotebook.ts, leagueRivals.ts, community.ts, wardrobe.ts
  hooks/                   useCountdown.ts, useLeague.ts
  pages/                   uma página por rota (algumas ainda são PlaceholderPage)
  store/                   useGameStore.ts, useLumiStore.ts, useLumiPush.ts
```

## Stack e convenções

- React 19 com TypeScript, Vite 8, Zustand para estado, React Router para rotas, TanStack Query para chamadas à API (ainda sem uso).
- O CSS do protótipo foi reaproveitado inteiro em `src/index.css`, com os mesmos nomes de classe. Ao migrar uma tela, mantenha o DOM e as classes do protótipo (`className` no lugar de `class`) para o visual ficar idêntico. Não reescreva o CSS sem necessidade.
- Dados de conteúdo ficam em `src/data/*.ts`, tipados, separados dos componentes. Isso facilita trocar por chamadas à API.
- Estado global em `src/store`. Estado local de tela em `useState`.
- Importe tipos com `import type` (o projeto usa `verbatimModuleSyntax`).
- Um componente por arquivo, nome em PascalCase. Hooks começam com `use`.
- Navegação por `useNavigate`. Os itens da barra lateral e da inferior são botões, como no protótipo.
- As telas usam `<section className="app-screen active" id="screen-...">`, porque o CSS esconde `.app-screen` sem `active`.
- Imagens são servidas de `/assets/...` (pasta `public/assets`), em WebP. Imagem nova: 1024 x 1024 na origem, convertida para WebP de 768 px.
- Elemento clicável que não é `<button>`: use `pressable()` de `src/utils/a11y.ts` (foco e Enter/Espaço).
- Telas novas entram com `React.lazy` em `App.tsx`. Só a Trilha fica no pacote principal.

## Estado global (`useGameStore`)

Campos: `userName` (padrão "Concurseiro"), `careerId` (rótulo e módulo em `src/data/careers.ts`), `onboardingCompleted`, `streak`, `lastStudyDay`, `hearts`, `totalXp`, `dailyXp`, `dailyXpGoal`, `isPro`, `proPlan`, `theme`, `soundEnabled`, `lastActiveDay`, `chestOpened`, `streakFreezes`, `answeredTotal`, `correctTotal`.

Ações: `toggleTheme`, `toggleSound`, `claimChest`, `addXp`, `spendXp` (retorna `false` se faltar XP), `loseHeart`, `recordAnswer`, `completeBattery`, `refillHeartsWithXp` (recusa com vidas cheias ou no Pro), `buyStreakFreeze` (máximo 1), `activatePro`, `cancelPro`, `completeOnboarding`, `skipOnboarding`, `syncDay` (virada de dia, chamada pelo `AppShell`), `resetProgress`.

Persistência: `useGameStore` e `useLumiStore` (que ganhou `reset`) usam o middleware `persist` configurado em `src/store/persistence.ts`, único ponto de acesso ao `localStorage` (chave `studyloom-state-v1`, partes `game` e `lumi`, com versão). Novos campos de dados entram automaticamente. Se o formato mudar, suba `STORAGE_VERSION` e trate em `migrate`.

`useIntroStore` guarda só o pedido de rever a abertura (`replay`, `close`). `useParticles` expõe `spawn(modo)`, registrado pelo `ParticlesCanvas`.

Efeitos (som, partículas e vibração): use `useFeedback()` (ou `triggerFeedback` fora de componentes) com um evento de `src/hooks/useFeedback.ts`. Não chame `playSound` nem `spawn` direto nas telas.

Constantes exportadas: `HEART_REFILL_COST` e `MAX_HEARTS`. Preços do congelamento (`STREAK_FREEZE_COST`, `MAX_STREAK_FREEZES`) ficam em `src/data/wardrobe.ts`.

## Avatar da Lumi (`useLumiStore`)

Guarda só as escolhas: `furKey`, `accessoryKey`, `basePoseKey`, `activeEpicId` e `ownedEpics`. Ações: `setFur`, `setAccessory` (um acessório equipa a pose Padrão e tira a épica), `equipBasePose` (desequipa a épica; pose diferente da Padrão volta o acessório para "nenhum"), `equipEpic`, `markEpicOwned`, `reset`. O hook `useLumiLook()` deriva de `src/data/wardrobe.ts` a imagem, a tag, o título e a classe de pelagem, nesta prioridade: fantasia épica, acessório (só na pose Padrão, `ACCESSORY_POSE`), pose base.

O componente `LumiAvatar` renderiza a Lumi equipada (a moldura fica no pai), já com o acessório, porque cada acessório tem imagem própria. Ele aparece no painel direito, na Trilha, no banner de push e na Loja. O apresentador da bateria mantém as imagens de reação fixas.

`useLumiPush` expõe `show(mensagem)` e `hide()` para o banner de notificação da Lumi, que fica montado no `AppShell`.

## Regras de negócio já decididas (não reverter)

- Bônus 2x XP: só vale se a resposta correta vier com mais da metade do tempo da questão ainda restante. Depois disso o XP é o normal.
- Vidas: erro tira uma vida, e o mínimo é 0. Com 0 vidas (e sem Pro), a bateria não inicia. Dá para recarregar por 100 XP. No Pro, as vidas são ilimitadas. Na virada do dia as vidas voltam ao máximo (decisão da Etapa 6, provisória até a recarga por tempo no servidor).
- Ofensiva (streak): sobe 1 por dia, no máximo uma vez, quando uma bateria é concluída. Nunca fixa em 15. Se o último dia de estudo foi antes de ontem, volta a 0 ao abrir o app, exceto quando faltou exatamente um dia e há congelamento: ele é consumido e a ofensiva se mantém.
- Aproveitamento: acertos divididos pelas questões respondidas na sessão. Sem `Math.max(1, ...)`.
- Baú do Aprovado: só pode ser resgatado uma vez por dia (decisão da Etapa 6), soma 50 XP e aciona o banner da Lumi.
- Meta diária: o XP do dia volta a 0 na virada do dia.
- Ranking das ligas: calculado. O usuário entra na lista com o XP do store, a lista é ordenada, e a posição aparece na tela de Ligas e no painel direito. Os 3 primeiros sobem de liga.
- XP nunca é vendido por dinheiro. Ele vem só de estudo (questões, baú, metas), porque também é a pontuação do ranking. A monetização da loja no MVP é pelas fantasias exclusivas do Pro. Venda direta de fantasias em reais ou uma moeda comprável separada do XP só será decidida quando houver backend e pagamento.
- Copy de marketing: não pode haver promessa sem comprovação (por exemplo "Aprovação 3,4x mais rápida"). Também não pode haver nenhuma menção a Duolingo, na tela, no código ou nos comentários.

## O que já está pronto

- Layout base: barra lateral (desktop), cabeçalho e barra inferior (mobile, abaixo de 720 px), painel direito, tema claro e escuro, rotas.
- Trilha do Edital, com a Lumi interativa e o baú (o resgate aciona o banner da Lumi).
- Bateria de questões, com cronômetro, bônus por faixa de tempo, vidas, ofensiva e tela de conclusão.
- Caderno de Erros, com pegadinhas e flashcards que viram.
- Ligas, com ranking calculado. O painel direito mostra a posição real do usuário e quanto XP falta para a zona de promoção.
- Comunidade, com o botão de incentivo e o banner de push da Lumi.
- Loja da Lumi: vitrine do avatar, fantasias épicas com regras de desbloqueio (XP, top 3 da liga, Pro), recarga de vidas e congelamento de ofensiva. Avatar compartilhado no app.
- Perfil: dados do store, taxa de acerto real, guarda-roupa (pelagem, pose base e épicas) e conquistas.
- Onboarding: splash, boas-vindas, carreira-alvo, meta diária e nome, com pular e rever abertura (barra lateral e Perfil).
- Persistência local do progresso, virada de dia e "Apagar meu progresso".
- Sons, partículas e vibração por eventos (`useFeedback`), com o controle "Sons e vibração".
- Pro: planos anual e mensal, assinatura e cancelamento simulados, identidade dourada e espaços de anúncio (da casa) que somem no Pro.

## O que falta no front

O plano do front está completo. Faltam os testes do dono do projeto (som e vibração da Etapa 5, instalação do PWA no celular) e os itens de `docs/pendencias.md`.

## Pontos em aberto para debate

Itens levantados na Etapa 0 que ainda não têm decisão. Discuta com o dono do projeto antes de alterar.

1. Card Pro do painel direito: resolvido na Etapa 3 (paleta dourada, sem teste grátis).
2. Nome das ligas: resolvido na Etapa 3 (escada por cargo, sem gemas).
3. Valores iniciais do store: resolvido na Etapa 6. Usuário novo começa do zero (ofensiva 0, 0 XP, meta de 60 XP).
4. Lumi com acessórios: resolvido na Etapa 7 (21/10/2026) com 3 imagens próprias na pose Padrão (`lumi-hero-glasses`, `-headphones` e `-both`; originais em `docs/brand/lumi-acessorios-originais`). A camada de SVG do protótipo e a chave `ACCESSORIES_ENABLED` foram removidas. Se vierem imagens das outras poses, basta estender o catálogo em `wardrobe.ts`. Alternativa de longo prazo: a Lumi animada em Rive ou Lottie, com acessórios como camadas.
5. Tela inicial (splash e onboarding): aprovada na Etapa 4 como versão provisória (21/10/2026). O dono do projeto deve revisitar o visual e o fluxo no futuro. Os textos e as opções ficam em `src/data/careers.ts`, `src/data/dailyGoals.ts` e `IntroOverlay.tsx`.

## Referência do protótipo

| Item | Onde está |
|---|---|
| Tela Loja da Lumi | `index.html` linhas 751 a 896 |
| Tela Pro | `index.html` linhas 897 a 1028 |
| Tela Perfil | `index.html` linhas 1029 a 1287 |
| Splash e onboarding | `index.html` (procure `splash` e `onboarding`), JS em `app.js` linhas 323 a 446 |
| Sons (Web Audio) | `app.js` linhas 162 a 245 |
| Partículas (canvas) | `app.js` linhas 246 a 322 |
| Avatar, guarda-roupa, fantasias | `app.js` linhas 818 a 1004 (`syncLumiAvatarAcrossApp`, `EPIC_COSTUMES_DATA`) |
| Power-ups da loja | `app.js` linhas 1005 a 1024 (`buyShopPowerup`) |
| Assinatura Pro | `app.js` linhas 753 a 789 (`selectProPlan`, `activateStudyloomPro`) |
| Painel superior de status | `app.js` linhas 1025 a 1058 (`updateTopDashboardUI`) |

Os números de linha são do protótipo original. Se não baterem, procure pelo nome da função.

## Plano passo a passo

### Etapa 0: verificação inicial (concluída em 20/10/2026)

1. Leitura deste arquivo e confirmação do entendimento. Feito.
2. `npm run build`, `npm run lint` e `npx tsc -b` passam sem erros. Feito.
3. `RightPanel.tsx` usa `useLeague()`: a edição anterior tinha ficado incompleta (o texto dinâmico estava dentro da caixa da medalha e ainda havia o bloco fixo "#2 lugar"). Corrigido. `TrailPage.tsx` chama `useLumiPush().show(...)` quando `claimChest()` retorna `true`: já estava certo, só a indentação foi ajustada.
4. Restos do template do Vite (`src/App.css`, `src/assets/react.svg`): já não existiam.
5. Git: adiado nas Etapas 0 a 2 e ativado depois delas, com a branch `feat/migracao-react` criada a partir do `main`. `node_modules` já está no `.gitignore`.
6. Extra: removida a menção a Duolingo em um comentário de `src/index.css` (seção da tela Pro), sem alterar estilos.

### Etapa 1: Loja da Lumi e avatar compartilhado (concluída em 20/10/2026)

Resultado: build, lint e tsc sem erros. Testado no navegador pelo dono do projeto, em desktop e mobile: compra do Dino com e sem XP, Toga fora e dentro do top 3, Auditor sem Pro, recarga de vidas e congelamento. Ajuste extra de CSS: abaixo de 960 px a miniatura das fantasias épicas fica quadrada (até 240 px), porque a altura fixa de 152 px cortava a imagem quadrada no card largo. O defeito também existe no protótipo.

Decisões tomadas na análise (20/10/2026), que prevalecem sobre os itens abaixo:

- A Loja segue o protótipo: vitrine, fantasias épicas e power-ups. As abas do guarda-roupa (pelagem, acessório e pose base) ficam no Perfil, na Etapa 2. O store e o `LumiAvatar` já nascem com suporte a pelagem e acessório.
- Desbloqueio das épicas: o Dino custa 500 XP, cobrados uma vez (equipar de novo é grátis). A Toga exige estar na zona de promoção da liga (top 3, via `useLeague`). O Auditor exige `isPro`, e sem Pro o botão leva para `/pro`.
- Congelamento de ofensiva: real. Contador `streakFreezes` no `useGameStore`, máximo 1, por 200 XP. O consumo entra na Etapa 6, junto com a virada de dia.
- Avatar equipado aparece no painel direito, na Trilha (o clique na Lumi troca só a fala) e no banner de push. O apresentador da bateria mantém as imagens de reação.
- Gastar XP reduz o `totalXp` e, portanto, a posição na liga. Fica assim no MVP. Separar saldo de compras do XP do ranking é assunto do backend.
- A recarga de vidas não é vendida com as vidas cheias nem no Pro.

1. Leia a tela Loja e as funções de avatar e fantasia no protótipo.
2. Crie `src/store/useLumiStore.ts` com a pelagem, o acessório e a fantasia equipados, e o caminho da imagem resultante. Crie `src/data/wardrobe.ts` com as pelagens, os acessórios e as fantasias épicas (inclua preço em XP e a imagem de cada uma).
3. Crie o componente `LumiAvatar` e use-o nos lugares que mostram a Lumi hoje com a imagem fixa `lumi-hero.jpg` (painel direito, banner de push, Trilha, apresentador da bateria). As imagens de reação (`lumi-celebrate.jpg` e `lumi-coach.jpg`) continuam fixas, a menos que o protótipo troque por fantasia.
4. Implemente a página da Loja com as abas do guarda-roupa, a compra de fantasias e os power-ups. A compra desconta XP do `useGameStore` (crie a ação necessária) e bloqueia quando o XP não for suficiente. A recarga de vidas já existe (`refillHeartsWithXp`), reaproveite.
5. Acione o banner da Lumi nas compras e trocas, como o protótipo faz.
6. Teste: comprar com XP suficiente e insuficiente, equipar e ver o avatar mudar nas telas.

Commit: `feat: loja da Lumi e avatar compartilhado`.

### Etapa 2: Perfil (concluída em 20/10/2026)

Resultado: build, lint e tsc sem erros. Testado no navegador pelo dono do projeto, em desktop e mobile: cabeçalho e estatísticas vindos do store, taxa de acerto após uma bateria, troca de pelagem e pose refletindo em todas as telas, regras das épicas iguais às da Loja, conquistas, fala da Lumi com a posição real e layout abaixo de 720 px.

Decisões tomadas na análise (20/10/2026), que prevalecem sobre os itens abaixo:

- Taxa de acerto real: contadores `answeredTotal` e `correctTotal` no `useGameStore`, atualizados pela bateria. Sem respostas, o Perfil mostra "—".
- Conquistas em `src/data/achievements.ts`. "100 Dias de Edital" usa a ofensiva real. "Mestre da Lei Seca" fica como exemplo com `TODO backend`. O contador "X / N Conquistadas" é calculado.
- Carreira: o campo `career` entra no `useGameStore` já nesta etapa (padrão "Tribunais & MP"). O Perfil e o painel direito leem dele. A Etapa 4 passa a gravá-lo.
- A lógica das fantasias épicas é extraída para `EpicCostumeCard` e `useEpicCostumes`, usados na Loja e no Perfil. As descrições são as de `wardrobe.ts`.
- Valores fixos corrigidos junto: a fala da Lumi "#2 na Liga Auditor" na Trilha passa a usar a posição real, e o título da liga no painel direito usa `LEAGUE_NAME`.
- Acessórios (óculos e fones) desligados por `ACCESSORIES_ENABLED = false`: os SVGs do protótipo ficavam fora de escala sobre a Lumi 3D. A linha de acessórios do guarda-roupa e a camada do `LumiAvatar` ficam ocultas até existir arte própria (ponto em aberto 4). Pelagem e pose base continuam ativas.

1. Leia a tela Perfil (a maior do protótipo, cerca de 260 linhas) e liste o que usa dados do usuário.
2. Crie `src/data/` e `src/hooks/` conforme necessário. Leia nome, ofensiva, XP, liga e fantasia do store, sem valores fixos.
3. Migre a tela mantendo o DOM e as classes. Estatísticas que dependem de histórico real (acertos por matéria, por exemplo) ficam como dados de exemplo em `src/data`, com um comentário `TODO backend` indicando de onde virão.
4. Teste em desktop e abaixo de 720 px.

Commit: `feat: tela de perfil`.

### Etapa 3: Pro (concluída em 21/10/2026)

Resultado: build, lint e tsc sem erros. Testado no navegador pelo dono do projeto, em desktop e mobile: escolha de plano (mouse e teclado), assinatura e cancelamento, vidas infinitas e sem perda no Pro, Farda de Auditor equipada e desequipada, card do painel direito, anúncios aparecendo sem Pro e sumindo com Pro, tema claro.

Decisões tomadas na análise (21/10/2026), que prevalecem sobre os itens abaixo:

- Identidade do Pro em dourado (tokens `--gold-*` em `index.css`), no lugar do verde esmeralda. Vale para a tela Pro, o card do painel direito, o botão Pro da barra lateral, o selo e o botão Pro das épicas e a marca "PRO" das Ligas.
- Texto sem promessa: o hero fala só de vidas ilimitadas e da Farda de Auditor. Só aparece como benefício o que funciona hoje. Os recursos planejados (resumos por IA, trilha adaptativa, baterias avançadas) ficam marcados como "EM BREVE", com aviso de que ainda não fazem parte da assinatura. O Pro libera só a Farda de Auditor (Toga e Dino seguem as regras da Etapa 1) e não dá congelamentos mensais.
- Tela enxuta, em 3 blocos: hero só com selo e título; "O que muda no Pro" em linhas compactas (vidas, Farda de Auditor, anúncios), que substitui a tabela Grátis x Pro e os cards de benefícios; planos e botão. Os recursos planejados viram uma linha "EM BREVE" no rodapé. A fita "-50%" virou "Economia de R$ 360 no ano", calculada a partir dos preços em `src/data/proPlans.ts`.
- Sem teste grátis no MVP. O botão diz "Assinar plano anual/mensal", com a nota "Simulação: nenhuma cobrança é feita". Há um link "Cancelar assinatura (simulação)" para testes.
- Assinar e cancelar ficam em `useProSubscription`. Assinar liga `isPro` e `proPlan`, equipa o Auditor e mostra o banner. Cancelar desequipa o Auditor. Som e partículas entram na Etapa 5.
- Ligas: escada por cargo (Técnico, Analista, Auditor, Magistratura). O usuário está na Liga Auditor, e `LEAGUE_NAME` é usado em todo texto de liga.
- Anúncios (opção B): componente `AdSlot`, que não aparece no Pro, na conclusão da bateria e no Caderno de Erros, nunca durante a questão. O painel direito fica sem anúncio, porque já tem o card do Pro. Por enquanto mostra anúncios da casa (`src/data/ads.ts`). A rede real (AdSense) só entra depois de ter domínio próprio, política de privacidade e consentimento conforme a LGPD, trocando o conteúdo apenas no `AdSlot`. "Sem anúncios" entrou nos benefícios do Pro.

1. Leia a tela Pro e as funções `selectProPlan` e `activateStudyloomPro`.
2. Migre a tela com a escolha de plano e a ativação, que muda `isPro` no store. Ela continua simulada, porque o pagamento real só existe no backend. Marque `TODO backend` onde entrar Pix e cartão.
3. Reescreva o texto de marketing: remova "Inspirado no Duolingo Super", "Duolingo Super Style" e a promessa "Aprovação 3,4x mais rápida". Troque a estrutura ou o nome onde ficar muito parecida com a referência (hero, grade de benefícios, tabela Grátis x Pro, selo "-50%"), apresentando as opções ao dono do projeto antes de decidir o novo texto.
4. Garanta que, com `isPro` ativo, as vidas aparecem como infinito e a perda de vida não ocorre (já tratado no store).
5. Resolva os pontos em aberto 1 e 2 (card Pro do painel direito e nome das ligas) junto com a nova identidade da tela.

Commit: `feat: tela Pro sem referências de terceiros`.

### Etapa 4: Onboarding (concluída em 21/10/2026)

Resultado: build, lint e tsc sem erros. Aprovado pelo dono do projeto como versão provisória da tela inicial (ponto em aberto 5).

Decisões tomadas na análise (21/10/2026), que prevalecem sobre os itens abaixo:

- Overlay (`IntroOverlay`, montado no `AppShell`), não rota. Aparece enquanto `onboardingCompleted` for falso ou quando o usuário pede para rever. Mantém o DOM e as classes do protótipo.
- Fluxo: splash (1,8 s ou clique), boas-vindas, carreira-alvo, meta diária e nome. A pergunta de nível saiu, porque o dado não era usado. Volta quando existir trilha adaptativa.
- Carreiras em `src/data/careers.ts`. O store guarda `careerId`, e o foco (painel direito e Perfil) e o título do módulo no banner da Trilha são derivados. As questões ainda são as mesmas para todas as carreiras (`TODO backend`), então o texto fala em ajustar a trilha ao foco, sem prometer conteúdo exclusivo.
- Meta diária em XP, ligada ao `dailyXpGoal` (`src/data/dailyGoals.ts`): Leve 30, Consistente 60, Intensa 120. Sem minutos, porque o app não mede tempo. "Rotina Blindada" saiu.
- Tela final só com o nome (até 24 caracteres; vazio vira "Concurseiro"). Sem e-mail e sem "Criar conta", que voltam com a autenticação e a LGPD. Botão "Começar minha Trilha". A mensagem final não promete ofensiva acesa.
- "Já tenho conta" virou "Pular", que marca o onboarding como concluído com os valores padrão. "Rever abertura" fica na barra lateral e no fim do Perfil (para o mobile). Concluir de novo troca só nome, carreira e meta.
- Título da boas-vindas sem comparação com terceiros. Som e partículas ficam marcados para a Etapa 5.
- Até a Etapa 6, o onboarding aparece a cada recarga da página. Aceito: a persistência fica toda na Etapa 6.

1. Leia o splash e o onboarding no HTML e no JS do protótipo.
2. Implemente como rota ou overlay: abertura, boas-vindas e as perguntas (carreira-alvo, nome e meta de estudo). Ao concluir, grave `userName`, a carreira e o módulo no store. O título do banner da Trilha e o foco do painel direito passam a vir dessa escolha.
3. Inclua o botão de pular e uma forma de rever a abertura (no rodapé da barra lateral, como no protótipo).
4. Mostre o onboarding só quando ele ainda não foi concluído.

Commit: `feat: onboarding`.

### Etapa 5: sons, partículas e vibração (implementada em 21/10/2026, teste pendente)

Resultado: build, lint e tsc sem erros. Commit feito a pedido do dono do projeto antes do teste no navegador. Pendente: ele testar em casa os sons, a vibração no Android, o primeiro som no iPhone e as partículas, e pedir ajustes se precisar.

Decisões tomadas na análise (21/10/2026), que prevalecem sobre os itens abaixo:

- Eventos com nome de significado em `useFeedback` (tap, correct, bonus, wrong, batteryComplete, reward, proActivated, heartsRefill, freeze, highFive, onboardingDone). A receita de cada um (som, partículas, vibração) fica só nesse arquivo.
- Mapa mais enxuto que o protótipo: navegação e banner da Lumi sem efeito; confete no acerto só com o bônus 2x; erro com som e vibração dupla; fanfarra com confete na conclusão da bateria, no baú, nas épicas, no Pro e no fim do onboarding; `pop` nas microinterações (opções do onboarding, plano, flashcard, guarda-roupa, clique na Lumi).
- Um único controle "Sons e vibração" (`soundEnabled`, ligado por padrão), na barra lateral e no Perfil. A persistência entra na Etapa 6.
- Partículas desligadas com `prefers-reduced-motion`. Canvas ajustado para telas retina e com teto de partículas.
- O `AudioContext` é criado ou retomado no primeiro toque ou tecla (listener no `AppShell`, exigência do iOS).
- Vibração só onde existe `navigator.vibrate` (Chrome no Android). No Safari do iPhone, não vibra.

1. Sons: crie `src/hooks/useSound.ts` com Web Audio, reproduzindo os mesmos tipos de som do protótipo. O `AudioContext` só pode ser criado ou retomado após o primeiro toque do usuário (exigência do iOS). Adicione `soundEnabled` ao store, com um controle para silenciar.
2. Partículas: crie um componente `ParticlesCanvas` montado no `AppShell`, com `position: fixed`, `pointer-events: none` e acima do conteúdo. Exponha uma função (store ou contexto) para disparar `confetti` e `flames`. Respeite `prefers-reduced-motion`.
3. Vibração leve em acerto e erro com `navigator.vibrate`, quando disponível.
4. Ligue os efeitos aos mesmos eventos do protótipo: acerto, erro, baú, incentivo na Comunidade, conclusão da bateria.

Commit: `feat: sons, particulas e vibracao`.

### Etapa 6: persistência local provisória (concluída em 21/10/2026)

Resultado: build, lint e tsc sem erros. Funções de data testadas com datas simuladas (inclusive viradas de mês e de ano). Testado no navegador pelo dono do projeto: progresso, tema e som mantidos ao recarregar, baú uma vez por dia, "Apagar meu progresso" e a virada de dia simulada pelo console (congelamento salvando a ofensiva, ofensiva zerando sem congelamento, estudo de ontem mantendo a ofensiva).

Decisões tomadas na análise (21/10/2026), que prevalecem sobre os itens abaixo:

- Módulo único `src/store/persistence.ts`: chave `studyloom-state-v1` com as partes `game` e `lumi`, `localStorage` protegido (aba anônima, bloqueio, JSON inválido), só dados (sem funções), versão com descarte de formato desconhecido.
- Persistem todos os dados dos dois stores. A bateria em andamento não persiste.
- Usuário novo começa do zero (ofensiva 0, 0 XP, meta padrão 60 XP, a opção Consistente).
- Virada de dia (`syncDay`) ao abrir o app e quando a aba volta a ficar visível, com data local: meta diária zera, baú renova, vidas recarregam e a regra da ofensiva com congelamento é aplicada (banner da Lumi quando o congelamento salva).
- Baú uma vez por dia e vidas recarregadas na virada do dia (regras de negócio atualizadas acima).
- "Apagar meu progresso" no Perfil, com confirmação: volta ao estado de usuário novo e ao onboarding. Tema e som são preferências e ficam.
- O tema salvo é aplicado em `main.tsx` antes da primeira renderização. Duas abas abertas: vale a última gravação.

Hoje tudo zera ao recarregar a página. Antes do backend existir, use o middleware `persist` do Zustand com `localStorage`:

1. Chave `studyloom-state-v1`, guardando só dados (não funções). Inclua um campo de versão para migrar no futuro.
2. Persista progresso (XP, ofensiva, vidas, baú, fantasia, nome, carreira, onboarding concluído, tema, som).
3. Deixe o código preparado para trocar essa camada pela API depois, concentrando o acesso em um único lugar.
4. Trate a virada de dia: se `lastStudyDay` for anterior a ontem, a ofensiva volta a 0 ao abrir o app.
5. Resolva o ponto em aberto 3 (valores iniciais de um usuário novo).

Commit: `feat: persistencia local do progresso`.

### Etapa 7: polimento (concluída em 21/10/2026)

Resultado: build, lint e tsc sem erros; `npm audit` sem vulnerabilidades. Testado no navegador pelo dono do projeto: selo da Trilha, navegação por teclado, imagens WebP e os acessórios da Lumi no guarda-roupa. Decisões da análise (21/10/2026):

- Selo "BATERIA 2X XP": o defeito vinha do protótipo (selo 42 px acima do nó, gap de 28 px). Corrigido com espaço extra só no passo com o selo (`.trail-step.has-bubble`).
- Foco visível global por `:focus-visible`. Alvos de 44 px só em telas de toque (`pointer: coarse`), para não mudar o desktop; nos chips, no fechar da bateria e nos links pequenos a área cresce por pseudo-elemento invisível.
- Elementos clicáveis que não são botão (marcas, chips de XP, faixa do Caderno, Lumi da Trilha) ganharam foco e teclado por `pressable()`. O banner da Lumi segue como região de aviso (`role="status"`). `aria-label` nos botões só com ícone.
- `prefers-reduced-motion` desliga as animações e transições de CSS (as partículas já respeitavam).
- Áreas seguras do iPhone na barra inferior, no cabeçalho mobile, no banner e no fim do conteúdo.
- Rotas com `React.lazy` (menos a Trilha), com `Suspense` em volta do `Outlet`. `PlaceholderPage` removida.
- Imagens: os 6 JPGs (1024 px, cerca de 550 KB) viraram WebP de 768 px (25 a 30 KB), convertidos pelo Chrome sem dependência. Os JPGs saíram de `public` (os originais seguem na pasta do protótipo e no git).
- `docs/pendencias.md` na raiz, com imagens, conteúdo, simulações, testes, revisões e segurança ao publicar.
- Acessórios da Lumi (ponto em aberto 4): as 3 imagens do colega (1200 x 1600, só na pose Padrão) viraram WebP quadrado de 768 px, com as laterais completadas pela borda da própria imagem. Escolher acessório equipa a pose Padrão; outra pose devolve o acessório a "nenhum"; a épica tem prioridade.

1. Compare a Trilha com o protótipo na mesma largura. Há uma sobreposição do selo "BATERIA 2X XP" com a legenda do nó anterior, que pode existir também no original. Se existir, corrija no CSS.
2. Acessibilidade e toque: alvos de pelo menos 44 px, foco visível, `aria-label` nos botões só com ícone.
3. Áreas seguras do iOS (`viewport-fit=cover` já está no `index.html`): garanta que a barra inferior respeite `env(safe-area-inset-bottom)`.
4. Carregamento: rotas com `React.lazy`. Converta as imagens de `public/assets` para WebP (atualize as referências) e mantenha os nomes.
5. Revise textos: "LEI E JUSTICA" (sem cedilha) na imagem da toga e "Magic Studies" (em inglês) na imagem do dinossauro precisam ser regeneradas. Apenas registre isso em `docs/pendencias.md`, porque são imagens que o dono do projeto precisa gerar de novo. Registre também as imagens da Lumi com acessórios (ponto em aberto 4).
6. As questões atuais citam FGV e Cebraspe com enunciados que parecem de prova real. Registre em `docs/pendencias.md` a necessidade de trocar por questões originais no estilo da banca ou licenciadas, antes de qualquer lançamento comercial.

Commit: `chore: polimento e pendencias`.

### Etapa 8: PWA

Esta etapa exige uma nova dependência, então peça aprovação antes (a sugestão é `vite-plugin-pwa`).

1. Remova os restos do template do Vite em `public/` (`favicon.svg`, com o logo do Vite, e `icons.svg`). Hoje nada os referencia, e foram mantidos de propósito até esta etapa. Crie o favicon do Studyloom e ligue-o no `index.html`.
2. `manifest` com nome, cores, ícones (192 e 512 px) e `display: standalone`.
3. Service worker com cache offline dos arquivos estáticos e das imagens.
4. Teste a instalação no Chrome e no celular.

Commit: `feat: PWA`.

## Depois do front: backend (Fase 1)

Não comece o backend sem pedido explícito. Quando for a hora, ele vive em `studyloom-api` (Spring Boot 3 com Java 21, PostgreSQL, Flyway, Spring Security com JWT). Ordem sugerida:

1. Esquema do banco: usuário, questão (com tags de matéria, banca, assunto e dificuldade), tentativa, progresso e ofensiva.
2. Autenticação (cadastro, login, renovação de token).
3. Endpoints de questões e de registro de tentativas.
4. Troca do `persist` local pelas chamadas à API, usando TanStack Query.
5. Vidas que recarregam por tempo no servidor, ofensiva e XP validados no servidor.
6. Pagamento real (Pix e cartão) e política de privacidade conforme a LGPD, antes de coletar qualquer dado.

## Definição de pronto (vale para toda etapa)

- `npm run build` passa sem erros.
- `npm run lint` passa sem erros novos.
- `npx tsc -b` não mostra erros de tipo.
- A tela nova foi aberta no navegador em desktop e abaixo de 720 px, e o fluxo principal foi percorrido. Descreva o que foi testado.
- Nenhum valor fixo no lugar de dado do store, nenhuma menção a Duolingo, nenhuma promessa de resultado sem comprovação.
- Resultado apresentado ao dono do projeto e commit feito, com mensagem curta em português no formato `tipo: descrição`.
