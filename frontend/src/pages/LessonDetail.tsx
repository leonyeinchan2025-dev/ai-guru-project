// // src/pages/LessonDetail.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../api';

// export default function LessonDetail() {
//     const { id } = useParams(); // URL မှ ID ကို ဆွဲယူခြင်း
//     const [lesson, setLesson] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchLesson = async () => {
//             try {
//                 const response = await api.get(`/lessons/${id}`);
//                 setLesson(response.data);
//             } catch (error) {
//                 console.error("Error fetching lesson:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLesson();
//     }, [id]);

//     if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//     if (!lesson) return <div className="min-h-screen flex items-center justify-center text-red-500">သင်ခန်းစာ ရှာမတွေ့ပါ။</div>;

//     return (
//         <div className="min-h-screen bg-white text-slate-900 font-sans">
//             {/* 🌟 ရိုးရှင်းသော Navbar 🌟 */}
//             <nav className="border-b px-6 py-4 flex justify-between items-center bg-slate-50">
//                 <a href="/lessons" className="text-blue-600 font-medium hover:underline">← နောက်သို့ ပြန်သွားမည်</a>
//                 <div className="font-bold text-xl text-slate-800">AI GURU</div>
//             </nav>

//             <div className="max-w-3xl mx-auto px-6 py-12">
//                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-6 inline-block">
//                     {lesson.category}
//                 </span>
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
//                     {lesson.title}
//                 </h1>

//                 {/* ပုံ သို့မဟုတ် Video ပါလျှင် ပြမည် */}
//                 {lesson.file_url && (
//                     <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border">
//                         {lesson.file_url.match(/\.(mp4|webm|ogg)$/i) ? (
//                             <video src={lesson.file_url} controls className="w-full" />
//                         ) : (
//                             <img src={lesson.file_url} alt={lesson.title} className="w-full h-auto object-cover" />
//                         )}
//                     </div>
//                 )}

//                 {/* စာသား အပြည့်အစုံ */}
//                 <div className="text-lg text-slate-700 leading-loose whitespace-pre-wrap">
//                     {lesson.content}
//                 </div>
//             </div>
//         </div>
//     );
// }

// src/pages/LessonDetail.tsx (Code အပြည့်အစုံ)
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function LessonDetail() {
    const { id } = useParams();
    const [lesson, setLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // 🌟 Progress အတွက် State အသစ် 🌟
    const [isCompleted, setIsCompleted] = useState(false);
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        const fetchLessonAndProgress = async () => {
            try {
                const resLesson = await api.get(`/lessons/${id}`);
                setLesson(resLesson.data);

                // User ဝင်ထားလျှင် ဤသင်ခန်းစာ ပြီး/မပြီး စစ်ဆေးမည်
                if (user) {
                    const resProgress = await api.get(`/progress/${user.user_id}`);
                    if (resProgress.data.includes(Number(id))) {
                        setIsCompleted(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLessonAndProgress();
    }, [id, user]);

    // ✅ သင်ခန်းစာ ပြီးဆုံးကြောင်း မှတ်သားမည့် Function
    const handleMarkComplete = async () => {
        if (!user) return alert("ကျေးဇူးပြု၍ Login အရင်ဝင်ပါ။");
        try {
            await api.post(`/progress/complete?user_id=${user.user_id}&lesson_id=${id}`);
            setIsCompleted(true);
            alert("ဂုဏ်ယူပါတယ်! သင်ခန်းစာတစ်ခု ပြီးမြောက်သွားပါပြီ 🎉");
        } catch (error) {
            alert("မှတ်သားရာတွင် အမှားအယွင်းရှိပါသည်။");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!lesson) return <div className="min-h-screen flex items-center justify-center text-red-500">သင်ခန်းစာ ရှာမတွေ့ပါ။</div>;

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans pb-20">
            <nav className="border-b px-6 py-4 flex justify-between items-center bg-slate-50">
                <a href="/lessons" className="text-blue-600 font-medium hover:underline">← နောက်သို့ ပြန်သွားမည်</a>
                <div className="font-bold text-xl text-slate-800">AI GURU</div>
            </nav>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-6 inline-block">
                    {lesson.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                    {lesson.title}
                </h1>

                {lesson.file_url && (
                    <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border">
                        {lesson.file_url.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video src={lesson.file_url} controls className="w-full" />
                        ) : (
                            <img src={lesson.file_url} alt={lesson.title} className="w-full h-auto object-cover" />
                        )}
                    </div>
                )}

                {/* React Quill ဖြင့် သိမ်းထားသော HTML များကို ပြန်ဖတ်ရန် dangerouslySetInnerHTML အသုံးပြုပါသည် */}
                <div className="text-lg text-slate-700 leading-loose" dangerouslySetInnerHTML={{ __html: lesson.content }} />

                {/* 🌟 ပြီးဆုံးကြောင်း မှတ်သားမည့် ခလုတ် 🌟 */}
                <div className="mt-16 text-center border-t pt-10">
                    <h3 className="text-xl font-bold mb-4">ဒီသင်ခန်းစာကို လေ့လာလို့ ပြီးသွားပြီလား?</h3>
                    {isCompleted ? (
                        <button disabled className="bg-green-100 text-green-700 px-8 py-4 rounded-full font-bold text-lg border-2 border-green-200 cursor-not-allowed">
                            ✅ ဤသင်ခန်းစာကို လေ့လာပြီးပါပြီ
                        </button>
                    ) : (
                        <button onClick={handleMarkComplete} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                            ✅ လေ့လာပြီးကြောင်း မှတ်သားမည်
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}