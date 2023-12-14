import { State, MyStateManagement } from "./utils/state-manager";

const StateManagement = new MyStateManagement();
export const testSlice = StateManagement.createSlice(
    "test",
    {
      increment: (state: State) => ({ count: state.count + 1 }),
      decrement: (state: State) => ({ ...state, count: state.count - 1 }),
      setValue: (state: State, payload: number = 0) => ({
        ...state,
        count: payload,
      }),
    },
    { count: 0 },
);
