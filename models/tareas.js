import Tarea from "./tarea.js";
import("colors");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      let num = `${index + 1}`.green;
      let name = tarea.desc;
      let estado =
        tarea.completadoEn !== null ? "Completada".green : "Pendiente".red;

      console.log(`${num}. ${name} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let num = 1;

    this.listadoArr.forEach((tarea) => {
      let name = tarea.desc;
      const { completadoEn } = tarea;
      let estado =
        tarea.completadoEn !== null ? "Completada".green : "Pendiente".red;

      if (completadas) {
        //Se muestran las tareas completadas
        if (estado == "Completada".green) {
          console.log(
            `${num.toString().green}. ${name} :: Completado en: ${
              completadoEn.green
            }`
          );
          num++;
        }
      }

      if (!completadas) {
        //Se muestran las tareas pendientes
        if (estado == "Pendiente".red) {
          console.log(`${num.toString().green}. ${name} :: ${estado}`);
          num++;
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        const task = this._listado[tarea.id];
        task.completadoEn = null;
      }
    });
  }
}

export default Tareas;
