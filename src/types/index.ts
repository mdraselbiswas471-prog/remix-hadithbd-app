export type ActiveTab = 
  | 'quran' 
  | 'hadith' 
  | 'prophets'
  | 'seerat'
  | 'shamayel'
  | 'quran-education'
  | 'fiqh-shariah'
  | 'qiyamah'
  | 'world-affairs'
  | 'quiz'
  | 'herbs' 
  | 'ayurveda'
  | 'exercise'
  | 'prayer' 
  | 'tasbih' 
  | 'duas' 
  | 'curator-comments'
  | 'bookmarks';

export interface ProphetBiography {
  id: string;
  number: number;
  nameBangla: string;
  nameArabic: string;
  nameEnglish: string;
  titleBangla: string;
  eraOrPeriod: string;
  sentTo: string;
  scriptureOrMiracle: string;
  quranMentionCount: number;
  quranSurahs: string[];
  summary: string;
  biographySections: {
    heading: string;
    text: string;
  }[];
  keyLessons: string[];
  quranicAyah: {
    arabic: string;
    bangla: string;
    reference: string;
  };
}

export interface HerbalPlant {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  scientificName: string;
  category: string;
  primaryBenefit: string;
  allBenefits: string[];
  usageRules: string[];
  partsUsed: string[];
  cautions: string;
  islamicReference?: string;
}

export interface FoodNutrition {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  type: 'vegetable' | 'fruit';
  caloriesPer100g: number;
  vitamins: string[];
  minerals: string[];
  benefits: string[];
  eatingTips: string;
  healthTags: string[];
}

export interface SeeratChapter {
  id: string;
  chapterNumber: number;
  titleBangla: string;
  titleArabic: string;
  period: string;
  summary: string;
  content: string[];
  keyHighlights: string[];
  lessons: string[];
}

export interface ExerciseGuide {
  id: string;
  titleBangla: string;
  category: 'ফ্রি-হ্যান্ড' | 'কোর ও পেট' | 'স্ট্রেচিং ও ব্যথা নিরাময়' | 'কার্ডিও ও হাঁটা' | 'শ্বাসপ্রশ্বাস';
  difficulty: 'সহজ' | 'মাঝারি' | 'উন্নত';
  duration: string;
  targetArea: string;
  instructions: string[];
  benefits: string[];
  breathingTechnique: string;
  precautions: string;
}

export interface AyurvedicFormSubmission {
  name: string;
  age: number;
  gender: string;
  primaryComplaints: string[];
  duration: string;
  doshaTendency?: string;
  remedies: {
    herb: string;
    prepMethod: string;
    dietAdvice: string;
    lifestyleTip: string;
  }[];
}

export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameBangla: string;
  nameEnglish: string;
  meaningBangla: string;
  numberOfAyahs: number;
  revelationType: 'মাক্কী' | 'মাদানী';
  revelationOrder: number;
  juzNumber: number;
}

export interface Ayah {
  numberInSurah: number;
  numberInQuran: number;
  arabicText: string;
  banglaText: string;
  englishText: string;
  audioUrl?: string;
  juz?: number;
  sajdah?: boolean;
}

export interface HadithBook {
  id: string;
  titleBangla: string;
  titleArabic: string;
  titleEnglish: string;
  compiler: string;
  compilerDeath: string;
  totalHadiths: number;
  badge: string;
  description: string;
}

export interface HadithItem {
  id: string;
  bookId: string;
  bookNameBangla: string;
  hadithNumber: number | string;
  chapterNumber?: number;
  chapterBangla: string;
  narrator: string;
  arabicText: string;
  banglaText: string;
  englishText: string;
  grade: 'সহীহ' | 'হাসান' | 'মুত্তাফাক্ব আলাইহ' | 'যইফ' | 'হাসান সহীহ';
  reference: string;
  explanation?: string;
  topic: string;
}

export interface PrayerTimeData {
  city: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  tahajjud: string;
  sahriEnd: string;
  iftarTime: string;
  currentPrayer: string;
  nextPrayer: string;
  timeRemainingStr: string;
}

export interface DailyDua {
  id: string;
  category: string;
  title: string;
  arabic: string;
  pronunciation: string;
  translation: string;
  reference: string;
  benefit?: string;
}

export interface Bookmark {
  id: string;
  type: 'ayah' | 'hadith' | 'dua';
  title: string;
  subtitle: string;
  referenceId: string;
  arabicSnippet?: string;
  dateAdded: number;
}

export type ReadingTheme = 'light' | 'parchment' | 'dark';

// New requested types:
export interface QuranLesson {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  content: string;
  examples: { arabic: string; bangla: string; note: string }[];
  rules: string[];
}

export interface FiqhTopicItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  farzRules: string[];
  wajibRules?: string[];
  sunnahRules?: string[];
  nullifiers?: string[];
  quranHadithReference: string;
  practicalGuidelines: string[];
}

export interface GovernancePrinciple {
  id: string;
  title: string;
  subheading: string;
  quranicFoundation: { arabic: string; bangla: string; ref: string };
  principles: string[];
  practicalApplication: string;
}

export interface ShamayelHadith {
  id: string;
  chapter: string;
  hadithNumber: number;
  narrator: string;
  arabicText: string;
  banglaTranslation: string;
  explanation: string;
}

export interface QiyamahSignItem {
  id: string;
  type: 'minor' | 'major';
  title: string;
  subTitle: string;
  hadithReference: string;
  arabicHadith?: string;
  description: string;
  modernManifestation?: string;
  protectionDua?: string;
}

export interface WorldAffairAnalysis {
  id: string;
  topic: string;
  regionOrSubject: string;
  historicalContext: string;
  currentCrisis: string;
  islamicGuidance: string;
  youthResponsibility: string[];
}

export interface UserComment {
  id: string;
  authorName: string;
  location: string;
  commentText: string;
  timestamp: number;
  likes: number;
}

export type QuizCategory = 'all' | 'quran' | 'hadith' | 'seerat' | 'prophets' | 'fiqh';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  categoryNameBangla: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  reference: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

