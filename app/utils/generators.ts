const namer = require('color-namer')

export const randomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const hslToName = (hsl: number[]): string => {
  return namer(hslToHex(hsl),{pick: ['ntc'], distance: 'deltaE'})['ntc'][0]['name'] || 'unknowncolor'
}

const hslToHex = (hsl: number[]): string => {
  let [h,s,l] = hsl
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: any) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

const hexToRgb = (hex: string): string => {
  hex = hex.slice(1)
  let RgbHex = hex.match(/.{1,2}/g);
  if(!RgbHex) return ''
  return `rgb(${parseInt(RgbHex[0], 16)}, ${parseInt(RgbHex[1], 16)}, ${parseInt(RgbHex[2], 16)})`
}

export const generateBase = () => {
  const hsl = [randomNumber(0, 360), randomNumber(0, 100), randomNumber(0, 100)]
  const name = hslToName(hsl)
  const hexName = hslToHex(hsl)
  const rgbName = hexToRgb(hexName)
  return {
    hsl: hsl,
    name: name,
    hexName: hexName,
    rgbName: rgbName
  }
}

const monoChromatic = (base: Color, scheme: string, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl]
  while(count < updated.length){
    updated.pop()
  }
  while(updated.length < count){
    let h = randomNumber(-5,-1), s = randomNumber(-20,-1), l = randomNumber(-20,-1)
    piv[0] = piv[0] + h < 5 ? randomNumber(1,5) : piv[0] + h
    piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
    piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l

    const newHsl = [...piv]
    const name = hslToName(newHsl)
    const hexName = hslToHex(newHsl)
    const rgbName = hexToRgb(hexName)

    updated.push({
      hsl: newHsl,
      name: name,
      hexName: hexName,
      rgbName: rgbName
    })
  }
  
  return {
    count,
    base,
    scheme,
    colors: updated,
  }
}

const analogous = (base: Color, scheme: string, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl], shift = [0,-35,-70,35,70]
  while(count < updated.length){
    updated.pop()
  }
  let adj = 0
  while(updated.length < count){
    if(adj > 4) adj = 0
    let s = randomNumber(-20,-1), l = randomNumber(-20,-1)
    piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
    piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    piv[0] = piv[0] + shift[adj] < 0 ? piv[0] - shift[adj] + 360 : piv[0] + shift[adj] > 359 ? piv[0] + shift[adj] - 360 : piv[0] + shift[adj]

    const newHsl = [...piv]
    const name = hslToName(newHsl)
    const hexName = hslToHex(newHsl)
    const rgbName = hexToRgb(hexName)

    updated.push({
      hsl: newHsl,
      name: name,
      hexName: hexName,
      rgbName: rgbName
    })
    adj++
  }

  return {
    count,
    base,
    scheme,
    colors: updated,
  }
}

const complementary = (base: Color, scheme: string, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl]
  while(count < updated.length){
    updated.pop()
  }
  while(updated.length < count){
    const comp = piv[0] - 180 < 0 ? piv[0] + 180 : piv[0] - 180
    let s = randomNumber(-20,-1), l = randomNumber(-20,-1)
    piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
    piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    if(updated.length % 2 == 0) piv[0] = comp

    const newHsl = [...piv]
    const name = hslToName(newHsl)
    const hexName = hslToHex(newHsl)
    const rgbName = hexToRgb(hexName)

    updated.push({
      hsl: newHsl,
      name: name,
      hexName: hexName,
      rgbName: rgbName
    })
  }
  
  return {
    count,
    base,
    scheme,
    colors: updated,
  }
}

const splitComplementary = (base: Color, scheme: string, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl]
  while(count < updated.length){
    updated.pop()
  }
  while(updated.length < count){
    if(updated.length % 2 != 0){
      const comp = piv[0] - 180 < 0 ? piv[0] + 180 : piv[0] - 180
      let s = randomNumber(-50,-30), l = randomNumber(-50,-30)
      piv[1] = piv[1] + s < 20 ? randomNumber(50,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(50,95) : piv[2] + l
      piv[0] = comp
    }
 
    const newHsl = [...piv]
    const name = hslToName(newHsl)
    const hexName = hslToHex(newHsl)
    const rgbName = hexToRgb(hexName)

    updated.push({
      hsl: newHsl,
      name: name,
      hexName: hexName,
      rgbName: rgbName
    })
  }
  
  return {
    count,
    base,
    scheme,
    colors: updated,
  }
}

const triadic = (base: Color, scheme: string, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl]
  const t1 = piv[0] - 120 < 0 ? 360 + piv[0] - 120 : piv[0] - 120, t2 = t1 - 120 < 0 ? 360 + t1 - 120 : t1 - 120
  while(count < updated.length){
    updated.pop()
  }
  while(updated.length < count){
    let h = randomNumber(-5,-1), s = randomNumber(-20,1), l = randomNumber(-20,1), cur = randomNumber(1,3)
    if(cur == 1){
      piv[0] = t1 
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }else if(cur == 2){
      piv[0] = t2
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }else{
      piv[0] = piv[0] + h < 5 ? randomNumber(1,5) : piv[0] + h
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }
 
    const newHsl = [...piv]
    const name = hslToName(newHsl) 
    const hexName = hslToHex(newHsl)
    const rgbName = hexToRgb(hexName)

    updated.push({
      hsl: newHsl,
      name: name,
      hexName: hexName,
      rgbName: rgbName
    })
  }
  
  return {
    count,
    base,
    scheme,
    colors: updated,
  }
}

const square = (base: Color, scheme: string, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl]
  const t1 = piv[0] - 90 < 0 ? 270 + piv[0]: piv[0] - 90, t2 = t1 - 90 < 0 ? 270 + t1 : t1 - 90, t3 = t2 - 90 < 0 ? 270 + t2 : t2 - 90
  while(count < updated.length){
    updated.pop()
  }
  while(updated.length < count){
    let h = randomNumber(-5,-1), s = randomNumber(-20,1), l = randomNumber(-20,1), cur = randomNumber(1,4)
    if(cur == 1){
      piv[0] = t1 
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }else if(cur == 2){
      piv[0] = t2
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }else if(cur == 3){
      piv[0] = piv[0] + h < 5 ? randomNumber(1,5) : piv[0] + h
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }else{
      piv[0] = t3
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }
 
    const newHsl = [...piv]
    const name = hslToName(newHsl) 
    const hexName = hslToHex(newHsl)
    const rgbName = hexToRgb(hexName)

    updated.push({
      hsl: newHsl,
      name: name,
      hexName: hexName,
      rgbName: rgbName
    })

    if(cur == 2){
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }
  }
  
  return {
    count,
    base,
    scheme,
    colors: updated,
  }
}

export const schemes: any = {
  'Monochromatic': monoChromatic,
  'Analogous': analogous,
  'Complementary': complementary,
  'Split Complementary': splitComplementary,
  'Triadic': triadic,
  'Square': square
};
