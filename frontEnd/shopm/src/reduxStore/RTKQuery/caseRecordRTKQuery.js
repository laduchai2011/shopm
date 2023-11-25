import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const caseRecordRTKQuery = createApi({
    reducerPath: 'caseRecordRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
    getPokemonByName: builder.query({
        query: (name) => `pokemon/${name}`,
    }),
    }),
})

export const { useGetPokemonByNameQuery } = pokemonApi;