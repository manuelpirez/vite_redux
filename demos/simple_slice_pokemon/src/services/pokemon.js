import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * For typical usage with React, start by importing createApi and defining an
 * "API slice" that lists the server's base URL and which endpoints we want to interact with
 */
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: [],
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
