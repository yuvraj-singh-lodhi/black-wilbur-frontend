import React, { useRef } from "react";
import carousel1 from "../assets/carousel1.png";
import bestSellerImage from "../assets/best-seller-image.jpg"; // Replace with actual path

const Home: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && scrollContainerRef.current) {
      e.preventDefault(); // Prevent default vertical scroll behavior
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <>
      {/* Carousel Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={carousel1}
          alt="Carousel 1"
          className="carousel-img absolute inset-0 w-full h-full object-cover"
        />
        {/* <img 
                src={carousel2}
                alt="Carousel 2" 
                className="carousel-img carousel-img2 absolute inset-0 w-full h-full object-cover"
            /> */}
        <div className="hidden md:block">
          {/* Text positioned in the bottom left */}
          <div className="absolute bottom-4 left-4 ml-9 sm:bottom-10 sm:left-10 text-white">
            <h1 className="font-montserrat text-xl sm:text-2xl md:text-3xl lg:text-7xl font-semibold uppercase leading-tight z-10">
              Unleash the
              <br /> Power of Black
            </h1>
          </div>
          {/* Button positioned in the bottom right */}
          <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-full hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>
        <div className="md:hidden">
          {/* Text positioned in the bottom left */}
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

      {/* Best Seller Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-medium font-montserrat uppercase leading-[81px] text-white break-words text-left mb-8 ml-14">
            Our Bestsellers
          </h2>
          <div
            className="overflow-x-auto ml-40 scrollbar-hide"
            ref={scrollContainerRef}
            onWheel={handleScroll}
          >
            <div className="flex gap-3">
              {/* Product Card */}
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: "550px", height: "750px", opacity: "1" }}
                  >
                    <div className="bg-custom-gray flex flex-col rounded-lg shadow-lg p-6 w-full h-full items-center justify-center">
                      <img
                        src={bestSellerImage}
                        alt="Best Seller"
                        className="rounded-t-lg"
                        style={{
                          width: "80%",
                          height: "auto",
                        }}
                      />
                      <div className="mt-auto w-full text-center p-4">
                        <h2 className="font-montserrat text-2xl font-normal text-white">
                          Classic Black
                        </h2>
                        <div className="mt-2 h-[2px] bg-white w-20 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Centered White Line */}
        <div className="absolute w-[1303px] h-0 left-1/2 bottom-[3px] transform -translate-x-1/2 border-t border-white opacity-100"></div>
      </section>
      <div className="section3 h-full bg-black">
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-medium font-montserrat uppercase leading-[81px] text-white break-words text-left mb-8 ml-14">
            Our Bestsellers
          </h2>
          <div
            className="overflow-x-auto ml-40 scrollbar-hide"

            onWheel={handleScroll}
          >
            <div className="flex gap-3">
              {/* Product Card */}
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: "550px", height: "750px", opacity: "1" }}
                  >
                    <div className="bg-custom-gray flex flex-col rounded-lg shadow-lg p-6 w-full h-full items-center justify-center">
                      <img
                        src={bestSellerImage}
                        alt="Best Seller"
                        className="rounded-t-lg"
                        style={{
                          width: "80%",
                          height: "auto",
                        }}
                      />
                      <div className="mt-auto w-full text-center p-4">
                        <h2 className="font-montserrat text-2xl font-normal text-white">
                          Classic Black
                        </h2>
                        <div className="mt-2 h-[2px] bg-white w-20 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Centered White Line */}
        <div className="absolute w-[1303px] h-0 left-1/2 bottom-[3px] transform -translate-x-1/2 border-t border-white opacity-100"></div>
      </section>
      </div>
    </>
  );
};

export default Home;
