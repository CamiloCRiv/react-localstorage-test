import { useState, useEffect } from "react";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator.jsx";
import { TaskTable } from "./components/TaskTable.jsx";
import { VisibilityControl } from "./components/VisibilityControl.jsx";
import { Container } from "./components/Container.jsx";

function App() {
  const [taskItems, setTaskItems] = useState([]); // es mi lista de tareas, inicialmente inicia vacia, pero luego se va llenando
  const [showCompleted, setShowCompleted] = useState(false); // actuliza el estado del checkbox de si se quiere ver las tareas hechas o si no se quiere ver. Inicialmente esta en false ya que no las quiero ver

  //funcion para crear ingresar un nuevo dato en mi lista, la cual sera enviada al componente TaskCreator
  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) { //validara si el parametro (en este caso el nombre de dicha tarea) no existe para agregarlo a setTaskItems
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  }

  //Funcion para actualizar el checkbox que indicara si la tarea ya fue realizada
  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t)) // Me mapeara la lista, si el nombre coincide en su propiedad done la cambiara, si es false pasara a true si es true la pasara a false; en caso de que el nombre no sea el mismo, simplemente dejame ese dato tal cual esta y guardamelo en setTaskItems para actualizar la lista. NOTA: Esto se hace de esta manera ya que siempre se retorna un nuevo arreglo que a su vez se guardara nuevamente en el arreglo original ya con los nuevos datos
    );  
  };

  //useEffect cuando cargue la aplicacion inicialmente se va a ejecutar este codigo
  useEffect(() => { //  
    //Este primer useEffect valida si hay algun dato en el localStorage, si lo hay me lo guarda en mi arreglo de datos, si no lo hay no me trae nada; cada que se guarda un nuevo dato con createNewTask se me va a actualizar mi arreglo por lo cual se ejecutara mi segundo useEffect y este convertira todo el arreglo modificado a string para que el localStorage pueda leerlo. El primer UseEffect se ejecutara sea si se inicia sin datos o cada mez que se modifique y este a su vez cuando es modificado hara que el segundo useEffect se ejecute para que el localStorage lo pueda mostrar

    let data = localStorage.getItem("tasks"); //leeme si hay una variable en el local storage llamada tasks y guardamela en data si es que esta existe
    if (data) {
      setTaskItems(JSON.parse(data)); // si data existe conviertela a datos javascript y agreagamela a setTaskItems
    }
  }, []); // si no le ecolocamos algo al segundo parametro (el arreglo) "}, [algo]" este useEffect se ejecutara apenas la aplicacion cargue

  // funcion para eliminar las tareas ya hechas
  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done)); // Creamos un nuevo arreglo que contendra las tareas que su tarea no está HECHA -> ("!task.done" ya que dice que me filtre las tareas donde su propiedad done no exista ( es como decir done = false)), este nuevo arreglo me actualizara el setTaskItems
    setShowCompleted(false); // Me pondra de nuevo el setShowCompleted en false, para que no se desplieguen las tareas HECHAS ya que de por sí no existen ya que se acabaron de eliminar en la linea anterior
  };

  // En este useEffect se ingresa el nuevo dato al localStorage
  useEffect(() => {
    
    localStorage.setItem("tasks", JSON.stringify(taskItems)); //con JSONStringyfi se conviete el arreglo a string ya que el localStorage no lee arreglos ni objetos
  }, [taskItems]); // si taskItems cambia quiero que me ejecute la funcion de este useEffeect

  return (
    <main className="bg-dark vh-100 text-white">
      <Container> {/* Utiliza eel componente Container.jsx*/}
        <TaskCreator createNewTask={createNewTask} /> {/* Me ingresara cada nueva tarea */}
        <TaskTable tasks={taskItems} toggleTask={toggleTask} /> {/* Me mostrara las tareas que hay, solo las que no están hechas, ya que al no enviarle props showCompleted lo declarara como false */}

        {/* Componente para poder escojer si quiero ver las tareas hechas o si no, y tambien para eliminarlas si es el caso ya que si están hechas ya no tiene sentido seguirlas almacenando */}
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {/* Si el ShowCompleted esta en true muestra las tareas HECHAS en caso contrario no (false) */}
        {showCompleted === true && ( // "true &&" es lo mismo que poner un condicional ternario, pero nos ahorra un pequeño pedazo de código
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted} // envia el showCompleted pero ahora en true
          />
        )}
      </Container>
    </main>
  );
}

export default App;
