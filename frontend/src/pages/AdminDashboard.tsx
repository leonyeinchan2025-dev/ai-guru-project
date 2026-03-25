// import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import api from '../api';

// // 🌟 React Quill အတွက် Toolbar Setting အသစ် (Image, Video, Link များ ထည့်သွင်းထားသည်) 🌟
// const quillModules = {
//     toolbar: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//         ['link', 'image', 'video'], // <-- ဤနေရာတွင် Link, Image နှင့် Video ခလုတ်များ ထည့်ထားပါသည်
//         ['clean']
//     ],
// };

// export default function AdminDashboard() {
//     const [activeTab, setActiveTab] = useState<'lessons' | 'users'>('lessons');

//     // States
//     const [users, setUsers] = useState<any[]>([]);
//     const [lessons, setLessons] = useState<any[]>([]);

//     // Editor States
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [category, setCategory] = useState('Machine Learning');
//     const [file, setFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);

//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     useEffect(() => {
//         if (!user || user.is_admin !== true) {
//             alert("❌ Admin သာလျှင် ဤစာမျက်နှာသို့ ဝင်ရောက်ခွင့်ရှိပါသည်။");
//             window.location.href = '/';
//         }
//     }, [user]);

//     // Data ဆွဲယူခြင်း
//     useEffect(() => {
//         if (user?.is_admin) {
//             if (activeTab === 'users') fetchUsers();
//             if (activeTab === 'lessons') fetchLessons();
//         }
//     }, [activeTab, user]);

//     if (!user || user.is_admin !== true) return null;

//     // --- Users API ---
//     const fetchUsers = async () => {
//         try {
//             const res = await api.get('/admin/users');
//             setUsers(res.data);
//         } catch (error) { console.error("Error fetching users:", error); }
//     };

//     const handleApproveUser = async (userId: number) => {
//         try {
//             await api.put(`/admin/approve/${userId}`);
//             alert("User အား အတည်ပြုပြီးပါပြီ။");
//             fetchUsers();
//         } catch (error) { alert("အတည်ပြုရာတွင် အမှားအယွင်းရှိပါသည်။"); }
//     };

//     const handleDeleteUser = async (userId: number) => {
//         if (!window.confirm("ဤ User အား ဖျက်ပစ်ရန် သေချာပါသလား?")) return;
//         try {
//             await api.delete(`/admin/users/${userId}`);
//             alert("User ဖျက်ပစ်ပြီးပါပြီ။");
//             fetchUsers();
//         } catch (error) { alert("ဖျက်ရာတွင် အမှားအယွင်းရှိပါသည်။"); }
//     };

//     const handleToggleAdmin = async (userId: number, currentStatus: boolean) => {
//         if (!window.confirm(`ဤ User အား ${currentStatus ? 'သာမန် User' : 'Admin'} အဖြစ် ပြောင်းလဲရန် သေချာပါသလား?`)) return;
//         try {
//             await api.put(`/admin/users/${userId}/role`, { is_admin: !currentStatus });
//             alert("ရာထူး ပြောင်းလဲပြီးပါပြီ။");
//             fetchUsers();
//         } catch (error) {
//             alert("ရာထူးပြောင်းလဲရာတွင် အမှားအယွင်းရှိပါသည်။");
//         }
//     };

//     // --- Lessons API ---
//     const fetchLessons = async () => {
//         try {
//             const res = await api.get('/lessons', { params: { user_id: user.user_id } });
//             setLessons(res.data);
//         } catch (error) { console.error("Error fetching lessons:", error); }
//     };

//     const handleDeleteLesson = async (lessonId: number) => {
//         if (!window.confirm("ဤသင်ခန်းစာကို ဖျက်ပစ်ရန် သေချာပါသလား?")) return;
//         try {
//             await api.delete(`/admin/lessons/${lessonId}`);
//             alert("သင်ခန်းစာ ဖျက်ပစ်ပြီးပါပြီ။");
//             fetchLessons();
//         } catch (error) { alert("ဖျက်ရာတွင် အမှားအယွင်းရှိပါသည်။"); }
//     };

