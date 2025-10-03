import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'

interface Todo{
    id: number
    title: string
    is_completed: boolean
    created_at: string
    updated_at: string
}

interface TodosPageProps{
    todos: Todo[]
}

export default function Todos({ todos }: TodosPageProps) {

    const [newTodo, setNewTodo] = useState('')
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTodo.trim()) {
          router.post('/todos', {
            title: newTodo
          }, {
            onSuccess: () => setNewTodo('')
          })
        }
      }
  
    const handleToggle = (todo: Todo) => {
      router.put(`/todos/${todo.id}`, {
        title: todo.title, 
        completed: !todo.is_completed 
      })
    }
  
    const handleDelete = (id: number) => {
      if (confirm('¿Estás seguro de Eliminar esta tarea?')) {
        router.delete(`/todos/${id}`)
      }
    }
    return(
        <>
      <Head title="Lista de Todos" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              To-Do List
            </h1>

          </div>

          {/* Formulario para agregar nuevo todo */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="¿Qué necesitas hacer?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Agregar
              </button>
            </div>
          </form>

          {/* Lista de todos */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No hay tareas aún
                </h3>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 ${
                    todo.is_completed ? 'opacity-75' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(todo)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.is_completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {todo.is_completed && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Título del todo */}
                  <span
                    className={`flex-1 ${
                      todo.is_completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </span>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 group"
                    title="Eliminar tarea"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7ZM9 8H11V17H9V8ZM13 8H15V17H13V8Z"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-800 transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
    )
}