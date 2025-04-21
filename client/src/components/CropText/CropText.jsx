import PropTypes from 'prop-types';

const CropText = ({ text, length = 100 }) => {
  if (!text) return null;
  
  return text.length > length 
    ? `${text.slice(0, length)}...` 
    : text;
};

CropText.propTypes = {
  text: PropTypes.string,
  length: PropTypes.number
};

export default CropText;