export abstract class CanvasObject {

    protected constructor(
        protected context: CanvasRenderingContext2D,
        protected x: number,
        protected y: number,
    ) {
    }

    abstract draw(...args: never): void

}