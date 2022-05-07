export abstract class CanvasObject {
    protected constructor(protected context: CanvasRenderingContext2D) {}

    abstract draw(): void
}
