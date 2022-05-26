import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CategoriasView from "./views/CategoriasView"
import CrearCategoriaView from "./views/CrearCategoriaView"
import EditarCategoriaView from "./views/EditarCategoriaView"

import ProductosView from "./views/ProductosView"
import CrearProductosView from "./views/CrearProductosView"

//Componentes
import Navigation from "./components/Navigation"

//import Imagen from "./img/miImagen.jpg"

export default function App() {
  // <> = Fragment
  return (
    //Router servirá como una envoltura para manejar todas las rutas internamente
    <Router> 
      <Navigation />
      <div className="container pt-4">
        {/* Dentro de Routes crearemos nuestras rutas */}
        <Routes>
       
          <Route path="/" element={<CategoriasView />} />
          <Route path="/crearcategoria" element={<CrearCategoriaView />} />
          <Route path="/editarcategoria/:idCat" element={<EditarCategoriaView />} />

          <Route path="/productos" element={<ProductosView />} />   
          <Route path="/crearproducto" element={<CrearProductosView />} />
        </Routes>
      </div>
    </Router>
  )
}