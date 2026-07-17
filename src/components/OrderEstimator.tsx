import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, MessageCircle, PhoneCall, Check, Sparkles, RefreshCw } from 'lucide-react';
import { DAIRY_PRODUCTS, CONTACT_INFO } from '../data';

interface OrderEstimatorProps {
  onOrderAdded?: (message: string) => void;
}

export default function OrderEstimator({ onOrderAdded }: OrderEstimatorProps) {
  // Quantities state
  const [quantities, setQuantities] = useState<Record<string, number>>(
    DAIRY_PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );
  
  // Delivery frequency state
  const [frequency, setFrequency] = useState<'once' | 'daily'>('once');
  
  // Quick user details state (helps conversion!)
  const [addressLine, setAddressLine] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetEstimator = () => {
    setQuantities(DAIRY_PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
    setAddressLine('');
    setDeliveryNote('');
  };

  // Calculations
  const selectedItems = DAIRY_PRODUCTS.filter(p => (quantities[p.id] || 0) > 0);
  const totalPrice = selectedItems.reduce((sum, p) => sum + (p.price * quantities[p.id]), 0);
  
  // Estimate subscription / daily or monthly costs
  const monthlyPrice = totalPrice * 30;

  // Generate formatted WhatsApp message
  const generateWhatsAppLink = () => {
    if (selectedItems.length === 0) return '';
    
    let message = `*New Dairy Inquiry for Parag Dairy Noida* 🥛✨\n\n`;
    message += `I'd like to place an order/inquiry for the following products:\n`;
    
    selectedItems.forEach(p => {
      const qty = quantities[p.id];
      message += `• *${p.name}* - ${qty} x ${p.unit} (₹${p.price * qty})\n`;
    });
    
    message += `\n*Total Estimated Amount:* ₹${totalPrice}\n`;
    message += `*Delivery Type:* ${frequency === 'daily' ? 'Daily Morning Delivery' : 'One-time Order'}\n`;
    
    if (addressLine.trim()) {
      message += `*Delivery Address:* Noida Phase 2, ${addressLine.trim()}\n`;
    } else {
      message += `*Delivery Area:* Noida Phase 2\n`;
    }
    
    if (deliveryNote.trim()) {
      message += `*Note:* ${deliveryNote.trim()}\n`;
    }
    
    message += `\nPlease confirm availability and delivery slot! Thank you. 🙏`;
    
    return `https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
  };

  // Handle WhatsApp submit
  const handleWhatsAppInquiry = () => {
    const link = generateWhatsAppLink();
    if (link) {
      window.open(link, '_blank');
      if (onOrderAdded) {
        onOrderAdded("Thank you! Your WhatsApp inquiry has been sent to Parag Dairy.");
      }
    }
  };

  return (
    <div id="order-estimator" className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-6 text-slate-900 text-center relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl -ml-10 -mb-10"></div>
        
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full border border-emerald-200/50 mb-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          Interactive Order Builder
        </div>
        
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 heading-display">Quick Cost Estimator & Order Inquiry</h3>
        <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-md mx-auto leading-relaxed">
          Build your custom fresh dairy list below. See estimated prices instantly and send directly to our WhatsApp!
        </p>
      </div>

      <div className="p-6 md:p-8">
        {/* Step 1: Selection */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Step 1: Choose Your Daily Products
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAIRY_PRODUCTS.map((product) => {
              const qty = quantities[product.id] || 0;
              return (
                <div 
                  key={product.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                    qty > 0 
                      ? 'border-emerald-500 bg-emerald-50/40' 
                      : 'border-slate-100 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm md:text-base">{product.name}</span>
                        {product.popular && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-md font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-semibold font-mono">
                        ₹{product.price} / {product.unit}
                      </p>
                    </div>
                  </div>

                  {/* Counter controls */}
                  <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-full p-1 shadow-xs">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, -1)}
                      className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                        qty > 0 
                          ? 'text-slate-600 hover:bg-slate-100' 
                          : 'text-slate-300 cursor-not-allowed'
                      }`}
                      disabled={qty === 0}
                    >
                      –
                    </button>
                    
                    <span className="font-mono font-bold text-slate-800 min-w-[18px] text-center text-sm">
                      {qty}
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 text-sm font-bold transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Frequency & Address */}
        {selectedItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-slate-100 pt-6 space-y-5"
          >
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Step 2: Delivery Preferences
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    frequency === 'once'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-100 text-slate-600 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Check className={`w-4 h-4 transition-transform ${frequency === 'once' ? 'scale-100' : 'scale-0'}`} />
                  One-time Delivery
                </button>
                
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    frequency === 'daily'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-100 text-slate-600 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Check className={`w-4 h-4 transition-transform ${frequency === 'daily' ? 'scale-100' : 'scale-0'}`} />
                  Daily Subscription
                </button>
              </div>
            </div>

            {/* Noida Phase 2 Location Helpers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Delivery Landmark / Sector in Noida Phase 2
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sector 81, Hosiery Complex, Block A"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white outline-none rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please leave at door, call before delivery"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white outline-none rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Cost Summary & Actions */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          {selectedItems.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200/60 text-slate-400">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-500">Add products above to calculate costs and start order</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Calculations Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Selected Items ({selectedItems.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedItems.map(p => (
                      <span key={p.id} className="text-xs bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200/50 font-bold">
                        {p.name} ({quantities[p.id]}x)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 border-slate-200/50 pt-3 md:pt-0">
                  <div className="flex items-baseline md:justify-end gap-1.5">
                    <span className="text-xs text-slate-500 font-medium">Estimated Total:</span>
                    <span className="text-2xl font-black text-slate-900 heading-display">₹{totalPrice}</span>
                    <span className="text-xs text-slate-400 font-bold font-mono">
                      / {frequency === 'daily' ? 'Day' : 'order'}
                    </span>
                  </div>
                  
                  {frequency === 'daily' && (
                    <div className="text-xs text-emerald-600 font-bold mt-1">
                      Approx. Monthly subscription cost: ₹{monthlyPrice} (for 30 days)
                    </div>
                  )}
                </div>
              </div>

              {/* Conversion Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  Inquire & Order on WhatsApp
                </button>

                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call Now to Confirm Daily Order
                </a>
              </div>

              {/* Reset trigger */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={resetEstimator}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1.5 mx-auto transition-colors font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Estimator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
