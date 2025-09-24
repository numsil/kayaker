"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: "한강 카약 대회 시작",
      description: "2024 춘계 대회 출발 장면",
      date: "2024-03-20",
      competition: "춘계 카약 대회",
    },
    {
      id: 2,
      title: "팀 릴레이 경기",
      description: "치열한 팀 경기 현장",
      date: "2024-03-20",
      competition: "춘계 카약 대회",
    },
    {
      id: 3,
      title: "우승자 시상식",
      description: "영광의 순간",
      date: "2024-03-20",
      competition: "춘계 카약 대회",
    },
    {
      id: 4,
      title: "프리스타일 시범",
      description: "멋진 기술 시연",
      date: "2024-03-15",
      competition: "한강 대회",
    },
    {
      id: 5,
      title: "일몰 카약",
      description: "아름다운 일몰과 함께",
      date: "2024-03-10",
      competition: "한강 대회",
    },
    {
      id: 6,
      title: "단체 출발",
      description: "모든 선수들의 출발",
      date: "2024-03-05",
      competition: "동계 대회",
    },
    {
      id: 7,
      title: "결승선 통과",
      description: "마지막 스퍼트",
      date: "2024-03-05",
      competition: "동계 대회",
    },
    {
      id: 8,
      title: "연습 세션",
      description: "대회 전 연습",
      date: "2024-02-28",
      competition: "연습",
    },
  ];

  const competitions = [
    "전체",
    ...Array.from(new Set(galleryItems.map((item) => item.competition))),
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">갤러리</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {competitions.map((competition) => (
            <button
              key={competition}
              className="px-4 py-2 rounded-full border hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              {competition}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
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