import axios from "axios";

class ServiceTasks {
    getTareas = () => {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:5112/api/Tarea")
            .then((Response)=>{
                resolve(Response.data)
            })
            .catch((error)=>reject(error)
        )
        });
    };
}
export default ServiceTasks;
