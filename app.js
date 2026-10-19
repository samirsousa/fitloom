// ============================================================================
// FitLoom Web — Arquitetura Responsiva (Desktop Grid 3 Colunas & Mobile Bottom Bar),
// Onboarding Gamificado de 3 Etapas com a Lumi 3D & Dark/Light Mode Fluido
// ============================================================================

const state = {
  currentScreen: 'trail',
  streak: 14,
  hearts: 5,
  totalXp: 1420,
  dailyXp: 35,
  dailyXpGoal: 50,
  currentCardIndex: 0,
  correctCount: 0,
  answeredCurrent: false,
  pushIndex: 0,
  theme: 'dark',
  chestOpened: false,
  onboarding: {
    step: 0,
    goal: 'Cutting & Definição',
    moduleTitle: 'Fundamentos do Cutting & Supino Reto',
    level: 'Intermediário',
    routine: '5 min/dia • Consistente (50 XP)',
    userName: 'Samir'
  }
};

// Banco de Stories Interativos (Cutting, Supino Reto & Agachamento)
const STORY_CARDS = [
  {
    id: 'nutrition-cutting',
    type: 'multiple_choice',
    pillar: 'nutrition',
    badgeText: '🍽️ Story 1/3 • Fundamentos do Cutting',
    xp: 15,
    microTip: '💡 Zero planilha • Preservação de Massa Magra',
    question: 'Durante a fase de Cutting (definição muscular), qual hábito evita que você perca músculo junto com a gordura?',
    cueIcon: '🥩',
    cueText: 'Regra de Ouro FitLoom: Déficit calórico moderado + estímulo de força + aporte proteico alto.',
    options: [
      {
        key: 'A',
        text: 'Cortar calorias pela metade e fazer apenas 2h de esteira por dia',
        correct: false
      },
      {
        key: 'B',
        text: 'Manter ~1 palma de proteína em 3-4 refeições e treinar pesado',
        correct: true
      },
      {
        key: 'C',
        text: 'Zerar carboidratos antes do treino de musculação',
        correct: false
      }
    ],
    lumiSuccessTitle: '🔥 Perfeito! Músculo blindado no Cutting!',
    lumiSuccessMsg: 'Manter a ingestão alta de proteína (1.6 a 2.2g/kg) e a tensão mecânica na musculação sinaliza ao corpo para queimar gordura e preservar massa magra!',
    lumiFailTitle: '🦊 Cuidado com o corte radical!',
    lumiFailMsg: 'Cortar calorias demais sem proteína e sem musculação faz o corpo devorar a própria massa muscular. Use 1 palma de proteína por refeição!'
  },
  {
    id: 'workout-bench',
    type: 'true_false',
    pillar: 'workout',
    badgeText: '🏋️ Story 2/3 • Execução do Supino Reto',
    xp: 15,
    microTip: '⚡ Mito ou Verdade • Biomecânica Escapular',
    question: '"No Supino Reto com barra, descer os cotovelos totalmente abertos em linha reta (90° com o tronco) é a forma mais segura para os ombros."',
    cueIcon: '📐',
    cueText: 'Análise Lumi 3D: O ângulo ideal do úmero protege o manguito rotador e recruta mais o peitoral.',
    options: [
      {
        key: 'V',
        text: '✅ VERDADEIRO',
        correct: false
      },
      {
        key: 'F',
        text: '❌ FALSO (Risco articular!)',
        correct: true
      }
    ],
    lumiSuccessTitle: '💪 Biomecânica Impecável!',
    lumiSuccessMsg: 'Exato, é FALSO! Manter os cotovelos levemente fechados (~45° a 60°) com as escápulas retraídas ("guardadas no bolso de trás") protege o ombro e aumenta sua força no supino!',
    lumiFailTitle: '🦊 Alerta para os seus ombros!',
    lumiFailMsg: 'É FALSO! Cotovelos a 90° pinçam o tendão do supraespinhal. Feche levemente os cotovelos (~45°) e cole as escápulas no banco.'
  },
  {
    id: 'combo-squat-post',
    type: 'multiple_choice',
    pillar: 'workout',
    badgeText: '🔥 Story 3/3 • Agachamento & Pós-Treino',
    xp: 15,
    microTip: '🎯 Desafio Final da Fase • Síntese + Execução',
    question: 'Qual combinação une a postura correta no Agachamento com a nutrição ideal pós-treino?',
    cueIcon: '🏆',
    cueText: 'Combo Atleta FitLoom: Tripé do pé firme no chão + reposição de glicogênio e aminoácidos.',
    options: [
      {
        key: 'A',
        text: 'Calcanhar firme com joelhos alinhados aos pés + refeição com proteína e carbo',
        correct: true
      },
      {
        key: 'B',
        text: 'Subir na ponta dos pés + ficar em jejum por 6 horas',
        correct: false
      },
      {
        key: 'C',
        text: 'Curvar a lombar para baixo + tomar apenas café preto',
        correct: false
      }
    ],
    lumiSuccessTitle: '🏆 Fase Dominada! Chama em Nível Máximo!',
    lumiSuccessMsg: 'Você dominou a biomecânica e a nutrição inteligente sem precisar anotar uma única caloria em planilhas!',
    lumiFailTitle: '🦊 Quase lá! Lembre do Tripé do Pé:',
    lumiFailMsg: 'Mantenha o calcanhar firme no chão durante todo o agachamento e garanta proteína + carboidrato para recuperar as fibras.'
  }
];

