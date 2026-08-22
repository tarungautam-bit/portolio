import {configureStore} from '@reduxjs/toolkit'
import entryReducer from '../../screens/entry/state/entrySlice'

export const store = configureStore({
    reducer:{
        entry:entryReducer
    }
})