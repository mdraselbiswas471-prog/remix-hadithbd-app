import React, { useState, useEffect, useRef } from 'react';
import { SurahMeta, Ayah } from '../types';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Repeat, Repeat1, Headphones, Check, ChevronUp, ChevronDown
} from 'lucide-react';

export interface QuranAudioPlayerProps {
  surah: SurahMeta;
  ayahs: Ayah[];
  currentAyahNumber: number | null; // 1-indexed numberInSurah
  isPlaying: boolean;
  onPlayAyahNumber: (ayahNumber: number) => void;
  onTogglePlay: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  reciter: string;
  onSelectReciter: (reciterKey: string) => void;
  playbackSpeed: number;
  onSelectSpeed: (speed: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  repeatMode: 'none' | 'ayah' | 'surah';
  onToggleRepeat: () => void;
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
}

export const RECITERS_LIST = [
  { id: 'alafasy', nameBangla: 'ক্বারী মিশারি আল-আফাসি', subDomain: 'ar.alafasy' },
  { id: 'sudais', nameBangla: 'ক্বারী আব্দুর রহমান আস-সুদাইস', subDomain: 'ar.abdurrahmaansudais' },
  { id: 'abdulbasit', nameBangla: 'ক্বারী আব্দুল বাসিত আব্দুস সামাদ', subDomain: 'ar.abdulbasitmurattal' },
  { id: 'maher', nameBangla: 'ক্বারী মাহের আল-মুআইক্বলী', subDomain: 'ar.mahermuaiqly' },
];

export const QuranAudioPlayer: React.FC<QuranAudioPlayerProps> = ({
  surah,
  ayahs,
  currentAyahNumber,
  isPlaying,
  onPlayAyahNumber,
  onTogglePlay,
  onNextAyah,
  onPrevAyah,
  reciter,
  onSelectReciter,
  playbackSpeed,
  onSelectSpeed,
  currentTime,
  duration,
  onSeek,
  repeatMode,
  onToggleRepeat,
  autoScroll,
  onToggleAutoScroll
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);

  const activeAyahObj = ayahs.find(a => a.numberInSurah === currentAyahNumber) || ayahs[0];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '০০:০০';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const mm = m < 10 ? `0${m}` : `${m}`;
    const ss = s < 10 ? `0${s}` : `${s}`;
    return `${mm}:${ss}`;
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentReciterObj = RECITERS_LIST.find(r => r.id === reciter) || RECITERS_LIST[0];

  return (
    <div className="w-full rounded-2xl border-2 border-stone-200 bg-white p-4 sm:p-5 shadow-xs transition-all font-bangla mb-6">
      {/* Top Header: Surah and Reciter Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-150 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-xs shrink-0">
            <Headphones className="h-5 w-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-black">
                সূরা {surah.nameBangla} · অডিও তিলাওয়াত
              </span>
              <span className="font-arabic text-base sm:text-lg text-emerald-900 font-semibold">
                ({surah.nameArabic})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
              <span>{currentReciterObj.nameBangla}</span>
              <span>•</span>
              <span className="font-medium text-emerald-850">
                {currentAyahNumber ? `আয়াত নং ${currentAyahNumber} / ${surah.numberOfAyahs}` : `মোট আয়াত: ${surah.numberOfAyahs}`}
              </span>
            </div>
          </div>
        </div>

        {/* Reciter & Speed Selectors */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Reciter Dropdown */}
          <select
            value={reciter}
            onChange={(e) => onSelectReciter(e.target.value)}
            className="rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs text-black font-semibold hover:border-stone-400 focus:outline-hidden"
          >
            {RECITERS_LIST.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nameBangla}
              </option>
            ))}
          </select>

          {/* Speed Dropdown */}
          <select
            value={playbackSpeed}
            onChange={(e) => onSelectSpeed(parseFloat(e.target.value))}
            className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-xs text-black font-semibold hover:border-stone-400 focus:outline-hidden tabular-nums"
          >
            <option value="0.75">০.৭৫x গতি</option>
            <option value="1">১.০x স্বাভাবিক</option>
            <option value="1.25">১.২৫x দ্রুত</option>
            <option value="1.5">১.৫x দ্রুত</option>
          </select>

          {/* Auto-scroll toggle */}
          <button
            onClick={onToggleAutoScroll}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
              autoScroll
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
            }`}
            title="তিলাওয়াতের সাথে সাথে আয়াত স্ক্রোল হবে"
          >
            অটো-স্ক্রোল: {autoScroll ? 'চালু' : 'বন্ধ'}
          </button>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Core Play / Pause / Skip Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4 order-2 sm:order-1">
          {/* Skip Previous Ayah */}
          <button
            onClick={onPrevAyah}
            disabled={!currentAyahNumber || currentAyahNumber <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition"
            title="পূর্ববর্তী আয়াত (Skip Previous)"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          {/* Play / Pause Main Button */}
          <button
            onClick={onTogglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800 text-white shadow-md hover:bg-emerald-900 active:scale-95 transition"
            title={isPlaying ? 'বিরতি (Pause)' : 'প্লে করুন (Play)'}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-white" />
            ) : (
              <Play className="h-6 w-6 fill-white ml-0.5" />
            )}
          </button>

          {/* Skip Next Ayah */}
          <button
            onClick={onNextAyah}
            disabled={!currentAyahNumber || currentAyahNumber >= ayahs.length}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition"
            title="পরবর্তী আয়াত (Skip Next)"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          {/* Repeat Mode Button */}
          <button
            onClick={onToggleRepeat}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ml-1 ${
              repeatMode !== 'none'
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
            }`}
            title="লুপ / পুনরাবৃত্তি মোড পরিবর্তন করুন"
          >
            {repeatMode === 'ayah' ? (
              <>
                <Repeat1 className="h-4 w-4 text-emerald-800" />
                <span className="hidden sm:inline">আয়াত লুপ</span>
              </>
            ) : repeatMode === 'surah' ? (
              <>
                <Repeat className="h-4 w-4 text-emerald-800" />
                <span className="hidden sm:inline">সূরা লুপ</span>
              </>
            ) : (
              <>
                <Repeat className="h-4 w-4 text-stone-400" />
                <span className="hidden sm:inline">স্বাভাবিক</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Bar & Timers */}
        <div className="flex-1 w-full order-1 sm:order-2 flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-stone-700 min-w-[36px] text-right">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 group py-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800 hover:accent-emerald-900 transition"
            />
            {/* Visual buffered bar behind */}
            <div 
              className="absolute left-0 top-3 h-1.5 rounded-lg bg-emerald-700/20 pointer-events-none"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-xs font-mono font-bold text-stone-500 min-w-[36px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-2 order-3">
          <button
            onClick={toggleMute}
            className="p-1.5 text-stone-600 hover:text-black rounded-lg transition"
            title={isMuted ? 'আনমিউট' : 'মিউট'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4 text-red-600" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
          />
        </div>

      </div>

      {/* Playing Verse Preview Banner */}
      {currentAyahNumber && activeAyahObj && (
        <div className="mt-3.5 pt-3 border-t border-stone-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 shrink-0">
              আয়াত {activeAyahObj.numberInSurah}
            </span>
            <span className="font-arabic text-stone-900 truncate max-w-xs sm:max-w-md font-semibold text-sm">
              {activeAyahObj.arabicText}
            </span>
          </div>
          <span className="text-stone-600 line-clamp-1 italic text-[11px]">
            {activeAyahObj.banglaText}
          </span>
        </div>
      )}
    </div>
  );
};

// Bottom Sticky Floating Mini Player (Shown when user scrolls through long Surahs)
export const FloatingQuranAudioBar: React.FC<{
  surah: SurahMeta;
  ayahs: Ayah[];
  currentAyahNumber: number | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onScrollToCurrentAyah: () => void;
}> = ({
  surah,
  ayahs,
  currentAyahNumber,
  isPlaying,
  onTogglePlay,
  onNextAyah,
  onPrevAyah,
  currentTime,
  duration,
  onSeek,
  onScrollToCurrentAyah
}) => {
  if (!currentAyahNumber) return null;

  const currentAyahObj = ayahs.find(a => a.numberInSurah === currentAyahNumber);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-stone-200 shadow-xl py-2.5 px-4 font-bangla transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Surah & Ayah Snippet */}
        <button
          onClick={onScrollToCurrentAyah}
          className="flex items-center gap-2.5 text-left group overflow-hidden max-w-[200px] sm:max-w-xs shrink-0"
          title="আয়াতটিতে স্ক্রোল করুন"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white shrink-0 group-hover:scale-105 transition-transform">
            <Headphones className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-black truncate group-hover:text-emerald-800 transition-colors">
              সূরা {surah.nameBangla} · আয়াত {currentAyahNumber}
            </div>
            {currentAyahObj && (
              <div className="text-[11px] text-stone-500 truncate font-arabic">
                {currentAyahObj.arabicText}
              </div>
            )}
          </div>
        </button>

        {/* Center: Controls & Progress */}
        <div className="flex-1 max-w-md flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button
              onClick={onPrevAyah}
              disabled={currentAyahNumber <= 1}
              className="p-1 rounded text-stone-700 hover:text-black disabled:opacity-30 transition"
              title="পূর্ববর্তী আয়াত"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-white hover:bg-emerald-900 transition"
              title={isPlaying ? 'থামান' : 'প্লে'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-white" />
              ) : (
                <Play className="h-4 w-4 fill-white ml-0.5" />
              )}
            </button>

            <button
              onClick={onNextAyah}
              disabled={currentAyahNumber >= ayahs.length}
              className="p-1 rounded text-stone-700 hover:text-black disabled:opacity-30 transition"
              title="পরবর্তী আয়াত"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* Thin Progress bar */}
          <div className="w-full flex items-center gap-2">
            <div className="relative w-full h-1.5 bg-stone-200 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="h-full bg-emerald-800 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Quick Ayah Jump Button */}
        <button
          onClick={onScrollToCurrentAyah}
          className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 rounded-lg text-xs font-semibold whitespace-nowrap transition"
        >
          আয়াতে যান
        </button>

      </div>
    </div>
  );
};
