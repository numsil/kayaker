export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-xs font-semibold text-[#1d1d1f] mb-4">Kayaker</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              카약 대회 정보와 갤러리
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#1d1d1f] mb-4">바로가기</h4>
            <ul className="space-y-2">
              <li><a href="/gallery" className="text-xs text-[#86868b] hover:text-[#1d1d1f]">갤러리</a></li>
              <li><a href="/competitions" className="text-xs text-[#86868b] hover:text-[#1d1d1f]">대회</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#1d1d1f] mb-4">문의</h4>
            <p className="text-xs text-[#86868b]">
              contact@kayaker.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <p className="text-xs text-[#86868b]">
            © {new Date().getFullYear()} Kayaker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}