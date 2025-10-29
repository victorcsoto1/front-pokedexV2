import './App.css'
import Header from './components/header/Header'
import { BrowserRouter } from 'react-router-dom'
import RouterMain from './routes/RouterMain'
import { AuthProvider } from './components/auth/AuthProvider'
import { LoadingProvider } from './context/LoadingContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <Header />
          <RouterMain />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
