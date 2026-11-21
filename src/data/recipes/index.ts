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
import { boloDeBananaFit } from './boloDeBananaFit'
import { paoDeBatataNaAirFryer } from './paoDeBatataNaAirFryer'
import { pizzaNaAirFryer } from './pizzaNaAirFryer'
import { nuggetsFitCaseiro } from './nuggetsFitCaseiro'
import { batataRusticaNaAirFryer } from './batataRusticaNaAirFryer'
import { couveFlorEmpanadaNaAirFryer } from './couveFlorEmpanadaNaAirFryer'
import { nhoqueComMolhoDeQueijo } from './nhoqueComMolhoDeQueijo'
import { nhoqueTradicional } from './nhoqueTradicional'
import { arrozDeFraldinha } from './arrozDeFraldinha'

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
  boloDeBananaFit,
  paoDeBatataNaAirFryer,
  pizzaNaAirFryer,
  nuggetsFitCaseiro,
  batataRusticaNaAirFryer,
  couveFlorEmpanadaNaAirFryer,
  nhoqueComMolhoDeQueijo,
  nhoqueTradicional,
  arrozDeFraldinha,
].map((receita) => recipeSchema.parse(receita))
