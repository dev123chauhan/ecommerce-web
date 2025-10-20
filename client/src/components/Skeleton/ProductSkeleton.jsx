import Card from "../Card/Card";
import PropTypes from "prop-types";
export default function ProductSkeleton({ count = 9 }) {
  return [...Array(count)].map((_, index) => <Card key={index} loading className="w-full" />);
}

ProductSkeleton.propTypes = {
  count: PropTypes.number,
};
