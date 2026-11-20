import { recipeSchema } from '../schemas/recipeSchema'
import { bowlDeQuinoa } from './bowlDeQuinoa'
import { boloDeCenoura } from './boloDeCenoura'
import { moquecaDeBanana } from './moquecaDeBanana'
import { risotoDeCogumelos } from './risotoDeCogumelos'
import { peixeAssadoComLegumes } from './peixeAssadoComLegumes'
import { macarraoAoPesto } from './macarraoAoPesto'
import { brownieDeChocolate } from './brownieDeChocolate'
import { pudimProteicoDoceDeLeite } from './pudimProteicoDoceDeLeite'
import { hamburguerMassaPastel } from './hamburguerMassaPastel'
import { pureDeCouveFlor } from './pureDeCouveFlor'
import { overnightOatsBanana } from './overnightOatsBanana'
import { tofuSalteadoLegumes } from './tofuSalteadoLegumes'

export const receitas = [
  boloDeCenoura,
  moquecaDeBanana,
  bowlDeQuinoa,
  risotoDeCogumelos,
  peixeAssadoComLegumes,
  macarraoAoPesto,
  brownieDeChocolate,
  pudimProteicoDoceDeLeite,
  hamburguerMassaPastel,
  pureDeCouveFlor,
  overnightOatsBanana,
  tofuSalteadoLegumes,
].map((receita) => recipeSchema.parse(receita))
