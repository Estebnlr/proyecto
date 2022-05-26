import { useState, useEffect } from "react"
import { obtenerCategoria } from "../services/categoriasService"
import { Link } from "react-router-dom"
import { eliminarProducto } from "../services/productosService"
import Swal from "sweetalert2"

export default function ProductosView() {

  const [productos, setProductos] = useState([])

  const deleteProducto = async (idCat, idProducto) => {
    try {
      const resultado = await Swal.fire({
        title: 'Desea eliminar este Producto',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: `No, cancelar`,
      })
      if(resultado.isConfirmed){
        await eliminarProducto(idCat, idProducto)
        Swal.fire({
          title:"Producto eliminado",
          icon:"success"
        })
        getCategorias()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCategorias = async () => {
    try {
      const categorias = await obtenerCategoria()
      const catFiltradas = categorias.filter((cat) => cat.productos.length > 0)
      const arrProductos = catFiltradas.map((cat) => cat.productos).flat()
      setProductos(arrProductos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategorias();
  }, [])
  
  return (
      <div className="card mt-3">
      <div className="card-body">
      <h4 className="mb-3">
        Productos
      </h4>
      <Link className="btn btn-success mb-2" to="/crearproducto">
        Crear nuevo producto
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(({prod_nom, prod_desc, prod_prec, prod_id, categoriaId}, i) => (
            <tr key={i}>
              <td>{prod_nom}</td>
              <td>{prod_desc}</td>
              <td>{prod_prec}</td>
              <td>         
                <Link className="btn btn-warning btn-sm" 
                >
                  <i className="fa-solid fa-file-pen" />
                </Link>

                <button 
                  className="btn btn-danger btn-sm ms-2" 
                  onClick={() => {deleteProducto(categoriaId, prod_id)}}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}