import React from 'react'
import TodoForm from '../components/Todo/TodoForm'
import TodoList from '../components/Todo/TodoList'
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
