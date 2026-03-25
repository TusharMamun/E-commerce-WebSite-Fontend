"use client";

import { Lens } from "@/components/ui/lens";
import Image from "next/image";
import { useState } from "react";

interface Props {
  productImages: string[];
}

const ProductImage = ({ productImages }: Props) => {
  const [currentImage, setCurrentImage] = useState(productImages?.[0] || "");

  if (!productImages?.length) {
    return <div>No images available</div>;
  }

  return (
    <div className="flex gap-4 items-start">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {productImages.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(item)}
            className={`border-2 rounded-lg overflow-hidden ${
              currentImage === item ? "border-blue-500" : "border-transparent"
            }`}
          >
            <Image
              src={item}
              alt={`Product thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="object-cover cursor-pointer hover:opacity-75 transition-opacity"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Lens */}
             <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
      <div className="bg-gray-100 rounded-md ml-5 max-w-full max-h-[550px] p-4">
 
          <Image
            src={currentImage}
            alt="Product image"
            width={500}
            height={500}
            className="object-contain rounded-lg w-full h-full"
            priority
          />

      </div>
              </Lens>
    </div>
  );
};

export default ProductImage;