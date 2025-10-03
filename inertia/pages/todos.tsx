import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'

interface Todo{
    id: number
    title: string
    isCompleted: boolean
    createdAt: string
    updatedAt: string
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
        completed: !todo.isCompleted 
      })
    }
  
    const handleDelete = (id: number) => {
      if (confirm('¿Estás seguro de eliminar esta tarea?')) {
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

          {/* Tareas Pendientes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Tareas Pendientes
              <span className="text-sm font-normal text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                {todos.filter(todo => !todo.isCompleted).length}
              </span>
            </h2>
            <div className="space-y-3">
              {todos.filter(todo => !todo.isCompleted).length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-gray-600">¡Todas las tareas están completadas!</p>
                </div>
              ) : (
                todos.filter(todo => !todo.isCompleted).map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggle(todo)}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-green-400 flex items-center justify-center transition-colors"
                    >
                    </button>

                    {/* Título del todo */}
                    <span className="flex-1 text-gray-900">
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
          </div>

          {/* Tareas Completadas */}
          {todos.filter(todo => todo.isCompleted).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Tareas Completadas
                <span className="text-sm font-normal text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                  {todos.filter(todo => todo.isCompleted).length}
                </span>
              </h2>
              <div className="space-y-3">
                {todos.filter(todo => todo.isCompleted).map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200 opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggle(todo)}
                      className="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center transition-colors hover:bg-green-600"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Título del todo */}
                    <span className="flex-1 text-gray-600 line-through">
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
                ))}
              </div>
            </div>
          )}

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