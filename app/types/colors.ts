type Color = {
  hsl: number[],
  name: string,
  hexName: string,
  rgbName: string,
}

type Colors = Color[]

type ColorsObject = {
  count: number,
  base: Color,
  scheme: string,
  colors: Colors,
}