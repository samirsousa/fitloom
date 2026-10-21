# Studyloom: guia de avaliação do front

Obrigado por avaliar o Studyloom. Este guia explica como rodar o projeto, o que testar e o que mudou desde o começo da migração. A ideia é ouvir a sua opinião sobre o front **antes** de começarmos o backend.

## O que é o Studyloom

Uma plataforma web de estudo gamificado para concursos públicos. O aluno escolhe a carreira-alvo, segue uma Trilha do Edital e resolve baterias de questões com cronômetro. A mascote Lumi, uma raposa 3D, comenta o gabarito e tem guarda-roupa. O diferencial que buscamos é o edital no centro (trilha por edital, banca, lei seca, caderno de erros), mais do que a gamificação em si.

O app é React 19 com TypeScript, Vite, Zustand e React Router. Ainda não existe backend: tudo roda no navegador e o progresso fica salvo localmente.

## Como rodar

### Requisitos

- Git
- Node.js **22.12 ou mais novo** (com npm 10). Confira com `node -v`.

### Passo a passo

```bash
git clone https://github.com/samirsousa/fitloom.git
cd fitloom/studyloom-web
npm ci
npm run dev
```

Abra **http://localhost:5173/**.

- `npm ci` instala exatamente as versões do `package-lock.json`, as mesmas que testamos.
- **Windows com PowerShell:** se aparecer erro de "execução de scripts desabilitada", use `npm.cmd ci` e `npm.cmd run dev`, ou rode os comandos no Prompt de Comando (CMD).
- **Rede corporativa:** se o `npm ci` falhar por proxy ou certificado, rode em outra rede. Não é preciso nenhuma configuração especial.

### Versão de produção (para testar o app instalável e offline)

```bash
npm run build
npm run preview
```

Abra **http://localhost:4173/**. Só nessa versão o service worker fica ativo. No `npm run dev` ele fica desligado de propósito.

### Estrutura do repositório

```
studyloom-web/        o app React (é aqui que se roda tudo)
studyloom-prototipo/  o protótipo original em HTML, CSS e JS (só referência)
docs/                 este guia, as pendências e a arte original do ícone
CLAUDE.md             contexto completo do projeto, decisões e histórico das etapas
```

## Antes de testar, saiba que

- **O progresso fica salvo no seu navegador.** Para começar do zero, use **Perfil > "Apagar meu progresso"** (no fim da página).
- **Na primeira vez aparece a abertura** (splash e três perguntas rápidas). Dá para pular e rever depois em "Rever abertura".
- **Várias coisas ainda são simuladas ou dados de exemplo**, porque dependem do backend:
  - só há 4 questões, e elas são provisórias;
  - os rivais da liga, o feed da Comunidade e o Caderno de Erros são fixos;
  - a assinatura Pro é simulada (nenhuma cobrança) e pode ser cancelada na própria tela;
  - os anúncios são "da casa" (divulgam o próprio app), não de uma rede real;
  - não existe login, e o onboarding pede só um nome.
- **Os sons** só começam depois do primeiro clique (regra dos navegadores). Há um botão "Sons e vibração" na barra lateral e no Perfil.

## Roteiro de testes

Teste em uma janela larga (desktop) e também abaixo de 720 px. No Chrome: F12, depois Ctrl+Shift+M, e escolha um celular. Não precisa seguir à risca; o mais valioso é a sua impressão de uso.

### 1. Abertura (onboarding)
- [ ] O splash laranja aparece e passa sozinho (ou com um clique).
- [ ] Escolha uma carreira e uma meta diária, digite seu nome e comece.
- [ ] O banner da Trilha mostra o módulo da carreira escolhida, e o painel direito mostra o foco e a meta.
- [ ] "Pular" funciona, e "Rever abertura" (barra lateral ou Perfil) abre de novo com as escolhas marcadas.

### 2. Trilha do Edital (tela inicial)
- [ ] Clique na Lumi: a fala muda.
- [ ] O 4º círculo é o **Baú do Aprovado**: ele dá +50 XP uma vez por dia e depois mostra "volta amanhã".
- [ ] O selo "BATERIA 2X XP" não cobre a legenda de outro círculo.

### 3. Bateria de questões
- [ ] Responda rápido (com mais da metade do tempo restante): ganha XP em dobro e solta confete.
- [ ] Erre uma questão: perde uma vida e o som de erro toca.
- [ ] Ao concluir: a tela de resultado mostra XP, ofensiva e aproveitamento. A ofensiva sobe no máximo uma vez por dia.
- [ ] Com 0 vidas a bateria não começa. Dá para recarregar por 100 XP na Loja.

