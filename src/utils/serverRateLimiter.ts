interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class ServerRateLimiter {
  private static store = new Map<string, RateLimitEntry>();
  private static readonly MAX_REQUESTS = 20; // per hour per IP
  private static readonly WINDOW_MS = 60 * 60 * 1000; // 1 hour

  static checkLimit(ip: string): boolean {
    const now = Date.now();
    const entry = this.store.get(ip);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.store.set(ip, {
        count: 1,
        resetTime: now + this.WINDOW_MS,
      });
      return true;
    }

    if (entry.count >= this.MAX_REQUESTS) {
      return false; // Rate limit exceeded
    }

    // Increment count
    entry.count++;
    return true;
  }

  static getRemaining(ip: string): number {
    const entry = this.store.get(ip);
    if (!entry || Date.now() > entry.resetTime) {
      return this.MAX_REQUESTS;
    }
    return Math.max(0, this.MAX_REQUESTS - entry.count);
  }

  // Clean up old entries periodically
  static cleanup() {
    const now = Date.now();
    for (const [ip, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(ip);
      }
    }
  }
}

// Clean up every 5 minutes
setInterval(() => ServerRateLimiter.cleanup(), 5 * 60 * 1000);
