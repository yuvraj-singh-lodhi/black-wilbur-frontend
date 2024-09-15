import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import carousel1 from "../assets/carousel1.png";
import bestSellerImage from "../assets/best-seller-image.jpg";
import videoSrc from "../assets/video-thumbnail.mp4";
import blackBackground from "../assets/blackBackground.png";

const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleNavigate = (path: string) => {
    navigate(path); // Programmatically navigate to the given path
  };

  return (
    <>
      {/* Carousel Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={carousel1}
          alt="Carousel 1"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center top",
          }}
        />
        <div className="hidden md:block">
          <div className="absolute bottom-4 left-4 ml-9 sm:bottom-10 sm:left-10 text-white">
            <h1 className="font-montserrat text-xl sm:text-2xl md:text-3xl lg:text-7xl font-semibold uppercase leading-tight z-10">
              Unleash the
              <br /> Power of Black
            </h1>
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-full hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>
        <div className="md:hidden">
          <div className="absolute inset-0 flex flex-col justify-end items-center mb-9 lg:items-start lg:justify-end p-4 lg:p-10">
            <div className="text-center lg:text-left mb-4">
              <h1 className="font-montserrat text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase leading-tight text-white">
                Unleash the
                <br /> Power of Black
              </h1>
            </div>
            <div className="text-center lg:text-right">
              <button className="px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-full hover:bg-white hover:text-black transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-[#1B1B1B] w-full relative overflow-x-hidden">
        <div className="container mx-auto px-16">
          <h2 className="text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8 text-start">
            Our Bestsellers
          </h2>
          <div
            className="flex gap-2 overflow-x-auto w-full snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              msOverflowStyle: "none", // Hide scrollbar for IE and Edge
            }}
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[300px] sm:min-w-[350px] lg:min-w-[400px] relative card bg-[#7A7A7A] overflow-hidden flex items-center justify-center snap-start"
              >
                <img
                  className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  onClick={() => handleNavigate("/Product")}
                  src={bestSellerImage}
                  alt={`bestseller-${index}`}
                />
                {/* Absolute text on the image */}
                <div className="absolute bottom-4 left-4 text-[#282828] text-lg font-semibold">
                  CLASSIC BLACK
                </div>
                <div className="absolute bottom-4 right-4 text-[#636363] text-lg font-semibold">
                  300rs
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-[#1B1B1B]">
        <div className="container mx-auto px-4 md:px-16 text-center">
          <div className="relative">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              className="w-full max-w-full"
              style={{ height: "100vh" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Explore Our Collections Section */}
      <section className="py-16 bg-[#1b1b1b] text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl px-16 lg:text-5xl font-normal font-montserrat uppercase leading-tight text-gray-100 mb-8 text-start">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 px-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative card bg-[#7A7A7A] overflow-hidden flex items-center justify-center"
              >
                <img
                  className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  onClick={() => handleNavigate("/Product")}
                  src={bestSellerImage}
                  alt={`collection-${index}`}
                />
                {/* Absolute text on the image */}
                <div className="absolute bottom-4 left-4 text-[#282828] text-lg font-semibold">
                  T-SHIRT
                </div>
                <div className="absolute bottom-4 right-4 text-[#636363] text-lg font-semibold">
                  300rs
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Shop Collections
            </button>
          </div>
        </div>
      </section>

      {/* Why Black Section */}
      <section className="relative py-16 bg-black mb-28">
        <div
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "706px",
          }}
        >
          <img
            src={blackBackground}
            alt="Black Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <h2
              className="font-montserrat text-[93px] font-semibold leading-[81px] text-center mt-20 mb-24"
              style={{
                width: "100%",
                maxWidth: "599px",
              }}
            >
              Why Black
            </h2>
            <button
              className="px-6 py-3 bg-[#5C5C5C] text-white rounded-full hover:bg-gray-800 transition"
              style={{
                width: "176px",
                height: "61px",
                fontSize: "20px",
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
