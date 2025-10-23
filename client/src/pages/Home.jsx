import Banner from '../components/Banner/Banner'
import FlashSale from '../components/FlashSales/FlashSale'
import Categories from '../components/Categories/Categories'
import MusicExperience from '../components/MusicExperience/MusicExperience'
import ExploreOurProducts from '../components/ExploreOurProducts/ExploreOurProducts'
import FeaturedNewArrivals from '../components/FeaturedNewArrivals/FeaturedNewArrivals'
import ServiceFeatures from '../components/ServiceFeatures/ServiceFeatures'
import BestSelling from '../components/BestSellingProducts/BestSelling'
export default function Home() {
  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
      <Banner />
      <FlashSale />
      <Categories />
      <BestSelling />
      <MusicExperience />
      <ExploreOurProducts />
      <FeaturedNewArrivals  />
      <ServiceFeatures />  
    </div>
    </div>
  )
}
