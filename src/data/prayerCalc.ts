export interface CityLocation {
  nameBangla: string;
  nameEnglish: string;
  lat: number;
  lng: number;
  fajrOffset: number; // minutes from Dhaka base
  dhuhrOffset: number;
  asrOffset: number;
  maghribOffset: number;
  ishaOffset: number;
}

export const BD_CITIES: Record<string, CityLocation> = {
  dhaka: {
    nameBangla: "ঢাকা",
    nameEnglish: "Dhaka",
    lat: 23.8103,
    lng: 90.4125,
    fajrOffset: 0,
    dhuhrOffset: 0,
    asrOffset: 0,
    maghribOffset: 0,
    ishaOffset: 0
  },
  chattogram: {
    nameBangla: "চট্টগ্রাম",
    nameEnglish: "Chattogram",
    lat: 22.3569,
    lng: 91.7832,
    fajrOffset: -5,
    dhuhrOffset: -5,
    asrOffset: -5,
    maghribOffset: -5,
    ishaOffset: -5
  },
  sylhet: {
    nameBangla: "সিলেট",
    nameEnglish: "Sylhet",
    lat: 24.8949,
    lng: 91.8687,
    fajrOffset: -6,
    dhuhrOffset: -6,
    asrOffset: -6,
    maghribOffset: -6,
    ishaOffset: -6
  },
  rajshahi: {
    nameBangla: "রাজশাহী",
    nameEnglish: "Rajshahi",
    lat: 24.3636,
    lng: 88.6241,
    fajrOffset: 7,
    dhuhrOffset: 7,
    asrOffset: 7,
    maghribOffset: 7,
    ishaOffset: 7
  },
  khulna: {
    nameBangla: "খুলনা",
    nameEnglish: "Khulna",
    lat: 22.8456,
    lng: 89.5403,
    fajrOffset: 3,
    dhuhrOffset: 3,
    asrOffset: 3,
    maghribOffset: 3,
    ishaOffset: 3
  },
  barishal: {
    nameBangla: "বরিশাল",
    nameEnglish: "Barishal",
    lat: 22.7010,
    lng: 90.3535,
    fajrOffset: 1,
    dhuhrOffset: 1,
    asrOffset: 1,
    maghribOffset: 1,
    ishaOffset: 1
  },
  rangpur: {
    nameBangla: "রংপুর",
    nameEnglish: "Rangpur",
    lat: 25.7439,
    lng: 89.2752,
    fajrOffset: 5,
    dhuhrOffset: 5,
    asrOffset: 5,
    maghribOffset: 5,
    ishaOffset: 5
  },
  mymensingh: {
    nameBangla: "ময়মনসিংহ",
    nameEnglish: "Mymensingh",
    lat: 24.7471,
    lng: 90.4203,
    fajrOffset: 0,
    dhuhrOffset: 0,
    asrOffset: 0,
    maghribOffset: 0,
    ishaOffset: 0
  },
  cumilla: {
    nameBangla: "কুমিল্লা",
    nameEnglish: "Cumilla",
    lat: 23.4682,
    lng: 91.1788,
    fajrOffset: -3,
    dhuhrOffset: -3,
    asrOffset: -3,
    maghribOffset: -3,
    ishaOffset: -3
  }
};

