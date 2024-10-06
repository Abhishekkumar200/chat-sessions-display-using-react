import React, { useContext } from 'react';
import SessionContext from '../context/sessions/SessionContext';

const Home = () => {
  // Example of one chat session with messages
  const { chats } = useContext(SessionContext);


  return (
    <div className="container mx-auto py-2 px-6">
        <div className="flex justify-center text-slate-500 text-xl font-semibold mb-6">{chats.name}</div>
        <div className="messages space-y-4">
           {chats ?
          chats.messages
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sort messages by timestamp
            .map(message => (
              <div
                key={message.id}
                className={`flex ${message.action === 'USER' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-4 shadow-md ${
                    message.action === 'USER'
                      ? 'bg-blue-950 text-left text-white rounded-tr-xl rounded-br-xl rounded-bl-xl'
                      : 'bg-indigo-900 text-right text-white rounded-tl-xl rounded-br-xl rounded-bl-xl'
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs text-gray-300 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
            : <div className='text-slate-400 text-xl font-bold text-center'>Click on any Session to show chats.</div>}
            
        </div>
      </div>
  );
};

export default Home;
