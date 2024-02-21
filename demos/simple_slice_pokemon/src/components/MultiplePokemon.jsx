//RTK Query ensures that any component that subscribes to the same query will always use the same data.
//RTK Query automatically de-dupes requests so you don't have to worry about checking in-flight requests and performance optimizations on your end.
//Let's evaluate the sandbox below - make sure to check the Network panel in your browser's dev tools.
//You will see 3 requests, even though there are 4 subscribed components - bulbasaur only makes one request, and the loading state is synchronized between the two components.
//For fun, try changing the value of the dropdown from Off to 1s to see this behavior continue when a query is re-ran.

import { useGetPokemonByNameQuery } from '../services/pokemon'
import { useState } from 'react'

const pokemon = ['bulbasaur', 'pikachu', 'ditto', 'bulbasaur']

export default function MultiplePokemon() {
  const [pollingInterval, setPollingInterval] = useState(0)

  return (
    <div className="App">
      <select
        onChange={change => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div>
        {pokemon.map((poke, index) => (
          <Pokemon key={index} name={poke} pollingInterval={pollingInterval} />
        ))}
      </div>
    </div>
  )
}

const Pokemon = ({ name, pollingInterval }) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name,
    { pollingInterval }
  )

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? '...' : ''}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </>
  )
}
