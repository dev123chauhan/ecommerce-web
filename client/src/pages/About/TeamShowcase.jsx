import PropTypes from 'prop-types';
import {  Linkedin,  } from 'lucide-react';
import { BsInstagram } from 'react-icons/bs';
import team1 from "../../assets/team1.png"
import team2 from "../../assets/team2.png"
import team3 from "../../assets/team3.png"
import { TfiTwitter } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
const TeamMember = ({ imageUrl, name, position, socialLinks }) => (
  <div className="flex flex-col items-center">
    <img src={imageUrl} alt={name} className="w-64 h-64 object-contain mb-4" />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-gray-600 mb-2">{position}</p>
    <div className="flex space-x-4">
      {socialLinks.twitter && (
        <Link to={socialLinks.twitter} className="text-gray-600 hover:text-blue-500">
        <TfiTwitter className="hover:-translate-y-1 transition-transform duration-300" size={20} />
        </Link>
      )}
      {socialLinks.instagram && (
        <Link to={socialLinks.instagram} className="text-gray-600 hover:text-pink-500">
          <BsInstagram className="hover:-translate-y-1 transition-transform duration-300" size={20} />
        </Link>
      )}
      {socialLinks.linkedin && (
        <Link to={socialLinks.linkedin} className="text-gray-600 hover:text-blue-700">
          <Linkedin className="hover:-translate-y-1 transition-transform duration-300"  size={20} />
        </Link>
      )}
    </div>
  </div>
);

TeamMember.propTypes = {
  imageUrl: PropTypes.string.isRequired,    
  name: PropTypes.string.isRequired,        
  position: PropTypes.string.isRequired,  
  socialLinks: PropTypes.shape({      
    twitter: PropTypes.string,    
    instagram: PropTypes.string,    
    linkedin: PropTypes.string,   
  }).isRequired                              
};

const TeamShowcase = () => {
  const teamMembers = [
    {
      imageUrl: team1,
      name: "John Doe",
      position: "Founder & Chairman",
      socialLinks: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      imageUrl: team2,
      name: "Jane Smith",
      position: "Managing Director",
      socialLinks: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      imageUrl: team3,
      name: "Mike Johnson",
      position: "Product Designer",
      socialLinks: {
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamShowcase;
