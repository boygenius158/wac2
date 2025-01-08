import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function useLocalStorageTodos() {
  // Initialize todos from localStorage or use an empty array if not present
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  // Effect to update localStorage when todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Function to add a new todo
  const addTodo = (todo) => {
    const newTodo = {
      _id: uuidv4(),
      text:todo.taskInput,
    }
    
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }



  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id))
  }

  return { todos, addTodo, deleteTodo }
}
