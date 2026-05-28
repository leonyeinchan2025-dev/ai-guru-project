// src/components/AuthModal.tsx

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "768463165065-2uc4qbiv82rricq9s1vdms3ek5mcn11j.apps.googleusercontent.com"; // Backend တွင် ထည့်ခဲ့သော ID အတိုင်းဖြစ်ရမည်
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

    // 🌟 မျက်လုံး အဖွင့်/အပိတ် အတွက် State အသစ် (ဤနေရာတွင် ထည့်ပါ) 🌟
    const [showPassword, setShowPassword] = useState(false);

    // export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    //     const [isLogin, setIsLogin] = useState(true);

    //     // Form Input States
    //     const [fullname, setFullname] = useState('');
    //     const [email, setEmail] = useState('');
    //     const [password, setPassword] = useState('');
    //     const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

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

                // alert("Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို ခေတ္တစောင့်ဆိုင်းပေးပါ။");
                alert("Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို ခေတ္တစောင့်ဆိုင်းပေးပါ။\n\nလိုအပ်လျှင် ဆက်သွယ်ရန် Hot Line (Admin) Call and Viber: +959444445546");
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
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            // ၁။ Backend သို့ Google Token လှမ်းပို့ခြင်း
            const res = await api.post('/google-login', { token: credentialResponse.credential });

            // ၂။ Login အောင်မြင်ပါက (Admin မှ အတည်ပြုပြီးသားဖြစ်ပါက)
            alert("✅ Google ဖြင့် ဝင်ရောက်ခြင်း အောင်မြင်ပါသည်။");
            localStorage.setItem('user', JSON.stringify(res.data.user));
            // လိုအပ်ပါက Modal ကိုပိတ်ပြီးမှ Reload လုပ်ပါ
            onClose();
            window.location.reload();

        } catch (error: any) {
            // Admin အတည်ပြုချက် စောင့်ရမည့် အခြေအနေ (403)
            if (error.response?.status === 403) {
                alert(error.response.data.detail);
                // onClose(); // လိုအပ်ပါက ဖွင့်ပါ
            } else {
                // [object Object] ပြဿနာကို ရှင်းလင်းရန်
                const errorData = error.response?.data;

                if (errorData) {
                    // Object ဖြစ်နေလျှင် စာသားအဖြစ် ပြောင်းပြီး ပြသမည် (JSON.stringify)
                    alert("Error: " + (typeof errorData === 'object' ? JSON.stringify(errorData) : errorData));
                } else {
                    // Network Error သို့မဟုတ် အခြား Error များအတွက်
                    alert("Error: " + error.message);
                }

                console.error("Google Login Error Details:", error);
            }
        }
    };
    // const handleGoogleSuccess = async (credentialResponse: any) => {
    //     try {
    //         const res = await api.post('/google-login', { token: credentialResponse.credential });
    //         alert("✅ Google ဖြင့် ဝင်ရောက်ခြင်း အောင်မြင်ပါသည်။");
    //         localStorage.setItem('user', JSON.stringify(res.data.user));
    //         window.location.reload();
    //     } catch (error: any) {
    //         // Admin အတည်ပြုချက် စောင့်ရမည့် မက်ဆေ့ချ်များ ဤနေရာတွင် ပေါ်ပါမည်
    //         alert(error.response?.data?.detail || "Google ဖြင့် ဝင်ရောက်ရာတွင် အမှားအယွင်း ရှိပါသည်။");
    //         if (error.response?.status === 403) {
    //             onClose(); // Modal ကို ပိတ်ပေးမည်
    //         }
    //     }
    // };

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
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-2 font-heading tracking-wide">
                        AI GURU က ကြိုဆိုပါတယ်
                    </h2>
                    <p className="text-center text-slate-500 text-sm mb-6 font-heading tracking-wide">
                        {isLogin ? 'လေ့လာမှုများ စတင်ရန် အကောင့်ဝင်ပါ' : 'AI နည်းပညာများကို လေ့လာရန် အကောင့်သစ်ဖွင့်ပါ'}
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
                            <div className="relative">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                                />

                                {/* 🌟 မျက်လုံး အဖွင့်/အပိတ် ခလုတ် 🌟 */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? (
                                        // 👁️ မျက်လုံး ဖွင့်ထားသောပုံ (Text ပြနေချိန်)
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        // 👁️‍🗨️ မျက်လုံး ပိတ်ထားသောပုံ (Password ဖျောက်ထားချိန်)
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-[11px] text-blue-700 leading-relaxed">
                                ℹ️ မှတ်ချက်။ ။ အကောင့်ဖန်တီးပြီးပါက <b>Admin မှ အတည်ပြု (Approve) ပေးပြီးမှသာ</b> သင်ခန်းစာများကို လေ့လာနိုင်မည် ဖြစ်ပါသည်။ ဆက်သွယ်ရန် Hot Line (Admin) Call and Viber: +959444445546
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
                    {/* --- Google Login Button --- */}
                    <div className="mt-6 border-t border-slate-200 pt-6">
                        <p className="text-center text-sm text-slate-500 mb-4 font-medium">သို့မဟုတ် သင့် Google Account ဖြင့် ဝင်ရောက်ပါ</p>
                        <div className="flex justify-center">
                            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => alert("Google အကောင့် ချိတ်ဆက်ခြင်း ကျရှုံးပါသည်။")}
                                    useOneTap
                                    theme="outline"
                                    text="continue_with"
                                    shape="pill"
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                    {/* --------------------------- */}
                </div>
            </div>
        </div>
    );
}