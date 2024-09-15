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

// const = (rr: any) => {
//   let shuffled = [], left = randomNumber(0,arr.length - 1), right = left + 1
//   while(left >= 0 || right < arr.length){
//     if(left >= 0){
//       shuffled.push(arr[left])
//       left--
//     }
//     if(right < arr.length){
//       shuffled.push(arr[right])
//       right++
//     }
//   }
//   return shuffled
// }

export const generateBase = () => {
  const hsl = [randomNumber(0, 360), randomNumber(20, 80), randomNumber(20, 80)]
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

const monoChromatic = (base: Color, count: number, current: Colors = []): ColorsObject => {
  const updated: Colors = current.length ? [...current] : [base], piv = [...base.hsl]
  while(count < updated.length){
    updated.pop()
  }
  while(updated.length < count){
    let s = randomNumber(-20,-1), l = randomNumber(-20,-1)
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
  
  console.log(updated)
  return {
    count,
    base,
    scheme: 'Monochromatic',
    colors: updated,
  }
}

const analogous = (base: any, count: any) => {
  let i = 0, j = 0, arr = [], piv = [...base], shift = [0,-35,-70,35,70]
  
  while(i < count){
    let s = randomNumber(-20,-1), l = randomNumber(-20,-1)
    piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
    piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    if(j >= 5) j = 0
    arr.push([piv[0] + shift[j] < 0 ? piv[0] - shift[j] + 360 : piv[0] + shift[j] > 359 ? piv[0] + shift[j] - 360 : piv[0] + shift[j], piv[1], piv[2]])
    i++
    j++
  }
  return arr
}

const complementary = (base: any, count: any) => {
  let i = 0, arr = [], piv = [...base], comp = piv[0] - 180 < 0 ? 360 + piv[0] - 180 : piv[0] - 180
  while(i < count){
    if(i % 2 == 0){
      let s = randomNumber(-20,-1), l = randomNumber(-20,-1)
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
      arr.push([piv[0], piv[1], piv[2]])
    }else{
      let s = randomNumber(-20,-1), l = randomNumber(-20,-1)
      arr.push([comp, piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s, piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l])
    }
    i++
  }
  return arr
}

const splitComplementary = (base: any, count: any) => {
  let i = 0, arr = [], piv = [...base], comp = piv[0] - 180 < 0 ? 360 + piv[0] - 180 : piv[0] - 180
  while(i < count){
    if(i % 2 == 0){
      arr.push([piv[0], piv[1], piv[2]])
    }else{
      arr.push([comp, piv[1], piv[2]])
      let s = randomNumber(-50,-30), l = randomNumber(-50,-30)
      piv[1] = piv[1] + s < 20 ? randomNumber(50,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(50,95) : piv[2] + l
    }
    i++
  }
  return arr
}

const triadic = (base: any, count: any) => {
  let 
    i = 0, 
    j = 0,
    arr = [], 
    piv = [...base], 
    t1 = piv[0] - 120 < 0 ? 360 + piv[0] - 120 : piv[0] - 120, 
    t2 = t1 - 120 < 0 ? 360 + t1 - 120 : t1 - 120, 
    triad = ['first','second','third']
  while(i < count){
    if(j > 2) j = 0
    if(triad[j] == 'first'){
      arr.push([piv[0], piv[1], piv[2]])
    }else if(triad[j] == 'second'){
      let s = randomNumber(-20,1), l = randomNumber(-20,1)
      arr.push([t1, piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s, piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l])
    }else if(triad[j] == 'third'){
      let s = randomNumber(-20,1), l = randomNumber(-20,1)
      arr.push([t2, piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s, piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l])
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }
    i++
    j++
  }
  return arr
}

const square = (base: any, count: any) => {
  let 
    i = 0, 
    j = 0,
    arr = [], 
    piv = [...base], 
    t1 = piv[0] - 90 < 0 ? 360 + piv[0] - 90 : piv[0] - 90, 
    t2 = t1 - 90 < 0 ? 360 + t1 - 90 : t1 - 90, 
    t3 = t2 - 90 < 0 ? 360 + t2 - 90 : t2 - 90, 
    square = ['first','second','third','fourth']
  while(i < count){
    if(j > 3) j = 0
    if(square[j] == 'first'){
      arr.push([piv[0], piv[1], piv[2]])
    }else if(square[j] == 'second'){
      let s = randomNumber(-20,1), l = randomNumber(-20,1)
      arr.push([t1, piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s, piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l])
    }else if(square[j] == 'third'){
      let s = randomNumber(-20,1), l = randomNumber(-20,1)
      arr.push([t2, piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s, piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l])
    }else if(square[j] == 'fourth'){
      let s = randomNumber(-20,1), l = randomNumber(-20,1)
      arr.push([t3, piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s, piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l])
      piv[1] = piv[1] + s < 20 ? randomNumber(20,95) : piv[1] + s
      piv[2] = piv[2] + l < 20 ? randomNumber(20,95) : piv[2] + l
    }
    i++
    j++
  }
  return arr
}

export const schemes: any = {
  'Monochromatic': monoChromatic,
  'Analogous': analogous,
  'Complementary': complementary,
  'Split Complementary': splitComplementary,
  'Triadic': triadic,
  'Square': square
};
