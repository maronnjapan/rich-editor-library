export type Permutation<T, E = T> =
    [T] extends [never]
    ? []
    : E extends E
    ? [E, ...Permutation<Exclude<T, E>>]
    : never;

export type UnionPick<T, K extends T> = K;