//     const startEditLesson = (lesson: any) => {
//         setEditingId(lesson.id);
//         setTitle(lesson.title);
//         setContent(lesson.content);
//         setCategory(lesson.category);
//         setFile(null);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const cancelEdit = () => {
//         setEditingId(null);
//         setTitle(''); setContent(''); setFile(null);
//     };

//     const handleSaveLesson = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         formData.append('category', category);
//         if (file) formData.append('file', file);

//         try {
//             if (editingId) {
//                 await api.put(`/admin/lessons/${editingId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//                 alert("🎉 သင်ခန်းစာကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ!");
//             } else {
//                 await api.post('/admin/upload-lesson', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//                 alert("🎉 သင်ခန်းစာ အသစ်ကို အောင်မြင်စွာ တင်ပြီးပါပြီ!");
//             }
//             cancelEdit();
//             fetchLessons();
//         } catch (error) {
//             alert("လုပ်ဆောင်ရာတွင် အမှားအယွင်းရှိပါသည်။");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
//             <div className="max-w-6xl mx-auto">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold text-slate-800">⚙️ Admin Dashboard</h1>
//                     <button onClick={() => window.location.href = '/'} className="text-blue-600 hover:underline">
//                         Home သို့ ပြန်သွားမည်
//                     </button>
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex gap-4 mb-8">
//                     <button onClick={() => setActiveTab('lessons')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
//                         📝 သင်ခန်းစာများ စီမံရန်
//                     </button>
//                     <button onClick={() => setActiveTab('users')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
//                         👥 User များ စီမံရန်
//                     </button>
//                 </div>

//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

//                     {/* --- Lessons Section --- */}
//                     {activeTab === 'lessons' && (
//                         <div>
//                             <form onSubmit={handleSaveLesson} className="max-w-3xl mb-12 p-6 bg-slate-50 rounded-xl border">
//                                 <h2 className="text-xl font-bold mb-6 border-b pb-2">
//                                     {editingId ? '✏️ သင်ခန်းစာအား ပြင်ဆင်ရန်' : '➕ သင်ခန်းစာသစ် တင်ရန် (Rich Text Supported)'}
//                                 </h2>

//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">ခေါင်းစဉ်</label>
//                                     <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ဥပမာ - Introduction to AI" />
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium mb-1">အမျိုးအစား (Category)</label>
//                                     <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
//                                         <option value="AI Basics">AI Basics (အခြေခံ)</option>
//                                         <option value="Prompt Engineering">Prompt Engineering</option>
//                                         <option value="Machine Learning">Machine Learning</option>
//                                         <option value="Deep Learning">Deep Learning</option>
//                                         <option value="Generative AI">Generative AI</option>
//                                         <option value="Data Science">Data Science</option>
//                                         <option value="AI Tools & Apps">AI Tools & Apps</option>
//                                         <option value="Others">Others (အခြား)</option>
//                                     </select>
//                                 </div>

//                                 <div className="mb-6">
//                                     <label className="block text-sm font-medium mb-1">အကြောင်းအရာ (Content)</label>
//                                     <div className="bg-white">
//                                         {/* 🌟 ဤနေရာတွင် modules: quillModules ကို ထည့်သွင်းချိတ်ဆက်ထားပါသည် 🌟 */}
//                                         <ReactQuill
//                                             theme="snow"
//                                             value={content}
//                                             onChange={setContent}
//                                             className="h-64 mb-12"
//                                             modules={quillModules}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="mb-6 p-4 border-2 border-dashed border-blue-200 bg-blue-50 rounded-lg mt-8">
//                                     <label className="block text-sm font-bold text-blue-700 mb-2">ဖိုင်တွဲတင်ရန် (ပြောင်းလဲလိုမှသာ ရွေးပါ)</label>
//                                     <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm" />
//                                 </div>

