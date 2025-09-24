import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-[#1d1d1f]">
          Kayaker
        </Link>

        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="text-sm text-[#1d1d1f] hover:text-gray-600 transition-colors">
              홈
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="text-sm text-[#1d1d1f] hover:text-gray-600 transition-colors">
              갤러리
            </Link>
          </li>
          <li>
            <Link href="/competitions" className="text-sm text-[#1d1d1f] hover:text-gray-600 transition-colors">
              대회
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}