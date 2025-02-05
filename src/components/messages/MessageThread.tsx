'use client'

import { useEffect, useRef } from 'react'
import { Conversation, Doctor } from '@/types'
import { 
  EllipsisHorizontalIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface MessageThreadProps {
  conversation: Conversation
  currentDoctor: Doctor
}

export default function MessageThread({ conversation, currentDoctor }: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation.messages])

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
  }

  const isConsecutiveMessage = (index: number) => {
    if (index === 0) return false
    const prevMessage = conversation.messages[index - 1]
    const currentMessage = conversation.messages[index]
    return prevMessage.sender.id === currentMessage.sender.id &&
           new Date(currentMessage.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 300000
  }

  return (
    <>
      {/* Thread header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={conversation.participants[0].avatar}
                alt={conversation.participants[0].name}
                className="w-10 h-10 rounded-full"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                conversation.participants[0].status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <h2 className="font-semibold">{conversation.participants[0].name}</h2>
              <p className="text-sm text-gray-500">
                {conversation.participants[0].status === 'online' 
                  ? 'Online'
                  : 'Offline'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <InformationCircleIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.messages?.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender.id === currentDoctor.id ? 'justify-end' : 'justify-start'}`}
          >
            {!isConsecutiveMessage(index) && message.sender.id !== currentDoctor.id && (
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div className={`max-w-[70%] ${isConsecutiveMessage(index) ? 'ml-10' : ''}`}>
              {!isConsecutiveMessage(index) && (
                <p className="text-xs text-gray-500 mb-1">{message.sender.name}</p>
              )}
              <div className={`rounded-lg px-4 py-2 ${
                message.sender.id === currentDoctor.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100'
              }`}>
                <p>{message.content}</p>
                {message.attachments?.map(attachment => (
                  <div key={attachment.id} className="mt-2">
                    {attachment.type.startsWith('image/') ? (
                      <img
                        src={attachment.url}
                        alt={attachment.name}
                        className="max-w-full rounded"
                      />
                    ) : (
                      <a
                        href={attachment.url}
                        download
                        className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-600"
                      >
                        <span>{attachment.name}</span>
                        <span className="text-xs">({Math.round(attachment.size / 1024)} KB)</span>
                      </a>
                    )}
                  </div>
                ))}
                <div className="text-xs mt-1 text-gray-500">
                  {formatMessageTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  )
}