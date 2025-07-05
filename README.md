# 🚀 GrowthPro - Local Business Dashboard

A modern, responsive business analytics dashboard that provides instant insights for local businesses including ratings, reviews, and SEO-optimized headlines.

![GrowthPro Dashboard](https://via.placeholder.com/800x400/6366f1/ffffff?text=GrowthPro+Business+Dashboard)

## ✨ Features

- **📊 Business Analytics**: Get instant ratings and review counts
- **🎯 SEO Headlines**: AI-generated, optimized headlines for your business
- **🔄 Dynamic Content**: Regenerate headlines with a single click
- **📱 Responsive Design**: Beautiful interface that works on all devices
- **⚡ Real-time Feedback**: Loading states and error handling
- **✅ Form Validation**: Smart input validation with helpful error messages

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Shadcn/ui** for components

### Backend Simulation
- Mock API services with realistic data
- Simulated network delays
- Error handling and recovery

## 🎨 Design System

The dashboard uses a custom design system with:
- **Purple gradient theme** (`--primary: 262 83% 58%`)
- **Semantic color tokens** for consistency
- **Smooth transitions** and animations
- **Mobile-first responsive design**
- **Accessible components**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd growthpro-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## 📖 Usage

1. **Enter Business Details**: Fill in your business name and location
2. **Get Analytics**: Click "Get Business Insights" to fetch data
3. **View Results**: See your rating, review count, and SEO headline
4. **Regenerate Headlines**: Click "Regenerate" to get new headline variations

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/ui components
│   ├── BusinessForm.tsx    # Business input form
│   └── BusinessCard.tsx    # Results display card
├── services/
│   └── mockApi.ts         # Simulated backend API
├── pages/
│   └── Index.tsx          # Main dashboard page
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
└── index.css             # Design system & styles
```

## 🎯 API Simulation

The app simulates a full-stack experience with:

### POST /business-data
Accepts business name and location, returns:
```json
{
  "name": "Coffee Shop",
  "location": "New York, NY",
  "rating": 4.3,
  "reviews": 127,
  "headline": "Top-Rated Coffee Shop in New York, NY | 127 Reviews & 4.3-Star Service"
}
```

### GET /regenerate-headline
Returns new randomized headlines using the same business data.

## 🎨 Customization

### Colors
Update design tokens in `src/index.css`:
```css
:root {
  --primary: 262 83% 58%;      /* Main brand color */
  --primary-glow: 262 83% 68%; /* Hover states */
  --accent: 142 76% 36%;       /* Success color */
}
```

### Components
All components use the design system and can be customized via:
- Tailwind classes using semantic tokens
- Component variants in shadcn/ui components
- CSS custom properties

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: Two-column layout with optimized spacing  
- **Desktop**: Side-by-side form and results layout

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

### Recommended Platforms
- **Vercel** - Zero config deployment
- **Netlify** - Easy drag & drop
- **GitHub Pages** - Free hosting for open source

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the component system
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Built with ❤️ for local businesses everywhere**