import React from 'react'
import {Provider} from 'react-redux'
import { store } from '../store/store'
import AppInitializer from './AppInitializer'
const AppProviders = ({children}) => {
  return (
    <Provider store = {store}>
        <AppInitializer>
          {children}
        </AppInitializer>
    </Provider>
  )
}

export default AppProviders