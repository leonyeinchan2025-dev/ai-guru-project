import { useParams, useNavigate } from 'react-router-dom';
import { sampleLessons } from '../components/SampleLessonsModal'; // ယခင်ဖိုင်မှ Array ကို ပြန်ခေါ်သုံးမည်

export default function LessonPreview() {
    // 🌟 id သည် string အမျိုးအစားဖြစ်ကြောင်း TypeScript ကို သတ်မှတ်ပေးခြင်း
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // URL ပေါ်က id နဲ့ တိုက်ဆိုင်တဲ့ သင်ခန်းစာကို ရှာမည်
    const lesson = sampleLessons.find((l) => l.id === id);

    if (!lesson) {
        return <div className="p-20 text-center text-2xl font-bold">သင်ခန်းစာ ရှာမတွေ့ပါ။</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
                {/* 🌟 ဓာတ်ပုံကြီး 🌟 */}
                <div className="h-64 md:h-96 w-full relative">
                    <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">Free Preview</span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{lesson.title}</h1>
                    </div>
                </div>

                {/* 🌟 စာသား အသေးစိတ် (နမူနာ စာသားများ) 🌟 */}
                <div className="p-8 md:p-12 text-slate-700 leading-loose text-lg">
                    <p className="mb-6 font-medium text-xl">{lesson.desc}</p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">၁။ မိတ်ဆက်</h2>
                    <p className="mb-6">
                        ယခု သင်ခန်းစာသည် AI GURU ၏ နမူနာ သင်ခန်းစာတစ်ခု ဖြစ်ပါသည်။ နည်းပညာနယ်ပယ်တွင် ဤဘာသာရပ်သည် အလွန်အရေးပါပြီး အလုပ်အကိုင် အခွင့်အလမ်းများစွာကို ဖန်တီးပေးနိုင်ပါသည်။
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">၂။ အသေးစိတ် လေ့လာရန်</h2>
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