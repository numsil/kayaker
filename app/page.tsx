import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
          <div className="w-full max-w-[30%] mx-auto mb-12">
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

      {/* Competition Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">다가오는 대회</h2>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["한강 카약", "팀 경기", "시상식", "출발 장면", "연습 세션", "단체 출발", "결승선 통과", "우승 순간"].map((item, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-xl relative">
                <Image
                  src="/winner.jpeg"
                  alt={item}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}