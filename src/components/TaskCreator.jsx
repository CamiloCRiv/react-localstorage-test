import { useState } from "react";

export const TaskCreator = ({ createNewTask }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const handleSubmit = (e) => { //trae el evento "e"
    e.preventDefault();
    createNewTask(newTaskName);
    setNewTaskName(""); // Para limpiar de nuevo el input luego de que se envia el dato
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 row"> {/* handleSubmit se ejecuta cada que el onSubmit escucha que algo fue enviado */}
      <div className="col-9">
        <input
          type="text"
          placeholder="Enter a new task"
          onChange={(e) => setNewTaskName(e.target.value)}// me ingresa el valor que hay en el input en setNewTaskName
          value={newTaskName} // se guarda lo que hay en newTaskName, basicamente es para que vuelva a quedar vacio ya que en la linea 9 se esta volviendo a dejar vacio
          className='form-control'
        />
      </div>
      <div className="col-3">
        <button className="btn btn-primary btn-sm"> Save task</button>
      </div>
    </form>
  );
};