const LUMI_PUSH_MESSAGES = [
  '🔥 "Ei! Sua chama está brilhando! 90 segundos de Supino Reto & Cutting garantem sua meta diária!"',
  '🦊 "Lumi na escuta: Você já bateu suas 3 palmas de proteína hoje ou vai deixar o cutting levar seu músculo?"',
  '🏆 "Liga Esmeralda: Você está em #2! Só mais 1 quiz te aproxima do Baú Lendário da semana!"',
  '🎯 "Prática Focada liberada: Vamos revisar em 30s a retração escapular no supino antes do treino?"'
];

const LUMI_TRAIL_SPEECHES = [
  '"Bora pro Supino Reto! 🔥 +45 XP"',
  '"Escápulas fechadas = ombro blindado! 💪"',
  '"Clique no Baú Dourado para ganhar +50 XP! 🎁"',
  '"Você está em #2 na Liga Esmeralda! 🏆"'
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
    } else if (type === 'kiss') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.18);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.21);
    }
  } catch (_) {}
}

// ============================================================================
// Motor Global de Partículas (100% Viewport): Confetes, Chamas 🔥 & Corações 💖
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
  const count = mode === 'flames' || mode === 'hearts' ? 28 : 65;
  const colors = ['#FF5722', '#10B981', '#0D9488', '#FBBF24', '#FF4B4B', '#34D399'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width * (0.25 + Math.random() * 0.5),
      y: mode === 'flames' || mode === 'hearts' ? canvas.height * 0.48 : canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 11,
      vy: mode === 'flames' || mode === 'hearts' ? -(3.5 + Math.random() * 6.5) : -(6 + Math.random() * 9),
      gravity: mode === 'flames' || mode === 'hearts' ? -0.04 : 0.24,
      size: mode === 'flames' || mode === 'hearts' ? 18 + Math.random() * 12 : 8 + Math.random() * 7,
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
    p.alpha -= (p.mode === 'flames' || p.mode === 'hearts') ? 0.019 : 0.014;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    if (p.mode === 'flames') {
      ctx.font = `${Math.round(p.size)}px sans-serif`;
      ctx.fillText('🔥', -p.size / 2, p.size / 2);
    } else if (p.mode === 'hearts') {
      ctx.font = `${Math.round(p.size)}px sans-serif`;
      ctx.fillText('💖', -p.size / 2, p.size / 2);
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
// 3. FLUXO DE ONBOARDING PARA NOVOS USUÁRIOS (SEM CONTA)
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
    1: 'Etapa 1 / 3 • Objetivo',
    2: 'Etapa 2 / 3 • Experiência',
    3: 'Etapa 3 / 3 • Rotina',
    4: 'Plano Pronto! 🎉'
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
    document.getElementById('summary-goal-pill').textContent = `🔥 Foco: ${value}`;
    setTimeout(() => goToOnboardingStep(2), 260);
  } else if (step === 2) {
    state.onboarding.level = value;
    document.getElementById('summary-level-pill').textContent = `🏋️ Nível: ${value}`;
    setTimeout(() => goToOnboardingStep(3), 260);
  } else if (step === 3) {
    state.onboarding.routine = value;
    document.getElementById('summary-routine-pill').textContent = `⚡ Meta: ${value}`;
    spawnParticles('confetti');
    setTimeout(() => goToOnboardingStep(4), 300);
  }
}

