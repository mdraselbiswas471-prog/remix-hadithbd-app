import React, { useState } from 'react';
import { AyurvedicFormSubmission } from '../types';
import { Sparkles, AlertCircle, CheckCircle2, RotateCcw, BookOpen, HeartPulse, Printer } from 'lucide-react';

export const AyurvedaFormSection: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('পুরুষ');
  const [complaints, setComplaints] = useState<string[]>([]);
  const [duration, setDuration] = useState('১ মাস থেকে ৬ মাস');
  const [submittedResult, setSubmittedResult] = useState<AyurvedicFormSubmission | null>(null);

  const availableComplaints = [
    "হজমের সমস্যা / গ্যাস্ট্রিক",
    "মানসিক চাপ / অনিদ্রা",
    "সর্দি / কাশি / শ্বাসকষ্ট",
    "চুল পড়া / ত্বকের সমস্যা",
    "জয়েন্ট বা হাড়ের ব্যথা",
    "রোগ প্রতিরোধ ক্ষমতা কম"
  ];

  const handleToggleComplaint = (item: string) => {
    if (complaints.includes(item)) {
      setComplaints(complaints.filter(c => c !== item));
    } else {
      setComplaints([...complaints, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }
    if (!age || Number(age) <= 0) {
      alert("অনুগ্রহ করে সঠিক বয়স লিখুন।");
      return;
    }
    if (complaints.length === 0) {
      alert("অনুগ্রহ করে কমপক্ষে একটি শারীরিক সমস্যা নির্বাচন করুন।");
      return;
    }

    // Generate targeted remedies based on selected complaints
    const remediesMap: Record<string, { herb: string; prepMethod: string; dietAdvice: string; lifestyleTip: string }> = {
      "হজমের সমস্যা / গ্যাস্ট্রিক": {
        herb: "থানকুনি পাতা, মেথি ও অ্যালোভেরা জেল",
        prepMethod: "প্রতিদিন সকালে খালি পেটে ৪-৫টি কাঁচা থানকুনি পাতা চিবিয়ে খান এবং এক গ্লাস পানিতে ১ চামচ পরিষ্কার অ্যালোভেরা জেল গুলিয়ে পান করুন। রাতে এক চিমটি মেথি ভিজিয়ে সকালে সেই পানি পান করুন।",
        dietAdvice: "অতিরিক্ত তেল-ঝাল ও ভাজাপোড়া খাবার পরিহার করুন। লাউ, পেঁপে ও মিষ্টি কুমড়া বেশি খান।",
        lifestyleTip: "খাবারের ঠিক পরপরই বেশি পানি পান করবেন না, ৩০ মিনিট পর স্বাভাবিক তাপমাত্রার পানি পান করুন।"
      },
      "মানসিক চাপ / অনিদ্রা": {
        herb: "অশ্বগন্ধা গুঁড়ো ও খাঁটি মধু",
        prepMethod: "রাতে ঘুমানোর ৩০ মিনিট আগে আধা চা চামচ অশ্বগন্ধা গুঁড়ো এক কাপ কুসুম গরম দুধে ১ চা চামচ খাঁটি মধু মিশিয়ে পান করুন।",
        dietAdvice: "সন্ধ্যায় চা ও কফি সম্পূর্ণ বর্জন করুন। মিষ্টি ফল ও কাঠবাদাম গ্রহণ করুন।",
        lifestyleTip: "ঘুমানোর পূর্বে মোবাইল স্ক্রিন বন্ধ রাখুন এবং কয়েক মিনিট ডায়াফ্রামাটিক গভীর শ্বাসপ্রশ্বাসের ব্যায়াম করুন।"
      },
      "সর্দি / কাশি / শ্বাসকষ্ট": {
        herb: "তুলসী পাতা, বাসক ও আদা-কালোজিরা",
        prepMethod: "৫-৬টি তুলসী পাতা ও ১টি বাসক পাতা থেঁতো করে আধা ইঞ্চি আদা সহ ফুটিয়ে রঙ চায়ের মতো করে ১ চামচ মধুর সাথে দিনে দুবার পান করুন। সকালে ৭-১০টি কালোজিরা চিবিয়ে খান।",
        dietAdvice: "ফ্রিজের ঠান্ডা পানি ও কোমল পানীয় সম্পূর্ণ পরিহার করুন। গরম স্যুপ ও রসুন খান।",
        lifestyleTip: "গরম পানির ভাপ (ইনহেলেশন) নিন এবং বুকে হালকা গরম কালোজিরার তেল মালিশ করুন।"
      },
      "চুল পড়া / ত্বকের সমস্যা": {
        herb: "আমলকী ও নিম পাতা",
        prepMethod: "সকালে ১টি কাঁচা আমলকী চিবিয়ে খান। নিম পাতা সেদ্ধ পানি দিয়ে গোসল ও মুখ ধৌত করুন। খাঁটি নারকেল তেলের সাথে আমলকী গুঁড়ো গরম করে মাথার ত্বকে মালিশ করুন।",
        dietAdvice: "ভিটামিন সি ও আয়রন সমৃদ্ধ সবুজ শাক (পালং, লাল শাক) এবং প্রচুর পানি পান করুন।",
        lifestyleTip: "রাসায়নিক ক্ষতিকর শ্যাম্পু পরিহার করে প্রাকৃতিক ভেষজ ব্যবহার করুন এবং পর্যাপ্ত সুনিদ্রা নিশ্চিত করুন।"
      },
      "জয়েন্ট বা হাড়ের ব্যথা": {
        herb: "হলুদ, আদা ও কালোজিরার তেল",
        prepMethod: "রাতে কাঁচা হলুদ ও আদা সেদ্ধ করে গরম দুধের সাথে পান করুন (গোল্ডেন মিল্ক)। ব্যথার স্থানে হালকা গরম কালোজিরার তেল মালিশ করুন।",
        dietAdvice: "ক্যালসিয়াম ও ম্যাগনেসিয়াম সমৃদ্ধ খাবার (তিল, ডালিম, কলা) ডায়েটে রাখুন।",
        lifestyleTip: "প্রতিদিন সকালে ১৫-২০ মিনিট হালকা রোদে হাঁটুন যাতে শরীরে প্রাকৃতিক ভিটামিন ডি তৈরি হয়।"
      },
      "রোগ প্রতিরোধ ক্ষমতা কম": {
        herb: "কালোজিরা ও খাঁটি মধু (নববী ব্যবস্থাপত্র)",
        prepMethod: "প্রতিদিন সকালে আধা চামচ কালোজিরার তেল ১ চামচ মধুর সাথে মিশিয়ে নিয়মিত গ্রহণ করুন। রাসূলুল্লাহ (সা.) বলেছেন কালোজিরা সর্বরোগের মহৌষধ।",
        dietAdvice: "টক ফল (পেয়ারা, লেবু, মাল্টা) এবং রঙিন শাকসবজি নিয়মিত খান।",
        lifestyleTip: "প্রতিদিন অন্তত ৩০ মিনিট দ্রুত হাঁটা (ব্রিস্ক ওয়াকিং) অভ্যাস গড়ে তুলুন।"
      }
    };

    const tailoredRemedies = complaints.map(c => remediesMap[c] || {
      herb: "তুলসী ও কালোজিরা",
      prepMethod: "সকালে তুলসী চা ও কালোজিরা মধু সহ গ্রহণ করুন।",
      dietAdvice: "সুষম প্রাকৃতিক খাবার গ্রহণ করুন।",
      lifestyleTip: "নিয়মিত শরীরচর্চা করুন।"
    });

    const result: AyurvedicFormSubmission = {
      name,
      age: Number(age),
      gender,
      primaryComplaints: complaints,
      duration,
      doshaTendency: complaints.includes("হজমের সমস্যা / গ্যাস্ট্রিক") ? "পিত্ত (Pitta) প্রধান ভারসাম্যহীনতা" : "বাত (Vata) ও কফ (Kapha) সংমিশ্রণ",
      remedies: tailoredRemedies
    };

    setSubmittedResult(result);
  };

  const handleReset = () => {
    setName('');
    setAge('');
    setGender('পুরুষ');
    setComplaints([]);
    setDuration('১ মাস থেকে ৬ মাস');
    setSubmittedResult(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="mb-8 border-b border-stone-200 pb-6 text-center dark:border-stone-800">
        <div className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-medium mb-1">
          ভেষজ স্বাস্থ্য মূল্যায়ন ও পরামর্শ
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          আয়ুর্বেদিক স্বাস্থ্য জিজ্ঞাসা
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
          আপনার শারীরিক উপসর্গ ও লক্ষণসমূহ পূরণ করে তাৎক্ষণিক ভেষজ প্রতিকার ও সঠিক পুষ্টি পরামর্শ জেনে নিন।
        </p>
      </div>

      {/* Main Interactive Form Card */}
      {!submittedResult ? (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900 space-y-6">
          
          {/* Question 1: Name */}
          <div>
            <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2">
              ১. আপনার নাম <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: আব্দুল্লাহ মাহমুদ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>

          {/* Question 2 & 3: Age & Gender Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2">
                ২. বয়স <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="5"
                max="120"
                placeholder="যেমন: ৩২"
                value={age}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2">
                ৩. লিঙ্গ <span className="text-rose-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              >
                <option value="পুরুষ">পুরুষ</option>
                <option value="নারী">নারী</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </div>
          </div>

          {/* Question 4: Primary Complaints (Checkbox) */}
          <div>
            <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2">
              ৪. আপনার প্রধান শারীরিক সমস্যা কোনটি? (একাধিক নির্বাচন করতে পারেন) <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {availableComplaints.map((item) => {
                const checked = complaints.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                      checked
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-200'
                        : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleComplaint(item)}
                      className="h-4 w-4 rounded accent-emerald-800"
                    />
                    <span className="text-xs sm:text-sm font-medium">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Question 5: Duration (Radio) */}
          <div>
            <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2">
              ৫. সমস্যাটি কতদিন ধরে চলছে? <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {["১ সপ্তাহের কম", "১ মাস থেকে ৬ মাস", "৬ মাসের বেশি"].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2.5 rounded-xl border p-3 cursor-pointer transition-colors ${
                    duration === opt
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-200'
                      : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={opt}
                    checked={duration === opt}
                    onChange={(e) => setDuration(e.target.value)}
                    className="accent-emerald-800"
                  />
                  <span className="text-xs sm:text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <span>⚠️ সতর্কীকরণ: কোনো জটিল রোগে অ্যাপের তথ্যের ওপর নির্ভর না করে চিকিৎসকের পরামর্শ নিন।</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-800 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-900 transition-colors"
            >
              আয়ুর্বেদিক মূল্যায়ন ও সমাধান দেখুন
            </button>
          </div>

        </form>
      ) : (
        /* Personalized Results / Advice Sheet */
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900 animate-in fade-in duration-300">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5 dark:border-stone-800">
            <div>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                ব্যক্তিগত স্বাস্থ্য পরামর্শ রিপোর্ট
              </span>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {submittedResult.name} ({submittedResult.age} বছর, {submittedResult.gender})
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                স্থায়িত্বকালঃ {submittedResult.duration} · আনুমানিক দোষ প্রবণতাঃ {submittedResult.doshaTendency}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>প্রিন্ট</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-900"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>নতুন প্রশ্নাবলী</span>
              </button>
            </div>
          </div>

          {/* Solutions for each selected complaint */}
          <div className="mt-6 space-y-6">
            {submittedResult.primaryComplaints.map((comp, idx) => {
              const rem = submittedResult.remedies[idx];
              if (!rem) return null;

              return (
                <div key={idx} className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 dark:border-stone-800 dark:bg-stone-800/40">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-950 dark:text-emerald-200 border-b border-stone-200/70 pb-2 dark:border-stone-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    <span>সমস্যাঃ {comp}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <strong className="block text-emerald-900 dark:text-emerald-400 mb-1">
                        প্রস্তাবিত ভেষজ ঔষধঃ
                      </strong>
                      <p className="text-stone-700 dark:text-stone-300">{rem.herb}</p>
                    </div>

                    <div>
                      <strong className="block text-emerald-900 dark:text-emerald-400 mb-1">
                        ব্যবহার ও সেবন বিধিঃ
                      </strong>
                      <p className="text-stone-700 dark:text-stone-300">{rem.prepMethod}</p>
                    </div>

                    <div>
                      <strong className="block text-emerald-900 dark:text-emerald-400 mb-1">
                        খাদ্যাভ্যাস ও লাইফস্টাইল টিপঃ
                      </strong>
                      <p className="text-stone-700 dark:text-stone-300">{rem.dietAdvice} {rem.lifestyleTip}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer at bottom */}
          <div className="mt-6 border-t border-stone-200 pt-4 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
            ⚠️ সতর্কীকরণ: কোনো জটিল রোগে অ্যাপের তথ্যের ওপর নির্ভর না করে চিকিৎসকের পরামর্শ নিন। এই ফর্মের তথ্যসমূহ কেবল সাধারণ সচেতনতামূলক ও প্রাকৃতিক পথ্য হিসেবে ব্যবহারের জন্য প্রযোজ্য।
          </div>

        </div>
      )}

    </div>
  );
};
