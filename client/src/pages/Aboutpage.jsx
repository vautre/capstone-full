import './Aboutpage.css'
import Pageheader from '../Components/Pageheader/Pageheader'

import React from 'react'

const Aboutpage = () => {
  return (
    <div>
      <Pageheader
        title="About Us"
        subtitle="Explore Our Past Events"
        backgroundImage="https://picsum.photos/1920/1080?random=11"
      />
    </div>
  )
}

export default Aboutpage