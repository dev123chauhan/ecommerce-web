import Card from "../Card/Card";
export default function ProductSkeleton({ count = 9 }) {
  return [...Array(count)].map((_, index) => <Card key={index} loading className="w-full" />);
}
