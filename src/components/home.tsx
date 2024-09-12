import React, { useRef, useEffect } from "react";
import carousel1 from "../assets/carousel1.png";
import bestSellerImage from "../assets/best-seller-image.jpg";
import videoSrc from "../assets/video-thumbnail.mp4";
import blackBackground from "../assets/blackBackground.png";

const Home: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleVerticalScroll = (e: Event) => {
      if (scrollContainerRef.current) {
        const scrollAmount = (e as WheelEvent).deltaY;
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("wheel", handleVerticalScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleVerticalScroll);
    };
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <div className="relative h-screen overflow-hidden min-h-screen">
        <img
          src={carousel1}
          alt="Carousel 1"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center top",
            // transform: "translateY(0%)",
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

      {/* Our Best Seller Section */}
      <section className="py-16 bg-[#1B1B1B] relative overflow-x-hidden">
        <div className="container mx-auto ">
         <div className="px-3">
         <h2 className="ml-16 text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8">
            Our Bestsellers
          </h2>
         </div>
         <div className="px-4">
         <div
            className="scroll-smooth"
            style={{
              overflowX: "auto", // Enable horizontal scrolling
              overflowY: "hidden", // Disable vertical overflow
              scrollbarWidth: "none", // Hide scrollbar in Firefox
              msOverflowStyle: "none", // Hide scrollbar in IE and Edge
            }}
          >
            <div
              className="flex gap-4 lg:gap-3"
              ref={scrollContainerRef}
              style={{
                height: "75vh",
              }}
            >
              {Array(7)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: "450px", // Adjust width for better visibility
                      height: "100%", // Ensure full height usage
                    }}
                  >
                    <div className="bg-customGray flex flex-col shadow-lg p-4 w-full h-full items-center justify-center">
                      <img
                        src={bestSellerImage}
                        alt="Best Seller"
                        className="rounded-t-lg w-full h-full object-cover"
                      />
                      <div className="mt-auto w-full text-center p-2">
                        <h2 className="font-montserrat text-xl font-normal text-[#f5f5f5] tracking-wider">
                          CLASSIC BLACK
                        </h2>
                        <div className="mb-4 mt-1 h-[1px] bg-[#f5f5f5] w-[100px] mx-auto"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
         </div>
         
        </div>
        <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 border-t border-black"></div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-[#1B1B1B] overflow-hidden">
        <div className="container mx-auto px-16 text-center">
          <div className="relative">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              className="w-full max-w-full"
              style={{ height: "auto" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Explore Our Collections Section */}
      <section className="py-16 bg-[#1b1b1b] text-white overflow-hidden">
        <div className="container mx-auto ">
          <div className="px-16">
          <h2 className="text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-gray-100 mb-8 text-start">
            Explore Our Collections
          </h2>
          </div>    
          <div className="px-1">
          <div className="px-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative card bg-[#BCBCBC] overflow-hidden flex items-center justify-center"
              >
                <img
                  className="w-full h-auto object-cover"
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
