'use client'

import Link from 'next/link'
import { UserGroupIcon, ChatBubbleLeftIcon, BellIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-screen p-4">
      <div className="flex items-center mb-8">
        <img src="/logo.svg" alt="CuraSync" className="h-8" />
        <span className="ml-2 text-xl font-semibold text-primary">CuraSync</span>
      </div>
      
      <nav className="space-y-4">
        <Link href="/" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <UserGroupIcon className="h-6 w-6" />
          <span>Patients</span>
        </Link>
        <Link href="/doctors" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <UserIcon className="h-6 w-6" />
          <span>Doctors</span>
        </Link>
        <Link href="/messages" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <span>Messages</span>
        </Link>
        <Link href="/notifications" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <BellIcon className="h-6 w-6" />
          <span>Notification</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <Cog6ToothIcon className="h-6 w-6" />
          <span>Settings</span>
        </Link>
      </nav>

      <Link href="/doctor-profile" className="absolute bottom-4 flex items-center space-x-3 p-4 hover:bg-gray-100 rounded-lg">
        <img src="https://ui-avatars.com/api/?name=James+Martin" className="h-10 w-10 rounded-full" alt="Doctor profile" />
        <div>
          <p className="font-medium">Dr. James Martin</p>
          <p className="text-sm text-gray-500">General Surgeon</p>
        </div>
      </Link>
    </div>
  )
}