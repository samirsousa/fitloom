// ============================================================================
// Studyloom — Plataforma Web Responsiva de Concursos Públicos (Desktop & Mobile),
// Trilha do Edital, Cronômetro por Questão 2x XP, Studyloom Pro & Mentora Lumi 3D
// ============================================================================

const state = {
  currentScreen: 'trail',
  streak: 14,
  hearts: 5,
  isPro: false,
  selectedProPlan: 'annual',
  totalXp: 1420,
  dailyXp: 35,
  dailyXpGoal: 50,
  currentCardIndex: 0,
  correctCount: 0,
  sessionEarnedXp: 0,
  answeredCurrent: false,
  pushIndex: 0,
  theme: 'dark',
  chestOpened: false,
  timerInterval: null,
  timerMaxSeconds: 30,
  timerSecondsLeft: 30,
  onboarding: {
    step: 0,
    goal: 'Tribunais & MP',
    moduleTitle: 'Português, Direito Constitucional & Raciocínio Lógico',
    level: 'Intermediário',
    routine: '30 min/dia • 20 Questões',
    userName: 'Samir'
  },
  lumiWardrobe: {
    activeTab: 'free',
    imgPath: 'assets/lumi-hero.jpg',
    skinTag: 'Lumi Aprovada 🎓',
    skinTitle: 'Lumi Concurseira Aprovada (Capelo & Diploma)',
    furColorKey: 'classic',
    furColorLabel: 'Laranja Clássico',
    accessoryKey: 'none',
    accessoryLabel: 'Sem Acessório',
    activeEpicId: null,
    dinoUnlocked: false
  }
};

// Banco de Questões de Concurso Público (Português, Direito Constitucional & Raciocínio Lógico)
const STORY_CARDS = [
  {
    id: 'portugues-fgv',
    type: 'multiple_choice',
    pillar: 'nutrition',
    badgeText: '📚 Questão 1/3 • Língua Portuguesa (FGV)',
    xp: 15,
    timeLimit: 30,
    microTip: '💡 Banca FGV • Assunto: Emprego do Sinal Indicativo de Crase',
    question: 'Assinale a alternativa em que o emprego do acento grave indicativo de crase está CORRETAMENTE utilizado segundo a norma-padrão:',
    cueIcon: '📌',
    cueText: 'Bizu da Lumi: Lembre-se de que NUNCA ocorre crase antes de verbos, pronomes pessoais ou palavras masculinas!',
    options: [
      {
        key: 'A',
        text: 'O candidato passou à estudar duas horas por dia após o edital.',
        correct: false
      },
      {
        key: 'B',
        text: 'Os documentos foram entregues à Vossa Excelência no prazo legal.',
        correct: false
      },
      {
        key: 'C',
        text: 'A aprovação está condicionada à dedicação diária na resolução de questões.',
        correct: true
      }
    ],
    lumiSuccessTitle: '🔥 Gabarito C! Domínio Total da FGV!',
    lumiSuccessMsg: 'Gabarito Comentado pela Lumi: "Condicionada" exige a preposição "a" e o substantivo feminino "dedicação" aceita o artigo "a" (a + a = à). Nas demais opções, não há crase antes do verbo "estudar" nem antes do pronome de tratamento "Vossa Excelência"!',
    lumiFailTitle: '🦊 Atenção à Pegadinha da FGV! Veja o Gabarito Comentado:',
    lumiFailMsg: 'A resposta correta é a C! Nunca ocorre crase antes de verbo ("a estudar") nem antes de pronomes de tratamento ("a Vossa Excelência"). Já "condicionada à dedicação" une preposição + artigo feminino!'
  },
  {
    id: 'constitucional-cebraspe',
    type: 'true_false',
    pillar: 'workout',
    badgeText: '⚖️ Questão 2/3 • Direito Constitucional (Cebraspe)',
    xp: 15,
    timeLimit: 25,
    microTip: '⚡ Banca Cebraspe • Art. 5º, XI da CF/88 (Inviolabilidade Domiciliar)',
    question: 'Julgue o item: "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo, a qualquer hora do dia ou da noite, por determinação judicial."',
    cueIcon: '⚖️',
    cueText: 'Atenção ao texto literal do Art. 5º, inciso XI da Constituição Federal sobre o horário de cumprimento de mandado judicial!',
    options: [
      {
        key: 'C',
        text: '✅ CERTO',
        correct: false
      },
      {
        key: 'E',
        text: '❌ ERRADO (Pegadinha!)',
        correct: true
      }
    ],
    lumiSuccessTitle: '⚖️ Item ERRADO! Você não caiu na pegadinha do Cebraspe!',
    lumiSuccessMsg: 'Gabarito Comentado pela Lumi: Segundo o Art. 5º, XI da CF/88, por determinação judicial a entrada sem consentimento SÓ pode ocorrer DURANTE O DIA! À noite, apenas em caso de flagrante delito, desastre ou para prestar socorro.',
    lumiFailTitle: '🦊 Clássica pegadinha do Cebraspe! Veja o Gabarito Comentado:',
    lumiFailMsg: 'O item está ERRADO! Determinação judicial só autoriza a entrada DURANTE O DIA (Art. 5º, XI, CF/88). Durante a noite, somente em flagrante delito, desastre ou para prestar socorro!'
  },
  {
    id: 'rlm-condicional',
    type: 'multiple_choice',
    pillar: 'workout',
    badgeText: '🧠 Questão 3/3 • Raciocínio Lógico (FCC / FGV)',
    xp: 15,
    timeLimit: 30,
    microTip: '🎯 Desafio Final da Bateria • Negação de Proposição Composta',
    question: 'Qual é a NEGAÇÃO lógica correta da proposição condicional: "Se o concurseiro resolve questões, então passa na prova"?',
    cueIcon: '🧠',
    cueText: 'Bizu da Lumi: Para negar o "Se... então...", aplique a famosa Regra do MANÉ (MAntém a primeira E NEga a segunda)!',
    options: [
      {
        key: 'A',
        text: 'O concurseiro resolve questões E não passa na prova.',
        correct: true
      },
      {
        key: 'B',
        text: 'Se o concurseiro não resolve questões, então não passa na prova.',
        correct: false
      },
      {
        key: 'C',
        text: 'O concurseiro não resolve questões OU passa na prova.',
        correct: false
      }
    ],
    lumiSuccessTitle: '🏆 Gabarito A! Regra do MANÉ Cravada!',
    lumiSuccessMsg: 'Gabarito Comentado pela Lumi: A negação de uma condicional (Se P, então Q) nunca é outra condicional! Pela regra do MANÉ, MAntemos a primeira parte ("O concurseiro resolve questões"), trocamos pelo conectivo "E" e NEgamos a segunda ("não passa na prova").',
    lumiFailTitle: '🦊 Lembre-se sempre da Regra do MANÉ! Veja o comentário:',
    lumiFailMsg: 'Gabarito A! Nunca negue um "Se... então" com outro "Se... então". Aplique o MANÉ: MAntém a 1ª ("resolve questões") + conectivo "E" + NEga a 2ª ("não passa na prova").'
  }
];

