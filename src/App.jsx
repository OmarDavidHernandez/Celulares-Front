import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Pagina from './Views/Public/Pagina'
import Login from './Views/Public/Login'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Detalle from './Views/Public/Detalle'
import IndexUsuarios from './Views/Admin/Usuarios/Index'
import CrearUsuario from './Views/Admin/Usuarios/Crear'
import EditarUsuario from './Views/Admin/Usuarios/Editar'
import IndexCelulares from './Views/Admin/Celulares/Index'
import EditarCelular from './Views/Admin/Celulares/Editar'
import CrearCelular from './Views/Admin/Celulares/Crear'
import IndexEncuestas from './Views/Admin/Encuestas/Index'
import CrearEncuesta from './Views/Admin/Encuestas/Crear'
import EditarEncuesta from './Views/Admin/Encuestas/Editar'
import Respuestas from './Views/Admin/Encuestas/Respuestas'
import Preguntas from './Views/Admin/Encuestas/Preguntas'
import Survey from './Views/Public/Survey'
import Aplicar from './Views/Public/Aplicar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Pagina />} />
        <Route path="/celular/:id" element={<Detalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/survey/:id" element={<Aplicar />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/usuarios" element={<IndexUsuarios />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
          <Route path="/cel" element={<IndexCelulares />} />
          <Route path="/crear-cel" element={<CrearCelular />} />
          <Route path="/editar-cel/:id" element={<EditarCelular />} />
          <Route path="/encuestas" element={<IndexEncuestas />} />
          <Route path="/crear-encuesta" element={<CrearEncuesta />} />
          <Route path="/editar-encuesta/:id" element={<EditarEncuesta />} />
          <Route path="/respuestas/:id" element={<Respuestas />} />
          <Route path="/preguntas/:id" element={<Preguntas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
