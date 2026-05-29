import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap'; // 🌟 Plugin ကိုခေါ်ပါ

export default defineConfig({
  plugins: [
    react(),
    // 🌟 Sitemap Settings ထည့်ပါ
    Sitemap({
      hostname: 'https://aiguru.site', // သင့် Website ရဲ့ Domain အမှန်
      dynamicRoutes: [
        '/',
        '/lessons',
        '/admin',
        '/AdminDashboard',
        '/LessonDetail',
        '/LessonPreview'
        // သင့်ဆီမှာရှိတဲ့ အခြား Route အမည်များကို ဒီမှာ ဆက်ထည့်ပါ
      ],
      outDir: 'dist', // Build လုပ်ရင် dist ဖိုဒါထဲ သွားထည့်ပေးဖို့
    })
  ],
})