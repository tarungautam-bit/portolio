import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkFirstVisit } from '../../screens/entry/state/entryThunk'

const AppInitializer = ({children}) => {

   const dispatch= useDispatch()
   useEffect(()=>{
        dispatch(checkFirstVisit())
   },[])
  return children;
}

export default AppInitializer