function completeOnboardingConversion() {
  const nameInput = document.getElementById('signup-name-input');
  const chosenName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Atleta';
  state.onboarding.userName = chosenName;

  // Atualiza dados personalizados em toda a aplicação web
  const bannerTitle = document.getElementById('banner-module-title');
  const bannerPhase = document.getElementById('banner-phase-tag');
  const planSubtitle = document.getElementById('user-plan-subtitle');
  const widgetPlan = document.getElementById('widget-plan-tag');
  const profName = document.getElementById('profile-user-name');
  const profFocus = document.getElementById('profile-user-focus');
  const leagueName = document.getElementById('league-user-name');

  if (bannerTitle) bannerTitle.textContent = state.onboarding.moduleTitle;
  if (bannerPhase) bannerPhase.textContent = `FASE 1 • NÍVEL ${state.onboarding.level.toUpperCase()} • ${chosenName.toUpperCase()}`;
  if (planSubtitle) planSubtitle.textContent = `Meta: ${state.onboarding.routine} • Foco em ${state.onboarding.goal}`;
  if (widgetPlan) widgetPlan.textContent = `Foco: ${state.onboarding.goal}`;
  if (profName) profName.textContent = `${chosenName} • Atleta FitLoom`;
  if (profFocus) profFocus.textContent = `🛡️ Liga Esmeralda • Foco: ${state.onboarding.goal}`;
  if (leagueName) leagueName.textContent = chosenName;

  // Fecha o wizard de onboarding e acende o Streak na Trilha Principal
  const introOverlay = document.getElementById('intro-overlay');
  if (introOverlay) introOverlay.classList.add('hidden');

  playSound('fanfare');
  switchScreen('trail');

  setTimeout(() => {
    spawnParticles('confetti');
    spawnParticles('flames');
    triggerLumiPush(`🔥 Bem-vindo(a), ${chosenName}! Sua conta foi criada e sua trilha de "${state.onboarding.goal}" já está liberada!`);
  }, 320);
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

  goToOnboardingStep(0);
  introOverlay.classList.remove('hidden');
  splashStage.classList.remove('fade-out');

  playSound('pop');

  splashTimer = setTimeout(() => {
    transitionSplashToWelcome();
  }, 1800);
}

// ============================================================================
// Navegação Responsiva: Sidebar Desktop + Bottom Bar Mobile
// ============================================================================
const ALL_SCREENS = ['trail', 'practice', 'leagues', 'social', 'shop', 'profile', 'quiz'];