const LUMI_PUSH_MESSAGES = [
  '🔥 "Ei, futuro aprovado! Sua chama de 14 dias está acesa! Resolva 3 questões de Direito Constitucional com bônus 2x XP!"',
  '🦊 "Bizu da Lumi: Ordem judicial só entra na casa DURANTE O DIA (Art. 5º, XI)! Bora treinar mais questões?"',
  '🏆 "Liga Auditor Esmeralda: Você está em #2! Ganhe um bônus de agilidade no cronômetro para assumir a liderança!"',
  '🎯 "Caderno de Erros atualizado: Revise a Regra do MANÉ em Raciocínio Lógico em 30 segundos!"'
];

const LUMI_TRAIL_SPEECHES = [
  '"Responda rápido p/ ganhar 2x XP! ⚡"',
  '"Art. 5º da CF/88 despenca em prova! ⚖️"',
  '"Abra o Baú do Aprovado (+50 XP)! 🎁"',
  '"Você está em #2 na Liga Auditor! 🏆"'
];

// ============================================================================
// Web Audio API — Efeitos Sonoros Gamificados
// ============================================================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type) {
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    if (type === 'correct') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.065);
        gain.gain.setValueAtTime(0.16, now + i * 0.065);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.065 + 0.24);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.065);
        osc.stop(now + i * 0.065 + 0.25);
      });
    } else if (type === 'wrong') {
      const notes = [240, 195];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.1, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.24);
      });
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.38);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } else if (type === 'pop') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (_) {}
}

// ============================================================================
// Motor Global de Partículas (100% Viewport): Confetes & Chamas 🔥
// ============================================================================
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

function spawnParticles(mode = 'confetti') {
  resizeCanvas();
  const count = mode === 'flames' || mode === 'hearts' ? 24 : 55;
  const colors = ['#FF5722', '#10B981', '#0D9488', '#FBBF24', '#FF4B4B', '#34D399'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width * (0.25 + Math.random() * 0.5),
      y: mode === 'flames' || mode === 'hearts' ? canvas.height * 0.48 : canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 11,
      vy: mode === 'flames' || mode === 'hearts' ? -(3.5 + Math.random() * 6.5) : -(6 + Math.random() * 9),
      gravity: mode === 'flames' || mode === 'hearts' ? -0.04 : 0.24,
      size: mode === 'flames' || mode === 'hearts' ? 18 + Math.random() * 10 : 8 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      alpha: 1,
      mode
    });
  }

  if (!animFrameId) {
    renderParticles();
  }
}

function renderParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.vr;
    p.alpha -= (p.mode === 'flames' || p.mode === 'hearts') ? 0.02 : 0.015;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    if (p.mode === 'flames') {
      ctx.font = `${Math.round(p.size)}px sans-serif`;
      ctx.fillText('🔥', -p.size / 2, p.size / 2);
    } else if (p.mode === 'hearts') {
      ctx.font = `${Math.round(p.size)}px sans-serif`;
      ctx.fillText('❤️', -p.size / 2, p.size / 2);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    }
    ctx.restore();
  });

  particles = particles.filter((p) => p.alpha > 0);

  if (particles.length > 0) {
    animFrameId = requestAnimationFrame(renderParticles);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animFrameId = null;
  }
}

// ============================================================================
// 3. FLUXO DE ONBOARDING PARA NOVOS CONCURSEIROS (SEM CONTA)
// - Splash Laranja -> Lumi 3D fazendo joinha -> Quiz 3 Etapas -> Conversão Gamificada
// ============================================================================
let splashTimer = null;

function transitionSplashToWelcome() {
  const splashStage = document.getElementById('splash-orange-stage');
  if (!splashStage || splashStage.classList.contains('fade-out')) return;

  if (splashTimer) clearTimeout(splashTimer);
  splashStage.classList.add('fade-out');
}

