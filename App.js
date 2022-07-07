import { useState, useRef } from 'react'
import './App.css'

function App() {
    const [id, setId] = useState()
    const [editTodo, setEditTodo] = useState(false)
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState(() => {
        const jsonStorageTodo = JSON.parse(localStorage.getItem('todos'))
        return jsonStorageTodo ?? []
    })

    const inputFocusRef = useRef()

    // handle json data 
    const handleJsonData = (keydata, data) => {
        const jsonData = JSON.stringify(data)
        localStorage.setItem(keydata, jsonData)
    }

    //handle create todo
    const handleCreateTodo = () => {
        if (todo !== '') {
            setTodos(prevTodo => {
                const newTodos = [...prevTodo, todo]
                handleJsonData('todos', newTodos)
                return newTodos
            })

            setTodo('')
            inputFocusRef.current.focus()
        } else {
            alert('Please enter todo ...')
        }
    }

    // handle edit todo
    const handleEditTodo = (index) => {
        setTodo(todos[index])
        setId(index)
        setEditTodo(true)

        inputFocusRef.current.focus()
    }

    // handle update todo
    const handleUpdateTodo = () => {
        if (todo !== '') {
            const restEditTodo = [...todos]
            restEditTodo[id] = todo
            setTodos(restEditTodo)
            handleJsonData('todos', restEditTodo)

            setEditTodo(false)
            setTodo('')
        } else {
            alert('Please enter edit todo')
        }
    }

    // handle delete a todo
    const handleDeleteTodo = (index) => {
        const restTodos = [...todos]
        restTodos.splice(index, 1)

        handleJsonData('todos', restTodos)

        setTodos(restTodos)
    }

    // handle event press 
    const handleKeyPress = (e) => {
        return editTodo === false
            ? e.charCode === 13 && handleCreateTodo()
            : e.charCode === 13 && handleUpdateTodo()
    }

    return (
        <div className="todo-app">
            <h1>Todo App</h1>

            <div className='todo-form'>
                <div className="todo-input">
                    <input
                        className='input'
                        ref={inputFocusRef}
                        type='text'
                        value={todo}
                        placeholder='Enter todo ...'
                        onChange={e => setTodo(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                </div>
                <div className='todo-btn'>
                    {
                        editTodo ?
                            <button className='btn btn-edit' onClick={handleUpdateTodo} onKeyPress={(e) => handleKeyPress(e)}>
                                <i className='bx bxs-edit-alt'></i>
                            </button>
                            :
                            <button className='btn btn-add' onClick={handleCreateTodo}>
                                <i className='bx bx-plus' ></i>
                            </button>
                    }
                </div>
            </div>

            <div className='todo-list'>
                <ul>
                    {
                        todos.map((item, index) => (
                            <div className='todo-item' key={index}>
                                <li
                                    className='todo-item-list'
                                    onClick={() => handleEditTodo(index)}
                                >
                                    {item}
                                </li>
                                <span 
                                    className='todo-delete'
                                    onClick={() => handleDeleteTodo(index)}
                                >
                                        <i className='bx bx-x'></i>
                                </span>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default App
