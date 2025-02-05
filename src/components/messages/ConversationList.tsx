'use client'

import { useState } from 'react'
import { Conversation, Doctor } from '@/types'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ConversationListProps {
  filter: 'all' | 'patients' | 'doctors'
  showArchived: boolean
  onSelectConversation: (conversation: Conversation) => void
  activeConversationId?: string
  conversations: Conversation[]
  currentDoctor: Doctor
}

export default function ConversationList({
  filter,
  showArchived,
  onSelectConversation,
  activeConversationId,
  conversations,
  currentDoctor
}: ConversationListProps) {
  const filteredConversations = conversations.filter(conv => {
    if (showArchived !== conv.archived) return false
    if (filter === 'patients' && conv.category !== 'patient') return false
    if (filter === 'doctors' && conv.category !== 'doctor') return false
    return true
  })

  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="overflow-y-auto h-[calc(100vh-8rem)]">
      {filteredConversations.map(conversation => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            activeConversationId === conversation.id ? 'bg-blue-50' : ''
          } ${conversation.pinned ? 'border-l-4 border-primary' : ''}`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={conversation.participants[0].avatar}
                alt={conversation.participants[0].name}
                className="w-12 h-12 rounded-full"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                conversation.participants[0].status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium truncate">
                  {conversation.participants[0].name}
                </h3>
                {conversation.unreadCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full px-2 py-1">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conversation.messages?.[conversation.messages.length - 1]?.content || 'No messages yet'}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-400">
                  {conversation.participants[0].status === 'online' 
                    ? 'Online'
                    : formatLastSeen(conversation.updatedAt)
                  }
                </span>
                {conversation.messages?.[conversation.messages.length - 1]?.status === 'read' && (
                  <CheckCircleIcon className="h-4 w-4 text-primary" />
                )}
                {conversation.messages?.[conversation.messages.length - 1]?.status === 'sent' && (
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}