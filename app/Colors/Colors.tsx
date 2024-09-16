'use client'
import { useState, useEffect, useRef } from "react";
import Controls from "./Controls";
import Color from './Color';
import Instructions from './Instructions'
import Logo from './Logo'
import { schemes, generateBase } from "../utils/generators";


const Colors = () => {


  const initColors = schemes['Monochromatic'](generateBase(), 'Monochromatic', 4)
  
  const [colors, setColors] = useState<ColorsObject>(initColors)
  const [isDesktop, setDesktop] = useState<boolean>(typeof window !== "undefined" && window.innerWidth >= 965);
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const inputDiv = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [])

  useEffect(() => {
    inputDiv.current?.focus();
  }, [])

  const generate = (): void => {
    const newColors = schemes[colors.scheme](generateBase(), colors.scheme, colors.count)
    setColors((colors) => colors = newColors)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault()
    if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Space") {
      const newColors = schemes[colors.scheme](generateBase(), colors.scheme, colors.count)
      setColors((colors) => colors = newColors)
      console.log(colors)
    }
    if (event.code === "ArrowUp" && colors.count < 8) {
      const newColors = schemes[colors.scheme](colors.base, colors.scheme, colors.count + 1, colors.colors)
      setColors((colors) => colors = newColors)
    }
    if (event.code === "ArrowDown" && colors.count > 4) {
      const newColors = schemes[colors.scheme](colors.base, colors.scheme, colors.count - 1, colors.colors)
      setColors((colors) => colors = newColors)
    }
  } 

  const handleOnWheel = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (event.deltaY < 0 && colors.count < 8) {
      const newColors = schemes[colors.scheme](colors.base, colors.scheme, colors.count + 1, colors.colors)
      setColors((colors) => colors = newColors)
    }
    if (event.deltaY > 0 && colors.count > 4) {
      const newColors = schemes[colors.scheme](colors.base, colors.scheme, colors.count - 1, colors.colors)
      setColors((colors) => colors = newColors)
    }
  } 

  const updateMedia = (): void => {
    setDesktop(window.innerWidth >= 965);
  }
    
  const handleScheme = (event: React.MouseEvent<HTMLElement>): void  => {
    event.preventDefault()
    const newScheme = (event.target as HTMLButtonElement).value
    const newBase = generateBase()
    const newColors = schemes[newScheme](newBase, newScheme, colors.count)
    setColors((colors) => colors = newColors)
  }

  const onTouchStart = (event: React.TouchEvent<HTMLElement>): void => {
    setTouchEnd(null) 
    setTouchStart(event.targetTouches[0].clientX)
  }

  const onTouchMove = (event: React.TouchEvent<HTMLElement>): void => {
    setTouchEnd(event.targetTouches[0].clientX)
  }

  const onTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return
    const minSwipeDistance = 50 
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < minSwipeDistance
    if (isUpSwipe || isDownSwipe){
      if(colors.count < 8 && isUpSwipe){
        const newColors = schemes[colors.scheme](colors.base, colors.scheme, colors.count + 1, colors.colors)
        setColors(newColors)
      }else if(colors.count > 4 && isDownSwipe){
        const newColors = schemes[colors.scheme](colors.base, colors.scheme, colors.count - 1, colors.colors)
        setColors(newColors)
      }
    } 
  }

  return (
    <div 
      tabIndex={-1}
      ref={inputDiv}
      className="colors"
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart} 
      onTouchMove={onTouchMove} 
      onTouchEnd={onTouchEnd}
      onWheel={handleOnWheel}
    >
      <Logo />
      <div className="color-blocks">
        {colors.colors.map((color: Color, index: number) => (
          <Color 
            isDesktop={isDesktop}
            key={index}
            color={color}
          />
        ))}
        <Controls 
          generate={generate} 
          handleScheme={handleScheme} 
          isDesktop={isDesktop} 
          scheme={colors.scheme} />
        <Instructions />
      </div>
    </div>
  );
};

export default Colors;

// MonoChromatic - Same color, varying shades
// Analogous - One main color, two adjacent colors
// Complementary - Two colors directly across
// Split Complementary
// Triadic - 3 equally spaced colors
// Tetradic - Rectangle, similar to square
// Square - 4 equally spaced colors
