import { useState, useEffect} from "react";
import { obtenerCategoria, editarCategoria } from "../services/categoriasService";
import Cargando from "../components/Cargando";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditarCategoriaView() {

  const [inputs, setInputs] = useState({
    cat_nom:"",
    cat_desc:""
  });

  const [ categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {idCat} = useParams();

  const manejarInputs = (e) => {
    console.log(e.target.name);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
        await editarCategoria(idCat, inputs)
      setLoading(false)
      Swal.fire({
        icon: "success",
        title: "Categoria modificada!",
      });
      navigate("/ ");
    } catch (error) {
      setLoading(false)
     
      console.log(error);
    }
  };

  const existeErrorInputs = () => {
    if (
      inputs.cat_nom.trim() === "" ||
      inputs.cat_desc.trim() === ""
    ) {
      
      return true;
    }
    return false;
  };


  useEffect( () => {
    
    const categoriaAEditar = async (e) => {

      e.preventDefault();
      try {
        await obtenerCategoria(idCat)       
      } catch (error) {
        console.log(error)
      }
      setInputs(categoriaAEditar)}
  }, []);

  if(loading){
    return <Cargando />
  }


  return (
    <>
      <div className="card mt-3">
      <div className="card-body">
      <h4 className="mb-3">
        Editar Categoria
      </h4>
        <form  onSubmit={(e) => {
          manejarSubmit(e);
        }}>
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
                    onChange={(e) => {
                      manejarInputs(e);
                    }}
                    
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Descripción
                </label>
                <input 
                    className="form-control"
                    type="text"
                    placeholder="Ingrese descripción"
                    name="cat_desc"
                    value={inputs.cat_desc}
                    onChange={(e) => {
                      manejarInputs(e);
                    }}
                    
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