// import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SampleLessonsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const sampleLessons = [
    {
        title: "Basic Python",
        desc: "AI နည်းပညာများ၏ အခြေခံအုတ်မြစ်ဖြစ်သော Python ကို အခြေခံမှစ၍ လေ့လာရန်။",
        img: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "Prompt Engineering",
        desc: "AI ထံမှ အကောင်းဆုံးနှင့် အတိကျဆုံး အဖြေများရရှိအောင် Prompt ရေးသားနည်းများ။",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "NotebookLM အသုံးပြုနည်း",
        desc: "Google ၏ NotebookLM ကို အသုံးပြု၍ မိမိ၏ စာရွက်စာတမ်း၊ Data များကို လေ့လာဆန်းစစ်နည်း။",
        img: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "AI လက်တွေ့အသုံးချနည်းများ",
        desc: "နေ့စဉ်ဘဝနှင့် လုပ်ငန်းခွင် အခက်အခဲများကို ဖြေရှင်းရန် AI ကို ထိရောက်စွာ အသုံးပြုနည်းများ။",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "Vite ဖြင့် Website ရေးနည်း",
        desc: "React, Tailwind နှင့် Vite ကိုအသုံးပြု၍ အလွန်မြန်ဆန်သော ခေတ်မီ Website များ ရေးဆွဲနည်း။",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "ကိုယ်ပိုင် AI Agent ဖန်တီးနည်း",
        desc: "မိမိလုပ်ငန်းအတွက် အလိုအလျောက် အလုပ်လုပ်ပေးမည့် ကိုယ်ပိုင် AI Assistant ဖန်တီးနည်း။",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "Gen AI for Social Media",
        desc: "Content, ပုံ, နှင့် ဗီဒီယိုများကို AI ဖြင့် အလွယ်တကူ ဖန်တီး၍ Social Media တွင် အသုံးပြုနည်း။",
        img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop"
    },
    {
        title: "AI Tools & Websites",
        desc: "နေ့စဉ်သုံး အကောင်းဆုံး AI Tools များနှင့် မဖြစ်မနေ သိထားသင့်သော Websites များအကြောင်း။",
        img: "https://images.unsplash.com/photo-1684469613149-5da70923e421?q=80&w=500&auto=format&fit=crop"
    }
];

export default function SampleLessonsModal({ isOpen, onClose }: SampleLessonsModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* 🌟 Background Blur Overlay 🌟 */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                ></motion.div>

                {/* 🌟 Modal Content Box 🌟 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-5xl bg-slate-50 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 md:p-8 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">📚 လေ့လာစရာ သင်ခန်းစာများ</h2>
                            <p className="text-slate-500 mt-2 text-sm md:text-base">AI GURU တွင် အောက်ပါ သင်ခန်းစာ ခေါင်းစဉ်များကို အသေးစိတ် လေ့လာနိုင်ပါမည်။</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Scrollable Content (Grid) */}
                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {sampleLessons.map((lesson, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                                    key={index}
                                    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="h-40 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{lesson.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{lesson.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}