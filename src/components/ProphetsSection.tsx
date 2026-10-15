import React, { useState } from 'react';
import { PROPHETS_SCHOLARLY_OVERVIEW, PROPHETS_DATABASE } from '../data/prophetsData';
import { ProphetBiography, Bookmark } from '../types';
import { 
  BookOpen, Search, Bookmark as BookmarkIcon, ChevronLeft, ChevronRight, 
  Sparkles, Info, Check, Copy, Share2 
} from 'lucide-react';

interface ProphetsSectionProps {
  onAddBookmark: (item: Omit<Bookmark, 'id' | 'dateAdded'>) => void;
  isBookmarked: (refId: string) => boolean;
}

export const ProphetsSection: React.FC<ProphetsSectionProps> = ({
  onAddBookmark,
  isBookmarked
}) => {
  const [selectedProphetNumber, setSelectedProphetNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const activeProphet: ProphetBiography = 
    PROPHETS_DATABASE.find(p => p.number === selectedProphetNumber) || PROPHETS_DATABASE[0];

  const filteredProphets = PROPHETS_DATABASE.filter(p =>
    p.number.toString().includes(searchQuery) ||
    p.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameArabic.includes(searchQuery) ||
    p.titleBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sentTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bookmarked = isBookmarked(`prophet-${activeProphet.number}`);

  const handleCopyProphet = (prophet: ProphetBiography) => {
    const textToCopy = `${prophet.nameBangla} (${prophet.titleBangla})\nসময়কালঃ ${prophet.eraOrPeriod} | প্রেরিত জাতিঃ ${prophet.sentTo}\n\nসারসংক্ষেপঃ\n${prophet.summary}\n\nকুরআনিক আয়াতঃ\n${prophet.quranicAyah.arabic}\n${prophet.quranicAyah.bangla} (${prophet.quranicAyah.reference})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(prophet.number);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Editorial Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="p-6 sm:p-8 lg:col-span-8">
            <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
              কাসাসুল আম্বিয়া ও কুরআনের ইতিহাস
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              কুরআনে উল্লেখিত ২৫ জন নবী ও রাসূলের পূর্ণাঙ্গ জীবনী
            </h2>
            
            <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl font-bangla">
              মানবজাতির প্রথম মানুষ হযরত আদম (আ.) থেকে শুরু করে সর্বশেষ ও সর্বশ্রেষ্ঠ রাসূল সাইয়্যেদুনা মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম) পর্যন্ত পবিত্র কুরআনে সুনির্দিষ্টভাবে নাম উল্লেখিত সকল মহামানবের জীবন ও শিক্ষা।
            </p>

            {/* Quranic reference badge strip */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span className="font-semibold text-emerald-900 dark:text-emerald-300">২৫ জন নবী</span>
              <span aria-hidden="true">·</span>
              <span>উলুল আযম ৫ জন</span>
              <span aria-hidden="true">·</span>
              <span>সহীহ তাফসীর ও কাসাসুল আম্বিয়া ভিত্তিক</span>
            </div>
          </div>

          <div className="relative lg:col-span-4 h-48 sm:h-64 lg:h-full overflow-hidden">
            <img
              src="/src/assets/images/prophets_chronicle_manuscript_1792009754999.jpg"
              alt="Ancient chronicle manuscript of the Prophets of Islam"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

      {/* Scholarly Overview Info Card */}
      <div className="mb-8 rounded-2xl border border-stone-200 bg-stone-50/70 p-6 dark:border-stone-800 dark:bg-stone-900/60 font-bangla">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-950 dark:text-emerald-200 mb-2">
          <Info className="h-4 w-4 text-emerald-700" />
          <span>{PROPHETS_SCHOLARLY_OVERVIEW.titleBangla}</span>
        </div>
        
        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
          {PROPHETS_SCHOLARLY_OVERVIEW.quranPerspective}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {PROPHETS_SCHOLARLY_OVERVIEW.keyPoints.map((pt, idx) => (
            <div key={idx} className="rounded-xl border border-stone-200/80 bg-white p-4 dark:border-stone-800 dark:bg-stone-800/80">
              <strong className="block text-emerald-900 dark:text-emerald-300 font-bold mb-1">
                {pt.title}
              </strong>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout: Sidebar of 25 Prophets & Detailed Biography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 25 Prophets Navigator (4 cols) */}
        <aside className="lg:col-span-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sticky top-20 max-h-[85vh] flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>২৫ জন নবীর তালিকা</span>
              <span className="text-xs font-normal text-stone-500">{filteredProphets.length} জন</span>
            </h3>

            <div className="relative mt-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="নবীর নাম বা উপাধি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredProphets.map((prophet) => {
              const isActive = prophet.number === selectedProphetNumber;
              return (
                <button
                  key={prophet.id}
                  onClick={() => setSelectedProphetNumber(prophet.number)}
                  className={`w-full flex items-center justify-between rounded-lg p-2.5 text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-800 text-white font-medium shadow-xs'
                      : 'hover:bg-stone-100 text-stone-800 dark:text-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono tabular-nums ${
                      isActive ? 'bg-emerald-900 text-amber-200' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                    }`}>
                      {prophet.number}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold leading-tight">
                        {prophet.nameBangla}
                      </div>
                      <div className={`text-[11px] truncate max-w-[170px] ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                        {prophet.titleBangla}
                      </div>
                    </div>
                  </div>

                  <span className={`font-arabic text-sm shrink-0 ${isActive ? 'text-amber-200' : 'text-stone-700 dark:text-stone-300'}`}>
                    {prophet.nameArabic}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Prophet Detailed Biography (8 cols) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          <article className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            
            {/* Prophet Header Card */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-5 dark:border-stone-800">
              <div>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  নবী নং {activeProphet.number} (কুরআনে উল্লেখিত ক্রম)
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {activeProphet.nameBangla}
                </h2>
                <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 mt-1">
                  উপাধি / মর্যাদাঃ {activeProphet.titleBangla}
                </div>
              </div>

              <div className="text-right">
                <div className="font-arabic text-3xl sm:text-4xl text-emerald-950 dark:text-emerald-200">
                  {activeProphet.nameArabic}
                </div>
                <div className="text-xs text-stone-400 mt-1">
                  {activeProphet.nameEnglish}
                </div>
              </div>
            </div>

            {/* Key Facts & Metadata Strip */}
            <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-stone-50 p-4 text-xs dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 font-bangla">
              <div>
                <span className="text-stone-500 block">সময়কাল / যুগঃ</span>
                <strong className="text-stone-800 dark:text-stone-200">{activeProphet.eraOrPeriod}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">প্রেরিত জাতিঃ</span>
                <strong className="text-stone-800 dark:text-stone-200">{activeProphet.sentTo}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">কুরআনে উল্লেখঃ</span>
                <strong className="text-emerald-800 dark:text-emerald-400 tabular-nums">{activeProphet.quranMentionCount} বার</strong>
              </div>
              <div>
                <span className="text-stone-500 block">প্রধান সূরাঃ</span>
                <strong className="text-stone-800 dark:text-stone-200">{activeProphet.quranSurahs.slice(0, 2).join(', ')}</strong>
              </div>
            </div>

            {/* Scripture or Miracle highlight */}
            <div className="mb-6 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
              <strong className="font-bold block mb-0.5">আসমানি কিতাব বা প্রধান অলৌকিক মুজিজাঃ</strong>
              <span>{activeProphet.scriptureOrMiracle}</span>
            </div>

            {/* Summary */}
            <div className="mb-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-bangla border-b border-stone-100 pb-5 dark:border-stone-800">
              <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
                সংক্ষিপ্ত পরিচয়ঃ
              </strong>
              {activeProphet.summary}
            </div>

            {/* Detailed Narrative Sections */}
            <div className="space-y-6">
              {activeProphet.biographySections.map((sec, idx) => (
                <div key={idx} className="rounded-xl border border-stone-100 bg-stone-50/40 p-5 dark:border-stone-800 dark:bg-stone-800/40">
                  <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-700" />
                    <span>{sec.heading}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-black leading-relaxed text-justify font-bangla font-normal">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Quranic Ayah Callout */}
            <div className="my-6 rounded-xl border border-stone-200 bg-stone-50/80 p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black block mb-2">
                পবিত্র কুরআনুল কারীমে বর্ণিত বাণীঃ
              </span>
              <div className="font-arabic text-xl sm:text-2xl text-black font-semibold text-right leading-loose" dir="rtl">
                {activeProphet.quranicAyah.arabic}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-black font-medium leading-relaxed font-bangla">
                <strong>অর্থঃ</strong> {activeProphet.quranicAyah.bangla}
              </div>
              <div className="mt-1.5 text-right text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold">
                — {activeProphet.quranicAyah.reference}
              </div>
            </div>

            {/* Life Lessons */}
            <div className="border-t border-stone-200 pt-5 dark:border-stone-800">
              <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2">
                আমাদের জীবনের শিক্ষাঃ
              </h4>
              <ul className="space-y-1.5">
                {activeProphet.keyLessons.map((les, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-bangla">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{les}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeProphet.number <= 1}
                  onClick={() => setSelectedProphetNumber(activeProphet.number - 1)}
                  className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>পূর্ববর্তী নবী</span>
                </button>

                <button
                  disabled={activeProphet.number >= PROPHETS_DATABASE.length}
                  onClick={() => setSelectedProphetNumber(activeProphet.number + 1)}
                  className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <span>পরবর্তী নবী</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyProphet(activeProphet)}
                  className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  {copiedId === activeProphet.number ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>কপি</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onAddBookmark({
                    type: 'hadith',
                    title: `নবী জীবনী: ${activeProphet.nameBangla}`,
                    subtitle: activeProphet.summary.slice(0, 60) + '...',
                    referenceId: `prophet-${activeProphet.number}`,
                    arabicSnippet: activeProphet.nameArabic
                  })}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    bookmarked
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300'
                  }`}
                >
                  <BookmarkIcon className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>{bookmarked ? 'সংরক্ষিত' : 'বুকমার্ক'}</span>
                </button>
              </div>
            </div>

          </article>

        </main>

      </div>

    </div>
  );
};
