export const VisibilityControl = ({ isChecked, setShowCompleted, cleanTasks }) => {
  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete it?")) { // es una ventana emergente para que confirme si realmente quiere borrar las tareas HECHAS, si confirma ejecuta la funcion cleanTasks
      cleanTasks();
    }
  };

  return (
    <div className="d-flex justify-content-between bg-secondary text-white text-center p-2 border-secondary">
      <div className="form-check form-switch"> {/* La clase switch es un checkbox pero más "bonito" visiblemente */}
        <input
          className="form-check-input"
          type="checkbox"
          checked={isChecked} //Evalua el estado de showCompleted que viene desde App.jsx para saber si muestra o no la lista de tareas HECHAS
          onChange={(e) => setShowCompleted(e.target.checked)} // escucha el click para cambiar el showCompleted, que este a su vez cambiara el isChecked (linea anterior); si está marcado es true si no es false
        />{" "}
        <label>Show Tasks Done</label>
      </div>
      <button onClick={handleDelete} className="btn btn-danger btn-sm"> {/* Cada que se da click ejecuta la funct hadleDelete, lo cual elimina las tareas ya HECHAS */}
        Clear
      </button>
    </div>
  );
};
