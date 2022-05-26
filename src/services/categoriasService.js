import axios from "axios"

const URL = process.env.REACT_APP_API;

const obtenerCategoria = async() => {
    try {
        const endpoint = `${URL}/categorias`
        const { data, status } = await axios.get(endpoint)
        if(status === 200){
            return data
        }else{
            throw Error("Error al obtener la categoria")
        }
    } catch (error) {
        throw error
    }
}

const crearCategoria = async(nuevaCategoria) => {
    try {
        const headers = {
            "Content-Type":"application/json"
        }
        //.post(URL, datos, {headers})
        const endpoint = `${URL}/categorias`
        const { data, status } = await axios.post(endpoint, nuevaCategoria, {headers})
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


const eliminarCategoria = async (idCat) => {
    try {
        const endpoint = `${URL}/categorias/${idCat}`
        const { status } = await axios.delete(endpoint)
        console.log(status)
        if(status === 200){
            return "ok"
        }else{
            return Error("Error al eliminar categoria")
        }
    } catch (error) {
        return Error
    }
}

const editarCategoria = async (idCat, productoEditado) => {
    try {
        const headers = {
            "Content-Type":"application/json"
        }
        const endpoint = `${URL}/categorias/${idCat}`
        const { data, status } = await axios.put(endpoint, productoEditado, { headers })
        console.log(status)
        if(status === 200){
            return data
        }else{
            return Error("Error al editar categoria")
        }
    } catch (error) {
        return error
    }
}

export {
    
    obtenerCategoria,
    eliminarCategoria,
    editarCategoria,
    crearCategoria
    
   
}