import { ADD_TODO } from '../actions/Types'

// const addTodo = text => ({
//   type: ADD_TODO,
//   payload: { text },
// })

const loadPages = () => ({
  type: 'RECEIVE_PAGES',
  pages: [
    {
      id: 1,
      title: 'test page#1',
      content: 'TEST PAGE CONTENT',
    }, {
      id: 2,
      title: 'test page#2',
      content: 'TEST PAGE CONTENT',
    },
  ],
})

export { loadPages }
