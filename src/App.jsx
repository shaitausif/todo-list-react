import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'  
import { v4 as uuidv4 } from 'uuid';
import Delete from './components/Delete';


function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [showDeletepopup, setshowDeletepopup] = useState(false)
  const [todoToDelete, settodoToDelete] = useState(null)
  const [editingTodoId, setEditingTodoId] = useState(null); // Track the todo being edited


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    saveToLS()
  }
  

  const handleEdit = (e, id) => {
    if (editingTodoId && editingTodoId !== id) {
      // If there's already an edited todo, don't allow editing a new one without saving
      alert("Please save the current edit before editing another todo.");
      return; // Prevent further execution if another todo is being edited
    }
    
    // Set the current todo as the edited one
    const todoToEdit = todos.find(item => item.id === id);
    
    if (todoToEdit) {
      setTodo(todoToEdit.todo); // Set the text of the todo to the input field
      setEditingTodoId(id); // Mark this todo as being edited
    }
  };
  

  const handleDelete= (e, id)=>{  
    setshowDeletepopup(true)
    settodoToDelete(id)
    saveToLS()
    // }
  }
  const confirmDelete = ()=>{
    let newTodos = todos.filter(item => item.id !== todoToDelete);
    setTodos(newTodos)
    setshowDeletepopup(false)
    settodoToDelete(null)
    saveToLS()
  }
  const cancelDelete = ()=>{
    setshowDeletepopup(false)
    settodoToDelete(null)
    saveToLS()
  }

  const handleAdd = () => {
    const trimmedtodo = todo.trim()

    if(trimmedtodo === ""){
      alert("Todo cannot be empty or just spaces")
      return;
    }

    if (editingTodoId) {
      // If a todo is being edited, update that todo in the list
      const updatedTodos = todos.map(item => 
        item.id === editingTodoId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditingTodoId(null); // Reset editingTodoId after saving
    } else {
      // Otherwise, add a new todo
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
  
    setTodo(""); // Clear the input field after saving
    saveToLS(); // Save to localStorage
  };
  
  const handleKeyDown = (e)=>{
    if(e.key === "Enter"){
      handleAdd();  //call handleadd if the enter key is pressed
    }
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    < >
    <Navbar/> 
      {/* {showDeletepopup &&  <div className='backdrop-blur-3xl'></div>} */}
       <div className={`${showDeletepopup?'blur-lg pointer-events-none':""} transition-all duration-500 mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]`}>
        <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
         <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">

          <input onKeyDown={handleKeyDown} onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 focus:outline-violet-500' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
         <div className="flex items-center">
         <input  className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2 transition-all' htmlFor="show">Show Finished</label>
         </div> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-lg font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5 text-center'>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex items-center my-3 justify-between gap-5"}>
            <div className='flex gap-3'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='transition-all bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div> 
          </div>
          
          })}
         </div>
        
       </div>
       {showDeletepopup && <Delete onConfirm={confirmDelete} onCancel={cancelDelete}/>}
    </>
  )
}

export default App