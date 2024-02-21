import { apiSlice } from '../apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  // endpoints for the API to interact
  endpoints: builder => ({
    // endpoint methods
    getTodos: builder.query({
      // get method by default
      query: () => '/list',
      // transform server response
      transformResponse: res =>
        res.results.sort((a, b) => parseInt(a.id) - parseInt(b.id)),
      // this methos provides the data attached to the Todos tag
      providesTags: ['Todos']
    }),
    // builder.mutation alters the query greybox
    updateTodos: builder.mutation({
      query: todo => ({
        url: `/list/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      // all mutations should invalidate cache tags
      invalidatesTags: ['Todos']
    }),
    // optimistic update of add
    addTodos: builder.mutation({
      query: newItem => ({
        url: '/list',
        method: 'POST',
        body: newItem
      }),
      // intercept query update and do cache update before the API responds
      async onQueryStarted(newItem, { dispatch, queryFulfilled }) {
        // updateQueryData requires the endpoint name and cache arguments
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getTodos', undefined, draft => {
            // draft is Immer-wrapped and can be mutated like in createSlice
            // Modify the draft as needed
            draft.unshift(newItem)
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          // if update fails undo optimistic update
          patchResult.undo()
        }
      }
    }),
    // optimistic delete
    deleteTodos: builder.mutation({
      query: () => ({
        url: `/list/1`,
        method: 'DELETE'
      }),
      // eslint-disable-next-line no-empty-pattern
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        //console.log({id})
        // updateQueryData requires the endpoint name and cache arguments
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getTodos', undefined, draft => {
            /**
             * draft is an Immer proxy, directly reassigning it won't work as expected.
             * Instead, you should modify the original draft using Immer's draft function.
             */
            draft.shift()
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          // if update fails undo optimistic update
          patchResult.undo()
        }
      }
    })
  })
})

export const {
  // RTK query creates custom hooks based on the methods we added to the builder
  useGetTodosQuery,
  // builder mutations need to have mutation suffix
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation
} = apiSlice

/*
An endpoint definition that alters data on the server or will possibly invalidate the cache.

@example

// codeblock-meta title="Example of all mutation endpoint options"
const api = createApi({
  baseQuery,
  endpoints: (build) => ({
    updatePost: build.mutation({
      query: ({ id, ...patch }) => ({ url: `post/${id}`, method: 'PATCH', body: patch }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response.data,
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (response) => response.error,
      // `result` is the server response
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
     // trigger side effects or optimistic updates
     onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
     // handle subscriptions etc
     onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
    }),
  }),
});

*/
