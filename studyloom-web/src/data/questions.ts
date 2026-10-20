export type QuestionType = 'multiple_choice' | 'true_false'

export interface Option {
  key: string
  text: string
  correct: boolean
}

export interface Question {
  id: string
  type: QuestionType
  pillar: 'nutrition' | 'workout'
  badgeIcon: string
  subject: string
  xp: number
  timeLimit: number
  microTip: string
  question: string
  cueIcon: string
  cueText: string
  options: Option[]
  lumiSuccessTitle: string
  lumiSuccessMsg: string
  lumiFailTitle: string
  lumiFailMsg: string
}

export const questions: Question[] = [
  {
    id: 'portugues-fgv',
    type: 'multiple_choice',
    pillar: 'nutrition',
    badgeIcon: '📚',
    subject: 'Língua Portuguesa (FGV)',
    xp: 15,
    timeLimit: 30,
    microTip: '💡 Banca FGV • Assunto: Emprego do Sinal Indicativo de Crase',
    question:
      'Assinale a alternativa em que o emprego do acento grave indicativo de crase está CORRETAMENTE utilizado segundo a norma-padrão:',
    cueIcon: '📌',
    cueText:
      'Bizu da Lumi: Lembre-se de que NUNCA ocorre crase antes de verbos, pronomes pessoais ou palavras masculinas!',
    options: [
      { key: 'A', text: 'O candidato passou à estudar duas horas por dia após o edital.', correct: false },
      { key: 'B', text: 'Os documentos foram entregues à Vossa Excelência no prazo legal.', correct: false },
      { key: 'C', text: 'A aprovação está condicionada à dedicação diária na resolução de questões.', correct: true },
    ],
    lumiSuccessTitle: '🔥 Gabarito C! Domínio Total da FGV!',
    lumiSuccessMsg:
      'Gabarito Comentado pela Lumi: "Condicionada" exige a preposição "a" e o substantivo feminino "dedicação" aceita o artigo "a" (a + a = à). Nas demais opções, não há crase antes do verbo "estudar" nem antes do pronome de tratamento "Vossa Excelência"!',
    lumiFailTitle: '🦊 Atenção à Pegadinha da FGV! Veja o Gabarito Comentado:',
    lumiFailMsg:
      'A resposta correta é a C! Nunca ocorre crase antes de verbo ("a estudar") nem antes de pronomes de tratamento ("a Vossa Excelência"). Já "condicionada à dedicação" une preposição + artigo feminino!',
  },
  {
    id: 'constitucional-cebraspe',
    type: 'true_false',
    pillar: 'workout',
    badgeIcon: '⚖️',
    subject: 'Direito Constitucional (Cebraspe)',
    xp: 15,
    timeLimit: 25,
    microTip: '⚡ Banca Cebraspe • Art. 5º, XI da CF/88 (Inviolabilidade Domiciliar)',
    question:
      'Julgue o item: "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo, a qualquer hora do dia ou da noite, por determinação judicial."',
    cueIcon: '⚖️',
    cueText:
      'Atenção ao texto literal do Art. 5º, inciso XI da Constituição Federal sobre o horário de cumprimento de mandado judicial!',
    options: [
      { key: 'C', text: '✅ CERTO', correct: false },
      { key: 'E', text: '❌ ERRADO (Pegadinha!)', correct: true },
    ],
    lumiSuccessTitle: '⚖️ Item ERRADO! Você não caiu na pegadinha do Cebraspe!',
    lumiSuccessMsg:
      'Gabarito Comentado pela Lumi: Segundo o Art. 5º, XI da CF/88, por determinação judicial a entrada sem consentimento SÓ pode ocorrer DURANTE O DIA! À noite, apenas em caso de flagrante delito, desastre ou para prestar socorro.',
    lumiFailTitle: '🦊 Clássica pegadinha do Cebraspe! Veja o Gabarito Comentado:',
    lumiFailMsg:
      'O item está ERRADO! Determinação judicial só autoriza a entrada DURANTE O DIA (Art. 5º, XI, CF/88). Durante a noite, somente em flagrante delito, desastre ou para prestar socorro!',
  },
  {
    id: 'rlm-condicional',
    type: 'multiple_choice',
    pillar: 'workout',
    badgeIcon: '🧠',
    subject: 'Raciocínio Lógico (FCC / FGV)',
    xp: 15,
    timeLimit: 30,
    microTip: '🎯 Desafio Final da Bateria • Negação de Proposição Composta',
    question:
      'Qual é a NEGAÇÃO lógica correta da proposição condicional: "Se o concurseiro resolve questões, então passa na prova"?',
    cueIcon: '🧠',
    cueText:
      'Bizu da Lumi: Para negar o "Se... então...", aplique a famosa Regra do MANÉ (MAntém a primeira E NEga a segunda)!',
    options: [
      { key: 'A', text: 'O concurseiro resolve questões E não passa na prova.', correct: true },
      { key: 'B', text: 'Se o concurseiro não resolve questões, então não passa na prova.', correct: false },
      { key: 'C', text: 'O concurseiro não resolve questões OU passa na prova.', correct: false },
    ],
    lumiSuccessTitle: '🏆 Gabarito A! Regra do MANÉ Cravada!',
    lumiSuccessMsg:
      'Gabarito Comentado pela Lumi: A negação de uma condicional (Se P, então Q) nunca é outra condicional! Pela regra do MANÉ, MAntemos a primeira parte ("O concurseiro resolve questões"), trocamos pelo conectivo "E" e NEgamos a segunda ("não passa na prova").',
    lumiFailTitle: '🦊 Lembre-se sempre da Regra do MANÉ! Veja o comentário:',
    lumiFailMsg:
      'Gabarito A! Nunca negue um "Se... então" com outro "Se... então". Aplique o MANÉ: MAntém a 1ª ("resolve questões") + conectivo "E" + NEga a 2ª ("não passa na prova").',
  },
]