/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')

router.get('/todos', 'todos.index')
router.post('/todos', 'todos.store')
router.put('/todos/:id', 'todos.update')
router.delete('/todos/:id', 'todos.destroy')

