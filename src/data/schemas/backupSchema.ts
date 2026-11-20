import { z } from 'zod'

const itemListaSchema = z.object({
  id: z.string().trim().min(1),
  nome: z.string().trim().min(1),
  comprado: z.boolean(),
})

const itemPlanejamentoSchema = z.object({
  id: z.string().trim().min(1),
  data: z.iso.date(),
  refeicao: z.enum(['cafe-da-manha', 'almoco', 'lanche', 'jantar']),
  receitaId: z.string().trim().min(1),
  porcoes: z.number().finite().positive(),
})

const preparoSchema = z.object({
  id: z.string().trim().min(1),
  receitaId: z.string().trim().min(1),
  preparadoEm: z.iso.datetime(),
})

const anotacaoSchema = z.object({
  receitaId: z.string().trim().min(1),
  texto: z.string(),
  atualizadaEm: z.iso.datetime(),
})

export const backupSchema = z.object({
  versao: z.literal(1),
  exportadoEm: z.iso.datetime(),
  favoritos: z.array(z.string().trim().min(1)),
  preferencias: z.record(z.string(), z.unknown()).nullable(),
  itensLista: z.array(itemListaSchema),
  planejamento: z.array(itemPlanejamentoSchema),
  historico: z.array(preparoSchema),
  anotacoes: z.array(anotacaoSchema),
})

export type BackupDados = z.infer<typeof backupSchema>
