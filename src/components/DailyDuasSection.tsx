import React, { useState } from 'react';
import { DUAS_DATABASE, DUA_CATEGORIES } from '../data/duas';
import { DailyDua, Bookmark } from '../types';
import { Search, Copy, Check, Bookmark as BookmarkIcon, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface DailyDuasSectionProps {
  onAddBookmark: (item: Omit<Bookmark, 'id' | 'dateAdded'>) => void;
  isBookmarked: (refId: string) => boolean;
}

export const DailyDuasSection: React.FC<DailyDuasSectionProps> = ({
  onAddBookmark,
  isBookmarked
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব দোয়া');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const filteredDuas = DUAS_DATABASE.filter(dua => {
    const matchesCat = selectedCategory === 'সব দোয়া' || dua.category === selectedCategory;
    const matchesSearch = 
      dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.pronunciation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.arabic.includes(searchQuery);

    return matchesCat && matchesSearch;
  });

  const handleCopyDua = (dua: DailyDua) => {
    const textToCopy = `${dua.title}\n\n${dua.arabic}\n\nউচ্চারণঃ ${dua.pronunciation}\n\nঅর্থঃ ${dua.translation}\n\nতথ্যসূত্রঃ ${dua.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakArabic = (dua: DailyDua) => {
    if ('speechSynthesis' in window) {
      if (speakingId === dua.id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dua.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(dua.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 border-b border-stone-200 pb-6 dark:border-stone-800">
        <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
          হিসনুল মুসলিম ও প্রামাণ্য দোয়া
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া ও যিকির
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          কুরআনুল কারীম ও সহীহ হাদিস থেকে চয়িত বিশুদ্ধ দোয়া, বাংলা উচ্চারণ, অর্থ ও আমলের ফজিলত।
        </p>
      </div>

      {/* Filter and Search */}
      <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="দোয়ার নাম, উচ্চারণ বা অর্থ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500"
          />
        </div>

        {/* Category Horizontal Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {DUA_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Duas List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDuas.length === 0 ? (
          <div className="col-span-full rounded-xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
            <BookOpen className="mx-auto h-8 w-8 text-stone-400" />
            <h4 className="mt-3 text-base font-semibold text-stone-800 dark:text-stone-200">কোনো দোয়া পাওয়া যায়নি</h4>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">অনুগ্রহ করে সার্চ বা ক্যাটাগরি পরিবর্তন করুন।</p>
          </div>
        ) : (
          filteredDuas.map((dua) => {
            const bookmarked = isBookmarked(`dua-${dua.id}`);
            const isSpeaking = speakingId === dua.id;

            return (
              <article
                key={dua.id}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                        {dua.category}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                        {dua.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeakArabic(dua)}
                        className={`rounded-md p-1.5 transition-colors ${
                          isSpeaking ? 'bg-emerald-800 text-white' : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title="আরবি পাঠ শুনুন"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleCopyDua(dua)}
                        className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="কপি করুন"
                      >
                        {copiedId === dua.id ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() => onAddBookmark({
                          type: 'dua',
                          title: dua.title,
                          subtitle: dua.translation.slice(0, 60) + '...',
                          referenceId: `dua-${dua.id}`,
                          arabicSnippet: dua.arabic.slice(0, 45) + '...'
                        })}
                        className={`rounded-md p-1.5 transition-colors ${
                          bookmarked
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title={bookmarked ? 'বুকমার্কে সংরক্ষিত' : 'বুকমার্ক করুন'}
                      >
                        <BookmarkIcon className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div className="font-arabic py-4 text-right text-black font-semibold text-xl leading-loose" dir="rtl">
                    {dua.arabic}
                  </div>

                  {/* Pronunciation */}
                  <div className="border-t border-stone-200 pt-3 text-xs text-stone-900 leading-relaxed font-normal">
                    <strong className="text-black font-semibold">উচ্চারণঃ </strong>
                    {dua.pronunciation}
                  </div>

                  {/* Meaning */}
                  <div className="mt-2 text-sm text-black leading-relaxed font-bangla font-medium">
                    <strong className="text-black font-bold">অর্থঃ </strong>
                    {dua.translation}
                  </div>

                  {/* Benefit */}
                  {dua.benefit && (
                    <div className="mt-3 rounded-lg bg-emerald-50/60 p-3 text-xs text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200">
                      <strong className="font-semibold">ফজিলত ও আমলঃ </strong>
                      <span>{dua.benefit}</span>
                    </div>
                  )}
                </div>

                {/* Reference */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 dark:text-stone-500">
                  রেফারেন্সঃ {dua.reference}
                </div>
              </article>
            );
          })
        )}
      </div>

    </div>
  );
};
