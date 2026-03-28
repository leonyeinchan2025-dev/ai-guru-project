import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '../components/AuthModal';
import SampleLessonsModal from '../components/SampleLessonsModal'; // 🌟 ဤစာကြောင်း ထပ်ထည့်ပါ
import footerPortraitTransparent from '../assets/amara1.png'; // သင့်ပုံနာမည်ပြောင်းပေးပါ
// ✅ FeedbackForm ကို import လုပ်ပါ
import FeedbackForm from '../components/FeedbackForm';
// 🌟 TypeScript Error ကို ကျော်ဖြတ်ရန် ကြေညာခြင်း 🌟
const Marquee = 'marquee' as any;

const logo = '/logo.png';
import myPromoVideo from '../assets/roboot.mp4'; // သင့် video နာမည်ပြောင်းပေးပါ
import myPromoVideo1 from '../assets/ai.mp4'; // သင့် video နာမည်ပြောင်းပေးပါ
// const studyIllustration = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80';
// const aboutIllustration = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80';

const roadmapData = [
    { step: '01', title: 'Math for AI', desc: 'AI အတွက် လိုအပ်သော သင်္ချာ အခြေခံများ' },
    { step: '02', title: 'Machine Learning', desc: 'ML အယ်လဂိုရီသမ်များ သင်ယူပါ' },
    { step: '03', title: 'Deep Learning', desc: 'Neural Networks နှင့် Deep Learning' },
    { step: '04', title: 'Build Projects', desc: 'လက်တွေ့ ပရောဂျက်များ တည်ဆောက်ပါ' },
    { step: '05', title: 'Deployment', desc: 'မိမိ၏ AI မော်ဒယ်များကို အင်တာနက်ပေါ်သို့ တင်ပါ' },
];

