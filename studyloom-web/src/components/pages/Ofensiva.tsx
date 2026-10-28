import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ofensiva() {
  const navigate = useNavigate();
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
    <div style={{
      maxWidth: '420px',
      margin: '20px auto',
      padding: '24px',
      backgroundColor: '#0F172A',
      color: 'white',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '24px',
      border: '1px solid #1E293B',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      fontFamily: 'sans-serif'
    }}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '20px', cursor: 'pointer' }}
          title="Voltar para a Trilha"
        >
          ✕
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Lumi</h1>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Balão de Fala da Lumi */}
      <div style={{
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(51, 65, 85, 0.6)',
        borderRadius: '16px',
        padding: '14px',
        margin: '8px 0',
        position: 'relative'
      }}>
        <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0, lineHeight: '1.4' }}>
          <strong style={{ display: 'block', color: 'white', marginBottom: '2px' }}>Bem-vindo, Concurseiro!</strong>
          Sua <span style={{ color: '#FB923C', fontWeight: '600' }}>Jornada da Aprovação</span> começou. Crie o hábito de estudar todo dia e elimine a concorrência.
        </p>
      </div>

      {/* Imagem da Mascote Lumi com tamanho bem maior */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
        <img 
          src="/icons/lumi-ofensiva.png" 
          alt="Mascote Lumi" 
          style={{
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 15px 25px rgba(249, 115, 22, 0.35))'
          }}
        />
      </div>

      {/* Trilha Sinuosa com as Bolinhas Numeradas */}
      <div style={{ position: 'relative', width: '100%', padding: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: '50%', left: '24px', right: '24px', height: '8px', backgroundColor: '#1E293B', transform: 'translateY(-50%)', borderRadius: '9999px', zIndex: 0 }}></div>
        
        {[1, 2, 3, 4, 5].map((num) => {
          const isAtivo = num === etapaAtual;
          const isConcluido = num < etapaAtual;

          return (
            <div key={num} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {isAtivo && (
                <span style={{
                  position: 'absolute',
                  top: '-24px',
                  backgroundColor: '#F97316',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '900',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Hoje
                </span>
              )}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.3s',
                backgroundColor: isAtivo ? '#F97316' : isConcluido ? '#059669' : '#1E293B',
                color: isAtivo || isConcluido ? 'white' : '#64748B',
                border: isAtivo ? '4px solid rgba(249, 115, 22, 0.3)' : '1px solid #334155',
                boxShadow: isAtivo ? '0 10px 15px -3px rgba(249, 115, 22, 0.5)' : 'none',
                transform: isAtivo ? 'scale(1.1)' : 'scale(1)'
              }}>
                {isConcluido ? '✓' : num}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem da Próxima Bateria */}
      <div style={{ textAlign: 'center', margin: '4px 0' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#F1F5F9', margin: 0 }}>
          A sua <span style={{ color: '#FB923C' }}>{etapaAtual}ª Bateria de Questões</span> te aguarda!
        </h2>
      </div>

      {/* Botões de Ação Inferior */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        <button 
          onClick={lidarComConclusaoTrilha}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #F59E0B, #EA580C)',
            color: 'white',
            fontWeight: 'extrabold',
            padding: '14px',
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(234, 88, 12, 0.3)',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ▶ COMEÇAR A ESTUDAR ›
        </button>

        <button 
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            backgroundColor: '#1E293B',
            color: '#CBD5E1',
            fontWeight: 'bold',
            padding: '10px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          Voltar para a Trilha 🏆
        </button>
      </div>
    </div>
  );
}