export interface AiModel<V, T> {
    prompt(input: V): Promise<T>
}