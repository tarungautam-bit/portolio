import React from 'react'
import {Provider} from 'react-redux'
import { store } from '../store/store'
import AppInitializer from './AppInitializer'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const AppProviders = ({children}) => {
  
  const queryClient = new QueryClient()
 
  return (

    <QueryClientProvider client={queryClient}>
      <Provider store = {store}>
          <AppInitializer>
            {children}
          </AppInitializer>
      </Provider>
    </QueryClientProvider> 
  )
}

export default AppProviders