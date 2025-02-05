'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchMessagesProps {
  onSearch: (query: string) => void
}

export default function SearchMessages({ onSearch }: SearchMessagesProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search messages..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </form>
  )
}