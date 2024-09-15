// AboutUs.tsx

import React from 'react';
import videoSrc from '../assets/video-thumbnail.mp4';

const AboutUs: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative z-10 w-full h-full overflow-auto hide-scrollbar">
        <div className="flex flex-col">
          <section className="w-full h-screen flex items-center justify-center p-6 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
              <p className="text-lg text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </section>
          
          <section className="w-full h-screen flex items-center justify-center p-6 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-white">
                Nulla facilisi. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </section>

          <section className="w-full h-screen flex items-center justify-center p-6 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">Our Values</h2>
              <p className="text-lg text-white">
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est purus dapibus ligula, a convallis odio augue id lectus. Maecenas eget est nec leo feugiat sagittis id et felis.
              </p>
            </div>
          </section>

          <section className="w-full h-screen flex items-center justify-center p-6 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-lg text-white">
                Fusce eleifend lectus sed arcu pretium, sed tristique nisl ultrices. Vestibulum fermentum justo ut eros dignissim, a dictum nunc gravida. Donec mollis augue a felis consectetur, vel rhoncus libero tristique.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
