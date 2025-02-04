import Link from 'next/link'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
        <Link href="/about" className="text-gray-600 hover:text-primary">About Us</Link>
        <Link href="/services" className="text-gray-600 hover:text-primary">Our Services</Link>
        <Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-600 hover:text-primary">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-primary">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <button className="px-4 py-2 text-primary border border-primary rounded-lg">
          Doctor
        </button>
      </div>
    </div>
  )
}