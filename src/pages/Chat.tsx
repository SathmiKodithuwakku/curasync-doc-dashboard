import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Patient } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'doctor' | 'patient';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

export default function Chat() {
  const { patientId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ready above medication list',
      sender: 'patient',
      timestamp: '12:04',
      status: 'read'
    },
    {
      id: '2',
      text: 'Let you know when ready.',
      sender: 'doctor',
      timestamp: '12:10',
      status: 'read'
    }
  ]);

  // Simulated patient data - in real app, fetch this based on patientId
  const patient: Patient = {
    visitNo: `#${patientId}`,
    patientName: 'Nina Conner',
    patientNumber: '4782640981',
    gender: 'Female',
    lastVisit: '04/10/2023',
    timeOfVisit: '02:00pm',
    reason: 'Monthly checkup',
    status: 'online'
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'doctor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setShowEmoji(false);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
    // Simulate stop typing after 1 second
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Enhanced Chat Header */}
      <div className="bg-[#B3E5FC] p-4 shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={`https://ui-avatars.com/api/?name=${patient.patientName}`}
              alt={patient.patientName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-800">{patient.patientName}</h2>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${patient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <p className="text-sm text-gray-600">{patient.status === 'online' ? 'Online' : 'Offline'}</p>
                {isTyping && <p className="text-sm text-gray-600">typing...</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === 'doctor'
                  ? 'bg-[#B3E5FC] text-gray-800 rounded-br-none'
                  : 'bg-[#FFE0E6] text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <p className="text-xs text-gray-500">{message.timestamp}</p>
                {message.sender === 'doctor' && (
                  <span className="text-xs text-gray-500">
                    {message.status === 'sent' && '✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'read' && <span className="text-blue-500">✓✓</span>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Message Input */}
      <form onSubmit={handleSendMessage} className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="text-gray-500 hover:text-primary"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-full p-2 hover:bg-primary/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}