import React from 'react'
import './About.css'
import cny from "../../assets/cny.jpg"

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={cny} alt="" className='cny_gala' />
        </div>

        <div className="about-right">
            <h3>ABOUT NYGODDESSES</h3>
            <h2>TITLEEEE</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </div>
  )
}

export default About