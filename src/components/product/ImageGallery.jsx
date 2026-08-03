import { useState, useRef } from "react";
import { CutFrame } from "../ui/index.js";
import ProductImage from "./ProductImage.jsx";

export default function ImageGallery({ product }) {
  const images = product.image ? [product.image, ...product.gallery] : [];
  const [active, setActive] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const frameRef = useRef(null);

  function handleMouseMove(e) {
    if (!images.length) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: "scale(1.8)" });
  }

  function handleMouseLeave() {
    setZoomStyle({ transform: "scale(1)" });
  }

  return (
    <div>
      <CutFrame className="shadow-lux">
        <div
          ref={frameRef}
          className="h-[460px] md:h-[560px] overflow-hidden cursor-zoom-in bg-ivory-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {images.length ? (
            <img
              src={images[active]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
              style={zoomStyle}
             decoding="async" />
          ) : (
            <ProductImage product={product} />
          )}
        </div>
      </CutFrame>
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              title={`View image ${i + 1}`}
              aria-label={`View image ${i + 1}`}
              className={`w-20 h-20 overflow-hidden border-2 flex-shrink-0 transition ${
                active === i ? "border-amethyst" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover"  decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