function goToOnboardingStep(stepNum) {
  playSound('pop');
  state.onboarding.step = stepNum;

  for (let i = 0; i <= 4; i++) {
    const el = document.getElementById(`onb-step-${i}`);
    if (el) {
      el.classList.toggle('active', i === stepNum);
    }
  }

  const pctMap = { 0: 20, 1: 45, 2: 70, 3: 90, 4: 100 };
  const labelMap = {
    0: 'Boas-vindas',
    1: 'Etapa 1 / 3 • Concurso Alvo',
    2: 'Etapa 2 / 3 • Nível Atual',
    3: 'Etapa 3 / 3 • Tempo Diário',
    4: 'Edital Pronto! 🎉'
  };

  const fillEl = document.getElementById('onb-progress-fill');
  const indEl = document.getElementById('onb-step-indicator');
  if (fillEl) fillEl.style.width = `${pctMap[stepNum] || 20}%`;
  if (indEl) indEl.textContent = labelMap[stepNum] || '';
}

function selectOnboardingOption(step, value, moduleTitle, btnEl) {
  playSound('correct');

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.onb-choice-card').forEach((b) => b.classList.remove('selected'));
    btnEl.classList.add('selected');
  }

  if (step === 1) {
    state.onboarding.goal = value;
    if (moduleTitle) state.onboarding.moduleTitle = moduleTitle;
    document.getElementById('summary-goal-pill').textContent = `⚖️ Carreira: ${value}`;
    setTimeout(() => goToOnboardingStep(2), 240);
  } else if (step === 2) {
    state.onboarding.level = value;
    document.getElementById('summary-level-pill').textContent = `📖 Nível: ${value}`;
    setTimeout(() => goToOnboardingStep(3), 240);
  } else if (step === 3) {
    state.onboarding.routine = value;
    document.getElementById('summary-routine-pill').textContent = `🔥 Meta: ${value}`;
    spawnParticles('confetti');
    setTimeout(() => goToOnboardingStep(4), 280);
  }
}

function completeOnboardingConversion() {
  const nameInput = document.getElementById('signup-name-input');
  const chosenName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Concurseiro';
  state.onboarding.userName = chosenName;

  // Atualiza dados personalizados do concurseiro em toda a plataforma web
  const bannerTitle = document.getElementById('banner-module-title');
  const bannerPhase = document.getElementById('banner-phase-tag');
  const planSubtitle = document.getElementById('user-plan-subtitle');
  const widgetPlan = document.getElementById('widget-plan-tag');
  const profName = document.getElementById('profile-user-name');
  const profFocus = document.getElementById('profile-user-focus');
  const leagueName = document.getElementById('league-user-name');

  if (bannerTitle) bannerTitle.textContent = state.onboarding.moduleTitle;
  if (bannerPhase) bannerPhase.textContent = `EDITAL PERSONALIZADO • ${state.onboarding.goal.toUpperCase()} • ${chosenName.toUpperCase()}`;
  if (planSubtitle) planSubtitle.textContent = `Meta: ${state.onboarding.routine} • Carreira: ${state.onboarding.goal} (${state.onboarding.level})`;
  if (widgetPlan) widgetPlan.textContent = `Foco: ${state.onboarding.goal}`;
  if (profName) profName.textContent = `${chosenName} • Concurseiro Studyloom`;
  if (profFocus) profFocus.textContent = `🛡️ Liga Auditor Esmeralda • Foco: ${state.onboarding.goal}`;
  if (leagueName) leagueName.textContent = chosenName;

  const introOverlay = document.getElementById('intro-overlay');
  if (introOverlay) introOverlay.classList.add('hidden');

  playSound('fanfare');
  switchScreen('trail');

  setTimeout(() => {
    spawnParticles('confetti');
    spawnParticles('flames');
    triggerLumiPush(`🔥 Bem-vindo(a), ${chosenName}! Sua Trilha do Edital no Studyloom para "${state.onboarding.goal}" foi criada e seu 1º Streak está ativo!`);
  }, 300);
}

function skipOnboardingToApp() {
  const introOverlay = document.getElementById('intro-overlay');
  if (introOverlay) introOverlay.classList.add('hidden');
  playSound('pop');
  switchScreen('trail');
}

function replayOpeningSequence() {
  const introOverlay = document.getElementById('intro-overlay');
  const splashStage = document.getElementById('splash-orange-stage');

  if (splashTimer) clearTimeout(splashTimer);
  stopQuestionTimer();

  goToOnboardingStep(0);
  introOverlay.classList.remove('hidden');
  splashStage.classList.remove('fade-out');

  playSound('pop');

  splashTimer = setTimeout(() => {
    transitionSplashToWelcome();
  }, 1800);
}

// ============================================================================
// Navegação Responsiva: Sidebar Desktop + Bottom Bar Mobile (6 Abas c/ Studyloom Pro)
// ============================================================================
const ALL_SCREENS = ['trail', 'practice', 'pro', 'leagues', 'social', 'shop', 'profile', 'quiz'];

