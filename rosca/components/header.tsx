import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {/* Replace with your logo */}
            {/* <Image 
              src="/logo.png"
              alt="Rosca Logo"
              width={32}
              height={32}
              className="mr-2"
            /> */}
            <span className="text-xl font-bold">ROSCA</span>
          </Link>
        </div>

        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-gray-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className="hover:text-gray-600">
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-gray-600">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}