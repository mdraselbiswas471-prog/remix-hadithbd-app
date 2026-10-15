import React, { useState, useEffect } from 'react';
import { BD_CITIES, getPrayerTimes, getQiblaBearing } from '../data/prayerCalc';
import { Clock, Compass, MapPin, Calendar, Sun, Moon, Info, ShieldCheck } from 'lucide-react';

export const PrayerTimesSection: React.FC = () => {
  const [selectedCityKey, setSelectedCityKey] = useState<string>('dhaka');
  const [now, setNow] = useState<Date>(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  const city = BD_CITIES[selectedCityKey] || BD_CITIES.dhaka;
  const prayerData = getPrayerTimes(selectedCityKey, now);
  const qiblaAngle = getQiblaBearing(city.lat, city.lng);

  const prayerCards = [
    { name: 'ফজর (Fajr)', time: prayerData.fajr, icon: Moon, note: 'সাহরী শেষ: ' + prayerData.sahriEnd },
    { name: 'সূর্যোদয় (Sunrise)', time: prayerData.sunrise, icon: Sun, note: 'ইশরাকের শুরু' },
    { name: 'যোহর (Dhuhr)', time: prayerData.dhuhr, icon: Sun, note: 'মধ্যাহ্ন বিরতি' },
    { name: 'আসর (Asr)', time: prayerData.asr, icon: Sun, note: 'হানাফী আসর' },
    { name: 'মাগরিব (Maghrib)', time: prayerData.maghrib, icon: Moon, note: 'ইফতারের সময়: ' + prayerData.iftarTime },
    { name: 'ইশা (Isha)', time: prayerData.isha, icon: Moon, note: 'বিতর ও তারাবি' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 border-b border-stone-200 pb-6 dark:border-stone-800">
        <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
          সালাতের সময়সূচি ও কিবলা কম্পাস
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          বাংলাদেশের জেলাভিত্তিক নামাজের ওয়াক্ত ও কিবলা দিক
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          সঠিক সূর্যোদয়, সূর্যাস্ত এবং ইসলামিক ফাউন্ডেশন বাংলাদেশ অনুসৃত ওয়াক্তের হিসেব।
        </p>
      </div>

      {/* City Selector & Countdown Marquee */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-8">
        
        {/* Next Prayer Countdown Card (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-700" />
                <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">নির্বাচিত জেলাঃ</span>
                <select
                  value={selectedCityKey}
                  onChange={(e) => setSelectedCityKey(e.target.value)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-emerald-300"
                >
                  {Object.entries(BD_CITIES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.nameBangla} ({item.nameEnglish})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400">
                {prayerData.hijriDate}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  পরবর্তী নামাজের ওয়াক্ত
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-1">
                  {prayerData.nextPrayerName}
                </div>
                <div className="text-sm text-stone-600 dark:text-stone-300 mt-0.5">
                  ওয়াক্ত শুরু: <strong className="font-semibold text-stone-900 dark:text-stone-100">{prayerData.nextPrayerTime}</strong>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-right dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                <div className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">সময় বাকি</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-950 dark:text-emerald-100 mt-0.5 tabular-nums">
                  {prayerData.timeRemainingStr}
                </div>
              </div>
            </div>
          </div>

          {/* Sahri & Iftar Banner */}
          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-stone-500 dark:text-stone-400">আজকের সাহরী শেষ:</span>
              <strong className="font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{prayerData.sahriEnd}</strong>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-stone-500 dark:text-stone-400">আজকের ইফতার:</span>
              <strong className="font-semibold text-emerald-800 dark:text-emerald-400 tabular-nums">{prayerData.iftarTime}</strong>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-stone-500 dark:text-stone-400">তাহাজ্জুদের শেষ তৃতীয়াংশ:</span>
              <strong className="font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{prayerData.tahajjud}</strong>
            </div>
          </div>
        </div>

        {/* Qibla Compass Card (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between items-center text-center">
          <div className="w-full flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 pb-3 dark:border-stone-800">
            <span className="font-medium text-stone-800 dark:text-stone-200">কিবলা দিক নির্দেশক (Qibla Compass)</span>
            <span>মক্কা থেকে ~৫,১৩৭ কিমি</span>
          </div>

          {/* Compass visual indicator */}
          <div className="my-5 relative flex items-center justify-center">
            <div className="relative h-36 w-36 rounded-full border-2 border-stone-200 bg-stone-50 shadow-inner flex items-center justify-center dark:border-stone-700 dark:bg-stone-800">
              {/* Compass Cardinal Points */}
              <span className="absolute top-1 text-[10px] font-bold text-stone-400">N (উত্তর)</span>
              <span className="absolute bottom-1 text-[10px] font-bold text-stone-400">S (দক্ষিণ)</span>
              <span className="absolute left-1 text-[10px] font-bold text-stone-400">W (পশ্চিম)</span>
              <span className="absolute right-1 text-[10px] font-bold text-stone-400">E (পূর্ব)</span>

              {/* Needle rotated to Qibla */}
              <div 
                className="h-28 w-1 bg-transparent relative transition-transform duration-700 ease-out flex flex-col justify-between items-center"
                style={{ transform: `rotate(${qiblaAngle}deg)` }}
              >
                {/* Pointer to Kaaba */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[18px] border-b-emerald-700 -mt-2" />
                <div className="h-3 w-3 rounded-full bg-emerald-900" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[12px] border-t-stone-400 -mb-1" />
              </div>

              {/* Kaaba icon in center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-stone-900 text-[10px] font-bold text-amber-300 shadow">
                  🕋
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
              {city.nameBangla} হতে কিবলার কোণ: <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold tabular-nums">{qiblaAngle}°</span> (পশ্চিম-উত্তর-পশ্চিম)
            </div>
            <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
              উত্তর দিক থেকে ঘড়ির কাঁটার দিকে {qiblaAngle}° কোণে পবিত্র কাবা শরীফ অবস্থিত।
            </p>
          </div>
        </div>

      </div>

      {/* Prayer Time Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {prayerCards.map((p, idx) => {
          const Icon = p.icon;
          const isNext = p.name.includes(prayerData.nextPrayerName);

          return (
            <div
              key={idx}
              className={`rounded-xl border p-4 text-center transition-all ${
                isNext
                  ? 'border-emerald-600 bg-emerald-800 text-white shadow-md'
                  : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 text-stone-800 dark:text-stone-200'
              }`}
            >
              <div className="flex justify-center mb-1.5">
                <Icon className={`h-4 w-4 ${isNext ? 'text-amber-200' : 'text-stone-400'}`} />
              </div>
              <div className={`text-xs font-semibold ${isNext ? 'text-amber-100' : 'text-stone-700 dark:text-stone-300'}`}>
                {p.name}
              </div>
              <div className={`text-xl font-bold mt-1.5 tabular-nums ${isNext ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`}>
                {p.time}
              </div>
              <div className={`text-[11px] mt-2 ${isNext ? 'text-emerald-200' : 'text-stone-500 dark:text-stone-400'}`}>
                {p.note}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fasting Niyyat & Iftar Dua Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
            রোজার নিয়ত (নিয়তে সাওম)
          </div>
          <div className="font-arabic text-lg text-stone-900 dark:text-stone-100 text-right dir-rtl leading-relaxed">
            نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللَّهُ فَتَقَبَّلْ مِنِّي.
          </div>
          <div className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-bangla">
            <strong>অর্থঃ</strong> হে আল্লাহ! আমি আগামীকাল পবিত্র রমাদান মাসের ফরজ রোজা রাখার নিয়ত করলাম। অতএব আপনি আমার রোজা কবুল করুন।
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
            ইফতারের সুন্নাহ দোয়া
          </div>
          <div className="font-arabic text-lg text-stone-900 dark:text-stone-100 text-right dir-rtl leading-relaxed">
            ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ.
          </div>
          <div className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-bangla">
            <strong>অর্থঃ</strong> পিপাসা দূরীভূত হলো, শিরা-উপশিরা সিক্ত হলো এবং আল্লাহর ইচ্ছায় সওয়াব অবধারিত হলো। (আবু দাউদঃ ২৩৫৭)
          </div>
        </div>

      </div>

    </div>
  );
};
