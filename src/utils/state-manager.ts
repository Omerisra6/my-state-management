import { useSyncExternalStore } from 'react'
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

  const subscribe = (listener: () => void): (() => void) => {
    listeners.push(listener)

    return () => {
      listeners.splice(listeners.indexOf(listener), 1)
    }
  }

  const useStore: UseStoreFunction<TState> = <TResult = TState>(selector: Selector<TState, TResult> | undefined) => {
    return useSyncExternalStore(subscribe, () => selector === undefined ? state : selector(state)) as TResult
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
