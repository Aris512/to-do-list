import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
    public async index () {
        return Todo.all()
      }
    
      public async store ({ request }: HttpContext) {
        const data = request.only(['title'])
        return Todo.create(data)
      }
    
      public async update ({ params, request }: HttpContext) {
        const todo = await Todo.findOrFail(params.id)
        todo.merge(request.only(['title', 'completed']))
        await todo.save()
        return todo
      }
    
      public async destroy ({ params }: HttpContext) {
        const todo = await Todo.findOrFail(params.id)
        await todo.delete()
        return { message: 'Deleted successfully' }
      }
}