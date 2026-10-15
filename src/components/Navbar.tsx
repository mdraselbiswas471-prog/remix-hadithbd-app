import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Bookmark, Search, Moon, Sun, BookOpen, 
  ChevronDown, MessageSquare, Compass, ShieldAlert,
  Scale, Sparkles, HeartPulse, Menu, X, HelpCircle
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  bookmarksCount: number;
  openBookmarks: () => void;
  openSearch: () => void;
  theme: 'light' | 'parchment' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount,
  openBookmarks,
  openSearch,
  theme,
  toggleTheme
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; badge?: string; group: 'core' | 'knowledge' | 'health' | 'ummah' }[] = [
    { id: 'quran', label: 'আল-কুরআন', group: 'core' },
    { id: 'quran-education', label: 'কুরআন শিক্ষাশাস্ত্র', badge: 'নতুন', group: 'knowledge' },
    { id: 'hadith', label: 'হাদিস গ্রন্থাবলী', group: 'core' },
    { id: 'shamayel', label: 'শামায়েলে তিরমিযী', badge: 'নবীজির সা. রূপ', group: 'knowledge' },
    { id: 'prophets', label: '২৫ নবীর জীবনী', group: 'knowledge' },
    { id: 'seerat', label: 'আর-রাহীকুল মাখতূম', group: 'knowledge' },
    { id: 'fiqh-shariah', label: 'ফিকাহ ও রাষ্ট্রব্যবস্থা', badge: 'আইন', group: 'knowledge' },
    { id: 'qiyamah', label: 'কিয়ামতের আলামত', badge: 'ফোল্ডার', group: 'ummah' },
    { id: 'world-affairs', label: 'বিশ্ব ও যুবসমাজ', badge: 'সতর্কবার্তা', group: 'ummah' },
    { id: 'quiz', label: 'ইসলামিক কুইজ', badge: 'জ্ঞান পরীক্ষা', group: 'knowledge' },
    { id: 'herbs', label: 'ভেষজ ও পুষ্টি', group: 'health' },
    { id: 'ayurveda', label: 'আয়ুর্বেদিক জিজ্ঞাসা', group: 'health' },
    { id: 'exercise', label: 'ব্যায়াম বই', group: 'health' },
    { id: 'prayer', label: 'নামাজ ও কিবলা', group: 'core' },
    { id: 'tasbih', label: 'তাসবীহ', group: 'core' },
    { id: 'duas', label: 'হিসনুল মুসলিম', group: 'core' },
    { id: 'curator-comments', label: 'প্রস্তুতকারী ও মন্তব্য', badge: 'রাসেল বিশ্বাস', group: 'ummah' },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMoreOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md font-bangla">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => handleSelectTab('quran')}
          className="group flex items-center gap-2.5 text-left text-black whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 text-amber-200 shadow-sm transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-black">
              Hadith BD & Al Quran
            </div>
            <div className="text-[11px] font-medium text-stone-600">
              কুরআন, হাদিস, সীরাত, শরিয়া ও স্বাস্থ্য
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => handleSelectTab('quran')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'quran'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            আল-কুরআন
          </button>
          
          <button
            onClick={() => handleSelectTab('quran-education')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'quran-education'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            কুরআন শিক্ষাশাস্ত্র
          </button>

          <button
            onClick={() => handleSelectTab('hadith')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'hadith'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            হাদিস গ্রন্থাবলী
          </button>

          <button
            onClick={() => handleSelectTab('shamayel')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'shamayel'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-amber-800 hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-100 hover:bg-amber-50 dark:hover:bg-amber-950/30'
            }`}
          >
            শামায়েলে তিরমিযী
          </button>

          <button
            onClick={() => handleSelectTab('prophets')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'prophets'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            ২৫ নবীর জীবনী
          </button>

          <button
            onClick={() => handleSelectTab('fiqh-shariah')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'fiqh-shariah'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            ফিকাহ ও রাষ্ট্রব্যবস্থা
          </button>

          <button
            onClick={() => handleSelectTab('qiyamah')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'qiyamah'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            কিয়ামতের আলামত
          </button>

          <button
            onClick={() => handleSelectTab('world-affairs')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg ${
              activeTab === 'world-affairs'
                ? 'bg-indigo-700 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            বিশ্ব ও যুবসমাজ
          </button>

          <button
            onClick={() => handleSelectTab('quiz')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-black text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>ইসলামিক কুইজ</span>
          </button>

          {/* Dropdown Menu for More Sections */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-300 dark:hover:text-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <span>অন্যান্য বিষয়</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl dark:border-stone-800 dark:bg-stone-900">
                <button
                  onClick={() => handleSelectTab('quiz')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-between font-semibold"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ইসলামিক কুইজ ও জ্ঞান চর্চা
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">নতুন</span>
                </button>
                <button
                  onClick={() => handleSelectTab('seerat')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-between"
                >
                  <span>আর-রাহীকুল মাখতূম</span>
                  <span className="text-[10px] text-emerald-600 font-bold">সীরাত</span>
                </button>
                <button
                  onClick={() => handleSelectTab('herbs')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                >
                  ভেষজ ও পুষ্টি তথ্যকোষ
                </button>
                <button
                  onClick={() => handleSelectTab('ayurveda')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                >
                  আয়ুর্বেদিক স্বাস্থ্য জিজ্ঞাসা
                </button>
                <button
                  onClick={() => handleSelectTab('exercise')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                >
                  শারীরিক ব্যায়াম বই
                </button>
                <button
                  onClick={() => handleSelectTab('prayer')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                >
                  নামাজের সময় ও কিবলা
                </button>
                <button
                  onClick={() => handleSelectTab('tasbih')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                >
                  ডিজিটাল তাসবীহ
                </button>
                <button
                  onClick={() => handleSelectTab('duas')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                >
                  হিসনুল মুসলিম ও দোয়া
                </button>
                <div className="my-1 border-t border-stone-150 dark:border-stone-800" />
                <button
                  onClick={() => handleSelectTab('curator-comments')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold flex items-center justify-between"
                >
                  <span>প্রস্তুতকারী ও কমেন্ট বক্স</span>
                  <MessageSquare className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleSelectTab('curator-comments')}
            className={`px-2.5 py-1.5 transition-colors whitespace-nowrap rounded-lg flex items-center gap-1.5 ${
              activeTab === 'curator-comments'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-emerald-800 dark:text-stone-300 dark:hover:text-emerald-300'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>মন্তব্য ও উক্তি</span>
          </button>
        </nav>

        {/* Zone 3: Search, Bookmarks, Theme & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={openSearch}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-600 hover:border-emerald-600 hover:text-emerald-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-emerald-500 whitespace-nowrap transition-colors"
            title="খুঁজুন"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">অনুসন্ধান</span>
          </button>

          <button
            onClick={openBookmarks}
            className="relative flex items-center justify-center rounded-lg border border-stone-200 bg-white p-2 text-stone-700 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:text-emerald-400 transition-colors"
            title="বুকমার্ক সমূহ"
          >
            <Bookmark className="h-4 w-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-lg border border-stone-200 bg-white p-2 text-stone-700 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 transition-colors"
            title="থিম পরিবর্তন"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex xl:hidden items-center justify-center rounded-lg border border-stone-200 bg-white p-2 text-stone-700 hover:text-emerald-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Bar for Tablet & Mobile Quick Tabs */}
      <div className="flex xl:hidden overflow-x-auto border-t border-stone-200/60 bg-stone-100/90 px-2 py-1.5 text-xs font-medium dark:border-stone-800/60 dark:bg-stone-900/90 scrollbar-none">
        <div className="flex gap-1.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === item.id 
                  ? 'bg-emerald-800 text-white font-bold shadow-xs' 
                  : 'text-stone-700 bg-white/70 hover:bg-stone-200 dark:bg-stone-800/70 dark:text-stone-300'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                  activeTab === item.id ? 'bg-amber-400 text-stone-950' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Full Mobile Drawer Overlay if hamburger clicked */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 space-y-2">
          <div className="text-xs font-bold text-stone-500 uppercase px-1 mb-2">সমস্ত বিভাগ ও ফোল্ডার</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`p-2.5 rounded-xl text-left border ${
                  activeTab === item.id
                    ? 'bg-emerald-800 text-white border-emerald-800 font-bold'
                    : 'bg-stone-50 border-stone-200 dark:bg-stone-850 dark:border-stone-800 text-stone-800 dark:text-stone-200'
                }`}
              >
                <div>{item.label}</div>
                {item.badge && <span className="text-[10px] text-amber-500">{item.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
