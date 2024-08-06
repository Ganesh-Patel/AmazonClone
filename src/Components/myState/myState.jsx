import React from 'react'
import MyContext from '../myContexts/MyContext'
import { useContext } from 'react'

function myState(props) {
    const { state } = {};
  return (
    <MyContext.Provider value={state}>
      {props.children}
    </MyContext.Provider>
  )
}

export default myState
