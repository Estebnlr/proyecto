import axios from "axios"

//process.env hace referencia a las variables de entorno para después indicar que variable deseamos obtener, process.env.NOMBRE_DE_LA_VARIABLE_DE_ENTORNO
const URL = process.env.REACT_APP_API;
// console.log(process.env.REACT_APP_API)


const crearProducto = async(nuevoProducto) => {
    try {
        const headers = {
            "Content-Type":"application/json"
        }
        //.post(URL, datos, {headers})
        const endpoint = `${URL}/categorias/${nuevoProducto.categoriaId}/productos`
        const { data, status } = await axios.post(endpoint, nuevoProducto, {headers})
        if(status === 201) {
            return data
        }else{
            //Error() es una manera de enviar un error nativo de JS
            throw Error("Error al crear")
        }
    } catch (error) {
        throw error
    }
}

const eliminarProducto = async (idCat, idProducto) => {
    try {
        const endpoint = `${URL}/categorias/${idCat}/productos/${idProducto}`
        const { status } = await axios.delete(endpoint)
        console.log(status)
        if(status === 200){
            return "ok"
        }else{
            return Error("Error al eliminar producto")
        }
    } catch (error) {
        return error
    }
}



export {
    
    eliminarProducto,
    crearProducto
    
}