import { recipeSchema } from '../schemas/recipeSchema'
import { bowlDeQuinoa } from './bowlDeQuinoa'
import { boloDeCenoura } from './boloDeCenoura'
import { moquecaDeBanana } from './moquecaDeBanana'

export const receitas = [boloDeCenoura, moquecaDeBanana, bowlDeQuinoa].map((receita) =>
  recipeSchema.parse(receita),
)
