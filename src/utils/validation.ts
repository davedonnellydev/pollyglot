export class InputValidator {
  static readonly MAX_TEXT_LENGTH = 2000; // Reduced for portfolio
  static readonly VALID_LANGUAGES = ["fr", "es", "jp"];

  static validateText(text: string): { isValid: boolean; error?: string } {
    if (!text || text.trim().length === 0) {
      return { isValid: false, error: "Please enter some text to translate" };
    }

    if (text.length > this.MAX_TEXT_LENGTH) {
      return {
        isValid: false,
        error: `Text too long. Maximum ${this.MAX_TEXT_LENGTH} characters allowed.`,
      };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
      /javascript:/gi, // JavaScript protocol
      /on\w+\s*=/gi, // Event handlers
      /data:text\/html/gi, // Data URLs
      /vbscript:/gi, // VBScript
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(text)) {
        return {
          isValid: false,
          error: "Potentially malicious content detected",
        };
      }
    }

    // Check for spam patterns
    const spamPatterns = [
      /\b(spam|viagra|casino|poker|bet)\b/gi,
      /(http|https):\/\/[^\s]+/g, // URLs
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email addresses
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(text)) {
        return {
          isValid: false,
          error: "Content contains prohibited patterns",
        };
      }
    }

    return { isValid: true };
  }

  static validateLanguage(language: string): boolean {
    return this.VALID_LANGUAGES.includes(language);
  }
}
