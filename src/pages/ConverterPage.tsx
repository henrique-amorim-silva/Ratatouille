import { useState } from 'react'
import { ArrowRightLeft, Scale } from 'lucide-react'
import { converterMedidas, UNIDADES_MEDIDA, type UnidadeMedida } from '../domain/measurements'

export function ConverterPage() {
  const [quantidade, setQuantidade] = useState('1')
  const [unidadeOrigem, setUnidadeOrigem] = useState<UnidadeMedida>('xícara')
  const [unidadeDestino, setUnidadeDestino] = useState<UnidadeMedida>('g')
  const [ingrediente, setIngrediente] = useState('')
  const numeroQuantidade = Number(quantidade)
  const resultado = converterMedidas(numeroQuantidade, unidadeOrigem, unidadeDestino, ingrediente)
  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">MEDIDAS NA COZINHA</p>
        <h1>Conversor culinário</h1>
        <p>Converta unidades comuns e confira quando a densidade do ingrediente faz diferença.</p>
      </section>

      <form className="conversor-medidas" onSubmit={(evento) => evento.preventDefault()}>
        <label>
          <span>Ingrediente</span>
          <input
            type="text"
            value={ingrediente}
            onChange={(evento) => setIngrediente(evento.target.value)}
            placeholder="Ex.: farinha de trigo"
            autoComplete="off"
          />
        </label>

        <div className="conversor-medidas__linha">
          <label>
            <span>Quantidade</span>
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={quantidade}
              onChange={(evento) => setQuantidade(evento.target.value)}
            />
          </label>
          <label>
            <span>De</span>
            <select
              value={unidadeOrigem}
              onChange={(evento) => setUnidadeOrigem(evento.target.value as UnidadeMedida)}
            >
              {UNIDADES_MEDIDA.map((unidade) => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </label>
          <button
            className="conversor-medidas__trocar"
            type="button"
            aria-label="Trocar unidades"
            onClick={() => {
              setUnidadeOrigem(unidadeDestino)
              setUnidadeDestino(unidadeOrigem)
            }}
          >
            <ArrowRightLeft size={18} aria-hidden="true" />
          </button>
          <label>
            <span>Para</span>
            <select
              value={unidadeDestino}
              onChange={(evento) => setUnidadeDestino(evento.target.value as UnidadeMedida)}
            >
              {UNIDADES_MEDIDA.map((unidade) => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </label>
        </div>

        <section className="conversor-medidas__resultado" aria-live="polite">
          <Scale size={23} aria-hidden="true" />
          <div>
            <p className="sobretitulo">RESULTADO</p>
            <output>
              {quantidade.trim() !== '' && resultado.quantidade !== null
                ? `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(resultado.quantidade)} ${unidadeDestino}`
                : '—'}
            </output>
          </div>
        </section>

        {resultado.aviso && (
          <p
            className={`aviso-conversao${resultado.confiavel ? '' : ' aviso-conversao--incerto'}`}
            role={resultado.confiavel ? 'note' : 'alert'}
          >
            {resultado.aviso}
          </p>
        )}
        <p className="conversor-medidas__nota">
          Referências: 1 xícara = 240 ml, 1 colher de sopa = 15 ml e 1 colher de chá = 5 ml. Medidas
          de volume entre si não dependem do ingrediente.
        </p>
      </form>
    </main>
  )
}
