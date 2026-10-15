import React, { useState } from 'react';
import { QIYAMAH_SIGNS } from '../data/qiyamahSigns';
import { Folder, Clock, AlertTriangle, ShieldAlert, Sparkles, BookOpen, Copy, Check } from 'lucide-react';

export const QiyamahSignsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'minor' | 'major'>('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredSigns = QIYAMAH_SIGNS.filter(sign => {
    if (activeFilter === 'minor') return sign.type === 'minor';
    if (activeFilter === 'major') return sign.type === 'major';
    return true;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 text-black shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200 mb-3">
          <Folder className="h-3.5 w-3.5 text-amber-800" />
          বিশেষ ফোল্ডার: আশরাতুস সাআহ
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black font-bangla mb-3">
          কিয়ামতের আলামত ও আখিরাতের প্রস্তুতি
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-stone-800 leading-relaxed font-bangla font-normal">
          রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লামের সহীহ হাদিস দ্বারা প্রমাণিত কিয়ামতের ছোট ও বড় আলামতসমূহ, বর্তমান বৈশ্বিক প্রেক্ষাপটে তাদের নিখুঁত প্রতিফলন এবং মহাবিপর্যয় থেকে আত্মরক্ষার আমল।
        </p>

        {/* Folder Selectors */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200 pt-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-black shadow-xs'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Folder className="h-4 w-4" />
            সব আলামত ({QIYAMAH_SIGNS.length})
          </button>
          <button
            onClick={() => setActiveFilter('minor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'minor'
                ? 'bg-amber-500 text-black shadow-xs'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            ছোট আলামতসমূহ ({QIYAMAH_SIGNS.filter(s => s.type === 'minor').length})
          </button>
          <button
            onClick={() => setActiveFilter('major')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'major'
                ? 'bg-amber-500 text-black shadow-xs'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            ১০টি বড় আলামত ({QIYAMAH_SIGNS.filter(s => s.type === 'major').length})
          </button>
        </div>
      </div>

      {/* Safety & Prescription Box */}
      <div className="mb-8 rounded-2xl border border-amber-300/80 bg-amber-50/80 p-5 dark:border-amber-800/80 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm font-bangla">
            <h2 className="font-bold text-amber-950 dark:text-amber-200">
              দাজ্জাল ও শেষ জামানার ফেতনা থেকে বাঁচার নবীজী (সা.)-এর ব্যবস্থাপত্র:
            </h2>
            <p className="text-amber-900 dark:text-amber-300/90 leading-relaxed">
              ১. প্রতি জুমার দিন সূরা আল-কাহাফ সম্পূর্ণ পাঠ করা অথবা অন্তত প্রথম ও শেষ ১০ আয়াত নিয়মিত মুখস্থ ও তিলাওয়াত করা।<br />
              ২. নামাজের শেষ তাশাহহুদে চার প্রকার ফেতনা (কবরের আজাব, জাহান্নামের শাস্তি, জীবন-মৃত্যুর ফেতনা ও দাজ্জালের ফেতনা) থেকে পানাহ চাওয়া।
            </p>
          </div>
        </div>
      </div>

      {/* Signs Cards Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSigns.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all dark:bg-stone-900 ${
              item.type === 'major'
                ? 'border-amber-300 dark:border-amber-700/60 ring-1 ring-amber-300/40 dark:ring-amber-800/30'
                : 'border-stone-200 dark:border-stone-800'
            }`}
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                  item.type === 'major'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                }`}>
                  {item.type === 'major' ? <AlertTriangle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  {item.type === 'major' ? 'মহাপ্রলয়ের বড় আলামত' : 'ছোট আলামত (যা প্রকাশ পেয়েছে)'}
                </span>
                <span className="text-[11px] text-stone-400 font-medium">
                  {item.hadithReference.split('(')[0]}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-bangla leading-snug">
                  {item.title}
                </h2>
                <p className="text-xs font-medium text-emerald-800 dark:text-emerald-400 mt-1">
                  {item.subTitle}
                </p>
              </div>

              {/* Arabic Hadith if available */}
              {item.arabicHadith && (
                <div className="rounded-xl bg-stone-50 p-3.5 dark:bg-stone-850/60 border border-stone-150 dark:border-stone-800">
                  <p className="text-right text-base font-serif text-emerald-950 dark:text-emerald-200" dir="rtl">
                    {item.arabicHadith}
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-bangla leading-relaxed">
                {item.description}
              </div>

              {/* Modern Manifestation */}
              {item.modernManifestation && (
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 dark:border-stone-800 dark:bg-stone-850/50">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 dark:text-stone-100 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    সমকালীন বাস্তবতায় প্রতিফলন:
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-bangla leading-relaxed">
                    {item.modernManifestation}
                  </p>
                </div>
              )}

              {/* Protection Dua */}
              {item.protectionDua && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                      বাঁচার মাসনূন দুআ:
                    </span>
                    <button
                      onClick={() => handleCopy(item.protectionDua!)}
                      className="p-1 rounded text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-300"
                      title="দুআ কপি করুন"
                    >
                      {copiedText === item.protectionDua ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <p className="text-right text-sm font-serif text-emerald-950 dark:text-emerald-200" dir="rtl">
                    {item.protectionDua}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-150 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
              সূত্র: {item.hadithReference}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