function switchScreen(screenName) {
  playSound('pop');
  state.currentScreen = screenName;

  ALL_SCREENS.forEach((sc) => {
    const el = document.getElementById(`screen-${sc}`);
    if (el) el.classList.toggle('active', sc === screenName);
  });

  // Atualiza Sidebar Esquerda (Desktop)
  const sideMap = {
    trail: 'side-trail',
    quiz: 'side-trail',
    practice: 'side-practice',
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
  switchScreen('quiz');
}

function openChestReward() {
  if (state.chestOpened) {
    triggerLumiPush('🎁 Você já resgatou os +50 XP do Baú da Lumi nesta fase!');
    return;
  }
  state.chestOpened = true;
  state.totalXp += 50;
  state.dailyXp = Math.min(state.dailyXpGoal, state.dailyXp + 15);
  updateTopDashboardUI();
  playSound('fanfare');
  spawnParticles('confetti');
  spawnParticles('flames');
  triggerLumiPush('🎁 BAÚ DA LUMI ABERTO! +50 XP adicionados à sua conta na Liga Esmeralda!');
}

// ============================================================================
// Prática Focada, Comunidade, Loja da Lumi & Criador de Avatar
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
  btnEl.textContent = '🔥 Energia Enviada!';
  btnEl.disabled = true;
  spawnParticles('flames');
  triggerLumiPush(`🙌 Você enviou incentivo para ${friendName}! Duplas de ofensiva mantêm o foco 3x mais tempo!`);
}

function equipLumiSkin(imgPath, skinName) {
  playSound('fanfare');
  document.getElementById('shop-lumi-img').src = imgPath;
  document.getElementById('trail-lumi-img').src = imgPath;
  document.getElementById('widget-lumi-img').src = imgPath;
  document.getElementById('shop-skin-label').textContent = skinName;
  document.getElementById('shop-lumi-title').textContent = skinName;
  spawnParticles('confetti');
  triggerLumiPush(`🦊 Visual "${skinName}" equipado na Lumi 3D em toda a plataforma!`);
}

function buyShopPowerup(type) {
  if (type === 'hearts') {
    state.hearts = 5;
    state.totalXp = Math.max(0, state.totalXp - 100);
    updateTopDashboardUI();
    playSound('correct');
    spawnParticles('hearts');
    triggerLumiPush('❤️ Vidas recarregadas (5/5) com sucesso!');
  } else if (type === 'freeze') {
    state.totalXp = Math.max(0, state.totalXp - 200);
    updateTopDashboardUI();
    playSound('correct');
    spawnParticles('confetti');
    triggerLumiPush('🧊 Congelamento de Ofensiva equipado! Seu Streak está blindado.');
  }
}

function setAvatarSkin(colorHex, btnEl) {
  playSound('pop');
  document.getElementById('av-skin').setAttribute('fill', colorHex);
  document.getElementById('av-neck').setAttribute('fill', colorHex);
  btnEl.parentElement.querySelectorAll('.skin-dot').forEach((b) => b.classList.remove('active'));
  btnEl.classList.add('active');
}

function setAvatarShirt(colorHex, btnEl) {
  playSound('pop');
  document.getElementById('av-shirt').setAttribute('fill', colorHex);
  btnEl.parentElement.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
  btnEl.classList.add('active');
}

function setAvatarGlasses(showGlasses, headbandColor, btnEl) {
  playSound('pop');
  const glassesEl = document.getElementById('av-glasses');
  const headbandEl = document.getElementById('av-headband');
  glassesEl.style.display = showGlasses ? 'block' : 'none';
  headbandEl.setAttribute('fill', headbandColor);
  btnEl.parentElement.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
  btnEl.classList.add('active');
}

// ============================================================================
// Motor do Quiz Interativo de Lição (Stories)
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

  document.getElementById('quiz-xp-pill').textContent = `+${cardData.xp} XP 🔥`;
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
}

