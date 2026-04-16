# AI RAG Chatbot Landing Page & Widget

A modern, production-ready Next.js landing page and AI chatbot widget for Retrieval-Augmented Generation (RAG) systems. Built with Framer Motion animations, accessible components, and a professional SaaS design.

## ✨ Features

### Landing Page
- **Hero Section** - Eye-catching headline with chat preview mockup
- **How It Works** - 4-step process visualization (Upload → Process → Retrieve → Answer)
- **Features** - 6 product-specific features with hover animations
- **Why RAG?** - Educational section explaining RAG benefits vs traditional LLM
- **Security** - Trust and compliance messaging (SOC 2, encryption, data privacy)
- **CTA Section** - Final call-to-action with social proof

### Chat Widget
- 🎯 **Floating button** with icon toggle (chat ↔ close icon)
- 💬 **Animated chat window** with scale + fade transitions
- 📊 **Live status indicator** (Online/Typing with pulsing dot)
- 🧠 **Smart message animations** - Messages slide in from their origin side
- ⌨️ **Keyboard support** - Enter to send, Shift+Enter for new lines
- 💾 **Chat history** - Auto-saves to localStorage
- 🎨 **Dark/Light mode** - Automatic theme detection
- ♿ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- 📱 **Responsive** - Mobile-first design, full-screen on small devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18
- **Animation**: Framer Motion
- **Styling**: CSS3 with CSS variables (no Tailwind)
- **Icons**: Inline SVG
- **State**: React hooks
- **Storage**: localStorage

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## 🗂️ Project Structure

```
app/
├── components/
│   ├── ChatWidget.jsx          # Floating button + open/close
│   ├── ChatBox.jsx             # Chat state & message flow
│   ├── ChatHeader.jsx          # Header with status
│   ├── ChatMessage.jsx         # Individual message with animation
│   ├── ChatInput.jsx           # Input box with send button
│   ├── HeroSection.jsx         # Hero with chat preview
│   ├── HowItWorks.jsx          # 4-step process
│   ├── FeaturesSection.jsx     # 6 product features
│   ├── WhyRAGSection.jsx       # RAG benefits
│   ├── SecuritySection.jsx     # Trust & security
│   └── CTASection.jsx          # Final CTA
├── services/
│   └── chatService.js          # Backend API integration
├── globals.css                 # Global styles & design tokens
├── layout.jsx                  # Root layout
└── page.jsx                    # Home page (landing page)
```

## 🎨 Design System

### Color Palette
- **Primary**: #4f46e5 (Indigo) - Interactive elements
- **Surface**: #ffffff (white, #111827 dark)
- **Text Primary**: #0f172a (almost black)
- **Text Secondary**: #475569 (slate gray)
- **Success**: #22c55e (green)
- **Error**: #991b1b (dark red)

### Spacing Scale
8px incremental (0.5rem, 1rem, 1.5rem, 2rem, 3rem, etc.)

### Shadow Scale
Used for depth and elevation:
- Small: `0 4px 12px rgba(0, 0, 0, 0.2)`
- Large: `0 20px 45px rgba(15, 23, 42, 0.22)`

### Typography
- **Font**: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Body**: 16px, 1.55 line-height
- **Headings**: 700-800 weight

## 🎯 Animation Principles

All animations use Framer Motion with these principles:

1. **Duration**: 150-300ms for micro-interactions, 400-600ms for complex transitions
2. **Easing**: `easeOut` for entering, `easeIn` for exiting
3. **Purpose**: Every animation conveys meaning (slide direction, scale = emphasis)
4. **Performance**: Uses `transform` and `opacity` only (GPU-accelerated)
5. **Accessibility**: Respects `prefers-reduced-motion`

## 🔗 Backend Integration

The chat widget communicates via `POST /api/chat`:

### Request
```json
{
  "message": "What's the refund policy?",
  "session_id": "optional-id"
}
```

### Response
```json
{
  "response": "According to your documents: ...",
  "sources": ["document1.pdf"]
}
```

## 🧪 Example Flow

1. User clicks the chat button → Widget opens with scale + fade animation
2. Empty state shows welcome message
3. User types → Input field has focus ring
4. User clicks Send → User message animates from right, slides in
5. Widget shows "Typing..." status
6. Bot response animates from left with fade + slide
7. Conversation saved to localStorage
8. User can close widget → Closes with reverse animation

## ✅ Accessibility Features

- ♿ **ARIA Labels**: All interactive elements have descriptive labels
- ⌨️ **Keyboard Navigation**: Tab through buttons, Enter to send
- 🎨 **Color Contrast**: 4.5:1+ ratio (WCAG AA)
- 📱 **Screen Reader Support**: Semantic HTML + aria-live regions
- 🎬 **Reduced Motion**: Animations disabled if `prefers-reduced-motion` is set
- 🔤 **Text Sizing**: Supports system text scaling

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (full-screen widget, stacked layout)
- **Tablet**: 641px - 1024px (multi-column grid)
- **Desktop**: > 1024px (full 2-column hero, 3-column features)

## 🌙 Dark Mode

Automatically detects system preference (`prefers-color-scheme: dark`). All colors use CSS variables for seamless switching.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📖 Usage Examples

### Custom Chat Widget Integration

```jsx
import ChatWidget from '@/app/components/ChatWidget';

export default function MyPage() {
  return (
    <>
      <main>Your content here</main>
      <ChatWidget />
    </>
  );
}
```

### Customize Colors

Edit `app/globals.css`:

```css
:root {
  --primary: #your-color;
  --user-bubble: #your-color;
  /* ... other colors */
}
```

### Customize Widget Size

```css
.chat-box {
  width: 400px;  /* Change width */
  height: 600px; /* Change height */
}

.chat-toggle-btn {
  width: 70px;  /* Larger button */
  height: 70px;
}
```

## 🐛 Troubleshooting

### Chat not connecting
- Check backend URL in `.env.local`
- Verify CORS headers from backend
- Check browser console for errors

### Animations jerky
- Check browser performance (Chrome DevTools → Performance)
- Ensure hardware acceleration is enabled
- Reduce motion complexity if on older devices

### Messages not saving
- Check localStorage is enabled
- Check browser DevTools → Application → Storage
- Clear cache and try again

### Dark mode not working
- Verify browser supports `prefers-color-scheme`
- Check system theme settings

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Docs](https://nextjs.org/docs)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 📄 License

MIT - Free to use and modify

## 🤝 Contributing

Feel free to fork and submit PRs! Areas for contribution:
- Additional animation patterns
- More UI themes
- Enhanced accessibility features
- Performance optimizations

## 📧 Support

For issues or feature requests, please open a GitHub issue or contact support.

---

**Built with ❤️ for better AI experiences**
