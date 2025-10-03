import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
    public async index ({ inertia }: HttpContext) {
        const todos = await Todo.all()
        return inertia.render('todos', { todos })
      }
    
      public async store ({ request, response }: HttpContext) {
        const data = request.only(['title'])
        await Todo.create(data)
        return response.redirect().back()
      }
    
      public async update ({ params, request, response }: HttpContext) {
        const todo = await Todo.findOrFail(params.id)
        const data = request.only(['title', 'completed'])
        
        // Mapear 'completed' del frontend a 'is_completed' del modelo
        const updateData: any = { title: data.title }
        if (data.completed !== undefined) {
          updateData.is_completed = data.completed
        }
        
        todo.merge(updateData)
        await todo.save()
        return response.redirect().back()
      }
    
      public async destroy ({ params, response }: HttpContext) {
        const todo = await Todo.findOrFail(params.id)
        await todo.delete()
        return response.redirect().back()
      }
}