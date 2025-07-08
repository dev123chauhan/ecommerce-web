import women from "../../assets/women.png"
import speaker from "../../assets/speaker.png"
import perfume from "../../assets/perfume.png"
import plastation from "../../assets/plastation.png"
const FeaturedNewArrivals = () => {
  return (
    <div className="mb-10">
      <div className="text-red-500 font-bold mb-2">Featured</div>
      <h2 className="text-4xl font-bold mb-4">New Arrival</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black rounded-lg overflow-hidden relative">
          <img src={plastation} alt="PlayStation 5" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-1">PlayStation 5</h3>
              <p className="mb-2 text-sm">Black and White version of the PS5 coming out on sale.</p>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">Shop Now</button>
            </div>
        </div>
        
        <div className="grid grid-rows-2 gap-4">
          <div className="bg-black rounded-lg overflow-hidden relative">
            <img src={women} alt="Women's Collections" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-1">Womens Collections</h3>
              <p className="mb-2 text-sm">Featured woman collections that give you another vibe.</p>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">Shop Now</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-black rounded-lg overflow-hidden relative">
              <img src={speaker} alt="Speakers" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Speakers</h3>
                <p className="mb-2 text-xs">Amazon wireless speakers</p>
                <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold">Shop Now</button>
              </div>
            </div>

            <div className="bg-black rounded-lg overflow-hidden relative">
              <img src={perfume} alt="Perfume" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Perfume</h3>
                <p className="mb-2 text-xs">GUCCI INTENSE OUD EDP</p>
                <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewArrivals;