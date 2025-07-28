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

### A word on using Cursor

This is my first experience using Cursor as an IDE. As a frontend dev still learning the ropes, I generally try to follow the 'try first, then ask' rule, where I'll struggle with a problem for 20-30 mins and if I still can't figure it out by then, I'll then ask for help. Up until this point, I'd usually ask google (which sometimes has it's own form of AI response built in), or I'd go to ChatGPT and give a full explanation of the context, and then try and get it to help me figure out the problem and I'd update certain things in my code manually to get it to work. More recently, I'd started using Copilot in VS Code to help diagnose issues, but would always implement the suggested solution manually myself. 

I wanted to get this project up and running quickly, I wanted to explore a little more deeply the best practices around AI safety and, to be honest, I'd also been recommended Cursor a few times and just wanted to see what Cursor could do. Scrimba's AI course gave some good resources on AI safety like [OpenAI's safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) and [this youtube video as an Intro to AI safety](https://www.youtube.com/watch?v=pYXy-A4siMw) by Robert Miles but when you've never implemented an app which can use your token to call an AI-based API, you want to make sure all the basics in AI safety are covered before pushing that out into the real world. I used Cursor in this project in the following ways:

- **Testing**: Ensuring there was a comprehensive set of unit tests for the components
- **API Security**: Outlining a secure way of calling the OpenAI API (using the OpenAI API key) by first creating an API route I can call on the client-side using [Next.js's Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware). Then, that route will call the OpenAI API server-side, using the environment variables to store the API key. With this abstraction in place, I then used Cursor to help me implement things like:
   - Moderation checking using OpenAI's moderation endpoint,
   - Request rate limiting - both client-side using browser storage, and server-side by storing IP addresses to count requests, and
   - Input validation to ensure the input is free of spam or suspicious patterns like `<script>` keywords, is not too long and therefore using up large swathes of credits in OpenAI, and is not empty.
- **Readme rewrite**: Cursor was able to reference the standard formatting for README files on Github and use that to write this project's readme based on what I summarised of the history and purpose of the project, along with what it knew of the technologies and features inside.
- **Problem solving**: There were a few problems I came across that I didn't know how to solve, and googling the errors didn't help. Since Cursor had the context of my entire project, it could search through the files, get an understanding of failure points (up to a point) and not only suggest solutions, but write them into my code and wait for me to approve them. It helped with errors like:
   - An issue which prevented the app from being built on the Netlify server - the header component file was renamed from 'header.tsx' to 'Header.tsx'. Git on MacOS is case-insensitive by default and so was not detecting that there was a change to the filename or pushing that updated filename back to the repo. Netlify's linux-based environment is case-sensitive, so it could not find the 'Header.tsx' file, because it was still 'header.tsx' in the repo. Updating this file name via the CLI resolved the issue.
   - An error that was occuring with one of the chosen fonts in the original design - the font was from Google Fonts, but didn't seem to be importing properly when the font was imported from 'next/fonts/google'. Ultimately, Cursor suggested using a more 'well-supported' font, Inter. Essentially, it didn't resolve the issue (seems there might be a problem with that specific font in the next/fonts/google package, which is out of it's scope to resolve) but did suggest an alternative direction and since I wasn't wedded to the font, I was happy to accept that as a solution.

With every change I accepted from Cursor, I made sure I understood the syntax Cursor used as well as the underlying reasons for the change.

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
- [Cursor](https://cursor.com) used to troubleshoot the variety of issues that arose throughout the project!

---

**Note**: This project is for educational purposes. For production use, consider implementing additional security measures beyond the current rate limiting and validation features.
