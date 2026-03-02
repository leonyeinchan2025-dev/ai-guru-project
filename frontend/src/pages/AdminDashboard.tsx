// // src/pages/AdminDashboard.tsx
// import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css'; // Editor ၏ ဒီဇိုင်း CSS
// import api from '../api';

// export default function AdminDashboard() {
//     const [activeTab, setActiveTab] = useState<'lessons' | 'users'>('lessons');
//     const [users, setUsers] = useState<any[]>([]);

//     // Editor နှင့် Form States
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState(''); // Quill တွင် HTML tags များအဖြစ် ဝင်ပါမည်
//     const [category, setCategory] = useState('Machine Learning');
//     const [file, setFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);

//     // 🌟 လုံခြုံရေး: User သည် Admin ဟုတ်မဟုတ် စစ်ဆေးခြင်း 🌟
//     const userString = localStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null;

//     useEffect(() => {
//         // User Login မဝင်ထားလျှင် (သို့) Admin မဟုတ်လျှင် Home သို့ ကန်ထုတ်မည်
//         if (!user || user.is_admin !== true) {
//             alert("❌ Admin သာလျှင် ဤစာမျက်နှာသို့ ဝင်ရောက်ခွင့်ရှိပါသည်။");
//             window.location.href = '/';
//         }
//     }, [user]);

//     useEffect(() => {
//         if (activeTab === 'users' && user?.is_admin) {
//             fetchUsers();
//         }
//     }, [activeTab, user]);

//     // Admin မဟုတ်လျှင် စာမျက်နှာကို အလွတ် (Blank) သာ ပြထားမည်
//     if (!user || user.is_admin !== true) return null;

//     const fetchUsers = async () => {
//         try {
//             const res = await api.get('/admin/users');
//             setUsers(res.data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     const handleApproveUser = async (userId: number) => {
//         try {
//             await api.put(`/admin/approve/${userId}`);
//             alert("User အား အတည်ပြုပြီးပါပြီ။");
//             fetchUsers();
//         } catch (error) {
//             alert("အတည်ပြုရာတွင် အမှားအယွင်းရှိပါသည်။");
//         }
//     };

//     const handleDeleteUser = async (userId: number) => {
//         if (!window.confirm("ဤ User အား ဖျက်ပစ်ရန် သေချာပါသလား?")) return;
//         try {
//             await api.delete(`/admin/users/${userId}`);
//             alert("User ဖျက်ပစ်ပြီးပါပြီ။");
//             fetchUsers();
//         } catch (error) {
//             alert("ဖျက်ရာတွင် အမှားအယွင်းရှိပါသည်။");
//         }
//     };

//     const handleUploadLesson = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content); // Rich Text HTML အဖြစ် ဝင်သွားမည်
//         formData.append('category', category);
//         if (file) formData.append('file', file);

//         try {
//             await api.post('/admin/upload-lesson', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             alert("🎉 သင်ခန်းစာ အောင်မြင်စွာ တင်ပြီးပါပြီ!");
//             setTitle(''); setContent(''); setFile(null);
//         } catch (error) {
//             alert("သင်ခန်းစာတင်ရာတွင် အမှားအယွင်းရှိပါသည်။");
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

//                 <div className="flex gap-4 mb-8">
//                     <button onClick={() => setActiveTab('lessons')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
//                         📝 သင်ခန်းစာ တင်ရန်
//                     </button>
//                     <button onClick={() => setActiveTab('users')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
//                         👥 User များ စီမံရန်
//                     </button>
//                 </div>

//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
//                     {activeTab === 'lessons' && (
//                         <form onSubmit={handleUploadLesson} className="max-w-3xl">
//                             <h2 className="text-xl font-bold mb-6 border-b pb-2">သင်ခန်းစာသစ် တင်ရန် (Rich Text Supported)</h2>

//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">ခေါင်းစဉ်</label>
//                                 <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ဥပမာ - Introduction to AI" />
//                             </div>

