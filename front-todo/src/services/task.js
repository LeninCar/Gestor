import axios from "axios";

class ServiceTasks {
    getTareas = () => {
        return new Promise((resolve, reject) => {
            axios.get("https://localhost:7293/api/Tarea")
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch((error) => reject(error)
                )
        });
    };
    getCategorias = () => {
        return new Promise((resolve, reject) => {
            axios.get("https://localhost:7293/api/Categorias")
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch((error) => reject(error)
                )
        });
    };
    putTareaEstado = (id, tarea) => {
        const tarea2 = {
            "titulo": tarea.titulo,
            "descripcion": tarea.descripcion,
            "fechaFinalizacion": tarea.fechaFinalizacion,
            "estado": parseInt(1),
            "categoriaId": tarea.categoriaId
        }
        return new Promise((resolve, reject) => {
            axios.put(`https://localhost:7293/api/Tarea/${id}`
                , tarea2)
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch((error) => reject(error))
        });
    };
    postTarea = (tarea) => {
        console.log(tarea)
        return new Promise((resolve, reject) => {
            axios.post(`https://localhost:7293/api/Tarea`
                , tarea)
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch((error) => reject(error))
        });
    };
    deleteTarea = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`https://localhost:7293/api/Tarea/${id}`)
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch((error) => reject(error))
        });
    };
}

export default ServiceTasks;
