import NewGame from './components/NewGame'
import Play from './components/Play'

export default [
  {path: '/', redirect: '/new'},
  {path: '/new', component: NewGame},
  {path: '/play', component: Play}
]