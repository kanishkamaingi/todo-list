import { useState } from 'react'
import './styles.css'
export default function App() {
  const [items, setItems] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    setTodos(currentTodos => {
      return [...currentTodos, { id: crypto.randomUUID(), title: items, completed: false }]
    })
    setItems("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })

    function deleteTodo(id) {
      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
      })
    }
  }

  return (

    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <label htmlFor="new-item">Add new item</label>
        <input type='text' value={items} onChange={element => {
          setItems(element.target.value)
        }} placeholder='Add new item' id='new-item' />
        <button type='submit' className='btn'>Add</button>
      </form>

      <h1>To-Do List</h1>

      <ul className='list'>
        {todos.map(todo => {
          return (
            <li key={todo.id} >
              <label>
                <input type='checkbox' checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)} /> {todo.title}
              </label>
              <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          )
        }
        )}
      </ul>
    </>
  )
}