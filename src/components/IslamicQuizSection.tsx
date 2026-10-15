import React, { useState, useMemo } from 'react';
import { ISLAMIC_QUIZ_QUESTIONS } from '../data/islamicQuiz';
import { QuizCategory, QuizQuestion } from '../types';
import { 
  HelpCircle, CheckCircle2, XCircle, RotateCcw, 
  BookOpen, Sparkles, Trophy, Award, Check, 
  ChevronRight, ArrowRight, BookCheck, Shuffle, Filter
} from 'lucide-react';

export const IslamicQuizSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [isStudyMode, setIsStudyMode] = useState<boolean>(false);
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);

  // Filter questions by selected category
  const activeQuestions: QuizQuestion[] = useMemo(() => {
    let list = selectedCategory === 'all' 
      ? ISLAMIC_QUIZ_QUESTIONS 
      : ISLAMIC_QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);
    
    if (shuffleSeed > 0) {
      // Create shuffled clone
      const cloned = [...list];
      for (let i = cloned.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
      }
      return cloned;
    }
    return list;
  }, [selectedCategory, shuffleSeed]);

  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const totalQuestions = activeQuestions.length;

  const currentSelectedOption = selectedAnswers[currentQuestionIndex];
  const hasAnsweredCurrent = currentSelectedOption !== undefined;

  // Handle option click
  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent re-answering
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
    setShowExplanation(true);
  };

  // Next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(selectedAnswers[currentQuestionIndex + 1] !== undefined);
    } else {
      setQuizCompleted(true);
    }
  };

  // Previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(true);
    }
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
    setShuffleSeed(prev => prev + 1);
  };

  // Calculate scores
  const scoreStats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    Object.entries(selectedAnswers).forEach(([qIdxStr, chosenOption]) => {
      const qIdx = parseInt(qIdxStr, 10);
      const q = activeQuestions[qIdx];
      if (q) {
        if (chosenOption === q.correctAnswerIndex) {
          correct++;
        } else {
          wrong++;
        }
      }
    });
    const answeredCount = Object.keys(selectedAnswers).length;
    const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
    return { correct, wrong, answeredCount, percentage };
  }, [selectedAnswers, activeQuestions, totalQuestions]);

  const categories: { key: QuizCategory; label: string; count: number }[] = [
    { key: 'all', label: 'সকল বিষয়', count: ISLAMIC_QUIZ_QUESTIONS.length },
    { key: 'quran', label: 'আল-কুরআন', count: ISLAMIC_QUIZ_QUESTIONS.filter(q => q.category === 'quran').length },
    { key: 'hadith', label: 'হাদিস শরিফ', count: ISLAMIC_QUIZ_QUESTIONS.filter(q => q.category === 'hadith').length },
    { key: 'seerat', label: 'সীরাতুন্নবী (সা.)', count: ISLAMIC_QUIZ_QUESTIONS.filter(q => q.category === 'seerat').length },
    { key: 'prophets', label: '২৫ নবীর জীবনী', count: ISLAMIC_QUIZ_QUESTIONS.filter(q => q.category === 'prophets').length },
    { key: 'fiqh', label: 'ফিকহ ও শরীয়াহ', count: ISLAMIC_QUIZ_QUESTIONS.filter(q => q.category === 'fiqh').length },
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Eye-friendly Header Bar */}
      <section className="border-b border-neutral-200 bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>সক্রিয় ইসলামি জ্ঞান চর্চা ও সক্রিয় মূল্যায়ন</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-2">
            ইসলামিক কুইজ ও জ্ঞান চর্চা
          </h1>
          <p className="text-neutral-700 text-base max-w-2xl mx-auto leading-relaxed">
            পবিত্র আল-কুরআনের তথ্য, প্রামাণ্য হাদিস, সীরাতুন্নবী (সা.) এবং নবীগণের জীবনী বিষয়ে নিজের জ্ঞান যাচাই করুন ও সহীহ তথ্যসূত্রসহ নতুন বিষয় শিখুন।
          </p>

          {/* Mode Switcher */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => { setIsStudyMode(false); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition border ${
                !isStudyMode 
                  ? 'bg-black text-white border-black shadow-sm' 
                  : 'bg-white text-black border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>ইন্টারেক্টিভ কুইজ টেস্ট</span>
            </button>
            <button
              onClick={() => { setIsStudyMode(true); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition border ${
                isStudyMode 
                  ? 'bg-black text-white border-black shadow-sm' 
                  : 'bg-white text-black border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <BookCheck className="w-4 h-4" />
              <span>স্টাডি গাইড ও সমাধান কোষ ({ISLAMIC_QUIZ_QUESTIONS.length}টি প্রশ্ন)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-neutral-200 scrollbar-none">
          <Filter className="w-4 h-4 text-neutral-500 shrink-0 mr-1" />
          {categories.map(cat => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setShowExplanation(false);
                  setQuizCompleted(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100 hover:text-black'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* Study Mode (View All Questions with Answers) */}
        {isStudyMode ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-black text-base">জ্ঞান ভাণ্ডার ও স্টাডি গাইড</h3>
                <p className="text-xs text-neutral-600 mt-0.5">সবগুলো প্রশ্নের সঠিক উত্তর ও প্রামাণ্য তথ্যসূত্র একসাথে পাঠ করুন</p>
              </div>
              <button
                onClick={() => setIsStudyMode(false)}
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition"
              >
                পরীক্ষা দিন
              </button>
            </div>

            <div className="space-y-4">
              {activeQuestions.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-400 transition shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      প্রশ্ন নং {idx + 1} • {q.categoryNameBangla}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      রেফারেন্স: {q.reference}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-black mb-3">
                    {q.question}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswerIndex;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg text-sm border flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 font-semibold border-emerald-400'
                              : 'bg-white text-neutral-700 border-neutral-200'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs text-neutral-800 leading-relaxed">
                    <strong className="text-black block mb-1">ব্যাখ্যা ও প্রেক্ষাপট:</strong>
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : quizCompleted ? (
          /* ================= QUIZ COMPLETED SUMMARY ================= */
          <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-10 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
              মাশাআল্লাহ! আপনি কুইজ সম্পন্ন করেছেন
            </h2>
            <p className="text-neutral-700 text-sm max-w-md mx-auto mb-6">
              ইসলামি জ্ঞানের সক্রিয় চর্চায় আপনার এই প্রচেষ্টা আল্লাহ কবুল করুন এবং ইলমে নাফে (উপকারী জ্ঞান) বৃদ্ধি করুন।
            </p>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs text-neutral-500 font-medium block mb-1">মোট প্রশ্ন</span>
                <span className="text-2xl font-bold text-black">{totalQuestions}</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-700 font-medium block mb-1">সঠিক উত্তর</span>
                <span className="text-2xl font-bold text-emerald-800">{scoreStats.correct}</span>
              </div>
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <span className="text-xs text-red-600 font-medium block mb-1">ভুল উত্তর</span>
                <span className="text-2xl font-bold text-red-700">{scoreStats.wrong}</span>
              </div>
            </div>

            {/* Percentage Badge */}
            <div className="inline-block px-5 py-2 rounded-full bg-black text-white text-sm font-bold mb-8">
              অর্জন: {scoreStats.percentage}% নির্ভুলতা
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleResetQuiz}
                className="px-6 py-2.5 rounded-xl bg-black text-white text-sm font-bold hover:bg-neutral-800 transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>পুনরায় কুইজ শুরু করুন</span>
              </button>
              <button
                onClick={() => setIsStudyMode(true)}
                className="px-6 py-2.5 rounded-xl bg-white text-black border border-neutral-300 text-sm font-semibold hover:bg-neutral-100 transition flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>সকল সমাধান পর্যালোচনা করুন</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= ACTIVE INTERACTIVE QUIZ CARD ================= */
          <div>
            {/* Top Progress & Stats */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  প্রশ্ন {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-black border border-neutral-200">
                  {currentQ.categoryNameBangla}
                </span>
              </div>

              {/* Running Score Ticker */}
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  সঠিক: {scoreStats.correct}
                </span>
                <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  ভুল: {scoreStats.wrong}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-100 rounded-full h-2 mb-6 overflow-hidden border border-neutral-200">
              <div 
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Box */}
            <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-xs mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-6 leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  const isSelected = currentSelectedOption === idx;
                  const isCorrect = idx === currentQ.correctAnswerIndex;
                  
                  let optionStyle = "border-neutral-200 hover:border-neutral-400 bg-white text-black";
                  let badge = (
                    <span className="w-7 h-7 rounded-full border border-neutral-300 text-xs font-bold flex items-center justify-center text-neutral-700 bg-neutral-50">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  );

                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                      badge = (
                        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </span>
                      );
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-red-400 bg-red-50 text-red-950";
                      badge = (
                        <span className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center">
                          <XCircle className="w-4 h-4" />
                        </span>
                      );
                    } else {
                      optionStyle = "border-neutral-200 bg-neutral-50/50 text-neutral-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-sm sm:text-base font-medium ${optionStyle}`}
                    >
                      <span className="flex-1 leading-normal">{option}</span>
                      {badge}
                    </button>
                  );
                })}
              </div>

              {/* Answer Feedback & Explanation */}
              {hasAnsweredCurrent && (
                <div className={`p-4 sm:p-5 rounded-xl border mb-6 text-sm leading-relaxed transition ${
                  currentSelectedOption === currentQ.correctAnswerIndex
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-neutral-50 border-neutral-300 text-black'
                }`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                    {currentSelectedOption === currentQ.correctAnswerIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-800">সঠিক উত্তর! আলহামদুলিল্লাহ</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-red-700">ভুল উত্তর। সঠিক উত্তর: {currentQ.options[currentQ.correctAnswerIndex]}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-800 mb-2 font-normal">
                    <strong className="text-black">প্রামাণ্য ব্যাখ্যা: </strong>
                    {currentQ.explanation}
                  </p>

                  <div className="text-xs text-neutral-600 font-semibold">
                    তথ্যসূত্র: <span className="text-black">{currentQ.reference}</span>
                  </div>
                </div>
              )}

              {/* Card Bottom Nav */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  পূর্ববর্তী
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetQuiz}
                    className="p-2 text-neutral-500 hover:text-black border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
                    title="কুইজ রিস্টার্ট ও প্রশ্ন এলোমেলো করুন"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={!hasAnsweredCurrent}
                    className="px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{currentQuestionIndex < totalQuestions - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