### 4. Loja da Lumi e Perfil
- [ ] Fantasias épicas: o Dino custa 500 XP, a Toga exige estar no top 3 da liga e a Farda de Auditor exige o Pro.
- [ ] No Perfil: troque a pelagem, a pose e os acessórios (óculos, fones e o combo). A Lumi muda em todas as telas.
- [ ] Os acessórios só existem na pose Padrão: escolher um acessório coloca a Lumi nela.

### 5. Studyloom Pro
- [ ] Escolha um plano e assine (simulado). As vidas viram ∞, a Lumi veste a Farda de Auditor e os anúncios somem.
- [ ] "Cancelar assinatura (simulação)" volta tudo ao normal.

### 6. Outras telas
- [ ] **Caderno de Erros:** os flashcards viram com um clique.
- [ ] **Ligas:** a sua posição no ranking é calculada pelo seu XP.
- [ ] **Comunidade:** o botão de incentivo solta chamas.

### 7. Persistência
- [ ] Recarregue a página (F5): XP, ofensiva, compras, Lumi, tema e som continuam iguais.
- [ ] "Apagar meu progresso" volta tudo ao início (o tema e o som ficam).

### 8. App instalável e offline (versão de produção, porta 4173)
- [ ] O ícone da Lumi aparece na aba, e a barra de endereço oferece "Instalar Studyloom".
- [ ] Depois de abrir uma vez, em F12 > Application > Service Workers, marque "Offline" e recarregue: o app continua abrindo.

### 9. Acessibilidade
- [ ] Navegue só com Tab, Enter e Espaço: dá para usar o menu, a Trilha e os botões, e o item em foco fica com contorno laranja.

## O que mais queremos ouvir de você

1. O fluxo faz sentido? Onde você travou ou não entendeu o que fazer?
2. Os textos estão claros? Algum soa exagerado ou promete demais?
3. O visual no celular está bom? Algo pequeno demais, apertado ou cortado?
4. A gamificação (XP, ofensiva, vidas, liga, Lumi) ajuda ou atrapalha o estudo?
5. O que você sente falta para usar isso de verdade na sua preparação?
6. Bugs: diga a tela, o que você fez, o que esperava e o que aconteceu (um print ajuda).

## O que mudou desde a Etapa 1

O protótipo original era um único HTML com JavaScript puro. Ele foi migrado para React por etapas, mantendo o visual e corrigindo regras e textos pelo caminho.

| Etapa | O que entrou |
|---|---|
| 0. Verificação | Base React com as telas da Trilha, Bateria, Caderno de Erros, Ligas e Comunidade já migradas; ranking da liga passou a ser calculado. |
| 1. Loja da Lumi | Avatar compartilhado em todo o app, fantasias épicas com regras de desbloqueio (XP, top 3 da liga, Pro), recarga de vidas e congelamento de ofensiva. |
| 2. Perfil | Dados reais do usuário, taxa de acerto real, guarda-roupa (pelagem, pose, épicas) e conquistas. |
| 3. Pro | Tela de planos com assinatura simulada, identidade dourada, textos sem promessas sem comprovação e sem referência a outras marcas; espaços de anúncio "da casa" que somem no Pro; ligas renomeadas por cargo (Técnico, Analista, Auditor, Magistratura). |
| 4. Onboarding | Abertura com carreira-alvo, meta diária em XP e nome; pular e rever abertura. Sem coleta de e-mail (fica para o backend e a LGPD). |
| 5. Sons e efeitos | Sons, confete, chamas e vibração ligados a eventos (acerto com bônus, erro, conclusão, baú, Pro), com botão para desligar e respeito ao "reduzir movimento" do sistema. |
| 6. Persistência | Progresso salvo no navegador, virada de dia (meta diária zera, baú renova, vidas recarregam, ofensiva com congelamento), usuário novo começando do zero e "Apagar meu progresso". |
| 7. Polimento | Acessibilidade (foco visível, teclado, alvos de toque), áreas seguras do iPhone, telas carregadas sob demanda, imagens em WebP (de cerca de 550 KB para 30 KB cada), acessórios da Lumi com imagens próprias e lista de pendências. |
| 8. App instalável | Ícone do app, manifest e service worker próprio (sem dependência externa) para instalar e abrir offline. |

As decisões de cada etapa estão detalhadas no `CLAUDE.md`, na seção "Plano passo a passo".

## Próximos passos

- **Depois da sua avaliação**, ajustamos o front e começamos o **backend** (Spring Boot, PostgreSQL e autenticação), que vai trazer login, banco de questões, ranking real e pagamento.
- As pendências conhecidas (imagens a refazer, questões originais, segurança ao publicar) estão em [`docs/pendencias.md`](pendencias.md).
