import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }   
  }, [])
  
  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }
 
 const handleEdit = (e,id)=>{
  let t = todos.filter(i=>i.id === id)
  settodo(t[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id!==id
  })
  settodos(newTodos)
  saveToLS(newTodos)
 }

 const handleDelete = (e,id)=>{
  
  let newTodos = todos.filter(item=>{
    return item.id!==id
  })
  settodos(newTodos)
  saveToLS(newTodos)
 }

 const handleAdd = ()=>{
  if (todo.trim().length === 0) return;
  
  let newTodos = [...todos, {id:uuidv4(), todo, isCompleted: false}]
  settodos(newTodos)
  saveToLS(newTodos)
  settodo("")
 }

 const handleChange = (e)=>{
  settodo(e.target.value)
 }

 const handleCheckbox = (e) =>{
  let id = e.target.name
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  settodos(newTodos)
  saveToLS(newTodos)
 }
 

  return (
    <>
    <Navbar/>
    <div className='container mx-auto p-2 pt-10  sm:my-5 rounded-xl w-full sm:w-[60%] bg-[#E0EEC6] min-h-screen sm:min-h-[80vh]'>
      
    <h2 className='text-sm font-bold text-center text-[#680c42ca]'>Todoify - Manage your todos at one place </h2>

    <div className="mt-2 addtodo flex flex-col sm:flex-row mx-auto w-[90%] justify-between gap-3">
      <input onKeyDown={(e)=>{if(e.key==="Enter"){handleAdd()}}} onChange={handleChange} value={todo} className="border pl-2 border-[#243E36] w-full bg-white"  type="text" placeholder='Write your todo'/>
      <button onClick={handleAdd} className="bg-[#243E36] text-white px-4 py-2 rounded-lg hover:bg-[#1a2f29] transition cursor-pointer">Save</button>
    </div>

    <input className='my-4 ml-5 sm:ml-12' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show finished

    <h2 className='text-lg font-bold text-center text-[#680c42ca]'>Your Todos</h2>

    <div className="todos w-[90%] mx-auto mt-5">
      {todos.length === 0 && <div className='text-center'>No Todos to display</div>}

      {todos.map(item=>{

        return (showFinished || !item.isCompleted) && (
 
        <div key={item.id} className="todo flex items-center justify-between gap-2 mb-2">
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
          <div className={`flex-1 ${item.isCompleted?"line-through":""}`}>{item.todo}</div>
          <div className="buttons flex gap-1">
            <button onClick={(e)=>{handleEdit(e, item.id)}} className="w-10 h-10 bg-[#243E36] text-white flex items-center justify-center rounded-full hover:bg-[#1a2f29] transition cursor-pointer"><MdEditNote /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className="w-10 h-10 bg-[#243E36] text-white flex items-center justify-center rounded-full hover:bg-[#1a2f29] transition cursor-pointer"><MdDelete /></button>
          </div>
        </div>
        
      )
      })}
    </div>

    </div>
      
    </>
  )
}

export default App
