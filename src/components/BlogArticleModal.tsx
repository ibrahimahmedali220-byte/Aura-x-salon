import React from 'react';
import { X, Calendar, Clock, User, Share2, Sparkles, BookOpen } from 'lucide-react';
import { BlogArticle } from '../types';

interface BlogArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  onBookAuthor?: (authorName: string) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  article,
  onClose,
  onBookAuthor,
}) => {
  if (!article) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#16100a] via-[#100c08] to-[#0a0705] border border-[#c5a059]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#e8ded1]"
      >
        {/* Sticky Header Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#140e09]/95 backdrop-blur-md border-b border-[#2b1f14]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#24170e] border border-[#c5a059]/40 text-[#dfba73] text-xs font-semibold tracking-wider uppercase">
              {article.category}
            </span>
            <span className="text-xs text-[#9d8e7d] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share article"
              className="p-2 rounded-full text-[#c5a059] hover:text-white hover:bg-[#251b12] transition-colors cursor-pointer"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close article modal"
              className="p-2 rounded-full text-[#c5a059] hover:text-white hover:bg-[#251b12] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16100a] via-[#16100a]/40 to-transparent" />
        </div>

        {/* Article Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h1
              id="article-modal-title"
              className="font-cormorant text-2xl sm:text-4xl text-white font-medium leading-tight mb-3"
            >
              {article.title}
            </h1>
            <p className="text-sm sm:text-base text-[#c5a059] font-light leading-relaxed italic">
              {article.subtitle}
            </p>
          </div>

          {/* Author Card */}
          <div className="p-4 rounded-xl bg-[#1c140d] border border-[#352516] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover border border-[#c5a059]/60 shadow-md"
              />
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#c5a059]" />
                  {article.author}
                </div>
                <div className="text-xs text-[#a89987] font-light">
                  {article.authorRole}
                </div>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-xs text-[#9d8e7d] flex items-center gap-1 justify-end">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                {article.date}
              </div>
              <span className="text-[11px] text-[#c5a059]">Atelier Editorial Contributor</span>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#dcd1c2] font-light">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:font-cormorant first-letter:text-2xl first-letter:text-[#dfba73] first-letter:font-medium">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-[#2a1d12] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8f806e] uppercase tracking-wider font-semibold">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#1e150d] border border-[#382617] text-xs text-[#c5a059]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action CTA Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#21160c] via-[#2a1b0e] to-[#1a1108] border border-[#c5a059]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold block mb-1">
                Bespoke Atelier Service
              </span>
              <h4 className="text-base text-white font-medium">
                Experience this ritual in our Beverly Hills private sanctuary
              </h4>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onBookAuthor) {
                  onBookAuthor(article.author);
                }
              }}
              className="btn-gold-luxury px-6 py-3 rounded-full text-xs font-bold shrink-0 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Consult with {article.author.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
