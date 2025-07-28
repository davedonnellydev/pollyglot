# Translation API Setup Guide

## Environment Variables

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add your API configuration:

```env
# Translation API Configuration
TRANSLATION_API_KEY=your_actual_api_key_here
TRANSLATION_API_URL=https://your-translation-api-endpoint.com/translate
```

## Popular Translation APIs

### Google Cloud Translation API

```env
TRANSLATION_API_KEY=your_google_api_key
TRANSLATION_API_URL=https://translation.googleapis.com/language/translate/v2
```

### DeepL API

```env
TRANSLATION_API_KEY=your_deepl_api_key
TRANSLATION_API_URL=https://api-free.deepl.com/v2/translate
```

### Microsoft Translator

```env
TRANSLATION_API_KEY=your_microsoft_api_key
TRANSLATION_API_URL=https://api.cognitive.microsofttranslator.com/translate
```

## Security Notes

- ✅ `.env.local` is automatically ignored by git
- ✅ API keys are never exposed to the client
- ✅ All API calls go through secure server-side routes
- ✅ Environment variables are only accessible on the server

## Testing the API

1. Start the development server: `npm run dev`
2. Enter text in the form
3. Select a language
4. Click "Translate"

## Troubleshooting

- Make sure your API key is valid
- Check that the API URL is correct
- Verify the API response format matches the expected structure
- Check the browser console and server logs for errors