//                                 <div className="flex gap-4">
//                                     <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
//                                         {loading ? 'လုပ်ဆောင်နေပါသည်...' : (editingId ? 'ပြင်ဆင်မှုများ သိမ်းမည်' : 'သင်ခန်းစာ တင်မည်')}
//                                     </button>
//                                     {editingId && (
//                                         <button type="button" onClick={cancelEdit} className="bg-slate-200 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-300 transition">
//                                             ပယ်ဖျက်မည်
//                                         </button>
//                                     )}
//                                 </div>
//                             </form>

//                             <h2 className="text-xl font-bold mb-4 border-b pb-2">📚 တင်ထားသော သင်ခန်းစာများ</h2>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-slate-100 border-b">
//                                             <th className="p-3">ID</th>
//                                             <th className="p-3">ခေါင်းစဉ်</th>
//                                             <th className="p-3">အမျိုးအစား</th>
//                                             <th className="p-3">လုပ်ဆောင်ချက်</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {lessons.map(lesson => (
//                                             <tr key={lesson.id} className="border-b hover:bg-slate-50">
//                                                 <td className="p-3 text-slate-500">{lesson.id}</td>
//                                                 <td className="p-3 font-semibold text-blue-700">{lesson.title}</td>
//                                                 <td className="p-3"><span className="bg-slate-200 px-2 py-1 rounded text-xs">{lesson.category}</span></td>
//                                                 <td className="p-3 flex gap-2">
//                                                     <button onClick={() => startEditLesson(lesson)} className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-yellow-200 transition">
//                                                         Edit
//                                                     </button>
//                                                     <button onClick={() => handleDeleteLesson(lesson.id)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 transition">
//                                                         Delete
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}

//                     {/* --- Users Section --- */}
//                     {activeTab === 'users' && (
//                         <div>
//                             <h2 className="text-xl font-bold mb-6 border-b pb-2">👥 User စာရင်းနှင့် အကောင့် အတည်ပြုခြင်း</h2>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-slate-50 border-b">
//                                             <th className="p-3">ID</th>
//                                             <th className="p-3">အမည်</th>
//                                             <th className="p-3">Email</th>
//                                             <th className="p-3">အခြေအနေ</th>
//                                             <th className="p-3">လုပ်ဆောင်ချက်</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {users.map(u => (
//                                             <tr key={u.id} className="border-b hover:bg-slate-50">
//                                                 <td className="p-3">{u.id}</td>
//                                                 <td className="p-3 font-medium">
//                                                     {u.fullname}
//                                                     {u.is_admin && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded ml-2">Admin</span>}
//                                                 </td>
//                                                 <td className="p-3 text-slate-500">{u.email}</td>
//                                                 <td className="p-3">
//                                                     {u.is_approved ?
//                                                         <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Approved</span> :
//                                                         <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span>
//                                                     }
//                                                 </td>
//                                                 <td className="p-3 flex gap-2">
//                                                     {!u.is_approved && (
//                                                         <button
//                                                             onClick={() => handleApproveUser(u.id)}
//                                                             className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-200 transition"
//                                                         >
//                                                             အတည်ပြုမည်
//                                                         </button>
//                                                     )}
//                                                     {u.is_approved && (
//                                                         <button
//                                                             onClick={() => handleToggleAdmin(u.id, u.is_admin)}
//                                                             className={`px-3 py-1.5 rounded text-sm font-medium transition ${u.is_admin ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
//                                                         >
//                                                             {u.is_admin ? '⬇️ User ပြောင်းမည်' : '⬆️ Admin ပေးမည်'}
//                                                         </button>
//                                                     )}
//                                                     <button
//                                                         onClick={() => handleDeleteUser(u.id)}
//                                                         className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 transition"
//                                                     >
//                                                         ဖျက်မည်
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../api';
import { motion } from 'framer-motion'; // 🌟 Animations အတွက် ထပ်ထည့်ထားပါသည်

// 🌟 React Quill အတွက် Toolbar Setting
const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

// 🌟 Feedback Interface ထပ်တိုးပါသည်
interface Feedback {
    id: number;
    name: string;
    rating: number;
    comment: string;
    is_highlighted: boolean;
    created_at: string;
}

