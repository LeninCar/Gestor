import './App.css';
import Login from './login/Login';
import task from "./services/task";
import { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

function App() {
  const serviceTasks = new task()
  const [dataTask, setDataTask] = useState([])
  const fechaHoy = new Date
  useEffect(() => {
    async function fetchData() {
      await serviceTasks.getTareas().then((data) => {
        setDataTask(data);
        console.log(data);
      });
    }

    fetchData();
  }
    , []);

  const IniciarTarea = (id, tarea) => {
    async function fetchData() {
      await serviceTasks.putTareaEstado(id, tarea).then((data) => {
        console.log(data);
      });
    }
    try {
      fetchData();
      window.location.reload()


    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el Servidor!",
      });
    } finally {
      serviceTasks.getTareas().then((data) => {
        setDataTask(data);
      })
    }
  }
  const TerminarTarea = async (id) => {
    async function fetchData() {
      await serviceTasks.deleteTarea(id).then((data) => {
        console.log(data);
      });
    }
    try {
      fetchData();
      await serviceTasks.getTareas().then((data) => {
        setDataTask(data);
      })
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Terminada con Exito",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el Servidor!",
      });
    } finally {
      await serviceTasks.getTareas().then((data) => {
        setDataTask(data);
      })
    }
  }
  const Table = () => {
    return dataTask.map((item, index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>
          <OverlayTrigger
            overlay={
              <Tooltip id={`tittle-tooltip-${index}`} style={{ color: "#333", fontFamily: "Arial, sans-serif" }
              }>{item.descripcion}</Tooltip>}>
            <a>{item.titulo}</a>
          </OverlayTrigger></td>
        <td>{item.estado}</td>
        <td className="button-container">

          <OverlayTrigger
            overlay={
              <Tooltip id={`matricular-tooltip-${index}`} style={{ color: "#333", fontFamily: "Arial, sans-serif" }}>
                Iniciar Tarea
              </Tooltip>
            }
          >
            <a
              onClick={() => { IniciarTarea(item.id, item) }}
              href="#"
              className="btn"
              style={{ color: "#05080a" }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id={`edit-tooltip-${index}`} style={{ color: "#333", fontFamily: "Arial, sans-serif" }}>
              Finalizar Tarea
            </Tooltip>}
          >
            <a
              onClick={() => { TerminarTarea(item.id) }}
              href="#"
              className="btn"
              style={{ paddingLeft: '20px', color: "#9fdfbf" }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    ));
  }
  const obtenerNombreMes = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase();; // Ajusta el idioma según lo necesites
  };
  const obtenerNombreDiaSemana = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toUpperCase(); // Ajusta el idioma según lo necesites
  };

  return (
    <div class="container">
      <div class="card">
        <div class="top-part">
          <div class="saturday">
            <h5 class="setdate">{obtenerNombreDiaSemana(fechaHoy) + ", " + fechaHoy.getDate() + " DE " + obtenerNombreMes(fechaHoy)}</h5>
            <br />
          </div>
          <h6>Incomplete Tasks: 1</h6>
          <h6 class="settime">------------------------------------------------------------------------------</h6>
          <h6>Complete Tasks: 0</h6>
          <h6 class="settime">------------------------------------------------------------------------------</h6>
        </div>
        <div class="addtask">

          <textarea placeholder="Enter a task...">

          </textarea>
          <button>Add task</button>
        </div>
      </div>
      <div class="table-card">

        <table className="table">
          <thead>
            <tr className="border-bottom">
              <th>
                <span className="ml-2">#</span>
              </th>
              <th>
                <span className="ml-2">Tarea</span>
              </th>
              <th>
                <span className="ml-4">Estado</span>
              </th>
              <th>
                <span className="ml-4">Accion</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {Table()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;