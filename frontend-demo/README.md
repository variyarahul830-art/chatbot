# Demo Frontend - AI Assistant Chat Widget

A modern Next.js frontend with a floating AI assistant chat widget. This demo website showcases how to integrate an intelligent chatbot interface into any website.

## Features

- 🤖 **Floating AI Assistant Widget** - Small circle button in bottom-right corner
- 💬 **Real-time Chat Interface** - Communicate with backend AI service
- 💾 **Chat History** - Automatically saves conversations in browser storage
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Fast & Lightweight** - Built with Next.js for optimal performance
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- ✨ **Framer Motion Animations** - Smooth widget, message, and interaction transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file (already included)
# Update NEXT_PUBLIC_BACKEND_URL if your backend is on a different server
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Configuration

Edit [.env.local](.env.local) to configure:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Change `http://localhost:8000` to your actual backend URL.

## Backend Integration

The chat widget communicates with your backend via the `/api/chat` endpoint.

### Expected Backend API

**Endpoint:** `POST /api/chat`

**Request Body:**
```json
{
  "message": "user message here",
  "session_id": "optional-session-id"
}
```

**Response Body:**
```json
{
  "response": "AI response message here"
}
```

Example backend route (FastAPI):

```python
@app.post("/api/chat")
async def chat(request: dict):
    user_message = request.get("message")
    # Process message with your LLM
    response = await llm_service.generate_response(user_message)
    return {"response": response}
```

## Project Structure

```
frontend-demo/
├── app/
│   ├── components/
│   │   ├── ChatWidget.jsx      # Floating button + open/close behavior
│   │   ├── ChatBox.jsx         # Chat state + message flow
│   │   ├── ChatHeader.jsx      # Header and status UI
│   │   ├── ChatMessage.jsx     # Animated message bubble
│   │   └── ChatInput.jsx       # Sticky input + send action
│   ├── services/
│   │   └── chatService.js      # Backend API calls
│   ├── globals.css             # Styling
│   ├── layout.jsx              # Root layout
│   └── page.jsx                # Home page
├── public/                     # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── .env.local                  # Environment variables
```

## Component Details

### ChatWidget.jsx
- Manages floating button and animated open/close transitions

### ChatBox.jsx
- Handles message state, API integration, typing state, and history persistence

### ChatHeader.jsx / ChatMessage.jsx / ChatInput.jsx
- Split UI into reusable pieces for easier maintenance and extension

### chatService.js
- `sendMessage()` - Sends message to backend and gets response
- `saveChatHistory()` - Saves messages to localStorage
- `loadChatHistory()` - Loads previous conversations
- `clearChatHistory()` - Clears all saved messages

## Features Explained

### Floating Chat Widget
- Always visible in bottom-right corner
- Click the 💬 circle to open chat
- Click ✕ to close chat

### Chat History
- Automatically saves all conversations to browser storage
- Persists across page refreshes
- Each message includes timestamp

### Error Handling
- Displays error messages if backend is unavailable
- Shows loading indicator while waiting for response
- Graceful error recovery

### Responsive Design
- Full-screen on mobile devices
- Optimized for all screen sizes
- Touch-friendly interface

## Customization

### Change Colors

Edit [app/globals.css](app/globals.css) to modify the gradient colors:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Widget Icon

Edit [app/components/ChatWidget.jsx](app/components/ChatWidget.jsx):

```jsx
<button className="chat-toggle-btn">
  💬 {/* Change this emoji */}
</button>
```

### Change Widget Size

Edit [app/globals.css](app/globals.css):

```css
.chat-toggle-btn {
  width: 60px;    /* Adjust size */
  height: 60px;
}
```

## Testing

1. Start backend: `cd ../backend && python -m uvicorn main:app --reload`
2. Start frontend: `npm run dev`
3. Open `http://localhost:3000`
4. Click the chat button and send a message
5. Check browser console (F12) for any errors

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Create `.env.local` with your production backend URL:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-api.com
```

## Troubleshooting

### Chat not connecting to backend
- Check backend URL in `.env.local`
- Ensure backend is running and accessible
- Check browser console (F12) for CORS errors
- Verify backend `/api/chat` endpoint exists

### Chat history not saving
- Check browser localStorage (DevTools → Application → Storage)
- Clear browser cache and try again
- Check browser console for errors

### Styling issues
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run dev`

## License

MIT License - feel free to use this project as a template for your own applications.

## Support

For issues or questions about integrating this widget, refer to the backend implementation or modify `chatService.js` to match your API structure.