function switchScreen(screenName) {
  playSound('pop');
  state.currentScreen = screenName;

  if (screenName !== 'quiz') {
    stopQuestionTimer();
  }

  ALL_SCREENS.forEach((sc) => {
    const el = document.getElementById(`screen-${sc}`);
    if (el) el.classList.toggle('active', sc === screenName);
  });

  // Atualiza Sidebar Esquerda (Desktop)
  const sideMap = {
    trail: 'side-trail',
    quiz: 'side-trail',
    practice: 'side-practice',
    pro: 'side-pro',
    leagues: 'side-leagues',
    social: 'side-social',
    shop: 'side-shop',
    profile: 'side-profile'
  };
  document.querySelectorAll('.left-sidebar .sidebar-nav-btn').forEach((btn) => btn.classList.remove('active'));
  const activeSide = document.getElementById(sideMap[screenName]);
  if (activeSide) activeSide.classList.add('active');

  // Atualiza Barra Inferior (Mobile)
  const mobMap = {
    trail: 'nav-trail',
    practice: 'nav-trail',
    quiz: 'nav-trail',
    pro: 'nav-pro',
    leagues: 'nav-leagues',
    social: 'nav-social',
    shop: 'nav-shop',
    profile: 'nav-profile'
  };
  document.querySelectorAll('.bottom-nav .nav-tab').forEach((tab) => tab.classList.remove('active'));
  const activeMob = document.getElementById(mobMap[screenName]);
  if (activeMob) activeMob.classList.add('active');

  if (screenName === 'quiz') {
    renderCurrentStoryCard();
  }
}

function openModuleQuiz(startCardIdx = 0) {
  document.getElementById('lesson-complete-modal').classList.remove('visible');
  document.getElementById('story-quiz-card').style.display = 'flex';
  state.currentCardIndex = startCardIdx >= STORY_CARDS.length ? 0 : startCardIdx;
  state.correctCount = 0;
  state.sessionEarnedXp = 0;
  switchScreen('quiz');
}

function closeQuizAndReturn() {
  stopQuestionTimer();
  switchScreen('trail');
}

function openChestReward() {
  if (state.chestOpened) {
    triggerLumiPush('🎁 Você já resgatou os +50 XP do Baú de Súmulas Vinculantes neste bloco!');
    return;
  }
  state.chestOpened = true;
  state.totalXp += 50;
  state.dailyXp = Math.min(state.dailyXpGoal, state.dailyXp + 15);
  updateTopDashboardUI();
  playSound('fanfare');
  spawnParticles('confetti');
  spawnParticles('flames');
  triggerLumiPush('🎁 BAÚ DO APROVADO ABERTO! +50 XP adicionados ao seu ranking na Liga Auditor Esmeralda!');
}

// ============================================================================
// CRONÔMETRO DINÂMICO POR QUESTÃO (Bônus de XP em Dobro abaixo do tempo limite)
// ============================================================================
function startQuestionTimer(limitSeconds = 30) {
  stopQuestionTimer();
  state.timerMaxSeconds = limitSeconds;
  state.timerSecondsLeft = limitSeconds;
  updateQuestionTimerUI();

  state.timerInterval = setInterval(() => {
    if (state.answeredCurrent) {
      stopQuestionTimer();
      return;
    }

    state.timerSecondsLeft = Math.max(0, state.timerSecondsLeft - 1);
    updateQuestionTimerUI();

    if (state.timerSecondsLeft === 0) {
      stopQuestionTimer();
    }
  }, 1000);
}

function stopQuestionTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function updateQuestionTimerUI() {
  const secText = document.getElementById('timer-seconds-text');
  const badgeEl = document.getElementById('timer-countdown-badge');
  const pillEl = document.getElementById('bonus-2x-pill');
  const fillEl = document.getElementById('question-timer-fill');

  if (!secText || !fillEl || !pillEl || !badgeEl) return;

  secText.textContent = `${state.timerSecondsLeft}s`;
  const pct = Math.max(0, Math.round((state.timerSecondsLeft / state.timerMaxSeconds) * 100));
  fillEl.style.width = `${pct}%`;

  const isUrgent = state.timerSecondsLeft <= 8 && state.timerSecondsLeft > 0;
  badgeEl.classList.toggle('urgent', isUrgent);
  fillEl.classList.toggle('urgent', isUrgent);

  if (state.timerSecondsLeft > 0) {
    pillEl.classList.remove('expired');
    pillEl.textContent = '⚡ BÔNUS AGILIDADE 2X XP ATIVO!';
  } else {
    pillEl.classList.add('expired');
    pillEl.textContent = '⏱️ TEMPO LIMITE ESGOTADO (XP NORMAL)';
  }
}

// ============================================================================
// Motor de Resolução de Questões de Concurso (c/ Gabarito Comentado pela Lumi)
// ============================================================================
function renderCurrentStoryCard() {
  const cardData = STORY_CARDS[state.currentCardIndex];
  state.answeredCurrent = false;

  const segments = document.querySelectorAll('#stories-segments .story-segment');
  segments.forEach((seg, idx) => {
    seg.classList.remove('completed', 'active');
    if (idx < state.currentCardIndex) {
      seg.classList.add('completed');
    } else if (idx === state.currentCardIndex) {
      seg.classList.add('active');
    }
  });

  const badge = document.getElementById('quiz-pillar-badge');
  badge.className = `story-pillar-badge ${cardData.pillar}`;
  badge.textContent = cardData.badgeText;

  document.getElementById('quiz-xp-pill').textContent = `Base: +${cardData.xp} XP | Rápido: +${cardData.xp * 2} XP ⚡`;
  document.getElementById('quiz-micro-tip').textContent = cardData.microTip;
  document.getElementById('quiz-question-title').textContent = cardData.question;
  document.getElementById('quiz-cue-icon').textContent = cardData.cueIcon;
  document.getElementById('quiz-cue-text').textContent = cardData.cueText;

  const lumiImg = document.getElementById('quiz-lumi-img');
  lumiImg.src = cardData.type === 'true_false' ? 'assets/lumi-coach.jpg' : 'assets/lumi-hero.jpg';

  const feedbackPanel = document.getElementById('quiz-feedback-panel');
  feedbackPanel.className = 'quiz-feedback-panel';

  const optionsContainer = document.getElementById('quiz-options-list');
  optionsContainer.className = cardData.type === 'true_false'
    ? 'quiz-options-list tf-grid'
    : 'quiz-options-list';
  optionsContainer.innerHTML = '';

  cardData.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `
      <span class="option-key">${opt.key}</span>
      <span>${opt.text}</span>
    `;
    btn.addEventListener('click', () => handleSelectAnswer(idx, btn));
    optionsContainer.appendChild(btn);
  });

  // Inicia o cronômetro dinâmico da questão
  startQuestionTimer(cardData.timeLimit || 30);
}

