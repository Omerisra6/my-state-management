import { createStore } from './utils/state-manager'

export const { actions, useStore } = createStore({ count: 0 }, {
  increment (state) {
    return {
      ...state,
      count: state.count + 1
    }
  },
  decrement (state) {
    return {
      ...state,
      count: state.count - 1
    }
  },
  setValue (state, value: number = 0) {
    return {
      ...state,
      count: value
    }
  }
})
