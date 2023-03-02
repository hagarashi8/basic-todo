import { useEffect, useState } from 'react'
import Checkbox from '../assets/checkbox'
import Add from '../assets/add-new'
import Remove from '../assets/remove'
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
  const updateStorage = ()=>window.localStorage.setItem("todos", JSON.stringify(todos))
  useEffect(()=>{
    if(!loaded) return;
    updateStorage
  },[todos])
  const addTodo = (todo: any) => () => {setTodos((todos)=>[...todos, todo])}
  const removeTodo = (todo: any) => () => {setTodos((todos) => todos.filter((el) => el.name != todo.name))}
  const checkTodo = (todo: any) => () => {setTodos((todos) => todos.map((t) => t.name == todo.name ? { ...t, done: !t.done } : t))}
  return (
    <div className='flex flex-col h-screen items-center justify-center bg-slate-900'>
      <span className='inline-flex text-white'>
        <a href="https://iconscout.com/icons/add-new" className='mr-1' target="_blank">Add New Icon </a> by <a href="https://iconscout.com/contributors/unicons" target="_blank" className='ml-1'>Unicons Font</a>
        <a href="https://iconscout.com/icons/checkbox" className='mx-1' target="_blank">Checkbox Icon</a> on <a href="https://iconscout.com" className='ml-1'>IconScout</a>
        <a href="https://iconscout.com/icons/remove" className='mx-1' target="_blank">Remove Icon</a> by <a href="https://iconscout.com/contributors/unicons" className='mx-1' target="_blank">Unicons Font</a>
      </span>
      <div className="App w-5/6 bg-slate-900 grow flex flex-col items-center justify-start">
        <div className='overflow-y-scroll overflow-x-hidden w-full'>
          {todos.map((todo,i) => <Todo key={i} todo={todo} checker={checkTodo(todo)} remover={removeTodo(todo)} />)}
        </div>
        <TodoAdder adder={addTodo}></TodoAdder>
      </div>
    </div>
  )
}
type TodoProps = { todo: { name: string, done: boolean }, checker: () => void, remover: () => void }

const Todo = ({ todo, checker, remover }: TodoProps) => {
  return <article className='text-white flex flex-row p-4 m-4 border-white border-2 w-full rounded-lg'>
    <button onClick={checker}>
      <Checkbox checked={todo.done} />
    </button>
    <h2 className='ml-4'>{todo.name}</h2>
    <button className='ml-auto' onClick={remover}>
      <Remove />
    </button>
  </article>
}

const TodoAdder = ({adder}:any)=>{
  const [name, updateName] = useState("")
  const update = (e:any)=>{
    updateName(e.target.value)
  }
  const add = adder({name, done:false})
  return <div className='flex flex-row justify-center items-center w-11/12 h-[8vmin] mt-auto mb-4'>
    <input onInput={update} type="text" className='grow h-[6vmin]' />
    <button onClick={add}>
      <Add/>
    </button>
  </div>
}

export default App
