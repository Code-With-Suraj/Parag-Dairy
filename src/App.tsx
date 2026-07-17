import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Check, 
  Star, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  ShoppingBag, 
  X, 
  Compass, 
  Calendar,
  ThumbsUp,
  Map,
  ArrowRight
} from 'lucide-react';
import { DAIRY_PRODUCTS, GOOGLE_REVIEWS, SEO_KEYWORDS, CONTACT_INFO } from './data';
import OrderEstimator from './components/OrderEstimator';

export default function App() {
  const [notification, setNotification] = useState<string | null>(null);

  // Function to show custom interactive toast notifications
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Smooth scroll and auto-add product to estimator
  const handleAddToEstimator = (productId: string, productName: string) => {
    // 1. Scroll to estimator
    const element = document.getElementById('order-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 2. We trigger a click on the "+" button inside the estimator for this product, or find it.
    // Since we created the component with internal state, we can simulate an event or simply show a toast.
    // Let's find the product in the DOM and click it, or notify the user.
    triggerNotification(`Added 1 unit of ${productName} to the cost estimator below!`);

    // We can also dispatch a custom event to update the quantity inside the OrderEstimator if needed,
    // but a simpler elegant approach is to trigger the custom toast and let the user customize their list.
    // Let's pass a custom event to make it work seamlessly!
    const event = new CustomEvent('add-to-estimator', { detail: { productId } });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Dynamic Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-500 p-1.5 rounded-xl">
                  <Check className="w-4 h-4 text-slate-950 font-bold" />
                </div>
                <p className="text-sm font-medium">{notification}</p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Announcement Bar */}
      <div className="bg-slate-50 border-b border-slate-100 text-slate-700 py-2.5 px-4 text-center text-xs md:text-sm font-bold relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sourced Fresh Daily • Serving Noida Phase 2
          </span>
          <span className="hidden sm:inline-block text-slate-300">|</span>
          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
            className="text-emerald-700 hover:text-emerald-600 transition-colors flex items-center gap-1 font-bold"
          >
            Tap to Order Fresh Paneer & Milk on WhatsApp
            <ChevronRight className="w-3.5 h-3.5 inline" />
          </a>
        </div>
      </div>

      {/* Glassmorphism Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl heading-display">P</span>
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 heading-display block leading-tight">
                Parag Dairy
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-mono block">
                Noida Phase 2
              </span>
            </div>
          </a>

          {/* Quick Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#why-choose-us" className="hover:text-emerald-600 transition-colors">Why Choose Us</a>
            <a href="#best-sellers" className="hover:text-emerald-600 transition-colors">Best Selling Products</a>
            <a href="#order-estimator" className="hover:text-emerald-600 transition-colors">Cost Estimator</a>
            <a href="#freshness" className="hover:text-emerald-600 transition-colors">Our Promise</a>
            <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Testimonials</a>
          </nav>

          {/* Sticky Header CTA */}
          <div className="flex items-center gap-2">
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-4 py-2 rounded-full text-xs md:text-sm font-bold hover:bg-emerald-100 transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Call Store:</span> Noida Phase 2
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-12 md:py-20 lg:py-24 bg-white overflow-hidden">
        {/* Subtle, soft minimalist visual touches */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-slate-50 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  Trusted by Noida Families
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 heading-display leading-[1.1]">
                  Fresh Dairy Products <br />
                  <span className="text-emerald-600">
                    Delivered with Quality You Can Trust
                  </span>
                </h1>
                
                {/* Secondary Header */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-700 font-display">
                  Parag Dairy — Fresh Milk • Pure Paneer • Fresh Curd • Desi Ghee • Daily Dairy Essentials
                </h2>

                <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
                  Serving families in Noida Noida Phase 2 with fresh and hygienic dairy products every day. Pure nourishment brought straight to your table.
                </p>
              </div>

              {/* THREE HIGH-CONVERTING CTA BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl pt-2">
                
                {/* CTA 1: Call Now */}
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="group flex flex-col justify-between p-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-100 transition-all hover:-translate-y-0.5 duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Instant Call
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight mb-0.5">Call Now</h3>
                    <p className="text-xs text-emerald-100">Tap to dial the store directly</p>
                  </div>
                </a>

                {/* CTA 2: WhatsApp Now */}
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between p-5 bg-white hover:bg-slate-50 border-2 border-emerald-600 text-emerald-800 rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-emerald-50 p-2 rounded-xl">
                      <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      WhatsApp Chat
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight text-slate-900 mb-0.5">WhatsApp Now</h3>
                    <p className="text-xs text-slate-500 font-medium">Chat & order instantly</p>
                  </div>
                </a>

                {/* CTA 3: Get Directions */}
                <a 
                  href={CONTACT_INFO.gmapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between p-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/15 p-2 rounded-xl">
                      <MapPin className="w-5 h-5 text-slate-200" />
                    </div>
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Location Map
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight mb-0.5">Get Directions</h3>
                    <p className="text-xs text-slate-300">Visit store in Noida Phase 2</p>
                  </div>
                </a>

              </div>

              {/* Sourced daily confirmation */}
              <div className="flex items-center gap-6 text-xs text-slate-400 font-bold pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Hygienic Handling
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Premium Certified Quality
                </span>
              </div>

            </div>

            {/* Right Graphic/Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-100/50 rounded-full -z-10 animate-bounce" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-100/40 rounded-full -z-10"></div>
                
                {/* Main Beautiful Food Collage Card */}
                <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600"
                    alt="Fresh Dairy Products and Milk"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 object-cover rounded-2xl mb-4 shadow-inner"
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                        ⭐ Sourced Fresh Daily
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        Noida Phase 2 Exclusive
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-lg heading-display">
                      Pure & Nutritious Dairy Essentials
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Every glass of milk, slice of paneer, and bowl of curd starts with organic care, hygienic milking, and quick temperature-controlled delivery.
                    </p>

                    {/* Quick highlights */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-bold text-slate-700">Zero Preservatives</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-bold text-slate-700">Premium Taste</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating reviews callout */}
                <div className="absolute -bottom-4 -left-4 bg-white py-3 px-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 max-w-[200px] animate-pulse">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-800 text-sm">4.9 / 5.0</div>
                    <div className="text-[10px] text-slate-400 font-semibold leading-tight">Google Store Rating</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-16 md:py-24 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
              Unmatched Purity
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 heading-display">
              Why Choose Parag Dairy?
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-base text-slate-600 leading-relaxed">
              Freshness is our priority. Every product is carefully sourced, processed, and delivered to maintain top-tier quality, authentic taste, and rich nutrition for Noida families.
            </p>
          </div>

          {/* Grid of features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1 */}
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mb-4">
                🥛
              </div>
              <h3 className="font-bold text-slate-900 mb-2 heading-display">Fresh Milk Every Day</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Direct morning milking sourced under perfect standards. Rich in cream and natural sweetness.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-lg mb-4">
                🧼
              </div>
              <h3 className="font-bold text-slate-900 mb-2 heading-display">Hygienic Dairy Products</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Untouched processing, carefully sanitized packaging, and strict pathogen checks keep products pure.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg mb-4">
                💰
              </div>
              <h3 className="font-bold text-slate-900 mb-2 heading-display">Affordable Prices</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Wholesome nutrition at pocket-friendly rates. Best value for top quality in Noida Phase 2.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg mb-4">
                🏪
              </div>
              <h3 className="font-bold text-slate-900 mb-2 heading-display">Trusted Local Store</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Voted preferred local store with friendly service, stable supply, and daily fresh stock.
              </p>
            </div>

          </div>

          {/* Quick verification checkboxes */}
          <div className="mt-12 bg-emerald-50/40 rounded-2xl border border-emerald-100 p-6">
            <h4 className="text-sm font-extrabold text-emerald-800 uppercase tracking-wider text-center mb-4">
              ✨ Parag Dairy Quality Checklist
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Fresh Milk Every Day
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Hygienic Dairy Products
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                High Quality Paneer & Curd
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Family Preferred Store
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BEST SELLING PRODUCTS SECTION */}
      <section id="best-sellers" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/50 px-3.5 py-1 rounded-full border border-emerald-200/50">
              Fresh Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 heading-display">
              Our Best Selling Products
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Carefully processed daily under strict supervision. Experience authentic dairy flavor, creamy textures, and rich aroma in every bite.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DAIRY_PRODUCTS.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                
                {/* Image & Badge */}
                <div className="relative overflow-hidden h-52">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {product.popular && (
                      <span className="text-[10px] bg-amber-500 text-white font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                        ⭐ Top Seller
                      </span>
                    )}
                    <span className="text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded-md w-fit">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white text-slate-900 font-mono font-bold text-sm px-3 py-1 rounded-full shadow-xs border border-slate-100">
                    ₹{product.price} / {product.unit}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg md:text-xl text-slate-900 heading-display">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Benefits points */}
                    <ul className="space-y-1 pt-2">
                      {product.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex gap-2">
                    {/* Add to calculation */}
                    <button
                      onClick={() => handleAddToEstimator(product.id, product.name)}
                      className="flex-1 bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Estimator
                    </button>
                    
                    {/* Direct inquiry */}
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi Parag Dairy, I would like to inquire about *${product.name}* (${product.unit}). Please share availability and morning slots!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center"
                      title="Quick WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-white" />
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INTERACTIVE PRICE ESTIMATOR SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
              Convenient Delivery
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 heading-display">
              Calculate Your Dairy Budget
            </h2>
            <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Custom-build your order. Our live tool calculates estimated pricing, subscription frequency costs, and prepares your order details cleanly.
            </p>
          </div>

          {/* Embedded OrderEstimator Component */}
          <OrderEstimator onOrderAdded={triggerNotification} />

        </div>
      </section>

      {/* THE FRESHNESS PROMISE PROCESS */}
      <section id="freshness" className="py-16 md:py-24 bg-slate-50 text-slate-900 border-t border-b border-slate-100 relative overflow-hidden">
        {/* Soft abstract bg decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-5"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100/50 px-3.5 py-1 rounded-full border border-emerald-200/40">
                Our Purity Guarantee
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 heading-display tracking-tight leading-tight">
                The Parag Dairy <br />
                Freshness Promise
              </h2>
              <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                We believe premium quality dairy products begin with strict daily freshness parameters. Every drop is handled under sanitary procedures, cold chain security, and absolute professional attention so your family enjoys nutritious milk products.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl h-fit border border-emerald-100">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Premium Quality Guaranteed</h4>
                    <p className="text-xs text-slate-500">Strict milk test criteria for thick consistency and safety.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl h-fit border border-emerald-100">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Hygienic Cold Processing</h4>
                    <p className="text-xs text-slate-500">Untouched packaging safeguards minerals, taste and probiotic benefits.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Process Step Cards Column */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Step 1 */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 shadow-sm transition-all">
                  <span className="text-3xl font-black font-mono text-emerald-500/10 absolute right-4 top-4">01</span>
                  <div className="text-xl mb-3">🐄</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 heading-display">Sourced Daily</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Purest buffalo & cow milk brought daily from verified farms around Noida Phase 2.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 shadow-sm transition-all">
                  <span className="text-3xl font-black font-mono text-emerald-500/10 absolute right-4 top-4">02</span>
                  <div className="text-xl mb-3">🔬</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 heading-display">Quality Tested</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tested for fat parameters, adulteration check, and hygienic standard profiles.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 shadow-sm transition-all">
                  <span className="text-3xl font-black font-mono text-emerald-500/10 absolute right-4 top-4">03</span>
                  <div className="text-xl mb-3">❄️</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 heading-display">Cold Chain Storage</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Fast chilling process locks in the native probiotics and minerals beautifully.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 shadow-sm transition-all">
                  <span className="text-3xl font-black font-mono text-emerald-500/10 absolute right-4 top-4">04</span>
                  <div className="text-xl mb-3">🛵</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 heading-display">Fresh Noida Delivery</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Direct early morning door-step drop-offs to families in Noida Phase 2.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS / CUSTOMER REVIEWS SECTION */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
              Customer Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 heading-display">
              Trusted by Local Families
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-base text-slate-600">
              Read verified feedback and genuine customer opinions from our local Noida Google Business Profile.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOOGLE_REVIEWS.map((review) => (
              <div 
                key={review.id}
                className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-2.5 pt-6 border-t border-slate-100 mt-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                    {review.avatarLetter}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{review.name}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Verified Buyer • {review.date}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Call to review */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              <span className="font-semibold text-slate-700">Are you an existing customer?</span>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
                className="text-emerald-600 font-bold hover:underline"
              >
                Send us your feedback over WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* VISIT US / MAP DIRECTIONS SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Store Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
                In-Store pickup
              </span>
              <h2 className="text-3xl font-black text-slate-900 heading-display">
                Visit Parag Dairy Today
              </h2>
              <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
              
              <p className="text-sm text-slate-500 leading-relaxed">
                We are conveniently located in Noida Phase 2. Come down to pick up freshly churned Paneer, thick Dahi, granular Ghee, and fresh buffalo milk in a clean, professional retail environment.
              </p>

              {/* Physical details list */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Our Address</h4>
                    <p className="text-sm text-slate-800 font-bold mt-0.5">Parag Dairy</p>
                    <p className="text-xs text-slate-500">Noida Phase 2, Noida, Uttar Pradesh, 201305</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Business Hours</h4>
                    {CONTACT_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between gap-6 text-xs text-slate-600 mt-0.5">
                        <span className="font-semibold">{h.days}</span>
                        <span className="font-bold text-slate-800">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Quick Phone Support</h4>
                    <p className="text-xs text-slate-500">Noida Local Store:</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-emerald-700 font-bold hover:underline block mt-0.5">
                      Call Noida Phase 2 Outlet
                    </a>
                  </div>
                </div>

              </div>

              {/* Directions buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={CONTACT_INFO.gmapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl text-center text-sm shadow-md shadow-slate-200 flex items-center justify-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  Get GPS Google Map Route
                </a>
                
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi, please share the exact location address or location pin of Parag Dairy in Noida Phase 2.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-3.5 px-6 rounded-2xl text-center text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-800 text-emerald-800" />
                  Inquire Store Pin on WhatsApp
                </a>
              </div>

            </div>

            {/* Interactive map display simulation */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-lg overflow-hidden relative">
                <div className="bg-slate-100 rounded-2xl h-[360px] relative overflow-hidden flex items-center justify-center">
                  
                  {/* Styled Simulated Route / Grid Layout representing map */}
                  <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                  
                  {/* Blue simulated roads */}
                  <div className="absolute h-4 bg-slate-200/80 w-full top-1/3 left-0"></div>
                  <div className="absolute h-4 bg-slate-200/80 w-full top-2/3 left-0"></div>
                  <div className="absolute w-4 bg-slate-200/80 h-full left-1/3 top-0"></div>
                  <div className="absolute w-4 bg-slate-200/80 h-full left-2/3 top-0"></div>
                  
                  {/* Major sectors markers */}
                  <span className="absolute top-[10%] left-[5%] text-[10px] font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full uppercase">Sector 81</span>
                  <span className="absolute top-[45%] left-[45%] text-[10px] font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full uppercase">Hosiery Complex</span>
                  <span className="absolute bottom-[10%] right-[5%] text-[10px] font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full uppercase">Phase 2 Noida</span>
                  
                  {/* Pin Circle Pulsing */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="absolute inline-flex h-12 w-12 rounded-full bg-emerald-400/30 animate-ping"></span>
                    <span className="absolute inline-flex h-8 w-8 rounded-full bg-emerald-400/40 animate-pulse"></span>
                    
                    <div className="bg-slate-900 border-2 border-emerald-400 p-2.5 rounded-2xl shadow-2xl relative z-10 flex items-center gap-2">
                      <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center text-xs">🥛</div>
                      <div className="text-left">
                        <h4 className="text-white text-xs font-bold leading-none">Parag Dairy</h4>
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Noida Phase 2 Outlet</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating helpful overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="text-left">
                        <div className="text-xs font-bold">Directions to Store</div>
                        <div className="text-[10px] text-slate-400">Tap to start Google Maps navigation</div>
                      </div>
                    </div>
                    
                    <a 
                      href={CONTACT_INFO.gmapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold text-[11px] px-3.5 py-1.5 rounded-lg flex items-center gap-0.5"
                    >
                      Start GPS <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STRONG CONVERSION BANNER SECTION */}
      <section className="py-16 md:py-24 bg-emerald-600 text-white relative overflow-hidden text-center">
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase bg-emerald-500 text-emerald-100 border border-emerald-400/20 px-3.5 py-1.5 rounded-full">
            Quick Home Delivery & Pickup
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight heading-display">
            Looking for Fresh Dairy Products Near You?
          </h2>
          
          <p className="text-base sm:text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Visit Parag Dairy for fresh milk, paneer, curd, ghee, and all your daily dairy essentials. Enjoy hygienic quality, affordable prices, and elite local legacy.
          </p>

          <div className="text-sm font-bold text-white uppercase tracking-wider py-1">
            Ready to Order? Select your preferred contact path below:
          </div>

          {/* Quick interactive trigger actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-base"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              Call Store Now
            </a>

            <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
            >
              <MessageCircle className="w-5 h-5 fill-white text-slate-900" />
              WhatsApp Us
            </a>

            <a 
              href="#order-estimator"
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-emerald-500/30 flex items-center justify-center gap-2 text-base"
            >
              Custom Cost Builder
            </a>

          </div>

          {/* Business timings confirmation */}
          <p className="text-xs text-emerald-100 font-semibold pt-4">
            ⏰ Open Mon – Sat: 10:00 AM – 6:00 PM (Sunday Closed) • Direct delivery slots in Noida Phase 2.
          </p>

        </div>
      </section>

      {/* FOOTER & SEO TAGSDRAWER */}
      <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <span className="text-white font-bold text-base heading-display">
                  Parag Dairy Noida
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Noida Phase 2's preferred destination for pure and hygienic dairy milk, soft paneer, fresh set dahi, and rich granular cow ghee.
              </p>
            </div>

            {/* Col 2: Products */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Our Essentials</h4>
              <ul className="text-xs space-y-1.5 font-medium">
                <li>• Fresh Buffalo & Cow Milk</li>
                <li>• Pure Soft Paneer Block</li>
                <li>• Creamy Traditional Curd</li>
                <li>• Ayurvedic Aroma Desi Ghee</li>
                <li>• Chilled Flavoured Milk Bottle</li>
                <li>• Refreshing Spiced Chaach & Lassi</li>
              </ul>
            </div>

            {/* Col 3: Noida Phase 2 delivery areas */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Serving Noida</h4>
              <ul className="text-xs space-y-1.5 font-medium text-slate-500">
                <li>📍 Hosiery Complex, Noida Phase 2</li>
                <li>📍 Sector 81, Sector 82, Sector 83 Noida</li>
                <li>📍 Noida Special Economy Zone (NSEZ)</li>
                <li>📍 Near Noida Phase 2 Police Station</li>
                <li>📍 Standard delivery routes across Sector 80</li>
              </ul>
            </div>

            {/* Col 4: Contact summary */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Direct Connect</h4>
              <p className="text-xs">Have questions or want subscription setup?</p>
              <div className="pt-1.5">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-block bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-slate-700"
                >
                  Call Store Representative
                </a>
              </div>
            </div>

          </div>

          {/* SEO KEYWORDS CONTAINER (Styled beautifully to represent actual semantic local optimization without cluttering UI) */}
          <div className="border-t border-slate-800/80 pt-8">
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3 text-center">
                Search Engine Optimization (SEO) & Local Target Keywords
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {SEO_KEYWORDS.map((kw, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md"
                  >
                    🔍 {kw}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-center text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
                Parag Dairy is Noida Phase 2's highest-converting local dairy destination, specifically optimized for nearby search criteria: "Fresh Paneer in Noida", "Pure Desi Ghee Noida", and "Dairy Store near me".
              </p>
            </div>
          </div>

          {/* Copyright, legal, tech details */}
          <div className="border-t border-slate-800/60 pt-6 text-center text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} Parag Dairy Noida Phase 2. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:underline">Terms of Service</a>
              <span>•</span>
              <a href="#order-estimator" className="hover:underline">Order Calculator</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
