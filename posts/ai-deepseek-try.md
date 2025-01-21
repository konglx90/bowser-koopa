---
title: "Experience AI conversations using deepseek's API and Vercel AI SDK"
date: '2025-01-20'
---

To create an AI-powered chat application using **Vercel AI SDK** and the **DeepSeek API**, you can follow these steps. This setup will allow you to integrate DeepSeek's AI capabilities into a chat interface.

---

### **Prerequisites**
1. **Node.js** installed on your machine.
2. A **DeepSeek API key** (sign up on DeepSeek's platform to get one).

---

### **Step 1: Set Up a Next.js Project**
1. Create a new Next.js project:
   ```bash
   npx create-next-app@latest ai-chat-app
   cd ai-chat-app
   ```

2. Install the required dependencies:
   ```bash
   pnpm add ai @ai-sdk/openai zod
   ```

---

### **Step 2: Configure the DeepSeek API**
1. Create a `.env.local` file in the root of your project and add your DeepSeek API key:
   ```env
   DEEPSEEK_API_KEY=your_api_key_here
   ```

2. Create a Route Handler (`app/api/chat/route.ts`) and add the following code:
   ```javascript
    import { createOpenAI } from '@ai-sdk/openai';
    import { streamText } from 'ai';

    // Allow streaming responses up to 30 seconds
    export const maxDuration = 30;

    const model = 'deepseek-chat';
    const apiKey = process.env.DEEPSEEK_API_KEY;

    const openai = createOpenAI({
      baseURL: 'https://api.deepseek.com/beta',
      apiKey,
    });

    export async function POST(req: Request) {
      const { messages } = await req.json();

      const result = streamText({
        model: openai(model),
        system: 'you are a helpful assistant, but answer only "YES" or "NO", with no other words, and if question has answer, answer "HAHA"',
        messages,
      });

      return result.toDataStreamResponse();
    }
   ```

---

### **Step 3: Create the Chat Interface**
1. Update the `pages/live/deepseek.tsx` file to include the chat interface:
   ```javascript
   import { useState } from 'react';
   import { useChat } from 'ai/react';

   export default function DeepSeek() {
     const { messages, input, handleInputChange, handleSubmit } = useChat({
       api: '/api/chat', // This is the default API route for the chat interface
     });

     return (
       <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
         <h1>AI Chat with DeepSeek</h1>
         <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
           {messages.map((message, index) => (
             <div key={index} style={{ marginBottom: '10px' }}>
               <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
               {message.content}
             </div>
           ))}
         </div>
         <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
           <input
             type="text"
             value={input}
             onChange={handleInputChange}
             placeholder="Type your message..."
             style={{ width: '100%', padding: '10px' }}
           />
           <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
             Send
           </button>
         </form>
       </div>
     );
   }
   ```

---

### **Step 4: Run the Application**
1. Start the development server:
   ```bash
   pnpm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000/live/deepseek`. You should see the chat interface.

3. look here!

![运行图](/assets/blog/ai-deepseek-try/deepseek.png)
---

### **Notes**
- Replace `deepseek-chat` with the actual model name provided by DeepSeek.
- Ensure the DeepSeek API is compatible with the OpenAI SDK or adjust the API calls accordingly.
- Add error handling and loading states for a better user experience.

Let me know if you need further assistance! 🚀