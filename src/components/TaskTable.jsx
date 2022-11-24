import { TaskRow } from "./TaskRow.jsx";

export function TaskTable({ tasks, toggleTask, showCompleted = false}) {
  const taskTableRows = (doneValue) => { // doneValue me recibe lo que hay en showCompleted (false por defecto o true cuando se le envia este dato)
    return tasks
    .filter(task => task.done === doneValue) //valida si son false y me retorna un nuevo arreglo de todas las falsas, luego hace lo mismo con las true cuando en el componenete que hay en app se le envia el showCompleted
    .map((task) => ( //luego de filtrarlas a este nuevo arreglo me lo mapeara para que TaskRow lo muestre
      <TaskRow key={task.name} task={task} toggleTask={toggleTask} />
    ));
  };

  return (
    <table className="table table-dark table-striped table-bordered border-secondary"> {/* NOTA: La clase striped es para que cada fila de la tabla sea de un color diferente (una negra, luego gris, luego negra luego gris... hasta mostrarlas todas, basicamente es para diferenciarlas mejor) */}
      <thead>
        <tr className="table-primary">
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>{
      taskTableRows(showCompleted) // Es la que me mostrara las tareas sin hacer y las hechas
      }</tbody>
    </table>
  );
}
