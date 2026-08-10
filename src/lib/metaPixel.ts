declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Initializes the Meta (Facebook) Pixel if VITE_META_PIXEL_ID is present in environment variables.
 * Safe for production SSR or static builds.
 */
export function initMetaPixel(): void {
  if (typeof window === 'undefined') return;

  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || pixelId === 'YOUR_PIXEL_ID_HERE') {
    console.info('[Meta Pixel] VITE_META_PIXEL_ID is not configured. Pixel tracking is inactive.');
    return;
  }

  if (window.fbq) {
    // Already initialized
    return;
  }

  /* eslint-disable */
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    console.info(`[Meta Pixel] Initialized successfully with ID: ${pixelId}`);
  }
}

/**
 * Track Meta Pixel events safely.
 */
export function trackMetaPixel(
  eventName: string,
  payload: Record<string, any> = {}
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    return;
  }

  const standardEvents = [
    'PageView',
    'ViewContent',
    'Search',
    'AddToCart',
    'AddToWishlist',
    'InitiateCheckout',
    'AddPaymentInfo',
    'Purchase',
    'Lead',
    'Contact',
    'CompleteRegistration'
  ];

  try {
    if (standardEvents.includes(eventName)) {
      window.fbq('track', eventName, payload);
    } else {
      window.fbq('trackCustom', eventName, payload);
    }
  } catch (err) {
    console.error('[Meta Pixel] Error firing event:', err);
  }
}
