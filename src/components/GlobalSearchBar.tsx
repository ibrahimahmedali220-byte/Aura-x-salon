import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  X,
  Sparkles,
  Scissors,
  User,
  BookOpen,
  ArrowRight,
  Clock,
  ChevronRight,
  CornerDownLeft,
} from 'lucide-react';
import { SERVICES_DATA, VIP_PACKAGES, STYLISTS_DATA, EDITORIAL_BLOG_ARTICLES } from '../data/salonData';
import { SalonService, Stylist, BlogArticle } from '../types';

interface GlobalSearchBarProps {
  onSelectService?: (service: SalonService) => void;
  onSelectStylist?: (stylist: Stylist) => void;
  onSelectArticle?: (article: BlogArticle) => void;
  className?: string;
  isMobileDrawer?: boolean;
  onResultClick?: () => void;
}

type SearchCategory = 'all' | 'services' | 'team' | 'articles';

interface SearchResultItem {
  id: string;
  type: 'service' | 'team' | 'article';
  title: string;
  subtitle: string;
  badge: string;
  meta: string;
  image?: string;
  raw: SalonService | Stylist | BlogArticle;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSelectService,
  onSelectStylist,
  onSelectArticle,
  className = '',
  isMobileDrawer = false,
  onResultClick,
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const searchResults = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // 1. Search Services
    if (activeCategory === 'all' || activeCategory === 'services') {
      SERVICES_DATA.forEach((s) => {
        if (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.inclusions.some((inc) => inc.toLowerCase().includes(q))
        ) {
          results.push({
            id: s.id,
            type: 'service',
            title: s.name,
            subtitle: s.tagline || s.description.substring(0, 75) + '...',
            badge: s.category.toUpperCase(),
            meta: `${s.duration} • $${s.price}`,
            image: s.image,
            raw: s,
          });
        }
      });

      // VIP Packages
      VIP_PACKAGES.forEach((pkg) => {
        if (
          pkg.name.toLowerCase().includes(q) ||
          pkg.subtitle.toLowerCase().includes(q) ||
          pkg.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: pkg.id,
            type: 'service',
            title: pkg.name,
            subtitle: pkg.subtitle,
            badge: 'VIP PACKAGE',
            meta: `${pkg.duration} • $${pkg.price}`,
            image: pkg.image,
            raw: {
              id: pkg.id,
              category: 'spa',
              name: pkg.name,
              tagline: pkg.subtitle,
              description: pkg.description,
              duration: pkg.duration,
              price: pkg.price,
              image: pkg.image,
              inclusions: pkg.highlights,
            } as SalonService,
          });
        }
      });
    }

    // 2. Search Team Members
    if (activeCategory === 'all' || activeCategory === 'team') {
      STYLISTS_DATA.forEach((st) => {
        if (
          st.name.toLowerCase().includes(q) ||
          st.role.toLowerCase().includes(q) ||
          st.specialty.toLowerCase().includes(q) ||
          st.bio.toLowerCase().includes(q) ||
          st.awards.some((a) => a.toLowerCase().includes(q))
        ) {
          results.push({
            id: st.id,
            type: 'team',
            title: st.name,
            subtitle: st.specialty,
            badge: 'ARTISAN',
            meta: st.role,
            image: st.image,
            raw: st,
          });
        }
      });
    }

    // 3. Search Blog Articles
    if (activeCategory === 'all' || activeCategory === 'articles') {
      EDITORIAL_BLOG_ARTICLES.forEach((art) => {
        if (
          art.title.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.author.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q)) ||
          art.content.some((c) => c.toLowerCase().includes(q))
        ) {
          results.push({
            id: art.id,
            type: 'article',
            title: art.title,
            subtitle: art.excerpt.substring(0, 80) + '...',
            badge: art.category.toUpperCase(),
            meta: `${art.author} • ${art.readTime}`,
            image: art.image,
            raw: art,
          });
        }
      });
    }

    return results;
  }, [query, activeCategory]);

  // Handle arrow keys and enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        handleSelectItem(searchResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    if (onResultClick) onResultClick();

    if (item.type === 'service') {
      if (onSelectService) {
        onSelectService(item.raw as SalonService);
      } else {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.type === 'team') {
      if (onSelectStylist) {
        onSelectStylist(item.raw as Stylist);
      } else {
        const el = document.getElementById('team');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.type === 'article') {
      if (onSelectArticle) {
        onSelectArticle(item.raw as BlogArticle);
      }
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const popularSearches = [
    '24K Gold Facial',
    'Custom Balayage',
    'Liquid Gold Keratin',
    'Johnathan Cole',
    'Cannes Red Carpet',
  ];

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobileDrawer ? 'w-full' : 'w-full max-w-xs sm:max-w-sm lg:max-w-md'} ${className}`}
    >
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-[#c5a059] flex items-center justify-center">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t('search.placeholder', 'Search rituals, artisans, articles...')}
          aria-label="Global Atelier Search"
          className="w-full pl-9.5 pr-16 py-2 rounded-full bg-[#140e08]/90 border border-[#3b2a1a] focus:border-[#dfba73] hover:border-[#523d29] text-xs text-white placeholder-[#8e7e6e] focus:outline-none focus:ring-1 focus:ring-[#dfba73] shadow-inner transition-all backdrop-blur-md"
        />

        {/* Right side: Clear button and keyboard shortcut */}
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              aria-label="Clear search input"
              className="p-1 rounded-full text-[#8e7e6e] hover:text-white hover:bg-[#251b12] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[#3a2c1e] bg-[#1a120b] text-[10px] text-[#a49583] font-mono select-none">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Search Results Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#120c08]/98 border border-[#c5a059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl py-3 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] flex flex-col">
          {/* Category Filter Chips */}
          <div className="px-3 pb-2.5 border-b border-[#241a11] flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
            {(
              [
                { key: 'all', label: t('search.all', 'All') },
                { key: 'services', label: t('search.services', 'Services') },
                { key: 'team', label: t('search.team', 'Artisans') },
                { key: 'articles', label: t('search.articles', 'Journal') },
              ] as const
            ).map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSelectedIndex(-1);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                    : 'bg-[#1c140d] text-[#b8ab9a] hover:text-white hover:bg-[#271d14] border border-[#332317]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="overflow-y-auto flex-1 p-2 divide-y divide-[#1e150d] divide-dashed">
            {query.trim() === '' ? (
              // Empty Query State: Popular Suggestions
              <div className="p-4 space-y-3">
                <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('search.popularSearches', 'Popular Inquiries:')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handlePopularSearch(term)}
                      className="px-3 py-1.5 rounded-full bg-[#1b120a] hover:bg-[#2a1d12] border border-[#382618] hover:border-[#c5a059]/60 text-xs text-[#dcd1c2] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Search className="w-3 h-3 text-[#c5a059]" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
                <div className="pt-2 text-[11px] text-[#7d6f5e] font-light italic">
                  Search across bespoke hair styling, medical spa facials, celebrity stylists, and clinical journal articles.
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              // Matching Results
              searchResults.map((item, index) => {
                const isFocused = index === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isFocused
                        ? 'bg-gradient-to-r from-[#2a1c10] to-[#1c130b] border border-[#c5a059]/50 shadow-md'
                        : 'hover:bg-[#18110a]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-11 h-11 rounded-lg object-cover border border-[#3b2b1d] shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-[#24170d] border border-[#3b2b1d] flex items-center justify-center shrink-0 text-[#c5a059]">
                          {item.type === 'service' && <Scissors className="w-5 h-5" />}
                          {item.type === 'team' && <User className="w-5 h-5" />}
                          {item.type === 'article' && <BookOpen className="w-5 h-5" />}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[9px] uppercase tracking-wider px-2 py-0.2 rounded-full font-bold shrink-0 ${
                              item.type === 'service'
                                ? 'bg-[#301f11] text-[#e5c07b] border border-[#523821]'
                                : item.type === 'team'
                                ? 'bg-[#152a1d] text-emerald-300 border border-emerald-500/30'
                                : 'bg-[#1a2035] text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                          <span className="text-xs text-[#8f806e] truncate">{item.meta}</span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#a49685] truncate font-light mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-[#c5a059]">
                      <span className="text-[11px] font-medium hidden sm:inline">
                        {item.type === 'service'
                          ? t('search.bookNow', 'Book')
                          : item.type === 'team'
                          ? t('search.viewDetails', 'Profile')
                          : t('search.readArticle', 'Read')}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#c5a059]" />
                    </div>
                  </div>
                );
              })
            ) : (
              // No Results Found
              <div className="p-6 text-center space-y-2">
                <Search className="w-8 h-8 text-[#5c4735] mx-auto mb-1" />
                <h4 className="text-sm font-semibold text-white">
                  {t('search.noResults', 'No matches found')}
                </h4>
                <p className="text-xs text-[#9d8e7d] max-w-xs mx-auto font-light">
                  {t(
                    'search.noResultsDesc',
                    'Try searching for balayage, 24K gold, facial, keratin, Johnathan, or Helena.'
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Footer Guide with Results Count */}
          <div className="px-4 pt-2.5 border-t border-[#241a11] flex items-center justify-between text-[11px] text-[#8a7b6b]">
            <span>
              {searchResults.length} {t('search.resultsCount', 'results found')}
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              <span>{t('search.pressEnterToSelect', 'Press Enter to select')}</span>
              <CornerDownLeft className="w-3 h-3 text-[#c5a059]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
