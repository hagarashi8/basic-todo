import { MouseEventHandler, useEffect, useState } from 'react'
import Checkbox from '../assets/checkbox'
import Add from '../assets/add-new'
import Remove from '../assets/remove'
import Info from '../assets/info'
import './index.css'
//<a href="https://iconscout.com/icons/add-new" target="_blank">Add New Icon</a> by <a href="https://iconscout.com/contributors/unicons" target="_blank">Unicons Font</a>
//<a href="https://iconscout.com/icons/checkbox" target="_blank">Checkbox Icon</a> on <a href="https://iconscout.com">IconScout</a>
//<a href="https://iconscout.com/icons/remove" target="_blank">Remove Icon</a> by <a href="https://iconscout.com/contributors/unicons" target="_blank">Unicons Font</a>
function App() {
  useEffect(()=>{
    let todosFromStorage = JSON.parse(window.localStorage.getItem("todos")||"[]")
    setTodos(todosFromStorage)
    setLoaded(true)
  },[])
  const [loaded, setLoaded] = useState(false)
  const [todos, setTodos] = useState<{name: string, done: boolean}[]>([])
  useEffect(()=>{
    if(!loaded) return;
    updateStorage()
  },[todos])
  const showInfo = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.preventDefault()
    e.stopPropagation()
    setInfoHidden(false)
    setTimeout(()=>setInfoHidden(true), 5000)
  }
  const updateStorage = ()=>window.localStorage.setItem("todos", JSON.stringify(todos))
  const addTodo = (todo: any) => () => {
    if(!todo.name||todos.filter((x)=>x.name==todo.name).length > 0) return;
    setTodos((todos)=>[...todos, todo])
  }
  const removeTodo = (todo: any) => () => {setTodos((todos) => todos.filter((el) => el.name != todo.name))}
  const checkTodo = (todo: any) => () => {setTodos((todos) => todos.map((t) => t.name == todo.name ? { ...t, done: !t.done } : t))}
  const [isInfoHidden, setInfoHidden] = useState(true)
  return (
    <>
      <div className='flex flex-col h-screen items-center justify-center bg-slate-900 overflow-hidden' onClick={()=>{isInfoHidden ? {} : setInfoHidden(true)}}>
        <span className='inline-flex text-white'>
        </span>
        <div className="App w-5/6 bg-slate-900 grow flex flex-col items-center justify-start">
          <div className='overflow-y-scroll overflow-x-hidden w-full'>
            {todos.map((todo, i) => <Todo key={i} todo={todo} checker={checkTodo(todo)} remover={removeTodo(todo)} />)}
          </div>
          <div className='flex flex-row justify-center items-center w-full h-[clamp(4rem,8vmax,8rem)] md:h-[clamp(2rem,8vmin,8rem)] mt-auto mb-4'>
            <button className='h-[calc(100%-1vmin)] aspect-square fill-white' onClick={showInfo}>
              <Info></Info>
            </button>
            <TodoAdder adder={addTodo}></TodoAdder>
          </div>
        </div>
      </div>
      {isInfoHidden ? "" : <div className='bottom-0 left-0 md:bottom-10 md:left-10 absolute'><Credits /></div>}
    </>
  )
}
type TodoProps = { todo: { name: string, done: boolean }, checker: () => void, remover: () => void }

const Todo = ({ todo, checker, remover }: TodoProps) => {
  return <article className='text-white flex flex-row p-4 m-4 border-white border-2 rounded-lg items-center hover:border-sky-500'>
    <button className='h-[inherit] w-8' onClick={checker}>
      <Checkbox checked={todo.done} />
    </button>
    <h2 className='ml-4'>{todo.name}</h2>
    <button className='ml-auto h-[inherit] aspect-square w-8 hover:fill-rose-500 fill-white' onClick={remover}>
      <Remove />
    </button>
  </article>
}

const TodoAdder = ({ adder }: any) => {
  const [name, updateName] = useState("")
  const update = (e: any) => {
    updateName(e.target.value)
  }
  const add = adder({ name, done: false })
  return <>
    <input onInput={update} type="text" className='grow text-[clamp(1rem,2vmin, 2rem)] px-1 py-2 md:py-4 rounded-lg outline-none border-black border-1 focus:border-2 focus:border-sky-500' />
    <button onClick={add} className="h-[calc(100%-1vmin)]">
      <Add />
    </button>
  </>
}

const Credits = () => {
  return <section className='flex flex-col text-black backdrop-blur-md md:w-96 w-screen h-max p-2 bg-white bg-opacity-50 rounded-md'>
    <span className='p-4'><a href="https://iconscout.com/icons/add-new" className='m-1' target="_blank">Add New Icon </a> by <a href="https://iconscout.com/contributors/unicons" target="_blank" className='ml-1'>Unicons Font</a></span>
    <span className='p-4'><a href="https://iconscout.com/icons/checkbox" className=' m-1' target="_blank">Checkbox Icon</a> on <a href="https://iconscout.com" className='ml-1'>IconScout</a></span>
    <span className='p-4'><a href="https://iconscout.com/icons/remove" className='m-1' target="_blank">Remove Icon</a> by <a href="https://iconscout.com/contributors/unicons" className='mx-1' target="_blank">Unicons Font</a></span>
    <span className='p-4'><a href="https://iconscout.com/icons/info" className='m-1' target="_blank">Info Icon</a> on <a href="https://iconscout.com">IconScout</a></span>
  </section>
}

export default App
