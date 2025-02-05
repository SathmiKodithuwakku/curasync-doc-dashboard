'use client'

import { useState, useRef } from 'react'
import { 
  PaperClipIcon, 
  PaperAirplaneIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'
import { QuickReplyTemplate } from '@/types'

interface MessageComposerProps {
  onSendMessage: (content: string, attachments?: File[]) => void
  quickReplyTemplates: QuickReplyTemplate[]
  disabled: boolean
}

export default function MessageComposer({
  onSendMessage,
  quickReplyTemplates,
  disabled
}: MessageComposerProps) {
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() && attachments.length === 0) return

    onSendMessage(message, attachments)
    setMessage('')
    setAttachments([])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items)
    const files = items
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null)
    
    setAttachments(prev => [...prev, ...files])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleTemplateSelect = (template: QuickReplyTemplate) => {
    setMessage(prev => prev + template.content)
    setShowTemplates(false)
  }

  return (
    <div className="border-t bg-white p-4">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-100 rounded px-3 py-1"
            >
              <DocumentIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm truncate max-w-xs">{file.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick reply templates */}
      {showTemplates && (
        <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border p-2 max-h-60 overflow-y-auto">
          {quickReplyTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
            >
              <p className="font-medium">{template.title}</p>
              <p className="text-sm text-gray-500 truncate">{template.content}</p>
            </button>
          ))}
        </div>
      )}

      {/* Message composer */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPaste={handlePaste}
            onDrop={handleDrop}
            placeholder="Type a message..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
            rows={1}
            disabled={disabled}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <PaperClipIcon className="h-6 w-6" />
        </button>

        <button
          type="submit"
          disabled={disabled || (!message.trim() && attachments.length === 0)}
          className="p-2 text-white bg-primary rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  )
}