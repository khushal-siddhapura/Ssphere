import React, { useEffect, useState, useRef } from "react";
import layout1pic from "../../../src/assets/layout-1.webp"
import layout2pic from "../../../src/assets/layout2.webp"
import layout3pic from "../../../src/assets/layout3.webp"
import layout4pic from "../../../src/assets/layout4.webp"
import layout5pic from "../../../src/assets/layout5.webp"
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // 3D product images that look good
  const products = [
    {
      id: 1,
      name: "Leather Jacket",
      image: layout1pic
    },
    {
      id: 2,
      name: "Running Shoes",
      image: layout2pic
    },
    {
      id: 3,
      name: "Women's Top",
      image: layout3pic
    },
    {
      id: 4,
      name: "Kid's T-Shirt",
      image: layout4pic
    },
    {
      id: 5,
      name: "Smart Watch",
      image: layout5pic
    }
  ];

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [products.length]);

  // Apply different transforms based on the index
  const getItemStyle = (index) => {
    const diff = (index - activeIndex + products.length) % products.length;

    let rotateY = 0;
    let translateZ = 0;
    let opacity = 0;
    let scale = 0.8;
    let zIndex = 0;

    switch (diff) {
      case 0: // Active/front item
        rotateY = 0;
        translateZ = 200;
        opacity = 1;
        scale = 1;
        zIndex = 5;
        break;
      case 1: // Right item
        rotateY = -45;
        translateZ = 70;
        opacity = 0.7;
        scale = 0.85;
        zIndex = 4;
        break;
      case 2: // Back right item
        rotateY = -90;
        translateZ = -70;
        opacity = 0.5;
        scale = 0.7;
        zIndex = 3;
        break;
      case 3: // Back left item
        rotateY = -135;
        translateZ = -70;
        opacity = 0.5;
        scale = 0.7;
        zIndex = 3;
        break;
      case 4: // Left item
        rotateY = -180;
        translateZ = 70;
        opacity = 0.7;
        scale = 0.85;
        zIndex = 4;
        break;
    }

    return {
      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)"
    };
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side with carousel */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div
          ref={carouselRef}
          style={{
            perspective: "1200px",
            width: "100%",
            maxWidth: "800px",
            height: "600px",
            position: "relative",
            marginBottom: "2rem"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: "translateZ(-150px)"
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  position: "absolute",
                  width: "400px",
                  height: "400px",
                  top: "10%",
                  left: "calc(50% - 200px)",
                  cursor: "pointer",
                  backfaceVisibility: "hidden",
                  borderRadius: "10px",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  overflow: "hidden",
                  ...getItemStyle(index)
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side (Assuming login is already present) */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />  {/* Your existing login form goes here */}
      </div>
    </div>
  );
};

export default AuthLayout;


// import { Outlet } from "react-router-dom";
// import React from "react";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
//         <div className="max-w-md space-y-6 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Welcome to ECommerce Shopping
//           </h1>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

