import { z } from 'zod'
import type { Receita } from '../../types/recipe'

const textoObrigatorioSchema = z.string().trim().min(1)
const textoOpcionalSchema = z.string().trim().min(1).optional()
const numeroNaoNegativoSchema = z.number().finite().min(0)

const temposReceitaSchema = z.object({
  preparoMinutos: numeroNaoNegativoSchema,
  cozimentoMinutos: numeroNaoNegativoSchema,
  totalMinutos: numeroNaoNegativoSchema,
})

const ingredienteReceitaSchema = z.object({
  id: textoObrigatorioSchema,
  nome: textoObrigatorioSchema,
  quantidade: numeroNaoNegativoSchema.nullable(),
  unidade: textoObrigatorioSchema,
  grupo: textoOpcionalSchema,
  etapa: z.number().int().positive().optional(),
  observacao: textoOpcionalSchema,
  opcional: z.boolean(),
  indivisivel: z.boolean(),
})

const etapaPreparoSchema = z.object({
  numero: z.number().int().positive(),
  titulo: textoOpcionalSchema,
  descricao: textoObrigatorioSchema,
  tempoMinutos: numeroNaoNegativoSchema.optional(),
  ingredientesVinculados: z.array(textoObrigatorioSchema),
})

const substituicaoReceitaSchema = z.object({
  ingrediente: textoObrigatorioSchema,
  substituto: textoObrigatorioSchema,
  observacao: textoOpcionalSchema,
})

const informacaoNutricionalSchema = z.object({
  origem: z.enum(['calculada', 'informada', 'estimada']),
  porcao: textoOpcionalSchema,
  caloriasKcal: numeroNaoNegativoSchema.optional(),
  carboidratosG: numeroNaoNegativoSchema.optional(),
  proteinasG: numeroNaoNegativoSchema.optional(),
  gordurasG: numeroNaoNegativoSchema.optional(),
  fibrasG: numeroNaoNegativoSchema.optional(),
  sodioMg: numeroNaoNegativoSchema.optional(),
})

export const recipeSchema = z
  .object({
    id: textoObrigatorioSchema,
    slug: textoObrigatorioSchema,
    titulo: textoObrigatorioSchema,
    descricaoCurta: textoObrigatorioSchema,
    descricaoCompleta: textoObrigatorioSchema,
    imagem: textoObrigatorioSchema,
    galeria: z.array(textoObrigatorioSchema).optional(),
    categoriaPrincipal: textoObrigatorioSchema,
    categorias: z.array(textoObrigatorioSchema),
    subcategorias: z.array(textoObrigatorioSchema),
    tags: z.array(textoObrigatorioSchema),
    dificuldade: z.enum(['fácil', 'média', 'difícil']),
    tempos: temposReceitaSchema,
    rendimentoBase: z.number().finite().positive(),
    rendimentoLabel: textoObrigatorioSchema,
    ingredientes: z.array(ingredienteReceitaSchema).min(1),
    etapas: z.array(etapaPreparoSchema).min(1),
    dicas: z.array(textoObrigatorioSchema),
    substituicoes: z.array(substituicaoReceitaSchema),
    restricoesAlimentares: z.array(textoObrigatorioSchema),
    tipoRefeicao: textoObrigatorioSchema,
    ocasioes: z.array(textoObrigatorioSchema),
    youtubeUrl: z.url().optional(),
    nutricao: informacaoNutricionalSchema.optional(),
  })
  .superRefine((receita, contexto) => {
    const idsIngredientes = new Set(receita.ingredientes.map(({ id }) => id))

    receita.ingredientes.forEach((ingrediente, indice) => {
      if (receita.ingredientes.findIndex(({ id }) => id === ingrediente.id) !== indice) {
        contexto.addIssue({
          code: 'custom',
          message: `O identificador "${ingrediente.id}" está duplicado.`,
          path: ['ingredientes', indice, 'id'],
        })
      }
    })

    receita.etapas.forEach((etapa, indiceEtapa) => {
      etapa.ingredientesVinculados.forEach((idIngrediente, indiceIngrediente) => {
        if (!idsIngredientes.has(idIngrediente)) {
          contexto.addIssue({
            code: 'custom',
            message: `O ingrediente "${idIngrediente}" não existe na receita.`,
            path: ['etapas', indiceEtapa, 'ingredientesVinculados', indiceIngrediente],
          })
        }
      })
    })
  }) satisfies z.ZodType<Receita>
