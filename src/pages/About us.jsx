import React from 'react';
import './aboutus.css'; // Import the CSS file
import { motion } from 'framer-motion';

// Placeholder image URLs - replace with actual paths
const teamMemberImages = {
  Robel:'./images/rob.png', 
  Dawit:'./images/daw.jpg',    
  Nahom:'./images/nah.jpg',    
  Asteway:'./images/ast.jpg',  
  Leol:'./images/l.jpg',     
};

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Robel Nigusse',
      role: 'Project Manager, Mock Data, caching user authentication',
      contribution: 'Led the project and Handled API simulation, data validation, ',
      image: teamMemberImages.Robel,
    },
    {
      name: 'Dawit Enku',
      role: 'Figma Design, React Front End',
      contribution: 'Designed the user interface and developed the front-end using React.',
      image: {},
    },
    {
      name: 'Nahom Kiflu',
      role: 'Back End, JSON',
      contribution: 'Developed the back-end logic and managed JSON data.',
      image: teamMemberImages.Nahom,
    },
    {
      name: 'Asteway Aemro', 
      role: 'API Simulation, Validation',
      contribution: 'Handled API simulation/ validation, provided mock data for development.',
      image: teamMemberImages.Asteway,
    },
    {
      name: 'Leol Lemma',
      role: 'Messaging App, Emotional Support',
      contribution: 'Developed the messaging app feature',
      image: teamMemberImages.Leol,
    },
    {
      name: 'Mera Fedlu',
      role: 'Support, CSS Design',
      contribution: 'Developed the CSS features also color and font',
      image: {}
    },
  ];

  return (
    <div className="about-us-page">
      <section className="intro-section">
        <h2 className="section-title">About Our Website</h2>
        <p className="description">
          Welcome to our platform, your one-stop destination for connecting buyers and sellers
          in Addis Ababa! We strive to provide a seamless and user-friendly experience
          for discovering a wide range of products.  Our platform is designed to make the buying
          and selling process as efficient and straightforward as possible.
        </p>
      </section>

      <section className="team-section">
        <h2 className="section-title">Our Team</h2>
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="team-member-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="member-image-wrapper">
                <img src={member.image} alt={member.name} className="member-image" />
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div className="member-contribution">
                  <span className="curved-text">
                    {member.contribution}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
