import React, { useState } from 'react';
import { Users, Trash2, Plus, Search } from 'lucide-react';
import { Contact } from '../types';
import { translations } from '../translations';

interface ContactsManagerProps {
  contacts: Contact[];
  onUpdate: (updated: Contact[]) => void;
  language: 'en' | 'hi';
}

export default function ContactsManager({ contacts, onUpdate, language }: ContactsManagerProps) {
  const t = translations[language];
  const [filter, setFilter] = useState<Contact['status'] | 'all'>('all');
  
  // Add Contact Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStatus, setNewStatus] = useState<Contact['status']>('allow');
  const [newCategory, setNewCategory] = useState<Contact['category']>('Family');
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const PAGE_SIZE = 4;

  const toggleStatus = (id: string, current: Contact['status']) => {
    const sequence: Contact['status'][] = ['allow', 'screen', 'block'];
    const nextIdx = (sequence.indexOf(current) + 1) % sequence.length;
    const nextStatus = sequence[nextIdx];
    
    const updated = contacts.map((c) => {
      if (c.id === id) {
        return { ...c, status: nextStatus };
      }
      return c;
    });
    onUpdate(updated);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    // Check duplicate
    if (contacts.some((c) => c.phoneNumber.replace(/\s+/g, '') === newPhone.replace(/\s+/g, ''))) {
      alert(t.duplicateAlert);
      return;
    }

    const newContact: Contact = {
      id: 'c_' + Date.now(),
      name: newName,
      phoneNumber: newPhone,
      status: newStatus,
      category: newCategory,
    };

    onUpdate([newContact, ...contacts]);
    setNewName('');
    setNewPhone('');
    setShowForm(false);
  };

  const handleDeleteContact = (id: string) => {
    onUpdate(contacts.filter((c) => c.id !== id));
  };


  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = filter === 'all' || c.status === filter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      c.name.toLowerCase().includes(query) || 
      c.phoneNumber.includes(query) || 
      c.category.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const displayedContacts = filteredContacts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleFilterChange = (val: typeof filter) => { setFilter(val); setCurrentPage(1); };
  const handleSearchChange = (val: string) => { setSearchQuery(val); setCurrentPage(1); };

  // Get initials for circular avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase() || '?';
  };

  // Get matching background class for category initials avatar for dark mode
  const getAvatarBg = (category: string) => {
    switch (category) {
      case 'Family': return 'bg-rose-500/10 border-rose-500/30 text-rose-300';
      case 'Work': return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300';
      case 'Emergency': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Doctors': return 'bg-teal-500/10 border-teal-500/30 text-teal-300';
      case 'School': return 'bg-blue-500/10 border-blue-500/30 text-blue-300';
      case 'Delivery': return 'bg-orange-500/10 border-orange-500/30 text-orange-300';
      case 'Custom': return 'bg-purple-500/10 border-purple-500/30 text-purple-300';
      case 'Friends': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
      case 'Spam': return 'bg-slate-805 bg-slate-800 border-slate-700 text-slate-400';
      default: return 'bg-slate-850 border-slate-700 text-slate-400';
    }
  };

  const translateCategory = (cat: Contact['category']) => {
    switch (cat) {
      case 'Family': return t.family;
      case 'Work': return t.work;
      case 'Friends': return t.friends;
      case 'Spam': return t.spam;
      case 'Emergency': return language === 'hi' ? 'आपातकालीन' : 'Emergency';
      case 'Doctors': return language === 'hi' ? 'डॉक्टर' : 'Doctors';
      case 'School': return language === 'hi' ? 'स्कूल' : 'School';
      case 'Delivery': return language === 'hi' ? 'डिलीवरी' : 'Delivery';
      case 'Custom': return language === 'hi' ? 'कस्टम' : 'Custom';
      default: return t.others;
    }
  };

  return (
    <div id="contacts-manager-container" className="bg-slate-900/95 backdrop-blur-md border border-slate-800/85 rounded-3xl p-4 space-y-3 shadow-2xl shadow-indigo-950/20 text-white transition-all duration-300">
      
      {/* Header and Toggle Add Action */}
      <div className="flex justify-between items-center pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">{t.addressBook}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{t.addressBookDesc}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer shadow-md border ${
              showForm 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700 hover:shadow shadow-indigo-500/10'
            }`}
          >
            {showForm ? t.cancelBtn : t.addContactBtn}
            <Plus className={`w-3.5 h-3.5 transition-transform duration-300 ${showForm ? 'rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* FORM: REGISTER NEW CONTACT (Styled after the uploaded user design reference) */}
      {showForm && (
        <form onSubmit={handleAddContact} className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4 animate-fade-in relative z-20 shadow-2xl text-left">
          <div className="flex flex-col gap-1">
            <h4 className="text-[14px] font-black text-white leading-tight">{language === 'hi' ? 'संपर्क चुनें (Pick contacts)' : 'Pick contacts'}</h4>
            <p className="text-[11px] text-slate-400 font-semibold">{language === 'hi' ? 'उन लोगों को चुनें जो हमेशा आपसे संपर्क कर सकते हैं।' : 'Select people who can always reach you.'}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">{t.fullName}</label>
              <input 
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Rachel Green"
                className="w-full bg-slate-905 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 font-semibold transition text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">{t.phoneNo}</label>
              <input 
                type="tel"
                required
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="e.g. +1 (555) 304-9423"
                className="w-full bg-slate-905 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 font-semibold transition text-xs"
              />
            </div>
          </div>

          {/* LABEL SELECTION CHIPS */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">LABEL</label>
            <div className="flex flex-wrap gap-2">
              {(['Family', 'Work', 'Emergency', 'Doctors', 'School', 'Delivery', 'Custom'] as const).map((cat) => {
                const isSelected = newCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewCategory(cat)}
                    className={`px-4.5 py-2.5 rounded-full text-[11px] font-bold transition duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-slate-950 font-black shadow-md shadow-white/5 scale-[1.02]'
                        : 'bg-slate-800/80 text-slate-305 text-slate-300 hover:bg-slate-700 border border-slate-700/30'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACCESS RULE BEHAVIOR SELECTION BUTTONS */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">BEHAVIOR</label>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setNewStatus('allow')}
                className={`px-5 py-3 rounded-full text-[11px] font-bold transition cursor-pointer select-none border-2 font-sans ${
                  newStatus === 'allow'
                    ? 'border-emerald-500/80 bg-emerald-500/10 text-emerald-400 shadow shadow-emerald-500/10'
                    : 'border-slate-805 border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-250 hover:border-slate-700'
                }`}
              >
                Always allow
              </button>
              <button
                type="button"
                onClick={() => setNewStatus('screen')}
                className={`px-5 py-3 rounded-full text-[11px] font-bold transition cursor-pointer select-none border-2 font-sans ${
                  newStatus === 'screen'
                    ? 'border-emerald-500/80 bg-emerald-500/10 text-emerald-400 shadow shadow-emerald-500/10'
                    : 'border-slate-805 border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-250 hover:border-slate-700'
                }`}
              >
                Whitelist only (Screen)
              </button>
              <button
                type="button"
                onClick={() => setNewStatus('block')}
                className={`px-5 py-3 rounded-full text-[11px] font-bold transition cursor-pointer select-none border-2 font-sans ${
                  newStatus === 'block'
                    ? 'border-rose-500/80 bg-rose-500/10 text-rose-455 text-rose-400 shadow shadow-rose-500/10'
                    : 'border-slate-805 border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-250 hover:border-slate-700'
                }`}
              >
                Always Block
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-850">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-400 hover:text-white px-3.5 py-1.5 rounded-lg transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs font-black tracking-wide bg-indigo-600 hover:bg-indigo-550 hover:shadow shadow-indigo-500/20 text-white px-5 py-2.5 rounded-xl transition cursor-pointer border border-indigo-700"
            >
              {t.saveRule}
            </button>
          </div>
        </form>
      )}

      {/* SEARCH + FILTER ROW */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={language === 'hi' ? 'नाम या नंबर...' : 'Search name or number...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-7 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 font-semibold transition"
          />
          {searchQuery && (
            <button type="button" onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-white text-xs transition">
              ✕
            </button>
          )}
        </div>
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value as typeof filter)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-bold uppercase focus:outline-none focus:border-indigo-500 cursor-pointer transition appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center', backgroundSize: '12px', paddingRight: '24px' }}
        >
          <option value="all">{t.allRows}</option>
          <option value="allow">{t.allowedTag}</option>
          <option value="screen">{t.screenTag}</option>
          <option value="block">{t.blockedTag}</option>
        </select>
      </div>

      {/* CONTACTS LIST — PAGINATED */}
      <div className="space-y-1">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-10 bg-slate-950/40 border border-slate-800 border-dashed rounded-2xl">
            <p className="text-xs text-slate-400 font-semibold">{t.noContacts}</p>
          </div>
        ) : (
          displayedContacts.map((c) => {
            const avatarStyle = getAvatarBg(c.category);
            return (
              <div
                key={c.id}
                className="flex items-center justify-between bg-slate-950/40 px-2.5 py-2 rounded-xl border border-slate-800 hover:bg-indigo-950/10 hover:border-indigo-500/20 transition duration-200"
              >
                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-[9px] shrink-0 select-none ${avatarStyle}`}>
                    {getInitials(c.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-white truncate max-w-[110px]">{c.name}</span>
                      <span className="text-[7px] bg-slate-900 border border-slate-700 text-slate-400 px-1 py-0.5 rounded font-bold uppercase tracking-wide shrink-0">
                        {translateCategory(c.category)}
                      </span>
                    </div>
                    <span className="text-[9.5px] font-mono text-slate-500 leading-none">{c.phoneNumber}</span>
                  </div>
                </div>

                {/* Right: Status + Delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={c.status}
                    onChange={(e) => {
                      const ns = e.target.value as Contact['status'];
                      onUpdate(contacts.map((x) => x.id === c.id ? { ...x, status: ns } : x));
                    }}
                    className={`rounded-xl text-[9.5px] font-mono font-bold cursor-pointer border appearance-none px-2 py-1.5 focus:outline-none transition ${
                      c.status === 'allow' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25'
                      : c.status === 'screen' ? 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/25'
                    }`}
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="allow">{t.allowedTag}</option>
                    <option value="screen">{t.screenTag}</option>
                    <option value="block">{t.blockedTag}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDeleteContact(c.id)}
                    className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-900 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {filteredContacts.length > 0 && (
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
          <span className="text-[10px] text-slate-500 font-mono">
            {language === 'hi'
              ? `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filteredContacts.length)} / ${filteredContacts.length}`
              : `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filteredContacts.length)} of ${filteredContacts.length}`
            }
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              ‹ {language === 'hi' ? 'पिछला' : 'Prev'}
            </button>
            <span className="px-2 text-[10px] font-bold text-slate-400">{safePage}/{totalPages}</span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {language === 'hi' ? 'अगला' : 'Next'} ›
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