// Calculate prayer times for Bangladesh based on solar day of year
export function getPrayerTimes(cityKey: string = 'dhaka', targetDate: Date = new Date()) {
  const city = BD_CITIES[cityKey] || BD_CITIES.dhaka;

  // Day of the year
  const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((targetDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

  // Sun declination approximation
  const declination = -23.44 * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10));
  const decRad = (declination * Math.PI) / 180;
  const latRad = (city.lat * Math.PI) / 180;

  // Equation of time approximation in minutes
  const B = (2 * Math.PI * (dayOfYear - 81)) / 364;
  const eqTime = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

  // Solar noon in UTC (approx 12:00 - eqTime - (lng / 15))
  // For Bangladesh (UTC+6):
  const standardTimeMeridian = 90; // UTC+6 is 90° E
  const solarNoonMinutes = 12 * 60 - eqTime - (city.lng - standardTimeMeridian) * 4;

  // Hour angles
  // Fajr (18° below horizon)
  const fajrAngle = -18;
  const fajrAngleRad = (fajrAngle * Math.PI) / 180;
  const cosFajrHA = (Math.sin(fajrAngleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const fajrHA = (Math.acos(Math.max(-1, Math.min(1, cosFajrHA))) * 180) / Math.PI;
  const fajrMinutes = solarNoonMinutes - (fajrHA / 15) * 60 + city.fajrOffset;

  // Sunrise (0.833° below horizon for refraction)
  const sunAngle = -0.833;
  const sunAngleRad = (sunAngle * Math.PI) / 180;
  const cosSunHA = (Math.sin(sunAngleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const sunHA = (Math.acos(Math.max(-1, Math.min(1, cosSunHA))) * 180) / Math.PI;
  const sunriseMinutes = solarNoonMinutes - (sunHA / 15) * 60;
  const maghribMinutes = solarNoonMinutes + (sunHA / 15) * 60 + city.maghribOffset;

  // Dhuhr
  const dhuhrMinutes = solarNoonMinutes + 4 + city.dhuhrOffset; // 4 min after zenith

  // Asr (Hanafi: shadow = 2x object + noon shadow)
  // shadow factor 2 (Hanafi) or 1 (Shafi)
  const noonZenithRad = Math.abs(latRad - decRad);
  const asrAltRad = Math.atan(1 / (2 + Math.tan(noonZenithRad)));
  const cosAsrHA = (Math.sin(asrAltRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const asrHA = (Math.acos(Math.max(-1, Math.min(1, cosAsrHA))) * 180) / Math.PI;
  const asrMinutes = solarNoonMinutes + (asrHA / 15) * 60 + city.asrOffset;

  // Isha (18° below horizon)
  const ishaMinutes = solarNoonMinutes + (fajrHA / 15) * 60 + city.ishaOffset;

  // Tahajjud (last third of night)
  const nightDuration = 24 * 60 - maghribMinutes + fajrMinutes;
  const tahajjudMinutes = (maghribMinutes + (nightDuration * 2) / 3) % (24 * 60);

  // Sahri ends 5 min before Fajr
  const sahriMinutes = fajrMinutes - 5;

  const formatMin = (mins: number) => {
    let normalized = Math.round(mins) % (24 * 60);
    if (normalized < 0) normalized += 24 * 60;
    const hours = Math.floor(normalized / 60);
    const minutes = normalized % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  };

  const toRawMinutes = (mins: number) => {
    let normalized = Math.round(mins) % (24 * 60);
    if (normalized < 0) normalized += 24 * 60;
    return normalized;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'ফজর', nameEn: 'Fajr', time: fajrMinutes, str: formatMin(fajrMinutes) },
    { name: 'সূর্যোদয়', nameEn: 'Sunrise', time: sunriseMinutes, str: formatMin(sunriseMinutes) },
    { name: 'যোহর', nameEn: 'Dhuhr', time: dhuhrMinutes, str: formatMin(dhuhrMinutes) },
    { name: 'আসর', nameEn: 'Asr', time: asrMinutes, str: formatMin(asrMinutes) },
    { name: 'মাগরিব', nameEn: 'Maghrib', time: maghribMinutes, str: formatMin(maghribMinutes) },
    { name: 'ইশা', nameEn: 'Isha', time: ishaMinutes, str: formatMin(ishaMinutes) },
  ];

  // Find next prayer
  let nextPrayer = prayers[0];
  let timeRemaining = 0;

  for (let i = 0; i < prayers.length; i++) {
    if (toRawMinutes(prayers[i].time) > currentMinutes) {
      nextPrayer = prayers[i];
      timeRemaining = toRawMinutes(prayers[i].time) - currentMinutes;
      break;
    }
  }

  // If after Isha, next is tomorrow Fajr
  if (timeRemaining === 0 && currentMinutes >= toRawMinutes(prayers[prayers.length - 1].time)) {
    nextPrayer = prayers[0];
    timeRemaining = 24 * 60 - currentMinutes + toRawMinutes(prayers[0].time);
  }

  const remHours = Math.floor(timeRemaining / 60);
  const remMinutes = timeRemaining % 60;
  const timeRemainingStr = remHours > 0 
    ? `${remHours} ঘণ্টা ${remMinutes} মিনিট বাকি` 
    : `${remMinutes} মিনিট বাকি`;

  return {
    city: city.nameBangla,
    cityEn: city.nameEnglish,
    fajr: formatMin(fajrMinutes),
    sunrise: formatMin(sunriseMinutes),
    dhuhr: formatMin(dhuhrMinutes),
    asr: formatMin(asrMinutes),
    maghrib: formatMin(maghribMinutes),
    isha: formatMin(ishaMinutes),
    tahajjud: formatMin(tahajjudMinutes),
    sahriEnd: formatMin(sahriMinutes),
    iftarTime: formatMin(maghribMinutes),
    nextPrayerName: nextPrayer.name,
    nextPrayerTime: nextPrayer.str,
    timeRemainingStr,
    hijriDate: getApproximateHijriDate(targetDate)
  };
}

// Approximate Hijri date converter
function getApproximateHijriDate(date: Date) {
  // Approximate Hijri algorithm for Bangladesh
  const epoch = new Date(622, 6, 16);
  const diffDays = Math.floor((date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  const hijriYear = Math.floor(diffDays / 354.367);
  const hijriMonthIndex = Math.floor((diffDays % 354.367) / 29.53);
  const hijriDay = Math.floor((diffDays % 354.367) % 29.53) + 1;

  const months = [
    "মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", 
    "জমাদিউস সানি", "রজব", "শাবান", "রমাদান", "শাওয়াল", "জিলকদ", "জিলহজ্জ"
  ];

  return `${hijriDay} ${months[Math.min(11, Math.max(0, hijriMonthIndex))]} ${hijriYear} হিজরি`;
}

// Kaaba direction (Qibla angle from North)
export function getQiblaBearing(lat: number, lng: number) {
  const kaabaLat = (21.4225 * Math.PI) / 180;
  const kaabaLng = (39.8262 * Math.PI) / 180;

  const currentLat = (lat * Math.PI) / 180;
  const currentLng = (lng * Math.PI) / 180;

  const deltaLng = kaabaLng - currentLng;

  const y = Math.sin(deltaLng);
  const x = Math.cos(currentLat) * Math.tan(kaabaLat) - Math.sin(currentLat) * Math.cos(deltaLng);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  return (Math.round(qibla) + 360) % 360;
}
