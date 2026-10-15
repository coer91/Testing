export class Converter {


    /** Bytes -> MB */
    public static BytesToMB(value: number): number {
        return value / (1024 * 1024);
    }
}