export default function AdminDashboard() {
    // 🌟 activeTab တွင် 'feedbacks' ကို ထပ်တိုးထားပါသည်
    const [activeTab, setActiveTab] = useState<'lessons' | 'users' | 'feedbacks'>('lessons');

    // States
    const [users, setUsers] = useState<any[]>([]);
    const [lessons, setLessons] = useState<any[]>([]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]); // 🌟 Feedback State ထပ်တိုးပါသည်

    // Editor States
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
            alert("❌ Admin သာလျှင် ဤစာမျက်နှာသို့ ဝင်ရောက်ခွင့်ရှိပါသည်။");
            window.location.href = '/';
        }
    }, [user]);

    // Data ဆွဲယူခြင်း (Tab အလိုက်)
    useEffect(() => {
        if (user?.is_admin) {
            if (activeTab === 'users') fetchUsers();
            if (activeTab === 'lessons') fetchLessons();
            if (activeTab === 'feedbacks') fetchFeedbacks(); // 🌟 Feedback Tab ကိုနှိပ်လျှင် Data ဆွဲမည်
        }
    }, [activeTab, user]);

    if (!user || user.is_admin !== true) return null;

    // --- Users API ---
    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (error) { console.error("Error fetching users:", error); }
    };

    const handleApproveUser = async (userId: number) => {
        try {
            await api.put(`/admin/approve/${userId}`);
            alert("User အား အတည်ပြုပြီးပါပြီ။");
            fetchUsers();
        } catch (error) { alert("အတည်ပြုရာတွင် အမှားအယွင်းရှိပါသည်။"); }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm("ဤ User အား ဖျက်ပစ်ရန် သေချာပါသလား?")) return;
        try {
            await api.delete(`/admin/users/${userId}`);
            alert("User ဖျက်ပစ်ပြီးပါပြီ။");
            fetchUsers();
        } catch (error) { alert("ဖျက်ရာတွင် အမှားအယွင်းရှိပါသည်။"); }
    };

    const handleToggleAdmin = async (userId: number, currentStatus: boolean) => {
        if (!window.confirm(`ဤ User အား ${currentStatus ? 'သာမန် User' : 'Admin'} အဖြစ် ပြောင်းလဲရန် သေချာပါသလား?`)) return;
        try {
            await api.put(`/admin/users/${userId}/role`, { is_admin: !currentStatus });
            alert("ရာထူး ပြောင်းလဲပြီးပါပြီ။");
            fetchUsers();
        } catch (error) {
            alert("ရာထူးပြောင်းလဲရာတွင် အမှားအယွင်းရှိပါသည်။");
        }
    };

    // --- Lessons API ---
    const fetchLessons = async () => {
        try {
            const res = await api.get('/lessons', { params: { user_id: user.user_id } });
            setLessons(res.data);
        } catch (error) { console.error("Error fetching lessons:", error); }
    };

    const handleDeleteLesson = async (lessonId: number) => {
        if (!window.confirm("ဤသင်ခန်းစာကို ဖျက်ပစ်ရန် သေချာပါသလား?")) return;
        try {
            await api.delete(`/admin/lessons/${lessonId}`);
            alert("သင်ခန်းစာ ဖျက်ပစ်ပြီးပါပြီ။");
            fetchLessons();
        } catch (error) { alert("ဖျက်ရာတွင် အမှားအယွင်းရှိပါသည်။"); }
    };

    const startEditLesson = (lesson: any) => {
        setEditingId(lesson.id);
        setTitle(lesson.title);
        setContent(lesson.content);
        setCategory(lesson.category);
        setFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle(''); setContent(''); setFile(null);
    };

    const handleSaveLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (file) formData.append('file', file);

        try {
            if (editingId) {
                await api.put(`/admin/lessons/${editingId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                alert("🎉 သင်ခန်းစာကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ!");
            } else {
                await api.post('/admin/upload-lesson', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                alert("🎉 သင်ခန်းစာ အသစ်ကို အောင်မြင်စွာ တင်ပြီးပါပြီ!");
            }
            cancelEdit();
            fetchLessons();
        } catch (error) {
            alert("လုပ်ဆောင်ရာတွင် အမှားအယွင်းရှိပါသည်။");
        } finally {
            setLoading(false);
        }
    };

    // --- 🌟 Feedbacks API 🌟 ---
    const fetchFeedbacks = async () => {
        try {
            const res = await api.get('/feedbacks');
            setFeedbacks(res.data);
        } catch (err) {
            console.error("Error fetching feedbacks", err);
        }
    };

    const toggleHighlight = async (id: number) => {
        try {
            await api.put(`/feedbacks/${id}/highlight`);
            // UI တွင် ချက်ချင်း အဖွင့်/အပိတ် ပြောင်းလဲစေရန်
            setFeedbacks(feedbacks.map(fb =>
                fb.id === id ? { ...fb, is_highlighted: !fb.is_highlighted } : fb
            ));
        } catch (err) {
            console.error("Error toggling highlight", err);
            alert("Highlight ပြုလုပ်ရာတွင် အမှားအယွင်းရှိပါသည်။ (Backend တွင် API Route အသစ် ထည့်ထားရန် သေချာပါစေ)");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">⚙️ Admin Dashboard</h1>
                    <button onClick={() => window.location.href = '/'} className="text-blue-600 hover:underline">
                        Home သို့ ပြန်သွားမည်
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-200 pb-4">
                    <button onClick={() => setActiveTab('lessons')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'lessons' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                        📝 သင်ခန်းစာများ စီမံရန်
                    </button>
                    <button onClick={() => setActiveTab('users')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                        👥 User များ စီမံရန်
                    </button>
                    {/* 🌟 ဤနေရာတွင် Feedback Tab ခလုတ်အသစ် ထည့်ထားပါသည် 🌟 */}
                    <button onClick={() => setActiveTab('feedbacks')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'feedbacks' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                        ⭐ Feedback များ စီမံရန်
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

                    {/* --- 1. Lessons Section --- */}
                    {activeTab === 'lessons' && (
                        <div>
                            <form onSubmit={handleSaveLesson} className="max-w-3xl mb-12 p-6 bg-slate-50 rounded-xl border">
                                <h2 className="text-xl font-bold mb-6 border-b pb-2">
                                    {editingId ? '✏️ သင်ခန်းစာအား ပြင်ဆင်ရန်' : '➕ သင်ခန်းစာသစ် တင်ရန် (Rich Text Supported)'}
                                </h2>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">ခေါင်းစဉ်</label>
                                    <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ဥပမာ - Introduction to AI" />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">အမျိုးအစား (Category)</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="AI Basics">AI Basics (အခြေခံ)</option>
                                        <option value="Prompt Engineering">Prompt Engineering</option>
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Deep Learning">Deep Learning</option>
                                        <option value="Generative AI">Generative AI</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="AI Tools & Apps">AI Tools & Apps</option>
                                        <option value="Others">Others (အခြား)</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-1">အကြောင်းအရာ (Content)</label>
                                    <div className="bg-white">
                                        <ReactQuill
                                            theme="snow"
                                            value={content}
                                            onChange={setContent}
                                            className="h-64 mb-12"
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>

                                <div className="mb-6 p-4 border-2 border-dashed border-blue-200 bg-blue-50 rounded-lg mt-8">
                                    <label className="block text-sm font-bold text-blue-700 mb-2">ဖိုင်တွဲတင်ရန် (ပြောင်းလဲလိုမှသာ ရွေးပါ)</label>
                                    <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm" />
                                </div>

                                <div className="flex gap-4">
                                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                                        {loading ? 'လုပ်ဆောင်နေပါသည်...' : (editingId ? 'ပြင်ဆင်မှုများ သိမ်းမည်' : 'သင်ခန်းစာ တင်မည်')}
                                    </button>
                                    {editingId && (
                                        <button type="button" onClick={cancelEdit} className="bg-slate-200 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-300 transition">
                                            ပယ်ဖျက်မည်
                                        </button>
                                    )}
                                </div>
                            </form>

                            <h2 className="text-xl font-bold mb-4 border-b pb-2">📚 တင်ထားသော သင်ခန်းစာများ</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100 border-b">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">ခေါင်းစဉ်</th>
                                            <th className="p-3">အမျိုးအစား</th>
                                            <th className="p-3">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lessons.map(lesson => (
                                            <tr key={lesson.id} className="border-b hover:bg-slate-50">
                                                <td className="p-3 text-slate-500">{lesson.id}</td>
                                                <td className="p-3 font-semibold text-blue-700">{lesson.title}</td>
                                                <td className="p-3"><span className="bg-slate-200 px-2 py-1 rounded text-xs">{lesson.category}</span></td>
                                                <td className="p-3 flex gap-2">
                                                    <button onClick={() => startEditLesson(lesson)} className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-yellow-200 transition">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteLesson(lesson.id)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 transition">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- 2. Users Section --- */}
                    {activeTab === 'users' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6 border-b pb-2">👥 User စာရင်းနှင့် အကောင့် အတည်ပြုခြင်း</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">အမည်</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">အခြေအနေ</th>
                                            <th className="p-3">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id} className="border-b hover:bg-slate-50">
                                                <td className="p-3">{u.id}</td>
                                                <td className="p-3 font-medium">
                                                    {u.fullname}
                                                    {u.is_admin && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded ml-2">Admin</span>}
                                                </td>
                                                <td className="p-3 text-slate-500">{u.email}</td>
                                                <td className="p-3">
                                                    {u.is_approved ?
                                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Approved</span> :
                                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span>
                                                    }
                                                </td>
                                                <td className="p-3 flex gap-2">
                                                    {!u.is_approved && (
                                                        <button onClick={() => handleApproveUser(u.id)} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-200 transition">
                                                            အတည်ပြုမည်
                                                        </button>
                                                    )}
                                                    {u.is_approved && (
                                                        <button onClick={() => handleToggleAdmin(u.id, u.is_admin)} className={`px-3 py-1.5 rounded text-sm font-medium transition ${u.is_admin ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                                                            {u.is_admin ? '⬇️ User ပြောင်းမည်' : '⬆️ Admin ပေးမည်'}
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDeleteUser(u.id)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 transition">
                                                        ဖျက်မည်
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- 🌟 3. Feedbacks Management Section (အသစ်ထပ်တိုးထားသော UI) 🌟 --- */}
                    {activeTab === 'feedbacks' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <div className="flex justify-between items-center mb-6 border-b pb-2">
                                <h2 className="text-xl font-bold text-slate-800">သုံးသပ်ချက်နှင့် အကြံပြုချက်များ (Feedbacks)</h2>
                                <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                                    စုစုပေါင်း: {feedbacks.length} ခု
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {feedbacks.length === 0 ? (
                                    <p className="text-slate-500">Feedback များ မရှိသေးပါ...</p>
                                ) : (
                                    feedbacks.map((fb) => (
                                        <div key={fb.id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${fb.is_highlighted ? 'border-green-400 ring-2 ring-green-50' : 'border-slate-200'}`}>

                                            {/* Header (Name & Date) */}
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-bold text-slate-800 truncate max-w-[150px]" title={fb.name}>{fb.name}</h3>
                                                    <p className="text-xs text-slate-500">
                                                        {new Date(fb.created_at).toLocaleDateString('my-MM', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                                {/* Stars Rating Display */}
                                                <div className="flex text-yellow-400 text-sm">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i}>{i < fb.rating ? '★' : '☆'}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Comment Body */}
                                            <div className="bg-slate-50 p-4 rounded-xl mb-5 text-sm text-slate-700 h-24 overflow-y-auto custom-scrollbar">
                                                "{fb.comment}"
                                            </div>

                                            {/* Footer (Highlight Toggle Option) */}
                                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                                <span className="text-sm font-semibold text-slate-600">Home တွင် ပြသမည်</span>
                                                <button
                                                    onClick={() => toggleHighlight(fb.id)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${fb.is_highlighted ? 'bg-green-500' : 'bg-slate-300'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${fb.is_highlighted ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                            {fb.is_highlighted && (
                                                <p className="text-xs text-green-600 font-bold mt-2 text-right">✅ Website တွင် ပြသနေပါသည်</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
}