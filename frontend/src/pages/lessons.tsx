// // src/pages/Lessons.tsx
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import api from '../api';

// interface Lesson {
//     id: number;
//     title: string;
//     content: string;
//     category: string;
// }

// // လှပသော AI/ML ပုံများ (Database တွင် ပုံမပါသေးသဖြင့် ဤနေရာမှ ဖြည့်စွက်ပေးထားပါသည်)
// const fallbackImages = [
//     "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80", // AI Brain
//     "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80", // Tech Code
//     "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Microchip
//     "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80", // Robot Hand
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Data Visualization
// ];

// export default function Lessons() {
//     const [lessons, setLessons] = useState<Lesson[]>([]);
//     const [loading, setLoading] = useState(true);

//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     useEffect(() => {
//         if (!user) {
//             window.location.href = '/';
//             return;
//         }

//         const fetchLessons = async () => {
//             try {
//                 const response = await api.get('/lessons', {
//                     params: { user_id: user.user_id }
//                 });
//                 setLessons(response.data);
//             } catch (err) {
//                 console.error("Error fetching lessons", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLessons();
//     }, [user]);

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         window.location.href = '/';
//     };

//     if (!user) return null;

//     return (
//         <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

//             {/* 🌟 Full Navigation Bar 🌟 */}
//             <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-40 border-b border-slate-100">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-20">
//                         {/* Logo */}
//                         <div className="text-3xl font-extrabold text-blue-600 tracking-tight cursor-pointer" onClick={() => window.location.href = '/'}>
//                             AI GURU
//                         </div>

//                         {/* Desktop Menu (Home သို့ ပြန်သွားမည့် Link များ) */}
//                         <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
//                             <a href="/" className="text-slate-700 font-semibold hover:text-blue-600 transition">Home</a>
//                             <a href="/#about" className="text-slate-700 font-semibold hover:text-blue-600 transition">About</a>
//                             <a href="/#fields" className="text-slate-700 font-semibold hover:text-blue-600 transition">AI Fields</a>
//                             <a href="/#roadmap" className="text-slate-700 font-semibold hover:text-blue-600 transition">Roadmap</a>
//                         </div>

//                         {/* User Info & Logout */}
//                         <div className="flex items-center gap-4">
//                             <span className="hidden md:inline-block font-medium text-slate-700">မင်္ဂလာပါ, <span className="text-blue-600">{user.fullname}</span> 🌟</span>
//                             <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-full hover:bg-red-100 transition font-medium text-sm border border-red-100">
//                                 ထွက်မည် (Logout)
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {/* 📚 Lessons Header */}
//             <div className="pt-32 pb-10 px-4 text-center max-w-3xl mx-auto">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">သင်ခန်းစာများ</h1>
//                 <p className="text-lg text-slate-500">AI နည်းပညာများကို အဆင့်ဆင့် လေ့လာနိုင်ရန် စီစဉ်ပေးထားပါသည်။</p>
//             </div>

//             {/* 🃏 Lessons Cards Section */}
//             <div className="max-w-7xl mx-auto px-4 pb-24">
//                 {loading ? (
//                     <div className="flex justify-center items-center py-20">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {lessons.map((lesson, index) => (
//                             <motion.div
//                                 key={lesson.id}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col group"
//                             >
//                                 {/* ပုံ (Image) */}
//                                 <div className="h-48 overflow-hidden relative">
//                                     <img
//                                         src={fallbackImages[index % fallbackImages.length]}
//                                         alt={lesson.title}
//                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                     />
//                                     <div className="absolute top-4 left-4">
//                                         <span className="bg-white/90 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
//                                             {lesson.category}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* စာသား (Content) */}
//                                 <div className="p-6 flex flex-col flex-grow">
//                                     <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
//                                         {lesson.title}
//                                     </h2>
//                                     <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
//                                         {lesson.content}
//                                     </p>
//                                     <button className="mt-auto w-full bg-slate-50 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-colors border border-blue-100">
//                                         လေ့လာမည် →
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// }

// src/pages/Lessons.tsx
// import React, { useEffect, useState } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [completedIds, setCompletedIds] = useState<number[]>([]); // 🌟 ပြီးထားသော ID များ
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
            return;
        }

        const fetchData = async () => {
            try {
                // သင်ခန်းစာ အားလုံးဆွဲယူခြင်း
                const resLessons = await api.get('/lessons', { params: { user_id: user.user_id } });
                setLessons(resLessons.data);

                // User ၏ Progress ဆွဲယူခြင်း
                const resProgress = await api.get(`/progress/${user.user_id}`);
                setCompletedIds(resProgress.data);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

            {/* Navbar */}
            {/* 🌟 Lessons Page ၏ Navigation Bar (Menu အားလုံးပါဝင်သည်) 🌟 */}
            <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-3 cursor-pointer">
                            <img src="/logo.png" alt="AI GURU Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-blue-100 shadow-sm object-cover" />
                            <div className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-tight">AI GURU</div>
                        </a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
                            <a href="/" className="text-slate-700 font-semibold hover:text-blue-600 transition">Home</a>
                            <a href="/#about" className="text-slate-700 font-semibold hover:text-blue-600 transition">About</a>
                            <a href="/#fields" className="text-slate-700 font-semibold hover:text-blue-600 transition">AI Fields</a>
                            <a href="/#roadmap" className="text-slate-700 font-semibold hover:text-blue-600 transition">Roadmap</a>
                            <a href="/lessons" className="text-blue-600 font-bold hover:underline transition">သင်ခန်းစာများ</a>
                        </div>

                        {/* User Profile & Logout */}
                        <div className="flex items-center gap-4">
                            <span className="hidden lg:inline-block font-medium text-slate-700">မင်္ဂလာပါ, <span className="text-blue-600">{user.fullname}</span></span>
                            {user.is_admin && <a href="/admin" className="hidden md:inline-block text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-bold hover:bg-purple-200 transition">Admin Panel</a>}
                            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-full hover:bg-red-100 transition font-medium text-sm border border-red-100">
                                ထွက်မည်
                            </button>
                        </div>
                    </div>
                </div>
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

            <div className="max-w-7xl mx-auto px-4 pb-24">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lessons.map((lesson, index) => {
                            const fileType = getFileType(lesson.file_url);
                            const isDone = completedIds.includes(lesson.id); // 🌟 ဤသင်ခန်းစာ ပြီးပြီလား စစ်ဆေးခြင်း

                            return (
                                <motion.div
                                    key={lesson.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border overflow-hidden flex flex-col group ${isDone ? 'border-green-200 ring-2 ring-green-50' : 'border-slate-100'}`}
                                >
                                    {/* ဖိုင်အမျိုးအစားပေါ် မူတည်၍ ပြသမည့်အပိုင်း */}
                                    <div className="h-48 bg-slate-100 overflow-hidden relative flex items-center justify-center">

                                        {/* 🌟 ပြီးဆုံးကြောင်း Badge (ညာဘက်အပေါ်) 🌟 */}
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

                                    {/* စာသားနှင့် ခလုတ် */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                            {lesson.title}
                                        </h2>

                                        {/* Quill ဖြင့်ရေးထားသော HTML များကို မှန်ကန်စွာပေါ်စေရန် နှင့် စာကြောင်းရေ ကန့်သတ်ရန် */}
                                        <div
                                            className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                                        />

                                        {/* ဖိုင်ရှိပါက Download သို့မဟုတ် View ခလုတ် ပြမည် */}
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