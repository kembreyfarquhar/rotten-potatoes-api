export function getKeyByValue(object: object, value: any) {
  //@ts-ignore
  return Object.keys(object).find((key: string) => object[key] === value);
}
