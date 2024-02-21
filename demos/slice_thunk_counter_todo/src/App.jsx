import { useState } from 'react'
import Counter from './components/Counter'
import TodoList from './components/TodoList'
import TodoListRtk from './components/TodoListRtk'

const App = () => {
  const projects = ['counter', 'article', 'articlertk']
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const handleClick = () => {
    const nextIndex =
      currentProjectIndex >= projects.length - 1 ? 0 : currentProjectIndex + 1
    console.log(nextIndex)
    setCurrentProjectIndex(nextIndex)
  }

  const getCurrentProjectComponent = () => {
    switch (projects[currentProjectIndex]) {
      case 'counter':
        return (
          <>
            <h2>Counter App</h2>
            <Counter />
          </>
        )
      case 'article':
        return (
          <>
            <h2>Todo List</h2>
            <TodoList />
          </>
        )
      case 'articlertk':
        return (
          <>
            <h2>Todo List RTK</h2>
            <TodoListRtk />
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <button onClick={() => handleClick()}>Toggle project</button>
      <hr />
      <br />
      {getCurrentProjectComponent()}
    </>
  )
}

export default App