function handleSelectAnswer(selectedIndex, clickedBtn) {
  if (state.answeredCurrent) return;
  state.answeredCurrent = true;
  stopQuestionTimer();

  const cardData = STORY_CARDS[state.currentCardIndex];
  const chosenOption = cardData.options[selectedIndex];
  const allButtons = document.querySelectorAll('#quiz-options-list .quiz-option-btn');

  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (cardData.options[idx].correct) {
      btn.classList.add('correct');
    }
  });

  const lumiImg = document.getElementById('quiz-lumi-img');
  const feedbackPanel = document.getElementById('quiz-feedback-panel');
  const feedbackHeader = document.getElementById('feedback-header');
  const feedbackExplanation = document.getElementById('feedback-explanation');
  const pillEl = document.getElementById('bonus-2x-pill');

  if (chosenOption.correct) {
    clickedBtn.classList.add('correct');
    state.correctCount++;

    // Verifica se respondeu abaixo do limite de tempo para conceder Bônus 2x XP
    const earnedDoubleXp = state.timerSecondsLeft > 0;
    const gainedXp = earnedDoubleXp ? cardData.xp * 2 : cardData.xp;
    const elapsedSeconds = state.timerMaxSeconds - state.timerSecondsLeft;

    state.totalXp += gainedXp;
    state.sessionEarnedXp += gainedXp;
    state.dailyXp = Math.min(state.dailyXpGoal, state.dailyXp + gainedXp);
    updateTopDashboardUI();

    if (earnedDoubleXp) {
      pillEl.classList.remove('expired');
      pillEl.textContent = `⚡ BÔNUS 2X XP CONQUISTADO EM ${elapsedSeconds}s! (+${gainedXp} XP)`;
      const speedStatus = document.getElementById('mission-speed-status');
      const speedBar = document.getElementById('mission-speed-bar');
      if (speedStatus) {
        speedStatus.textContent = 'Concluído ⚡';
        speedStatus.style.color = 'var(--emerald-400)';
      }
      if (speedBar) speedBar.style.width = '100%';
    }

    lumiImg.src = 'assets/lumi-celebrate.jpg';
    feedbackPanel.className = 'quiz-feedback-panel visible is-correct';
    feedbackHeader.textContent = earnedDoubleXp
      ? `${cardData.lumiSuccessTitle} (⚡ +${gainedXp} XP Bônus 2x!)`
      : `${cardData.lumiSuccessTitle} (+${gainedXp} XP)`;
    feedbackExplanation.textContent = cardData.lumiSuccessMsg;

    playSound('correct');
    spawnParticles('confetti');
    spawnParticles('flames');
  } else {
    clickedBtn.classList.add('wrong');
    if (!state.isPro) {
      state.hearts = Math.max(1, state.hearts - 1);
    }
    updateTopDashboardUI();

    lumiImg.src = 'assets/lumi-coach.jpg';
    feedbackPanel.className = 'quiz-feedback-panel visible is-wrong';
    feedbackHeader.textContent = cardData.lumiFailTitle;
    feedbackExplanation.textContent = cardData.lumiFailMsg;

    playSound('wrong');
  }

  const nextBtn = document.getElementById('btn-next-story');
  nextBtn.textContent = state.currentCardIndex < STORY_CARDS.length - 1
    ? 'Próxima Questão da Bateria ➔'
    : 'Concluir Bateria & Ver Desempenho 🏆';
}

function nextStoryCard() {
  if (state.currentCardIndex < STORY_CARDS.length - 1) {
    playSound('pop');
    state.currentCardIndex++;
    renderCurrentStoryCard();
  } else {
    stopQuestionTimer();
    state.streak = 15;
    state.dailyXp = state.dailyXpGoal;
    updateTopDashboardUI();

    const accuracy = Math.round((Math.max(1, state.correctCount) / STORY_CARDS.length) * 100);
    document.getElementById('reward-acc-val').textContent = `${accuracy}%`;
    const earnedEl = document.getElementById('reward-xp-earned');
    if (earnedEl) earnedEl.textContent = `+${Math.max(30, state.sessionEarnedXp)} XP`;

    document.getElementById('story-quiz-card').style.display = 'none';
    document.getElementById('lesson-complete-modal').classList.add('visible');

    playSound('fanfare');
    spawnParticles('confetti');
    setTimeout(() => spawnParticles('flames'), 300);
  }
}

