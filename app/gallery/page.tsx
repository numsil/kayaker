"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const galleryItems = [
    {
      id: 1,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 2,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 3,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 4,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 5,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 6,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 7,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
    {
      id: 8,
      title: "장성호 멸망전",
      description: "2025 장성호 멸망전",
      date: "2025-09-28",
      competition: "장성호",
    },
  ];

  const competitions = [
    "전체",
    ...Array.from(new Set(galleryItems.map((item) => item.competition))),
  ];

  const filteredItems = selectedCategory === "전체"
    ? galleryItems
    : galleryItems.filter((item) => item.competition === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">갤러리</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {competitions.map((competition) => (
            <button
              key={competition}
              onClick={() => setSelectedCategory(competition)}
              className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${selectedCategory === competition
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600"
                }`}
            >
              {competition}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer"
            >
              <Image
                src="/winner.jpeg"
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full">
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/winner.jpeg"
                  alt={galleryItems.find((item) => item.id === selectedImage)?.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold">
                  {galleryItems.find((item) => item.id === selectedImage)?.title}
                </h2>
                <p className="text-gray-300 mt-2">
                  {
                    galleryItems.find((item) => item.id === selectedImage)
                      ?.description
                  }
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                  <span>
                    {galleryItems.find((item) => item.id === selectedImage)?.date}
                  </span>
                  <span>•</span>
                  <span>
                    {
                      galleryItems.find((item) => item.id === selectedImage)
                        ?.competition
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}