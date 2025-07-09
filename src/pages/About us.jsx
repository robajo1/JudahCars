import React from 'react';
import './aboutus.css';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi'; 

const teamMembers = [
  {
    name: 'Robel Nigusse',
    image: './images/rob.png',
    github: 'https://github.com/robelnigusse',
    website: 'https://robel-nigusse.vercel.app/', 
  },
  {
    name: 'Dawit Enku',
    image: './images/daw.JPEG',
    github: 'https://github.com/dawitl2',
  },
  {
    name: 'Nahom Kiflu',
    image: './images/nah.jpg',
    github: 'https://github.com/Nah4-4',
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <section className="intro-section">
        <h2 className="section-title">About Our Website</h2>
        <p className="description">
          Welcome to our platform — your go-to marketplace for connecting buyers and sellers in Addis Ababa!
          We aim to provide a smooth, intuitive experience for discovering a wide range of products.
          Our mission is to make buying and selling easy, efficient, and enjoyable.
        </p>
      </section>

      <section className="team-section">
        <h2 className="section-title">Meet the Team</h2>
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
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-links">
                  <a
                    href={member.github}
                    className="icon-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <FaGithub size={24} />
                  </a>
                  {member.website && (
                    <a
                      href={member.website}
                      className="icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Portfolio Website"
                    >
                      <FiGlobe size={24} />
                    </a>
                  )}
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
