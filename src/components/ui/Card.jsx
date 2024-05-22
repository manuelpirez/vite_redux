import { useState } from 'react'

/**
 * Renders a Generic Card
 *
 * @returns {JSX.Element}
 */
const Card = () => {
  const [count, setCount] = useState(0)
  return (
    <div style={{ border: 'solid 2px', maxWidth: '500px' }}>
      <h1>Título card</h1>
      Count: <span role="count-indicator">{count}</span>
      <button
        onClick={() => {
          setCount(count => count + 1)
        }}
      >
        Increment
      </button>
    </div>
  )
}
export default Card
