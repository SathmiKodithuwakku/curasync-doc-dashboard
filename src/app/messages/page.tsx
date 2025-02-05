'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Conversation, Message, QuickReplyTemplate } from '@/types'
import ConversationList from '@/components/messages/ConversationList'
import MessageThread from '@/components/messages/MessageThread'
import MessageComposer from '@/components/messages/MessageComposer'
import SearchMessages from '@/components/messages/SearchMessages'

// Mock conversations data
const mockConversations: { [key: string]: Conversation } = {
  'p123': {
    id: 'p123',
    participants: [{
      id: 'p123',
      name: 'John Doe',
      role: 'patient',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      status: 'online'
    }],
    messages: [
      {
        id: '1',
        content: 'Hello Dr. Martin, I have some questions about my recent prescription.',
        sender: {
          id: 'p123',
          name: 'John Doe',
          role: 'patient',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe'
        },
        receiver: {
          id: 'dr-james',
          name: 'Dr. James Martin',
          role: 'doctor',
          avatar: 'https://ui-avatars.com/api/?name=James+Martin'
        },
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'read',
        type: 'text'
      }
    ],
    unreadCount: 1,
    category: 'patient',
    pinned: false,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  'dr-sarah': {
    id: 'dr-sarah',
    participants: [{
      id: 'dr-sarah',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
      status: 'online'
    }],
    messages: [
      {
        id: '1',
        content: 'Can we discuss a patient case?',
        sender: {
          id: 'dr-sarah',
          name: 'Dr. Sarah Johnson',
          role: 'doctor',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
        },
        receiver: {
          id: 'dr-james',
          name: 'Dr. James Martin',
          role: 'doctor',
          avatar: 'https://ui-avatars.com/api/?name=James+Martin'
        },
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'read',
        type: 'text'
      }
    ],
    unreadCount: 0,
    category: 'doctor',
    pinned: false,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const patientId = searchParams.get('patientId')
  
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'patients' | 'doctors'>('all')
  const [showArchived, setShowArchived] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>(Object.values(mockConversations))

  // Set active conversation based on patientId from URL
  useEffect(() => {
    if (patientId && mockConversations[patientId]) {
      setActiveConversation(mockConversations[patientId])
    }
  }, [patientId])

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!activeConversation) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: {
        id: 'dr-james',
        name: 'Dr. James Martin',
        role: 'doctor',
        avatar: 'https://ui-avatars.com/api/?name=James+Martin'
      },
      receiver: activeConversation.participants[0],
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text',
      attachments: attachments?.map(file => ({
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size
      }))
    }

    // Update conversation with new message
    const updatedConversation = {
      ...activeConversation,
      messages: [...(activeConversation.messages || []), newMessage],
      updatedAt: new Date().toISOString()
    }

    // Update conversations state
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id ? updatedConversation : conv
      )
    )
    setActiveConversation(updatedConversation)
  }

  const handleSearchMessages = (query: string) => {
    setSearchQuery(query)
  }

  // Filter conversations based on search query and category
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.participants[0].name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || conversation.category === filter
    const matchesArchived = conversation.archived === showArchived
    return matchesSearch && matchesFilter && matchesArchived
  })

  // Separate conversations by category
  const patientConversations = filteredConversations.filter(conv => conv.category === 'patients')
  const doctorConversations = filteredConversations.filter(conv => conv.category === 'doctors')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar - Conversation list */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="/logo.svg"
              alt="CuraSync"
              className="h-8"
            />
            <span className="text-xl font-semibold text-primary">Messages</span>
          </div>
          <SearchMessages onSearch={handleSearchMessages} />
          <div className="mt-2 flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="text-sm border rounded px-2 py-1 flex-1"
            >
              <option value="all">All Messages</option>
              <option value="patients">Patient Messages</option>
              <option value="doctors">Doctor Messages</option>
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

        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {/* Patient Conversations Section */}
          {(filter === 'all' || filter === 'patients') && patientConversations.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-y">
                <h3 className="text-sm font-medium text-gray-600">Patient Messages</h3>
              </div>
              <ConversationList
                filter={filter}
                showArchived={showArchived}
                onSelectConversation={setActiveConversation}
                activeConversationId={activeConversation?.id}
                conversations={patientConversations}
              />
            </div>
          )}

          {/* Doctor Conversations Section */}
          {(filter === 'all' || filter === 'doctors') && doctorConversations.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-y">
                <h3 className="text-sm font-medium text-gray-600">Doctor Messages</h3>
              </div>
              <ConversationList
                filter={filter}
                showArchived={showArchived}
                onSelectConversation={setActiveConversation}
                activeConversationId={activeConversation?.id}
                conversations={doctorConversations}
              />
            </div>
          )}

          {filteredConversations.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No messages found
            </div>
          )}
        </div>
      </div>

      {/* Main content - Message thread */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <MessageThread 
              conversation={activeConversation}
            />
            <MessageComposer
              onSendMessage={handleSendMessage}
              quickReplyTemplates={[]}
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