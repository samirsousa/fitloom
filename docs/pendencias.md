# Pendências do Studyloom

Lista do que ainda falta antes de um lançamento. As decisões e o histórico das etapas estão no `CLAUDE.md`.

## Imagens a criar ou refazer (dono do projeto)

- **Toga (`lumi-judge`)**: regenerar. O livro diz "LEI E JUSTICA", sem cedilha.
- **Dinossauro (`lumi-dino`)**: regenerar. A imagem tem o texto "Magic Studies", em inglês.
- **Lumi com acessórios**: as 3 imagens (óculos, fones e os dois) já estão no app, só na pose Padrão. Opcional: versões nas poses Coach e Celebração. Os fones têm um texto minúsculo nas conchas; se aparecer numa tela grande, pedir uma versão sem nada escrito.
- **Especificação para novas imagens**: 1024 x 1024, quadrada, mesmo estilo 3D e enquadramento da `lumi-hero`, fundo claro, sem texto na imagem. No app elas são convertidas para WebP de 768 px.
- **Ícone do app**: recortado da arte em `docs/brand/icone-lumi-original.jpg` (cabeça com capelo, sem o texto). Confirmar os direitos de uso comercial da arte antes do lançamento.

## Conteúdo

- **Questões**: as atuais citam FGV e Cebraspe com enunciados que parecem de prova real. Antes de qualquer lançamento comercial, trocar por questões originais no estilo da banca ou por questões licenciadas.
- **Dados de exemplo**: rivais da liga, feed da Comunidade, Caderno de Erros (pegadinhas e flashcards), conquista "Mestre da Lei Seca" e os nós da Trilha. Estão marcados com `TODO backend` no código.

## Simulado no MVP (depende do backend)

- Login e conta (o onboarding pede só o nome).
- Pagamento do Pro (Pix e cartão). A assinatura hoje é simulada e sem cobrança.
- Anúncios: hoje são anúncios da casa. A rede real (AdSense) exige domínio próprio, política de privacidade e consentimento conforme a LGPD.
- Ranking real da liga, vidas recarregadas por tempo no servidor e questões por carreira.

## Testes pendentes

- Sons e vibração da Etapa 5 (o dono do projeto testa em casa): som no desktop, vibração no Android e o primeiro som no iPhone.
- Instalação do PWA no Chrome e no celular (Etapa 8), agora possível pelo link do GitHub Pages (https://samirsousa.github.io/fitloom/).

## Revisões futuras

- Tela inicial (splash e onboarding): aprovada como versão provisória. Revisitar visual e fluxo.

## Segurança, ao publicar

- Configurar no servidor de hospedagem os cabeçalhos de segurança: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` e `Permissions-Policy`. Não foram postos no `index.html` porque a CSP por meta quebra o servidor de desenvolvimento do Vite.
- Fontes: Nunito e Plus Jakarta Sans vêm do Google Fonts, o que envia o IP do usuário ao Google (ponto de atenção na LGPD) e deixa o app sem essas fontes quando está offline. Antes do lançamento, hospedar as fontes no próprio site.
- Servir só por HTTPS (o service worker exige HTTPS fora do localhost). O GitHub Pages já serve por HTTPS, mas não permite configurar os cabeçalhos de segurança acima; para o lançamento, avaliar uma hospedagem que permita.
- O `localStorage` guarda só progresso e preferências (nome de exibição incluso). Nenhum dado sensível deve ir para lá; com o backend, o token de sessão não deve ficar no `localStorage`.
