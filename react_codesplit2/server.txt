const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// Use CORS middleware
app.use(cors())

// Use express.json() middleware to parse JSON
app.use(express.json())

// Connect to MongoDB directly (without using .env)
const DB_URI = 'mongodb://127.0.0.1:27017/todoapp' // Replace with your MongoDB URI
mongoose.connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })

// Define a Schema and Model for storing data with a single "text" field
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
})

const Todo = mongoose.model('Todo', todoSchema)

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Express server with CORS, JSON parsing, and MongoDB!')
})
app.get('/data', async (req, res) => {
    try { 
        console.log("/data")

        const todos = await Todo.find() // Fetch all todos from MongoDB
        res.json(todos) // Send the list of todos back as a JSON response
    } catch (error) {
        console.error('Error fetching todos:', error)
        res.status(500).json({ message: 'Error fetching todos', error })
    }
})

// Route to handle form submission and store in DB
app.post('/submit', async (req, res) => {
    const { text } = req.body
    const taskInput = text.taskInput
    // Accessing parsed JSON data 
    console.log(text, "KK")
    // Ensure that text is provided
    if (!text) {
        return res.status(400).json({ message: 'Text is required!' })
    }
    // Create a new Todo document
    const newTodo = new Todo({
        text: taskInput, 
    })
    // try { 
    // Save the todo item to MongoDB
    await newTodo.save()
    res.json({
        message: 'Todo received and stored!',
        receivedData: { newTodo },
    })
    // } catch (error) {
    // res.status(500).json({ message: 'Error saving todo to the database', error });
    // }
})
app.post('/remove', async (req, res) => {
    const{id} = req.body
    console.log("removed",id)
    const todos = await Todo.findByIdAndDelete(id) // Fetch all todos from MongoDB
    // await todos.save()
    res.json({
        todos
    })
})  

// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
