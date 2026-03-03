// src/components/AuthModal.tsx
import React, { useState } from 'react';
import api from '../api'; // api.ts ကို ခေါ်သုံးပါ

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);

    // Form Input States
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         if (isLogin) {
    //             // Login Logic
    //             const response = await api.post(`/login?email=${email}&password=${password}`);
    //             alert("Login အောင်မြင်ပါသည်!");

    //             // User Data ကို LocalStorage တွင် သိမ်းခြင်း (Login တည်မြဲစေရန်)
    //             localStorage.setItem("user", JSON.stringify(response.data));

    //             // အောင်မြင်ပါက သင်ခန်းစာစာမျက်နှာသို့ သွားရန် သို့မဟုတ် Modal ပိတ်ရန်
    //             onClose();
    //             window.location.href = '/lessons';// UI update ဖြစ်စေရန်
    //         } else {
    //             // Register Logic
    //             await api.post(`/register?fullname=${fullname}&email=${email}&password=${password}`);
    //             alert("Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို ခေတ္တစောင့်ဆိုင်းပေးပါ။");
    //             setIsLogin(true); // Login Form ဘက်သို့ ပြန်ပြောင်းပေးခြင်း
    //         }
    //     } catch (error: any) {
    //         // Error Handling
    //         const errorMsg = error.response?.data?.detail || "တစ်ခုခုမှားယွင်းနေပါသည်။";
    //         alert(errorMsg);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                // 🌟 URL စာသားအစား JSON Object ဖြင့် ပို့ခြင်း 🌟
                const response = await api.post('/login', {
                    email: email,
                    password: password
                });

                alert("Login အောင်မြင်ပါသည်!");
                localStorage.setItem("user", JSON.stringify(response.data));
                onClose();
                window.location.href = '/lessons';

            } else {
                // 🌟 Register အတွက်လည်း JSON Object ဖြင့် ပို့ခြင်း 🌟
                await api.post('/register', {
                    fullname: fullname,
                    email: email,
                    password: password
                });

                alert("Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို ခေတ္တစောင့်ဆိုင်းပေးပါ။");
                setIsLogin(true);
            }
        } catch (error: any) {
            // Error အစစ်အမှန်ကို ဆွဲထုတ်ပြသခြင်း
            const errorMsg = error.response?.data?.detail || "အချက်အလက် မှားယွင်းနေပါသည်။ ပြန်လည်စစ်ဆေးပါ။";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
                >
                    ✕
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
                        AI GURU သို့ ကြိုဆိုပါတယ်
                    </h2>
                    <p className="text-center text-slate-500 text-sm mb-6">
                        {isLogin ? 'လေ့လာမှုများ ပြန်လည်စတင်ရန် အကောင့်ဝင်ပါ' : 'AI နည်းပညာများကို လေ့လာရန် အကောင့်သစ်ဖွင့်ပါ'}
                    </p>

                    {/* Tabs */}
                    <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            အကောင့်ဝင်မည်
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            အကောင့်သစ်ဖွင့်မည်
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">အမည်</label>
                                <input
                                    required
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="သင့်အမည် ထည့်ပါ"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">အီးမေးလ် (Email)</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">စကားဝှက် (Password)</label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {!isLogin && (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-[11px] text-blue-700 leading-relaxed">
                                ℹ️ မှတ်ချက်။ ။ အကောင့်ဖန်တီးပြီးပါက <b>Admin မှ အတည်ပြု (Approve) ပေးပြီးမှသာ</b> သင်ခန်းစာများကို လေ့လာနိုင်မည် ဖြစ်ပါသည်။
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg transition mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            {loading ? 'ခေတ္တစောင့်ပါ...' : (isLogin ? 'ဝင်ရောက်မည်' : 'အကောင့်ဖန်တီးမည်')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}