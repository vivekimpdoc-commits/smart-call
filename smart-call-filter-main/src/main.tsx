import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-[420px] h-[880px] max-h-[92vh] bg-slate-900 rounded-[3rem] border-[14px] border-slate-800 overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/10">
        {/* Mobile Camera Notch */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-[100] pointer-events-none">
          <div className="w-32 h-7 bg-slate-800 rounded-b-3xl shadow-sm flex justify-center items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900/50"></div>
            <div className="w-3 h-3 rounded-full bg-slate-950 flex items-center justify-center">
               <div className="w-1 h-1 rounded-full bg-blue-900/40 shadow-[0_0_2px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        </div>
        {/* Scrollable App Area */}
        <div className="flex-1 overflow-y-auto w-full h-full custom-scrollbar relative">
          <App />
        </div>
      </div>
    </div>
  </StrictMode>,
);
