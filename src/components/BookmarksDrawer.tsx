import React, { useState, useRef } from 'react';
import { Bookmark } from '../types';
import { X, Trash2, BookOpen, Download, Upload, Check, AlertCircle } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (refId: string) => void;
  onSelectBookmark: (bm: Bookmark) => void;
  onImportBookmarks?: (imported: Bookmark[]) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectBookmark,
  onImportBookmarks
}) => {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Export bookmarks as JSON file for backup
  const handleExportJSON = () => {
    if (bookmarks.length === 0) {
      alert("ব্যাকআপ করার মতো কোনো বুকমার্ক নেই। প্রথমে কিছু আয়াত বা হাদিস বুকমার্ক করুন।");
      return;
    }

    const backupData = {
      appName: "Hadith BD & Al Quran",
      version: "1.0",
      exportDate: new Date().toISOString(),
      totalBookmarks: bookmarks.length,
      bookmarks: bookmarks
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const today = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = url;
    link.download = `hadithbd-bookmarks-backup-${today}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  // Import bookmarks from JSON backup file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        
        let importedList: Bookmark[] = [];
        if (Array.isArray(parsed)) {
          importedList = parsed;
        } else if (parsed && Array.isArray(parsed.bookmarks)) {
          importedList = parsed.bookmarks;
        } else {
          throw new Error("ভুল ফাইল ফরম্যাট। এটি বৈধ বুকমার্ক ব্যাকআপ ফাইল নয়।");
        }

        // Validate items
        const validBookmarks = importedList.filter(item => 
          item && typeof item.title === 'string' && typeof item.referenceId === 'string'
        );

        if (validBookmarks.length === 0) {
          throw new Error("ফাইলটিতে কোনো বৈধ বুকমার্ক খুঁজে পাওয়া যায়নি।");
        }

        if (onImportBookmarks) {
          onImportBookmarks(validBookmarks);
        }

        setImportSuccess(`${validBookmarks.length}টি বুকমার্ক সফলভাবে রিস্টোর হয়েছে!`);
        setTimeout(() => setImportSuccess(null), 4000);
      } catch (err: any) {
        setImportError(err.message || "ব্যাকআপ ফাইল লোড করতে ত্রুটি হয়েছে।");
        setTimeout(() => setImportError(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white shadow-2xl dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 flex flex-col h-full animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-200 p-4 dark:border-stone-800">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              সংরক্ষিত বুকমার্ক সমূহ
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {bookmarks.length}টি আয়াত, হাদিস ও দোয়া
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Backup Export / Import Action Strip */}
        <div className="border-b border-stone-200/80 bg-stone-50/80 px-4 py-2.5 dark:border-stone-800/80 dark:bg-stone-800/40 flex items-center justify-between gap-2">
          <div className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
            বুকমার্ক ব্যাকআপ (JSON)
          </div>

          <div className="flex items-center gap-2">
            {/* Hidden file input for import */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition-colors"
              title="পূর্বের JSON ব্যাকআপ ফাইল থেকে বুকমার্ক রিস্টোর করুন"
            >
              <Upload className="h-3.5 w-3.5 text-stone-500 dark:text-stone-400" />
              <span>ইমপোর্ট</span>
            </button>

            <button
              onClick={handleExportJSON}
              disabled={bookmarks.length === 0}
              className="flex items-center gap-1 rounded-md bg-emerald-800 px-3 py-1 text-xs font-medium text-white shadow-xs hover:bg-emerald-900 disabled:opacity-40 transition-colors"
              title="সমস্ত বুকমার্ক JSON ফাইল হিসেবে ডাউনলোড করে সুরক্ষিত রাখুন"
            >
              {exportSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-amber-300" />
                  <span>সংরক্ষিত!</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>JSON ব্যাকআপ</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {exportSuccess && (
          <div className="bg-emerald-50 px-4 py-2 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-b border-emerald-100 flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>বুকমার্ক JSON ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে!</span>
          </div>
        )}

        {importSuccess && (
          <div className="bg-emerald-50 px-4 py-2 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-b border-emerald-100 flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>{importSuccess}</span>
          </div>
        )}

        {importError && (
          <div className="bg-rose-50 px-4 py-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-b border-rose-100 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{importError}</span>
          </div>
        )}

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-16 text-center text-stone-500 dark:text-stone-400">
              <BookOpen className="mx-auto h-8 w-8 text-stone-300 dark:text-stone-600 mb-2" />
              <p className="text-sm font-medium">এখনো কোনো বুকমার্ক সংরক্ষণ করা হয়নি</p>
              <p className="text-xs mt-1">পড়ার সময় বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করতে পারেন।</p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="group rounded-xl border border-stone-200 bg-stone-50/50 p-3.5 hover:border-emerald-600 hover:bg-white transition-all dark:border-stone-800 dark:bg-stone-800/40 dark:hover:border-emerald-500 dark:hover:bg-stone-800"
              >
                <div className="flex items-start justify-between gap-2">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      onSelectBookmark(bm);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                        {bm.type === 'ayah' ? 'কুরআন' : bm.type === 'hadith' ? 'হাদিস' : 'দোয়া'}
                      </span>
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {bm.title}
                      </span>
                    </div>

                    {bm.arabicSnippet && (
                      <div className="font-arabic text-sm text-stone-700 dark:text-stone-300 text-right mt-1" dir="rtl">
                        {bm.arabicSnippet}
                      </div>
                    )}

                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {bm.subtitle}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(bm.referenceId)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title="বুকমার্ক মুছুন"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 p-4 text-center dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
            <span>ব্যাকআপ ফাইল অন্য ডিভাইসে ইমপোর্ট করতে পারবেন</span>
            <span className="font-mono tabular-nums">{bookmarks.length}টি সংরক্ষিত</span>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-stone-100 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
