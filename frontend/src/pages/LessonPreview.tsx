import { useParams, useNavigate } from 'react-router-dom';
import { sampleLessons } from '../components/SampleLessonsModal';

export default function LessonPreview() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const lesson = sampleLessons.find((l) => l.id === id);

    if (!lesson) {
        return <div className="p-20 text-center text-2xl font-bold">သင်ခန်းစာ ရှာမတွေ့ပါ။</div>;
    }

    // 🌟 ၁။ ဤနေရာသည် ID အလိုက် မတူညီသော စာသားနှင့် ပုံများကို ထုတ်ပေးမည့် Function ဖြစ်ပါသည် 🌟
    const renderLessonContent = () => {
        switch (id) {
            case "basic-python":
                // case "intermediate-python":
                return (
                    <div className="animate-fade-in">
                        {/* 🌟 ခေါင်းစဉ်နှင့် မိတ်ဆက် 🌟 */}
                        <h1 className="text-3xl font-extrabold text-blue-600 mb-6 flex items-center gap-3">
                            <span>🚀</span> အလယ်အလတ်အဆင့် Python သင်ခန်းစာ
                        </h1>
                        <p className="text-slate-700 leading-relaxed mb-8 text-lg">
                            အခြေခံ Python ကို နားလည်ပြီးနောက်၊ ပိုမိုရှုပ်ထွေးသော ပြဿနာများကို ဖြေရှင်းနိုင်ရန် Functions များ၊ Data Structures များနှင့် Error များကို ကိုင်တွယ်ဖြေရှင်းနည်းများကို ဆက်လက်လေ့လာကြပါမည်။
                        </p>

                        {/* 🌟 ၃။ Functions 🌟 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span>⚙️</span> ၃။ Python Functions (လုပ်ဆောင်ချက်များ)
                            </h2>
                            <p className="text-slate-600 mb-4">
                                Function ဆိုသည်မှာ မိမိရေးသားထားသော Code များကို ထပ်ခါတလဲလဲ အသုံးပြုနိုင်ရန် စုစည်းထားသော လုပ်ငန်းစဉ်တစ်ခု ဖြစ်ပါသည်။ <code>def</code> keyword ကို အသုံးပြု၍ တည်ဆောက်ရသည်။
                            </p>

                            {/* Code Block */}
                            <div className="bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto mb-4 font-mono text-sm">
                                <pre>
                                    <code>
                                        {`def greet(name):
    print(f"မင်္ဂလာပါ, {name}!")

greet("Mg Mg")  # Output: မင်္ဂလာပါ, Mg Mg!
greet("Aung Aung")  # Output: မင်္ဂလာပါ, Aung Aung!`}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        {/* 🌟 ပုံအသစ် ထည့်သွင်းခြင်း 🌟 */}
                        <div className="relative mb-10 group">
                            <img
                                src="https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?q=80&w=800&auto=format&fit=crop"
                                alt="Data Structures in Python"
                                className="w-full h-64 object-cover rounded-2xl shadow-md border border-slate-200 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm">
                                Data Organization
                            </div>
                        </div>

                        {/* 🌟 ၄။ Data Structures 🌟 */}
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span>🗂️</span> ၄။ အဓိက Data Structures များ
                        </h2>
                        <p className="text-slate-700 mb-6">
                            ဒေတာများကို စနစ်တကျ သိမ်းဆည်းရန်အတွက် Python တွင် အဓိကအားဖြင့် List နှင့် Dictionary တို့ကို အများဆုံး အသုံးပြုကြသည်။
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
                                <span className="text-2xl">📦</span>
                                <div>
                                    <strong className="text-blue-900 text-lg">List (စာရင်း)</strong>
                                    <p className="text-slate-600 mt-1">အချက်အလက်များကို အစဉ်လိုက် သိမ်းဆည်းပေးသည်။ <code>[]</code> ကိုအသုံးပြုသည်။ <br /> <code className="text-sm bg-blue-100 px-2 py-0.5 rounded text-blue-800">fruits = ["Apple", "Banana", "Orange"]</code></p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl">
                                <span className="text-2xl">📖</span>
                                <div>
                                    <strong className="text-purple-900 text-lg">Dictionary (အဘိဓာန်)</strong>
                                    <p className="text-slate-600 mt-1">Key နှင့် Value တွဲ၍ သိမ်းဆည်းပေးသည်။ <code>{`{}`}</code> ကိုအသုံးပြုသည်။ <br /> <code className="text-sm bg-purple-100 px-2 py-0.5 rounded text-purple-800">{`user = {"name": "Hla Hla", "age": 20}`}</code></p>
                                </div>
                            </li>
                        </ul>

                        {/* 🌟 Table (ဇယား) 🌟 */}
                        <div className="overflow-x-auto mb-10 shadow-sm rounded-xl border border-slate-200">
                            <table className="w-full text-left bg-white">
                                <thead className="bg-slate-100 text-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">အမျိုးအစား</th>
                                        <th className="px-6 py-4 font-semibold">ပုံစံ (Syntax)</th>
                                        <th className="px-6 py-4 font-semibold">အဓိက အားသာချက်</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium">List</td>
                                        <td className="px-6 py-4"><code>[1, 2, 3]</code></td>
                                        <td className="px-6 py-4">အချက်အလက်များကို အစီအစဉ်တကျ ထည့်သွင်း/ဖယ်ရှားရန် လွယ်ကူသည်။</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium">Dictionary</td>
                                        <td className="px-6 py-4"><code>{`{"id": 1}`}</code></td>
                                        <td className="px-6 py-4">နာမည် (Key) ဖြင့် ဒေတာများကို အမြန်ရှာဖွေနိုင်သည်။</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 🌟 ၅။ Error Handling 🌟 */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl mb-8">
                            <h2 className="text-2xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                                <span>🛡️</span> ၅။ အမှားများကို ကိုင်တွယ်ခြင်း (Try / Except)
                            </h2>
                            <p className="text-amber-800 mb-4">
                                Program run နေစဉ် ရုတ်တရက် ရပ်တန့်မသွားစေရန်နှင့် အမှား (Errors) များကို စနစ်တကျ ဖြေရှင်းနိုင်ရန် <code>try...except</code> ကို အသုံးပြုသည်။
                            </p>
                            <div className="bg-slate-800 text-amber-200 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                <pre>
                                    <code>
                                        {`try:
    result = 10 / 0
except ZeroDivisionError:
    print("သုညဖြင့် စား၍ မရပါ။")`}
                                    </code>
                                </pre>
                            </div>
                        </div>

                    </div>
                );
            // return (
            //     <div>
            //         <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">၁။ Python ဆိုတာ ဘာလဲ?</h2>
            //         <p className="mb-6">
            //             Python သည် ရိုးရှင်းပြီး ဖတ်ရလွယ်ကူသော Programming Language တစ်ခုဖြစ်ပါသည်။ အထူးသဖြင့် Artificial Intelligence (AI) နှင့် Machine Learning (ML) နယ်ပယ်များတွင် အသုံးအများဆုံး ဖြစ်သည်။
            //         </p>

            //         {/* 🌟 ပုံအသစ် ထည့်နည်း 🌟 */}
            //         <img
            //             src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop"
            //             // src="/src/assets/amara3.gif"
            //             alt="Python Code"
            //             className="w-full rounded-2xl shadow-md mb-8 border border-slate-200"
            //         />

            //         <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">၂။ ဘာကြောင့် Python ကို လေ့လာသင့်သလဲ?</h2>
            //         <ul className="list-disc ml-6 mb-6 space-y-3">
            //             <li>Syntax များသည် အင်္ဂလိပ်စာကဲ့သို့ ရိုးရှင်းသောကြောင့် စတင်လေ့လာသူများအတွက် အလွန်လွယ်ကူခြင်း။</li>
            //             <li>TensorFlow, PyTorch, Pandas ကဲ့သို့သော အင်အားကြီး AI Library များစွာ ရှိခြင်း။</li>
            //             <li>ကမ္ဘာတစ်ဝှမ်းတွင် Developer Community အလွန်ကြီးမားခြင်း။</li>
            //         </ul>
            //     </div>
            // );

            case "prompt-engineering":
                return (
                    <div className="animate-fade-in">
                        {/* 🌟 ခေါင်းစဉ်နှင့် မိတ်ဆက် 🌟 */}
                        <h1 className="text-3xl font-extrabold text-indigo-600 mb-6 flex items-center gap-3">
                            <span>🤖</span> Prompt Engineering အခြေခံနှင့် နည်းစနစ်များ
                        </h1>
                        <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                            ChatGPT, Gemini ကဲ့သို့သော AI များထံမှ မိမိလိုချင်သော အဖြေကို အတိကျဆုံးနှင့် အကောင်းဆုံး ရရှိအောင် ခိုင်းစေညွှန်ကြားချက် (Prompt) များကို စနစ်တကျ ရေးသားသည့် ပညာရပ် ဖြစ်ပါသည်။
                        </p>

                        {/* 🌟 Quote (အဆိုအမိန့်) 🌟 */}
                        <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-10 text-6xl transform translate-x-4 -translate-y-2">"</div>
                            <p className="italic text-indigo-900 text-lg relative z-10">
                                "AI သည် မှော်ပညာ မဟုတ်ပါ။ သင် ခိုင်းတတ်မှသာ အလုပ်လုပ်ပေးမည့် အလွန်ထက်မြက်သော လက်ထောက်တစ်ဦးသာ ဖြစ်သည်။"
                            </p>
                        </div>

                        {/* 🌟 ပထမပုံ (Reference Image) 🌟 */}
                        <div className="relative mb-10 group">
                            <img
                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
                                // src="/src/assets/amara3.gif"  <-- သင့်မူလ Local ပုံကို သုံးလိုပါက ဤနေရာတွင် ပြန်ဖွင့်ပါ
                                alt="AI and Prompt Engineering"
                                className="w-full h-72 object-cover rounded-2xl shadow-md border border-slate-200 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                                <span>✨</span> Communicating with AI
                            </div>
                        </div>

                        {/* 🌟 ၂။ အကောင်းဆုံး Prompt တစ်ခု၏ အစိတ်အပိုင်းများ 🌟 */}
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-6 flex items-center gap-2">
                            <span>🧩</span> ၂။ အကောင်းဆုံး Prompt တစ်ခု၏ အစိတ်အပိုင်းများ (Key Elements)
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 text-xl">🎭</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Role (အခန်းကဏ္ဍ)</h3>
                                    <p className="text-slate-600 text-sm">AI ကို မည်သူ့အနေဖြင့် ဖြေဆိုစေချင်သလဲ သတ်မှတ်ပါ။ (ဥပမာ - "မင်းက ကျွမ်းကျင်တဲ့ Marketing Manager တစ်ယောက်အနေနဲ့...")</p>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-green-100 p-3 rounded-lg text-green-600 text-xl">🎯</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Task (လုပ်ဆောင်ရမည့်အလုပ်)</h3>
                                    <p className="text-slate-600 text-sm">တိကျသော အလုပ်ကို ညွှန်ကြားပါ။ (ဥပမာ - "Facebook Post အတွက် စာသားရေးပေးပါ။")</p>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 text-xl">📚</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Context (နောက်ခံအချက်အလက်)</h3>
                                    <p className="text-slate-600 text-sm">လိုအပ်သော အချက်အလက်များကို ပံ့ပိုးပေးပါ။ (ဥပမာ - "ပစ်မှတ်ထားမည့်သူများက လူငယ်တွေ ဖြစ်ပါတယ်။")</p>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-purple-100 p-3 rounded-lg text-purple-600 text-xl">📝</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Format (အဖြေပုံစံ)</h3>
                                    <p className="text-slate-600 text-sm">အဖြေကို မည်သည့်ပုံစံဖြင့် လိုချင်သလဲ သတ်မှတ်ပါ။ (ဥပမာ - "ဇယားဖြင့် ပြပါ / အချက် ၃ ချက်ဖြင့် ပြပါ။")</p>
                                </div>
                            </div>
                        </div>

                        {/* 🌟 ၃။ Prompting နည်းစနစ်များ (Table) 🌟 */}
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span>🛠️</span> ၃။ အဆင့်မြင့် Prompt ရေးသားနည်းများ
                        </h2>
                        <div className="overflow-x-auto mb-10 shadow-sm rounded-xl border border-slate-200">
                            <table className="w-full text-left bg-white">
                                <thead className="bg-indigo-50 text-indigo-900">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold w-1/4">နည်းစနစ် (Technique)</th>
                                        <th className="px-6 py-4 font-semibold w-1/3">အဓိပ္ပာယ်</th>
                                        <th className="px-6 py-4 font-semibold">ဥပမာ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">Zero-Shot Prompting</td>
                                        <td className="px-6 py-4 text-sm">ဘာဥပမာမှ မပေးဘဲ တိုက်ရိုက် မေးမြန်းခြင်း။</td>
                                        <td className="px-6 py-4 text-sm italic">"ဒီစာကြောင်းကို အင်္ဂလိပ်လို ဘာသာပြန်ပေးပါ။"</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">Few-Shot Prompting</td>
                                        <td className="px-6 py-4 text-sm">AI က ပိုနားလည်စေရန် ဥပမာ ၁ ခု သို့မဟုတ် ၂ ခု ကြိုတင်ပေးထားခြင်း။</td>
                                        <td className="px-6 py-4 text-sm italic">"ကောင်းတယ် - Good, ဆိုးတယ် - Bad, လှတယ် - Beautiful"</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">Chain of Thought (CoT)</td>
                                        <td className="px-6 py-4 text-sm">အဖြေကို ချက်ချင်းမထုတ်ဘဲ အဆင့်လိုက် စဉ်းစားခိုင်းခြင်း။</td>
                                        <td className="px-6 py-4 text-sm italic">"ဒီသင်္ချာပုစ္ဆာကို အဖြေမထုတ်ခင် အဆင့်ဆင့် ဘယ်လိုတွက်လဲ အရင်ရှင်းပြပါ။"</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 🌟 ၄။ လက်တွေ့ ဥပမာ (Before & After) 🌟 */}
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span>💡</span> ၄။ လက်တွေ့ ဥပမာ (Bad vs Good Prompt)
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            {/* Bad Prompt */}
                            <div className="flex-1 bg-red-50 p-5 rounded-xl border border-red-100">
                                <h3 className="text-red-600 font-bold mb-3 flex items-center gap-2">
                                    <span>❌</span> သာမန် Prompt (Bad)
                                </h3>
                                <div className="bg-white p-4 rounded-lg text-slate-700 text-sm shadow-inner font-mono">
                                    "ကျန်းမာရေးနဲ့ ညီညွတ်တဲ့ အစားအစာတွေအကြောင်း စာရေးပေးပါ။"
                                </div>
                                <p className="text-red-500 text-xs mt-3">👉 ပြဿနာ: အကြောင်းအရာ အရမ်းကျယ်ပြန့်ပြီး ဘယ်သူ့အတွက်လဲ၊ ဘာပုံစံလိုချင်လဲ မသိရပါ။</p>
                            </div>

                            {/* Good Prompt */}
                            <div className="flex-1 bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                                <h3 className="text-emerald-600 font-bold mb-3 flex items-center gap-2">
                                    <span>✅</span> စနစ်ကျသော Prompt (Good)
                                </h3>
                                <div className="bg-white p-4 rounded-lg text-slate-700 text-sm shadow-inner font-mono">
                                    "မင်းက ကျွမ်းကျင်တဲ့ အာဟာရဗေဒပညာရှင် တစ်ယောက်ပါ။ အသက် ၂၀-၃၀ ကြား လူငယ်တွေအတွက် ရုံးမှာ အလွယ်တကူ စားလို့ရမယ့် ကျန်းမာရေးနဲ့ညီညွတ်တဲ့ အဆာပြေစာ ၃ မျိုးကို ချက်ပြုတ်နည်းနဲ့တကွ Bullet points တွေသုံးပြီး ရေးပေးပါ။"
                                </div>
                                <p className="text-emerald-600 text-xs mt-3">👉 အားသာချက်: Role, Task, Context နှင့် Format အားလုံး တိကျစွာ ပါဝင်ပါသည်။</p>
                            </div>
                        </div>

                    </div>
                );

            // 🌟 အခြားသော ID များအတွက်လည်း ဤနေရာတွင် case "id-name": return ( <div>...</div> ); ဟု ဆက်တိုက် ထပ်ရေးသွားနိုင်ပါသည်။ 🌟
            // 🌟 NotebookLM အတွက် အသစ်ထပ်ထည့်ခြင်း 🌟
            case "notebook-lm":
                return (
                    <div className="animate-fade-in">
                        {/* 🌟 ခေါင်းစဉ်နှင့် မိတ်ဆက် 🌟 */}
                        <h1 className="text-3xl font-extrabold text-teal-600 mb-6 flex items-center gap-3">
                            <span>📓</span> NotebookLM (AI Research Assistant)
                        </h1>
                        <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                            Google ၏ <b>NotebookLM</b> သည် မိမိကိုယ်တိုင် တင်ထားသော PDF, Google Docs နှင့် Text ဖိုင်များကိုသာ အခြေခံ၍ အချက်အလက်များကို ရှာဖွေပေးခြင်း၊ အနှစ်ချုပ်ပေးခြင်းများ လုပ်ဆောင်ပေးသော သင်၏ ကိုယ်ပိုင် <b>AI သုတေသနလက်ထောက် (Personal AI Research Assistant)</b> တစ်ခုဖြစ်ပါသည်။
                        </p>

                        {/* 🌟 ပထမပုံ (Reference Image) 🌟 */}
                        <div className="relative mb-10 group">
                            <img
                                src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=800&auto=format&fit=crop"
                                alt="Notebook LM Analysis Workspace"
                                className="w-full h-72 object-cover rounded-2xl shadow-md border border-slate-200 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                                <span>🔍</span> Deep Research & Analysis
                            </div>
                        </div>

                        {/* 🌟 ၂။ အဓိက အားသာချက်များ (Features) 🌟 */}
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-6 flex items-center gap-2">
                            <span>✨</span> ၂။ NotebookLM ၏ အဓိက လုပ်ဆောင်ချက်များ
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all">
                                <div className="bg-teal-100 w-12 h-12 flex items-center justify-center rounded-full text-teal-600 text-2xl mb-4">📚</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">Multiple Sources</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    PDF ဖိုင်များ၊ Website Link များ၊ Google Docs များကို တစ်ပြိုင်နက်တည်း ထည့်သွင်းပြီး မေးခွန်းများ မေးမြန်းနိုင်ပါသည်။
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all">
                                <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full text-blue-600 text-2xl mb-4">🎯</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">Inline Citations</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    AI ဖြေကြားလိုက်သော အဖြေများသည် မည်သည့်စာရွက်စာတမ်း၏ မည်သည့်စာမျက်နှာမှ ယူထားကြောင်း အတိအကျ ကိုးကား (Cite) ပြသပေးပါသည်။
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all">
                                <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full text-purple-600 text-2xl mb-4">🎧</div>
                                <h3 className="font-bold text-slate-800 text-lg mb-2">Audio Overview</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    သင်တင်ထားသော စာရွက်စာတမ်းများကို လူသားနှစ်ဦး ဆွေးနွေးနေသည့် Podcast ပုံစံဖြင့် အသံထွက် ဖန်တီးပေးနိုင်ပါသည်။
                                </p>
                            </div>
                        </div>

                        {/* 🌟 ၃။ သာမန် AI များနှင့် ကွာခြားချက် (Comparison Table) 🌟 */}
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span>⚖️</span> ၃။ NotebookLM နှင့် ChatGPT / Gemini ကွာခြားချက်
                        </h2>
                        <div className="overflow-x-auto mb-10 shadow-sm rounded-xl border border-slate-200">
                            <table className="w-full text-left bg-white">
                                <thead className="bg-slate-100 text-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold w-1/4">အချက်အလက်</th>
                                        <th className="px-6 py-4 font-semibold text-teal-700 w-1/3">📓 NotebookLM</th>
                                        <th className="px-6 py-4 font-semibold text-blue-700">🤖 သာမန် AI (ChatGPT/Gemini)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">အချက်အလက် အရင်းအမြစ်</td>
                                        <td className="px-6 py-4 text-sm bg-teal-50/30">သင်ကိုယ်တိုင် တင်ထားသော ဖိုင်များကိုသာ အခြေခံသည်။</td>
                                        <td className="px-6 py-4 text-sm">အင်တာနက်ပေါ်ရှိ ဒေတာများကို အခြေခံသည်။</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">မှားယွင်းနိုင်ခြေ (Hallucination)</td>
                                        <td className="px-6 py-4 text-sm bg-teal-50/30">အလွန်နည်းပါးသည်။ မသိလျှင် မသိကြောင်း ဖြေသည်။</td>
                                        <td className="px-6 py-4 text-sm">တစ်ခါတစ်ရံ စိတ်ကူးယဉ်ပြီး မှားယွင်းဖြေဆိုတတ်သည်။</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">အကောင်းဆုံး အသုံးပြုမှု</td>
                                        <td className="px-6 py-4 text-sm bg-teal-50/30">စာတမ်းဖတ်ရန်၊ သုတေသနလုပ်ရန်၊ စာအုပ်များ အနှစ်ချုပ်ရန်။</td>
                                        <td className="px-6 py-4 text-sm">အထွေထွေ မေးခွန်းများမေးရန်၊ စာစီစာကုံးရေးရန်၊ Idea ရှာရန်။</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 🌟 ၄။ ဘယ်သူတွေ အသုံးပြုသင့်သလဲ? (Target Audience) 🌟 */}
                        <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 mb-8">
                            <h2 className="text-2xl font-bold text-teal-900 mb-4 flex items-center gap-2">
                                <span>🎯</span> ၄။ ဘယ်သူတွေ အသုံးပြုသင့်သလဲ?
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                    <span className="text-xl">👩‍🎓</span>
                                    <div>
                                        <strong className="text-slate-800">ကျောင်းသား/သူများ</strong>
                                        <p className="text-slate-600 text-sm mt-1">Lecture Note များနှင့် ဖတ်စာအုပ်များကို အလွယ်တကူ အနှစ်ချုပ်ရန်။</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                    <span className="text-xl">🧑‍🔬</span>
                                    <div>
                                        <strong className="text-slate-800">သုတေသန ပညာရှင်များ</strong>
                                        <p className="text-slate-600 text-sm mt-1">Research Paper များစွာကို တစ်ပြိုင်နက်တည်း ဖတ်ရှုပြီး Reference ရှာရန်။</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                    <span className="text-xl">✍️</span>
                                    <div>
                                        <strong className="text-slate-800">စာရေးဆရာ / Content Creator များ</strong>
                                        <p className="text-slate-600 text-sm mt-1">မိမိရှာဖွေထားသော အချက်အလက်များကို စနစ်တကျ စုစည်းထားရန်။</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                    <span className="text-xl">💼</span>
                                    <div>
                                        <strong className="text-slate-800">လုပ်ငန်းခွင် ဝင်နေသူများ</strong>
                                        <p className="text-slate-600 text-sm mt-1">ကုမ္ပဏီ၏ Report များ၊ Policy စာအုပ်များကို အမြန်ပြန်လည်ရှာဖွေရန်။</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                );
            // 🌟 ai-practical အတွက် အသစ်ထပ်ထည့်ခြင်း 🌟
            case "ai-practical":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">"AI လက်တွေ့အသုံးချနည်းများ"</h2>
                        <p className="mb-6">
                            ယခုသင်ခန်းစာတွင် AI ကို နေ့စဉ်ဘဝနှင့် လုပ်ငန်းခွင် အခက်အခဲများကို ဖြေရှင်းရန် ထိရောက်စွာ အသုံးပြုနည်းများကို လေ့လာသွားမည်ဖြစ်ပါသည်။ AI ကို သာမန် မေးတာဖြေတာတွေထက် ပိုမို သာလွန်သော နည်းပညာဖြင့် အချိန်ကုန်သက်သာစေခြင်း၊ စီမံခန့်ခွဲမှု တိုးတက်စေခြင်း၊ ဖန်တီးမှုများကို မြှင့်တင်ခြင်းတို့ကို လေ့လာသွားမည်ဖြစ်ပါသည်။ <br />
                            အောက်ပါ ခေါင်းစဉ် ၃ ချက်ကို အထူးအာရုံစိုက်လေ့လာသွားမည်ဖြစ်ပါသည်။
                        </p>
                        <ul className="list-disc ml-6 mb-6 space-y-3">
                            <li>Gemini Gem ဖြင့် သီးသန့် AI Scope ထုတ်၍ AI ကို ညွှန်ကြားနည်း</li>
                            <li>𝐂𝐡𝐚𝐭𝐆𝐏𝐓 ၏ 𝐀𝐈𝐏𝐑𝐌 ကို အသုံးပြုနည်း</li>
                            <li>Role Based Model AI Interaction နည်းဖြင့် AI ကို ခိုင်းစေနည်း</li>
                        </ul>

                        {/* 🌟 ပုံအသစ် ထည့်နည်း 🌟 */}
                        <img
                            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop"
                            alt="Python Code"
                            className="w-full rounded-2xl shadow-md mb-8 border border-slate-200"
                        />

                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Gemini Gem ဖြင့် သီးသန့် AI Scope ထုတ်၍ AI ကို ညွှန်ကြားနည်း</h2>
                        <p className="mb-6">
                            Gemini Gem သုံးပြီး AI ကို ကိုယ့်လက်ထောက်အဖြစ် သေချာခိုင်းကြမယ်။
                            ခေတ်သစ်နည်းပညာတွေကြောင့် မမြင်ဖူးတာ၊ မကြားဖူးတာတွေ အံဩဘနန်း ကြုံတွေ့နေရတယ်။  (အထူးသဖြင့် AI ဆိုတဲ့ ဝေါဟာရတခု) က အတော် မောင်းနှင်ပေးနေတာကို အားလုံးအသိ။
                            အခု‌ဆို ကလစ်လေးတချက်နဲ့ Medium Application လေးတွေ၊ အလတ်စား Web App, Website တွေ ဖန်တီးနိုင်လာတာကို မြင်နေရတယ်။ Vibe Codeing ပေါ့။ ကိုယ့်ဘက်က Idea and Concept လေးတွေ ၊ လိုချင်တာလေးတွေ AI ကို ပေးပြီး ခိုင်းယုံ ပါပဲ။ (နောက်နှစ်တွေများဆို ဘယ်လိုတွေတောင်လာဦးမယ်မသိ) အကြီးစားပရောဂျက်တွေ လုပ်ငန်းကြီးတွေအတွက်တော့ AI က Support ပေါ့။
                            အခုဆောင်းပါးမှာတော့ လက်ရှိကာလ အတော် အသုံးဝင်နေတဲ့ Gemini Gem 💎 AI လေးကို မျှဝေပေးချင်ပါတယ်။
                            လက်ထောက်တယောက်လို ခိုင်းထားချင်ရင် ...
                            Gems ( https://gemini.google.com/gems) <br /><br />
                            Role Based Model Assistant တဖြစ်လည်း AI ကို ဘယ်လို ကျွမ်းကျင်သူအဖြစ် နေစေချင်သလဲ သတ်မှတ်ပါ (ဥပမာ - အတွေ့အကြုံရှိသော အထက်တန်းကျောင်း ဆရာအဖြစ် နေပါ)။
                            Google Gemini ရဲ့ "Gems" ဆိုတာ သင့်ရဲ့ နေ့စဉ်လုပ်ငန်းဆောင်တာတွေကို ပိုမိုမြန်ဆန်လွယ်ကူစေဖို့ ဖန်တီးထားတဲ့ ကိုယ်ပိုင် စိတ်ကြိုက် AI လက်ထောက်များ (Customized AI Assistants) ဖြစ်ပါတယ်။ အလုပ်တစ်ခုတည်းအတွက် Prompt တွေကို အခါခါ ထပ်ရိုက်နေစရာမလိုဘဲ၊ သင်လိုချင်တဲ့ ပုံစံ၊ လေသံ၊ စည်းမျဉ်းတွေကို တစ်ခါတည်း သတ်မှတ်ပေးထားလို့ရတဲ့ စနစ်ဖြစ်ပါတယ်။
                            Gems တွေကို ထိထိရောက်ရောက် အသုံးချနိုင်ဖို့ အောက်ပါအတိုင်း အဆင့်ဆင့် လုပ်ဆောင်နိုင်ပါတယ်။ <br /> <br />
                            ၁။ Gem တစ်ခုကို ဘယ်လို ဖန်တီးမလဲ? <br />
                            Gem Manager သို့သွားပါ: Gemini ဝဘ်ဆိုက် (gemini.google.com) ရဲ့ ဘယ်ဘက်အစွန်မှာရှိတဲ့ "Gem manager" (သို့မဟုတ် "Explore Gems") ကို နှိပ်ပါ။
                            Gem အသစ်ဖန်တီးပါ: "+ New Gem" ဆိုတဲ့ ခလုတ်ကို နှိပ်ပါ။ <br />
                            အမည်ပေးပါ (Name): သင့် Gem ရဲ့ လုပ်ဆောင်ချက်ကို ရှင်းလင်းစွာ သိနိုင်မယ့် နာမည်တစ်ခု ပေးပါ (ဥပမာ - "Marketing Expert" သို့မဟုတ် "Recipe Expert")။
                            ညွှန်ကြားချက်များ ရေးသားပါ (Instructions): ဒါဟာ အရေးအကြီးဆုံး အပိုင်းဖြစ်ပါတယ်။ အကောင်းဆုံး ညွှန်ကြားချက်တစ်ခုဖြစ်ဖို့ အောက်ပါ အချက် (၄) ချက် ပါဝင်သင့်ပါတယ်:
                            Persona (ဇာတ်ကောင်): AI ကို ဘယ်လို ကျွမ်းကျင်သူအဖြစ် နေစေချင်သလဲ သတ်မှတ်ပါ (Role Base Model)
                            Task (တာဝန်): ဘာကို လုပ်ဆောင်ပေးရမလဲဆိုတာကို တိကျစွာပြောပြပါ (ဥပမာ - ကျောင်းသားများအတွက် သင်ခန်းစာ အစီအစဉ်များ ဖန်တီးပေးပါ)။
                            Context (အခြေအနေ/နောက်ခံ): လုပ်ဆောင်ရမယ့် ဘောင်နဲ့ အချက်အလက်တွေကို ပေးပါ။
                            Format (ပုံစံ): အဖြေကို ဘယ်လိုပုံစံနဲ့ လိုချင်သလဲ သတ်မှတ်ပါ (ဥပမာ - အချက်အလက်များကို Bullet Point ဖြင့် ပြပါ၊ ဇယားဖြင့်ပြပါ)။
                            ဖိုင်များ ထည့်သွင်းပါ (Knowledge): သင့်လုပ်ငန်းရဲ့ သတင်းအချက်အလက်တွေ၊ စည်းမျဉ်းတွေ ပါဝင်တဲ့ Google Docs, PDFs, စာရင်းဇယား စတဲ့ ဖိုင် ၁၀ ခုအထိကို Gem ထဲမှာ သီးသန့် ထည့်သွင်း (Upload) ပေးထားနိုင်ပါတယ်။
                            စမ်းသပ်ပြီး သိမ်းဆည်းပါ (Preview & Save): ညာဘက်ခြမ်းမှာရှိတဲ့ Preview နေရာမှာ စမ်းသပ်မေးမြန်းကြည့်ပါ။ အဖြေက ကိုယ်လိုချင်တဲ့အတိုင်း ဖြစ်ပြီဆိုရင် အပေါ်ထောင့်က "Save" ကို နှိပ်လိုက်ပါ။
                            <br /><br />၂။ Gems ကို အကျိုးရှိရှိ အသုံးချနိုင်မယ့် နည်းလမ်းကောင်းများ <br />
                            Gemini ကိုယ်တိုင်ကို ညွှန်ကြားချက် ရေးခိုင်းပါ: ညွှန်ကြားချက် (Instructions) ကို သေသေချာချာ ဘယ်လိုရေးရမလဲ မသိရင် မှော်တုတ်တံ (Magic wand သို့မဟုတ် ခဲတံပုံစံ) လေးကို နှိပ်ပြီး Gemini ကို သေသပ်ကျနတဲ့ ညွှန်ကြားချက်တွေ ပြင်ဆင်ရေးသားခိုင်းလို့ ရပါတယ်။
                            အဆင်သင့်ရှိသော Gems များကို အသုံးပြုပါ: အစကနေ ကိုယ်တိုင်မရေးချင်ရင် Google က အဆင်သင့်ပေးထားတဲ့ Gems တွေ (ဥပမာ - Learning coach, Coding partner, Writing editor, Brainstormer) ကို မိတ္တူကူး (Make a copy) ပြီး ကိုယ့်စိတ်ကြိုက် နည်းနည်းပြင်သုံးလို့ ရပါတယ်။
                            အလုပ်တစ်ခုတည်း ထပ်ခါတလဲလဲ လုပ်ရတာတွေကို လျှော့ချပါ: ရှည်လျားတဲ့ ဆောင်းပါးတွေကို အမြဲတမ်း အနှစ်ချုပ်ခိုင်းတာ၊ ဆိုရှယ်မီဒီယာ ပို့စ်တွေ ရေးခိုင်းတာ မျိုးတွေအတွက် ရည်ရွယ်ချက်တစ်ခုစီတိုင်းအတွက် Gem တစ်ခုစီ သီးသန့်ထားရှိပါ။
                            <br /> ၃။ လက်တွေ့အသုံးချနိုင်သော ဥပမာများ <br />
                            စာသင်ခန်းအတွက်: ကျောင်းသားများအတွက် ဆွဲဆောင်မှုရှိတဲ့ သင်ခန်းစာ အစီအစဉ် (Lesson plan) တွေရေးဆွဲဖို့နဲ့ မေးခွန်းတွေ ထုတ်ပေးဖို့ "Teacher Gem" ဖန်တီးပါ။
                            စီးပွားရေးအတွက်: ကိုယ့်ကုမ္ပဏီရဲ့ Brand Guidelines နဲ့ ပစ်မှတ်ထားတဲ့ ဖောက်သည် အချက်အလက် (Knowledge files) တွေကို အခြေခံပြီး ကြော်ငြာစာသားတွေ ရေးပေးမယ့် "Marketing Expert Gem" ဖန်တီးပါ။
                            ကိုယ်ပိုင် အသုံးချရန်: အိမ်မှာရှိတဲ့ ပါဝင်ပစ္စည်းတွေကို ပြောပြလိုက်တာနဲ့ ဟင်းချက်နည်းတွေ အကြံပေးမယ့် "Recipe Expert Gem" ဖန်တီးထားနိုင်ပါတယ်။
                            ပိုပြီး ရှင်းလင်းသွားအောင် နယ်ပယ်အသီးသီးအတွက် လက်တွေ့ သုံးလို့ရမယ့် Gem ညွှန်ကြားချက် (Instructions) နမူနာ (၃) ခု ကို ပြပေးပါမယ်- <br />
                            ဥပမာ (၁) - ဆိုရှယ်မီဒီယာ Content ရေးပေးမယ့် Gem (Marketing)
                            Name: Facebook Content Writer
                            Instructions: မင်းက အတွေ့အကြုံ (၅) နှစ်ရှိတဲ့ ပရော်ဖက်ရှင်နယ် Digital Marketer တစ်ယောက် ဖြစ်တယ်။ ငါက ကုန်ပစ္စည်း ဒါမှမဟုတ် ဝန်ဆောင်မှုတစ်ခုအကြောင်း ပြောပြလိုက်တာနဲ့၊ အဲဒီအကြောင်းကို Facebook ပေါ်မှာ တင်ဖို့ ဆွဲဆောင်မှုရှိတဲ့ ကြော်ငြာစာသား (Content) တစ်ခု ရေးပေးရမယ်။ စာဖတ်သူတွေ စိတ်ဝင်စားအောင် အစအချီ ကောင်းကောင်းသုံးပါ။ သင့်တော်တဲ့ Emoji တွေ ထည့်ပေးပါ။ စာပိုဒ်တွေကို ဖတ်ရလွယ်အောင် ခွဲရေးပေးပြီး နောက်ဆုံးမှာ ဝယ်ယူချင်အောင် ဆွဲဆောင်တဲ့ စာသား (Call to Action) နဲ့ သက်ဆိုင်ရာ Hashtags တွေ မဖြစ်မနေ ထည့်ပေးပါ။
                            <br />ဥပမာ (၂) - အင်္ဂလိပ်စာ ပြင်ဆင်ပေးမယ့် Gem (Language & Education)
                            Name: English Grammar & Tone Editor
                            Instructions: မင်းက အင်္ဂလိပ်စာ ကျွမ်းကျင်တဲ့ Native Speaker တစ်ယောက် ဖြစ်တယ်။ ငါက အင်္ဂလိပ်စာသားတွေ ပေးပို့လိုက်တိုင်း၊ အဲဒီစာသားရဲ့ သဒ္ဒါ (Grammar) နဲ့ စာလုံးပေါင်း အမှားတွေကို ပြင်ပေးရမယ်။ ပြီးရင် အဲဒီစာသားကို (၁) ရုံးသုံး Professional ပုံစံ၊ (၂) သူငယ်ချင်းတွေနဲ့ ပြောတဲ့ Casual ပုံစံ ဆိုပြီး ပုံစံ (၂) မျိုးနဲ့ ပြန်လည် ရေးသားပေးပါ။ ဘာတွေ ပြင်လိုက်တယ် ဆိုတာကိုပါ အောက်ဆုံးမှာ မြန်မာလို အတိုချုပ် ရှင်းပြပေးပါ။
                            <br />ဥပမာ (၃) - Code တွေကို စစ်ဆေးပေးမယ့် Gem (Programming)
                            Name: Python Code Reviewer
                            Instructions: မင်းက Senior Python Developer တစ်ယောက် ဖြစ်တယ်။ ငါရေးထားတဲ့ Python Code တွေကို ပေးပို့လိုက်တိုင်း၊ အဲဒီ Code တွေမှာ Error ပါ/မပါ စစ်ဆေးပေးရမယ်။ ပိုပြီး မြန်ဆန်ကောင်းမွန်တဲ့ Code ဖြစ်အောင် ဘယ်လို ပြင်ရေးသင့်တယ်ဆိုတာကို အကြံပြုပေးပါ။ ပြင်ဆင်ထားတဲ့ Code အသစ်ကို Comment တွေနဲ့တကွ သေသေချာချာ ရေးပြပေးရမယ်။
                            br 💎 Gem အကြောင်းလေးတော့ပြီးပါပြီ  👏
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">𝐂𝐡𝐚𝐭𝐆𝐏𝐓 ၏ 𝐀𝐈𝐏𝐑𝐌 ကို အသုံးပြုနည်း</h2>
                        <p className="mb-6">
                            𝐂𝐡𝐚𝐭𝐆𝐏𝐓 ၏ 𝐀𝐈𝐏𝐑𝐌 <br /><br />
                            𝐀𝐈𝐏𝐑𝐌  (𝐀𝐫𝐭𝐢𝐟𝐢𝐜𝐢𝐚𝐥 𝐈𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐜𝐞 𝐏𝐫𝐨𝐦𝐩𝐭𝐬 𝐟𝐨𝐫 𝐑𝐚𝐧𝐤𝐢𝐧𝐠 & 𝐌𝐚𝐫𝐤𝐞𝐭𝐢𝐧𝐠) ဆိုတာ #𝐂𝐡𝐚𝐭𝐆𝐏𝐓 အသုံးပြုသူတွေအတွက် အလွန်အသုံးဝင်တဲ့ Browser Extension** တစ်ခုဖြစ်ပါတယ်။
                            ရိုးရိုးရှင်းရှင်း ပြောရရင်တော့ 𝐂𝐡𝐚𝐭𝐆𝐏𝐓 မှာ ကိုယ်လိုချင်တဲ့ အဖြေရဖို့အတွက် ခိုင်းစေညွှန်ကြားချက် (𝐏𝐫𝐨𝐦𝐩𝐭𝐬) တွေကို ကိုယ်တိုင် စဉ်းစားပြီး အရှည်ကြီး ရိုက်ထည့်နေစရာ မလိုဘဲ၊ သူများတွေ ရေးပြီးသား အဆင်သင့် 𝗣𝗿𝗼𝗺𝗽𝘁 𝗧𝗲𝗺𝗽𝗹𝗮𝘁𝗲 တွေကို ယူသုံးလို့ရအောင် ကူညီပေးတဲ့ Tool တစ်ခုပါ။
                            #𝐀𝐈𝐏𝐑𝐌 ရဲ့ အဓိက လုပ်ဆောင်ချက်တွေနဲ့ အားသာချက်တွေကို အောက်ပါအတိုင်း ခွဲခြားမှတ်သားနိုင်ပါတယ်- <br />
                            ၁။ 𝙋𝙧𝙤𝙢𝙥𝙩 𝙇𝙞𝙗𝙧𝙖𝙧𝙮 (အဆင်သင့် Prompt များ) <br />
                            AIPRM ကို Install လုပ်လိုက်တာနဲ့ ChatGPT ရဲ့ မျက်နှာပြင်မှာ Prompt ပေါင်းထောင်ချီပါဝင်တဲ့ Dashboard တစ်ခု ပေါ်လာပါလိမ့်မယ်။ အဲဒီအထဲမှာ အောက်ပါကဏ္ဍတွေအတွက် အဆင်သင့် Prompt တွေ ပါဝင်ပါတယ်- <br />
                            📌SEO (Search Engine Optimization): Google မှာ ရှာဖွေမှု ထိပ်ဆုံးရောက်အောင် ဆောင်းပါးရေးနည်း။
                            📌Marketing:** ကြော်ငြာစာသားများ၊ Social Media Post များ ရေးသားခြင်း။
                            📌Copywriting: ဆွဲဆောင်မှုရှိတဲ့ စာသားများ ရေးသားခြင်း။
                            📌Coding: ပရိုဂရမ် ကုဒ်များ ရေးသားခြင်း။
                            📌Midjourney: ပုံထုတ်ပေးတဲ့ AI တွေအတွက် စာသား (Prompt) ဖန်တီးပေးခြင်း။ <br /><br />
                            ၂။  𝙏𝙞𝙢𝙚 (အချိန်ကုန် သက်သာခြင်း) <br />
                            ပုံမှန်ဆိုရင် ChatGPT ကို "ငါ့ကို SEO ကောင်းတဲ့ ဆောင်းပါးတစ်ပုဒ် ရေးပေးပါ၊ ခေါင်းစဉ်က ဒါပါ၊ စာလုံးရေ ဘယ်လောက်ပါ" ဆိုပြီး အရှည်ကြီး ရိုက်ထည့်ရပါတယ်။ AIPRM သုံးရင်တော့ **"Human Written | 100% Unique | SEO Optimized Article"** ဆိုတဲ့ ကဒ်ကို နှိပ်လိုက်ပြီး ကိုယ်ရေးချင်တဲ့ ခေါင်းစဉ် (ဥပမာ - "Coffee") တစ်လုံးတည်း ရိုက်ထည့်လိုက်တာနဲ့ အကောင်းဆုံး ဆောင်းပါးတစ်ပုဒ်ကို ရေးပေးပါလိမ့်မယ်။
                            <br />၃။ 𝙏𝙤𝙣𝙚 & 𝙎𝙩𝙮𝙡𝙚 ပြောင်းလဲနိုင်ခြင်း <br />
                            𝐂𝐡𝐚𝐭𝐆𝐏𝐓 က ထွက်လာမယ့် အဖြေရဲ့ လေသံ (Tone) နဲ့ ရေးသားပုံ (Style) ကို လွယ်လွယ်ကူကူ ပြောင်းလဲနိုင်ပါတယ်။
                            📌Tone - Emotional (စိတ်ခံစားမှုပါသော)၊ Professional (ကျွမ်းကျင်ပညာရှင်ဆန်သော)၊ Friendly (ရင်းနှီးသော) စသဖြင့် ရွေးချယ်နိုင်ပါတယ်။
                            📌 Style - Academic (ပညာရပ်ဆိုင်ရာ)၊ Creative (ဖန်တီးမှုဆန်သော) စသဖြင့် သတ်မှတ်နိုင်ပါတယ်။
                            ----- <br />
                            ဘယ်သူတွေ သုံးသင့်လဲ။ ? <br />
                            📌Content Writer များ
                            📌 Digital Marketer များ
                            📌 SEO သမားများ
                            📌 ChatGPT ကို ထိထိရောက်ရောက် သုံးချင်ပေမယ့် Prompt ဘယ်လိုရေးရမှန်း မသိသူများ
                            ~~~~~~~~~~ <br />
                            AI GURU
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Role Based Model AI Interaction နည်းဖြင့် AI ကို ခိုင်းစေနည်း</h2>
                        <p className="mb-6">
                            𝐑𝐨𝐥𝐞-𝐛𝐚𝐬𝐞𝐝 𝐏𝐫𝐨𝐦𝐩𝐭 (𝐀𝐈 အား သရုပ်ပြ/တာဝန်တစ်ခု သတ်မှတ်ကာ ခိုင်းစေတဲ့ 𝐏𝐫𝐨𝐦𝐩𝐭) <br /> <br />
                            𝐏𝐫𝐨𝐦𝐩𝐭 –  I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is "I need help creating an advertising campaign for a new type of energy drink targeting young adults aged 18-30.”
                            <br /> အထက်ပါ 𝐏𝐫𝐨𝐦𝐩𝐭 သည်  နံပါတ် 𝟕.  𝐑𝐨𝐥𝐞-𝐛𝐚𝐬𝐞𝐝 𝐏𝐫𝐨𝐦𝐩𝐭 (𝐀𝐈 အား သရုပ်ပြ/တာဝန်တစ်ခု သတ်မှတ်ကာ ခိုင်းစေတဲ့ 𝐏𝐫𝐨𝐦𝐩𝐭) အမျိုးအစားဖြစ်ပြီး၊ ထို 𝐏𝐫𝐨𝐦𝐩𝐭 အား 𝐂𝐡𝐚𝐭𝐆𝐏𝐓 / 𝐆𝐞𝐦𝐢𝐧𝐢 / 𝐃𝐞𝐞𝐩𝐒𝐞𝐞𝐤 .. 𝐀𝐈 𝐖𝐞𝐛𝐬𝐢𝐭𝐞 တခုတွင် ရိုက်ထည့်ပြီး စေခိုင်းကြည့်ပါမည်။  (ရရှိလာသော ရလဒ်အဖြေအား ကွန်မန့်တွင် ဖော်ပြထားပါသည်။ )
                            ယခုပို့စ်သည် နမူနာ 𝐏𝐫𝐨𝐦𝐩𝐭  ဖြစ်ပြီး ၎င်းနေရာတွင်  𝐑𝐨𝐥𝐞 များ အစားထိုးပြီး အဖြေရှာကြည့်ပါ။  <br />ဉပမာ -  I want you to act as a motivational coach. လှုံ့ဆော်မှု နည်းပြဆရာအဖြစ်( ဆရာလင်းသိုက်ညွန့် တို့ကဲ့သို့) လုပ်ဆောင်ပါ...။
                            <br /> 𝐀𝐈 အား မေးခွန်းတွေမေးသောအခါ ဖြစ်စေ၊ လိုချင်တာတခု ထုတ်ခိုင်းသည့်အခါဖြစ်စေ တိကျမှန်ကန်ပြည့်စုံသည့် ရလဒ်ထွက်လာဖို့အတွက် 𝐏𝐫𝐨𝐦𝐩𝐭  ရေးတတ်ဖို့ (ခိုင်းစေတတ်ဖို့) သည် အရေးကြီးပါသည်။
                            ကျွန်တော်ရေးသားပြုစုလျက်ရှိသော  𝐏𝐫𝐨𝐦𝐩𝐭 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫𝐢𝐧𝐠  စာအုပ်မှ ကောက်နှုတ်ချက် တခုဖြစ်ပါသည်။ စာအုပ်လည်း မကြာမီထွက်ရှိမည်ဖြစ်ပါသည်။ <br />
                            ❝ 𝐏𝐫𝐨𝐦𝐩𝐭 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫𝐢𝐧𝐠  ဆိုတာနဲ့ ပုံထုတ်ရန်၊ ဗီဒီယိုဖန်တီးရန်သက်သက်ဟု မယူဆဘဲ မိမိတို့ လူမှုစီးပွားဘဝ၊ ပညာရေးသုတေသန၊ ကျန်းမာရေးဂရုစိုက်မှုနှင့် နေ့စဉ်ကြုံတွေ့ရသော ပုစ္ဆာ/ပြဿနာများကို အမှန်ကန်/ အတိကျဆုံး အဖြေရရှိနိုင်ရန် တွေး‌တောကြံဆပြီး ဖန်တီးနိုင်ရန် ရည်ရွယ်ပါသည်။ ❞
                            AI GURU
                        </p>

                    </div>
                );

            case "ai-vibe":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Vibe Code ဖြင့် Website / WebApp ရေးနည်း</h2>
                        <p className="mb-6">
                            ❝ သင်က ပရိုဂရမ်မရေးတတ်ဘူး၊ ဒါပေမဲ့ 𝐀𝐩𝐩 တစ်ခု အမြန်လုပ်ချင်တယ် ဆိုရင် 𝐋𝐨𝐯𝐚𝐛𝐥𝐞 သို့မဟုတ် 𝐂𝐮𝐫𝐬𝐨𝐫ကို စမ်းသုံးကြည့်ပါ။ ဒါဟာ "𝐕𝐢𝐛𝐞 𝐂𝐨𝐝𝐢𝐧𝐠" ရဲ့ စစ်မှန်တဲ့အတွေ့အကြုံပါပဲ။  ❞ <br /><br />
                            🧐 𝐕𝐢𝐛𝐞 𝐂𝐨𝐝𝐢𝐧𝐠 ဆိုတာ ဘာလဲ။ <br />
                            Vibe Coding ဆိုသည်မှာ ကွန်ပျူတာ ပရိုဂရမ်ဘာသာစကားများ (ဥပမာ - Python, JavaScript) ကိုယ်တိုင် ထိုင်ရေးနေမည့်အစား လူသုံးစကား (Natural Language) ဖြင့် မိမိဖြစ်ချင်သော ပုံစံကို AI ကို ပြောပြပြီး App သို့မဟုတ် Website တစ်ခုလုံးကို အမြန်ဆုံး ဖန်တီးယူသည့် နည်းလမ်းကို ဆိုလိုသည်။
                            ❝ Vibe coding is an AI-driven, natural language approach to software development, allowing users to create apps by prompting Large Language Models (LLMs) rather than writing code manually. It focuses on rapid, high-level prototyping and "vibes" over strict syntax, enabling quick, iterative development. ❞
                            <br />✨ အဓိက အယူအဆ: "ကုဒ်တွေ ဘယ်လိုရေးထားလဲ အရေးမကြီးဘူး၊ အလုပ်လုပ်ရင် ပြီးရော" (If it works, who cares how it's written?) ဆိုသည့် စိတ်ဓာတ် ဖြစ်သည်။
                            <br />👥 ဘယ်သူတွေသုံးလဲ: * Non-tech founders: ပရိုဂရမ်မရေးတတ်သော်လည်း App စိတ်ကူးရှိသူများ။
                            <br />   Rapid prototyping: အိုင်ဒီယာတစ်ခုကို အမြန်ဆုံး စမ်းသပ်လိုသူများ။
                            <br />Efficiency Seekers: ကုဒ်ထိုင်ရေးရမှာ ပျင်းသည့် ပရိုဂရမ်မာများ။<br />
                            <br />🛠️ 𝐕𝐢𝐛𝐞 𝐂𝐨𝐝𝐢𝐧𝐠 𝐓𝐨𝐨𝐥𝐬 များအကြောင်း
                            <br /><br /> ယခုသင်ခန်းစာတွင် Lovable နှင့် Cursor Vibe Coder ၂ ခုကို မူတည်၍ ရှင်းပြပေးသွားပါမည်။
                            <br /> 1️⃣ 𝐋𝐨𝐯𝐚𝐛𝐥𝐞 လိုမျိုး 𝐀𝐈 𝐓𝐨𝐨𝐥𝐬 များ (𝐀𝐩𝐩 𝐁𝐮𝐢𝐥ders)
                            https://lovable.dev/
                            <br />  Lovable သည် AI ကို အသုံးပြု၍ လူသုံးစကား ညွှန်ကြားချက်များ (prompts) ပေးရုံဖြင့် Full-stack Web Application များကို အစမှအဆုံးအထိ အလိုအလျောက် တည်ဆောက်ပေးပြီး တိုက်ရိုက် Host လုပ်ပေးနိုင်သော Tool ဖြစ်သည်။
                            <br />🎨 Natural Language to Web App: "Inventory App လုပ်ပေးပါ၊ Dashboard ပါရမယ်၊ အပြာရောင်သုံးပေးပါ" ဟု ပြောရုံဖြင့် Frontend ရော Backend ပါ တစ်ခါတည်း ဆောက်ပေးသည်။
                            <br /> 💾 Supabase Integration: Database နှင့် Authentication (Login) စနစ်များကို အလိုအလျောက် ချိတ်ဆက်ပေးသဖြင့် မိနစ်ပိုင်းအတွင်း App အစစ်တစ်ခု ရနိုင်သည်။
                            <br />⚡ Live Preview & Instant Edit: AI ကို ခိုင်းရုံဖြင့် စာသားမှအစ UI အထိ ချက်ချင်းပြင်ပေးပြီး ဘေးတွင် Preview ပြပေးသည်။
                            <br />🌐 Deployment: ခလုတ်တစ်ချက်နှိပ်ရုံဖြင့် သင့် App ကို Internet ပေါ် တင်ပေး (Publish) နိုင်သည်။
                            <br />ဘယ်လိုအချိန်မှာ သုံးမလဲ: SaaS Startup စမ်းသပ်ချင်သူများ၊ လုပ်ငန်းခွင်သုံး Internal Tools (CRM, Task Tracker) လိုချင်သူများနှင့် Coding မတတ်ဘဲ Professional App ဖန်တီးချင်သူများအတွက် ဖြစ်သည်။
                            <br /><br />2️⃣ 𝐂𝐮𝐫𝐬𝐨𝐫 လိုမျိုး 𝐀𝐈 𝐓𝐨𝐨𝐥𝐬 များ (𝐀𝐈 𝐈𝐃𝐄𝐬 & 𝐂𝐨𝐩𝐢𝐥𝐨𝐭𝐬)
                            https://cursor.com/agents
                            <br /><br /> Cursor သည် VS Code ကို အခြေခံ၍ AI ကို ပထမဦးစားပေးအနေဖြင့် ထည့်သွင်းထားသော ကုဒ်တည်းဖြတ်သည့် ပရိုဂရမ် (IDE) ဖြစ်သည်။
                            <br /> ⌨️ Composer Mode (Ctrl + I): ဖြစ်ချင်သည့် Features ပြောလိုက်ရုံဖြင့် ဖိုင်အသစ်ဆောက်ခြင်းနှင့် ကုဒ်ပြင်ခြင်းများကို တစ်ပြိုင်နက် လုပ်ပေးသည်။
                            <br />🧠 Context Awareness: Project တစ်ခုလုံးကို AI က နားလည်ထားသဖြင့် မည်သည့်ဖိုင်တွင် ဘာပြင်ရမည်ကို အလိုလိုသိသည်။
                            <br />💬 Natural Language Instructions: "UI ကို Modern ဖြစ်အောင်လုပ်ပါ" သို့မဟုတ် "Dark Mode ထည့်ပါ" စသည့် စိတ်ကူးများကို အမိန့်ပေးရုံသာ လိုသည်။
                            <br />🔥 အခြားရေပန်းစားသော AI App Builders များ
                            ယင်းတို့နှင့် သဘောသဘာဝဆင်တူသော၊ "Vibe Coding" ပုံစံဖြင့် App များ၊ Website များကို အမြန်ဆုံး ဖန်တီးပေးနိုင်သော AI App Builders များစွာ ရှိပါသည်။ အဓိက Tools အချို့ကို အောက်တွင် ဖော်ပြပေးလိုက်ပါသည်။
                            <br />၁။ Bolt.new (by StackBlitz) <br />
                            ယခုနောက်ပိုင်း အလွန်ရေပန်းစားလာသော Browser-based AI App Builder ဖြစ်သည်။
                            <br />အဓိကလုပ်ဆောင်ချက်: Browser ထဲမှာတင် prompt ပေးပြီး Full-stack Web Application များကို မိနစ်ပိုင်းအတွင်း တည်ဆောက်နိုင်၊ စမ်းသပ်နိုင်ပြီး တိုက်ရိုက် Deploy လုပ်နိုင် (Live လွှင့်နိုင်) သည်။
                            <br />အားသာချက်: အလွန်မြန်ဆန်ပြီး၊ Backend (Node.js) နှင့် Database ပါဝင်သော Project များကိုပါ ကိုင်တွယ်နိုင်သည်။ Node.js ecosystem ကို အပြည့်အဝ အသုံးချနိုင်သည်။
                            <br /> ၂။ Replit Agent <br />
                            <br /> Replit ၏ Cloud IDE ထဲတွင် ထည့်သွင်းထားသော အစွမ်းထက် AI Agent ဖြစ်သည်။
                            <br /> အဓိကလုပ်ဆောင်ချက်: "ငါ့ကို Shopping App တစ်ခု လုပ်ပေး"၊ "ငါ့ကို Blog Website တစ်ခု လုပ်ပေး" စသဖြင့် prompt ပေးရုံဖြင့် Agent က လိုအပ်သော file များဆောက်ခြင်း၊ ကုဒ်ရေးခြင်း၊ error ပြင်ခြင်းနှင့် app run ခြင်းတို့ကို အလိုအလျောက် လုပ်ဆောင်ပေးသည်။
                            <br /> အားသာချက်: Replit ၏ cloud environment ကြောင့် hosting အတွက် ပူစရာမလိုဘဲ App ကို ချက်ချင်း အသုံးပြုနိုင်သည်။ တကယ့် ပရိုဂရမ်မာတစ်ယောက်လို error များကို self-correct လုပ်နိုင်သည်။
                            <br /><br />၃။ v0.dev (by Vercel)
                            <br />Vercel မှ ထုတ်လုပ်ထားသော၊ UI (User Interface) ကို အဓိကထားသော AI Tool ဖြစ်သည်။
                            <br />အဓိကလုပ်ဆောင်ချက်: prompt ပေး၍ သော်လည်းကောင်း၊ မိမိဆွဲထားသော UI ပုံကြမ်း (screenshot/wireframe) ကို ပြ၍ သော်လည်းကောင်း လှပသော Website မျက်နှာပြင်များကို ဖန်တီးနိုင်သည်။ ၎င်းသည် Production-ready ကုဒ်များ (React, Tailwind CSS) ကို ထုတ်ပေးသည်။
                            <br />အားသာချက်: Front-end တည်ဆောက်ရာတွင် အလွန်ကောင်းမွန်ပြီး၊ ထွက်လာသောကုဒ်များသည် အရည်အသွေးမြင့်မားသည်။
                            <br /><br />    ၄။ softgen.ai
                            <br />Backend နှင့် Database ပါဝင်သော Web App များကို အမြန်ဆုံး တည်ဆောက်ပေးနိုင်သော AI Platform ဖြစ်သည်။
                            <br /> အဓိကလုပ်ဆောင်ချက်: prompt ပေးရုံဖြင့် user authentication (login/signup)၊ crud operations (create, read, update, delete) ပါဝင်သော Full-stack Web Application များကို ဖန်တီးပေးသည်။
                            <br />အားသာချက်: Business logic ပါဝင်သော Web App များကို prototype လုပ်ရန် သို့မဟုတ် MVP (Minimum Viable Product) တည်ဆောက်ရန်အတွက် အလွန် သင့်တော်သည်။
                            <br /><br /> ၅။ Softr (with AI Builder)
                            <br />Spreadsheet (Google Sheets သို့မဟုတ် Airtable) ကို Backend အနေဖြင့်သုံး၍ No-code App များ ဖန်တီးရာတွင်သုံးသော Tool ဖြစ်ပြီး၊ ယခုအခါ AI ပါဝင်လာပြီဖြစ်သည်။
                            <br />အဓိကလုပ်ဆောင်ချက်: AI builder သို့ "I want to build a client portal for my consulting business" ဟု ပြောရုံဖြင့် Softr က လိုအပ်သော UI၊ Database structural နှင့် logic များကို AI ဖြင့် အလိုအလျောက် ဖန်တီးပေးသည်။
                            <br />အားသာချက်: coding လုံးဝမသိဘဲ၊ Spreadsheet သုံးတတ်ရုံဖြင့် Internal Tools များ၊ Client Portals များ၊ Directories များကို အမြန်ဆုံး တည်ဆောက်နိုင်သည်။
                            <br /><br /> ၆။ GitHub Copilot,အသုံးအများဆုံး AI Coding Assistant ဖြစ်သည်။ VS Code၊ JetBrains စသည့် IDE များတွင် Plugin အနေဖြင့်သုံးရသည်။ ကုဒ်များကို အလိုအလျောက် ဖြည့်စွက်ပေး (Autocomplete)သည်။
                            <br />၇။ Windsurf,VS Code နှင့်တူသော အခြား AI-native IDE တစ်ခု ဖြစ်သည်။ AI နှင့် အတူတူ ကုဒ်ရေးရသလို ခံစားရစေပြီး multi-file တည်းဖြတ်မှု ကောင်းမွန် ပါသည်။
                            <br />၈။ Qodo (formerly CodiumAI),ကုဒ်များရေးရုံတင်မကဘဲ ၎င်းတို့ မှန်ကန်စွာ အလုပ်လုပ်မလုပ် စမ်းသပ်သည့် ကုဒ်များ (Unit Tests) ကိုပါ AI ဖြင့် အလိုအလျောက် ရေးသားပေး။ Error ရှာရာတွင် အားကောင်းသည်။
                            <br />၉။ Claude Code (CLI),Terminal (Command Line) ထဲတွင်သုံးရသော အစွမ်းထက် AI Tool ဖြစ်သည်။ prompt ပေးရုံဖြင့် file များစွာကို ဝင်ရောက်ပြင်ဆင်ခြင်း၊ project create လုပ်ခြင်းများ လုပ်နိုင်ပါသည်။
                            <br /> ၁၀။ Gemini Code Assist,Google Cloud ၏ IDE တိုးချဲ့ပရိုဂရမ် ဖြစ်သည်။ Google ecosystem နှင့် Cloud services များသုံးရာတွင် ပိုမိုအဆင်ပြေ။
                            Bolt.new,"Browser ထဲမှာတင် prompt ပေးပြီး Full-stack Web App (React, Node.js စသည်) ကို ဖန်တီး၊ စမ်းသပ်၊ တိုက်ရိုက် Deploy လုပ်နိုင်။ အလွန်မြန်ဆန်မှုရှိသည်။"
                            <br /><br />💡 အကျဉ်းချုပ် အကြံပြုချက်
                            <br />📌 သင်က ပရိုဂရမ်မရေးတတ်ဘဲ App တစ်ခု အမြန်လုပ်ချင်ရင် Bolt.new သို့မဟုတ် Replit Agent ကို စမ်းသုံးပါ။
                            <br />📌 UI/Website မျက်နှာပြင်လှလှလေးတွေပဲ ဖန်တီးချင်ရင် v0.dev က အကောင်းဆုံးပါ။
                            <br />📌 သင်က ပရိုဂရမ်မာဖြစ်ပြီး Cursor ထက် ပိုကောင်းတာ ရှာနေရင် Windsurf သို့မဟုတ် GitHub Copilot ကို သုံးပါ။
                            <br />Thanks for Learning
                            <br />🎓 AI GURU
                        </p>

                        {/* 🌟 ပုံအသစ် ထည့်နည်း 🌟 */}
                        <img
                            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop"
                            alt="vibe Code"
                            className="w-full rounded-2xl shadow-md mb-8 border border-slate-200"
                        />

                    </div>
                );
            case "ai-agent":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">ကိုယ်ပိုင် AI Agent ဖန်တီးနည်း</h2>


                        {/* 🌟 ပုံအသစ် ထည့်နည်း 🌟 */}
                        <img
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop"
                            alt="ai Agent"
                            className="w-full rounded-2xl shadow-md mb-8 border border-slate-200"
                        />
                        <p className="mb-6">
                            AI Agent ဆိုတာကတော့ သင့်အတွက် အလုပ်လုပ်ပေးနိုင်တဲ့ AI ကိုယ်စားလှယ်တစ်ယောက်ပါ။ ဥပမာ - သင်က စီးပွားရေးလုပ်ငန်းရှင်တစ်ယောက်ဖြစ်ပြီး၊ သင့်အတွက် ဖောက်သည်များကို ဖြေကြားပေးမယ့် AI Agent တစ်ယောက် လိုချင်တယ်ဆိုရင်၊ သင့်လိုအပ်ချက်အရ AI Agent ကို ဖန်တီးနိုင်ပါတယ်။ AI Agent ကို သင့်ရဲ့ အလုပ်လုပ်ပုံ၊ သတ်မှတ်ထားတဲ့ လုပ်ဆောင်ချက်များနှင့် ပတ်သက်ပြီး အချက်အလက်များကို ပေးပြီး၊ ထိုအချက်အလက်များကို အခြေခံကာ AI Agent ကို သင့်လိုချင်တဲ့ အတိုင်း ဖန်တီးနိုင်ပါတယ်။
                            <br /> # ကိုယ်ပိုင် AI Agent ဖန်တီးနည်း (သင်ခန်းစာဆောင်းပါး)

                            <br />နောက်ဆုံးနှစ်များတွင် Artificial Intelligence (AI) နည်းပညာသည် အလွန်မြန်ဆန်စွာ တိုးတက်လာခဲ့သည်။ AI ကို အသုံးပြု၍ လူသားများ၏ အလုပ်များကို အလိုအလျောက် ကူညီလုပ်ဆောင်ပေးနိုင်သည့် **AI Agent** များကို အများအပြား ဖန်တီးအသုံးပြုလာကြသည်။ ယနေ့ခေတ်တွင် စီးပွားရေးလုပ်ငန်းများ၊ နည်းပညာကုမ္ပဏီများနှင့် ကိုယ်ပိုင် developer များသည် AI Agent များကို အသုံးပြု၍ အလုပ်လုပ်ငန်းများကို လျင်မြန်စွာ ပြီးစီးစေကြသည်။

                            <br /><br />## AI Agent ဆိုသည်မှာဘာလဲ

                            <br />AI Agent ဆိုသည်မှာ Artificial Intelligence ကို အသုံးပြု၍ သတ်မှတ်ထားသော အလုပ်များကို **အလိုအလျောက် စဉ်းစား၍ ဆုံးဖြတ်ကာ လုပ်ဆငငငငငငငငငငငငငငငငငငငငငငငငငငငငငငငငငငငဈ

                            <br />ဥပမာအားဖြင့်

                            <li>* Customer မေးခွန်းများကို ဖြေကြားပေးသည့် Chatbot
                                * Email များကို စစ်ဆေး၍ အရေးကြီးသောစာများကို ရွေးပေးသည့် AI
                                * Website များမှ အချက်အလက်များကို စုဆောင်းပေးသည့် Automation System
                                တို့ကို AI Agent များအဖြစ် တွေ့နိုင်သည်။</li>

                            <br /> ## AI Agent တည်ဆောက်ရန် လိုအပ်သည့် အခြေခံများ <br />

                            ကိုယ်ပိုင် AI Agent တစ်ခု ဖန်တီးရန် အောက်ပါအချက်များကို သိရှိထားရန် လိုအပ်သည်။ <br />

                            <ol><li>Programming Language</li><li>AI Model</li><li>Agent Framework</li></ol> ပထမအချက်မှာ **Programming Language** ဖြစ်သည်။ အများဆုံးအသုံးပြုသော ဘာသာစကားမှာ Python ဖြစ်ပြီး AI နှင့် Machine Learning project များအတွက် အလွန်လຽယີກສູ່ အသຯຶກນຳໃຊ້ໄດ້။

                            <br />ဒုတိယအချက်မှာ **AI Model** ဖြစ်သည်။ ယနေ့ခေတ်တွင် AI Model များစွာ ရှိပြီး developer များသည် မိမိလိုအပ်ချက်အရ အသုံးပြုနိုင်သည်။ ဥပမာအားဖြင့် OpenAI မှ GPT model များ၊ Google မှ Gemini model များ၊ နှင့် Meta မှ LLaMA model များကို အသုံးပြုနိုင်သည်။

                            <br /> တတိယအချက်မှာ **Agent Framework** ဖြစ်သည်။ Framework များကို အသုံးပြုခြင်းအားဖြင့် AI Agent များကို ပိုမိုလွယ်ကူစွာ တည်ဆောက်နိုင်သည်။ အသုံးများသော Framework များတွင် LangChain ၊ AutoGPT နှင့် CrewAI တို့ ပါဝင်သည်။

                            <br /><br />## အရိုးရှင်းဆုံး AI Agent ဖန်တီးနည်း

                            <br />AI Agent တစ်ခုကို အရိုးရှင်းဆုံးပုံစံဖြင့် ဖန်တီးလိုပါက Python ကို အသုံးပြု၍ အောက်ပါအဆင့်များအတိုင်း လုပ်ဆောင်နိုင်သည်။

                            <br />ပထမအဆင့်အနေဖြင့် Computer တွင် Python ကို install ပြုလုပ်ရမည်။ ထို့နောက် AI Agent တည်ဆောက်ရန် လိုအပ်သော library များကို install ပြုလုပ်ရမည်။

                            ```
                            pip install openai langchain
                            ```

                            ထို့နောက် Python code အနည်းငယ် ရေးသား၍ AI Agent ကို စတင်အသုံးပြုနိုင်သည်။

                            ```
                            from langchain.agents import initialize_agent
                            from langchain.llms import OpenAI

                            llm = OpenAI(api_key="YOUR_API_KEY")

                            agent = initialize_agent([], llm, agent="zero-shot-react-description")

                            agent.run("What is the capital of Japan?")
                            ```

                            ဤ code သည် မေးခွန်းတစ်ခုကို AI Model ထံ ပို့ပြီး အဖြေကို ပြန်ထုတ်ပေးနိုင်သော ရိုးရှင်းသည့် AI Agent တစ်ခုဖြစ်သည်။

                            ## AI Agent များ၏ အသုံးဝင်မှု

                            AI Agent များကို အမျိုးမျိုးသော နယ်ပယ်များတွင် အသုံးပြုနိုင်သည်။ ဥပမာအားဖြင့်

                            <ol><li>Customer service chatbot များ</li><li>Data analysis automation</li><li>Email management system</li><li>Website data collection tools</li><li>Translation assistant</li></ol>
                            <br />စီးပွားရေးလုပ်ငန်းများအတွက် AI Agent များသည် အချိန်နှင့် လုပ်အားကို လျှော့ချပေးပြီး ထိရောက်မှုကို တိုးတက်စေသည်။

                            <br />## Coding မသိသူများအတွက် AI Agent

                            <br />Coding မသိသူများအတွက်လည်း AI Agent များကို ဖန်တီးနိုင်သည့် platform များ ရှိလာပြီဖြစ်သည်။ ဥပမာအားဖြင့် Flowise ၊ Botpress နှင့် Zapier ကဲ့သို့သော platform များကို အသုံးပြု၍ drag-and-drop interface ဖြင့် AI Agent များကို လွယ်ကူစွာ တည်ဆောက်နိုင်သည်။

                            <br /><br />## နိဂုံး

                            <br />AI Agent နည်းပညာသည် အနာဂတ် နည်းပညာလောကတွင် အလွန်အရေးပါလာမည့် နည်းပညာတစ်ခုဖြစ်သည်။ Programming အခြေခံရှိသူများသည် Python နှင့် AI Model များကို အသုံးပြု၍ ကိုယ်ပိုင် AI Agent များကို ဖန်တီးနိုင်သလို coding မသိသူများအတွက်လည်း platform များစွာ ရှိနေပြီဖြစ်သည်။ ထို့ကြောင့် AI Agent နည်းပညာကို လေ့လာအသုံးချခြင်းသည် အနာဂတ်အလုပ်အကိုင်နှင့် နည်းပညာဖွံ့ဖြိုးတိုးတက်မှုအတွက် အရေးကြီးသော အခန်းကဏ္ဍတစ်ခု ဖြစ်လာမည်ဖြစ်သည်။

                        </p>

                    </div>
                );
            case "ai-gen-social":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Generative AI for Social Media</h2>


                        {/* 🌟 ပုံအသစ် ထည့်နည်း 🌟 */}
                        <img
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop"
                            alt="ai-gen-social"
                            className="w-full rounded-2xl shadow-md mb-8 border border-slate-200"
                        />
                        <p className="mb-6">
                            Generative AI သည် Social Media အတွက် အကြောင်းအရာများကို အလိုအလျောက် ဖန်တီးပေးနိုင်သော နည်းပညာတစ်ခုဖြစ်သည်။
                            /  # Generative AI for Social Media (သင်ခန်းစာ ဆောင်းပါး) <br />

                            ဒီဂျစ်တယ်ခေတ်တွင် Social Media သည် လူမှုဆက်သွယ်ရေး၊ စီးပွားရေးကြော်ငြာနှင့် အချက်အလက်မျှဝေခြင်းများအတွက် အလွန်အရေးပါသော platform တစ်ခုဖြစ်လာသည်။ ထိုသို့သော Social Media platform များတွင် Content များကို မြန်ဆန်စွာ ဖန်တီးနိုင်ရန် **Generative AI** နည်းပညာကို အများအပြား အသုံးပြုလာကြသည်။ Generative AI သည် စာသား၊ ပုံရိပ်၊ အသံနှင့် video များကို အလိုအလျောက် ဖန်တီးပေးနိုင်သော Artificial Intelligence နည်းပညာတစ်ခုဖြစ်သည်။

                            <br /><br />## Generative AI ဆိုသည်မှာဘာလဲ

                            <br />Generative AI ဆိုသည်မှာ အချက်အလက်များကို လေ့လာသင်ယူပြီး အသစ်သော content များကို ဖန်တီးပေးနိုင်သည့် Artificial Intelligence နည်းပညာကို ဆိုလိုသည်။ ယနေ့ခေတ်တွင် Social Media content creator များ၊ marketing professional များနှင့် စီးပွားရေးလုပ်ငန်းများသည် Generative AI ကို အသုံးပြု၍ post စာသားများ၊ design များ၊ video များနှင့် marketing idea များကို ဖန်တီးကြသည်။

                            <br />ဥပမာအားဖြင့် OpenAI မှ ဖန်တီးထားသော ChatGPT သည် social media caption များ၊ content idea များကို ဖန်တီးပေးနိုင်သည်။ ထို့အပြင် OpenAI ၏ DALL·E သည် text description မှ image များကို ဖန်တီးနိုင်ပြီး design content များအတွက် အသုံးဝင်သည်။

                            <br /><br /> ## Social Media တွင် Generative AI အသုံးပြုခြင်း

                            <br /> Social Media platform များတွင် Generative AI ကို အမျိုးမျိုး အသုံးပြုနိုင်သည်။ အဓိကအသုံးပြုမှုများမှာ အောက်ပါအတိုင်း ဖြစ်သည်။

                            <ol> <li>ပထမအချက်မှာ **Content Creation** ဖြစ်သည်။ Generative AI ကို အသုံးပြု၍ Facebook၊ Instagram၊ TikTok သို့မဟုတ် Twitter တို့အတွက် caption များ၊ post idea များနှင့် blog content များကို မြန်ဆန်စွာ ဖန်တီးနိုင်သည်။</li>

                                <li> ဒုတိယအချက်မှာ **Image နှင့် Graphic Design ဖန်တီးခြင်း** ဖြစ်သည်။ Generative AI image tools များကို အသုံးပြု၍ Social Media post များအတွက် poster၊ illustration နှင့် banner များကို အချိန်တိုအတွင်း ဖန်တီးနိုင်သည်။</li>

                                <li>တတိယအချက်မှာ **Video Content ဖန်တီးခြင်း** ဖြစ်သည်။ AI video tools များသည် script ရေးသားခြင်း၊ subtitle ထည့်ခြင်းနှင့် short video များ ဖန်တီးပေးနိóင်သည်။ ထိုသိóသည์ tools မျáထဲတွင် Runway ML နှင့် Pictory တို့ကို အသုံးများသည်။</li>

                            </ol> ## Social Media Marketing တွင် Generative AI အကျိုးကျေးဇူးများ

                            <br />Generative AI ကို Social Media Marketing တွင် အသုံးပြနည်း <br />
                            <br />ပထမဆုံး အကျိုးကျေးဇူးမှာ **အချိန်ချွေတာနိုင်ခြင်း** ဖြစ်သည်။ Content creator များသည် idea စဉ်းစားရန် အချိန်များစွာ မကုန်ဘဲ AI က အလိုအလျောက် idea များကို ဖန်တီးပေးနိုင်သည်။

                            <br />ဒုတိယအချက်မှာ **Content အရေအတွက် တိုးမြှင့်နိုင်ခြင်း** ဖြစ်သည်။ AI ကို အသုံးပြုခြင်းအားဖြင့် တစ်နေ့အတွင်း post များစွာ ဖန်တီးနိုင်ပြီး audience နှင့် ပိုမိုဆက်သွယ်နိုင်သည်။

                            <br /> တတိယအချက်မှာ **Creative idea များ ရရှိနိုင်ခြင်း** ဖြစ်သည်။ AI သည် data များကို လေ့လာသုံးသပ်၍ လူသားများ မစဉ်းစားမိနိုင်သော idea အသစ်များကို ဖန်တီးပေးနိုင်သည်။

                            <br /><br />## Generative AI အသုံးပြုရာတွင် သတိပြုရမည့်အချက်များ

                            <br /> Generative AI သည် အလွန်အသုံးဝင်သော်လည်း အချို့သော အချက်များကို သတိပြုရန် လိုအပ်သည်။

                            <br />ပထမအချက်မှာ **အချက်အလက်မှန်ကန်မှု** ဖြစ်သည်။ AI က ဖန်တီးသော content များကို လူတစ်ဦးက ပြန်လည် စစ်ဆေးရန် လိုအပ်သည်။

                            <br />ဒုတိယအချက်မှာ **မူပိုင်ခွင့်နှင့် ethics** ဖြစ်သည်။ AI ဖြင့် ဖန်တီးထားသော ပုံများနှင့် content များကို အသုံးပြုရာတွင် copyright နှင့် ethical guideline များကို လိုက်နာရန် လိုအပ်သည်။

                            <br /><br />## နိဂုံး

                            <br />Generative AI သည် Social Media content creation နှင့် marketing လုပ်ငန်းများကို ပြောင်းလဲပေးနေသော အရေးကြီးသော နည်းပညာတစ်ခုဖြစ်သည်။ Content creator များနှင့် စီးပွားရေးလုပ်ငန်းများသည် Generative AI tools များကို အသုံးပြုခြင်းအားဖြင့် မြန်ဆန်ပြီး creative ဖြစ်သော Social Media content များကို ဖန်တီးနိုင်သည်။ ထို့ကြောင့် Generative AI နည်းပညာကို လေ့လာအသုံးချခြင်းသည် အနာဂတ် Social Media marketing လောကတွင် အရေးပါသော အရည်အချင်းတစ်ခု ဖြစ်လာမည်ဖြစ်သည်။
                        </p>

                    </div>
                );
            case "ai-tools-websites":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">AI Tools & Websites</h2>

                        {/* 🌟 ပုံအသစ် ထည့်နည်း 🌟 */}
                        <img
                            src="/src/assets/amara1.jpg"
                            alt="ai-tools-websites"
                            className="w-full rounded-2xl shadow-md mb-8 border border-slate-200"
                        />

                        <p className="mb-6">
                            AI Tools နှင့် Websites များသည် နည်းပညာလောကတွင် အလွန်အရေးပါလာသော အရာများဖြစ်သည်။ ယခုခေတ်တွင် AI ကို အသုံးပြု၍ လူသားများ၏ အလုပ်များကို အလိုအလျောက် ကူညီလုပ်ဆောင်ပေးနိုင်သည့် Tools များနှင့် Websites များစွာ ရှိလာပြီဖြစ်သည်။

                            <br /><br /> AI ခေတ်မှာ မြန်မာနိင်ငံသားတိုင်း ခေတ်နောက်မကျန်စေရေး တို့အရေးပါ။
                            အားလုံးက လွယ်ကူနေပါပြီ။<br />
                            ကျွန်တော် လက်ရှိသုံးနေတဲ့ AI Website တွေဖြစ်ပါတယ်။ ဖုန်းထဲမှာ application အနေနဲ့ အလေးခံပြီး ထည့်မထားတော့ဘဲ ဒီ Website Link တွေကနေ နှိပ်ပြီး AI Features တွေ သွားလုပ်လို့ရပါတယ်။ AI နယ်ပယ်က ကျယ်ဝန်းတော့ သူ့ အမျိုးအစားအလိုက် Category တွေ ခွဲပေးထားပါတယ်။
                            ###################### <br />
                            Artificial Intelligence (AI Links များ)
                            <br />သိချင်တာတွေမေးဖို့၊ ပုံတွေထုတ်ဖို့နဲ့ သုံးလို့အကောင်းဆုံး AI ChatBot အမျိုးအစား ၄ ခု
                            <br />(1) chatGPT
                            https://chatgpt.com/
                            (2) Google Gemini
                            https://gemini.google.com/app
                            (3) Grok
                            https://grok.com/
                            https://x.ai/grok
                            (4) DeepSeek
                            https://www.deepseek.com/
                            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            <br /> စာလုပ်ဖို့၊ Program Coding တွေရေးဖို့၊ Powerpoint တွေ လုပ်ဖို့၊ စာတွေစစ်ဖို့၊ ဘာသာပြန်ဖို့ နဲ့
                            ကျောင်းသားတွေအတွက် အကောင်းဆုံး AI  ၇ ခု
                            (1) Claude AI
                            https://claude.ai/
                            (2) NotebookLM
                            https://notebooklm.google/
                            (3) Gamma
                            https://gamma.app/
                            (4) Grammarly
                            https://www.grammarly.com/
                            (5) Perplexity
                            https://www.perplexity.ai/
                            (6) Notion
                            https://www.notion.com/
                            (7) Google AI Studio
                            https://aistudio.google.com/
                            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            <br /> အရည်အသွေးပြည့် ရုပ်ပုံတွေ၊ ဗီဒီယိုတွေ ထုတ်ဖို့ AI ၉ ခု
                            (1) Leonardo AI
                            https://leonardo.ai/
                            (2) Midjourney AI
                            https://www.midjourney.com/
                            (3) RunwayML
                            https://runwayml.com/
                            (4) Google AI Studio
                            https://aistudio.google.com/
                            (5) Pixverse
                            https://app.pixverse.ai/onboard
                            (6) Kling AI
                            https://app.klingai.com/global/
                            (7) DallE-3
                            https://openart.ai/home
                            https://openai.com/index/dall-e-3/
                            😎 Google Labs (Flow, Whisk, Image-Fx, Music-Fx, Music-Fx-Dj)
                            https://labs.google/
                            https://labs.google/fx/tools/flow
                            https://labs.google/fx/tools/whisk
                            https://labs.google/fx/tools/image-fx
                            https://labs.google/fx/tools/music-fx
                            https://labs.google/fx/tools/music-fx-dj
                            (9) Heygen
                            https://www.heygen.com/
                            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            <br />အသံပိုင်းဆိုင်ရာဖန်တီးခြင်း၊ ပြောင်းလဲခြင်း၊ ဂီတသီချင်းများဖန်တီးခြင်းများအတွက် အကောင်းဆုံး AI ၄ ခု
                            (1) Suno (For Song)
                            https://suno.com/home
                            (2) ElevenLabs
                            https://elevenlabs.io/
                            (3) Clipchamp
                            https://clipchamp.com/
                            (4) Music Fx
                            https://labs.google/fx/tools/music-fx
                            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            <br />ရုပ်သံတည်းဖြတ်ခြင်း၊ လိုဂိုများ ကြော်ငြာများဖန်တီးခြင်းများအတွက် အကောင်းဆုံး Website ၃ ခု
                            (1) CapCut
                            https://www.capcut.com/tools/online-video-editor
                            (2) Canva
                            https://www.canva.com/
                            (3) Kinemaster
                            https://www.kinemaster.com/
                            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            <br />ဓာတ်ပုံဟောင်းတွေ ပြန်ပြုပြင်ဖို့နဲ့ ပုံအလှတွေ ဖန်တီးဖို့ AI ၂ ခု
                            (1) Remini
                            https://remini.ai/try-remini
                            (2) Myheritage
                            https://www.myheritage.com/ai-time-machine
                            ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                            <br /><br />အခြား အသုံးဝင်သော Website များ
                            (1) Pinterest (ပုံရှာရန်)
                            https://www.pinterest.com/
                            (2) Hedra (ရုပ်သံဖန်တီးရန်)
                            https://www.hedra.com/app/home
                            (3) Yupp AI ( AI မျိုးစုံအား တနေရာတည်းမှ သုံးရန်)
                            https://yupp.ai/
                            (4) Blackbox AI ( AI မျိုးစုံအား တနေရာတည်းမှ သုံးရန်)
                            https://www.blackbox.ai/
                            (5) Logo and watermark Remover (မူရင်း လိုဂိုနှင့် ရေစာများ ဖျက်ရန်)
                            https://www.watermarkremover.io/
                            (6) Looka - (Logo တွေ Design ဆွဲပြီး Brand Merchandiseထုတ်ရန်)
                            https://looka.com/
                            (7) Soundraw - (Royalty-free Music တွေဖန်တီး)
                            https://soundraw.io/
                            (😎  Veed.io -( TikTok အတွက် ဗီဒီယိုတွေတည်းဖြတ်)
                            https://www.veed.io/
                            (9) v0 (by Vercel) - App တွေတည်ဆောက်)
                            https://v0.dev/
                            (10) SurgeGraph - ( Blog တွေရေး )
                            https://surgegraph.io/1
                            (11) Freepik (All AI )
                            https://www.freepik.com/
                            (12) free AI OXAAM
                            https://www.oxaam.com/
                            (13) Free AI tools
                            https://mrfreetools.com/
                            (14) All Prompts
                            https://www.aiwind.org/
                            (15) AI GURU Facebook Page
                            https://www.facebook.com/aigurumm/
                            <br />Vibe Code Tools
                            (1) Cursor AIVS Code အခြေခံ AI Editor (Professional ဆန်ဆန် Code ရေးရန်) www.cursor.com
                            (2) Replit AgentBrowser ပေါ်မှာတင် App တစ်ခုလုံးကို AI နဲ့ တည်ဆောက်ရန် www.replit.com
                            (3) Claude AIArtifacts feature ဖြင့် UI/UX များကို ချက်ချင်းစမ်းသပ်ရန် www.claude.ai
                            <br /> AI GURU

                        </p>

                    </div>
                );
            default:
                // ID အသစ်တွေအတွက် စာမရေးရသေးခင် ယာယီပြသမည့် စာသား
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">၁။ မိတ်ဆက်</h2>
                        <p className="mb-6">
                            ယခု သင်ခန်းစာသည် AI GURU ၏ နမူနာ သင်ခန်းစာတစ်ခု ဖြစ်ပါသည်။ နည်းပညာနယ်ပယ်တွင် ဤဘာသာရပ်သည် အလွန်အရေးပါပြီး အလုပ်အကိုင် အခွင့်အလမ်းများစွာကို ဖန်တီးပေးနိုင်ပါသည်။
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
                {/* 🌟 ဓာတ်ပုံကြီးနှင့် ခေါင်းစဉ် (ယခင်အတိုင်း) 🌟 */}
                <div className="h-64 md:h-96 w-full relative">
                    <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">Free Preview</span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{lesson.title}</h1>
                    </div>
                </div>

                {/* 🌟 စာသား အသေးစိတ် အပိုင်း 🌟 */}
                <div className="p-8 md:p-12 text-slate-700 leading-loose text-lg">
                    <p className="mb-8 font-medium text-xl border-b pb-8 border-slate-100">{lesson.desc}</p>

                    {/* 🌟 ၂။ အပေါ်တွင် ရေးသားထားသော Function ကို ဤနေရာတွင် ခေါ်ထုတ်ပြသပါသည် 🌟 */}
                    {renderLessonContent()}

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">ဆက်လက် လေ့လာရန်</h2>
                    <p className="mb-6">
                        ကျန်ရှိနေသော အသေးစိတ် သင်ခန်းစာများ၊ လက်တွေ့ ပရောဂျက်များနှင့် လျှို့ဝှက်ချက်များကို အပြည့်အစုံ ဆက်လက်လေ့လာနိုင်ရန်အတွက် AI GURU တွင် အကောင့်ဖွင့်ရန် လိုအပ်ပါသည်။
                    </p>

                    {/* 🌟 Call to Action (အကောင့်ဖွင့်ရန် တိုက်တွန်းခြင်း) 🌟 */}
                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">ဆက်လက်လေ့လာလိုပါသလား?</h3>
                        <p className="text-slate-600 mb-6">AI နည်းပညာများကို အခြေခံမှစ၍ ကျွမ်းကျင်သည်အထိ လေ့လာရန် ယခုပဲ အကောင့်ဖွင့်လိုက်ပါ။</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition"
                        >
                            ပင်မစာမျက်နှာသို့ ပြန်သွားမည်
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}