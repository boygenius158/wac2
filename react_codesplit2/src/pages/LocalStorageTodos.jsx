import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import useLocalStorageTodos from '../hooks/useLocalStorageTodos'

export default function LocalStorageTodos() {
  const{todos,addTodo,deleteTodo} = useLocalStorageTodos()
 
  return (
    <div>
      <TodoForm onSubmit={addTodo} existingTask={todos}/>
      <TodoList onRemove={deleteTodo} list={todos}/>
    </div>
  )
}
