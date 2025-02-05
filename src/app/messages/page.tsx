'use client'

import { useState, useEffect } from 'react'
import { Conversation, Message, QuickReplyTemplate } from '@/types'
import ConversationList from '@/components/messages/ConversationList'
import MessageThread from '@/components/messages/MessageThread'
import MessageComposer from '@/components/messages/MessageComposer'
import SearchMessages from '@/components/messages/SearchMessages'

// Mock data for quick reply templates
const quickReplyTemplates: QuickReplyTemplate[] = [
  {
    id: '1',
    title: 'Follow-up Reminder',
    content: 'Please schedule a follow-up appointment within the next week to monitor your progress.',
    category: 'appointments',
    tags: ['follow-up', 'reminder']
  },
  {
    id: '2',
    title: 'Medication Instructions',
    content: 'Take the prescribed medication twice daily with meals. If you experience any side effects, please contact us immediately.',
    category: 'medications',
    tags: ['instructions', 'medication']
  }
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'patients' | 'doctors'>('all')
  const [showArchived, setShowArchived] = useState(false)

  const handleSendMessage = (content: string, attachments?: File[]) => {
    // Here you would typically:
    // 1. Create a new message object
    // 2. Send it to your backend
    // 3. Update the UI optimistically
    console.log('Sending message:', { content, attachments })
  }

  const handleSearchMessages = (query: string) => {
    setSearchQuery(query)
    // Implement message search logic
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar - Conversation list */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <SearchMessages onSearch={handleSearchMessages} />
          <div className="mt-2 flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="text-sm border rounded px-2 py-1 flex-1"
            >
              <option value="all">All Messages</option>
              <option value="patients">Patients</option>
              <option value="doctors">Doctors</option>
            </select>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`px-3 py-1 text-sm rounded ${
                showArchived ? 'bg-primary text-white' : 'border text-gray-600'
              }`}
            >
              Archived
            </button>
          </div>
        </div>
        <ConversationList
          filter={filter}
          showArchived={showArchived}
          onSelectConversation={setActiveConversation}
          activeConversationId={activeConversation?.id}
        />
      </div>

      {/* Main content - Message thread */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <MessageThread conversation={activeConversation} />
            <MessageComposer
              onSendMessage={handleSendMessage}
              quickReplyTemplates={quickReplyTemplates}
              disabled={false}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  )
}