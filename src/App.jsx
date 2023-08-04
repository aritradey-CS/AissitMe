import React, { useState } from 'react';
import './styles.css';
import spacyNlp from 'spacy-nlp'; // Import the spaCy NLP library

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'User', message: userInput },
    ]);

    getChatbotResponse(userInput);
    setUserInput('');
  };

  const getChatbotResponse = (userInput) => {
    // Process the user input with spaCy NLP using the custom Promise wrapper
    nlpProcess(userInput)
      .then((doc) => {
        // Extract relevant information from the spaCy doc object
        // For example, you can extract intents, entities, or context from the doc object.
        // Then, generate appropriate chatbot responses based on the extracted information.

        // For this simple example, let's reply with a predefined response.
        const chatbotResponse = 'Thanks for your message: ' + userInput;
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: 'Chatbot', message: chatbotResponse },
        ]);
      })
      .catch((error) => {
        console.error('Error processing user input with spaCy:', error);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: 'Chatbot', message: 'Oops! Something went wrong.' },
        ]);
      });
  };

  // Custom Promise wrapper for spaCy processing
  const nlpProcess = (text) => {
    return new Promise((resolve, reject) => {
      spacyNlp
        .load('en_core_web_sm')
        .then((model) => model(text))
        .then((doc) => {
          resolve(doc);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`${chat.sender.toLowerCase()}-message`}>
            {chat.sender}: {chat.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
