// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // ဤနေရာတွင် ကျွန်တော်တို့၏ React ဖိုင်များကို ဖတ်ရန် ညွှန်ကြားထားပါသည်
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ဤနေရာတွင် ကျွန်တော်တို့၏ React ဖိုင်များကို ဖတ်ရန် ညွှန်ကြားထားပါသည်
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'heading' ဆိုသည့် နာမည်ဖြင့် tailwind class အသစ် တည်ဆောက်လိုက်ခြင်းဖြစ်သည်
        heading: ['MyanmarHeading', 'sans-serif'],
      },
    },
  },
  plugins: [],
}