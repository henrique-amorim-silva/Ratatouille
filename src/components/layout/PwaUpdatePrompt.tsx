import { RefreshCw, X } from 'lucide-react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdatePrompt() {
  const {
    needRefresh: [precisaAtualizar, definirAtualizacao],
    updateServiceWorker,
  } = useRegisterSW()

  if (!precisaAtualizar) return null

  return (
    <aside className="aviso-atualizacao" role="status" aria-live="polite">
      <p>Uma nova versão do Ratatouille está pronta.</p>
      <button type="button" onClick={() => void updateServiceWorker(true)}>
        <RefreshCw size={15} aria-hidden="true" /> Atualizar
      </button>
      <button
        className="aviso-atualizacao__fechar"
        type="button"
        aria-label="Dispensar aviso de atualização"
        onClick={() => definirAtualizacao(false)}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </aside>
  )
}
