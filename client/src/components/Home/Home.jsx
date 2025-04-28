import Banner from './Banner'
import BestSellingProduct from './BestSellingProduct'
import Category from './Category'
import ExploreProduct from './ExploreProduct'
import FeaturedNewArrival from './FeaturedNewArrivals'
import FlashSale from './FlashSale'
import MusicExperience from './MusicExperience'
import ServiceFeatures from './ServiceFeatures'

export default function Home() {
  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
      <Banner/>
      <FlashSale/>
      <Category/>
      <BestSellingProduct/>
      <MusicExperience/>
      <ExploreProduct/>
      <FeaturedNewArrival/>
      <ServiceFeatures/>  
    </div>
    </div>
  )
}
