import React, { useEffect, useState } from 'react'

interface ColorProps {
  isDesktop: boolean;
  color: Color;
}

const Color = ({isDesktop, color}: ColorProps) => {

  const [toggleName, setToggleName] = useState<string>('')

  useEffect(() => {
    setToggleName(color.name)
  }, [color])

  const handleToggleName = () => {
    if(!isDesktop){
      if(toggleName == color.name){
        setToggleName(color.hexName)
      }else if(toggleName == color.hexName){
        setToggleName(color.rgbName)
      }else{
        setToggleName(color.name)
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