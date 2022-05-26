import { useState, useEffect } from "react"
import { obtenerCategoria, eliminarCategoria } from "../services/categoriasService"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

export default function CategoriasView() {

  const [categorias, setCategorias] = useState([]);

  const deleteCategoria = async (idCat) => {
    try {
      const resultado = await Swal.fire({
        title: 'Desea eliminar esta categoria',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: `No, cancelar`,
      })
      if(resultado.isConfirmed){
        await eliminarCategoria(idCat)
        Swal.fire({
          title:"Categoria eliminada",
          icon:"success"
        })
         getCategorias()
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  // const getCategorias = async () => {
  //   try {
  //     const categoria = await obtenerCategoria()
  //     const catFiltradas = categoria.filter((cat) => cat.categorias.length > 0)
  //     const arrCategorias = catFiltradas.map((cat) => cat.categorias).flat()
  //     setCategorias(arrCategorias)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getCategorias();
  // }, [])
  
  const getCategorias = () => {
    obtenerCategoria()
    .then((data) => {
      setCategorias(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCategorias()
  }, [])
  

  return (
    <>
      
      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title">
            Categorias
          </h4>
          <Link className="btn btn-success mb-2" to="/crearcategoria">
          Crear nueva categoria
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Nombre
                </th>
                <th>
                  Descripcion
                </th>
                <th>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
                {categorias.map(({cat_nom, cat_desc, cat_id}, i) => (
                  <tr key={i}>
                    <td>
                      {cat_nom}
                    </td>
                    <td>
                      {cat_desc}
                    </td>
                    <td>
                    
                     <Link className="btn btn-warning btn-sm" to={`/editarcategoria`}>
                     <i className="fa-regular fa-pen-to-square" />
                     </Link>

                    <button className="btn btn-danger btn-sm ms-2" onClick={() => {deleteCategoria(cat_id)}}>
                  <i className="fa-regular fa-trash-can" />
                </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}