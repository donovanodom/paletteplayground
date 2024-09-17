import React from 'react'
import {useState} from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { FaRedoAlt } from "react-icons/fa";

const Instructions = () => {
    
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }
    return(
        <div className={open ? 'open-instructions' : 'instructions'} onClick={handleOpen}>
            <FiHelpCircle id='help'/>
            <ul className='instructions-list'>
                <li>Select color pallete theme.</li>
                <li>Press <FaRedoAlt style={{display: 'inline', position: 'relative', bottom: '1px', width: '26px'}}/> <div style={{display: 'inline', fontStyle: 'italic'}}>enter</div> or <div style={{display: 'inline', fontStyle: 'italic'}}>space</div> to generate a random color pallete.</li>
                <li>Use the mouse scroll, touchpad scroll or arrow keys to increase or decrease color count.</li>
                <li>If in mobile view, swipe right or left to increase or decrease color count and press color name to toggle hex & rgb values.</li>
            </ul>
        </div>
    )
}

export default React.memo(Instructions)