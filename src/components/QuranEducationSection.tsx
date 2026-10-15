import React, { useState } from 'react';
import { QURAN_EDUCATION_CHAPTERS } from '../data/quranEducation';
import { BookOpen, Sparkles, Volume2, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';

export const QuranEducationSection: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(QURAN_EDUCATION_CHAPTERS[0].id);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentLesson = QURAN_EDUCATION_CHAPTERS.find(l => l.id === selectedLessonId) || QURAN_EDUCATION_CHAPTERS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
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
      {/* Header Banner */}
      <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 text-black shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200 mb-3">
          <BookOpen className="h-3.5 w-3.5 text-emerald-800" />
          ইলমুত তাজবীদ ও কুরআন শিক্ষাশাস্ত্র
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black font-bangla mb-3">
          কুরআন শিক্ষাশাস্ত্র ও বিশুদ্ধ তিলাওয়াত প্রশিক্ষণ
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-stone-800 leading-relaxed font-bangla font-normal">
          তারতীলের সাথে কুরআন পাঠের অপরিহার্য বিধানাবলী, ১৭টি মাখরাজের নিখুঁত দিকনির্দেশনা, নূন সাকিন, মীম সাকিন ও মাদ্দের পূর্ণাঙ্গ নিয়মাবলী।
        </p>
      </div>

      {/* Main Grid: Lesson Sidebar & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation: Lessons List */}
        <div className="lg:col-span-4 space-y-2.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-1 mb-2">
            অধ্যায় ও পাঠপরিকল্পনা
          </h2>
          {QURAN_EDUCATION_CHAPTERS.map((lesson) => {
            const isSelected = lesson.id === selectedLessonId;
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonId(lesson.id)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-sm dark:bg-emerald-950/40 dark:border-emerald-500'
                    : 'bg-white border-stone-200/80 hover:bg-stone-50 hover:border-stone-300 dark:bg-stone-900 dark:border-stone-800 dark:hover:bg-stone-850'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    isSelected
                      ? 'bg-emerald-800 text-amber-200'
                      : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                  }`}>
                    {lesson.lessonNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold leading-tight font-bangla ${
                      isSelected ? 'text-emerald-950 dark:text-emerald-200' : 'text-stone-800 dark:text-stone-200'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
                      {lesson.subtitle}
                    </p>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-700 dark:text-emerald-400 translate-x-1' : 'text-stone-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Content: Active Lesson Detail */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            {/* Lesson Title Header */}
            <div className="border-b border-stone-200/80 pb-5 dark:border-stone-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                <span>পাঠ {currentLesson.lessonNumber}</span>
                <span>•</span>
                <span>বিশুদ্ধ তাজবীদ নিয়ম</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-bangla">
                {currentLesson.title}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                {currentLesson.subtitle}
              </p>
            </div>

            {/* Content paragraph */}
            <div className="py-6">
              <p className="text-base leading-relaxed text-stone-800 dark:text-stone-200 font-bangla whitespace-pre-line">
                {currentLesson.content}
              </p>
            </div>

            {/* Rules Section */}
            <div className="space-y-3 mb-8">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                মূল বিধি-বিধান ও অনুশীলনের নিয়ম
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {currentLesson.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl bg-stone-50 p-3.5 border border-stone-150 text-sm text-stone-800 dark:bg-stone-850 dark:border-stone-800 dark:text-stone-200 font-bangla"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arabic Examples with Audio & Copy */}
            {currentLesson.examples && currentLesson.examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  বাস্তব কুরআন উদাহরণ ও সহীহ উচ্চারণ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLesson.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 transition-all hover:border-emerald-300 dark:border-stone-800 dark:bg-stone-800/40"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-stone-200/60 pb-2 dark:border-stone-750">
                        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                          উদাহরণ {i + 1}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => playSpeech(ex.arabic)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-stone-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/40"
                            title="আরবী উচ্চারণ শুনুন"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCopy(`${ex.arabic}\n${ex.bangla}\n${ex.note}`)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-stone-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/40"
                            title="কপি করুন"
                          >
                            {copiedText?.includes(ex.arabic) ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Arabic script with font styling */}
                      <p className="text-right text-2xl font-serif text-emerald-950 dark:text-emerald-200 py-1" dir="rtl">
                        {ex.arabic}
                      </p>
                      <p className="text-xs font-bold text-stone-600 dark:text-stone-400 mt-2">
                        উচ্চারণ: <span className="text-stone-900 dark:text-stone-100 font-medium">{ex.bangla}</span>
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic">
                        পরামর্শ: {ex.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
