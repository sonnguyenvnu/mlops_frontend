import { useRoutes } from 'react-router-dom'
import './App.css'
import routes from './routes/routes'

const App = () => {
  const appRoutes = useRoutes(routes)
  return appRoutes
}

export default App