//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">အမျိုးအစား (Category)</label>
//                                 <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
//                                     <option value="Machine Learning">Machine Learning</option>
//                                     <option value="Deep Learning">Deep Learning</option>
//                                     <option value="Computer Vision">Computer Vision</option>
//                                 </select>
//                             </div>

//                             {/* 🌟 React Quill Rich Text Editor 🌟 */}
//                             <div className="mb-6">
//                                 <label className="block text-sm font-medium mb-1">အကြောင်းအရာ (Content)</label>
//                                 <div className="bg-white">
//                                     <ReactQuill
//                                         theme="snow"
//                                         value={content}
//                                         onChange={setContent}
//                                         className="h-64 mb-12" // အမြင့်ကို ထိန်းထားပေးသည်
//                                         placeholder="စာသားများကို Bold, Italic စသည်ဖြင့် အလှဆင်၍ ရေးသားနိုင်ပါပြီ..."
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mb-6 p-4 border-2 border-dashed border-blue-200 bg-blue-50 rounded-lg">
//                                 <label className="block text-sm font-bold text-blue-700 mb-2">ဖိုင်တွဲတင်ရန် (PDF, JPG, MP4)</label>
//                                 <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm" />
//                             </div>

//                             <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
//                                 {loading ? 'တင်နေပါသည်...' : 'သင်ခန်းစာ တင်မည်'}
//                             </button>
//                         </form>
//                     )}

//                     {/* ... (User Management Table ယခင်အတိုင်း ကျန်ပါသေးသည်) ... */}
//                     {activeTab === 'users' && (
//                         // ယခင် Table Code များ (မပြောင်းလဲပါ)
//                         <div>
//                             <h2 className="text-xl font-bold mb-6 border-b pb-2">User စာရင်းနှင့် အကောင့် အတည်ပြုခြင်း</h2>
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
//                                         {users.map(user => (
//                                             <tr key={user.id} className="border-b hover:bg-slate-50">
//                                                 <td className="p-3">{user.id}</td>
//                                                 <td className="p-3 font-medium">{user.fullname}</td>
//                                                 <td className="p-3 text-slate-500">{user.email}</td>
//                                                 <td className="p-3">
//                                                     {user.is_approved ?
//                                                         <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Approved</span> :
//                                                         <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span>
//                                                     }
//                                                 </td>
//                                                 <td className="p-3 flex gap-2">
//                                                     {!user.is_approved && (
//                                                         <button onClick={() => handleApproveUser(user.id)} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-200 transition">
//                                                             အတည်ပြုမည်
//                                                         </button>
//                                                     )}
//                                                     <button onClick={() => handleDeleteUser(user.id)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 transition">
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

// // src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../api';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'lessons' | 'users'>('lessons');

    // States
    const [users, setUsers] = useState<any[]>([]);
    const [lessons, setLessons] = useState<any[]>([]);

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

    // Data ဆွဲယူခြင်း
    useEffect(() => {
        if (user?.is_admin) {
            if (activeTab === 'users') fetchUsers();
            if (activeTab === 'lessons') fetchLessons();
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

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">⚙️ Admin Dashboard</h1>
                    <button onClick={() => window.location.href = '/'} className="text-blue-600 hover:underline">
                        Home သို့ ပြန်သွားမည်
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button onClick={() => setActiveTab('lessons')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
                        📝 သင်ခန်းစာများ စီမံရန်
                    </button>
                    <button onClick={() => setActiveTab('users')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
                        👥 User များ စီမံရန်
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

                    {/* --- Lessons Section --- */}
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
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Deep Learning">Deep Learning</option>
                                        <option value="Computer Vision">Computer Vision</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-1">အကြောင်းအရာ (Content)</label>
                                    <div className="bg-white">
                                        <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
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

                    {/* --- Users Section --- */}
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
                                                <td className="p-3 font-medium">{u.fullname} {u.is_admin && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded ml-2">Admin</span>}</td>
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

                </div>
            </div>
        </div>
    );
}