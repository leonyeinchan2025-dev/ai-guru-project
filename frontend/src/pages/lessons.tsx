import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

interface Lesson {
    id: number;
    title: string;
    content: string;
    category: string;
    file_url: string | null;
}

const fallbackImages = [
    "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
];

export default function Lessons() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [completedIds, setCompletedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState<any[]>([]);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    // 🌟 API အားလုံးဆွဲယူမည့် useEffect ကို စနစ်တကျ ပြန်လည်ရေးသားထားပါသည် 🌟
    useEffect(() => {
        if (!user) {
            window.location.href = '/';
            return;
        }

        const fetchAllData = async () => {
            try {
                // ၁။ Resources (စာအုပ်စာဆောင်များ) ဆွဲယူခြင်း
                const resResources = await api.get('/resources');
                setResources(resResources.data);

                // ၂။ သင်ခန်းစာ အားလုံးဆွဲယူခြင်း
                const resLessons = await api.get('/lessons', { params: { user_id: user.user_id } });
                setLessons(resLessons.data);

                // ၃။ User ၏ Progress ဆွဲယူခြင်း
                const resProgress = await api.get(`/progress/${user.user_id}`);
                setCompletedIds(resProgress.data);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    // 🌟 ဖိုင်အမျိုးအစား ခွဲခြားမည့် Helper Function 🌟
    const getFileType = (url: string | null) => {
        if (!url) return 'none';
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) return 'image';
        if (lowerUrl.match(/\.(mp4|webm|ogg)$/) != null) return 'video';
        if (lowerUrl.match(/\.(pdf)$/) != null) return 'pdf';
        return 'other';
    };

    if (!user) return null;

    // 🌟 ရာခိုင်နှုန်း တွက်ချက်ခြင်း 🌟
    const totalLessons = lessons.length;
    const completedCount = completedIds.length;
    const progressPercentage = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* 🌟 Lessons Page Navigation Bar 🌟 */}
            <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center min-h-[5rem] py-2">

                        <div className="flex items-center gap-2 sm:gap-3 z-50">
                            <a href="/#home" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                                <img src="/logo.png" alt="AI GURU Logo" className="h-9 w-9 md:h-11 md:w-11 rounded-full border border-blue-100 shadow-sm object-cover" />
                                <div className="text-xl md:text-2xl font-black text-blue-600 tracking-tight">AI GURU</div>
                            </a>

                            <a href="/#home" title="ပင်မစာမျက်နှာသို့" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 pl-2 sm:pl-3 border-l-2 border-slate-200 transition-colors ml-1">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span className="hidden md:inline font-bold text-sm">Home</span>
                            </a>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 z-50">
                            {user && (
                                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-full shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[11px] sm:text-xs font-bold text-slate-700 max-w-[70px] sm:max-w-[120px] truncate">
                                        {user.fullname || 'User'}
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="flex items-center justify-center gap-1 text-slate-700 py-1 px-2.5 bg-white border border-slate-200 rounded-lg shadow-sm active:bg-slate-100 transition hover:bg-slate-50"
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

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] cursor-pointer"
                            />
                            <motion.div
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-[#f8fafc] shadow-2xl z-[70] flex flex-col rounded-l-3xl overflow-hidden"
                            >
                                <div className="flex justify-between items-center p-5 bg-white border-b border-slate-100 shrink-0 shadow-sm z-10">
                                    <div className="flex items-center gap-3">
                                        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full border border-blue-100 shadow-sm object-cover" />
                                        <span className="text-xl font-extrabold text-blue-700 tracking-wide">AI GURU</span>
                                    </div>
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full bg-slate-50 text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors active:scale-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-col p-5 flex-1 overflow-y-auto">
                                    <a href="/#home" className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">🏠</span> <span>Home</span>
                                    </a>
                                    <a href="/#about" className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">📖</span> <span>About</span>
                                    </a>
                                    <a href="/#fields" className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">🤖</span> <span>AI Fields</span>
                                    </a>
                                    <a href="/#roadmap" className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-3 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">🗺️</span> <span>Roadmap</span>
                                    </a>
                                    <a href="/#contact" className="flex items-center gap-4 bg-white border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-2xl shadow-sm mb-6 hover:border-blue-300 transition-colors">
                                        <span className="text-xl">📞</span> <span>Contact Us</span>
                                    </a>
                                </div>

                                <div className="p-5 bg-white border-t border-slate-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                    {user && (
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
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>

            <div className="pt-32 pb-10 px-4 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">သင်ခန်းစာများ</h1>
                <p className="text-lg text-slate-500 mb-8">AI နည်းပညာများကို လက်တွေ့ဖိုင်များနှင့်တကွ လေ့လာပါ။</p>

                {/* 🌟 Progress Bar UI 🌟 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left max-w-2xl mx-auto">
                    <div className="flex justify-between items-end mb-3">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">သင်၏ လေ့လာမှုမှတ်တမ်း</p>
                            <p className="text-3xl font-black text-blue-600">{progressPercentage}%</p>
                        </div>
                        <p className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                            {completedCount} / {totalLessons} ပြီးမြောက်ပါပြီ
                        </p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4 mb-1 overflow-hidden">
                        <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-out relative"
                            style={{ width: `${progressPercentage}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🌟 နည်းပညာ စာအုပ်စာဆောင်များ (Resources) 🌟 */}
            {resources.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-200 pb-3">
                        <span className="text-3xl">📚</span>
                        <h2 className="text-2xl font-extrabold text-slate-800">နည်းပညာ စာအုင်နှင့် Link များ (Resources)</h2>
                    </div>
                    {/* 🌟 နည်းပညာ စာအုင်နှင့် Link များ (Resources) 🌟 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {resources.map((res) => {
                            // 🌟 အကယ်၍ Link သည် http ဖြင့်စပါက တိုက်ရိုက်သုံးမည်၊ မဟုတ်ပါက Backend URL တွဲပေးမည် (Backwards Compatibility) 🌟
                            const fileUrl = res.file_url.startsWith('http')
                                ? res.file_url
                                : `${api.defaults.baseURL}${res.file_url}`;

                            return (
                                <div key={res.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col">
                                    <div className="text-4xl mb-4 text-center">
                                        {res.file_type === 'pdf' ? '📕' : res.file_type === 'video' ? '🎬' : res.file_type === 'image' ? '🖼️' : '🔗'}
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-center mb-4 line-clamp-2 flex-grow">{res.title}</h3>

                                    <div className="flex gap-2 justify-center mt-auto">
                                        <a href={fileUrl} target="_blank" rel="noreferrer" className="w-full text-center bg-blue-600 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm">
                                            {res.file_type === 'video' ? 'ဗီဒီယို ကြည့်မည် 🎬' : 'လင့်ခ် ဖွင့်မည် 🚀'}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 pb-24">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lessons.map((lesson, index) => {
                            const fileType = getFileType(lesson.file_url);
                            const isDone = completedIds.includes(lesson.id);

                            return (
                                <motion.div
                                    key={lesson.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border overflow-hidden flex flex-col group ${isDone ? 'border-green-200 ring-2 ring-green-50' : 'border-slate-100'}`}
                                >
                                    <div className="h-48 bg-slate-100 overflow-hidden relative flex items-center justify-center">

                                        {isDone && (
                                            <div className="absolute top-4 right-4 z-20">
                                                <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg flex items-center gap-1">
                                                    <span>✅</span> ပြီးပါပြီ
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-white/90 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                {lesson.category}
                                            </span>
                                        </div>

                                        {fileType === 'image' && (
                                            <img src={lesson.file_url!} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        )}
                                        {fileType === 'video' && (
                                            <video src={lesson.file_url!} controls className="w-full h-full object-cover" />
                                        )}
                                        {fileType === 'pdf' && (
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">📄</div>
                                                <span className="text-slate-600 font-semibold">PDF Document</span>
                                            </div>
                                        )}
                                        {fileType === 'none' && (
                                            <img src={fallbackImages[index % fallbackImages.length]} alt="Fallback" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                            {lesson.title}
                                        </h2>

                                        <div
                                            className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 custom-html-content"
                                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                                        />

                                        {fileType === 'pdf' ? (
                                            <a href={lesson.file_url!} target="_blank" rel="noopener noreferrer" className={`mt-auto w-full text-center font-semibold py-3 rounded-xl transition-colors border ${isDone ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-600 hover:text-white' : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-600 hover:text-white'}`}>
                                                PDF ဖတ်ရန် / ဒေါင်းလုဒ်ဆွဲရန် ⬇️
                                            </a>
                                        ) : (
                                            <a
                                                href={`/lesson/${lesson.id}`}
                                                className={`mt-auto block w-full text-center font-semibold py-3 rounded-xl transition-colors border ${isDone ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-600 hover:text-white' : 'bg-slate-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white'}`}
                                            >
                                                {isDone ? 'ပြန်လည်လေ့လာမည် ↺' : 'လေ့လာမည် →'}
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}