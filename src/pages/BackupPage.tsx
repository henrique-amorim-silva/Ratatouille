import { useState, type ChangeEvent } from 'react'
import { Download, FileUp, ShieldCheck } from 'lucide-react'
import { backupSchema } from '../data/schemas/backupSchema'
import { exportarBackup, restaurarBackup } from '../services/storage'
import { useFavoritosStore } from '../store/favoritosStore'
import { useListaComprasStore } from '../store/listaComprasStore'

export function BackupPage() {
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [ocupado, setOcupado] = useState(false)

  async function exportar() {
    setErro('')
    setMensagem('')
    setOcupado(true)
    try {
      const backup = await exportarBackup()
      const arquivo = new Blob([JSON.stringify(backup, null, 2)], {
        type: 'application/json',
      })
      const endereco = URL.createObjectURL(arquivo)
      const link = document.createElement('a')
      link.href = endereco
      link.download = `ratatouille-backup-${backup.exportadoEm.slice(0, 10)}.json`
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(endereco), 1000)
      setMensagem('Backup exportado. Guarde o arquivo em um local seguro.')
    } catch (causa: unknown) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível exportar o backup.')
    } finally {
      setOcupado(false)
    }
  }

  async function importar(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0]
    evento.target.value = ''
    if (!arquivo) return

    setErro('')
    setMensagem('')
    setOcupado(true)
    try {
      const conteudo: unknown = JSON.parse(await arquivo.text())
      const validacao = backupSchema.safeParse(conteudo)
      if (!validacao.success) {
        const detalhes = validacao.error.issues
          .map(({ path, message }) => `${path.join('.') || 'arquivo'}: ${message}`)
          .join('; ')
        throw new TypeError(`O arquivo não é um backup válido. ${detalhes}`)
      }

      const restaurado = await restaurarBackup(validacao.data)
      useFavoritosStore.setState({ favoritos: restaurado.favoritos })
      useListaComprasStore.setState({
        itens: restaurado.itensLista,
        carregado: true,
      })
      setMensagem('Backup restaurado com sucesso. Os dados locais foram substituídos.')
    } catch (causa: unknown) {
      setErro(
        causa instanceof Error
          ? causa.message
          : 'Não foi possível ler ou restaurar o arquivo de backup.',
      )
    } finally {
      setOcupado(false)
    }
  }

  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">SEUS DADOS, SOB SEU CONTROLE</p>
        <h1>Backup e restauração</h1>
        <p>Exporte ou restaure suas preferências e dados culinários neste dispositivo.</p>
      </section>
      <section className="backup-painel">
        <div className="backup-painel__aviso">
          <ShieldCheck size={22} aria-hidden="true" />
          <p>
            O arquivo inclui favoritos, lista de compras, planejamento semanal, histórico de
            preparos, anotações e preferências. Ele permanece apenas no seu dispositivo.
          </p>
        </div>
        <div className="backup-painel__acoes">
          <button
            className="botao"
            type="button"
            disabled={ocupado}
            onClick={() => void exportar()}
          >
            <Download size={17} aria-hidden="true" /> Exportar backup JSON
          </button>
          <label className="botao botao--secundario backup-painel__importar">
            <FileUp size={17} aria-hidden="true" /> Restaurar arquivo JSON
            <input
              type="file"
              accept=".json,application/json"
              disabled={ocupado}
              onChange={(evento) => void importar(evento)}
            />
          </label>
        </div>
        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}
        {mensagem && (
          <p className="backup-painel__sucesso" role="status">
            {mensagem}
          </p>
        )}
        <p className="backup-painel__nota">
          A restauração substitui os dados atuais. Arquivos inválidos são rejeitados sem alterar
          suas informações.
        </p>
      </section>
    </main>
  )
}
