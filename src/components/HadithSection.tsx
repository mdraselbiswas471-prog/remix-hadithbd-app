import React, { useState } from 'react';
import { HADITH_BOOKS, HADITH_DATABASE, HADITH_TOPICS } from '../data/hadiths';
import { HadithItem, Bookmark } from '../types';
import { 
  BookOpen, Search, Copy, Check, Bookmark as BookmarkIcon, 
  Volume2, Share2, Sparkles, Filter, ChevronRight
} from 'lucide-react';

interface HadithSectionProps {
  onAddBookmark: (item: Omit<Bookmark, 'id' | 'dateAdded'>) => void;
  isBookmarked: (refId: string) => boolean;
}

export const HadithSection: React.FC<HadithSectionProps> = ({
  onAddBookmark,
  isBookmarked
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('সব বিষয়');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Filter Hadiths
  const filteredHadiths = HADITH_DATABASE.filter(hadith => {
    const matchesBook = selectedBookId === 'all' || hadith.bookId === selectedBookId;
    const matchesTopic = selectedTopic === 'সব বিষয়' || hadith.topic === selectedTopic;
    const matchesSearch = 
      hadith.hadithNumber.toString().includes(searchQuery) ||
      hadith.banglaText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.arabicText.includes(searchQuery) ||
      hadith.reference.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBook && matchesTopic && matchesSearch;
  });

  const handleCopyHadith = (hadith: HadithItem) => {
    const textToCopy = `${hadith.bookNameBangla}, হাদিস নং ${hadith.hadithNumber}\n${hadith.narrator}\n\n${hadith.arabicText}\n\nবাংলা অনুবাদঃ\n${hadith.banglaText}\n\nমানঃ ${hadith.grade}\nরেফারেন্সঃ ${hadith.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakArabic = (hadith: HadithItem) => {
    if ('speechSynthesis' in window) {
      if (speakingId === hadith.id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(hadith.arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(hadith.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Editorial Header Section */}
      <div className="mb-8 border-b border-stone-200 pb-6 dark:border-stone-800">
        <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
          হাদিস বিডি সংকলন
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          প্রামাণ্য হাদিস গ্রন্থাবলী ও বিষয়ভিত্তিক সংকলন
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
          রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর পবিত্র বাণী, সুন্নাহ ও আদর্শের বিশুদ্ধতম সংকলন। বাংলা ও আরবি পাঠ সহ সঠিক রেফারেন্স এবং সনদের মান।
        </p>
      </div>

      {/* Hadith Books Carousel / Grid */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 mb-3 flex items-center justify-between">
          <span>প্রধান হাদিস গ্রন্থসমূহ</span>
          <span className="text-xs font-normal text-stone-500">সিহাহ সিত্তাহ ও রিয়াযুস স্বা-লিহীন</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedBookId('all')}
            className={`rounded-xl border p-3.5 text-left transition-all ${
              selectedBookId === 'all'
                ? 'border-emerald-700 bg-emerald-900 text-white shadow-xs'
                : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700 text-stone-800 dark:text-stone-200'
            }`}
          >
            <div className="text-xs font-medium opacity-80">সকল গ্রন্থ মিলিয়ে</div>
            <div className="text-base font-bold mt-1">সমগ্র হাদিস সম্ভার</div>
            <div className="text-[11px] mt-2 opacity-70">বিষয়ভিত্তিক সমন্বিত হাদিস</div>
          </button>

          {HADITH_BOOKS.map((book) => {
            const isSelected = selectedBookId === book.id;
            return (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className={`rounded-xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-900 text-white shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700 text-stone-800 dark:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-medium ${isSelected ? 'text-amber-200' : 'text-emerald-800 dark:text-emerald-400'}`}>
                    {book.badge}
                  </span>
                  <span className="font-arabic text-xs opacity-75">{book.titleArabic}</span>
                </div>
                <div className="text-sm sm:text-base font-bold mt-1 leading-snug">
                  {book.titleBangla}
                </div>
                <div className="text-[11px] mt-1.5 opacity-70 truncate">
                  {book.compiler}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="হাদিস নম্বর, বর্ণনাকারী বা শব্দ খুঁজুন (যেমন: নিয়ত, পিতা-মাতা, সালাত)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500"
          />
        </div>

        {/* Topic dropdown / horizontal tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="h-4 w-4 text-stone-400 shrink-0 hidden sm:block" />
          <div className="flex gap-1.5">
            {HADITH_TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Hadith List Cards */}
      <div className="space-y-6">
        {filteredHadiths.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
            <BookOpen className="mx-auto h-8 w-8 text-stone-400" />
            <h4 className="mt-3 text-base font-semibold text-stone-800 dark:text-stone-200">কোনো হাদিস পাওয়া যায়নি</h4>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              ভিন্ন কোনো শব্দ বা হাদিস নম্বর দিয়ে অনুসন্ধান করুন অথবা ফিল্টার পরিবর্তন করুন।
            </p>
          </div>
        ) : (
          filteredHadiths.map((hadith) => {
            const bookmarked = isBookmarked(`hadith-${hadith.id}`);
            const isSpeaking = speakingId === hadith.id;

            return (
              <article
                key={hadith.id}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
              >
                {/* Hadith Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3.5 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300">
                      {hadith.bookNameBangla}
                    </span>
                    <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="text-stone-500 dark:text-stone-400">হাদিস নং {hadith.hadithNumber}</span>
                    <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="text-stone-500 dark:text-stone-400">{hadith.chapterBangla}</span>
                    <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                      মানঃ {hadith.grade}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSpeakArabic(hadith)}
                      className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-colors ${
                        isSpeaking
                          ? 'bg-emerald-800 text-white'
                          : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                      }`}
                      title={isSpeaking ? 'থামান' : 'আরবি পাঠ শুনুন'}
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{isSpeaking ? 'থামুন' : 'শুনুন'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyHadith(hadith)}
                      className="rounded-md p-1.5 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
                      title="হাদিস কপি করুন"
                    >
                      {copiedId === hadith.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onAddBookmark({
                        type: 'hadith',
                        title: `${hadith.bookNameBangla}, হাদিস ${hadith.hadithNumber}`,
                        subtitle: hadith.banglaText.slice(0, 65) + '...',
                        referenceId: `hadith-${hadith.id}`,
                        arabicSnippet: hadith.arabicText.slice(0, 50) + '...'
                      })}
                      className={`rounded-md p-1.5 transition-colors ${
                        bookmarked
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={bookmarked ? 'বুকমার্কে আছে' : 'বুকমার্ক করুন'}
                    >
                      <BookmarkIcon className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Narrator */}
                <div className="mt-3 text-xs font-semibold text-emerald-950 dark:text-emerald-300">
                  {hadith.narrator}
                </div>

                {/* Arabic Text */}
                <div 
                  className="font-arabic py-4 text-right text-black font-semibold text-xl sm:text-2xl leading-loose"
                  dir="rtl"
                >
                  {hadith.arabicText}
                </div>

                {/* Bengali Translation */}
                <div className="border-t border-stone-200 pt-3 text-sm sm:text-base leading-relaxed text-black font-medium font-bangla">
                  {hadith.banglaText}
                </div>

                {/* English Translation */}
                {hadith.englishText && (
                  <div className="mt-2 text-xs text-stone-800 leading-relaxed font-sans">
                    {hadith.englishText}
                  </div>
                )}

                {/* Hadith Commentary & Life Lessons */}
                {hadith.explanation && (
                  <div className="mt-4 rounded-lg bg-stone-50 p-3.5 text-xs text-stone-700 dark:bg-stone-800/60 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800">
                    <span className="font-semibold text-emerald-900 dark:text-emerald-300">হাদিসের শিক্ষা ও তাৎপর্যঃ </span>
                    <span>{hadith.explanation}</span>
                  </div>
                )}

                {/* Reference footer */}
                <div className="mt-3 text-[11px] text-stone-500 dark:text-stone-400">
                  মূল তথ্যসূত্রঃ {hadith.reference}
                </div>
              </article>
            );
          })
        )}
      </div>

    </div>
  );
};
