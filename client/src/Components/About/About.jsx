import React from 'react'
import './About.css'
import cny1 from "../../assets/cny1.jpg"

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={cny1} alt="" className='cny_gala' />
        </div>

        <div className="about-right">
            <h3>ABOUT NYGODDESSES-SUBTITLE</h3>
            <h2>ACTUAL TITLE</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </div>
  )
}

export default About