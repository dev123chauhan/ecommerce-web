import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
export default PrivateRoute;