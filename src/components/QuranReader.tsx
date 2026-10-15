import React, { useState, useEffect, useRef } from 'react';
import { SURAH_LIST } from '../data/surahs';
import { getSurahVerses, OFFLINE_SURAHS } from '../data/quranVerses';
import { SurahMeta, Ayah, Bookmark } from '../types';
import { 
  Play, Pause, Volume2, Copy, Check, Bookmark as BookmarkIcon, 
  Search, Sliders, ChevronLeft, ChevronRight, Share2, RotateCcw
} from 'lucide-react';
import { QuranAudioPlayer, FloatingQuranAudioBar, RECITERS_LIST } from './QuranAudioPlayer';

interface QuranReaderProps {
  selectedSurahNumber: number;
  onSelectSurah: (num: number) => void;
  onAddBookmark: (item: Omit<Bookmark, 'id' | 'dateAdded'>) => void;
  isBookmarked: (refId: string) => boolean;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  selectedSurahNumber,
  onSelectSurah,
  onAddBookmark,
  isBookmarked
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'মাক্কী' | 'মাদানী'>('all');
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [reciter, setReciter] = useState<string>('alafasy');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [repeatMode, setRepeatMode] = useState<'none' | 'ayah' | 'surah'>('none');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Appearance & Display Settings
  const [arabicFontSize, setArabicFontSize] = useState<number>(30);
  const [banglaFontSize, setBanglaFontSize] = useState<number>(16);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [showBangla, setShowBangla] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Find active Surah info
  const activeSurah: SurahMeta = SURAH_LIST.find(s => s.number === selectedSurahNumber) || SURAH_LIST[0];

  // Smooth scroll to Ayah
  const scrollToAyah = (num: number) => {
    const el = document.getElementById(`ayah-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper to get Audio URL
  const getAyahAudioUrl = (ayah: Ayah, reciterKey: string) => {
    const reciterObj = RECITERS_LIST.find(r => r.id === reciterKey) || RECITERS_LIST[0];
    return `https://cdn.islamic.network/quran/audio/128/${reciterObj.subDomain}/${ayah.numberInQuran}.mp3`;
  };

  // Fetch Surah Verses
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsPlaying(false);
    setCurrentPlayingAyah(null);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
    }

