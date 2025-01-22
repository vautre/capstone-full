import React from 'react'
import './Membership.css'
import Pageheader from '../Components/Pageheader/Pageheader'

const Membership = () => {
  const benefits = [
    {
      title: "Exclusive Events and Gatherings",
      description: "Access to members-only exhibitions, openings, and special events. Access to intimate discussions with inspiring guest speakers, industry leaders, and thought influencers",
      icon: "🎭"
    },
    {
      title: "Personal and Professional Growth Opportunities",
      description: "Masterclasses and seminarson topics like leadership, financial empowerment, entrepreneurship, and personal branding. Access to mentorship programs, pairing members with established professionals.",
      icon: "🎨"
    },
    {
      title: "Networking and Collaboration",
      description: "A robust directory or platform for connecting with other members. Access to collaborative projects and opportunities within the group. Exclusive forums or spaces for sharing ideas, resources, and opportunities.",
      icon: "👥"
    },
    {
      title: "Wellness and Self-Care Perks",
      description: "Access to wellness activitieslike yoga, meditation, or fitness classes. Partnerships with luxury spas, beauty services, or health professionals offering member discounts.",
      icon: "✨"
    },
    {
      title: "Community and Support",
      description: "A platform for members to share their causes and rally support. A culture of encouragement, where members uplift and celebrate one another's successes.",
      icon: "💫"
    },
    {
      title: "Exclusive Perks and Benefits",
      description: "Discounts at high-end restaurants, boutiques, and events in New York. Priority access to exclusive venues or cultural happenings.",
      icon: "📮"
    }
  ];

  const membershipTiers = [
    {
      name: "Gold",
      price: "$1,500",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3",
      features: [
        "Choose 2 events each month from a curated selection",
        "Enjoy exclusive discounted rates on event tickets",
        "Participation in quarterly member appreciation raffles",
      ]
    },
    {
      name: "Platinum",
      price: "$2,500",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3",
      features: [
        "Access to an expanded range of events each month",
        "Personalized event recommendations based on preferences",
        "Discounts on partner services or products",
      ]
    },
    {
      name: "Diamond",
      price: "$3,500",
      image: "https://images.unsplash.com/photo-1587271339318-2e78fdf79586?ixlib=rb-4.0.3",
      features: [
        "Invitations to members-only dinners and private gatherings",
        "Option to bring one guest at a discounted rate for select events",
        "Recognition as a top-tier member at select events",
        "Access to exclusive Diamond-only benefits and perks",
      ]
    }
  ];

  return (
    <div className="membership-page">
      <Pageheader
        title="Membership"
        subtitle="Join our artistic community and unlock exclusive benefits"
        backgroundImage="https://picsum.photos/1920/1080?random=11"/>

      <section className="benefits-section">
        <div className="section-header">
          <h2>Why Join Us?</h2>
          <div className="decorative-line"></div>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">{benefit.icon}</span>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="membership-tiers">
        <div className="background-shape shape1"></div>
        <div className="background-shape shape2"></div>
        <div className="background-shape shape3"></div>
        <div className="section-header">
          <h2>Membership Tiers</h2>
          <div className="decorative-line"></div>
        </div>
        <div className="tier-cards">
          {membershipTiers.map((tier, index) => (
            <div className={`tier-card ${tier.name.toLowerCase()}-tier`} key={index}>
              <div className="tier-header">
                <div className="tier-image" style={{ backgroundImage: `url(${tier.image})` }}></div>
                <div className="tier-overlay"></div>
                <div className="tier-badge">{tier.name}</div>
                <h3>{tier.name}</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{tier.price.replace('$', '')}</span>
                  <span className="period">/year</span>
                </div>
              </div>
              <div className="tier-content">
                <div className="features-list">
                  <ul>
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <span className="checkmark">✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="join-button">
                  <span className="button-text">Join Now</span>
                  <span className="button-icon">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-grid">
          <div className="cta-text-block">
            <span className="overline">Exclusive Membership</span>
            <h2>
              <span className="thin">Elevate Your</span>
              <span className="bold">Experience</span>
            </h2>
            <p>Step into a world of refined experiences, curated connections, and unprecedented opportunities. Where every moment is crafted with excellence.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfHEjWAuyxCCIcpMG2B3KkWFOLhGaUYh61tyG0GAQOE2RQ2Rg/viewform" 
               target="_blank" 
               rel="noopener noreferrer">
              <button className="membership-button">
                <span className="button-text">Request Membership</span>
                <span className="button-line"></span>
              </button>
            </a>
          </div>
          
          <div className="cta-gallery">
            <div className="member-grid">
              <div className="gallery-item main">
                <img src="https://res.cloudinary.com/dyqbbdguz/image/upload/v1737580668/IMG_7707_ivlkn1.jpg" 
                alt=""/>
                <div className="image-overlay"></div>
              </div>
              <div className="gallery-item-pair">
                <div className="gallery-item">
                  <img src="https://res.cloudinary.com/dyqbbdguz/image/upload/v1737567961/law_dd4m3t.jpg"/>
                  <div className="image-overlay"></div>
                </div>
                <div className="gallery-item">
                  <img src="https://res.cloudinary.com/dyqbbdguz/image/upload/v1737565489/IMG_4399_zpxrvk.jpg" 
                  alt="Art Gallery"/>
                  <div className="image-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="decorative-elements">
          <div className="gold-accent accent-1"></div>
          <div className="gold-accent accent-2"></div>
        </div>
      </section>
    </div>
  )
}

export default Membership