function finishLessonAndReturn() {
  document.getElementById('lesson-complete-modal').classList.remove('visible');
  document.getElementById('story-quiz-card').style.display = 'flex';
  document.getElementById('trail-lumi-img').src = 'assets/lumi-celebrate.jpg';
  document.getElementById('trail-lumi-speech').textContent = '"Ofensiva de 15d no Edital! 🔥"';
  switchScreen('trail');
  spawnParticles('confetti');
}

// ============================================================================
// Tela de Planos Pagos: Studyloom Pro (Inspirado no Duolingo Super)
// ============================================================================
function selectProPlan(planType) {
  playSound('pop');
  state.selectedProPlan = planType;
  const annualCard = document.getElementById('plan-card-annual');
  const monthlyCard = document.getElementById('plan-card-monthly');
  if (annualCard) annualCard.classList.toggle('selected', planType === 'annual');
  if (monthlyCard) monthlyCard.classList.toggle('selected', planType === 'monthly');
}

function activateStudyloomPro() {
  state.isPro = true;
  updateTopDashboardUI();

  const proBtn = document.getElementById('btn-activate-pro');
  if (proBtn) {
    proBtn.textContent = '✅ Studyloom Pro Ativo (Vidas ∞, Resumos IA & Fantasias Épicas)';
    proBtn.style.background = 'linear-gradient(135deg, var(--teal-500), var(--emerald-500))';
  }

  const proTag = document.getElementById('league-pro-tag');
  if (proTag) proTag.style.display = 'inline-flex';

  const profPlan = document.getElementById('profile-plan-status');
  if (profPlan) {
    profPlan.textContent = '💎 Assinante Studyloom Pro Ativo (Vidas ∞ & IA p/ Editais)';
  }

  equipEpicCostume('auditor', true);
  playSound('fanfare');
  spawnParticles('confetti');
  setTimeout(() => spawnParticles('hearts'), 250);
  triggerLumiPush('💎 Bem-vindo ao Studyloom Pro! Vidas Ilimitadas (❤️ ∞), Resumos IA e a Farda de Auditor / Fiscal foram ativados!');
}

// ============================================================================
// Caderno de Erros, Comunidade, Loja da Lumi & Guarda-Roupas Lumi 3D
// ============================================================================
function flipMacroCard(cardEl, title, backText) {
  playSound('pop');
  const isFlipped = cardEl.classList.toggle('flipped');
  if (isFlipped) {
    cardEl.innerHTML = `
      <div style="font-size: 0.82rem; font-weight: 900; color: var(--emerald-400);">${title}</div>
      <div style="font-size: 0.76rem; font-weight: 700; line-height: 1.35; color: var(--text-primary);">${backText}</div>
    `;
  } else {
    const icon = title.split(' ')[0];
    const name = title.split(' ').slice(1).join(' ');
    cardEl.innerHTML = `
      <div style="font-size: 2rem;">${icon}</div>
      <div style="font-size: 0.88rem; font-weight: 900;">${name}</div>
      <div style="font-size: 0.72rem; color: var(--text-secondary);">Clique p/ virar</div>
    `;
  }
}

function sendHighFive(btnEl, friendName) {
  playSound('correct');
  btnEl.textContent = '🔥 Incentivo Enviado!';
  btnEl.disabled = true;
  spawnParticles('flames');
  triggerLumiPush(`🙌 Você enviou incentivo de estudo para ${friendName}! Duplas de estudo mantêm a constância até o edital!`);
}

// Sincroniza o Avatar Padrão Lumi 3D (Pelagem, Acessórios e Fantasia) em todo o app
function syncLumiAvatarAcrossApp() {
  const w = state.lumiWardrobe;
  const furClass = `fur-${w.furColorKey}`;

  const imgIds = ['profile-lumi-img', 'shop-lumi-img', 'trail-lumi-img', 'widget-lumi-img'];
  imgIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.src = w.imgPath;
      el.classList.remove('fur-classic', 'fur-urban-grey', 'fur-cream');
      el.classList.add(furClass);
    }
  });

  // Acessórios Gratuitos sobre a Lumi 3D (Óculos de Grau e Fones de Estudo)
  const showGlasses = w.accessoryKey === 'glasses' || w.accessoryKey === 'both';
  const showHeadphones = w.accessoryKey === 'headphones' || w.accessoryKey === 'both';

  ['profile-acc-glasses', 'shop-acc-glasses'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('visible', showGlasses);
  });

  ['profile-acc-headphones', 'shop-acc-headphones'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('visible', showHeadphones);
  });

  // Atualiza tags e resumos no Perfil e na Loja
  const profTag = document.getElementById('profile-lumi-skin-tag');
  const shopTag = document.getElementById('shop-skin-label');
  const shopTitle = document.getElementById('shop-lumi-title');
  const shopSub = document.getElementById('shop-lumi-sub');
  const profSummary = document.getElementById('profile-style-summary');

  if (profTag) profTag.textContent = w.skinTag;
  if (shopTag) shopTag.textContent = w.skinTag;
  if (shopTitle) shopTitle.textContent = w.skinTitle;
  if (shopSub) {
    shopSub.textContent = `Pelagem: ${w.furColorLabel} • Acessório: ${w.accessoryLabel}`;
  }
  if (profSummary) {
    profSummary.textContent = `Visual: ${w.skinTitle} • Pelagem: ${w.furColorLabel} • ${w.accessoryLabel}`;
  }

  // Atualiza estado dos cards de Fantasias Épicas
  const epicIds = ['dino', 'judge', 'auditor'];
  epicIds.forEach((eid) => {
    const isEquipped = w.activeEpicId === eid;
    const profCard = document.getElementById(`prof-epic-card-${eid}`);
    const shopCard = document.getElementById(`shop-epic-card-${eid}`);
    const profBtn = document.getElementById(`prof-btn-epic-${eid}`);
    const shopBtn = document.getElementById(`shop-btn-epic-${eid}`);

    if (profCard) profCard.classList.toggle('equipped', isEquipped);
    if (shopCard) shopCard.classList.toggle('equipped', isEquipped);

    [profBtn, shopBtn].forEach((btn) => {
      if (!btn) return;
      btn.classList.toggle('equipped-btn', isEquipped);
      if (isEquipped) {
        btn.textContent = '✅ Fantasia Épica Equipada';
      } else if (eid === 'dino') {
        btn.textContent = w.dinoUnlocked ? '🦖 Equipar Pijama de Dinossauro' : '⚡ Desbloquear & Equipar (500 XP)';
      } else if (eid === 'judge') {
        btn.textContent = '🏆 Equipar Toga de Magistrado';
      } else if (eid === 'auditor') {
        btn.textContent = '💎 Equipar Farda de Auditor';
      }
    });
  });
}

