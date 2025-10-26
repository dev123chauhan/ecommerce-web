import women from "../../../public/assets/women.png";
import speaker from "../../../public/assets/speaker.png";
import perfume from "../../../public/assets/perfume.png";
import plastation from "../../../public/assets/plastation.png";
import Button from "../../common/Button";
const FeaturedNewArrivals = () => {
  return (
    <div className="mb-10">
      <div className="text-red-500 font-bold mb-2">Featured</div>
      <h2 className="text-4xl font-bold mb-4">New Arrival</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black rounded-lg overflow-hidden relative">
          <img
            src={plastation}
            alt="PlayStation 5"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold mb-1">PlayStation 5</h3>
            <p className="mb-2 text-sm">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Button
              onClick={() => window.open("https://www.playstation.com/, _blank")}
              text="Shop Now"
              className="bg-white text-black font-bold py-3"
            />
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-black rounded-lg overflow-hidden relative">
            <img
              src={women}
              alt="Women's Collections"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-1">Womens Collections</h3>
              <p className="mb-2 text-sm">
                Featured woman collections that give you another vibe.
              </p>
              <Button
                onClick={() => window.open("https://wforwoman.com/, _blank")}
                text="Shop Now"
                className="bg-white text-black font-bold py-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black rounded-lg overflow-hidden relative">
              <img
                src={speaker}
                alt="Speakers"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Speakers</h3>
                <p className="mb-2 text-xs">Amazon wireless speakers</p>
                <Button
                  onClick={() => window.open("https://www.amazon.in/, _blank")}
                  text="Shop Now"
                  className="bg-white text-black font-bold py-3"
                />
              </div>
            </div>

            <div className="bg-black rounded-lg overflow-hidden relative">
              <img
                src={perfume}
                alt="Perfume"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Perfume</h3>
                <p className="mb-2 text-xs">GUCCI INTENSE OUD EDP</p>
                <Button
                  onClick={() => window.open("https://www.gucci.com/, _blank")}
                  text="Shop Now"
                  className="bg-white text-black font-bold py-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewArrivals;
