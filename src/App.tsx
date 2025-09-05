import React, { useEffect, useState } from "react";
import "./App.css";

interface Quote {
  content: string;
  author: string;
}

export default function App() {
  const [quote, setQuote] = useState<Quote | null>(null);

  // Local fallback quotes
  const localQuotes: Quote[] = [
    { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { content: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
    { content: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  ];

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) throw new Error("API failed");
      const data = await response.json();

      // pick random quote
      const random = data[Math.floor(Math.random() * data.length)];
      setQuote({
        content: random.text,
        author: random.author || "Unknown",
      });
    } catch (error) {
      console.error("API failed, using local fallback:", error);
      const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
      setQuote(random);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app">
      <div className="quote-box">
        <h2>✨ Random Quote Generator ✨</h2>
        {quote ? (
          <>
            <p className="quote">“{quote.content}”</p>
            <p className="author">— {quote.author}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="buttons">
          <button onClick={fetchQuote}>New Quote</button>
          {quote && (
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `"${quote.content}" — ${quote.author}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="tweet">Tweet 🐦</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
