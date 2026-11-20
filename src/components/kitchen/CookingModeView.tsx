import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Monitor, MonitorOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Receita } from '../../types/recipe'
import { KitchenTimer } from './KitchenTimer'

interface CookingModeViewProps {
  receita: Receita
}

interface WakeLockSentinel {
  readonly released: boolean
  release(): Promise<void>
}

interface WakeLockManager {
  request(tipo: 'screen'): Promise<WakeLockSentinel>
}

type NavigatorWithWakeLock = Navigator & { wakeLock?: WakeLockManager }

export function CookingModeView({ receita }: CookingModeViewProps) {
  const [indiceEtapa, setIndiceEtapa] = useState(0)
  const [concluido, setConcluido] = useState(false)
  const [wakeLockAtivo, setWakeLockAtivo] = useState(false)
  const [wakeLockEstado, setWakeLockEstado] = useState<'desligado' | 'ativo' | 'erro'>('desligado')
  const etapas = receita.etapas
  const etapa = etapas[indiceEtapa]
  const ingredientes = etapa.ingredientesVinculados
    .map((id) => receita.ingredientes.find((ingrediente) => ingrediente.id === id))
    .filter((ingrediente) => ingrediente !== undefined)
  const wakeLockDisponivel =
    typeof navigator !== 'undefined' && 'wakeLock' in navigator && !!navigator.wakeLock

  useEffect(() => {
    if (!wakeLockAtivo) return

    const wakeLock = (navigator as NavigatorWithWakeLock).wakeLock
    if (!wakeLock) return

    let montado = true
    let solicitando = false
    let sentinela: WakeLockSentinel | undefined

    async function liberarWakeLock(alvo: WakeLockSentinel) {
      try {
        await alvo.release()
      } catch (causa) {
        if (montado) {
          setWakeLockEstado('erro')
          setWakeLockAtivo(false)
        } else {
          console.error('Não foi possível liberar a Screen Wake Lock.', causa)
        }
      }
    }

    async function solicitarWakeLock() {
      if (document.visibilityState !== 'visible' || sentinela?.released === false || solicitando) {
        return
      }

      solicitando = true
      try {
        const novaSentinela = await wakeLock.request('screen')
        if (!montado || document.visibilityState !== 'visible') {
          await liberarWakeLock(novaSentinela)
          return
        }
        sentinela = novaSentinela
        setWakeLockEstado('ativo')
      } catch {
        if (montado) {
          setWakeLockEstado('erro')
          setWakeLockAtivo(false)
        }
      } finally {
        solicitando = false
      }
    }

    function aoMudarVisibilidade() {
      if (document.visibilityState === 'visible') {
        void solicitarWakeLock()
      } else if (sentinela) {
        const sentinelaAnterior = sentinela
        sentinela = undefined
        void liberarWakeLock(sentinelaAnterior)
      }
    }

    document.addEventListener('visibilitychange', aoMudarVisibilidade)
    void solicitarWakeLock()

    return () => {
      montado = false
      document.removeEventListener('visibilitychange', aoMudarVisibilidade)
      if (sentinela && !sentinela.released) void liberarWakeLock(sentinela)
    }
  }, [wakeLockAtivo])

  function alternarWakeLock() {
    if (!wakeLockDisponivel) return
    if (wakeLockAtivo) {
      setWakeLockAtivo(false)
      setWakeLockEstado('desligado')
    } else {
      setWakeLockAtivo(true)
    }
  }

  function avancarEtapa() {
    if (indiceEtapa === etapas.length - 1) {
      setConcluido(true)
      return
    }
    setIndiceEtapa((atual) => atual + 1)
  }

  function reiniciarPreparo() {
    setIndiceEtapa(0)
    setConcluido(false)
  }

  return (
    <main className="page-main">
      <Link className="voltar-link" to={`/receitas/${receita.slug}`}>
        <ArrowLeft size={17} aria-hidden="true" /> Voltar à receita
      </Link>
      <section className="modo-preparo" aria-labelledby="modo-preparo-titulo">
        <header className="modo-preparo__cabecalho">
          <p className="sobretitulo">MODO DE PREPARO</p>
          <h1 id="modo-preparo-titulo">{receita.titulo}</h1>
          <p>
            {concluido
              ? 'Você concluiu todas as etapas. Bom apetite!'
              : `Etapa ${indiceEtapa + 1} de ${etapas.length}`}
          </p>
        </header>

        <div className="modo-preparo__wake-lock">
          <button
            className="botao botao--secundario botao--pequeno"
            type="button"
            onClick={alternarWakeLock}
            disabled={!wakeLockDisponivel}
            aria-pressed={wakeLockAtivo}
          >
            {wakeLockAtivo ? (
              <MonitorOff size={17} aria-hidden="true" />
            ) : (
              <Monitor size={17} aria-hidden="true" />
            )}
            {wakeLockDisponivel
              ? wakeLockAtivo
                ? 'Manter tela ligada: ativado'
                : 'Manter tela ligada'
              : 'Tela sempre ativa indisponível'}
          </button>
          <p role="status" aria-live="polite">
            {wakeLockEstado === 'erro'
              ? 'Não foi possível manter a tela ligada. Verifique as permissões do navegador.'
              : wakeLockEstado === 'ativo'
                ? 'A tela permanecerá ligada enquanto este modo estiver ativo.'
                : !wakeLockDisponivel
                  ? 'Seu navegador não oferece suporte à Screen Wake Lock API.'
                  : ''}
          </p>
        </div>

        {concluido ? (
          <div className="modo-preparo__conclusao" role="status">
            <span className="modo-preparo__icone-conclusao">
              <Check size={26} aria-hidden="true" />
            </span>
            <h2>Preparo concluído!</h2>
            <button className="botao" type="button" onClick={reiniciarPreparo}>
              Rever as etapas
            </button>
          </div>
        ) : (
          <>
            <article className="modo-preparo__etapa" aria-live="polite">
              <span className="modo-preparo__numero">{String(etapa.numero).padStart(2, '0')}</span>
              <div>
                {etapa.titulo && <h2>{etapa.titulo}</h2>}
                <p>{etapa.descricao}</p>
              </div>
            </article>

            {ingredientes.length > 0 && (
              <section className="modo-preparo__ingredientes" aria-label="Ingredientes desta etapa">
                <h3>Separe para esta etapa</h3>
                <ul>
                  {ingredientes.map((ingrediente) => (
                    <li key={ingrediente.id}>
                      {ingrediente.nome}
                      {ingrediente.quantidade !== null &&
                        ` — ${ingrediente.quantidade} ${ingrediente.unidade}`}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {etapa.tempoMinutos !== undefined && etapa.tempoMinutos > 0 && (
              <KitchenTimer key={etapa.numero} minutos={etapa.tempoMinutos} />
            )}

            <nav className="modo-preparo__navegacao" aria-label="Navegar entre etapas">
              <button
                className="botao botao--secundario"
                type="button"
                disabled={indiceEtapa === 0}
                onClick={() => setIndiceEtapa((atual) => atual - 1)}
              >
                <ArrowLeft size={17} aria-hidden="true" /> Anterior
              </button>
              <button className="botao" type="button" onClick={avancarEtapa}>
                {indiceEtapa === etapas.length - 1 ? 'Concluir preparo' : 'Próxima etapa'}
                {indiceEtapa === etapas.length - 1 ? (
                  <Check size={17} aria-hidden="true" />
                ) : (
                  <ArrowRight size={17} aria-hidden="true" />
                )}
              </button>
            </nav>
          </>
        )}
      </section>
    </main>
  )
}
