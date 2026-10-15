import React, { useState } from 'react';
import { SHAMAYEL_HADITHS } from '../data/shamayelTirmidhi';
import { BookOpen, Copy, Check, Volume2, Sparkles, Heart, Search } from 'lucide-react';
import shamayelImg from '../assets/images/shamayel_prophetic_lifestyle_1792011909244.jpg';

interface ShamayelSectionProps {
  onAddBookmark?: (item: {
    type: 'hadith';
    title: string;
    subtitle: string;
    referenceId: string;
    arabicSnippet?: string;
  }) => void;
  isBookmarked?: (refId: string) => boolean;
}

export const ShamayelSection: React.FC<ShamayelSectionProps> = ({
  onAddBookmark,
  isBookmarked
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHadiths = SHAMAYEL_HADITHS.filter(h =>
    h.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.banglaTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.narrator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-stone-200 bg-white text-black shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-6 sm:p-10 lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-800" />
              ইমাম আত-তিরমিযী (রহ.) সংকলিত অমর গ্রন্থ
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black font-bangla">
              শামায়েলে তিরমিযী
            </h1>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-bangla font-normal">
              সাইয়্যিদুল মুরসালীন, রাহমাতুল্লিল আলামীন হযরত মুহাম্মদ সাল্লাল্লাহু আলাইহি ওয়াসাল্লামের পবিত্র দৈহিক রূপসৌন্দর্য, অতুলনীয় চালচলন, পোশাক, খাদ্যাভ্যাস ও সর্বশ্রেষ্ঠ আখলাকের প্রামাণ্য চিত্রমালা।
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-700 pt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-emerald-700" /> পূর্ণাঙ্গ হাদিস সংখ্যা: ৩৯৭টি
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-emerald-700" /> মোট অধ্যায়: ৫৬টি
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] relative border-l border-stone-100">
            <img
              src={shamayelImg}
              alt="Shamayel Muhammadiyya Study"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="শামায়েল হাদিস খুঁজুন (যেমন: চেহারা, মোহর, চুল, পোশাক, লাউ, হাসি)..."
          className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
        />
      </div>

      {/* Hadith Cards Feed */}
      <div className="space-y-6">
        {filteredHadiths.map((item) => {
          const isSaved = isBookmarked ? isBookmarked(`shamayel-${item.hadithNumber}`) : false;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-emerald-300 dark:border-stone-800 dark:bg-stone-900"
            >
              {/* Header: Chapter and Number */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 pb-4 dark:border-stone-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    অধ্যায়: {item.chapter}
                  </span>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    হাদিস নম্বর: #{item.hadithNumber} • {item.narrator}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playSpeech(item.arabicText)}
                    className="p-2 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-stone-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/40"
                    title="আরবী পাঠ শুনুন"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, `${item.arabicText}\n\n${item.banglaTranslation}\n\n[শামায়েলে তিরমিযী: হাদিস ${item.hadithNumber}]`)}
                    className="p-2 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-stone-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/40"
                    title="কপি করুন"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  {onAddBookmark && (
                    <button
                      onClick={() => onAddBookmark({
                        type: 'hadith',
                        title: `শামায়েলে তিরমিযী - হাদিস ${item.hadithNumber}`,
                        subtitle: item.chapter,
                        referenceId: `shamayel-${item.hadithNumber}`,
                        arabicSnippet: item.arabicText.slice(0, 50)
                      })}
                      className={`p-2 rounded-lg transition-colors ${
                        isSaved
                          ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30'
                          : 'text-stone-600 hover:text-amber-600 hover:bg-amber-50 dark:text-stone-400 dark:hover:bg-amber-950/20'
                      }`}
                      title="বুকমার্ক করুন"
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Arabic Hadith */}
              <div className="my-5 rounded-xl bg-stone-50/70 p-4 sm:p-5 border border-stone-200">
                <p className="text-right text-xl sm:text-2xl font-serif text-black font-semibold leading-loose" dir="rtl">
                  {item.arabicText}
                </p>
              </div>

              {/* Bangla Translation */}
              <div className="space-y-3 font-bangla">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  অনুবাদ:
                </h3>
                <p className="text-sm sm:text-base text-black font-medium leading-relaxed">
                  {item.banglaTranslation}
                </p>

                {/* Scholarly commentary */}
                {item.explanation && (
                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 mt-4">
                    <span className="text-xs font-bold text-black">
                      ব্যাখ্যা ও তাৎপর্য:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-900 mt-1">
                      {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