function switchWardrobeTab(tabName) {
  playSound('pop');
  state.lumiWardrobe.activeTab = tabName;

  const freeBtn = document.getElementById('wardrobe-tab-free');
  const epicBtn = document.getElementById('wardrobe-tab-epic');
  const freePane = document.getElementById('wardrobe-pane-free');
  const epicPane = document.getElementById('wardrobe-pane-epic');

  if (freeBtn) freeBtn.classList.toggle('active', tabName === 'free');
  if (epicBtn) epicBtn.classList.toggle('active', tabName === 'epic');
  if (freePane) freePane.classList.toggle('active', tabName === 'free');
  if (epicPane) epicPane.classList.toggle('active', tabName === 'epic');
}

function setLumiFurColor(furKey, furLabel, btnEl) {
  playSound('pop');
  state.lumiWardrobe.furColorKey = furKey;
  state.lumiWardrobe.furColorLabel = furLabel;

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  syncLumiAvatarAcrossApp();
  triggerLumiPush(`🦊 Pelagem gratuita "${furLabel}" aplicada no seu avatar Lumi 3D!`);
}

function setLumiAccessory(accKey, accLabel, btnEl) {
  playSound('pop');
  state.lumiWardrobe.accessoryKey = accKey;
  state.lumiWardrobe.accessoryLabel = accLabel;

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  syncLumiAvatarAcrossApp();
  triggerLumiPush(`🎒 Acessório gratuito "${accLabel}" atualizado na Lumi 3D!`);
}

function equipFreeLumiBase(imgPath, tagLabel, fullTitle, btnEl) {
  playSound('correct');
  state.lumiWardrobe.imgPath = imgPath;
  state.lumiWardrobe.skinTag = tagLabel;
  state.lumiWardrobe.skinTitle = fullTitle;
  state.lumiWardrobe.activeEpicId = null;

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  syncLumiAvatarAcrossApp();
  spawnParticles('confetti');
  triggerLumiPush(`🦊 Estilo gratuito "${fullTitle}" equipado na Lumi 3D!`);
}

const EPIC_COSTUMES_DATA = {
  dino: {
    imgPath: 'assets/lumi-dino.jpg',
    skinTag: '🦖 Lumi Dino 3D',
    skinTitle: 'Fantasia Épica: Pijama de Dinossauro 🦖',
    pushMsg: '🦖 Pijama de Dinossauro equipado na Lumi 3D! Capuz de escamas e cauda texturizada prontos para o estudo!'
  },
  judge: {
    imgPath: 'assets/lumi-judge.jpg',
    skinTag: '⚖️ Lumi Magistrada',
    skinTitle: 'Fantasia Épica: Toga de Juiz / Magistrado ⚖️',
    pushMsg: '⚖️ Toga Solene de Juiz / Magistrado equipada na Lumi 3D! Autoridade máxima nas carreiras jurídicas!'
  },
  auditor: {
    imgPath: 'assets/lumi-auditor.jpg',
    skinTag: '🛡️ Lumi Auditora',
    skinTitle: 'Fantasia Épica: Farda de Auditor / Fiscal 🛡️',
    pushMsg: '🛡️ Farda Tática de Auditor / Fiscal equipada na Lumi 3D! Pronta para gabaritar Controle e Fiscalização!'
  }
};

function equipEpicCostume(costumeId, silentPush = false) {
  const data = EPIC_COSTUMES_DATA[costumeId];
  if (!data) return;

  if (costumeId === 'dino' && !state.lumiWardrobe.dinoUnlocked) {
    state.lumiWardrobe.dinoUnlocked = true;
    state.totalXp = Math.max(0, state.totalXp - 500);
    updateTopDashboardUI();
  }

  state.lumiWardrobe.imgPath = data.imgPath;
  state.lumiWardrobe.skinTag = data.skinTag;
  state.lumiWardrobe.skinTitle = data.skinTitle;
  state.lumiWardrobe.activeEpicId = costumeId;

  // Desmarca poses base gratuitas enquanto uma fantasia épica está ativa
  const baseGroup = document.getElementById('base-pose-swatches-group');
  if (baseGroup) {
    baseGroup.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
  }

  syncLumiAvatarAcrossApp();
  playSound('fanfare');
  spawnParticles('confetti');
  if (!silentPush) {
    triggerLumiPush(data.pushMsg);
  }
}

