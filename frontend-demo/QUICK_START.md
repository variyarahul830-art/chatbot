# 🚀 Quick Start Guide

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
cd frontend-demo
npm install
```

### 2. Configure Backend
Create `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. See the Widget
- **Landing Page**: Full RAG chatbot landing page with hero, features, why RAG section
- **Chat Widget**: Floating button in bottom-right corner
  - Click to open/close
  - Try example prompts
  - Send messages (requires backend running)

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.jsx` | Landing page (Hero + Sections) |
| `app/components/ChatWidget.jsx` | Floating button & animations |
| `app/components/ChatBox.jsx` | Chat state & logic |
| `app/components/ChatHeader.jsx` | Status indicator |
| `app/components/ChatMessage.jsx` | Message animations |
| `app/components/ChatInput.jsx` | Input + send |
| `app/globals.css` | All styling & variables |

---

## 🎨 Customization

### Change Widget Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #your-color;           /* Main color */
  --user-bubble: #your-color;       /* User messages */
  --bot-bubble: #your-light-color;  /* Bot messages */
}
```

### Change Widget Size
```css
.chat-box {
  width: 400px;   /* Default: 350px */
  height: 600px;  /* Default: 500px */
}

.chat-toggle-btn {
  width: 70px;    /* Default: 60px */
  height: 70px;
}
```

### Customize Welcome Prompts
Edit `app/components/ChatBox.jsx`:
```jsx
const EXAMPLE_PROMPTS = [
  "Your custom question?",
  "Another question?",
  "More prompts...",
  "Keep going...",
];
```

---

## 🔌 Backend Integration

### Expected API Endpoint
```
POST /api/chat
```

### Request
```json
{
  "message": "What's the refund policy?"
}
```

### Response
```json
{
  "response": "According to your documents: ..."
}
```

### Python Example (FastAPI)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat(data: dict):
    user_message = data.get("message")
    # Your RAG logic here
    response = await your_rag_function(user_message)
    return {"response": response}
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
npm install -g vercel
vercel
```

---

## 🎯 Testing Checklist

- [ ] Widget opens/closes smoothly
- [ ] Animations are smooth (60fps)
- [ ] Messages appear and animate in
- [ ] Example prompts work
- [ ] Send button sends message
- [ ] Status indicator shows "Typing..."
- [ ] Chat history saves
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Keyboard navigation works

---

## 🐛 Troubleshooting

### "Failed to connect to server"
- [ ] Is backend running?
- [ ] Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- [ ] Check CORS headers

### Messages not saving
- [ ] Check localStorage is enabled
- [ ] Check DevTools → Application → Storage

### Animations are choppy
- [ ] Check browser performance (DevTools → Performance)
- [ ] Reduce other browser tabs
- [ ] Check GPU acceleration is enabled

### Dark mode not working
- [ ] Check system theme settings
- [ ] Browser might need restart

---

## 📚 Documentation

- **Full Guide**: `LANDING_PAGE.md`
- **Design Changes**: `UI_UX_IMPROVEMENTS.md`
- **Before/After**: `WIDGET_BEFORE_AFTER.md`
- **Backend Info**: `BACKEND_INTEGRATION.md`

---

## ✨ Features Enabled

✅ Floating chat widget
✅ Example prompts
✅ Status indicator (online/typing)
✅ Message animations
✅ Dark/light mode
✅ Keyboard support
✅ Chat history
✅ Accessibility (ARIA)
✅ Responsive design
✅ Landing page with RAG sections

---

## 🎬 Next Steps

1. **Backend**: Setup your RAG backend to handle `/api/chat`
2. **Customization**: Update colors, prompts, size to match your brand
3. **Deployment**: Deploy frontend to Vercel, backend to your server
4. **Enhancement**: Add file upload, document preview, ratings

---

**Happy shipping! 🚀**
