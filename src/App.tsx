/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { QuranReader } from './components/QuranReader';
import { HadithSection } from './components/HadithSection';
import { SeeratReader } from './components/SeeratReader';
import { ProphetsSection } from './components/ProphetsSection';
import { HerbalAndNutritionSection } from './components/HerbalAndNutritionSection';
import { AyurvedaFormSection } from './components/AyurvedaFormSection';
import { PhysicalExerciseSection } from './components/PhysicalExerciseSection';
import { PrayerTimesSection } from './components/PrayerTimesSection';
import { DigitalTasbih } from './components/DigitalTasbih';
import { DailyDuasSection } from './components/DailyDuasSection';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

// Newly added components:
import { QuranEducationSection } from './components/QuranEducationSection';
import { FiqhAndShariahSection } from './components/FiqhAndShariahSection';
import { ShamayelSection } from './components/ShamayelSection';
import { QiyamahSignsSection } from './components/QiyamahSignsSection';
import { WorldAffairsSection } from './components/WorldAffairsSection';
import { CuratorAndCommentsSection } from './components/CuratorAndCommentsSection';
import { IslamicQuizSection } from './components/IslamicQuizSection';

import { ActiveTab, Bookmark, ReadingTheme } from './types';
import { getPrayerTimes } from './data/prayerCalc';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quran');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<ReadingTheme>('light');

  // Load bookmarks and theme from localStorage
  useEffect(() => {
    try {
      const savedBm = localStorage.getItem('hadithbd_bookmarks');
      if (savedBm) {
        setBookmarks(JSON.parse(savedBm));
      }
      const savedTheme = localStorage.getItem('hadithbd_theme') as ReadingTheme;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }
  }, []);

  // Update theme class on HTML / body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-parchment');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'parchment') {
      root.classList.add('theme-parchment');
    }
    try {
      localStorage.setItem('hadithbd_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('parchment');
    else if (theme === 'parchment') setTheme('dark');
    else setTheme('light');
  };

  const handleAddBookmark = (item: Omit<Bookmark, 'id' | 'dateAdded'>) => {
    const exists = bookmarks.some(b => b.referenceId === item.referenceId);
    let updated: Bookmark[];
    if (exists) {
      updated = bookmarks.filter(b => b.referenceId !== item.referenceId);
    } else {
      const newBm: Bookmark = {
        ...item,
        id: 'bm_' + Date.now(),
        dateAdded: Date.now()
      };
      updated = [newBm, ...bookmarks];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('hadithbd_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleRemoveBookmark = (refId: string) => {
    const updated = bookmarks.filter(b => b.referenceId !== refId);
    setBookmarks(updated);
    try {
      localStorage.setItem('hadithbd_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  const isBookmarked = (refId: string) => {
    return bookmarks.some(b => b.referenceId === refId);
  };

  const handleSelectBookmark = (bm: Bookmark) => {
    if (bm.type === 'ayah') {
      const parts = bm.referenceId.split('-');
      if (parts.length >= 2) {
        const surahNum = parseInt(parts[1], 10);
        if (!isNaN(surahNum)) {
          setSelectedSurahNumber(surahNum);
          setActiveTab('quran');
        }
      }
    } else if (bm.referenceId.startsWith('prophet-')) {
      setActiveTab('prophets');
    } else if (bm.referenceId.startsWith('seerat')) {
      setActiveTab('seerat');
    } else if (bm.referenceId.startsWith('shamayel')) {
      setActiveTab('shamayel');
    } else if (bm.type === 'hadith') {
      setActiveTab('hadith');
    } else if (bm.type === 'dua') {
      setActiveTab('duas');
    }
  };

  const handleImportBookmarks = (imported: Bookmark[]) => {
    setBookmarks(prev => {
      const existingRefIds = new Set(prev.map(b => b.referenceId));
      const newItems = imported.filter(b => b && b.referenceId && !existingRefIds.has(b.referenceId));
      const merged = [...newItems, ...prev];
      try {
        localStorage.setItem('hadithbd_bookmarks', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
  };

  const prayerData = getPrayerTimes('dhaka', new Date());

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-bangla antialiased">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarksCount={bookmarks.length}
        openBookmarks={() => setIsBookmarksOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Hero Marquee for Overview / Quick Navigation */}
      {activeTab === 'quran' && selectedSurahNumber === 1 && (
        <HeroBanner
          onSelectSurah={(num) => setSelectedSurahNumber(num)}
          setActiveTab={setActiveTab}
          hijriDate={prayerData.hijriDate}
          nextPrayerName={prayerData.nextPrayerName}
          nextPrayerTime={prayerData.nextPrayerTime}
          cityName={prayerData.city}
        />
      )}

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Core Quran & Hadith */}
        {activeTab === 'quran' && (
          <QuranReader
            selectedSurahNumber={selectedSurahNumber}
            onSelectSurah={(num) => setSelectedSurahNumber(num)}
            onAddBookmark={handleAddBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeTab === 'quran-education' && (
          <QuranEducationSection />
        )}

        {activeTab === 'hadith' && (
          <HadithSection
            onAddBookmark={handleAddBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeTab === 'shamayel' && (
          <ShamayelSection
            onAddBookmark={handleAddBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeTab === 'prophets' && (
          <ProphetsSection
            onAddBookmark={handleAddBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeTab === 'seerat' && (
          <SeeratReader
            onAddBookmark={handleAddBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {/* Shariah, Qiyamah & World Affairs */}
        {activeTab === 'fiqh-shariah' && (
          <FiqhAndShariahSection />
        )}

        {activeTab === 'qiyamah' && (
          <QiyamahSignsSection />
        )}

        {activeTab === 'world-affairs' && (
          <WorldAffairsSection />
        )}

        {activeTab === 'quiz' && (
          <IslamicQuizSection />
        )}

        {/* Health, Nutrition & Ayurveda */}
        {activeTab === 'herbs' && (
          <HerbalAndNutritionSection />
        )}

        {activeTab === 'ayurveda' && (
          <AyurvedaFormSection />
        )}

        {activeTab === 'exercise' && (
          <PhysicalExerciseSection />
        )}

        {/* Worship Utilities */}
        {activeTab === 'prayer' && (
          <PrayerTimesSection />
        )}

        {activeTab === 'tasbih' && (
          <DigitalTasbih />
        )}

        {activeTab === 'duas' && (
          <DailyDuasSection
            onAddBookmark={handleAddBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {/* Curator & Interactive Comments */}
        {activeTab === 'curator-comments' && (
          <CuratorAndCommentsSection />
        )}
      </main>

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onSelectBookmark={handleSelectBookmark}
        onImportBookmarks={handleImportBookmarks}
      />

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSurah={(num) => setSelectedSurahNumber(num)}
        setActiveTab={setActiveTab}
      />

      {/* Quiet Institutional Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectSurah={(num) => setSelectedSurahNumber(num)}
      />

    </div>
  );
}
