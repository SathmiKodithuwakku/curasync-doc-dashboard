'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface TimelineTile {
  id: string
  title: string
  date: string
  description: string
  fullDescription?: string
  icon?: string
  attachments?: {
    name: string
    url: string
  }[]
  metadata?: Record<string, string>
}

interface HorizontalTimelineProps {
  tiles: TimelineTile[]
  onTileClick?: (tile: TimelineTile) => void
}

export default function HorizontalTimeline({ tiles, onTileClick }: HorizontalTimelineProps) {
  const [expandedTile, setExpandedTile] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (!timelineRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth)
    }

    checkScroll()
    timelineRef.current?.addEventListener('scroll', checkScroll)
    return () => timelineRef.current?.removeEventListener('scroll', checkScroll)
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return
    const scrollAmount = 300
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount
    
    timelineRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    setScrollPosition(newPosition)
  }

  const handleTileClick = (tileId: string, tile: TimelineTile) => {
    setExpandedTile(expandedTile === tileId ? null : tileId)
    onTileClick?.(tile)
  }

  const handleKeyPress = (event: React.KeyboardEvent, tileId: string, tile: TimelineTile) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleTileClick(tileId, tile)
    }
  }

  return (
    <div className="relative w-full py-10">
      {/* Center line */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />

      {/* Navigation arrows */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      )}

      {/* Timeline container */}
      <div
        ref={timelineRef}
        className="overflow-x-auto scrollbar-hide relative mx-12"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex items-center min-w-max px-4 space-x-16">
          {tiles.map((tile, index) => (
            <div
              key={tile.id}
              className={`relative ${index % 2 === 0 ? '-translate-y-1/2 top-0' : 'translate-y-1/2 bottom-0'}`}
            >
              {/* Connection line to center thread */}
              <div 
                className={`absolute left-1/2 w-0.5 bg-gray-200 ${
                  index % 2 === 0 ? 'top-full' : 'bottom-full'
                }`} 
                style={{ height: '40px' }}
              />

              {/* Date dot on the center line */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm" style={{ 
                [index % 2 === 0 ? 'top' : 'bottom']: 'calc(100% + 40px)' 
              }} />

              {/* Tile content */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleTileClick(tile.id, tile)}
                onKeyDown={(e) => handleKeyPress(e, tile.id, tile)}
                className={`w-[200px] ${
                  expandedTile === tile.id ? 'h-auto' : 'h-[100px]'
                } bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <div className="p-4">
                  {tile.icon && (
                    <div className="mb-2">
                      <img src={tile.icon} alt="" className="w-6 h-6" />
                    </div>
                  )}
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{tile.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{tile.date}</p>
                  <p className={`text-sm text-gray-600 ${
                    expandedTile === tile.id ? '' : 'line-clamp-3'
                  }`}>
                    {expandedTile === tile.id && tile.fullDescription 
                      ? tile.fullDescription 
                      : tile.description}
                  </p>

                  {/* Expanded content */}
                  {expandedTile === tile.id && (
                    <div className="mt-4 space-y-4 animate-fadeIn">
                      {tile.attachments && tile.attachments.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {tile.attachments.map((attachment, i) => (
                              <a
                                key={i}
                                href={attachment.url}
                                className="block text-sm text-primary hover:text-primary/80"
                              >
                                {attachment.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {tile.metadata && Object.keys(tile.metadata).length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Additional Information</h4>
                          <dl className="space-y-1">
                            {Object.entries(tile.metadata).map(([key, value]) => (
                              <div key={key} className="grid grid-cols-2 text-sm">
                                <dt className="text-gray-500">{key}:</dt>
                                <dd className="text-gray-900">{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}