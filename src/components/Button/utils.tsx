export const if_render = (valueOne: boolean, valueTwo: string) => {
  return valueOne ? valueTwo : "";
};
export const ButtonTypes = [
  "primary",
  "outline",
  "link",
  "danger",
  "submit",
] as const;
