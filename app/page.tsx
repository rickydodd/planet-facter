'use client'

import React from 'react'
import Header from '../components/Header'
import Planet from '../components/Planet'

const initialState = {
  data: {},
  planetData: {},
  position: 0,
  planetNames: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_initial':
      return {
        ...state,
        data: action.data,
        planetNames: action.data.reduce(
          (planetNames, planet) => [...planetNames, planet.name],
          [],
        ),
      }
    case 'set_position':
      return {
        ...state,
        position: action.position,
      }
    default:
      throw new Error(
        `Unexpected type passed to dispatch. Received: ${action.type}`,
      )
  }
}

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    fetch(process.cwd() + 'data.json')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'set_initial', data })
      })
  }, [])

  return <div></div>
}
