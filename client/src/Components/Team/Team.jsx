import React from 'react'
import './Team.css'
import dav from '../../assets/members/dav.jpg'
import j from '../../assets/members/j.jpg'
import mon from '../../assets/members/mon.jpg'
import ig_icon from '../../assets/ig_icon.png'


const Team = () => {
  return (
    <div className='ourteam'>
        <div className='team'>
            <img src={j} alt="J" />
            <div className="caption">
            <a href="https://www.instagram.com/joyceshengjia" >
                <img src={ig_icon} alt="Instagram" /></a>
                <h2>Joyce Sheng</h2>
                <p>Vice President</p>
                <p>Software Engineer</p>
            </div>
        </div>

        <div className='team'>
            <img src={dav} alt="Dav" />
            <div className="caption">
                <a href="https://www.instagram.com/drdavidtai" >
                <img src={ig_icon} alt="Instagram" /></a>"
                <h2>David Tai</h2>
                <p>President/Founder</p>
                <p></p>
            </div>
        </div>

        <div className='team'>
            <img src={mon} alt="Mon" />
            <div className="caption">
                <a href="https://www.instagram.com/monicapyh" >
                <img src={ig_icon} alt="Instagram" /></a>
                <h2>Monica Pyh</h2>
                <p>rnnldance</p>
            </div>
        </div>
    </div>
  )
}

export default Team