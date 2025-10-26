import { Linkedin } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { TfiTwitter } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { teamMembers } from "../../lib/teamMembers";
const TeamMember = ({ imageUrl, name, position, socialLinks }) => (
  <div className="flex flex-col items-center">
    <img src={imageUrl} alt={name} className="w-64 h-64 object-contain mb-4" />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-gray-600 mb-2">{position}</p>
    <div className="flex space-x-4">
      {socialLinks.twitter && (
        <Link to={socialLinks.twitter} className="text-gray-600">
          <TfiTwitter
            className="hover:-translate-y-1 transition-transform duration-300"
            size={20}
          />
        </Link>
      )}
      {socialLinks.instagram && (
        <Link to={socialLinks.instagram} className="text-gray-600">
          <BsInstagram
            className="hover:-translate-y-1 transition-transform duration-300"
            size={20}
          />
        </Link>
      )}
      {socialLinks.linkedin && (
        <Link to={socialLinks.linkedin} className="text-gray-600">
          <Linkedin
            className="hover:-translate-y-1 transition-transform duration-300"
            size={20}
          />
        </Link>
      )}
    </div>
  </div>
);

const TeamShowcase = () => {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamShowcase;
