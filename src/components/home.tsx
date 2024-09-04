import React, { useRef, useEffect } from "react";
import carousel1 from "../assets/carousel1.png";
import bestSellerImage from "../assets/best-seller-image.jpg";
import videoSrc from "../assets/video-thumbnail.mp4";
import blackBackground from "../assets/blackBackground.png";

const Home: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    }
  };

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

      {/* Best Seller Section */}
      <section className="py-16 bg-black relative overflow-x-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8 text-left">
            Our Bestsellers
          </h2>
          <div className="overflow-x-auto scroll-smooth">
            <div className="flex gap-4 lg:gap-6" ref={scrollContainerRef}>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      minWidth: "300px", // Adjusted minWidth for responsiveness
                      maxWidth: "100%",
                      height: "auto", // Allow height to adjust based on content
                    }}
                  >
                    <div className="bg-customGray flex flex-col rounded-lg shadow-lg p-6 w-full h-auto items-center justify-center">
                      <img
                        src={bestSellerImage}
                        alt="Best Seller"
                        className="rounded-t-lg w-full h-auto object-cover"
                        style={{ maxWidth: "100%" }} // Ensure image is responsive
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
        <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 border-t border-white"></div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-black overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-white mb-8">
            Watch Our Latest Video
          </h2>
          <div className="relative">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              className="rounded-lg w-full max-w-full"
              style={{ height: "auto" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Explore Our Collections Section */}
      <section className="py-16 bg-[#1b1b1b] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-normal font-montserrat uppercase leading-tight text-gray-100 mb-8 text-center">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]">
            {" "}
            {/* Adjusted gap here */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card bg-[#BCBCBC] overflow-hidden flex items-center justify-center"
              >
                <img
                  className="w-full h-auto object-cover"
                  src={bestSellerImage} // Use your desired image here
                  alt={`collection-${index}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* Why Black Section */}
      <section className="relative mb-3 py-16 bg-black">
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
              className="px-6 py-3 bg-customGray text-white rounded-full hover:bg-gray-800 transition"
              style={{
                width: "176px",
                height: "61px",
                fontFamily: "Montserrat",
                fontSize: "16px",
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
