import { useGetPokemonByNameQuery } from '../services/pokemon'
/**
 * Finally, import the auto-generated React hooks from the API slice into your component file,
 * and call the hooks in your component with any needed parameters. RTK Query will automatically
 * fetch data on mount, re-fetch when parameters change, provide {data, isFetching} values in
 * the result, and re-render the component as those values change:
 */
export default function SinglePokemon() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  // render UI based on data and loading state

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}