function handleSelectAnswer(selectedIndex, clickedBtn) {
  if (state.answeredCurrent) return;
  state.answeredCurrent = true;

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

  if (chosenOption.correct) {
    clickedBtn.classList.add('correct');
    state.correctCount++;
    state.totalXp += cardData.xp;
    state.dailyXp = Math.min(state.dailyXpGoal, state.dailyXp + cardData.xp);
    updateTopDashboardUI();

    lumiImg.src = 'assets/lumi-celebrate.jpg';
    feedbackPanel.className = 'quiz-feedback-panel visible is-correct';
    feedbackHeader.textContent = cardData.lumiSuccessTitle;
    feedbackExplanation.textContent = cardData.lumiSuccessMsg;

    playSound('correct');
    spawnParticles('confetti');
    spawnParticles('flames');
  } else {
    clickedBtn.classList.add('wrong');
    state.hearts = Math.max(1, state.hearts - 1);
    updateTopDashboardUI();

    lumiImg.src = 'assets/lumi-coach.jpg';
    feedbackPanel.className = 'quiz-feedback-panel visible is-wrong';
    feedbackHeader.textContent = cardData.lumiFailTitle;
    feedbackExplanation.textContent = cardData.lumiFailMsg;

    playSound('wrong');
  }

  const nextBtn = document.getElementById('btn-next-story');
  nextBtn.textContent = state.currentCardIndex < STORY_CARDS.length - 1
    ? 'Próximo Story ➔'
    : 'Concluir Lição & Ver Recompensa 🏆';
}

function nextStoryCard() {
  if (state.currentCardIndex < STORY_CARDS.length - 1) {
    playSound('pop');
    state.currentCardIndex++;
    renderCurrentStoryCard();
  } else {
    state.streak = 15;
    state.dailyXp = state.dailyXpGoal;
    updateTopDashboardUI();

    const accuracy = Math.round((Math.max(1, state.correctCount) / STORY_CARDS.length) * 100);
    document.getElementById('reward-acc-val').textContent = `${accuracy}%`;
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
  document.getElementById('trail-lumi-speech').textContent = '"Ofensiva de 15d garantida! 🔥"';
  switchScreen('trail');
  spawnParticles('confetti');
}

// ============================================================================
// Sincronização de Status (Desktop + Mobile), Push Lumi & Dark/Light Mode
// ============================================================================
function updateTopDashboardUI() {
  const formattedXp = state.totalXp.toLocaleString('pt-BR');

  // Desktop Right Panel
  document.getElementById('streak-count').textContent = state.streak;
  document.getElementById('hearts-count').textContent = state.hearts;
  document.getElementById('total-xp-count').textContent = formattedXp;

  // Mobile Header
  const mobStreak = document.getElementById('mob-streak-count');
  const mobXp = document.getElementById('mob-xp-count');
  const mobHearts = document.getElementById('mob-hearts-count');
  if (mobStreak) mobStreak.textContent = state.streak;
  if (mobXp) mobXp.textContent = formattedXp;
  if (mobHearts) mobHearts.textContent = state.hearts;

  // Meta Diária de XP no Widget da Lumi
  const dailyLbl = document.getElementById('daily-xp-label');
  const dailyBar = document.getElementById('daily-xp-bar');
  if (dailyLbl) dailyLbl.textContent = `${state.dailyXp} / ${state.dailyXpGoal} XP`;
  if (dailyBar) {
    const pct = Math.min(100, Math.round((state.dailyXp / state.dailyXpGoal) * 100));
    dailyBar.style.width = `${pct}%`;
  }

  // Perfil e Liga
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
  triggerLumiPush(`🔥 Ofensiva de ${state.streak} dias em chamas! Continue treinando com a Lumi!`);
}

function refillHeartsToast() {
  state.hearts = 5;
  updateTopDashboardUI();
  playSound('correct');
  triggerLumiPush('❤️ Energias recarregadas (5/5) pela Lumi!');
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
  renderCurrentStoryCard();

  // Inicia na Splash Laranja -> Lumi 3D fazendo joinha -> Wizard de Onboarding
  splashTimer = setTimeout(() => {
    transitionSplashToWelcome();
  }, 1800);
});
