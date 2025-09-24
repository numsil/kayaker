"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 사진 배열 (필요한 만큼 추가 가능)
  const galleryItems = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: "/winner.jpeg",
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">갤러리</h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Image
                src={item.src}
                alt={`갤러리 이미지 ${item.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl w-full">
              <button
                className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <Image
                  src={galleryItems.find((item) => item.id === selectedImage)?.src || "/winner.jpeg"}
                  alt={`갤러리 이미지 ${selectedImage}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}