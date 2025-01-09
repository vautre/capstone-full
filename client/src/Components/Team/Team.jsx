import React from 'react'
import './Team.css'
import program_1 from '../../assets/program_1.jpg'
import program_2 from '../../assets/program_2.jpg'
import program_3 from '../../assets/program_3.jpg'
import ig_icon from '../../assets/ig_icon.png'


const Team = () => {
  return (
    <div className='ourteam'>
        <div className='team'>
            <img src={program_1} alt="" />
            <div className="caption">
                <img src={ig_icon} alt="" />
                <p>TEXT TEXT TEEE</p>
            </div>
        </div>

        <div className='team'>
            <img src={program_2} alt="" />
            <div className="caption">
                <img src={ig_icon} alt="" />
                <p>TEXT TEXT TEEE</p>
            </div>
        </div>

        <div className='team'>
            <img src={program_3} alt="" />
            <div className="caption">
                <img src={ig_icon} alt="" />
                <p>TEXT TEXT TEEE</p>
            </div>
        </div>
    </div>
  )
}

export default Team