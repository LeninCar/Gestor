import './App.css';
import task from "./services/task";
import { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';


function App() {
  const serviceTasks = new task()
  const [dataTask, setDataTask] = useState([])
  const [dataCategorias, setCategorias] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionCategoria, setSelectedOptionCategoria] = useState('Categoria');
  const [selectedOptionCategoriaId, setSelectedOptionCategoriaId] = useState(0);
  const [tituloTarea, setTituloTarea] = useState(0);
  const [descripcionTarea, setDescripcionTarea] = useState(0);
  const [fechaCategoriaSelected, setFechaCategoriaSelected] = useState(null);
  const options = ['Opción 1', 'Opción 2', 'Opción 3'];

  const fechaHoy = new Date

  const obtenerNombreMes = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase();; // Ajusta el idioma según lo necesites
  };
  const obtenerNombreDiaSemana = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toUpperCase(); // Ajusta el idioma según lo necesites
  };
  const handleOptionClick = (option) => {
    setSelectedOptionCategoria(option.nombre);
    setSelectedOptionCategoriaId(option.id);

    console.log(option)
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function formatDateToISOString(date) {

    if (isNaN(date)) {
      console.error('Fecha no válida:', fechaCategoriaSelected);
    } else {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() devuelve 0-11
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    }
  }

  useEffect(() => {
    async function fetchData() {
      await serviceTasks.getTareas().then((data) => {
        setDataTask(data);
      });
      await serviceTasks.getCategorias().then((data) => {
        setCategorias(data);
      });
    }

    fetchData();
  }
    , []);

  const IniciarTarea = async (id, tarea) => {
    async function fetchData() {
      await serviceTasks.putTareaEstado(id, tarea).then((data) => {
        console.log(data);
      });
    }
    try {
      fetchData();
      await serviceTasks.getTareas().then((data) => {
        setDataTask(data);
      })
      window.location.reload();
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
  const TerminarTarea = async (id, estado) => {
    if (estado == 'EnProceso') {
      async function fetchData() {
        await serviceTasks.deleteTarea(id).then((data) => {
          console.log(data);
        });
        await serviceTasks.getTareas().then((data) => {
          setDataTask(data);
        })
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Primero Iniciar Tarea!",
        text: "No Puedes Finalizar Una Tarea Que No has Iniciado...",
      });
    }

  }

  const CrearTarea = async () => {

    let tarea;
    const fecha = new Date(fechaCategoriaSelected);
    const fechaFormateada = formatDateToISOString(fecha);

    if (tituloTarea == '' || descripcionTarea == '' || selectedOptionCategoriaId == 0 || fechaCategoriaSelected == null) {
      Swal.fire({
        title: "¡Campos Vacios!",
        text: "Diligencia Todos Los Campos Para Añadir una Tarea...",
        imageUrl: "/images/alert-empty-fields.png"
      });
    }
    else {
      tarea = {
        "titulo": tituloTarea,
        "descripcion": descripcionTarea,
        "fechaFinalizacion": fechaFormateada,
        "estado": 0,
        "categoriaId": selectedOptionCategoriaId
      }
      try {
        await serviceTasks.postTarea(tarea);
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
        Swal.fire({
          title: "¡Tarea Creada con Exito!",
          imageUrl: "/images/tarea-creada.png"
        })
      }
    }

  }
  const tooltipContainerStyle = {
    backgroundColor: '#f0f0f0', // Color de fondo del rectángulo
    border: '1px solid #ccc',    // Borde del rectángulo
    borderRadius: '5px',         // Bordes redondeados del rectángulo
    padding: '10px',             // Espaciado interno del rectángulo
    color: '#202020',            // Color del texto del tooltip
    fontFamily: 'revert',        // Fuente del texto del tooltip
    fontSize: '15px'             // Tamaño de fuente del texto del tooltip
  };
  const Table = () => {
    return dataTask.map((item, index) => (
      <tr key={index}>
        <td >{index}</td>
        <td>
          <OverlayTrigger
            overlay={
              <Tooltip id={`tittle-tooltip-${index}`} style={tooltipContainerStyle}>
                {item.descripcion}</Tooltip>}>
            <a>{item.titulo}</a>
          </OverlayTrigger></td>
        <td>{item.estado === 'Pendiente' ? 
        <span style={{ color: "black", font:'revert',fontSize:'18px'}}>{item.estado}</span> : 
        <span style={{ color: "lightgray", font:'icon',fontSize:'18px' }}>{item.estado}</span>}</td>
        <td className="button-container">

          <OverlayTrigger
            overlay={
              <Tooltip id={`matricular-tooltip-${index}`} style={tooltipContainerStyle}>
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
            overlay={<Tooltip id={`edit-tooltip-${index}`} style={tooltipContainerStyle}>
              Finalizar Tarea
            </Tooltip>}
          >
            <a
              onClick={() => { TerminarTarea(item.id, item.estado) }}
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


  return (
    <div class="container">
      <div class="card">
        <div class="top-part">
          <div class="saturday">
            <h5 class="setdate">{obtenerNombreDiaSemana(fechaHoy) + ", " + fechaHoy.getDate() + " DE " + obtenerNombreMes(fechaHoy)}</h5>
            <br />
          </div>
          <h6>Tareas por Hacer:
            <span> </span>
            <span style={{ color: "lightgray", fontSize: '19px', fontFamily: 'inherit' }}>
              {dataTask.filter(data => data.estado === 'Pendiente').length}
            </span>
          </h6>
          <h6>Tareas en Proceso:
            <span> </span>
            <span style={{ color: "ThreeDDarkShadow", fontSize: '19px', fontFamily: 'inherit' }}>
              {dataTask.filter(data => data.estado === 'EnProceso').length}
            </span>
          </h6>

        </div>
        <div class="addtask">
          <textarea placeholder="Escriba el Titulo de la Tarea..." onChange={(e) => setTituloTarea(e.target.value)}>
          </textarea>
          <textarea placeholder="Descripcion..." onChange={(e) => setDescripcionTarea(e.target.value)}>
          </textarea>
          <input
            placeholder={fechaCategoriaSelected}
            onChange={(e) => setFechaCategoriaSelected(e.target.value)}
            type="date"
            className="custom-date-input"
          />
          <div class="dropdown">
            <button onClick={toggleDropdown}>{selectedOptionCategoria}</button>
            {isOpen && (

              <div class="content">
                {dataCategorias.map((option) => (
                  <a key={option.id} href="#" onClick={() => handleOptionClick(option)}>
                    {option.nombre}
                  </a>
                ))}
              </div>)}
          </div>

          <button onClick={() => CrearTarea()}>Añadir Tarea</button>
        </div>

      </div>
      <br />
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