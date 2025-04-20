"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
  fallbackColor?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = "",
  fallbackColor = "#2563eb",
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {error ? (
        fallbackSrc ? (
          <Image
            alt={alt}
            src={fallbackSrc}
            {...props}
          />
        ) : (
          <div 
            style={{ backgroundColor: fallbackColor }}
            className="w-full h-full rounded-md flex items-center justify-center text-white"
          >
            {alt}
          </div>
        )
      ) : (
        <Image
          alt={alt}
          src={src}
          {...props}
          onError={() => setError(true)}
        />
      )}
    </>
  );
} 