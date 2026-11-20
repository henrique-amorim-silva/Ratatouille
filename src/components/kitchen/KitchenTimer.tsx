import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

interface KitchenTimerProps {
  minutos: number
}

function formatarTempo(milissegundos: number) {
  const segundosTotais = Math.ceil(milissegundos / 1000)
  const horas = Math.floor(segundosTotais / 3600)
  const minutos = Math.floor((segundosTotais % 3600) / 60)
  const segundos = segundosTotais % 60

  return horas > 0
    ? `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
    : `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
}

export function KitchenTimer({ minutos }: KitchenTimerProps) {
  const duracaoMs = Math.max(0, minutos * 60_000)
  const [restanteMs, setRestanteMs] = useState(duracaoMs)
  const [fimEm, setFimEm] = useState<number | null>(null)

  useEffect(() => {
    if (fimEm === null) return
    const prazo = fimEm

    function atualizarContagem() {
      const restante = Math.max(0, prazo - Date.now())
      setRestanteMs(restante)
      if (restante === 0) setFimEm(null)
    }

    atualizarContagem()
    const intervalo = window.setInterval(atualizarContagem, 250)
    return () => window.clearInterval(intervalo)
  }, [fimEm])

  function iniciar() {
    if (restanteMs > 0) setFimEm(Date.now() + restanteMs)
  }

  function pausar() {
    if (fimEm !== null) {
      setRestanteMs(Math.max(0, fimEm - Date.now()))
      setFimEm(null)
    }
  }

  function reiniciar() {
    setFimEm(null)
    setRestanteMs(duracaoMs)
  }

  const concluido = restanteMs === 0

  return (
    <section className="temporizador-cozinha" aria-label="Temporizador da etapa">
      <div>
        <p className="sobretitulo">TEMPO DESTA ETAPA</p>
        <output
          className="temporizador-cozinha__tempo"
          aria-label={`Tempo restante: ${formatarTempo(restanteMs)}`}
        >
          {formatarTempo(restanteMs)}
        </output>
      </div>
      <div className="temporizador-cozinha__acoes">
        {fimEm === null ? (
          <button
            className="botao botao--pequeno"
            type="button"
            onClick={iniciar}
            disabled={concluido}
          >
            <Play size={16} aria-hidden="true" /> Iniciar
          </button>
        ) : (
          <button className="botao botao--pequeno" type="button" onClick={pausar}>
            <Pause size={16} aria-hidden="true" /> Pausar
          </button>
        )}
        <button
          className="botao botao--secundario botao--pequeno"
          type="button"
          onClick={reiniciar}
        >
          <RotateCcw size={16} aria-hidden="true" /> Reiniciar
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {concluido ? 'Tempo da etapa concluído.' : ''}
      </p>
    </section>
  )
}
