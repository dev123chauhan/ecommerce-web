import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jbl from "../../assets/Jbl.png"
const CountdownTimer = ({ hours, days, minutes, seconds }) => {
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white bg-opacity-10 rounded-full p-2 w-16 h-16">
      <span className="text-white text-xl font-bold">{value}</span>
      <span className="text-white text-xs">{label}</span>
    </div>
  );
  TimeUnit.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <div className="flex space-x-4">
      <TimeUnit value={hours} label="Hours" />
      <TimeUnit value={days} label="Days" />
      <TimeUnit value={minutes} label="Minutes" />
      <TimeUnit value={seconds} label="Seconds" />
    </div>
  );
};
CountdownTimer.propTypes = {
    hours: PropTypes.number.isRequired,
    days: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  };
const MusicExperience = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-lg shadow-xl mb-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h3 className="text-green-400 text-sm uppercase mb-2">Categories</h3>
          <h2 className="text-4xl font-bold mb-6">Enhance Your Music Experience</h2>
          <CountdownTimer {...timeLeft} />
          <button className="mt-8 bg-green-400 text-black font-bold py-3 px-8 rounded-full hover:bg-green-500 transition duration-300">
            Buy Now!
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img 
            src={jbl}
            alt="JBL Speaker" 
            className="max-w-full h-auto object-cover rounded-lg transform rotate-2 hover:rotate-0 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicExperience;