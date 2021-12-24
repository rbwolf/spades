import NewGame from './components/NewGame'
import Play from './components/Play'
import VueRouter from 'vue-router'

const routes = [
  {path: '/', redirect: '/play'},
  {name: 'new', path: '/new', component: NewGame},
  {name: 'play', path: '/play', component: Play}
]

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production' ? '/spades/' : '/',
  routes
})

router.beforeEach((to, from, next) => {
  const hasSavedState = !!window.localStorage.getItem('spades')
  if (hasSavedState && to.name === 'new') {
    next({ name: 'play' })
  }
  if (!hasSavedState && to.name === 'play') {
    next({name: 'new'})
  }
  next()
})


export default router