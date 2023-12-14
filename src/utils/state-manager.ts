export type State = Record<string, any>;
export type Action<A extends string> = (state: State, payload?: any) => State;
export type Reducer<A extends string> = Record<A, Action<A>>;

export class MyStateManagement {
  private readonly state: State;
  reducers: Record<string, Reducer<string>>;

  constructor() {
    this.state = {};
    this.reducers = {};
  }

  public createSlice<A extends string>(
    name: string,
    reducer: Reducer<A>,
    initialState: any
  ) {
    this.state[name] = initialState;
    this.reducers[name] = reducer;

    return new MySlice(name, this, reducer);
  }

  dispatch = (sliceName: string, action: string, payload?: any): void => {
    this.state[sliceName] = this.reducers[sliceName][action](
      this.state[ sliceName ],
      payload
    );
  };

  get(sliceName: string) {
    return this.state[sliceName];
  }
}

export class MySlice<A extends string> {
  private readonly name: string;
  private readonly StateManagement: MyStateManagement;
  private subscribers: (() => void)[] = [];
  private readonly reducers: Reducer<A>;

  constructor(name: string, StateManagement: MyStateManagement, reducers: Reducer<A>) {
    this.name = name;
    this.reducers = reducers;
    this.StateManagement = StateManagement;
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: () => void) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  private notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  dispatch(action: A, payload?: any): void {
    this.StateManagement.dispatch(this.name, action, payload);
    this.notify();
  }

  getState() {
    return this.StateManagement.get(this.name);
  }
}
