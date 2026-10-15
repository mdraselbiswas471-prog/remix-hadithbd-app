import React, { useState, useEffect } from 'react';
import { EXERCISE_BOOK_INFO, EXERCISE_GUIDES, WORKOUT_SCHEDULE } from '../data/exerciseBook';
import { ExerciseGuide } from '../types';
import { Activity, Clock, Play, Pause, RotateCcw, AlertCircle, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export const PhysicalExerciseSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব ব্যায়াম');
  const [activeExercise, setActiveExercise] = useState<ExerciseGuide>(EXERCISE_GUIDES[0]);

  // Workout Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [initialTimer, setInitialTimer] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Soft audio chime
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = (sec: number) => {
    setInitialTimer(sec);
    setTimerSeconds(sec);
    setIsTimerRunning(true);
  };

  const categories = [
    "সব ব্যায়াম",
    "ফ্রি-হ্যান্ড",
    "কোর ও পেট",
    "স্ট্রেচিং ও ব্যথা নিরাময়",
    "কার্ডিও ও হাঁটা",
    "শ্বাসপ্রশ্বাস"
  ];

  const filteredExercises = EXERCISE_GUIDES.filter(ex =>
    selectedCategory === 'সব ব্যায়াম' || ex.category === selectedCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
            সুস্থ দেহ ও প্রশান্ত মন
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {EXERCISE_BOOK_INFO.titleBangla}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {EXERCISE_BOOK_INFO.subtitle}
          </p>

          <div className="mt-4 rounded-xl bg-emerald-50/70 p-3.5 text-xs text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/40">
            <strong className="block font-semibold mb-0.5">সুন্নাহ ও হাদিসঃ </strong>
            <span>{EXERCISE_BOOK_INFO.propheticGuidance}</span>
          </div>
        </div>
      </div>

      {/* Interactive Workout Timer Strip */}
      <div className="mb-8 rounded-xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
            ইন্টারঅ্যাক্টিভ ব্যায়াম টাইমার
          </span>
          <div className="text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
            প্রতিটি সেটের জন্য কাউন্টডাউন
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-4xl font-mono font-bold text-stone-900 dark:text-stone-50 tabular-nums">
            00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 transition-colors"
            >
              {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isTimerRunning ? 'বিরতি' : 'শুরু'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(initialTimer);
              }}
              className="rounded-lg border border-stone-200 p-2 text-stone-600 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300"
              title="রিসেট"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <div className="flex gap-1 text-xs">
              <button 
                onClick={() => handleStartTimer(30)}
                className="px-2 py-1 rounded border border-stone-200 hover:bg-stone-100 dark:border-stone-700"
              >
                ৩০সে.
              </button>
              <button 
                onClick={() => handleStartTimer(45)}
                className="px-2 py-1 rounded border border-stone-200 hover:bg-stone-100 dark:border-stone-700"
              >
                ৪৫সে.
              </button>
              <button 
                onClick={() => handleStartTimer(60)}
                className="px-2 py-1 rounded border border-stone-200 hover:bg-stone-100 dark:border-stone-700"
              >
                ৬০সে.
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-600 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredExercises.map((ex) => (
          <article
            key={ex.id}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:border-emerald-600/60 transition-all dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                  {ex.category}
                </span>
                <span className="text-xs bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-600 dark:text-stone-300">
                  {ex.duration}
                </span>
              </div>

              <h3 className="text-lg font-bold text-black mt-2">
                {ex.titleBangla}
              </h3>

              <div className="mt-1 text-xs text-stone-700">
                লক্ষ্য অংশঃ {ex.targetArea}
              </div>

              {/* Instructions steps */}
              <div className="mt-4">
                <strong className="block text-xs font-bold text-black mb-1.5">
                  সঠিক পদ্ধতি ও নিয়মঃ
                </strong>
                <ol className="space-y-1.5 text-xs text-stone-900 list-decimal pl-4">
                  {ex.instructions.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Breathing rule */}
              <div className="mt-3 rounded-lg bg-stone-50 p-3 text-xs text-stone-900 border border-stone-200">
                <strong className="text-black block mb-0.5">
                  শ্বাসপ্রশ্বাসের সঠিক নিয়মঃ
                </strong>
                {ex.breathingTechnique}
              </div>

              {/* Benefits */}
              <div className="mt-3">
                <strong className="block text-xs font-bold text-black mb-1">
                  উপকারিতাসমূহঃ
                </strong>
                <ul className="space-y-1 text-xs text-stone-900">
                  {ex.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Precaution */}
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>সতর্কতাঃ {ex.precautions}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Weekly Workout Routine Table */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-emerald-800 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            সাপ্তাহিক ঘরে বসে ফ্রি-হ্যান্ড শরীরচর্চা চার্ট
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 dark:border-stone-800">
                <th className="py-2.5 pr-4 font-semibold">বার (দিন)</th>
                <th className="py-2.5 pr-4 font-semibold">মূল লক্ষ্য</th>
                <th className="py-2.5 pr-4 font-semibold">ব্যায়ামসমূহ</th>
                <th className="py-2.5 font-semibold text-right">সময়কাল</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {WORKOUT_SCHEDULE.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                  <td className="py-3 pr-4 font-bold text-emerald-950 dark:text-emerald-200">{item.day}</td>
                  <td className="py-3 pr-4 text-stone-700 dark:text-stone-300">{item.focus}</td>
                  <td className="py-3 pr-4 text-stone-600 dark:text-stone-400">{item.exercises}</td>
                  <td className="py-3 text-right font-medium text-stone-900 dark:text-stone-100 tabular-nums">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
