export type State = Record<string, any>

export type Action<TState extends State> = (state: TState, payload: any) => TState

export type Reducers<TState extends State = any> = Record<string, Action<TState>>

export type ActionParameter<A extends Reducers[keyof Reducers]> = Parameters<A>[ 'length' ] extends 1 ? never : Parameters<A>[1]

export type ReducersToActions<R extends Reducers> = {

  [ Key in keyof R ]: ActionParameter<R[Key]> extends never ? () => void : (payload: ActionParameter<R[Key]>) => void
}

export type Selector<TState extends State = State, TResult = TState> = (state: TState) => TResult

export type UseStoreFunction<TState extends State = State> = <TResult = TState>(
    selector?: Selector<TState, TResult>
) => TResult
