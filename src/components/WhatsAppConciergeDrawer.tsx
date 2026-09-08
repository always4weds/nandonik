import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import {
  X,
  MessageCircle,
  Check,
  MapPin,
  Phone,
  User,
  Truck,
  AlertCircle,
  Copy,
  ExternalLink,
  Smartphone,
  Info,
} from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, getWhatsAppLinks } from '../data/products';
import { saveCustomerOrder } from '../services/firestoreService';

interface WhatsAppConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  targetProduct?: Product | null;
}

export const WhatsAppConciergeDrawer: React.FC<WhatsAppConciergeDrawerProps> = ({
  isOpen,
  onClose,
  targetProduct,
}) => {
  if (!isOpen) return null;

  // Form State - Clean & Direct
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside' | 'outside'>('inside');
  const [specialNote, setSpecialNote] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const deliveryCharge = deliveryArea === 'inside' ? 70 : 130;
  const productPrice = targetProduct ? targetProduct.price : 0;
  const grandTotal = productPrice + deliveryCharge;
  const areaLabel = deliveryArea === 'inside' ? 'ঢাকা সিটির ভেতরে' : 'ঢাকা সিটির বাইরে';

  // Build the pre-formatted WhatsApp order message
  const formattedMessage = useMemo(() => {
    if (targetProduct) {
      return `নতুন অর্ডার (Nandonik Bazar):
🛍️ প্রোডাক্ট: ${targetProduct.name}
🏷️ SKU: ${targetProduct.sku}
💰 মূল্য: ৳ ${targetProduct.price.toLocaleString()}

কাস্টমার তথ্য:
👤 নাম: ${customerName.trim() || '[নাম প্রদান করুন]'}
📞 মোবাইল: ${contactNumber.trim() || '[মোবাইল নম্বর]'}
📍 ঠিকানা: ${address.trim() || '[ঠিকানা]'}
🚚 ডেলিভারি এলাকা: ${areaLabel} (৳ ${deliveryCharge})
💵 মোট বিল: ৳ ${grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)
${specialNote.trim() ? `📝 নোট: ${specialNote.trim()}\n` : ''}
দয়া করে অর্ডারটি কনফার্ম করুন।`;
    }

    return `ইনকোয়ারি / অর্ডার (Nandonik Bazar):
👤 নাম: ${customerName.trim() || '[নাম]'}
📞 মোবাইল: ${contactNumber.trim() || '[মোবাইল নম্বর]'}
📍 ঠিকানা: ${address.trim() || '[ঠিকানা]'}
🚚 ডেলিভারি এলাকা: ${areaLabel}
${specialNote.trim() ? `📝 নোট: ${specialNote.trim()}\n` : ''}
ক্যাশ অন ডেলিভারিতে অর্ডার করতে চাই।`;
  }, [targetProduct, customerName, contactNumber, address, areaLabel, deliveryCharge, grandTotal, specialNote]);

  // Compute direct WhatsApp link set (wa.me, api.whatsapp.com, whatsapp://)
  const links = useMemo(() => {
    return getWhatsAppLinks(formattedMessage);
  }, [formattedMessage]);

  // Validate form fields
  const validateForm = (): boolean => {
    if (!customerName.trim()) {
      setValidationError('অনুগ্রহ করে আপনার নাম লিখুন');
      return false;
    }
    if (!contactNumber.trim() || contactNumber.trim().length < 9) {
      setValidationError('অনুগ্রহ করে সঠিক মোবাইল নম্বর লিখুন (যেমন: 018XXXXXXXX)');
      return false;
    }
    if (!address.trim()) {
      setValidationError('অনুগ্রহ করে ডেলিভারি ঠিকানা লিখুন');
      return false;
    }
    setValidationError(null);
    return true;
  };

  // Safe clipboard copier with fallback
  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(formattedMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }
    } catch (e) {
      console.warn('Navigator clipboard failed, falling back:', e);
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = formattedMessage;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy fallback failed:', err);
    }
  };

  // Main Action: Trigger WhatsApp directly
  const handleDirectWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

    setHasAttemptedSubmit(true);

    // Save order details to Firestore in the background (fire-and-forget)
    saveCustomerOrder({
      customerName: customerName.trim(),
      contactNumber: contactNumber.trim(),
      houseAndRoad: address.trim(),
      areaDetails: areaLabel,
      districtRegion: areaLabel,
      product: targetProduct
        ? {
            id: targetProduct.id,
            sku: targetProduct.sku,
            name: targetProduct.name,
            price: targetProduct.price,
            category: targetProduct.category,
          }
        : null,
      paymentMethod: 'Cash on Delivery (COD)',
      specialNote: specialNote.trim() || undefined,
      messageText: formattedMessage,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).catch((err) => {
      console.warn('Background Firestore save notice:', err);
    });

    // In environments where target="_blank" might be trapped (like sandbox iframe),
    // also attempt window.open as a secondary trigger
    try {
      window.open(links.waMe, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored: native anchor tag handles the navigation
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md sm:h-full bg-white rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col justify-between overflow-hidden max-h-[95vh] sm:max-h-full">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#F4C2CE]/40 flex items-center justify-between shrink-0">
          <div>
            <h3
              className="text-lg font-normal text-[#1B1B20]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              অর্ডার সম্পন্ন করুন
            </h3>
            <p className="text-[11px] text-[#877275] flex items-center gap-1 mt-0.5">
              <span>WhatsApp নম্বর:</span>
              <span className="font-bold text-[#1B1B20]">{WHATSAPP_DISPLAY}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#FCE7EB] text-[#554245] flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-[#1B1B20]">
          {/* Target Product Summary (Clean card) */}
          {targetProduct && (
            <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#F4C2CE]/50 flex items-center gap-3">
              <img
                src={targetProduct.image}
                alt={targetProduct.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#F4C2CE]/40 bg-white shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-[#1B1B20] truncate">
                  {targetProduct.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-bold text-xs text-[#9A3C53]">
                    ৳ {targetProduct.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#877275]">
                    • SKU: {targetProduct.sku}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Validation Error Alert */}
          {validationError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="font-medium">{validationError}</span>
            </div>
          )}

          {/* Field 1: Customer Name */}
          <div>
            <label className="block font-semibold text-[#1B1B20] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#9A3C53]" />
              <span>আপনার নাম</span>
              <span className="text-[#9A3C53]">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-3.5 py-2.5 bg-[#FAF6F0]/50 focus:bg-white border border-[#F4C2CE]/70 focus:border-[#9A3C53] rounded-xl outline-none transition-colors text-xs text-[#1B1B20]"
            />
          </div>

          {/* Field 2: Mobile Number */}
          <div>
            <label className="block font-semibold text-[#1B1B20] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#9A3C53]" />
              <span>মোবাইল নম্বর</span>
              <span className="text-[#9A3C53]">*</span>
            </label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="01XXXXXXXXX"
              className="w-full px-3.5 py-2.5 bg-[#FAF6F0]/50 focus:bg-white border border-[#F4C2CE]/70 focus:border-[#9A3C53] rounded-xl outline-none transition-colors text-xs text-[#1B1B20]"
            />
          </div>

          {/* Field 3: Address */}
          <div>
            <label className="block font-semibold text-[#1B1B20] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9A3C53]" />
              <span>ডেলিভারি ঠিকানা</span>
              <span className="text-[#9A3C53]">*</span>
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="বাসা নম্বর, রোড নম্বর, এলাকা ও জেলা"
              className="w-full px-3.5 py-2 bg-[#FAF6F0]/50 focus:bg-white border border-[#F4C2CE]/70 focus:border-[#9A3C53] rounded-xl outline-none transition-colors text-xs text-[#1B1B20] resize-none"
            />
          </div>

          {/* Option 4: Delivery Area Selection */}
          <div>
            <label className="block font-semibold text-[#1B1B20] mb-1.5 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#9A3C53]" />
              <span>ডেলিভারি এলাকা</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryArea('inside')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center transition-all cursor-pointer ${
                  deliveryArea === 'inside'
                    ? 'bg-[#FCE7EB] border-[#9A3C53] text-[#9A3C53] font-semibold shadow-2xs'
                    : 'bg-white border-[#F4C2CE]/60 text-[#554245] hover:bg-[#FAF6F0]'
                }`}
              >
                <span>ঢাকা সিটির ভেতরে</span>
                <span className="text-[10px] opacity-80">চার্জ ৳৭০</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryArea('outside')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center transition-all cursor-pointer ${
                  deliveryArea === 'outside'
                    ? 'bg-[#FCE7EB] border-[#9A3C53] text-[#9A3C53] font-semibold shadow-2xs'
                    : 'bg-white border-[#F4C2CE]/60 text-[#554245] hover:bg-[#FAF6F0]'
                }`}
              >
                <span>ঢাকা সিটির বাইরে</span>
                <span className="text-[10px] opacity-80">চার্জ ৳১৩০</span>
              </button>
            </div>
          </div>

          {/* Cash on Delivery Notice */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <div>
              <span className="font-semibold text-emerald-900 block text-xs">
                ক্যাশ অন ডেলিভারি (Cash on Delivery)
              </span>
              <span className="text-[10px] text-emerald-700 block">
                পণ্য হাতে পেয়ে দেখে টাকা পরিশোধ করবেন
              </span>
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-[11px] font-medium text-[#877275] mb-1">
              বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="যেমন: দ্রুত পাঠালে ভালো হয়"
              className="w-full px-3 py-2 bg-[#FAF6F0]/40 focus:bg-white border border-[#F4C2CE]/50 focus:border-[#9A3C53] rounded-xl outline-none text-xs text-[#1B1B20]"
            />
          </div>

          {/* Bill Breakdown Summary */}
          {targetProduct && (
            <div className="pt-2 border-t border-[#F4C2CE]/40 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#877275]">
                <span>পণ্যের মূল্য</span>
                <span>৳ {productPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#877275]">
                <span>ডেলিভারি চার্জ</span>
                <span>৳ {deliveryCharge}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1B1B20] pt-1 border-t border-[#F4C2CE]/30">
                <span>সর্বমোট প্রদেয় বিল</span>
                <span className="text-[#9A3C53]">৳ {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Direct WhatsApp Action Section */}
          <div className="pt-2 space-y-2.5">
            {/* Native Link Button: Click to open WhatsApp immediately */}
            <a
              href={links.waMe}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectWhatsAppClick}
              className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer no-underline text-center"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>WhatsApp-এ অর্ডার পাঠান</span>
              <ExternalLink className="w-4 h-4 opacity-85 shrink-0" />
            </a>

            <div className="text-center text-[11px] text-[#877275]">
              মেসেজটি সরাসরি <strong className="text-[#1B1B20] font-bold">{WHATSAPP_DISPLAY}</strong> (+8801892116999) এ যাবে
            </div>

            {/* If user clicked or wants alternative connection options */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#F4C2CE]/60 space-y-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#554245] font-semibold">
                <Info className="w-3.5 h-3.5 text-[#9A3C53]" />
                <span>WhatsApp চালু করতে সমস্যা হচ্ছে?</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Fallback 1: Web / API link */}
                <a
                  href={links.apiWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDirectWhatsAppClick}
                  className="p-2 rounded-xl bg-white hover:bg-[#FCE7EB]/50 border border-[#F4C2CE]/70 text-[#1B1B20] flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Web</span>
                </a>

                {/* Fallback 2: Direct Phone App URI */}
                <a
                  href={links.appScheme}
                  onClick={handleDirectWhatsAppClick}
                  className="p-2 rounded-xl bg-white hover:bg-[#FCE7EB]/50 border border-[#F4C2CE]/70 text-[#1B1B20] flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#9A3C53]" />
                  <span>মোবাইল App এ খুলুন</span>
                </a>
              </div>

              {/* Fallback 3: Copy Formatted Message */}
              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-dashed border-[#F4C2CE] hover:border-emerald-400 text-[#554245] hover:text-emerald-800 flex items-center justify-center gap-2 transition-all cursor-pointer font-medium text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700 font-semibold">মেসেজ কপি হয়েছে! WhatsApp-এ পেস্ট করুন</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9A3C53]" />
                    <span>অর্ডার মেসেজ কপি করুন</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-[#877275] leading-relaxed text-center">
                টিপস: WhatsApp চ্যাট খুললে মেসেজটি ইনপুটে তৈরি থাকবে, শুধু <strong>'Send'</strong> বাটনে চাপ দিলেই অর্ডার সম্পন্ন হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
