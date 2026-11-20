import {
  Archive,
  CalendarDays,
  ChefHat,
  CookingPot,
  Heart,
  House,
  ListChecks,
  Scale,
  Search,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { PwaUpdatePrompt } from '../components/layout/PwaUpdatePrompt'
import '../App.css'

const links = [
  { to: '/', label: 'Início', Icon: House, end: true },
  { to: '/receitas', label: 'Receitas', Icon: Search, end: false },
  { to: '/conversor', label: 'Conversor', Icon: Scale, end: false },
  { to: '/despensa', label: 'Despensa', Icon: CookingPot, end: false },
  { to: '/favoritos', label: 'Favoritos', Icon: Heart, end: false },
  { to: '/lista-de-compras', label: 'Compras', Icon: ListChecks, end: false },
  { to: '/planejamento', label: 'Planejar', Icon: CalendarDays, end: false },
  { to: '/backup', label: 'Backup', Icon: Archive, end: false },
]

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header site-header--app">
        <NavLink className="marca" to="/" aria-label="Ratatouille, página inicial">
          <span className="marca__icone" aria-hidden="true">
            <ChefHat size={20} strokeWidth={2.2} />
          </span>
          <span>ratatouille</span>
        </NavLink>
        <nav className="navegacao navegacao--principal" aria-label="Navegação principal">
          {links.map(({ to, label, Icon, end }) => (
            <NavLink
              className={({ isActive }) =>
                `navegacao__link${isActive ? ' navegacao__link--ativo' : ''}`
              }
              end={end}
              key={to}
              to={to}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <NavLink className="botao botao--pequeno site-header__acao" to="/receitas">
          Buscar <Search size={16} />
        </NavLink>
      </header>

      <Outlet />
      <PwaUpdatePrompt />

      <footer className="rodape">
        <NavLink className="marca marca--rodape" to="/" aria-label="Ratatouille, início">
          <span className="marca__icone" aria-hidden="true">
            <ChefHat size={18} />
          </span>
          <span>ratatouille</span>
        </NavLink>
        <p>Feito com carinho e uma pitada de criatividade.</p>
        <NavLink to="/receitas">Explorar receitas</NavLink>
        <NavLink to="/planejamento">Planejar semana</NavLink>
        <NavLink to="/backup">Backup</NavLink>
      </footer>
    </div>
  )
}
