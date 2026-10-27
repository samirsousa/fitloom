import { useState, useEffect } from 'react';

export default function Ofensiva() {
  const [etapaAtual, setEtapaAtual] = useState(1);

  useEffect(() => {
    const progressoSalvo = localStorage.getItem('lumi_etapa_atual');
    if (progressoSalvo) {
      setEtapaAtual(parseInt(progressoSalvo));
    }
  }, []);

  const lidarComConclusaoTrilha = () => {
    const proximaEtapa = etapaAtual < 5 ? etapaAtual + 1 : 1;
    setEtapaAtual(proximaEtapa);
    localStorage.setItem('lumi_etapa_atual', proximaEtapa.toString());
    alert(`Parabéns! Trilha ${etapaAtual} concluída com sucesso! 🔥`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between p-6 font-sans max-w-md mx-auto relative overflow-hidden shadow-2xl border border-slate-800 rounded-3xl my-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between w-full pt-2">
        <button className="text-slate-400 hover:text-white text-xl">←</button>
        <h1 className="text-lg font-bold tracking-wide">Lumi</h1>
        <div className="w-6"></div>
      </div>

      {/* Balão de Fala da Lumi */}
      <div className="w-full bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 shadow-lg relative my-2">
        <p className="text-sm text-slate-200 leading-relaxed">
          <strong className="block text-white mb-1">Bem-vindo, Concurseiro!</strong>
          Sua <span className="text-orange-400 font-semibold">Jornada da Aprovação</span> começou. Crie o hábito de estudar todo dia e elimine a concorrência.
        </p>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-800/60 border-r border-b border-slate-700/60 rotate-45"></div>
      </div>

      {/* Imagem da Mascote Lumi */}
      <div className="flex justify-center my-2">
        <img 
          src="/icons/lumi-ofensiva.jpg" 
          alt="Mascote Lumi" 
          className="w-48 h-48 object-contain drop-shadow-[0_10px_15px_rgba(249,115,22,0.2)] rounded-2xl"
        />
      </div>

      {/* Trilha Sinuosa com as Bolinhas Numeradas */}
      <div className="relative w-full py-4 flex justify-between items-center px-4 my-2">
        <div className="absolute top-1/2 left-6 right-6 h-2 bg-slate-800 -translate-y-1/2 rounded-full z-0"></div>
        
        {[1, 2, 3, 4, 5].map((num) => {
          const isAtivo = num === etapaAtual;
          const isConcluido = num < etapaAtual;

          return (
            <div key={num} className="relative z-10 flex flex-col items-center">
              {isAtivo && (
                <span className="absolute -top-6 bg-orange-500 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow">
                  Hoje
                </span>
              )}
              <div 
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isAtivo 
                    ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/50 ring-4 ring-orange-500/20 scale-110' 
                    : isConcluido
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isConcluido ? '✓' : num}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem da Próxima Bateria */}
      <div className="text-center my-3">
        <h2 className="text-lg font-bold text-slate-100">
          A sua <span className="text-orange-400">{etapaAtual}ª Bateria de Questões</span> te aguarda!
        </h2>
      </div>

      {/* Botão de Ação Inferior */}
      <div className="w-full pb-2">
        <button 
          onClick={lidarComConclusaoTrilha}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
        >
          <span>▶</span> COMEÇAR A ESTUDAR <span>›</span>
        </button>
      </div>
    </div>
  );
}