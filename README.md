# PollyGlot 🌍

A modern, AI-powered translation application built with Next.js and OpenAI. PollyGlot allows users to translate text between English and multiple languages (French, Spanish, and Japanese) with a clean, intuitive interface.

## 📖 Background

PollyGlot was created as the final project for the [Scrimba "Intro to AI Engineering" course](https://scrimba.com/intro-to-ai-engineering-c032). The project demonstrates practical implementation of AI APIs in a real-world application, showcasing modern web development practices and AI integration.

The application design was inspired by the [Figma design template](https://www.figma.com/design/5zQQiaSDdUu8AqVGlg9PZ3/OpenAi-API---PollyGlot?node-id=1-168&t=gAtcdUPxEQIq8Fqc-0) provided for the course.

## ✨ Features

- **Multi-language Translation**: Translate text from English to French, Spanish, or Japanese
- **AI-Powered**: Uses OpenAI's GPT-4.1 model for accurate translations
- **Content Moderation**: Built-in content filtering to ensure appropriate translations
- **Rate Limiting**: Server-side rate limiting to prevent API abuse and ensure fair usage
- **Input Validation**: Comprehensive validation for translation requests with proper error handling
- **Modern UI**: Clean, responsive design with smooth transitions
- **Real-time Feedback**: Loading states and error handling for better user experience
- **Type Safety**: Built with TypeScript for enhanced development experience

## 🛠️ Technologies Used

### Core Technologies

- **Next.js 15.4.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **OpenAI API** - AI-powered translation service

### Development Tools

- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

### Styling

- **CSS Modules** - Scoped styling
- **Custom CSS** - Tailored design system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pollyglot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
pollyglot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── translate/
│   │   │       └── route.ts          # Translation API endpoint
│   │   ├── components/
│   │   │   ├── __tests__/            # Component tests
│   │   │   ├── styles/               # CSS modules
│   │   │   ├── Header.tsx            # Application header
│   │   │   ├── TranslateForm.tsx     # Translation form
│   │   │   ├── ResultsView.tsx       # Results display
│   │   │   └── Button.tsx            # Reusable button component
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main application page
│   └── utils/
│       ├── rateLimiter.ts            # Rate limiting utilities
│       ├── serverRateLimiter.ts      # Server-side rate limiting
│       └── validation.ts             # Input validation utilities
├── public/
│   └── flags/                        # Language flag images
├── API_SETUP.md                      # API configuration guide
└── package.json                      # Dependencies and scripts
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 🔧 API Configuration

The application uses OpenAI's API for translations. See [API_SETUP.md](./API_SETUP.md) for detailed configuration instructions and alternative translation service options.

### Key Features of the API Implementation:

- **Content Moderation**: All text is checked for inappropriate content before translation
- **Rate Limiting**: Server-side rate limiting prevents API abuse and ensures fair usage
- **Input Validation**: Comprehensive validation for translation requests with proper error handling
- **Error Handling**: Comprehensive error handling for API failures
- **Security**: API keys are kept secure on the server side
- **Flexibility**: Easy to switch between different translation services

## 🎨 Design

The application features a clean, modern design with:

- Responsive layout that works on desktop and mobile
- Smooth transitions between form and results views
- Loading states and error feedback
- Language-specific flag icons
- Intuitive user interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes as part of the Scrimba "Intro to AI Engineering" course.

## 🙏 Acknowledgments

- [Scrimba](https://scrimba.com) for the excellent course content
- [OpenAI](https://openai.com) for providing the AI translation capabilities
- [Next.js](https://nextjs.org) team for the amazing React framework

---

**Note**: This project is for educational purposes. For production use, consider implementing additional security measures beyond the current rate limiting and validation features.
