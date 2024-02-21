import {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation
} from '../features/api/article/articleSlice'
const TodoListRtk = () => {
  const {
    data,
    isLoading: getArticlesLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery()

  const [addTodo, { isLoading: addArticleLoading }] = useAddTodosMutation()
  const [updateTodo, { isLoading: updateArticleLoading }] =
    useUpdateTodosMutation()
  const [deleteTodo, { isLoading: deleteArticleLoading }] =
    useDeleteTodosMutation()

  const isLoading =
    getArticlesLoading ||
    addArticleLoading ||
    updateArticleLoading ||
    deleteArticleLoading

  if (isSuccess) {
    console.log('all good')
    console.log({ data })
  } else if (isError) {
    console.log('failed ):')
    console.error(error)
  }

  const date = new Date().toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  const clickAdd = async () =>
    await addTodo({ id: Date.now().toString(), title: `Added on: ${date}` })
  const clickUpdate = id => updateTodo({ id, title: `Updated on: ${date}` })
  const clickDelete = id => deleteTodo()

  return (
    <>
      <div>
        <button disabled={isLoading} onClick={() => clickAdd()}>
          Add Todo
        </button>
        <button disabled={isLoading} onClick={() => clickDelete()}>
          Delete
        </button>
        {data?.map(item => (
          <div key={item.id + '-items'} style={{ border: 'solid 1px' }}>
            {item?.id?.slice(0, 3)} {item.title.slice(0, 40)}...
            <br />
            <button disabled={isLoading} onClick={() => clickUpdate(item.id)}>
              Update
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
export default TodoListRtk
