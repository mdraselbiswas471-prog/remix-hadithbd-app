import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, History } from 'lucide-react';

interface DhikrPreset {
  id: string;
  arabic: string;
  bangla: string;
  meaning: string;
  target: number;
}

const PRESETS: DhikrPreset[] = [
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    bangla: "সুবহানাল্লাহ",
    meaning: "আল্লাহ তায়ালা পরম পবিত্র ও মহিমান্বিত",
    target: 33
  },
  {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    bangla: "আলহামদুলিল্লাহ",
    meaning: "সমস্ত প্রশংসা ও কৃতজ্ঞতা মহান আল্লাহর",
    target: 33
  },
  {
    id: "allahuakbar",
    arabic: "اللَّهُ أَكْبَرُ",
    bangla: "আল্লাহু আকবার",
    meaning: "আল্লাহ সর্বশ্রেষ্ঠ ও মহান",
    target: 34
  },
  {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    bangla: "আস্তাগফিরুল্লাহ",
    meaning: "আমি আল্লাহর দরবারে ক্ষমা প্রার্থনা করছি",
    target: 100
  },
  {
    id: "lailahaillallah",
    arabic: "لَا إِلٰهَ إِلَّا اللَّهُ",
    bangla: "লা ইলাহা ইল্লাল্লাহ",
    meaning: "আল্লাহ ছাড়া সত্য কোনো উপাস্য নেই",
    target: 100
  },
  {
    id: "durood",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    bangla: "আল্লাহুম্মা সাল্লি আলা মুহাম্মদ",
    meaning: "হে আল্লাহ! মুহাম্মদ (সা.)-এর প্রতি রহমত বর্ষণ করুন",
    target: 100
  },
  {
    id: "kalima-tamjeed",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    bangla: "সুবহানাল্লাহি ওয়া বিহামদিহী সুবহানাল্লাহিল আযীম",
    meaning: "মহিমান্বিত আল্লাহর পবিত্রতা ও প্রশংসা ঘোষণা করছি",
    target: 100
  }
];

export const DigitalTasbih: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DhikrPreset>(PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [completedLaps, setCompletedLaps] = useState<number>(0);
  const [totalLifetimeDhikr, setTotalLifetimeDhikr] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  // Load lifetime dhikr from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hadithbd_total_dhikr');
      if (saved) {
        setTotalLifetimeDhikr(parseInt(saved, 10) || 0);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // AudioContext fallback
    }
  };

  const handleIncrement = () => {
    playClickSound();
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 120);

    const nextCount = count + 1;
    const nextTotal = totalLifetimeDhikr + 1;
    setTotalLifetimeDhikr(nextTotal);
    try {
      localStorage.setItem('hadithbd_total_dhikr', nextTotal.toString());
    } catch (e) {}

    if (nextCount >= selectedPreset.target) {
      setCount(0);
      setCompletedLaps(prev => prev + 1);
      if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate([40, 60, 40]);
      }
    } else {
      setCount(nextCount);
    }
  };

  const handleResetCurrent = () => {
    setCount(0);
  };

  const handleSelectPreset = (p: DhikrPreset) => {
    setSelectedPreset(p);
    setCount(0);
    setCompletedLaps(0);
  };

  const progressPercent = Math.min(100, Math.round((count / selectedPreset.target) * 100));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="mb-8 border-b border-stone-200 pb-6 text-center dark:border-stone-800">
        <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
          ডিজিটাল তাসবীহ ও যিকির
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          আল্লাহর স্মরণ ও দৈনন্দিন আমল
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
          "নিশ্চয়ই আল্লাহর যিকির দ্বারাই অন্তরসমূহ পরম প্রশান্তি লাভ করে।" (সূরা আর-রাদঃ ২৮)
        </p>
      </div>

      {/* Preset Tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {PRESETS.map((p) => {
          const isSelected = selectedPreset.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-600 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300'
              }`}
            >
              {p.bangla} ({p.target})
            </button>
          );
        })}
      </div>

      {/* Central Tactile Tasbih Counter Card */}
      <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900 text-center">
        
        {/* Preset Info */}
        <div className="font-arabic text-3xl sm:text-4xl text-emerald-950 dark:text-emerald-200 py-2 leading-relaxed" dir="rtl">
          {selectedPreset.arabic}
        </div>
        <div className="text-base font-bold text-stone-800 dark:text-stone-100 mt-1">
          {selectedPreset.bangla}
        </div>
        <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 max-w-xs mx-auto">
          {selectedPreset.meaning}
        </div>

        {/* Counter Display & Progress */}
        <div className="mt-8 mb-4">
          <div className="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
            {count}
          </div>
          <div className="mt-2 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-2">
            <span>লক্ষ্যঃ <strong className="text-stone-800 dark:text-stone-200 tabular-nums">{selectedPreset.target}</strong></span>
            <span aria-hidden="true">·</span>
            <span>সম্পন্ন ল্যাপঃ <strong className="text-emerald-800 dark:text-emerald-400 tabular-nums">{completedLaps} বার</strong></span>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
            <div
              className="h-full bg-emerald-700 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Big Tap Area */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleIncrement}
            className={`relative flex h-36 w-36 sm:h-40 sm:w-40 items-center justify-center rounded-full bg-emerald-800 text-white shadow-lg transition-transform active:scale-95 hover:bg-emerald-900 cursor-pointer ${
              isPressing ? 'scale-90 ring-4 ring-emerald-300 dark:ring-emerald-700' : ''
            }`}
            aria-label="Count Dhikr"
          >
            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold">পাঠ করুন</span>
              <span className="text-[11px] text-emerald-200 mt-0.5 font-medium">+১ গণনা</span>
            </div>
          </button>
        </div>

        {/* Sound & Vibration & Reset Utilities */}
        <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-4 text-xs dark:border-stone-800">
          <button
            onClick={handleResetCurrent}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>বর্তমান রিসেট</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`rounded-md p-1.5 transition-colors ${
                soundEnabled 
                  ? 'text-emerald-700 dark:text-emerald-400' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
              title={soundEnabled ? 'শব্দ বন্ধ করুন' : 'শব্দ চালু করুন'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setVibrationEnabled(!vibrationEnabled)}
              className={`rounded-md px-2 py-1 transition-colors ${
                vibrationEnabled 
                  ? 'bg-stone-100 text-emerald-800 font-medium dark:bg-stone-800 dark:text-emerald-300' 
                  : 'text-stone-400'
              }`}
            >
              কম্পন {vibrationEnabled ? 'অন' : 'অফ'}
            </button>
          </div>
        </div>

      </div>

      {/* Total Lifetime Counter Strip */}
      <div className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400">
        আপনার সর্বমোট সংরক্ষিত যিকির সংখ্যাঃ <strong className="font-mono text-emerald-900 dark:text-emerald-300 font-bold tabular-nums">{totalLifetimeDhikr} বার</strong>
      </div>

    </div>
  );
};
