import { useDispatch, useSelector } from 'react-redux'
import {
  removeTodo,
  addTodo,
  removeTodoByID
} from '../features/state/todoSlice'
const TodoList = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todo.list)

  return (
    <>
      <div>
        {todoList?.map(item => (
          <button
            key={item.id + '-remove'}
            onClick={() => dispatch(removeTodoByID(item.id))}
          >
            {item.message}
            {item.id} -- click to remove
          </button>
        ))}
      </div>
      <button
        onClick={() => dispatch(addTodo({ message: 'coso #', id: Date.now() }))}
      >
        Add item
      </button>

      <button onClick={() => dispatch(removeTodo())}>Remove item</button>
    </>
  )
}
export default TodoList
