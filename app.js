import("colors");
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";
// const { mostrarMenu, pausa } = require("./helpers/mensajes");
// Esta de arriba sería la forma de importar si en el package.json no tuvieramos la linea:
//"type": "module",

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    //Obtener tareas del documento guardado en db
    tareas.cargarTareasFromArray(tareasDB);
    console.log(tareas._listado);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        //Crear tarea
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2":
        //Listar tareas
        tareas.listadoCompleto();
        break;
      case "3":
        //Listar tareas
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        //Listar tareas
        tareas.listarPendientesCompletadas(false);
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
