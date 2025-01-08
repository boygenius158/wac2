import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API_ENDPOINTS from '../api/endpoints'
import axiosInstance from '../api/axiosInstance'

export default function useDatabaseTodos() {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        setLoading(true)
        try {
            const { data } = await axiosInstance.get(API_ENDPOINTS.FETCH_DATA)
            setTodos(data)
        } catch (error) {
            console.error("Error fetching todos:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addTodo = async (todo) => {
        setLoading(true)
        try {
            const { data } = await axiosInstance.post(API_ENDPOINTS.SUBMIT_DATA, {
                text: todo
            })
            setTodos((prev) => [...prev, data.receivedData.newTodo])
        } catch (error) {
            console.error("Error adding todo:", error)
        } finally {
            setLoading(false)
        }
    }

    const removeTodo = async (id) => {
        setLoading(true)
        try {
            setTodos((prev) => prev.filter((ele) => ele._id !== id))
            await axiosInstance.post(API_ENDPOINTS.REMOVE_DATA, { id })
        } catch (error) {
            console.error("Error removing todo:", error)
        } finally {
            setLoading(false)
        }
    }

    return {
        addTodo,
        removeTodo,
        todos,
        loading
    }
}
