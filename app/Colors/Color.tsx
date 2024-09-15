import React, { useState } from 'react'

interface ColorProps {
  isDesktop: boolean;
  color: Color;
}

const Color = ({isDesktop, color}: ColorProps) => {

  const [toggleName, setToggelName] = useState<string>(color.name)

  const handleToggleName = () => {
    if(!isDesktop){
      if(toggleName == color.name){
        setToggelName(color.hexName)
      }else if(toggleName == color.hexName){
        setToggelName(color.rgbName)
      }else{
        setToggelName(color.name)
      }
    }
  }
  const [h,s,l] = color.hsl
    return(
      <div
        className="color-block"
        style={{
          backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
        }}
      >
        <ul className='color-code'>
          <li className='hex'>{color.hexName}</li>
          <li className='rgb'>{color.rgbName}</li>
          <li 
            onClick={handleToggleName} 
            className='name'
            style={{cursor: !isDesktop ? 'pointer' : 'default'}}
          >
            {toggleName}
          </li>
        </ul>
      </div>
    )
}

export default Color