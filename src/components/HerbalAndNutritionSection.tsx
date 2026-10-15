import React, { useState } from 'react';
import { HERBAL_PLANTS, VEGETABLES_NUTRITION, FRUITS_NUTRITION } from '../data/herbsAndNutrition';
import { HerbalPlant, FoodNutrition } from '../types';
import { Search, Sparkles, Leaf, Apple, Utensils, AlertCircle, Info, ChevronRight } from 'lucide-react';

export const HerbalAndNutritionSection: React.FC = () => {
  const [subTab, setSubTab] = useState<'herbs' | 'vegetables' | 'fruits'>('herbs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<HerbalPlant | null>(null);

  // Filter herbs
  const filteredHerbs = HERBAL_PLANTS.filter(h => 
    h.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.primaryBenefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.allBenefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter veggies
  const filteredVeggies = VEGETABLES_NUTRITION.filter(v =>
    v.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.healthTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
    v.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter fruits
  const filteredFruits = FRUITS_NUTRITION.filter(f =>
    f.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.healthTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
    f.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Editorial Header with Visual Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="p-6 sm:p-8 lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
              প্রাকৃতিক ভেষজ ও খাদ্য পুষ্টি তথ্যকোষ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              গাছের উপকারিতা, ব্যবহার বিধি ও শাকসবজি-ফলের পুষ্টিগুণ
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
              কালোজিরা, তুলসী, নিম, আমলকী সহ প্রাচীন ভেষজ উদ্ভিদের প্রামাণ্য ব্যবহার পদ্ধতি এবং সুস্থ জীবনের জন্য শাকসবজি ও ফলের ক্যালরি, ভিটামিন ও খনিজের পূর্ণাঙ্গ বিশ্বকোষ।
            </p>

            {/* Sub-tabs switchers */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSubTab('herbs')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  subTab === 'herbs'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                <Leaf className="h-4 w-4" />
                <span>ভেষজ উদ্ভিদ ও গাছের উপকারিতা</span>
              </button>

              <button
                onClick={() => setSubTab('vegetables')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  subTab === 'vegetables'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                <Utensils className="h-4 w-4" />
                <span>শাকসবজির পুষ্টিগুণ</span>
              </button>

              <button
                onClick={() => setSubTab('fruits')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  subTab === 'fruits'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                <Apple className="h-4 w-4" />
                <span>ফলমূলের পুষ্টিগুণ</span>
              </button>
            </div>
          </div>

          <div className="relative lg:col-span-5 h-48 sm:h-64 lg:h-full overflow-hidden">
            <img
              src="/src/assets/images/herbal_botanical_remedy_1792007555226.jpg"
              alt="Artisanal herbal medicine mortar with neem, tulsi, and amla"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white dark:lg:from-stone-900" />
          </div>

        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder={
              subTab === 'herbs'
                ? "ভেষজ গাছের নাম বা রোগ খুঁজুন (যেমন: তুলসী, নিম, আমলকী, সর্দি, গ্যাস্ট্রিক)..."
                : subTab === 'vegetables'
                ? "শাকসবজির নাম বা পুষ্টিগুণ খুঁজুন (যেমন: পালং শাক, করলা, ডায়াবেটিস, রক্তস্বল্পতা)..."
                : "ফলের নাম খুঁজুন (যেমন: খেজুর, পেয়ারা, ডালিম, হৃদরোগ)..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-500 shadow-xs"
          />
        </div>
      </div>

      {/* Tab 1: Herbal Plants */}
      {subTab === 'herbs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHerbs.map((plant) => (
            <article
              key={plant.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:border-emerald-600/60 transition-all dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3 dark:border-stone-800">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800">
                      {plant.category}
                    </span>
                    <h3 className="text-lg font-bold text-black mt-0.5">
                      {plant.nameBangla}
                    </h3>
                    <div className="text-xs text-stone-600 italic">
                      {plant.scientificName} · {plant.nameEnglish}
                    </div>
                  </div>

                  <span className="rounded-md bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-800 shrink-0">
                    {plant.partsUsed.join(', ')}
                  </span>
                </div>

                {/* Primary benefit */}
                <div className="mt-3 text-xs sm:text-sm font-semibold text-black">
                  মূল উপকারিতাঃ {plant.primaryBenefit}
                </div>

                {/* All benefits bullet list */}
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-black mb-1.5">
                    শারীরিক উপকারিতাসমূহঃ
                  </h4>
                  <ul className="space-y-1 text-xs text-stone-900">
                    {plant.allBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage Rules (ব্যবহার বিধি) */}
                <div className="mt-4 rounded-xl bg-stone-50 p-3.5 text-xs text-stone-900 border border-stone-200">
                  <strong className="block text-black font-bold mb-1">
                    ব্যবহার ও সেবন বিধিঃ
                  </strong>
                  <ul className="space-y-1">
                    {plant.usageRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-stone-400">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Islamic Prophetic Reference if available */}
                {plant.islamicReference && (
                  <div className="mt-3 rounded-lg bg-emerald-50/70 p-3 text-xs text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/40">
                    <strong className="font-semibold">ইসলামিক ও নববী তথ্যসূত্রঃ </strong>
                    <span>{plant.islamicReference}</span>
                  </div>
                )}
              </div>

              {/* Caution Footer */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>সতর্কতাঃ {plant.cautions}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Tab 2: Vegetables Nutrition */}
      {subTab === 'vegetables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVeggies.map((veg) => (
            <article
              key={veg.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:border-emerald-600/60 transition-all dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      {veg.nameBangla}
                    </h3>
                    <span className="text-xs text-stone-500">{veg.nameEnglish}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400 font-mono tabular-nums">
                      {veg.caloriesPer100g}
                    </span>
                    <span className="text-[10px] text-stone-500 block">ক্যালরি/১০০গ্রাম</span>
                  </div>
                </div>

                {/* Vitamins & Minerals */}
                <div className="mt-3 space-y-1.5 text-xs">
                  <div>
                    <strong className="text-stone-800 dark:text-stone-200">ভিটামিনসমূহঃ </strong>
                    <span className="text-stone-600 dark:text-stone-400">{veg.vitamins.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-stone-800 dark:text-stone-200">খনিজ লবণঃ </strong>
                    <span className="text-stone-600 dark:text-stone-400">{veg.minerals.join(', ')}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-3">
                  <strong className="block text-xs font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
                    প্রধান স্বাস্থ্য উপকারিতাঃ
                  </strong>
                  <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
                    {veg.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-700">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eating Tips */}
                <div className="mt-3 rounded-lg bg-stone-50 p-2.5 text-xs text-stone-700 dark:bg-stone-800/60 dark:text-stone-300">
                  <strong>খাওয়ার সঠিক নিয়মঃ </strong>{veg.eatingTips}
                </div>
              </div>

              {/* Health Tags */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-1 text-[11px] text-stone-500">
                {veg.healthTags.map((tag, idx) => (
                  <span key={idx} className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Tab 3: Fruits Nutrition */}
      {subTab === 'fruits' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFruits.map((fruit) => (
            <article
              key={fruit.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:border-emerald-600/60 transition-all dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      {fruit.nameBangla}
                    </h3>
                    <span className="text-xs text-stone-500">{fruit.nameEnglish}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400 font-mono tabular-nums">
                      {fruit.caloriesPer100g}
                    </span>
                    <span className="text-[10px] text-stone-500 block">ক্যালরি/১০০গ্রাম</span>
                  </div>
                </div>

                {/* Vitamins & Minerals */}
                <div className="mt-3 space-y-1.5 text-xs">
                  <div>
                    <strong className="text-stone-800 dark:text-stone-200">ভিটামিনসমূহঃ </strong>
                    <span className="text-stone-600 dark:text-stone-400">{fruit.vitamins.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-stone-800 dark:text-stone-200">খনিজ লবণঃ </strong>
                    <span className="text-stone-600 dark:text-stone-400">{fruit.minerals.join(', ')}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-3">
                  <strong className="block text-xs font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
                    প্রধান স্বাস্থ্য উপকারিতাঃ
                  </strong>
                  <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
                    {fruit.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-700">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eating Tips */}
                <div className="mt-3 rounded-lg bg-stone-50 p-2.5 text-xs text-stone-700 dark:bg-stone-800/60 dark:text-stone-300">
                  <strong>সঠিক নিয়মঃ </strong>{fruit.eatingTips}
                </div>
              </div>

              {/* Health Tags */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-1 text-[11px] text-stone-500">
                {fruit.healthTags.map((tag, idx) => (
                  <span key={idx} className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
