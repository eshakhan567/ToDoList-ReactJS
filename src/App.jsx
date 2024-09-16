import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


import Navbar from './assets/components/Navbar'
function App() {
  const [todo, setTodo] = useState("");
  const [todos , setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

useEffect(() => {
let todoString = localStorage.getItem("todos")
if(todoString){
  let todos=JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
}

  
}, [])

const saveToLS = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

  
  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const toggleFinished=(e)=>{

    setShowFinished(!showFinished)
  }
  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newToDos = todos.filter(item=>{
        return item.id!==id;
      });
      
      setTodos(newToDos)
      saveToLS()
    }
  
  const handleDelete=(e, id)=>{
       
    let newToDos = todos.filter(item=>{
      return item.id!==id;
    });
    
    setTodos(newToDos)
    
    saveToLS()
  }
  const handleChange=(e)=>{

    setTodo(e.target.value)

  }
  const handleCheckbox=(e)=>{

    let id = e.target.name;
    
    let index = todos.findIndex(item=>{
     
      return item.id === id;
      
      
    })
    
    let newToDos = [...todos];
    newToDos[index].isCompleted = !newToDos[index].isCompleted;
    setTodos(newToDos)
    // todos.filter(id.isCompleted);
    saveToLS()
  }
  return (
   <>
   <Navbar/>

  <div className="mx-3 md:container md:mx-auto rounded-xl my-4 bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
  <h1 className='font-bold text-center text-3xl'>iTask - Add ToDos of Your Day !</h1>
<div className="addTodo my-5">
  <h2 className='text-xl font-bold my-[10px]'>Add ToDos</h2>
  <input onChange={handleChange} value={todo} type="text" className='w-[84%] rounded-md p-1'/>
  <button onClick={handleAdd} disabled={todo.length<1} className='bg-violet-800 text-white  disabled:bg-violet-700 rounded-md m-2 p-2 py-1 mx-6 hover:bg-violet-950 cursor-pointer font-bold'>Add</button>
</div>
<input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
<div className='bg-black h-[2px] opacity-[0.3] my-[10px]'><hr /></div>
    <h2 className='text-xl font-bold'>Your ToDos</h2>
   
    <div className="todos">
      {todos.length===0 && <div className='m-5 text-violet-900 font-semibold'>No ToDos To Display</div>}
    {todos.map(item=>{

     return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full">
    <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
      <div className={item.isCompleted?"line-through" : ""}>{item.todo}</div>
      <div className="buttons flex h-full">
      <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 text-white rounded-md m-1 p-2 py-1 mx-2 hover:bg-violet-950 cursor-pointer font-bold'><FaEdit /></button>
      <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 text-white rounded-md m-1 p-2 py-1 mx-2 hover:bg-violet-950 cursor-pointer font-bold'><MdDeleteSweep /></button>
      </div>
    </div>
     })}
    
  </div>
  
  </div>
  

    </>
  )
}

export default App
