import { useState } from "react"
import { crearCategoria } from "../services/categoriasService"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function CrearCategoriaView() {
  const [inputs, setInputs] = useState({
    cat_nom:"", cat_desc:""
  })

  const navigate = useNavigate()

  const manejarInput = (e) => {
    console.log(e)

    setInputs({
      ...inputs,

      [e.target.name]:e.target.value
    })
  }

  const existeErrorInputs = () => {
    if(inputs.cat_nom.trim() === "", inputs.cat_desc.trim() === ""  ){
     
      return true
    }
    return false
  }
  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearCategoria(inputs)
      Swal.fire({
        icon:"success",
        title:"Categoria Creada!"
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="card mt-3">
      <div className="card-body">
      <h4 className="mb-3">
        Crear Categoria
      </h4>
        <form onSubmit={(e) => {manejarSubmit(e)}}>
            <div className="mb-3">
                <label className="form-label">
                    Nombre categoria
                </label>
                <input 
                    className="form-control"
                    type="text"
                    placeholder="Cosméticos"
                    name="cat_nom"
                    value={inputs.cat_nom}
                    onChange={(e) => {manejarInput(e)}}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Descripción de la categoria
                </label>
                <input 
                    className="form-control"
                    type="text"
                    placeholder="Ingrese Descripción"
                    name="cat_desc"
                    value={inputs.cat_desc}
                    onChange={(e) => {manejarInput(e)}}
                />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={existeErrorInputs()}>
              Guardar
            </button>
        </form>
        </div>
        </div> 
    </>
  )
}