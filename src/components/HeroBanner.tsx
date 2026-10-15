import React from 'react';
import { BookOpen, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroBannerProps {
  onSelectSurah: (surahNumber: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  hijriDate: string;
  nextPrayerName: string;
  nextPrayerTime: string;
  cityName: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectSurah,
  setActiveTab,
  hijriDate,
  nextPrayerName,
  nextPrayerTime,
  cityName
}) => {
  return (
    <div className="relative overflow-hidden border-b border-stone-200 bg-stone-100/60 dark:border-stone-800 dark:bg-stone-900/60">
      {/* Editorial Utility Ribbon */}
      <div className="border-b border-stone-200/80 bg-stone-100/90 px-4 py-2 text-xs text-stone-600 dark:border-stone-800/80 dark:bg-stone-900/90 dark:text-stone-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-emerald-800 dark:text-emerald-400">হিজরি সন:</span>
            <span>{hijriDate}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>আজকের তারাবি ও তাহাজ্জুদ</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{cityName}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>পরবর্তী নামাজ: <strong className="text-emerald-800 dark:text-emerald-400 font-semibold">{nextPrayerName} ({nextPrayerTime})</strong></span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          
          {/* Left Column: Editorial Headline & Purpose */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-3">
              কুরআনুল কারীম ও বিশুদ্ধ হাদিস সম্ভার
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
              সহজ ও প্রামাণ্য বাংলা অনুবাদে <br className="hidden sm:inline" />
              <span className="font-serif text-emerald-900 dark:text-emerald-300">আল-কুরআন ও হাদিস বিডি</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              সহীহ বুখারী, সহীহ মুসলিম সহ সিহাহ সিত্তাহর বিশুদ্ধ হাদিস সংকলন এবং ১১৪টি সূরার বিশুদ্ধ আরবি হরফ, বাংলা অর্থ, তাফসীর ও হৃদয়স্পর্শী অডিও তিলাওয়াত।
            </p>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('quran');
                  onSelectSurah(1);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-900 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                সূরা আল-ফাতিহা পড়ুন
              </button>

              <button
                onClick={() => setActiveTab('hadith')}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 hover:border-emerald-600 hover:text-emerald-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition-colors"
              >
                হাদিস ব্রাউজ করুন
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab('prayer')}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 transition-colors"
              >
                আজকের নামাজের সময়
              </button>
            </div>

            {/* Quiet Unboxed Metadata metrics */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">১১৪টি</span> সূরা
              </div>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">৬,২৩৬টি</span> আয়াত
              </div>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">৮টি</span> প্রধান প্রামাণ্য হাদিস গ্রন্থ
              </div>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <div>
                সহীহ আন্তর্জাতিক সনদ
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Quran Artwork */}
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl border border-stone-200/80 bg-stone-200 shadow-sm dark:border-stone-800 dark:bg-stone-800 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full">
              <img
                src="/src/assets/images/hero_quran_rehal_1792006436727.jpg"
                alt="Open Holy Quran manuscript with gold calligraphy on carved wooden rehal"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="font-arabic text-xl sm:text-2xl text-amber-200 text-right dir-rtl leading-relaxed">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <div className="text-xs text-stone-200 mt-1 flex items-center justify-between">
                  <span>মুহিদ্দীন খান ও তাইসিরুল কুরআন অনুবাদ</span>
                  <span className="text-amber-300">মিশারি রাশিদ আল-আফাসি তিলাওয়াত</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
