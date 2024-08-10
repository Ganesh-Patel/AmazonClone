import React from 'react'
import MyContext from '../myContexts/MyContext'

function myState(props) {
    const { state } = {};
  return (
    <MyContext.Provider value={state}>
      {props.children}
    </MyContext.Provider>
  )
}

export default myState
