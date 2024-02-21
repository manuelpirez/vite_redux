//
import { useDispatch, useSelector } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync
} from '../features/state/counterSlice'

// react cannot directly talk to redux
// we need to use hooks from react redux
// to have the functionality to connect
// a react component to our redux store
// that's why we need useSelector and useDispatch
const Counter = () => {
  // with use selector we are able to access the global state
  // we assign count the global value of counter
  const count = useSelector(state => state.counter.value)
  const isLoading = useSelector(state => state.counter.isLoading)
  const incrementedBy = useSelector(state => state.counter.incrementedby)
  const dispatch = useDispatch()
  console.log(incrementedBy)

  return (
    <>
      <h2>{count}</h2>
      <div>
        <button disabled={isLoading} onClick={() => dispatch(increment())}>
          increment 1
        </button>
        <br />
        <button disabled={isLoading} onClick={() => dispatch(decrement())}>
          decrement 1
        </button>
        <br />
        <button
          disabled={isLoading}
          onClick={() => dispatch(incrementByAmount(10))}
        >
          increment by 10
        </button>
        <br />
        <button
          disabled={isLoading}
          onClick={() => dispatch(incrementAsync({ message: 'query_inutil' }))}
        >
          increment async, incremented By:{incrementedBy}
        </button>
      </div>
    </>
  )
}

export default Counter
