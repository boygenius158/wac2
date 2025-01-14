import React from 'react'
import useDatabaseTodos from '../hooks/useDatabaseTodos'
import TodoForm from '../components/Todo/TodoForm'
import TodoList from '../components/Todo/TodoList'

export default function DatabaseTodos() {
    const { addTodo, removeTodo , todos , loading} = useDatabaseTodos()
    return (
        <div>
           <TodoForm {...{ onSubmit: addTodo, loading , existingTask:todos }} />
           <TodoList {...{ onRemove: removeTodo, list: todos ,loading }} />
        </div>
    )
}
