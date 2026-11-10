import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  ExternalLink,
  Edit2,
  FileText,
  AlertCircle,
  Shirt,
  Sparkles,
  Luggage,
  X,
  Check
} from 'lucide-react';
import { ChecklistItem, MemoItem } from '../types/travel';

interface ChecklistsViewProps {
  checklists: ChecklistItem[];
  memos: MemoItem[];
  onToggleChecklist: (id: string) => void;
  onAddChecklist: (category: string, text: string) => void;
  onDeleteChecklist: (id: string) => void;
  onAddMemo: (title: string, content: string) => void;
  onDeleteMemo: (id: string) => void;
  onUpdateMemo: (id: string, title: string, content: string) => void;
}

export const ChecklistsView: React.FC<ChecklistsViewProps> = ({
  checklists,
  memos,
  onToggleChecklist,
  onAddChecklist,
  onDeleteChecklist,
  onAddMemo,
  onDeleteMemo,
  onUpdateMemo,
}) => {
  // New checklist input state
  const [activeCategory, setActiveCategory] = useState<string>('行前檢查');
  const [newChecklistText, setNewChecklistText] = useState<string>('');
  const [showAddChecklistModal, setShowAddChecklistModal] = useState<boolean>(false);

  // Memo editing state
  const [showAddMemoModal, setShowAddMemoModal] = useState<boolean>(false);
  const [newMemoTitle, setNewMemoTitle] = useState<string>('');
  const [newMemoContent, setNewMemoContent] = useState<string>('');
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);

  const categories = ['行前檢查', '重要文件', '3C產品', '衣物穿搭', '常用藥品與雜物'];

  const handleAddChecklistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    onAddChecklist(activeCategory, newChecklistText.trim());
    setNewChecklistText('');
    setShowAddChecklistModal(false);
  };

  const handleSaveMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoTitle.trim() || !newMemoContent.trim()) return;

    if (editingMemoId) {
      onUpdateMemo(editingMemoId, newMemoTitle.trim(), newMemoContent.trim());
    } else {
      onAddMemo(newMemoTitle.trim(), newMemoContent.trim());
    }
    setNewMemoTitle('');
    setNewMemoContent('');
    setEditingMemoId(null);
    setShowAddMemoModal(false);
  };

  const startEditMemo = (memo: MemoItem) => {
    setEditingMemoId(memo.id);
    setNewMemoTitle(memo.title);
    setNewMemoContent(memo.content);
    setShowAddMemoModal(true);
  };

  // Helper to render text with auto-converted URLs into clickable buttons
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mx-1 my-0.5 px-2.5 py-0.5 text-xs font-medium text-[#C86D56] bg-[#F7EBE8] hover:bg-[#F2DFD8] rounded-full border border-[#EBDCD3] transition-colors break-all"
          >
            <span>開啟連結</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const completedCount = checklists.filter((c) => c.completed).length;
  const progressPercent =
    checklists.length > 0 ? Math.round((completedCount / checklists.length) * 100) : 0;

  return (
    <div className="space-y-5 pb-20 animate-in fade-in duration-300">
      {/* Overview Progress Card */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EE] border border-[#EADBCE]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#C86D56] tracking-wider uppercase">
              Preparation Progress
            </span>
            <h2 className="text-base font-bold text-slate-800 mt-0.5">
              行前準備完成度
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold font-mono text-[#C86D56]">
              {progressPercent}%
            </span>
            <span className="block text-[10px] text-slate-400 font-mono">
              {completedCount} / {checklists.length} 項
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#EFE8E1] rounded-full mt-3 overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#D9826D] to-[#C86D56] rounded-full transition-all duration-300"
          />
        </div>
      </div>

      {/* Section 1: Checklists by Category (Matches User's Reference Screenshot) */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const items = checklists.filter((c) => c.category === cat);
          return (
            <div key={cat} className="space-y-2">
              {/* Category Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#C86D56]" />
                  <h3 className="text-sm font-bold text-slate-800">{cat}</h3>
                  <span className="text-xs font-mono text-slate-400">
                    ({items.filter((i) => i.completed).length}/{items.length})
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAddChecklistModal(true);
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-[#C86D56] bg-[#F7EBE8] hover:bg-[#F2DFD8] rounded-xl transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>新增</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onToggleChecklist(item.id)}
                    className={`glass-card rounded-2xl p-3 flex items-center justify-between gap-3 border transition-all cursor-pointer ${
                      item.completed
                        ? 'bg-white/50 border-[#E8DFD8]/60 text-slate-400'
                        : 'border-[#EADBCE] text-slate-700 hover:border-[#C86D56]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          item.completed
                            ? 'bg-[#C86D56] border-[#C86D56] text-white'
                            : 'bg-white border-[#D9CFC4]'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <span
                        className={`text-xs select-none transition-all ${
                          item.completed ? 'line-through text-slate-400' : 'font-medium'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChecklist(item.id);
                      }}
                      className="p-1 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                      title="刪除此項目"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="p-3 text-center text-xs text-slate-400 italic bg-white/40 rounded-xl border border-dashed border-[#E5DACF]">
                    目前無待辦項目，可點擊上方「+ 新增」
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 2: Personal Memos with Auto-Link Detection */}
      <div className="space-y-3 pt-3 border-t border-[#E8DFD8]">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-amber-600" />
            <h3 className="text-sm font-bold text-slate-800">個人備忘錄</h3>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              支援網址自動轉按鈕
            </span>
          </div>

          <button
            onClick={() => {
              setEditingMemoId(null);
              setNewMemoTitle('');
              setNewMemoContent('');
              setShowAddMemoModal(true);
            }}
            className="px-2.5 py-1 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200 rounded-xl transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>新增備忘</span>
          </button>
        </div>

        {/* Memo Cards */}
        <div className="space-y-3">
          {memos.map((memo) => (
            <div
              key={memo.id}
              className="glass-card rounded-2xl p-3.5 border border-[#EADBCE] shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>{memo.title}</span>
                </h4>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEditMemo(memo)}
                    className="p-1 text-slate-400 hover:text-amber-700 rounded-lg hover:bg-slate-100"
                    title="編輯備忘錄"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('確定刪除此備忘錄嗎？')) {
                        onDeleteMemo(memo.id);
                      }
                    }}
                    className="p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-slate-100"
                    title="刪除備忘錄"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {renderTextWithLinks(memo.content)}
              </div>

              <div className="text-[10px] text-slate-400 font-mono text-right pt-1 border-t border-[#F2EAE2]">
                更新於 {memo.updatedAt}
              </div>
            </div>
          ))}

          {memos.length === 0 && (
            <div className="glass-card rounded-2xl p-6 text-center text-slate-400 text-xs">
              尚無個人備忘錄，可記錄網址、備用電話或購物清單！
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Daily Outfit & Luggage Reminder Assistant */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-[#FFFDF9] via-emerald-50/30 to-[#F5ECE4] border border-[#E5DACF] shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">
              九州 11 月中旬穿搭與行李防忘提醒
            </h3>
            <span className="text-[10px] text-slate-500">
              日夜溫差高達 10 度 · 高原山區約 6~8°C
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-700 space-y-2 leading-relaxed bg-white/80 p-3.5 rounded-2xl border border-[#EDE2D8]">
          <p>
            <span className="font-bold text-emerald-800">1. 洋蔥式穿搭：</span>
            <span>室內與車內均有暖氣，內著吸濕排汗發熱衣，中層穿衛衣或毛衣，外層備防風保暖外套。</span>
          </p>
          <p>
            <span className="font-bold text-emerald-800">2. 山區防風配件：</span>
            <span>別府纜車山頂 (1375m)、大觀峰與皿倉山夜景風大，務必攜帶圍巾、手套與毛帽。</span>
          </p>
          <p>
            <span className="font-bold text-emerald-800">3. 自駕行車小物：</span>
            <span>準備車用手機磁吸導航架、雙孔車用充電頭與太陽眼鏡 (晨曦與傍晚逆光自駕必備)。</span>
          </p>
          <p>
            <span className="font-bold text-emerald-800">4. 護照駕照放隨身包：</span>
            <span>台灣駕照正本與日文譯本正本務必隨身攜帶，不可放在托運行李內。</span>
          </p>
        </div>
      </div>

      {/* Add Checklist Modal */}
      {showAddChecklistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#FAF8F5] rounded-3xl p-5 shadow-2xl border border-[#E8DFD8]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD8]">
              <h3 className="text-sm font-bold text-slate-800">
                新增【{activeCategory}】項目
              </h3>
              <button
                onClick={() => setShowAddChecklistModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChecklistSubmit} className="mt-3 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  項目名稱
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  placeholder="例如：防風手套、換日幣現金..."
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChecklistModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-[#E5DACF] rounded-xl"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#D9826D] to-[#C86D56] rounded-xl shadow-sm"
                >
                  確認新增
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Memo Modal */}
      {showAddMemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-5 shadow-2xl border border-[#E8DFD8]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD8]">
              <h3 className="text-sm font-bold text-slate-800">
                {editingMemoId ? '編輯個人備忘錄' : '新增個人備忘錄'}
              </h3>
              <button
                onClick={() => setShowAddMemoModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMemo} className="mt-3 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  備忘錄標題
                </label>
                <input
                  type="text"
                  required
                  value={newMemoTitle}
                  onChange={(e) => setNewMemoTitle(e.target.value)}
                  placeholder="例如：壽喜燒採買清單、動漫扭蛋店連結"
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  詳細內容 (若包含網址將自動辨識為點擊按鈕)
                </label>
                <textarea
                  rows={5}
                  required
                  value={newMemoContent}
                  onChange={(e) => setNewMemoContent(e.target.value)}
                  placeholder="輸入文字筆記或貼上 https://... 網址"
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40 leading-relaxed font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DFD8]">
                <button
                  type="button"
                  onClick={() => setShowAddMemoModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-[#E5DACF] rounded-xl"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#D9826D] to-[#C86D56] rounded-xl shadow-sm"
                >
                  {editingMemoId ? '儲存變更' : '新增備忘'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
