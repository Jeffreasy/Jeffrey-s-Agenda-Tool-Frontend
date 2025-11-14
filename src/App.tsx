import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Providers } from './components/providers'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </Router>
    </Providers>
  )
}

export default App