export default function Home() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

    // 🌟 အသစ်ထပ်တိုးရမည့် State များ (တစ်ခါသာ ကြေညာရပါမည်) 🌟
    // 🌟 အသစ်ထပ်တိုးရမည့် State များ (total_visits ပါ ထပ်တိုးထားပါသည်) 🌟
    const [stats, setStats] = useState({ total_visits: 0, total_users: 0, total_feedbacks: 0 });
    const [highlightedFeedbacks, setHighlightedFeedbacks] = useState<any[]>([]);
    const [latestFeedbacks, setLatestFeedbacks] = useState<any[]>([]);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
        document.title = "AI GURU - AI လေ့လာစရာ";

        // 🌟 1. Visitor အရေအတွက် တိုးရန် (Session တွင် တစ်ခါသာ တိုးမည်) 🌟
        const recordVisit = async () => {
            if (!sessionStorage.getItem('has_visited')) {
                try {
                    await api.post('/visit');
                    sessionStorage.setItem('has_visited', 'true');
                } catch (e) { console.error("Visit log error", e); }
            }
        };

        // 🌟 2. Data များ ဆွဲယူရန် 🌟
        const fetchData = async () => {
            try {
                const statRes = await api.get('/stats');
                // 🌟 အသစ်: Database မှ တကယ့်အရေအတွက်နှင့် မူရင်း (Base) အရေအတွက်များကို ပေါင်းပေးခြင်း 🌟
                setStats({
                    total_visits: statRes.data.total_visits + 30,     // ကြည့်ရှုသူ 20 ပေါင်းမည်
                    total_users: statRes.data.total_users + 10,       // လေ့လာသူ 10 ပေါင်းမည်
                    total_feedbacks: statRes.data.total_feedbacks + 5 // သုံးသပ်ချက် 5 ပေါင်းမည်
                });
                const fbRes = await api.get('/feedbacks/highlighted');
                setHighlightedFeedbacks(fbRes.data);

                const latestRes = await api.get('/feedbacks/latest'); // နောက်ဆုံး ၃ ခု
                setLatestFeedbacks(latestRes.data);
            } catch (err) {
                console.error("Error fetching homepage data", err);
            }
        };

        recordVisit().then(fetchData);

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
    };

    const handleLessonClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setIsAuthModalOpen(true);
        }
    };

    const aiFields = [
        { title: "Machine Learning (ML)", desc: "ကွန်ပျူတာများကို ပရိုဂရမ်တိုက်ရိုက်ရေးဆွဲစရာမလိုဘဲ Data များမှတဆင့် ကိုယ်တိုင်သင်ယူစေသော နည်းပညာဖြစ်ပါသည်။", img: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80" },
        { title: "Computer Vision (CV)", desc: "လူသားများကဲ့သို့ ကွန်ပျူတာများကို ပုံရိပ်များနှင့် ဗီဒီယိုများမှ အချက်အလက်များကို မြင်ယောင်နားလည်စေသော နည်းပညာဖြစ်ပါသည်။", img: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80" },
        { title: "Natural Language Processing", desc: "လူသားများ၏ စကားပြောနှင့် စာသားများကို ကွန်ပျူတာမှ နားလည်၊ ဘာသာပြန်၊ တုံ့ပြန်နိုင်စေရန် ဖန်တီးပေးသော နည်းပညာဖြစ်ပါသည်။", img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80" },
        { title: "Generative AI", desc: "စာသား၊ ပုံရိပ်၊ အသံ နှင့် ကုဒ်များကို အသစ်ဖန်တီးပေးနိုင်သော (ဥပမာ- ChatGPT ကဲ့သို့) ခေတ်မီ AI နည်းပညာဖြစ်ပါသည်။", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" }
    ];

    return (
        <div className="min-h-screen font-sans scroll-smooth overflow-x-hidden">

            {/* Navigation Bar */}
            {/* /* 🌟 Home Page Navigation Bar (Mobile တွင် Lessons Page အတိုင်း အတိအကျဖြစ်စေရန်) 🌟 */}
            <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    {/* min-h-[5rem] နှင့် py-2 ကိုသုံး၍ အပေါ်အောက် နေရာကျယ်ကျယ် ပေးထားပါသည် */}
                    <div className="flex justify-between items-center min-h-[5rem] py-2">

                        {/* 🌟 ဘယ်ဘက်အခြမ်း (Logo + AI GURU + Home Icon - အလျားလိုက်) 🌟 */}
                        <div className="flex items-center gap-2 sm:gap-3 z-50">
                            <a href="#home" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                                <img src={logo} alt="AI GURU Logo" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-blue-100 shadow-sm object-cover" />
                                <div className="text-xl md:text-2xl font-black text-blue-600 tracking-tight whitespace-nowrap">AI GURU</div>
                            </a>

                            {/* 📱 Mobile တွင် Login ဝင်ပြီးပါက အိမ်ပုံစံ Icon သီးသန့်ပြရန် (စာသား မပါပါ) */}
                            {user && (
                                <a href="#home" className="md:hidden flex items-center gap-1.5 text-slate-500 hover:text-blue-600 pl-2 sm:pl-3 border-l-2 border-slate-200 transition-colors ml-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* 💻 Desktop Links (ဖုန်းတွင် ပျောက်နေမည်) */}
                        <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
                            <a href="#home" className="text-slate-700 font-semibold hover:text-blue-600 transition">Home</a>
                            <a href="#about" className="text-slate-700 font-semibold hover:text-blue-600 transition">About</a>
                            <a href="#fields" className="text-slate-700 font-semibold hover:text-blue-600 transition">AI Fields</a>
                            <a href="#roadmap" className="text-slate-700 font-semibold hover:text-blue-600 transition">Roadmap</a>
                            <a href="#contact" className="text-slate-600 hover:text-blue-600 font-semibold transition">Contact Us</a>
                            <a href="/lessons" onClick={handleLessonClick} className="text-slate-700 font-semibold hover:text-blue-600 transition">သင်ခန်းစာများ</a>
                        </div>

                        {/* 💻 Desktop Auth (ဖုန်းတွင် ပျောက်နေမည်) */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <>
                                    <span className="font-medium text-slate-700">မင်္ဂလာပါ, <span className="text-blue-600">{user.fullname}</span></span>
                                    {user.is_admin && <a href="/admin" className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-bold hover:bg-purple-200 transition">Admin</a>}
                                    <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-full hover:bg-red-100 transition font-medium text-sm">ထွက်မည်</button>
                                </>
                            ) : (
                                <button onClick={() => setIsAuthModalOpen(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-bold shadow-md">ဝင်ရောက်မည်</button>
                            )}
                        </div>

                        {/* 🌟 ညာဘက်အခြမ်း (Profile အပေါ် / Menu အောက် - ဒေါင်လိုက် flex-col) 🌟 */}
                        {/* flex-col နှင့် items-end ကိုသုံး၍ အပေါ်/အောက် ညာဘက်ကပ်နေစေပါသည် */}
                        <div className="md:hidden flex flex-col items-end gap-1.5 z-50">

                            {/* ၁။ Profile Badge (အပေါ်) */}
                            {user ? (
                                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-full shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[11px] sm:text-xs font-bold text-slate-700 max-w-[70px] sm:max-w-[120px] truncate">
                                        {user.fullname}
                                    </span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="text-[11px] sm:text-xs font-bold bg-blue-600 text-white py-1 px-3 rounded-full shadow-sm active:bg-blue-700 transition"
                                >
                                    ဝင်ရောက်မည်
                                </button>
                            )}

                            {/* ၂။ Menu Button (အောက်) */}
                            <button
                                className="flex items-center justify-center gap-1 text-slate-700 py-1 px-2.5 bg-white border border-slate-200 rounded-lg shadow-sm active:bg-slate-100 transition hover:bg-slate-50"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>

                {/* 🌟 ၃။ Mobile Sidebar Menu (ဒုတိယပုံအတိုင်း အတိအကျ ပြင်ဆင်ထားသော UI) 🌟 */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden cursor-pointer"
                            />

                            {/* Sidebar (ဘယ်ဘက်တွင် ထောင့်လုံးထားပါသည်) */}
                            <motion.div
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-[#f8fafc] shadow-2xl z-[70] flex flex-col md:hidden rounded-l-3xl overflow-hidden"
                            >
                                {/* Header (Logo & Close Button) */}
                                <div className="flex justify-between items-center p-5 bg-white border-b border-slate-100 shrink-0 shadow-sm z-10">
                                    <div className="flex items-center gap-3">
                                        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-blue-100 shadow-sm object-cover" />
                                        <span className="text-xl font-extrabold text-blue-700 tracking-wide">AI GURU</span>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-full bg-slate-50 text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors active:scale-90"
                                    >
                                        {/* အထွက်မြှားလေး (Close) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Menu Links (Card ပုံစံ လှပသော List) */}
                                <div className="flex flex-col p-5 flex-1 overflow-y-auto">
                                    <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">🏠</span> <span>Home</span>
                                    </a>
                                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">📖</span> <span>About</span>
                                    </a>
                                    <a href="#fields" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">🤖</span> <span>AI Fields</span>
                                    </a>
                                    <a href="#roadmap" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">🗺️</span> <span>Roadmap</span>
                                    </a>
                                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-6 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">📞</span> <span>Contact Us</span>
                                    </a>

                                    {/* Lessons Button (Blue Tint) */}
                                    <a href="/lessons" onClick={(e) => { handleLessonClick(e); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-3 bg-blue-100 border border-blue-200 text-blue-800 font-extrabold px-5 py-4 rounded-2xl shadow-sm mb-2 active:scale-95 transition-all">
                                        📚 <span>သင်ခန်းစာများ</span>
                                    </a>
                                </div>

                                {/* Bottom Auth / Logout Section (အောက်ခြေတွင် ကပ်နေမည်) */}
                                <div className="p-5 bg-white border-t border-slate-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                    {user ? (
                                        <div className="flex flex-col gap-3">
                                            {user.is_admin && (
                                                <a href="/admin" className="flex items-center justify-center gap-2 bg-purple-100 text-purple-700 border border-purple-200 font-bold px-4 py-3.5 rounded-2xl shadow-sm active:scale-95 transition-all">
                                                    ⚙️ Admin Panel
                                                </a>
                                            )}
                                            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold px-4 py-4 rounded-2xl border border-red-100 shadow-sm active:scale-95 transition-all hover:bg-red-100">
                                                🚪 ထွက်မည် (Logout)
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-4 py-4 rounded-2xl shadow-md active:scale-95 transition-all hover:bg-blue-700">
                                            🔑 အကောင့် ဝင်ရောက်မည်
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>

            {/* 🌟 Main Content စတင်ပါပြီ 🌟 */}
            <main className="pt-[5rem]">

                {/* 🌟 0. အသစ်ပြောင်းရွှေ့ထားသော Marquee စာတန်းထိုး 🌟 */}
                <div className="bg-blue-600 text-white py-2.5 overflow-hidden flex items-center shadow-md border-b border-blue-700">
                    <div className="bg-yellow-400 text-blue-900 font-bold px-4 py-1 text-sm z-10 shadow-sm shrink-0 border-r-2 border-yellow-500 hidden md:block">
                        နောက်ဆုံးရ အချက်အလက်များ 📢
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
                    <Marquee className="flex-1 text-sm font-medium tracking-wide">

                        {/* 🌟 Stats အရေအတွက် (၃) မျိုးလုံးကို Marquee ထဲ ပေါင်းထည့်ထားပါသည် 🌟 */}
                        <span className="mx-8 font-extrabold text-yellow-300 tracking-wider">
                            👀 ဝင်ရောက်ကြည့်ရှုသူများ: {stats.total_visits}+ ဦး &nbsp;&nbsp;|&nbsp;&nbsp;
                            🎓 သင်ခန်းစာ လေ့လာနေသူများ: {stats.total_users}+ ဦး &nbsp;&nbsp;|&nbsp;&nbsp;
                            📝 Customer စကားသံများ: {stats.total_feedbacks}+ ခု
                        </span>

                        <span className="mx-4 text-blue-300">|</span>

                        {/* 🌟 နောက်ဆုံးရ Feedback ၃ ခု 🌟 */}
                        {latestFeedbacks.map((fb, idx) => (
                            <span key={fb.id} className="mx-8">
                                <span className="text-yellow-300">★</span> <span className="font-bold text-blue-100">[{fb.name}]:</span> "{fb.comment}"
                                {idx !== latestFeedbacks.length - 1 && <span className="ml-8 text-blue-300">|</span>}
                            </span>
                        ))}
                    </Marquee>
                </div>


                {/* 🌟 1. Hero Section 🌟 */}
                <div id="home" className="pt-10 pb-16 md:pb-20 px-4 max-w-7xl mx-auto scroll-mt-20 bg-gradient-to-b from-[#f0f9ff] to-white rounded-b-[3rem]">
                    <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
                        <div className="md:text-left text-center">
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                                အနာဂတ်ကို <span className="text-blue-600">AI</span> ဖြင့် တည်ဆောက်ပါ
                            </motion.h1> <br /><br />
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 mb-10 leading-relaxed">
                                AI GURU မှကြိုဆိုပါတယ်။ <br /><br className="hidden md:block" /> <br />ဤနေရာတွင် Artificial Intelligence နည်းပညာများကို <b>မြန်မာဘာသာဖြင့် လွယ်ကူစွာ</b> အခြေခံမှစ၍ ကျွမ်းကျင်အဆင့်အထိ လေ့လာနိုင်ပါသည်။ <br className="hidden md:block" /> <br /> အခြေခံ AI သင်ခန်းစာများအား <span className="text-yellow-600"> <b>ပညာဒါန </b></span> အခမဲ့ လေ့လာနိုင်ပါသည်။
                            </motion.p>

                            {/* 🌟 ခလုတ် (၂) ခု ယှဉ်လျက် ပေါ်စေရန် Flex Box ဖြင့် ထုပ်ထားပါသည် 🌟 */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                {!user && (
                                    <motion.button onClick={() => setIsAuthModalOpen(true)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                                        စာရင်းသွင်း၍ ယခုပဲ လေ့လာလိုက်ပါ
                                    </motion.button>
                                )}
                                {user && (
                                    <motion.a href="/lessons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl text-center">
                                        သင်ခန်းစာများသို့ ဆက်သွားမည် →
                                    </motion.a>
                                )}

                                {/* 🌟 အသစ်ထပ်တိုးလိုက်သော သင်ခန်းစာနမူနာများ ခလုတ် 🌟 */}
                                <motion.button onClick={() => setIsSampleModalOpen(true)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white text-blue-700 border-2 border-blue-100 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 hover:border-blue-200 transition shadow-lg hover:shadow-xl">
                                    အခြေခံ AI သင်ခန်းစာများ 📖
                                </motion.button>
                            </div>

                        </div>


                        {/* 🌟 ပြင်ဆင်ထားသော Hero Section Video (Portrait / 9:16 ပုံစံ) 🌟 */}
                        <div className="md:mt-0 mt-16 flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                /* 🌟 ဖုန်းစခရင် အရွယ်အစားခန့်သာ ရှိစေရန် max-w-[280px] နှင့် md:max-w-[320px] ဖြင့် ကန့်သတ်ထားပါသည် */
                                className="w-full max-w-[280px] md:max-w-[320px] p-2 md:p-3 bg-white rounded-[2.5rem] shadow-2xl border border-blue-50 mx-auto"
                            >
                                {/* 🌟 aspect-[9/16] ကို အသုံးပြု၍ ဒေါင်လိုက် အချိုးအစား ဖန်တီးထားပါသည် 🌟 */}
                                <div className="relative w-full rounded-[1.8rem] overflow-hidden aspect-[9/16] bg-slate-900 shadow-inner">
                                    <video
                                        src={myPromoVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>


                {/* 🌟 2. About Section 🌟 */}
                <div id="about" className="py-16 md:py-20 bg-[#f8fafc] border-y border-slate-100 scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex items-center gap-16">

                            <div className="md:mt-0 mt-16 text-center">
                                <motion.video
                                    src={myPromoVideo1} /* 🌟 Local ဖိုင် မသုံးပါက "https://.../video.mp4" ဟု တိုက်ရိုက်ထည့်နိုင်သည် */
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="md:w-full md:max-w-xl md:h-auto md:max-h-full h-80 max-h-96 mx-auto rounded-3xl object-cover shadow-2xl border-[6px] border-white"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                />
                            </div>
                            <div className="md:w-1/2 text-center md:text-left">
                                {/* ✨ Badge အသစ်ကို ဤနေရာတွင် ထည့်သွင်းထားပါသည် */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-block px-4 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm"
                                >
                                    ✨ Learn AI. Shape the Future.
                                </motion.div>

                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">AI ဆိုတာ ဘာလဲ?</h2>
                                <p className="text-lg text-slate-600 leading-relaxed mb-6 text-left">
                                    <b>Artificial Intelligence (AI)</b> ဆိုသည်မှာ ကွန်ပျူတာစနစ်များကို လူသားများကဲ့သို့ တွေးခေါ်၊ ဆုံးဖြတ်၊ သင်ယူနိုင်စွမ်းရှိစေရန် ဖန်တီးထားသော နည်းပညာဖြစ်ပါသည်။
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed text-left">
                                    ယနေ့ခေတ်တွင် AI သည် ဆေးဘက်ဆိုင်ရာ၊ ပညာရေး၊ စီးပွားရေးနှင့် နေ့စဉ်ဘဝ လုပ်ငန်းဆောင်တာများစွာတွင် မရှိမဖြစ် အရေးပါသော အခန်းကဏ္ဍမှ ပါဝင်လျက်ရှိသည်။ AI GURU သည် ထိုနည်းပညာများကို မြန်မာလူငယ်များ လွယ်ကူလျင်မြန်စွာ လေ့လာနိုင်ရန် ရည်ရွယ်ဖန်တီးထားခြင်း ဖြစ်ပါသည်။
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🌟 3. AI Fields Section (ယခင် ပြင်ဆင်ပြီးသားအတိုင်း) 🌟 */}
                <div id="fields" className="bg-[#f5f3ff] py-16 md:py-20 border-b border-indigo-50 scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm"
                            >
                                ✨ From Curiosity to Intelligence
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">AI နယ်ပယ်များ</h2>
                            <p className="text-lg text-slate-600">လေ့လာနိုင်မည့် အဓိက Artificial Intelligence နယ်ပယ်ကြီး (၄) ခု</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {aiFields.map((field, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: index % 2 === 0 ? 40 : -40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-white group"
                                >
                                    <div className="h-40 overflow-hidden relative">
                                        <img src={field.img} alt={field.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{field.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{field.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 🌟 4. Roadmap Section (UI/UX Upgraded) 🌟 */}
                <div id="roadmap" className="relative py-16 md:py-20 bg-slate-50 scroll-mt-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#3b82f6 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                        {/* Header Section */}
                        <div className="text-center mb-16">
                            {/* ✨ Badge အသစ်ကို ဤနေရာတွင် ထည့်သွင်းထားပါသည် */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm"
                            >
                                ✨ Unlock the Power of Artificial Intelligence
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-wide">Roadmap</h2>
                            <p className="text-lg text-slate-500 font-medium">အဆင့်ဆင့် လေ့လာရမည့် လမ်းညွှန်မြေပုံ</p>
                        </div>

                        <div className="max-w-5xl mx-auto relative">
                            <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-1 md:w-1.5 bg-gradient-to-b from-blue-300 via-indigo-400 to-blue-300 transform md:-translate-x-1/2 rounded-full shadow-sm opacity-70"></div>

                            <div className="flex flex-col gap-10 md:gap-8">
                                {roadmapData.map((data, index) => {
                                    const isEven = index % 2 === 0;
                                    return (
                                        <div key={data.step} className={`relative flex w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                                            <div className="absolute left-[28px] md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white border-[4px] border-blue-600 shadow-md z-20"></div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ duration: 0.5 }}
                                                className="relative w-[calc(100%-60px)] md:w-[45%] p-6 md:p-8 rounded-2xl bg-white shadow-md border border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ml-[60px] md:ml-0"
                                            >
                                                <div className="absolute -top-5 -left-5 md:-top-6 md:-left-6 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border-[4px] border-white shadow-lg z-20">
                                                    <span className="text-white font-black text-base md:text-lg">{data.step}</span>
                                                </div>

                                                <h3 className="text-xl font-bold text-slate-800 mb-2 mt-1 md:mt-2">{data.title}</h3>
                                                <p className="text-slate-500 text-sm leading-relaxed">{data.desc}</p>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ✅ Website Stats (အရေအတွက် (၃) မျိုးလုံး ပြသခြင်း - ဖုန်းတွင်ပါ ဘေးတိုက်ယှဉ်ပြရန်) ✅ */}
                <div className="py-8 md:py-12 bg-white border-b border-slate-100">
                    <div className="max-w-5xl mx-auto px-2 sm:px-4 flex flex-row justify-between md:justify-around items-center text-center">

                        {/* ၁။ ဝင်ရောက်ကြည့်ရှုသူများ */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-1/3 px-1">
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-teal-500 mb-1 md:mb-2">{stats.total_visits}+</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-tight sm:tracking-widest text-[10px] sm:text-xs md:text-sm leading-tight">ကြည့်ရှုသူများ</p>
                        </motion.div>

                        {/* မျဉ်းခြား (Mobile တွင်ပါ ပြသမည်) */}
                        <div className="w-px h-10 md:h-16 bg-slate-200 shrink-0"></div>

                        {/* ၂။ လေ့လာနေသူများ (Login ဝင်ထားသူများ) */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-1/3 px-1">
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-blue-600 mb-1 md:mb-2">{stats.total_users}+</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-tight sm:tracking-widest text-[10px] sm:text-xs md:text-sm leading-tight">လေ့လာနေသူများ</p>
                        </motion.div>

                        {/* မျဉ်းခြား (Mobile တွင်ပါ ပြသမည်) */}
                        <div className="w-px h-10 md:h-16 bg-slate-200 shrink-0"></div>

                        {/* ၃။ သုံးသပ်ချက်များ */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="w-1/3 px-1">
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-indigo-600 mb-1 md:mb-2">{stats.total_feedbacks}+</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-tight sm:tracking-widest text-[10px] sm:text-xs md:text-sm leading-tight">သုံးသပ်ချက်များ</p>
                        </motion.div>

                    </div>
                </div>

                {/* ✅ Highlighted Feedbacks (အကောင်းဆုံး အကြံပြုချက်များ ပြသခြင်း) ✅ */}
                {highlightedFeedbacks.length > 0 && (
                    <div className="py-16 bg-[#f8fafc]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">အသုံးပြုသူများ၏ စကားသံများ</h2>
                                <p className="text-slate-500 text-lg">AI GURU နှင့်ပတ်သက်၍ လေ့လာသူများ၏ ရင်တွင်းစကားများ</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {highlightedFeedbacks.map((fb, index) => (
                                    <motion.div
                                        key={fb.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative"
                                    >
                                        <div className="absolute top-6 right-8 text-4xl text-blue-100 font-serif">"</div>
                                        <div className="flex text-yellow-400 text-lg mb-4">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i}>{i < fb.rating ? '★' : '☆'}</span>
                                            ))}
                                        </div>
                                        <p className="text-slate-600 italic mb-6 leading-relaxed relative z-10">
                                            "{fb.comment}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold uppercase">
                                                {fb.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-800">{fb.name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ 5. Feedback Section (Roadmap ၏အောက်၊ Footer ၏အပေါ်) ✅ */}
                <FeedbackForm />
            </main> {/* 🌟 ဤနေရာတွင် </main> အပိတ်လေးကို အသစ်ထည့်ပေးပါ 🌟 */}

            {/* 🌟 Footer Section (Symmetrically Framed with Representative Portraits) 🌟 */}
            <footer id="contact" className="bg-slate-800 pt-16 pb-8 border-t border-slate-700 text-center relative overflow-hidden">






                {/* 🖼️ Left Portrait (Looking Right/Inwards) */}
                {/* 📱 ဖုန်းတွင် h-[280px] ဖြင့် သေးထားပြီး၊ မူရင်းပုံကို အတွင်းလှည့်ရန် scaleX: -1 ပြုလုပ်ထားပါသည် */}
                <motion.img
                    src={footerPortraitTransparent}
                    alt="AI GURU Myanmar Representative Left"
                    className="absolute -left-10 md:left-6 top-[20%] md:top-[10%] h-[280px] md:h-[450px] w-auto opacity-30 md:opacity-70 pointer-events-none z-0"
                    initial={{ opacity: 0, x: -50, scaleX: -1 }}
                    whileInView={{ opacity: 0.7, x: 0, scaleX: -1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* 🖼️ Right Portrait (Looking Left/Inwards) */}
                {/* 📱 ဖုန်းတွင် hidden md:block ဖြင့် ဖျောက်ထားပြီး၊ မူရင်းပုံအတိုင်း အတွင်းလှည့်ရန် scaleX: 1 ထားပါသည် */}
                <motion.img
                    src={footerPortraitTransparent}
                    alt="AI GURU Myanmar Representative Right"
                    className="hidden md:block absolute right-6 top-[10%] h-[450px] w-auto opacity-70 pointer-events-none z-0"
                    initial={{ opacity: 0, x: 50, scaleX: 1 }}
                    whileInView={{ opacity: 0.7, x: 0, scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />

                <div className="max-w-4xl mx-auto px-4 z-10 relative">
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <img src={logo} alt="AI GURU Logo" className="w-12 h-12 rounded-full border border-slate-600 bg-white object-cover" />
                        <span className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                            AI GURU
                        </span>
                    </div>

                    <p className="text-slate-300 text-sm md:text-base mb-10">
                        ဆက်သွယ်ရန် Hot Line (Admin) Call and Viber: +959444445546 <br /> Email - leonyeinchan2025@gmail.com
                    </p>

                    <p className="text-slate-300 text-sm md:text-base mb-10">
                        AI Technology Learning - AI နည်းပညာအား မြန်မာဘာသာဖြင့် လွယ်ကူစွာ လေ့လာနိုင်သည် <br className="hidden md:block" /> <br /> Social Media / Online Market များအတွက် ကြော်ငြာ Content များ နှင့် ကိုယ်ပိုင်လုပ်ငန်းများအတွက်
                        <b> Web App/ Mobile App များ </b>ကိုလည်း ဈေးနှုန်းချိုသာစွာဖြင့် ဝန်ဆောင်မှုပေးနေပါသည်။
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <a href="https://www.facebook.com/aigurumm" target="_blank" rel="noopener noreferrer" className="border border-slate-600 text-slate-300 px-8 py-2.5 rounded-full text-sm font-medium hover:bg-slate-700 hover:border-blue-400 hover:text-blue-400 transition-all">
                            Facebook
                        </a>
                        <a href="https://www.youtube.com/@leoonlinetech" target="_blank" rel="noopener noreferrer" className="border border-slate-600 text-slate-300 px-8 py-2.5 rounded-full text-sm font-medium hover:bg-slate-700 hover:border-red-400 hover:text-red-400 transition-all">
                            YouTube
                        </a>
                        <a href="https://www.tiktok.com/@leonyein9?_r=1&_t=ZS-94LhT4oMsxr" target="_blank" rel="noopener noreferrer" className="border border-slate-600 text-slate-300 px-8 py-2.5 rounded-full text-sm font-medium hover:bg-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all">
                            TikTok
                        </a>
                        <a href="https://www.instagram.com/leonyein9/" target="_blank" rel="noopener noreferrer" className="border border-slate-600 text-slate-300 px-8 py-2.5 rounded-full text-sm font-medium hover:bg-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all">
                            Instagram
                        </a>
                    </div>

                    <div className="text-slate-400 text-sm border-t border-slate-700/80 pt-8 z-10 relative">
                        <p className="text-sm text-slate-500 font-medium">
                            &copy; {new Date().getFullYear()} AI GURU Myanmar. All rights reserved.
                        </p> <br /> <p>Created by <span className="text-blue-400 font-semibold">Leo Nyein Chan</span></p>
                    </div>
                </div>
            </footer>
            {isAuthModalOpen && <AuthModal isOpen={true} onClose={() => setIsAuthModalOpen(false)} />}

            {/* 🌟 အခြား Code များ၏ အောက်ဆုံးနားတွင် ဤ Modal ကို ထည့်ပေးရပါမည် 🌟 */}
            <SampleLessonsModal
                isOpen={isSampleModalOpen}
                onClose={() => setIsSampleModalOpen(false)}
            />

        </div>
    );
}