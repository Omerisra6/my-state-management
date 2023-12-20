import { useEffect, useState } from 'react'
import type { ActionParameter, Reducers, ReducersToActions, Selector, State, UseStoreFunction } from '../types'

export const createStore = <
    TState extends State,
    TReducers extends Reducers<TState> = Reducers<TState>
>(initialState: TState, reducers: TReducers): {
    actions: ReducersToActions<TReducers>
    useStore: UseStoreFunction<TState>
  } => {
  let state = initialState
  const listeners: Array<() => void> = []

  const dispatch = (action: string, payload: any): void => {
    state = reducers[action](state, payload)

    listeners.forEach(listener => { listener() })
  }

  const useStore: UseStoreFunction<TState> = <TResult = TState>(selector: Selector<TState, TResult> | undefined) => {
    const [selectedState, setSelectedState] = useState(selector === undefined ? state : selector(state))

    useEffect(() => {
      const handleChange = () => {
        const value = selector === undefined ? state : selector(state)

        if (value !== selectedState) {
          setSelectedState(value)
        }
      }

      listeners.push(handleChange)

      return () => {
        listeners.splice(listeners.indexOf(handleChange), 1)
      }
    }, [selectedState, selector])

    return selectedState as TResult
  }

  function getActions (): ReducersToActions<TReducers> {
    return Object.keys(reducers).reduce<Record<string, any>>((acc, action) => {
      type Payload = ActionParameter<TReducers[typeof action]>

      acc[action] = (payload: Payload) => { dispatch(action, payload) }

      return acc
    }, {}) as ReducersToActions<TReducers>
  }

  return {
    actions: getActions(),
    useStore
  }
}