function equipLumiSkin(imgPath, skinName) {
  equipFreeLumiBase(imgPath, skinName, skinName, null);
}

function buyShopPowerup(type) {
  if (type === 'hearts') {
    state.hearts = 5;
    state.totalXp = Math.max(0, state.totalXp - 100);
    updateTopDashboardUI();
    playSound('correct');
    spawnParticles('hearts');
    triggerLumiPush('❤️ Vidas recarregadas (5/5)! Continue resolvendo questões sem parar!');
  } else if (type === 'freeze') {
    state.totalXp = Math.max(0, state.totalXp - 200);
    updateTopDashboardUI();
    playSound('correct');
    spawnParticles('confetti');
    triggerLumiPush('🧊 Congelamento de Ofensiva equipado! Seu Streak de estudos está blindado.');
  }
}

// ============================================================================
// Sincronização de Status (Desktop + Mobile), Push Lumi & Dark/Light Mode
// ============================================================================
function updateTopDashboardUI() {
  const formattedXp = state.totalXp.toLocaleString('pt-BR');
  const heartsDisplay = state.isPro ? '∞' : state.hearts;

  document.getElementById('streak-count').textContent = state.streak;
  document.getElementById('hearts-count').textContent = heartsDisplay;
  document.getElementById('total-xp-count').textContent = formattedXp;

  const mobStreak = document.getElementById('mob-streak-count');
  const mobXp = document.getElementById('mob-xp-count');
  const mobHearts = document.getElementById('mob-hearts-count');
  if (mobStreak) mobStreak.textContent = state.streak;
  if (mobXp) mobXp.textContent = formattedXp;
  if (mobHearts) mobHearts.textContent = heartsDisplay;

  const dailyLbl = document.getElementById('daily-xp-label');
  const dailyBar = document.getElementById('daily-xp-bar');
  if (dailyLbl) dailyLbl.textContent = `${state.dailyXp} / ${state.dailyXpGoal} XP`;
  if (dailyBar) {
    const pct = Math.min(100, Math.round((state.dailyXp / state.dailyXpGoal) * 100));
    dailyBar.style.width = `${pct}%`;
  }

  const profStreak = document.getElementById('prof-streak-val');
  const profXp = document.getElementById('prof-xp-val');
  const leagueXp = document.getElementById('league-my-xp');
  const leagueStreak = document.getElementById('league-my-streak');

  if (profStreak) profStreak.textContent = `${state.streak} Dias`;
  if (profXp) profXp.textContent = `${formattedXp} XP`;
  if (leagueXp) leagueXp.textContent = formattedXp;
  if (leagueStreak) leagueStreak.textContent = state.streak;
}

let pushTimeout = null;
function triggerLumiPush(customMessage) {
  playSound('pop');
  const banner = document.getElementById('lumi-push-banner');
  const textEl = document.getElementById('lumi-push-text');

  const msg = customMessage || LUMI_PUSH_MESSAGES[state.pushIndex % LUMI_PUSH_MESSAGES.length];
  state.pushIndex++;
  textEl.textContent = msg;

  banner.classList.add('visible');
  spawnParticles('flames');

  if (pushTimeout) clearTimeout(pushTimeout);
  pushTimeout = setTimeout(() => {
    banner.classList.remove('visible');
  }, 5200);
}

function handlePushBannerClick() {
  document.getElementById('lumi-push-banner').classList.remove('visible');
  openModuleQuiz(0);
}

function pulseStreakEffect() {
  playSound('correct');
  spawnParticles('flames');
  triggerLumiPush(`🔥 Ofensiva de ${state.streak} dias no Edital! Constância aprova mais que velocidade sem direção!`);
}

function refillHeartsToast() {
  state.hearts = 5;
  updateTopDashboardUI();
  playSound('correct');
  triggerLumiPush('❤️ Energias recarregadas (5/5) pela Mentora Lumi!');
}

let speechIdx = 0;
function lumiTrailInteract() {
  playSound('pop');
  speechIdx = (speechIdx + 1) % LUMI_TRAIL_SPEECHES.length;
  document.getElementById('trail-lumi-speech').textContent = LUMI_TRAIL_SPEECHES[speechIdx];
  const heroImg = document.getElementById('trail-lumi-img');
  heroImg.src = speechIdx % 2 === 1 ? 'assets/lumi-celebrate.jpg' : 'assets/lumi-hero.jpg';
  spawnParticles('flames');
}

function toggleTheme() {
  playSound('pop');
  const htmlEl = document.documentElement;
  const sideThemeBtn = document.getElementById('btn-theme-toggle');
  if (state.theme === 'dark') {
    state.theme = 'light';
    htmlEl.setAttribute('data-theme', 'light');
    if (sideThemeBtn) sideThemeBtn.textContent = '🌙 Alternar para Dark Mode';
  } else {
    state.theme = 'dark';
    htmlEl.setAttribute('data-theme', 'dark');
    if (sideThemeBtn) sideThemeBtn.textContent = '☀️ Alternar para Light Mode';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  updateTopDashboardUI();

  // Inicia na Splash Laranja -> Lumi 3D fazendo joinha -> Wizard de Onboarding de Concurseiros
  splashTimer = setTimeout(() => {
    transitionSplashToWelcome();
  }, 1800);
});
