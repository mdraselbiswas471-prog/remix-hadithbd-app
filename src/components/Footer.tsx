import React from 'react';
import { BookOpen, Heart, UserCheck, MessageSquare } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSurah: (num: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectSurah }) => {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white py-12 text-black transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-800 text-amber-200">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-base font-bold">Hadith BD & Al Quran</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-bangla">
              আল-কুরআন, সহীহ হাদিস, আর-রাহীকুল মাখতূম, শামায়েলে তিরমিযী, কুরআন শিক্ষাশাস্ত্র, ফিকাহ ও শরিয়া বিধান, কিয়ামতের আলামত, ওয়ার্ল্ড অ্যাফেয়ার্স, ভেষজ পুষ্টি ও সুন্নাহভিত্তিক শারীরিক ব্যায়ামের সমন্বিত ডিজিটাল প্ল্যাটফর্ম।
            </p>
            <div className="rounded-xl border border-stone-200 bg-white/80 p-3.5 dark:border-stone-800 dark:bg-stone-850/80 text-xs font-bangla">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                <UserCheck className="h-4 w-4 text-emerald-700" />
                সংগ্রহকারী ও প্রস্তুতকারী:
              </div>
              <p className="text-stone-700 dark:text-stone-300">
                <strong>মোঃ রাসেল বিশ্বাস</strong>, শৈলকুপা, ঝিনাইদাহ।
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                মানব জীবনের মুক্তির পথ প্রদর্শনের লক্ষ্যে এবং যুবসমাজকে সোশ্যাল মিডিয়ার মোহমুক্ত করে দ্বীনের দাওয়াতে উদ্বুদ্ধ করতে সম্পূর্ণ মানবিক উদ্দেশ্যে নিবেদিত।
              </p>
              <button
                onClick={() => setActiveTab('curator-comments')}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-100 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                নীতিবাচক উক্তি ও মন্তব্য ফোরাম দেখুন →
              </button>
            </div>
          </div>

          {/* Quran, Hadith & Seerat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              কুরআন, হাদিস ও সীরাত
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400 font-bangla">
              <li>
                <button 
                  onClick={() => { setActiveTab('quran'); onSelectSurah(1); }}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  আল-কুরআনুল কারীম (১১৪ সূরা)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('quran-education')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left font-medium text-emerald-900 dark:text-emerald-300"
                >
                  কুরআন শিক্ষাশাস্ত্র (তাজবীদ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('hadith')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  হাদিস গ্রন্থাবলী (বুখারী ও মুসলিম)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('shamayel')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left font-medium text-amber-800 dark:text-amber-400"
                >
                  শামায়েলে তিরমিযী
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('prophets')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  ২৫ জন নবীর পূর্ণাঙ্গ জীবনী
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('seerat')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  আর-রাহীকুল মাখতূম
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('quiz')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left font-semibold text-emerald-900 dark:text-emerald-300"
                >
                  ইসলামিক কুইজ ও জ্ঞান চর্চা
                </button>
              </li>
            </ul>
          </div>

          {/* Shariah, Qiyamah & Ummah */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              শরিয়া, আখিরাত ও উম্মাহ
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400 font-bangla">
              <li>
                <button 
                  onClick={() => setActiveTab('fiqh-shariah')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  ফিকাহ শাস্ত্র ও ব্যবহারিক বিধান
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('fiqh-shariah')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left font-medium text-emerald-800 dark:text-emerald-300"
                >
                  কুরআনের আলোকে সমাজ ও রাষ্ট্র
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('qiyamah')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  কিয়ামতের আলামত ফোল্ডার
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('world-affairs')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  ওয়ার্ল্ড অ্যাফেয়ার্স ও যুবসমাজ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('curator-comments')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  প্রস্তুতকারীর উক্তি ও কমেন্ট বক্স
                </button>
              </li>
            </ul>
          </div>

          {/* Health, Herbs & Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              স্বাস্থ্য, ভেষজ ও ইবাদত
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400 font-bangla">
              <li>
                <button 
                  onClick={() => setActiveTab('herbs')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  ভেষজ উদ্ভিদের ঔষধি গুণ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('ayurveda')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  আয়ুর্বেদিক স্বাস্থ্য জিজ্ঞাসা
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('exercise')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  শারীরিক ব্যায়াম বই
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('prayer')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  নামাজের সময়সূচি ও কিবলা
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('tasbih')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  ডিজিটাল তাসবীহ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('duas')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors text-left"
                >
                  হিসনুল মুসলিম ও প্রতিদিনের দোয়া
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-10 border-t border-stone-200/60 pt-6 text-center text-xs text-stone-500 dark:border-stone-800/60 dark:text-stone-400 font-bangla">
          <p>© {new Date().getFullYear()} Hadith BD & Al Quran. সংকলন ও সার্বিক প্রস্তুতকারক: মোঃ রাসেল বিশ্বাস (শৈলকুপা, ঝিনাইদাহ)। সম্পূর্ণ মানবিক ও সদকায়ে জারিয়ার উদ্দেশ্যে নিবেদিত।</p>
        </div>
      </div>
    </footer>
  );
};
