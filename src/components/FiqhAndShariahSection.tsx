import React, { useState } from 'react';
import { FIQH_TOPICS, GOVERNANCE_AND_STATECRAFT } from '../data/fiqhAndShariah';
import { Scale, BookOpen, ShieldCheck, CheckCircle, AlertTriangle, Search, ChevronDown, ChevronUp } from 'lucide-react';

export const FiqhAndShariahSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'fiqh' | 'governance'>('fiqh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string>(FIQH_TOPICS[0].id);

  const filteredFiqh = FIQH_TOPICS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGovernance = GOVERNANCE_AND_STATECRAFT.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subheading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.practicalApplication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 text-black shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200 mb-3">
          <Scale className="h-3.5 w-3.5 text-emerald-800" />
          শরিয়া আইন ও সমাজ পরিচালনা
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black font-bangla mb-3">
          ফিকাহ শাস্ত্র, ইসলামিক আইন ও রাষ্ট্রব্যবস্থা
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-stone-800 leading-relaxed font-bangla font-normal">
          দৈনন্দিন ইবাদতের শরয়ী ফিকাহ বিধান এবং আল-কুরআনের আলোকে কীভাবে ইনসাফভিত্তিক সমাজব্যবস্থা ও জনকল্যাণমুখী রাষ্ট্র পরিচালনা করতে হয় তার প্রামাণ্য রূপরেখা।
        </p>

        {/* Sub-tab Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200 pt-4">
          <button
            onClick={() => setActiveSubTab('fiqh')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'fiqh'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            ফিকাহ শাস্ত্র ও ব্যবহারিক বিধান
          </button>
          <button
            onClick={() => setActiveSubTab('governance')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'governance'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            কুরআনের আলোকে সমাজ ও রাষ্ট্রব্যবস্থা
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={activeSubTab === 'fiqh' ? "ফিকাহ বিষয় খুঁজুন (যেমন: অজু, নামাজ, যাকাত, হালাল)..." : "সমাজ ও রাষ্ট্রনীতি খুঁজুন (যেমন: শূরা, ন্যায়বিচার, বায়তুল মাল)..."}
          className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
        />
      </div>

      {/* SUBTAB 1: Fiqh Topics */}
      {activeSubTab === 'fiqh' && (
        <div className="space-y-4">
          {filteredFiqh.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            return (
              <div
                key={topic.id}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all dark:border-stone-800 dark:bg-stone-900 shadow-sm"
              >
                <button
                  onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-850/50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="inline-block text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {topic.category}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-bangla">
                      {topic.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-1">
                      {topic.summary}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-stone-200/80 p-5 sm:p-6 space-y-6 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/60">
                    {/* Quran / Hadith Reference Box */}
                    <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-4 dark:border-emerald-800/80 dark:bg-emerald-950/30">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                        <BookOpen className="h-4 w-4" />
                        কুরআন ও হাদিসের মূল দলিল
                      </div>
                      <p className="text-sm text-emerald-950 dark:text-emerald-200 font-bangla leading-relaxed">
                        {topic.quranHadithReference}
                      </p>
                    </div>

                    {/* Farz Rules */}
                    {topic.farzRules && topic.farzRules.length > 0 && (
                      <div className="space-y-2.5">
                        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          ফরজসমূহ (বাধ্যতামূলক রুকন)
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {topic.farzRules.map((r, i) => (
                            <div key={i} className="text-sm bg-white p-3 rounded-lg border border-stone-200 dark:bg-stone-850 dark:border-stone-800 text-stone-800 dark:text-stone-200">
                              {r}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Wajib & Sunnah */}
                    {((topic.wajibRules && topic.wajibRules.length > 0) || (topic.sunnahRules && topic.sunnahRules.length > 0)) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {topic.wajibRules && topic.wajibRules.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                              ওয়াজিব বিষয়সমূহ
                            </h3>
                            <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300">
                              {topic.wajibRules.map((w, wi) => (
                                <li key={wi} className="bg-white dark:bg-stone-850 p-2 rounded border border-stone-200 dark:border-stone-800">
                                  • {w}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {topic.sunnahRules && topic.sunnahRules.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                              সুন্নাত ও মুস্তাহাব
                            </h3>
                            <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300">
                              {topic.sunnahRules.map((s, si) => (
                                <li key={si} className="bg-white dark:bg-stone-850 p-2 rounded border border-stone-200 dark:border-stone-800">
                                  • {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Nullifiers / যা যা করলে নষ্ট হয় */}
                    {topic.nullifiers && topic.nullifiers.length > 0 && (
                      <div className="rounded-xl border border-red-200/80 bg-red-50/60 p-4 dark:border-red-900/60 dark:bg-red-950/20">
                        <div className="flex items-center gap-2 text-xs font-bold text-red-800 dark:text-red-300 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          বাতিলকারী কারণসমূহ (যা দ্বারা ভঙ্গ হয়)
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-900 dark:text-red-200 font-bangla">
                          {topic.nullifiers.map((nullifier, ni) => (
                            <li key={ni} className="flex items-start gap-1.5">
                              <span className="font-bold">•</span>
                              <span>{nullifier}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Practical Guidelines */}
                    {topic.practicalGuidelines && topic.practicalGuidelines.length > 0 && (
                      <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-850">
                        <h3 className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wider">
                          ব্যবহারিক ও সমকালীন দিকনির্দেশনা
                        </h3>
                        <ul className="text-xs space-y-1.5 text-stone-600 dark:text-stone-300">
                          {topic.practicalGuidelines.map((g, gi) => (
                            <li key={gi} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SUBTAB 2: Governance & Statecraft */}
      {activeSubTab === 'governance' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs sm:text-sm text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200">
            <strong>ঐতিহাসিক পটভূমি:</strong> রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম মদীনায় হিজরত করে 'মদীনা সনদ' প্রণয়নের মাধ্যমে পৃথিবীর প্রথম লিখিত সংবিধান ও কল্যাণকামী বহুত্ববাদী রাষ্ট্র কায়েম করেছিলেন।
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGovernance.map((gov) => (
              <div
                key={gov.id}
                className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-bangla">
                      {gov.title}
                    </h2>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                      {gov.subheading}
                    </p>
                  </div>

                  {/* Quranic basis */}
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
                    <p className="text-right text-base font-serif text-emerald-950 dark:text-emerald-200" dir="rtl">
                      {gov.quranicFoundation.arabic}
                    </p>
                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 font-bangla">
                      "{gov.quranicFoundation.bangla}"
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                      — {gov.quranicFoundation.ref}
                    </span>
                  </div>

                  {/* Core principles */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      মৌলিক রাষ্ট্রীয় স্তম্ভসমূহ:
                    </h3>
                    <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300 font-bangla">
                      {gov.principles.map((p, pi) => (
                        <li key={pi} className="flex items-start gap-2 bg-stone-50 dark:bg-stone-850 p-2.5 rounded-lg border border-stone-150 dark:border-stone-800">
                          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <span className="leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical application */}
                <div className="mt-5 border-t border-stone-200/80 pt-3 dark:border-stone-800">
                  <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">
                    বাস্তবায়ন ক্ষেত্র:
                  </span>
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200 mt-0.5 font-bangla">
                    {gov.practicalApplication}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
