import { useState, useEffect, useRef } from "react";
import { obtenerCategoria } from "../services/categoriasService";
import { crearProducto } from "../services/productosService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { subirArchivo } from "../config/fireStorage"
import Cargando from "../components/Cargando"

let miArchivo = null;

export default function CrearProductoView() {
  
  const [inputs, setInputs] = useState({
    prod_nom: "",
    prod_desc: "",
    prod_prec: "",
    categoriaId: 1,
    
  });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false)

  const inputFile = useRef()

  const navigate = useNavigate();

  const manejarInputs = (e) => {
    console.log(e.target.name);
    setInputs({
      ...inputs, //spread operator de las propiedades de inputs
      //era segun el name que recibiamos a partir del evento,
      //le asignabamos el valor
      [e.target.name]: e.target.value,
    });
  };

  const manejarFile = (e) => {
    // console.log("manejar File", e.target.files[0])
    miArchivo = e.target.files[0]
  }

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading antes de ejecutar nuestras funciones para subir un archivo y crear u lugar
      setLoading(true)
      const archivoSubido = await subirArchivo(miArchivo)
      // console.log({archivoSubido})
      await crearProducto({...inputs, prod_img:archivoSubido});
      setLoading(false)
      Swal.fire({
        icon: "success",
        title: "Producto creado!",
      });
      navigate("/productos");
    } catch (error) {
      setLoading(false)
      //Swal
      console.log(error);
    }
  };

  const existeErrorInputs = () => {
    if (
      inputs.prod_nom.trim() === "" ||
      inputs.prod_desc.trim() === "" ||
      inputs.prod_prec.trim() === ""
    ) {
      //si alguno de los inputs quitandoles los espacios no tiene nada de texto retornare true
      //Si se ejecuta un return ahí finaliza la función
      return true;
    }
    return false;
  };


  useEffect(() => {
    const getCategorias = async () => {
      try {
        const categoriasObtenidas = await obtenerCategoria();
        // console.log({categoriasObtenidas})
        //solamente necesitamos el id y el nombre
        const infoCategorias = categoriasObtenidas.map(
          ({ cat_id, cat_nom }) => {
            return { cat_nom: cat_nom, cat_id: cat_id };
          }
        );
        // console.log({infoCategorias})
        setCategorias(infoCategorias);
      } catch (error) {
        console.log(error);
      }
    };
    getCategorias();
  }, []);

  if(loading){
    //en caso el estado loading sea verdadero en vez de retornar mi componente con sus inputs, retorno el componente Cargando
    return <Cargando />
  }

  return (
    <div>
      <h1 className="mb-3">Crear Producto</h1>
      <form
        onSubmit={(e) => {
          manejarSubmit(e);
        }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre producto:</label>
          <input
            type="text"
            placeholder="Ej. labial"
            className="form-control"
            name="prod_nom"
            value={inputs.prod_nom}
            onChange={(e) => {
              manejarInputs(e);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción del producto</label>
          <input
            type="text"
            placeholder="Ingrese descripción"
            className="form-control"
            name="prod_desc"
            value={inputs.prod_desc}
            onChange={(e) => {
              manejarInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio del producto</label>
          <input
            type="text"
            placeholder="Ingrese precio"
            className="form-control"
            name="prod_prec"
            value={inputs.prod_prec}
            onChange={(e) => {
              manejarInputs(e);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Seleccione una categoría</label>
          <select
            className="form-select"
            name="categoriaId"
            value={inputs.categoriaId}
            onChange={(e) => manejarInputs(e)}
          >
            {categorias.map(({ cat_id, cat_nom }, i) => (
              <option value={cat_id} key={i}>
                {cat_nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Seleccione Imagen
          </label>
          <input
            type="file"
            className="form-control"
            ref={inputFile}
            onChange={(e) => {manejarFile(e)}}
          />
        </div>
        
       
        <button
          className="btn btn-primary"
          type="submit"
          disabled={existeErrorInputs()}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}