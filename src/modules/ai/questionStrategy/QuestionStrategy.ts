import { AiModel } from "../AiModel";

export abstract class QuestionStrategy<V> implements AiModel<V, string[]> {
    abstract prompt(input: V): Promise<string[]>;
}