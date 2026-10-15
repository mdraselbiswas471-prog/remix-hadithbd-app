import React, { useState, useEffect } from 'react';
import { CURATOR_INFO, INITIAL_COMMENTS } from '../data/curatorData';
import { UserComment } from '../types';
import { 
  Heart, MessageSquare, Send, ThumbsUp, MapPin, 
  Sparkles, ShieldCheck, Quote, AlertOctagon 
} from 'lucide-react';

export const CuratorAndCommentsSection: React.FC = () => {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Load comments from localStorage or initialize
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hadithbd_user_comments');
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        setComments(INITIAL_COMMENTS);
      }
    } catch (e) {
      setComments(INITIAL_COMMENTS);
    }
  }, []);

  const handleLike = (id: string) => {
    const updated = comments.map(c => {
      if (c.id === id) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });
    setComments(updated);
    try {
      localStorage.setItem('hadithbd_user_comments', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment: UserComment = {
      id: 'comm_' + Date.now(),
      authorName: name.trim(),
      location: location.trim() || 'বাংলাদেশ',
      commentText: commentText.trim(),
      timestamp: Date.now(),
      likes: 1
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem('hadithbd_user_comments', JSON.stringify(updated));
    } catch (e) {}

    setName('');
    setLocation('');
    setCommentText('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Curator Profile Header */}
      <div className="mb-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 text-black shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-emerald-800" />
              সংগ্রহকারী ও প্রস্তুতকারীর পরিচিতি
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black font-bangla">
              {CURATOR_INFO.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-stone-700 font-medium font-bangla">
              <MapPin className="h-4 w-4 text-emerald-700" />
              <span>{CURATOR_INFO.location}</span>
              <span>•</span>
              <span>{CURATOR_INFO.title}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs sm:text-sm text-stone-900 max-w-md font-bangla">
            <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
              <Heart className="h-4 w-4" />
              অ্যাপ তৈরির নিঃস্বার্থ মানবিক উদ্দেশ্য:
            </div>
            <p className="leading-relaxed font-normal text-stone-800">
              {CURATOR_INFO.missionStatement}
            </p>
          </div>
        </div>

        {/* Powerful Youth Awakening Manifesto */}
        <div className="mt-8 rounded-2xl bg-amber-50/60 border border-amber-200 p-6 sm:p-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <AlertOctagon className="h-6 w-6 shrink-0 text-amber-700 mt-1" />
            <div className="space-y-3 font-bangla">
              <h2 className="text-lg sm:text-xl font-bold text-black">
                সোশ্যাল মিডিয়ার ভয়াল থাবা ও যুবসমাজের আত্মপরিচয়ের ডাক
              </h2>
              <div className="text-sm sm:text-base text-stone-900 leading-relaxed whitespace-pre-line font-normal">
                {CURATOR_INFO.youthAppeal}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moral Sayings & Principles / নীতিবাচক উক্তি */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2">
          <Quote className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-bangla">
            প্রস্তুতকারীর নীতিবাচক উক্তি ও জীবনদর্শন
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURATOR_INFO.moralSayings.map((saying) => (
            <div
              key={saying.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  {saying.context}
                </span>
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 font-bangla leading-relaxed italic">
                  "{saying.quote}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-bangla">
                <span>— মোঃ রাসেল বিশ্বাস</span>
                <span>উক্তি #{saying.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Comment Box Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center gap-2 border-b border-stone-200/80 pb-4 dark:border-stone-800 mb-5">
              <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-bangla">
                আপনার মূল্যবান মন্তব্য ও পরামর্শ দিন
              </h3>
            </div>

            {isSubmitted && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-300 p-3.5 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 font-bangla">
                ✓ শুকরিয়া! আপনার মূল্যবান মন্তব্য সফলভাবে প্রকাশিত হয়েছে।
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-bangla">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মোঃ আব্দুল্লাহ"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-stone-800 dark:bg-stone-850 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  আপনার এলাকা / জেলা
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="যেমন: শৈলকুপা, ঝিনাইদাহ / ঢাকা"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-stone-800 dark:bg-stone-850 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  আপনার মন্তব্য বা দুআ *
                </label>
                <textarea
                  required
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="অ্যাপ সম্পর্কে আপনার অনুভূতি, যুবসমাজের প্রতি বার্তা বা কোনো পরামর্শ লিখুন..."
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-stone-800 dark:bg-stone-850 dark:text-stone-100"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-900 transition-colors"
              >
                <Send className="h-4 w-4" />
                মন্তব্য জমা দিন
              </button>
            </form>
          </div>
        </div>

        {/* Comments Feed Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-bangla flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              পাঠকদের প্রতিক্রিয়া ও মন্তব্য ({comments.length})
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              সর্বশেষ মন্তব্য উপরে
            </span>
          </div>

          <div className="space-y-3.5">
            {comments.map((comm) => (
              <div
                key={comm.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 font-bangla"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {comm.authorName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <MapPin className="h-3 w-3" />
                      <span>{comm.location}</span>
                      <span>•</span>
                      <span>{new Date(comm.timestamp).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(comm.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-2.5 py-1 text-xs text-stone-600 hover:border-emerald-500 hover:text-emerald-700 dark:border-stone-800 dark:text-stone-300 dark:hover:text-emerald-300 transition-colors"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{comm.likes}</span>
                  </button>
                </div>

                <p className="mt-3 text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                  {comm.commentText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
