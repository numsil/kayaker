"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  competition: string;
  imageUrl: string;
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 갤러리 데이터 로드
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          setGalleryItems(data);
        }
      } catch (error) {
        console.error('Error loading gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryData();
  }, []);

  // 최신 8개만 표시
  const displayItems = galleryItems.slice(0, 8);

  return (
    <div>
      {/* Hall of Fame - Full Page Hero */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center py-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0071e3 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 w-full mx-auto px-6 text-center">
          {/* Crown Icon */}
          <div className="mb-4 animate-bounce">
            <svg className="w-20 h-20 mx-auto" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15 8L21 9L16.5 13.5L18 20L12 16L6 20L7.5 13.5L3 9L9 8L12 2Z"
                fill="url(#gold-gradient)"
                stroke="#d4af37"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#ffed4e', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "'Nanum Brush Script', cursive" }}>
            카약커 명예의 전당
          </h1>

          {/* Golden Frame */}
          <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto mb-12">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>

              {/* Frame */}
              <div className="relative">
                {/* Outer Gold Border */}
                <div className="p-3 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-3xl shadow-2xl">
                  {/* Inner Gold Border */}
                  <div className="p-2 bg-gradient-to-tr from-yellow-300 via-yellow-400 to-amber-500 rounded-[1.3rem]">
                    {/* White Inner Frame */}
                    <div className="p-4 bg-white rounded-2xl">
                      {/* Profile Image Container */}
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
                        <Image
                          src="/winner.jpeg"
                          alt="장성호 우승자"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend Badge - Below Frame */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-xl opacity-60"></div>
                    <div className="relative bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 px-12 py-4 rounded-full shadow-2xl">
                      <p className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                        장성호 LEGEND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🥇</div>
              <p className="text-xs text-gray-500">뒤에서 1등 챔피언</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-xs text-gray-500">최우수 0마리수</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏅</div>
              <p className="text-xs text-gray-500">꼴등 MVP</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse">
          <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Ranking Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">🏆 장성호 멸망전 순위 🏆</h2>
            <p className="text-xl text-gray-600">🎣 장성호 대회 결과 - 최대 배스 사이즈 🎣</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* 1st Place - Special Design */}
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    {/* Crown Icon */}
                    <svg className="w-16 h-16 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15 8L21 9L16.5 13.5L18 20L12 16L6 20L7.5 13.5L3 9L9 8L12 2Z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold text-sm">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">입질가즘 | 송인호</h3>
                    <p className="text-yellow-100 text-lg">장성호 챔피언</p>
                  </div>

                  {/* Winner Profile Image - Next to Text */}
                  <div className="relative ml-6">
                    <div className="w-36 h-36 rounded-lg overflow-hidden border-4 border-yellow-200 shadow-2xl bg-white p-1">
                      <Image
                        src="/champion.jpeg"
                        alt="장성호 챔피언 송인호"
                        width={144}
                        height={144}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="absolute -top-3 -right-3 text-3xl animate-pulse">✨</div>
                    <div className="absolute -bottom-3 -left-3 text-2xl animate-bounce">🏆</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold text-white">56cm</div>
                  <p className="text-yellow-100">최대 배스</p>
                </div>
              </div>
            </div>

            {/* Other Rankings */}
            <div className="divide-y divide-gray-100">
              {/* 2nd Place */}
              <div className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">빌런</h3>
                      <p className="text-gray-500">박상준</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700">55cm</div>
                    <p className="text-gray-500 text-sm">최대 배스</p>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-amber-600">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">잉꼬부부</h3>
                      <p className="text-gray-500">이영재</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700">51cm</div>
                    <p className="text-gray-500 text-sm">최대 배스</p>
                  </div>
                </div>
              </div>

              {/* 4th-16th Places */}
              {[
                { rank: 4, name: "쌔팀장", size: "50cm", nickname: "장이수팀장" },
                { rank: 5, name: "염의철", size: "48cm", nickname: "런커" },
                { rank: 6, name: "강구현", size: "46cm", nickname: "도르도" },
                { rank: 6, name: "윤명식", size: "46cm", nickname: "다슬기" },
                { rank: 6, name: "김성준", size: "46cm", nickname: "금광지" },
                { rank: 9, name: "김민호", size: "43cm", nickname: "병아리" },
                { rank: 10, name: "이상규", size: "42cm", nickname: "삼지창" },
                { rank: 11, name: "감동하", size: "38cm", nickname: "나무" },
                { rank: 12, name: "임홍섭", size: "33.5cm", nickname: "괴짜" },
                { rank: 13, name: "오문호", size: "32cm", nickname: "앗싸리오" },
                { rank: 14, name: "오태경", size: "30cm", nickname: "바르칸" },
                { rank: 15, name: "오경석", size: "26.5cm", nickname: "노싱커" }
                // { rank: 16, name: "이석원", size: "26cm", nickname: "까망" }
              ].map((player) => (
                <div key={player.rank} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600">{player.rank}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{player.nickname}</h3>
                        <p className="text-gray-500 text-sm">{player.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold text-gray-700">{player.size}</div>
                      <p className="text-gray-500 text-sm">최대 배스</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Divider Line */}
              <div className="border-t-4 border-black bg-gray-900 h-2"></div>

              {/* Special Section - 부참가자들 */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50">
                <div className="text-center py-4 bg-gradient-to-r from-red-500 to-orange-500">
                  <h3 className="text-xl font-bold text-white">🔥 꼴찌 특별석 🔥</h3>
                  <p className="text-red-100 text-sm"></p>
                </div>

                {/* Special Bottom 3 */}
                <div className="divide-y divide-red-200">
                  <div className="p-6 hover:bg-red-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center border-2 border-red-400">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center border-3 border-gray-700 shadow-lg">
                              <span className="text-lg font-bold text-white">16</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">까망</h3>
                          <p className="text-gray-500 text-sm">이석원</p>
                          <p className="text-red-600 text-sm font-bold">🏆 진정한 장성호 꼴찌 왕</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-red-600">26cm</div>
                        <p className="text-red-400 text-xs">최대 배스</p>
                      </div>
                    </div>
                  </div>
                  {/* 무사 */}
                  <div className="p-6 hover:bg-red-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center border-2 border-red-400">
                          <span className="text-lg font-bold text-red-700">💥</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">무사</h3>
                          <p className="text-gray-500 text-sm">김경호</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-red-600">꽝!!</div>
                        <p className="text-red-400 text-xs">가위바위보 달인</p>
                      </div>
                    </div>
                  </div>

                  {/* 흑염가 - 진짜 꼴찌 Special */}
                  <div className="p-8 bg-gradient-to-r from-red-100 via-red-200 to-orange-200 border-4 border-red-500 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-900 shadow-2xl">
                            <span className="text-2xl font-bold text-white">꼴찌</span>
                          </div>
                          <div className="absolute -top-3 -right-3 text-3xl animate-bounce">🔥</div>
                          <div className="absolute -bottom-3 -left-3 text-2xl animate-pulse">💥</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-red-900">흑열가</h3>
                          <p className="text-red-700 font-bold text-lg">김광배</p>
                          <p className="text-red-600 text-sm font-bold">🏆 진정한 장성호 꼴찌 왕</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-red-800">꽝!!</div>
                        <p className="text-red-400 text-xs">레전드 오브 레전드</p>
                      </div>
                    </div>
                  </div>

                  {/* 꽝종 - 포기자 회색 디자인 */}
                  <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center border-3 border-gray-700 shadow-lg">
                            <span className="text-lg font-bold text-white">지각</span>
                          </div>
                          <div className="absolute -top-2 -right-2 text-xl">😴</div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-700">꽝종</h3>
                          <p className="text-gray-600 font-medium">권중성</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-600">미참여</div>
                        <p className="text-gray-500 text-sm font-semibold">게임 미참여</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="bg-gray-50 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">18명</div>
                  <p className="text-gray-500 text-sm">참가자</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">56cm</div>
                  <p className="text-gray-500 text-sm">최대 사이즈</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">40.5cm</div>
                  <p className="text-gray-500 text-sm">평균 사이즈</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">카약커 초대 대회</h2>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 md:p-16 shadow-xl">
            <div className="space-y-3 mb-10">
              <p className="text-xl md:text-2xl font-semibold text-gray-900">2025년 9월 27일 (금)</p>
              <p className="text-lg md:text-xl text-gray-600">장성호</p>
              <p className="text-base md:text-lg text-gray-500">신청 마감: 9월 26일</p>
              <p className="text-base md:text-lg text-gray-500">참가 인원: 20명</p>
            </div>
            <Link
              href="/competitions/1"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              대회 상세보기
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">갤러리</h2>
            <Link href="/gallery" className="text-blue-600 text-base hover:underline font-medium">
              모두 보기
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          ) : displayItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">등록된 사진이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item.id)}
                  className="aspect-square bg-gray-100 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-xl relative group"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-200">{item.competition}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
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
                src={galleryItems.find((item) => item.id === selectedImage)?.imageUrl || "/winner.jpeg"}
                alt={galleryItems.find((item) => item.id === selectedImage)?.title || ""}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-white text-center">
              <h2 className="text-2xl font-bold">
                {galleryItems.find((item) => item.id === selectedImage)?.title}
              </h2>
              <p className="text-gray-300 mt-2">
                {galleryItems.find((item) => item.id === selectedImage)?.description}
              </p>
              <div className="flex gap-4 mt-2 text-sm text-gray-400 justify-center">
                <span>
                  {galleryItems.find((item) => item.id === selectedImage)?.date}
                </span>
                <span>•</span>
                <span>
                  {galleryItems.find((item) => item.id === selectedImage)?.competition}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}