//Me pintara cada fila de datos que vienen de TaskTable

export function TaskRow({ task, toggleTask }) {
    return (
      <tr>
        <td className="d-flex justify-content-between">
        {task.name}
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTask(task)} // Cuando se clickea el checkbox en la pagina web, este cambiara su valor y por ende esta tarea(TaskRow) cambiara a true o false, por lo cual se mostrara ya en el TaskTable contrario, el que muestra las hechas o las sin realizar
        />
        </td>
      </tr>
    );
  } 
