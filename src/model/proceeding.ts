export interface Proceeding {
  number: number,
  title: string
}

export function isProceeding(obj: any): obj is Proceeding {
  return typeof obj === "object" &&
        obj !== null &&
        typeof obj.number === "number" &&
        typeof obj.title === "string";
}
