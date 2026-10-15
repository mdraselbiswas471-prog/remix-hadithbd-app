import React, { useState } from 'react';
import { SEERAT_BOOK_INFO, SEERAT_CHAPTERS } from '../data/seeratBook';
import { SeeratChapter, Bookmark } from '../types';
import { BookOpen, ChevronLeft, ChevronRight, Bookmark as BookmarkIcon, Search, Award, Check } from 'lucide-react';

interface SeeratReaderProps {
  onAddBookmark: (item: Omit<Bookmark, 'id' | 'dateAdded'>) => void;
  isBookmarked: (refId: string) => boolean;
}

export const SeeratReader: React.FC<SeeratReaderProps> = ({
  onAddBookmark,
  isBookmarked
}) => {
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<number>(16);

  const activeChapter: SeeratChapter = 
    SEERAT_CHAPTERS.find(c => c.chapterNumber === selectedChapterNumber) || SEERAT_CHAPTERS[0];

  const filteredChapters = SEERAT_CHAPTERS.filter(c =>
    c.titleBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.chapterNumber.toString().includes(searchQuery)
  );

  const bookmarked = isBookmarked(`seerat-${activeChapter.chapterNumber}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Book Editorial Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="p-6 sm:p-8 lg:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <Award className="h-4 w-4" />
              <span>আন্তর্জাতিক প্রথম পুরস্কার প্রাপ্ত শ্রেষ্ঠ সিরাত গ্রন্থ</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {SEERAT_BOOK_INFO.titleBangla}
            </h2>
            <div className="font-arabic text-xl text-amber-900 dark:text-amber-200 mt-1">
              {SEERAT_BOOK_INFO.titleArabic}
            </div>

            <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
              রচনাঃ {SEERAT_BOOK_INFO.author}। রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর শুভ বেলাদত, শৈশব, ওহী অবতরণ, হিজরত, ঐতিহাসিক বদর-উহুদ-মক্কা বিজয় এবং বিদায় হজের পূর্ণাঙ্গ জীবন চরিত।
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span>মোট অধ্যায়ঃ ১২টি</span>
              <span aria-hidden="true">·</span>
              <span>সহীহ ঐতিহাসিক বর্ণনা</span>
              <span aria-hidden="true">·</span>
              <span>উম্মাহর সর্বাধিক পঠিত সীরাত</span>
            </div>
          </div>

          <div className="relative lg:col-span-4 h-48 sm:h-64 lg:h-full overflow-hidden">
            <img
              src="/src/assets/images/raheeq_seerat_book_1792007555198.jpg"
              alt="Ar-Raheeq Al-Makhtum Seerat book on desk"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

      {/* Main 2-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chapters Directory (4 cols) */}
        <aside className="lg:col-span-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sticky top-20 max-h-[85vh] flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              অধ্যায় সূচিপত্র
            </h3>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="অধ্যায় বা ঘটনা খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredChapters.map((ch) => {
              const isActive = ch.chapterNumber === selectedChapterNumber;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterNumber(ch.chapterNumber)}
                  className={`w-full flex items-center justify-between rounded-lg p-3 text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-800 text-white font-medium shadow-xs'
                      : 'hover:bg-stone-100 text-stone-800 dark:text-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded text-xs font-mono tabular-nums ${
                      isActive ? 'bg-emerald-900 text-amber-200' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                    }`}>
                      {ch.chapterNumber}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold line-clamp-1">
                        {ch.titleBangla}
                      </div>
                      <div className={`text-[11px] ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                        {ch.period}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Chapter Canvas (8 cols) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          <article className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            
            {/* Chapter Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5 dark:border-stone-800">
              <div>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  অধ্যায় {activeChapter.chapterNumber} · {activeChapter.period}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {activeChapter.titleBangla}
                </h2>
                <div className="font-arabic text-lg text-stone-600 dark:text-stone-400 mt-0.5">
                  {activeChapter.titleArabic}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddBookmark({
                    type: 'hadith',
                    title: `সিরাত: ${activeChapter.titleBangla}`,
                    subtitle: activeChapter.summary.slice(0, 60) + '...',
                    referenceId: `seerat-${activeChapter.chapterNumber}`,
                    arabicSnippet: activeChapter.titleArabic
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

                {/* Font size slider */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500">
                  <span>ফন্ট:</span>
                  <button 
                    onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                    className="h-6 w-6 rounded border border-stone-200 hover:bg-stone-100 dark:border-stone-700"
                  >
                    -
                  </button>
                  <span className="tabular-nums font-mono">{fontSize}</span>
                  <button 
                    onClick={() => setFontSize(Math.min(22, fontSize + 1))}
                    className="h-6 w-6 rounded border border-stone-200 hover:bg-stone-100 dark:border-stone-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="my-5 rounded-xl bg-stone-50 p-4 text-xs sm:text-sm text-stone-700 dark:bg-stone-800/60 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800 leading-relaxed font-bangla">
              <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
                অধ্যায় সারসংক্ষেপঃ
              </strong>
              {activeChapter.summary}
            </div>

            {/* Key Historical Highlights */}
            <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
              <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wider mb-2">
                মূল ঐতিহাসিক মাইলফলক ও ঘটনাপঞ্জিঃ
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300">
                {activeChapter.keyHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Chapter Narrative Content */}
            <div 
              className="space-y-4 text-black leading-relaxed font-bangla font-normal"
              style={{ fontSize: `${fontSize}px` }}
            >
              {activeChapter.content.map((para, i) => (
                <p key={i} className="text-justify first-letter:text-2xl first-letter:font-bold first-letter:text-black">
                  {para}
                </p>
              ))}
            </div>

            {/* Lessons for Life */}
            <div className="mt-8 border-t border-stone-200 pt-5 dark:border-stone-800">
              <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2">
                এই অধ্যায় হতে আমাদের জীবনের শিক্ষাঃ
              </h4>
              <div className="space-y-2">
                {activeChapter.lessons.map((les, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                    <span>{les}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Chapter Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
              <button
                disabled={activeChapter.chapterNumber <= 1}
                onClick={() => setSelectedChapterNumber(activeChapter.chapterNumber - 1)}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>পূর্ববর্তী অধ্যায়</span>
              </button>

              <span className="text-xs text-stone-500">
                অধ্যায় {activeChapter.chapterNumber} / {SEERAT_CHAPTERS.length}
              </span>

              <button
                disabled={activeChapter.chapterNumber >= SEERAT_CHAPTERS.length}
                onClick={() => setSelectedChapterNumber(activeChapter.chapterNumber + 1)}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <span>পরবর্তী অধ্যায়</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </article>

        </main>

      </div>

    </div>
  );
};
