import React, { useState } from 'react';
// ✅ Variants ကို Import ထဲမှ ပြန်ဖြုတ်လိုက်ပါသည်
import { motion, AnimatePresence } from 'framer-motion';

// ✅ TypeScript Error မပြစေရန် : any ဟု ပြောင်းပေးလိုက်ပါသည်
const containerVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const starVariants: any = {

    initial: { scale: 1 },
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.9 }
};

export default function FeedbackForm() {
    // States for Form
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    // Status States
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmittedSuccess(false);

        // Validation
        if (rating === 0) {
            setError('ကျေးဇူးပြု၍ ကြယ်ပွင့်အဆင့် သတ်မှတ်ပေးပါ (Rating Star)');
            return;
        }
        if (!name.trim()) {
            setError('ကျေးဇူးပြု၍ သင့်အမည်ကို ရိုက်ထည့်ပါ');
            return;
        }
        if (!comment.trim()) {
            setError('ကျေးဇူးပြု၍ သင့်အမြင်/အကြံပြုချက်ကို ရေးသားပေးပါ');
            return;
        }

        setIsSubmitting(true);

        // Simulation (ခတ္တစောင့်ဆိုင်းမှုကို အတုပြုလုပ်ခြင်း)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success 
        setIsSubmitting(false);
        setSubmittedSuccess(true);

        // Reset Form
        setRating(0);
        setName('');
        setComment('');

        // ၅ စက္ကန့်အကြာတွင် Success Message ဖျောက်ရန်
        setTimeout(() => setSubmittedSuccess(false), 5000);
    };

    return (
        <motion.section
            id="feedback"
            className="py-16 md:py-20 px-4 bg-slate-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants} // ✅ ယခု လုံးဝ အနီမပြတော့ပါ
        >
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                        Feedback
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
                        AI GURU အပေါ် သင့်ရဲ့အမြင်ကို မျှဝေပေးပါ
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                        အကောင့်ဖွင့်ထားသူရော၊ မဖွင့်ထားသူပါ အားလုံး Rating ပေးနိုင်ပြီး အကြံပြုချက်များ ရေးသားနိုင်ပါတယ် ခင်ဗျာ။
                    </p>
                </div>

                {/* Feedback Form */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* 1. Star Rating Section */}
                    <div className="text-center border-b border-slate-100 pb-8">
                        <label className="block text-lg font-bold text-slate-700 mb-5">
                            AI GURU ကို ဘယ်လောက်အထိ သဘောကျပါသလဲ?
                        </label>
                        <div className="flex justify-center items-center gap-2 sm:gap-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    type="button"
                                    variants={starVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="focus:outline-none p-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${(hoveredRating || rating) >= star
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-slate-300'
                                            }`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        fill="none"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </motion.button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="mt-4 text-sm font-semibold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full">
                                သင်သတ်မှတ်လိုက်သော အဆင့်: {rating} Stars
                            </p>
                        )}
                    </div>

                    {/* 2. Name & Comment Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label htmlFor="name" className="block text-sm font-bold text-slate-600 mb-2.5">
                                သင့်အမည် (သို့မဟုတ်) အကောင့်အမည် <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="ဥပမာ - မောင်မောင်"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:ring focus:ring-blue-100 transition"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="comment" className="block text-sm font-bold text-slate-600 mb-2.5">
                                သင့်အမြင် (သို့မဟုတ်) အကြံပြုချက် <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="သင်ခန်းစာတွေက အဆင်ပြေရဲ့လား? ဘာတွေထပ်တိုးပေးစေချင်လဲ?..."
                                rows={5}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:ring focus:ring-blue-100 transition resize-none"
                            />
                        </div>
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-red-600 bg-red-50 p-3 rounded-lg text-center">
                                ⚠️ Error: {error}
                            </motion.p>
                        )}
                        {submittedSuccess && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-green-700 bg-green-50 p-4 rounded-lg text-center border border-green-100 shadow-inner">
                                ✅ ကျေးဇူးတင်ပါတယ်! သင့်ရဲ့ အကြံပြုချက်ကို အောင်မြင်စွာ ပေးပို့ပြီးပါပြီ။ AI GURU ကို ပိုမိုကောင်းမွန်အောင် ဆက်လက်ကြိုးစားပါ့မယ်။
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* 3. Submit Button */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full sm:w-auto min-w-[200px] text-white px-10 py-4 rounded-full font-bold text-base md:text-lg transition shadow-lg hover:shadow-xl ${isSubmitting
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/20 border-b-white rounded-full animate-spin"></div>
                                    ပေးပို့နေဆဲ...
                                </span>
                            ) : (
                                'အကြံပြုချက် ပေးပို့မည် →'
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </motion.section>
    );
}