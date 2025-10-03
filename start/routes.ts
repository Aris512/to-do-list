/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TodosController from '#controllers/todos'

// Página de inicio
router.on('/').renderInertia('home')

// Rutas de todos
router.get('/todos', [TodosController, 'index'])
router.post('/todos', [TodosController, 'store'])
router.put('/todos/:id', [TodosController, 'update'])
router.delete('/todos/:id', [TodosController, 'destroy'])

