import React from "react";
import {useState } from 'react'
import { FaRedoAlt, FaBars } from "react-icons/fa";

interface ControlsProps {
  generate(): void,
  handleScheme(e: React.MouseEvent<HTMLElement>): void,
  isDesktop: boolean,
  scheme: string,
}

const Controls = ({generate, handleScheme, isDesktop, scheme}: ControlsProps) => {
  
  const [drop, setDrop] = useState(false)

  const handleDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrop(!drop)
  }
  
  return(
    <div className="controls">
      <div className='tools'>
        <div onClick={generate} id='generate'><FaRedoAlt /></div>
        {isDesktop ? 
          (<div id="color-scheme" onClick={handleDrop}>{scheme}</div>) 
          : (<div className={drop ? 'open' : 'closed'} id='menu' onClick={handleDrop}> 
            <FaBars id='bars'/>
            <button onClick={handleScheme} value='Monochromatic'>MonoChromatic</button>
            <button onClick={handleScheme} value='Analogous'>Analogous</button>
            <button onClick={handleScheme} value='Complementary'>Complementary</button>
            <button onClick={handleScheme} value='Split Complementary'>SplitComplementary</button>
            <button onClick={handleScheme} value='Triadic'>Triadic</button>
            <button onClick={handleScheme} value='Square'>Square</button>
          </div>
          )}
        
      </div>
      {isDesktop ? 
      (<div className={drop ? 'open' : 'closed'} id='menu' onClick={handleDrop}>
        <button onClick={handleScheme} value='Monochromatic'>MonoChromatic</button>
        <button onClick={handleScheme} value='Analogous'>Analogous</button>
        <button onClick={handleScheme} value='Complementary'>Complementary</button>
        <button onClick={handleScheme} value='Split Complementary'>SplitComplementary</button>
        <button onClick={handleScheme} value='Triadic'>Triadic</button>
        <button onClick={handleScheme} value='Square'>Square</button>
      </div>) : null}
    </div>
  )
  
};

export default Controls;
