import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

interface Feedback {
    id: number;
    name: string;
    rating: number;
    comment: string;
    is_highlighted: boolean;
    created_at: string;
}

export default function AdminDashboard() {
    // 🌟 States အားလုံးကို Component Function အထဲမှာပဲ ရေးရပါမည် 🌟
    const [activeTab, setActiveTab] = useState<'lessons' | 'users' | 'feedbacks' | 'ebooks'>('lessons');
    const [users, setUsers] = useState<any[]>([]);
    const [lessons, setLessons] = useState<any[]>([]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [ebookOrders, setEbookOrders] = useState<any[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Machine Learning');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!user || user.is_admin !== true) {
            alert("❌ Admin သာလျှင် ဝင်ရောက်ခွင့်ရှိပါသည်။");
            window.location.href = '/';
        }
    }, [user]);

    useEffect(() => {
        if (user?.is_admin) {
            if (activeTab === 'users') fetchUsers();
            if (activeTab === 'lessons') fetchLessons();
            if (activeTab === 'feedbacks') fetchFeedbacks();
            if (activeTab === 'ebooks') fetchEbookOrders();
        }
    }, [activeTab, user]);

    // --- API Functions ---
    const fetchUsers = async () => { try { const res = await api.get('/admin/users'); setUsers(res.data); } catch (e) { console.error(e); } };
    const fetchLessons = async () => { try { const res = await api.get('/lessons', { params: { user_id: user?.user_id } }); setLessons(res.data); } catch (e) { console.error(e); } };
    const fetchFeedbacks = async () => { try { const res = await api.get('/feedbacks'); setFeedbacks(res.data); } catch (e) { console.error(e); } };
    const fetchEbookOrders = async () => { try { const res = await api.get('/admin/ebook-requests'); setEbookOrders(res.data); } catch (e) { console.error(e); } };

    const handleSaveLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (file) formData.append('file', file);
        try {
            if (editingId) await api.put(`/admin/lessons/${editingId}`, formData);
            else await api.post('/admin/upload-lesson', formData);
            alert("အောင်မြင်ပါသည်!");
            fetchLessons();
            setEditingId(null); setTitle(''); setContent('');
        } catch (e) { alert("Error!"); }
        setLoading(false);
    };

    const handleDeleteLesson = async (lessonId: number) => {
        if (!window.confirm("ဖျက်မှာသေချာလား?")) return;
        await api.delete(`/admin/lessons/${lessonId}`);
        fetchLessons();
    };

    const handleApproveUser = async (userId: number) => {
        if (!window.confirm("အတည်ပြုမည်လား?")) return;
        await api.put(`/admin/approve/${userId}`);
        fetchUsers();
    };

    const handleToggleAdmin = async (userId: number, currentStatus: boolean) => {
        await api.put(`/admin/users/${userId}/role`, { is_admin: !currentStatus });
        fetchUsers();
    };

    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm("ဖျက်မှာသေချာလား?")) return;
        await api.delete(`/admin/users/${userId}`);
        fetchUsers();
    };

    const startEditLesson = (lesson: any) => {
        setEditingId(lesson.id);
        setTitle(lesson.title);
        setContent(lesson.content);
        setCategory(lesson.category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleHighlight = async (id: number) => {
        await api.put(`/feedbacks/${id}/highlight`);
        fetchFeedbacks();
    };

    if (!user || user.is_admin !== true) return null;

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">⚙️ Admin Dashboard</h1>
                    <button onClick={() => window.location.href = '/'} className="text-blue-600 hover:underline">Home သို့ပြန်မည်</button>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-200 pb-4">
                    <button onClick={() => setActiveTab('lessons')} className={`px-6 py-2 rounded-lg font-bold ${activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'bg-white'}`}>📝 သင်ခန်းစာများ</button>
                    <button onClick={() => setActiveTab('users')} className={`px-6 py-2 rounded-lg font-bold ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white'}`}>👥 User များ</button>
                    <button onClick={() => setActiveTab('feedbacks')} className={`px-6 py-2 rounded-lg font-bold ${activeTab === 'feedbacks' ? 'bg-blue-600 text-white' : 'bg-white'}`}>⭐ Feedback</button>
                    <button onClick={() => setActiveTab('ebooks')} className={`px-6 py-2 rounded-lg font-bold ${activeTab === 'ebooks' ? 'bg-blue-600 text-white' : 'bg-white'}`}>📚 Ebook အမှာစာများ</button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

                    {/* 1. Lessons */}
                    {activeTab === 'lessons' && (
                        <div>
                            <form onSubmit={handleSaveLesson} className="max-w-3xl mb-12 p-6 bg-slate-50 rounded-xl border">
                                <h2 className="text-xl font-bold mb-6">{editingId ? '✏️ သင်ခန်းစာ ပြင်ဆင်ရန်' : '➕ သင်ခန်းစာသစ်'}</h2>
                                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded mb-4" placeholder="ခေါင်းစဉ်" />
                                <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} className="h-64 mb-12" />
                                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded">{editingId ? 'ပြင်ဆင်မည်' : 'တင်မည်'}</button>
                            </form>
                            <table className="w-full text-left">
                                <thead><tr className="bg-slate-100 border-b"><th className="p-3">ခေါင်းစဉ်</th><th className="p-3">လုပ်ဆောင်ချက်</th></tr></thead>
                                <tbody>
                                    {lessons.map(l => (
                                        <tr key={l.id} className="border-b">
                                            <td className="p-3">{l.title}</td>
                                            <td className="p-3 flex gap-2">
                                                <button onClick={() => startEditLesson(l)} className="bg-yellow-100 px-3 py-1 rounded">Edit</button>
                                                <button onClick={() => handleDeleteLesson(l.id)} className="bg-red-100 px-3 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 2. Users */}
                    {activeTab === 'users' && (
                        <div>
                            <table className="w-full text-left">
                                <thead><tr className="bg-slate-100 border-b"><th>အမည်</th><th>Email</th><th>အခြေအနေ</th><th>လုပ်ဆောင်ချက်</th></tr></thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id} className="border-b">
                                            <td className="p-3">{u.fullname}</td>
                                            <td className="p-3">{u.email}</td>
                                            <td className="p-3">{u.is_approved ? 'Approved' : 'Pending'}</td>
                                            <td className="p-3 flex gap-2">
                                                {!u.is_approved && <button onClick={() => handleApproveUser(u.id)} className="bg-blue-100 px-2 py-1 rounded text-sm">အတည်ပြု</button>}
                                                <button onClick={() => handleDeleteUser(u.id)} className="bg-red-100 px-2 py-1 rounded text-sm">ဖျက်မည်</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 3. Feedbacks */}
                    {activeTab === 'feedbacks' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {feedbacks.map(fb => (
                                <div key={fb.id} className={`p-6 border rounded-2xl ${fb.is_highlighted ? 'border-green-400' : 'border-slate-200'}`}>
                                    <h3 className="font-bold">{fb.name}</h3>
                                    <p className="text-slate-600 text-sm my-2">"{fb.comment}"</p>
                                    <button onClick={() => toggleHighlight(fb.id)} className="text-xs bg-slate-100 px-3 py-1 rounded">Highlight ပြောင်းမည်</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 4. Ebook Orders */}
                    {activeTab === 'ebooks' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6">📚 EBook မှာယူထားသူများ</h2>
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b">
                                    <tr><th className="p-3">အချိန်</th><th className="p-3">စာအုပ်အမည်</th><th className="p-3">အမည်</th><th className="p-3">ဆက်သွယ်ရန်</th></tr>
                                </thead>
                                <tbody>
                                    {ebookOrders.map(o => (
                                        <tr key={o.id} className="border-b">
                                            <td className="p-3 text-sm">{new Date(o.created_at).toLocaleDateString()}</td>
                                            <td className="p-3 font-semibold text-blue-700">{o.book_title}</td>
                                            <td className="p-3">{o.name}</td>
                                            <td className="p-3 text-rose-600 font-bold">{o.contact_info}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}