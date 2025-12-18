import React from 'react';
import ChatBot from '../../components/Chatbot/ChatBot';

function ChatBotPage() {
  // Fonction simple pour log l'entrée utilisateur (prêt pour ajout API)
  const handleSendMessage = (message) => {
    console.log('Message utilisateur:', message);
    // Ici, tu pourras facilement ajouter un appel API plus tard
  };

  return (
    <div className="h-screen">
      <ChatBot 
        onSendMessage={handleSendMessage}
        initialMessage="BIENVENUE"
        title=""
      />
    </div>
  );
}

export default ChatBotPage;