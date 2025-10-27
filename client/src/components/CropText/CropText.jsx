const CropText = ({ text, length = 100 }) => {
  if (!text) return null;
  return text.length > length 
    ? `${text.slice(0, length)}...` 
    : text;
};

export default CropText;