    getSurahVerses(selectedSurahNumber).then(res => {
      if (isMounted) {
        setAyahs(res);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedSurahNumber]);

  // Core Play Ayah function
  const playAyahNumber = (num: number, autoPlay: boolean = true) => {
    const targetAyah = ayahs.find(a => a.numberInSurah === num);
    if (!targetAyah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = getAyahAudioUrl(targetAyah, reciter);
    const audio = new Audio(audioUrl);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;
    setCurrentPlayingAyah(num);

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.onended = () => {
      if (repeatMode === 'ayah') {
        playAyahNumber(num, true);
      } else if (num < ayahs.length) {
        playAyahNumber(num + 1, true);
      } else if (repeatMode === 'surah') {
        playAyahNumber(1, true);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.onerror = () => {
      setIsPlaying(false);
    };

    if (autoPlay) {
      audio.play().then(() => {
        setIsPlaying(true);
        if (autoScroll) {
          scrollToAyah(num);
        }
      }).catch(err => {
        console.warn("Audio play prevented:", err);
        setIsPlaying(false);
      });
    }
  };

  // Play / Pause toggle
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src && currentPlayingAyah) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          playAyahNumber(currentPlayingAyah, true);
        });
      } else {
        const startNum = currentPlayingAyah || 1;
        playAyahNumber(startNum, true);
      }
    }
  };

  // Skip to next Ayah
  const handleNextAyah = () => {
    if (!currentPlayingAyah) {
      playAyahNumber(1, true);
      return;
    }
    if (currentPlayingAyah < ayahs.length) {
      playAyahNumber(currentPlayingAyah + 1, true);
    }
  };

  // Skip to previous Ayah
  const handlePrevAyah = () => {
    if (!currentPlayingAyah) return;
    if (currentPlayingAyah > 1) {
      playAyahNumber(currentPlayingAyah - 1, true);
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  // Seek audio position
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Select reciter
  const handleSelectReciter = (reciterKey: string) => {
    setReciter(reciterKey);
    if (isPlaying && currentPlayingAyah) {
      // Switch reciter dynamically for current verse
      playAyahNumber(currentPlayingAyah, true);
    }
  };

  // Select speed
  const handleSelectSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Cycle repeat modes
  const handleToggleRepeat = () => {
    if (repeatMode === 'none') setRepeatMode('ayah');
    else if (repeatMode === 'ayah') setRepeatMode('surah');
    else setRepeatMode('none');
  };

  // Handle Play click on Ayah Card
  const handlePlayAyah = (ayah: Ayah) => {
    if (currentPlayingAyah === ayah.numberInSurah && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    playAyahNumber(ayah.numberInSurah, true);
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `${ayah.arabicText}\n\nবাংলা অনুবাদঃ ${ayah.banglaText}\n\n[সূরা ${activeSurah.nameBangla}, আয়াত ${ayah.numberInSurah}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  // Filter Surahs
  const filteredSurahs = SURAH_LIST.filter(surah => {
    const matchesSearch = 
      surah.number.toString().includes(searchQuery) ||
      surah.nameBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.nameArabic.includes(searchQuery) ||
      surah.meaningBangla.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || surah.revelationType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* 2-Column Responsive Layout: Surah Navigator & Verses View */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Column: Surah Directory / Sidebar (4 cols on lg) */}
        <aside className="lg:col-span-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sticky top-20 max-h-[85vh] flex flex-col">
          
          <div className="mb-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>সূরা তালিকা (১১৪টি)</span>
              <span className="text-xs font-normal text-stone-500">{filteredSurahs.length}টি প্রদর্শিত</span>
            </h2>

            {/* Search Input */}
            <div className="relative mt-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="সূরার নাম বা নম্বর খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500"
              />
            </div>

            {/* Filter buttons */}
            <div className="mt-2.5 flex items-center gap-1 p-1 bg-stone-100 rounded-lg dark:bg-stone-800 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 py-1 rounded font-medium transition-colors ${filterType === 'all' ? 'bg-white shadow-xs text-emerald-900 dark:bg-stone-700 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400'}`}
              >
                সকল
              </button>
              <button
                onClick={() => setFilterType('মাক্কী')}
                className={`flex-1 py-1 rounded font-medium transition-colors ${filterType === 'মাক্কী' ? 'bg-white shadow-xs text-emerald-900 dark:bg-stone-700 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400'}`}
              >
                মাক্কী
              </button>
              <button
                onClick={() => setFilterType('মাদানী')}
                className={`flex-1 py-1 rounded font-medium transition-colors ${filterType === 'মাদানী' ? 'bg-white shadow-xs text-emerald-900 dark:bg-stone-700 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400'}`}
              >
                মাদানী
              </button>
            </div>
          </div>

          {/* Surah List Scroll Container */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredSurahs.map((surah) => {
              const isActive = surah.number === selectedSurahNumber;
              return (
                <button
                  key={surah.number}
                  onClick={() => onSelectSurah(surah.number)}
                  className={`w-full flex items-center justify-between rounded-lg p-2.5 text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-800 text-white font-medium shadow-xs'
                      : 'hover:bg-stone-100 text-stone-800 dark:text-stone-200 dark:hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-mono tabular-nums ${
                      isActive ? 'bg-emerald-900 text-amber-200' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                    }`}>
                      {surah.number}
                    </span>
                    <div>
                      <div className="text-sm font-semibold leading-tight">
                        {surah.nameBangla}
                      </div>
                      <div className={`text-[11px] ${isActive ? 'text-emerald-100' : 'text-stone-500 dark:text-stone-400'}`}>
                        {surah.meaningBangla} · {surah.numberOfAyahs} আয়াত
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-arabic text-base ${isActive ? 'text-amber-200' : 'text-stone-800 dark:text-stone-200'}`}>
                      {surah.nameArabic}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Surah Reader Canvas (8 cols on lg) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Surah Headline & Navigation Banner */}
          <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-5 dark:border-stone-800/80">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span>সূরা নং {activeSurah.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSurah.revelationType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSurah.numberOfAyahs} আয়াত</span>
                  <span aria-hidden="true">·</span>
                  <span>পারা {activeSurah.juzNumber}</span>
                </div>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-black">
                  {activeSurah.nameBangla}
                  <span className="ml-3 text-lg font-normal text-stone-700">({activeSurah.nameEnglish})</span>
                </h2>
                <p className="mt-1 text-sm text-black font-semibold">
                  অর্থঃ {activeSurah.meaningBangla}
                </p>
              </div>

              <div className="text-right">
                <div className="font-arabic text-3xl sm:text-4xl text-black font-bold">
                  {activeSurah.nameArabic}
                </div>
              </div>
            </div>

            {/* Surah Navigation and Settings Quick Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSurah.number <= 1}
                  onClick={() => onSelectSurah(activeSurah.number - 1)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-semibold text-black"
                  title="পূর্ববর্তী সূরা"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>পূর্ববর্তী সূরা</span>
                </button>

                <button
                  disabled={activeSurah.number >= 114}
                  onClick={() => onSelectSurah(activeSurah.number + 1)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-semibold text-black"
                  title="পরবর্তী সূরা"
                >
                  <span>পরবর্তী সূরা</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  showSettings 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>ফন্ট ও প্রদর্শন সেটিংস</span>
              </button>
            </div>

            {/* Dedicated Audio Player Component */}
            <div className="mt-4">
              <QuranAudioPlayer
                surah={activeSurah}
                ayahs={ayahs}
                currentAyahNumber={currentPlayingAyah}
                isPlaying={isPlaying}
                onPlayAyahNumber={(num) => playAyahNumber(num, true)}
                onTogglePlay={handleTogglePlay}
                onNextAyah={handleNextAyah}
                onPrevAyah={handlePrevAyah}
                reciter={reciter}
                onSelectReciter={handleSelectReciter}
                playbackSpeed={playbackSpeed}
                onSelectSpeed={handleSelectSpeed}
                audioRef={audioRef}
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
                repeatMode={repeatMode}
                onToggleRepeat={handleToggleRepeat}
                autoScroll={autoScroll}
                onToggleAutoScroll={() => setAutoScroll(!autoScroll)}
              />
            </div>

            {/* Collapsible Display Settings Panel */}
            {showSettings && (
              <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs dark:border-stone-700 dark:bg-stone-800/80">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                      আরবি হরফের আকার: <span className="tabular-nums font-mono">{arabicFontSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="22"
                      max="46"
                      value={arabicFontSize}
                      onChange={(e) => setArabicFontSize(Number(e.target.value))}
                      className="w-full accent-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1">
                      বাংলা অনুবাদের আকার: <span className="tabular-nums font-mono">{banglaFontSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={banglaFontSize}
                      onChange={(e) => setBanglaFontSize(Number(e.target.value))}
                      className="w-full accent-emerald-800"
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-stone-200/80 pt-3 dark:border-stone-700/80">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBangla}
                      onChange={(e) => setShowBangla(e.target.checked)}
                      className="rounded accent-emerald-800"
                    />
                    <span className="text-stone-700 dark:text-stone-300">বাংলা অনুবাদ প্রদর্শন</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showEnglish}
                      onChange={(e) => setShowEnglish(e.target.checked)}
                      className="rounded accent-emerald-800"
                    />
                    <span className="text-stone-700 dark:text-stone-300">ইংরেজি অনুবাদ (English)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Bismillah Header (except for Surah At-Tawbah 9) */}
          {activeSurah.number !== 9 && (
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 py-6 text-center dark:border-stone-800 dark:bg-stone-900/50">
              <div className="font-arabic text-2xl sm:text-3xl text-emerald-950 dark:text-emerald-100">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে শুরু করছি
              </div>
            </div>
          )}

          {/* Ayah List */}
          {isLoading ? (
            <div className="rounded-xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-800 border-t-transparent" />
              <div className="mt-4 text-sm text-stone-600 dark:text-stone-400">
                সূরা {activeSurah.nameBangla}-এর আয়াতসমূহ লোড হচ্ছে...
              </div>
            </div>
          ) : ayahs.length === 0 ? (
            <div className="rounded-xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
              <p className="text-stone-600 dark:text-stone-400">কোনো আয়াত পাওয়া যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ayahs.map((ayah) => {
                const isCurrentlyPlaying = currentPlayingAyah === ayah.numberInSurah && isPlaying;
                const bookmarked = isBookmarked(`quran-${activeSurah.number}-${ayah.numberInSurah}`);

                return (
                  <article
                    key={ayah.numberInSurah}
                    id={`ayah-${ayah.numberInSurah}`}
                    className={`rounded-xl border p-5 transition-all ${
                      isCurrentlyPlaying
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/20'
                        : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700'
                    }`}
                  >
                    {/* Ayah Top Utilities */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 font-mono font-semibold text-stone-800 dark:bg-stone-800 dark:text-stone-200 tabular-nums">
                          {ayah.numberInSurah}
                        </span>
                        <span>আয়াত {ayah.numberInSurah} / {activeSurah.numberOfAyahs}</span>
                        {ayah.sajdah && (
                          <span className="text-amber-600 dark:text-amber-400 font-medium ml-1">
                            · সিজদার আয়াত
                          </span>
                        )}
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePlayAyah(ayah)}
                          className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-colors ${
                            isCurrentlyPlaying
                              ? 'bg-emerald-800 text-white'
                              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                          }`}
                          title={isCurrentlyPlaying ? 'থামান' : 'তিলাওয়াত শুনুন'}
                        >
                          {isCurrentlyPlaying ? (
                            <Pause className="h-3.5 w-3.5" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                          <span className="hidden sm:inline">{isCurrentlyPlaying ? 'বিরতি' : 'শুনুন'}</span>
                        </button>

                        <button
                          onClick={() => handleCopyAyah(ayah)}
                          className="flex items-center gap-1 rounded-md p-1.5 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
                          title="কপি করুন"
                        >
                          {copiedAyah === ayah.numberInSurah ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => onAddBookmark({
                            type: 'ayah',
                            title: `সূরা ${activeSurah.nameBangla}, আয়াত ${ayah.numberInSurah}`,
                            subtitle: ayah.banglaText.slice(0, 60) + '...',
                            referenceId: `quran-${activeSurah.number}-${ayah.numberInSurah}`,
                            arabicSnippet: ayah.arabicText.slice(0, 50) + '...'
                          })}
                          className={`rounded-md p-1.5 transition-colors ${
                            bookmarked
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                          title={bookmarked ? 'বুকমার্কে আছে' : 'বুকমার্ক করুন'}
                        >
                          <BookmarkIcon className={`h-3.5 w-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text (Right to Left) */}
                    <div
                      className="font-arabic py-4 text-right text-black font-semibold leading-loose"
                      style={{ fontSize: `${arabicFontSize}px` }}
                      dir="rtl"
                    >
                      {ayah.arabicText}
                    </div>

                    {/* Bengali Translation */}
                    {showBangla && (
                      <div
                        className="border-t border-stone-200 pt-3 text-black leading-relaxed font-bangla font-medium"
                        style={{ fontSize: `${banglaFontSize}px` }}
                      >
                        {ayah.banglaText}
                      </div>
                    )}

                    {/* English Translation */}
                    {showEnglish && ayah.englishText && (
                      <div className="mt-2 text-xs text-stone-800 leading-relaxed font-sans font-normal">
                        {ayah.englishText}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* Bottom Surah Navigation */}
          <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <button
              disabled={activeSurah.number <= 1}
              onClick={() => onSelectSurah(activeSurah.number - 1)}
              className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>পূর্ববর্তী সূরা</span>
            </button>

            <span className="text-xs text-stone-500 dark:text-stone-400">
              সূরা {activeSurah.nameBangla} ({activeSurah.number} / 114)
            </span>

            <button
              disabled={activeSurah.number >= 114}
              onClick={() => onSelectSurah(activeSurah.number + 1)}
              className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            >
              <span>পরবর্তী সূরা</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};
