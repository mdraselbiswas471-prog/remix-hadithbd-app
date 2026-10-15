import React, { useState } from 'react';
import { WORLD_AFFAIRS_TOPICS } from '../data/worldAffairs';
import { Globe2, ShieldAlert, Sparkles, BookOpen, AlertCircle, Compass, Users } from 'lucide-react';

export const WorldAffairsSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(WORLD_AFFAIRS_TOPICS[0].id);

  const currentTopic = WORLD_AFFAIRS_TOPICS.find(t => t.id === selectedTopicId) || WORLD_AFFAIRS_TOPICS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 text-black shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900 border border-indigo-200 mb-3">
          <Globe2 className="h-3.5 w-3.5 text-indigo-800" />
          ওয়ার্ল্ড অ্যাফেয়ার্স ও মুসলিম উম্মাহ
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black font-bangla mb-3">
          বিশ্ব রাজনীতি, সোশ্যাল মিডিয়ার ফাঁদ ও যুবসমাজের জাগরণ
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-stone-800 leading-relaxed font-bangla font-normal">
          সোশ্যাল মিডিয়ার ভয়াল থাবা থেকে যুবসমাজের অস্তিত্ব রক্ষা, দুনিয়ার মোহ কাটিয়ে মুসলিম হিসেবে দ্বীনের দাওয়াত প্রচার এবং বর্তমান পৃথিবীর সংকটময় প্রেক্ষাপটে মুমিনের করণীয়।
        </p>
      </div>

      {/* Special Manifesto Callout for Muslim Youth */}
      <div className="mb-8 rounded-2xl border-2 border-amber-400/80 bg-amber-500/10 p-6 sm:p-8 dark:border-amber-600/80 dark:bg-amber-950/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-stone-950 font-bold shadow-md">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-2 font-bangla">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-amber-200">
              মুসলিম যুবসমাজের প্রতি বজ্রকণ্ঠ আহ্বান: "নিজের অস্তিত্ব ও ঈমান ভুলো না!"
            </h2>
            <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed">
              আজকে সোশ্যাল মিডিয়ার ভয়াল থাবা, কৃত্রিম রিলস ও দুনিয়ার চাকচিক্য কোটি কোটি যুবককে হিপনোটাইজ করে রেখেছে। মানুষ যখন ঘণ্টার পর ঘণ্টা ভার্চুয়াল মায়াজালে বুঁদ হয়ে থাকে, তখন সে ভুলে যায় যে সে এক মহান স্রষ্টার বান্দা, শেষ নবীর উম্মত এবং মানবতার দিশারী। আমাদের অবশ্যই সোশ্যাল মিডিয়ার প্রলোভন থেকে বাস্তব জীবনে ফিরে আসতে হবে এবং মুসলমান হিসেবে বুক ফুলিয়ে দ্বীনের দাওয়াত দিতে হবে!
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Topics Sidebar & Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Topic List */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-1 mb-2">
            বিষয়ভিত্তিক ফোল্ডারসমূহ
          </h2>
          {WORLD_AFFAIRS_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 shadow-sm dark:bg-indigo-950/40 dark:border-indigo-500 ring-1 ring-indigo-500'
                    : 'bg-white border-stone-200 hover:bg-stone-50 dark:bg-stone-900 dark:border-stone-800 dark:hover:bg-stone-850'
                }`}
              >
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400">
                  {topic.regionOrSubject}
                </span>
                <h3 className={`text-sm font-bold mt-1 font-bangla leading-tight ${
                  isSelected ? 'text-indigo-950 dark:text-indigo-100' : 'text-stone-900 dark:text-stone-100'
                }`}>
                  {topic.topic}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detailed Topic View */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900 space-y-6">
            <div className="border-b border-stone-200/80 pb-4 dark:border-stone-800">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                {currentTopic.regionOrSubject}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-bangla mt-1">
                {currentTopic.topic}
              </h2>
            </div>

            {/* Historical Context */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                ঐতিহাসিক পটভূমি
              </h3>
              <p className="text-sm text-stone-700 dark:text-stone-300 font-bangla leading-relaxed bg-stone-50 dark:bg-stone-850 p-4 rounded-xl border border-stone-150 dark:border-stone-800">
                {currentTopic.historicalContext}
              </p>
            </div>

            {/* Current Crisis */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4" />
                বর্তমান সংকট ও অদৃশ্য বিপদ
              </h3>
              <p className="text-sm text-stone-800 dark:text-stone-200 font-bangla leading-relaxed bg-red-50/50 dark:bg-red-950/20 p-4 rounded-xl border border-red-200/60 dark:border-red-900/40">
                {currentTopic.currentCrisis}
              </p>
            </div>

            {/* Islamic Guidance */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                কুরআন ও হাদিসের আলোকে সমাধান
              </h3>
              <p className="text-sm text-emerald-950 dark:text-emerald-200 font-bangla leading-relaxed bg-emerald-50/60 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60">
                {currentTopic.islamicGuidance}
              </p>
            </div>

            {/* Youth Responsibilities */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                মুমিন যুবসমাজের বাস্তবসম্মত দায়িত্ব ও অ্যাকশন প্ল্যান:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTopic.youthResponsibility.map((res, ri) => (
                  <div
                    key={ri}
                    className="flex items-start gap-2.5 rounded-xl border border-stone-200 bg-stone-50/80 p-3.5 text-xs sm:text-sm text-stone-800 dark:border-stone-800 dark:bg-stone-850 dark:text-stone-200 font-bangla"
                  >
                    <Compass className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
