import { useState, useEffect } from 'react'
import '../styles/main.css'
import { motion } from "framer-motion";

export default function App() {
  const [items, setItems] = useState("");
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // Load todos from local storage when the app loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(storedTodos); // Debugging
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    console.log("Saving todos:", todos); // Debugging
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();
    if (items.trim() === "") return;
    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: items, completed: false },
    ]);
    setItems("");
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.id !== id)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="new-item" className="block text-lg font-semibold mb-2">
            Add New Item
          </label>
          <div className="flex">
            <input
              type="text"
              id="new-item"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="Add new item"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Add
            </button>
          </div>
        </form>


        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">To-Do List</h1>
        <ul className="space-y-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="p-2 border border-gray-300 rounded-md"
          />

          {todos.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase())).map(todo => (
            
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`flex items-center justify-between p-2 border rounded-md ${todo.completed ? "bg-green-100" : "bg-gray-100 transition duration-200"
                }`}
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  className="mr-2"
                />
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => {
                      setTodos((currentTodos) =>
                        currentTodos.map((t) =>
                          t.id === editingId ? { ...t, title: editingText } : t
                        )
                      );
                      setEditingId(null);
                    }}
                    className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
                    {todo.title}
                  </span>
                )}
              </label>
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditingText(todo.title);
                }}
                className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </motion.li>
          ))}
          
        </ul>

        <button
          onClick={() => setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed))}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Clear Completed
        </button>



      </div>
    </div>
  );
}
