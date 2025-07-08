import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import airpods from "../../assets/airpods.png";
import monitor from "../../assets/monitor.png";
import mobile from "../../assets/mobile.png";
const Review = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [reviews] = useState([
    {
      id: 1,
      username: "Sarah Johnson",
      rating: 5,
      date: "November 15, 2024",
      verified: true,
      text: "Amazing product! Exceeded all my expectations. The quality is outstanding and it arrived much faster than I anticipated.",
      likes: 24,
      dislikes: 2,
      images: [airpods, monitor],
    },
    {
      id: 2,
      username: "Mike Rodriguez",
      rating: 4,
      date: "November 10, 2024",
      verified: true,
      text: "Great product overall. Minor issue with packaging, but the item itself is top-notch.",
      likes: 12,
      dislikes: 5,
      images: [mobile],
    },
    {
      id: 3,
      username: "Emily Chen",
      rating: 3,
      date: "November 5, 2024",
      verified: false,
      text: "Decent product, but not quite what I expected. Might be good for some users.",
      likes: 5,
      dislikes: 8,
      images: [],
    },
  ]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
        fill={index < rating ? "#FFC107" : "none"}
      />
    ));
  };

  const filterOptions = [
    "All",
    "5 Stars",
    "4 Stars",
    "3 Stars",
    "2 Stars",
    "1 Star",
  ];

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold  mb-4 mt-20">Customer Reviews</h1>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {renderStars(4)}
              <span className="ml-2 text-xl font-semibold text-gray-700">
                4.2
              </span>
            </div>
            <span className="mx-4 text-gray-400">|</span>
            <span className="text-gray-600">Based on 342 reviews</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{review.username}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>

              <div className="flex mb-4">{renderStars(review.rating)}</div>

              <p className="text-gray-700 mb-4">{review.text}</p>

              {review.images.length > 0 && (
                <div className="flex space-x-4 mb-4">
                  {review.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Review image ${index + 1}`}
                      className="w-24 h-20 object-contain rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center text-gray-600">
                <div className="flex items-center mr-4">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{review.likes}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  <span>{review.dislikes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
