export class RateLimiter {
  private static readonly MAX_REQUESTS = 10; // per 15 minutes
  private static readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes

  static checkLimit(): boolean {
    const now = Date.now();
    const requests = JSON.parse(
      localStorage.getItem("translation_requests") || "[]"
    );

    // Remove old requests outside the window
    const validRequests = requests.filter(
      (timestamp: number) => now - timestamp < this.WINDOW_MS
    );

    if (validRequests.length >= this.MAX_REQUESTS) {
      return false; // Rate limit exceeded
    }

    // Add current request
    validRequests.push(now);
    localStorage.setItem("translation_requests", JSON.stringify(validRequests));

    return true;
  }

  static getRemainingRequests(): number {
    const now = Date.now();
    const requests = JSON.parse(
      localStorage.getItem("translation_requests") || "[]"
    );
    const validRequests = requests.filter(
      (timestamp: number) => now - timestamp < this.WINDOW_MS
    );

    return Math.max(0, this.MAX_REQUESTS - validRequests.length);
  }
}
