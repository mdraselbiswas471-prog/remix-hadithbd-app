import React, { useState } from 'react';
import { SURAH_LIST } from '../data/surahs';
import { HADITH_DATABASE } from '../data/hadiths';
import { DUAS_DATABASE } from '../data/duas';
import { PROPHETS_DATABASE } from '../data/prophetsData';
import { SEERAT_CHAPTERS } from '../data/seeratBook';
import { HERBAL_PLANTS, VEGETABLES_NUTRITION, FRUITS_NUTRITION } from '../data/herbsAndNutrition';
import { EXERCISE_GUIDES } from '../data/exerciseBook';
import { SHAMAYEL_HADITHS } from '../data/shamayelTirmidhi';
import { QIYAMAH_SIGNS } from '../data/qiyamahSigns';
import { ISLAMIC_QUIZ_QUESTIONS } from '../data/islamicQuiz';
import { Search, X, BookOpen, ChevronRight, Leaf, Apple, Activity, Award, UserCheck, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSurah: (surahNumber: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSurah,
  setActiveTab
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Surahs
  const matchingSurahs = trimmed.length > 0 
    ? SURAH_LIST.filter(s => 
        s.number.toString() === trimmed ||
        s.nameBangla.toLowerCase().includes(trimmed) ||
        s.nameEnglish.toLowerCase().includes(trimmed) ||
        s.meaningBangla.toLowerCase().includes(trimmed) ||
        s.nameArabic.includes(trimmed)
      ).slice(0, 4)
    : [];

  // Search 25 Prophets
  const matchingProphets = trimmed.length > 0
    ? PROPHETS_DATABASE.filter(p =>
        p.number.toString() === trimmed ||
        p.nameBangla.toLowerCase().includes(trimmed) ||
        p.nameEnglish.toLowerCase().includes(trimmed) ||
        p.titleBangla.toLowerCase().includes(trimmed) ||
        p.nameArabic.includes(trimmed)
      ).slice(0, 4)
    : [];

  // Search Hadiths
  const matchingHadiths = trimmed.length > 0
    ? HADITH_DATABASE.filter(h =>
        h.hadithNumber.toString() === trimmed ||
        h.banglaText.toLowerCase().includes(trimmed) ||
        h.narrator.toLowerCase().includes(trimmed) ||
        h.topic.toLowerCase().includes(trimmed) ||
        h.bookNameBangla.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  // Search Shamayel
  const matchingShamayel = trimmed.length > 0
    ? SHAMAYEL_HADITHS.filter(s =>
        s.chapter.toLowerCase().includes(trimmed) ||
        s.banglaTranslation.toLowerCase().includes(trimmed) ||
        s.hadithNumber.toString() === trimmed
      ).slice(0, 3)
    : [];

  // Search Qiyamah signs
  const matchingQiyamah = trimmed.length > 0
    ? QIYAMAH_SIGNS.filter(q =>
        q.title.toLowerCase().includes(trimmed) ||
        q.description.toLowerCase().includes(trimmed) ||
        (q.modernManifestation && q.modernManifestation.toLowerCase().includes(trimmed))
      ).slice(0, 3)
    : [];

  // Search Seerat
  const matchingSeerat = trimmed.length > 0
    ? SEERAT_CHAPTERS.filter(s =>
        s.titleBangla.toLowerCase().includes(trimmed) ||
        s.summary.toLowerCase().includes(trimmed) ||
        s.chapterNumber.toString() === trimmed
      ).slice(0, 3)
    : [];

  // Search Herbs
  const matchingHerbs = trimmed.length > 0
    ? HERBAL_PLANTS.filter(h =>
        h.nameBangla.toLowerCase().includes(trimmed) ||
        h.nameEnglish.toLowerCase().includes(trimmed) ||
        h.primaryBenefit.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  // Search Foods (Veggies & Fruits)
  const allFoods = [...VEGETABLES_NUTRITION, ...FRUITS_NUTRITION];
  const matchingFoods = trimmed.length > 0
    ? allFoods.filter(f =>
        f.nameBangla.toLowerCase().includes(trimmed) ||
        f.nameEnglish.toLowerCase().includes(trimmed) ||
        f.healthTags.some(t => t.toLowerCase().includes(trimmed))
      ).slice(0, 3)
    : [];

  // Search Exercises
  const matchingExercises = trimmed.length > 0
    ? EXERCISE_GUIDES.filter(e =>
        e.titleBangla.toLowerCase().includes(trimmed) ||
        e.category.toLowerCase().includes(trimmed) ||
        e.targetArea.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  // Search Duas
  const matchingDuas = trimmed.length > 0
    ? DUAS_DATABASE.filter(d =>
        d.title.toLowerCase().includes(trimmed) ||
        d.translation.toLowerCase().includes(trimmed) ||
        d.pronunciation.toLowerCase().includes(trimmed) ||
        d.category.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  // Search Quiz Questions
  const matchingQuiz = trimmed.length > 0
    ? ISLAMIC_QUIZ_QUESTIONS.filter(q =>
        q.question.toLowerCase().includes(trimmed) ||
        q.categoryNameBangla.toLowerCase().includes(trimmed) ||
        q.explanation.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const totalResults = 
    matchingSurahs.length + matchingProphets.length + matchingHadiths.length + 
    matchingShamayel.length + matchingQiyamah.length + matchingSeerat.length + 
    matchingHerbs.length + matchingFoods.length + matchingExercises.length + 
    matchingDuas.length + matchingQuiz.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/50 backdrop-blur-xs px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900 overflow-hidden font-bangla">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-stone-200 px-4 py-3.5 dark:border-stone-800">
          <Search className="h-5 w-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            placeholder="কুরআন, নবী জীবনী, শামায়েল, হাদিস, কিয়ামত, ভেষজ গাছ বা ব্যায়াম খুঁজুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none dark:text-stone-100 dark:placeholder-stone-500"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-stone-400 hover:text-stone-600">
              পরিষ্কার করুন
            </button>
          )}
          <button onClick={onClose} className="rounded-md p-1 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {trimmed.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-500 dark:text-stone-400">
              যেমন: 'আল-ফাতিহা', 'আদম (আ.)', 'মুসা (আ.)', 'শামায়েল', 'দাজ্জাল', 'বদর যুদ্ধ', 'তুলসী', 'কালোজিরা' লিখে খুঁজুন।
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center text-xs text-stone-500 dark:text-stone-400">
              "{query}" সম্পর্কিত কোনো ফলাফল পাওয়া যায়নি।
            </div>
          ) : (
            <>
              {/* Surahs */}
              {matchingSurahs.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5">
                    কুরআনের সূরা ({matchingSurahs.length})
                  </div>
                  <div className="space-y-1">
                    {matchingSurahs.map((s) => (
                      <button
                        key={s.number}
                        onClick={() => {
                          onSelectSurah(s.number);
                          setActiveTab('quran');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          সূরা {s.nameBangla} ({s.meaningBangla})
                        </span>
                        <span className="font-arabic text-sm text-stone-600 dark:text-stone-300">
                          {s.nameArabic}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Shamayel at-Tirmidhi */}
              {matchingShamayel.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>শামায়েলে তিরমিযী ({matchingShamayel.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingShamayel.map((sh) => (
                      <button
                        key={sh.id}
                        onClick={() => {
                          setActiveTab('shamayel');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {sh.chapter} (হাদিস #{sh.hadithNumber})
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{sh.banglaTranslation}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qiyamah Signs */}
              {matchingQiyamah.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400 mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>কিয়ামতের আলামত ({matchingQiyamah.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingQiyamah.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          setActiveTab('qiyamah');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {q.title}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{q.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 25 Prophets */}
              {matchingProphets.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    <span>২৫ জন নবীর জীবনী ({matchingProphets.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingProphets.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveTab('prophets');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {p.number}. {p.nameBangla} - {p.titleBangla}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{p.summary}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hadith */}
              {matchingHadiths.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5">
                    হাদিস সংকলন ({matchingHadiths.length})
                  </div>
                  <div className="space-y-1">
                    {matchingHadiths.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => {
                          setActiveTab('hadith');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {h.bookNameBangla} (হাদিস নং {h.hadithNumber})
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{h.banglaText}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Seerat Chapters */}
              {matchingSeerat.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5">
                    আর-রাহীকুল মাখতূম ({matchingSeerat.length})
                  </div>
                  <div className="space-y-1">
                    {matchingSeerat.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveTab('seerat');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          অধ্যায় {s.chapterNumber}: {s.titleBangla}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{s.summary}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Herbs & Nutrition */}
              {matchingHerbs.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    <span>ভেষজ উদ্ভিদ ({matchingHerbs.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingHerbs.map((herb) => (
                      <button
                        key={herb.id}
                        onClick={() => {
                          setActiveTab('herbs');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {herb.nameBangla} ({herb.nameEnglish})
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{herb.primaryBenefit}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Foods */}
              {matchingFoods.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <Apple className="h-3 w-3" />
                    <span>শাকসবজি ও ফল ({matchingFoods.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingFoods.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setActiveTab('herbs');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {f.nameBangla} ({f.type === 'fruit' ? 'ফল' : 'শাকসবজি'})
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{f.eatingTips}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercises */}
              {matchingExercises.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>শারীরিক ব্যায়াম বই ({matchingExercises.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingExercises.map((ex) => (
                      <button
                        key={ex.id}
                        onClick={() => {
                          setActiveTab('exercise');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {ex.titleBangla} ({ex.category})
                        </div>
                        <div className="text-[11px] text-stone-500">
                          লক্ষ্যঃ {ex.targetArea}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Duas */}
              {matchingDuas.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5">
                    দোয়া ও যিকির ({matchingDuas.length})
                  </div>
                  <div className="space-y-1">
                    {matchingDuas.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setActiveTab('duas');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">{d.title}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{d.translation}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Islamic Quiz */}
              {matchingQuiz.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <HelpCircle className="h-3 w-3 text-emerald-600" />
                    <span>ইসলামিক কুইজ প্রশ্ন ({matchingQuiz.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchingQuiz.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          setActiveTab('quiz');
                          onClose();
                        }}
                        className="w-full rounded-lg p-2 hover:bg-stone-100 text-left dark:hover:bg-stone-800"
                      >
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {q.question}
                        </div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">
                          {q.categoryNameBangla} • তথ্যসূত্র: {q.reference}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 bg-stone-50 px-4 py-2.5 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-800/50 flex items-center justify-between">
          <span>দ্রুত দেখতে ফলাফলে ক্লিক করুন</span>
          <span>ESC চাপুন</span>
        </div>

      </div>
    </div>
  );
};
