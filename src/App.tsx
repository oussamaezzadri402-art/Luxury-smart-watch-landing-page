/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveWatch from './components/InteractiveWatch';
import SocialProof from './components/SocialProof';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CinematicStoreEntrance from './components/CinematicStoreEntrance';

import { Order, PixelEvent, WatchVariation } from './types';
import { WATCH_VARIATIONS } from './data';

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pixelEvents, setPixelEvents] = useState<PixelEvent[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<WatchVariation>(WATCH_VARIATIONS[0]);
  const [mockTriggerTimestamp, setMockTriggerTimestamp] = useState(0);
  const [show3DEntrance, setShow3DEntrance] = useState(() => {
    try {
      return !sessionStorage.getItem('rolex_entrance_seen');
    } catch {
      return true;
    }
  });

  const handleComplete3DEntrance = () => {
    setShow3DEntrance(false);
    try {
      sessionStorage.setItem('rolex_entrance_seen', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const checkoutRef = useRef<HTMLDivElement | null>(null);

  // Load orders and pixel events from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('kronos_portfolio_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }

    // Push initial pageview log
    firePixelEvent('PageView', { 
      page_title: 'ROLEX Luxury Watch Boutique Morocco - 3D Reveal',
      referrer: 'Facebook Ads / Instagram Ads / TikTok Ads'
    });
  }, []);

  // Save orders to localStorage when they change
  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('kronos_portfolio_orders', JSON.stringify(newOrders));
  };

  // Log Pixel Event (both Facebook and TikTok placeholders)
  const firePixelEvent = (
    eventName: PixelEvent['eventName'], 
    payload: Record<string, any> = {}
  ) => {
    const timestamp = new Date().toISOString();
    const eventId = 'EVT_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const fbEvent: PixelEvent = {
      id: `${eventId}_FB`,
      platform: 'facebook',
      eventName,
      payload: { ...payload, agent_id: '629c825f' },
      timestamp
    };

    const ttEvent: PixelEvent = {
      id: `${eventId}_TT`,
      platform: 'tiktok',
      eventName,
      payload: { ...payload, tracking_type: 'developer_portfolio_simulation' },
      timestamp
    };

    setPixelEvents(prev => [fbEvent, ttEvent, ...prev].slice(0, 50)); // Keep latest 50 events
  };

  const handleScrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectVariation = (variation: WatchVariation) => {
    setSelectedVariation(variation);
  };

  const handleAddOrder = (order: Order) => {
    const updatedOrders = [order, ...orders];
    saveOrders(updatedOrders);
  };

  const handleReplay3DEntrance = () => {
    setShow3DEntrance(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden antialiased relative">
      {/* Cinematic 3D Store Fly-In Entrance Overlay */}
      {show3DEntrance && (
        <CinematicStoreEntrance
          selectedWatch={selectedVariation}
          onComplete={handleComplete3DEntrance}
        />
      )}

      {/* Main Page Layout */}
      <Navbar onReplay3DEntrance={handleReplay3DEntrance} />
      
      <main className="flex-1">
        <Hero 
          selectedVariation={selectedVariation}
          onSelectVariation={handleSelectVariation}
          onScrollToCheckout={handleScrollToCheckout}
          onFirePixel={firePixelEvent}
        />
        
        <Features />
        
        <InteractiveWatch 
          onSelectVariation={handleSelectVariation}
          onScrollToCheckout={handleScrollToCheckout}
          onFirePixel={firePixelEvent}
        />
        
        <SocialProof 
          mockTriggerTimestamp={mockTriggerTimestamp}
        />
        
        <Checkout 
          selectedVariation={selectedVariation}
          onAddOrder={handleAddOrder}
          onFirePixel={firePixelEvent}
          checkoutRef={checkoutRef}
        />
      </main>

      <Footer />

      {/* Floating WhatsApp Quick Order Button */}
      <WhatsAppButton 
        selectedVariation={selectedVariation}
        onFirePixel={firePixelEvent}
      />
    </div>
  );
}
