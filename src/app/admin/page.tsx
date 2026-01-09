/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useMemo } from 'react';
import { db, auth } from '@/lib/firebase';
import { 
  collection, query, orderBy, limit, getDocs, startAfter, 
  endBefore, limitToLast, where, getCountFromServer, Timestamp 
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  Search, ChevronLeft, ChevronRight, Download, 
  Users, Calendar, LogOut, Loader2, Database 
} from 'lucide-react';

const PAGE_SIZE = 15;

export default function AdminDashboard() {
  const [emails, setEmails] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination States
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [firstVisible, setFirstVisible] = useState<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        fetchInitialStats();
        fetchData();
      } else {
        setLoading(false);
      }
    });
  }, []);

  const fetchInitialStats = async () => {
    const coll = collection(db, "waitlist");
    const snapshot = await getCountFromServer(coll);
    setTotalCount(snapshot.data().count);
  };

  const fetchData = async (direction: 'next' | 'prev' | 'initial' = 'initial') => {
    setLoading(true);
    try {
      let q;
      const coll = collection(db, "waitlist");

      if (direction === 'next' && lastVisible) {
        q = query(coll, orderBy("timestamp", "desc"), startAfter(lastVisible), limit(PAGE_SIZE));
      } else if (direction === 'prev' && firstVisible) {
        q = query(coll, orderBy("timestamp", "desc"), endBefore(firstVisible), limitToLast(PAGE_SIZE));
      } else {
        q = query(coll, orderBy("timestamp", "desc"), limit(PAGE_SIZE));
      }

      const snap = await getDocs(q);
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      setFirstVisible(snap.docs[0]);
      setLastVisible(snap.docs[snap.docs.length - 1]);
      setEmails(docs);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      fetchData();
      return;
    }
    setLoading(true);
    // Note: Firestore doesn't support case-insensitive 'contains'. 
    // This looks for an exact match or prefix.
    const q = query(
      collection(db, "waitlist"), 
      where("email", ">=", searchQuery.toLowerCase()), 
      where("email", "<=", searchQuery.toLowerCase() + "\uf8ff"),
      limit(PAGE_SIZE)
    );
    const snap = await getDocs(q);
    setEmails(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email", "Joined Date"].join(",") + "\n"
      + emails.map(e => `${e.email},${e.timestamp?.toDate().toISOString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "waitlist_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (!user && !loading) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] text-center max-w-sm w-full shadow-2xl">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl mx-auto mb-6 flex items-center justify-center font-black italic text-black text-xl">DP</div>
          <h1 className="text-2xl font-black italic uppercase text-white mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm mb-8 font-medium italic">Double PLAi Waitlist Management</p>
          <button 
            onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
            className="w-full bg-white text-black py-4 rounded-xl font-black uppercase italic hover:bg-cyan-400 transition"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-cyan-500 text-black text-[10px] font-black px-2 py-0.5 rounded">HQ</span>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">Command Center</h1>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Waitlist Management // Database v2.0</p>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
              onClick={exportToCSV}
              className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold uppercase transition"
             >
               <Download size={14} /> Export CSV
             </button>
             <button 
              onClick={() => signOut(auth)}
              className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold uppercase transition"
             >
               <LogOut size={14} /> Sign Out
             </button>
          </div>
        </header>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<Users size={20}/>} label="Total Recruits" value={totalCount.toLocaleString()} sub="Verified Emails" />
          <StatCard icon={<Calendar size={20}/>} label="Latest Batch" value={emails.length.toString()} sub="Currently Viewing" />
          <StatCard icon={<Database size={20}/>} label="Storage Status" value="Healthy" sub="Firebase Cloud" color="text-lime-400" />
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="text" 
                placeholder="Search by email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-bold placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition"
              />
            </form>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-gray-600 uppercase">Page {page}</span>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1 || loading}
                  onClick={() => { setPage(p => p-1); fetchData('prev'); }}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-30 hover:bg-white/10 transition"
                >
                  <ChevronLeft size={20}/>
                </button>
                <button 
                  disabled={loading || emails.length < PAGE_SIZE}
                  onClick={() => { setPage(p => p+1); fetchData('next'); }}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-30 hover:bg-white/10 transition"
                >
                  <ChevronRight size={20}/>
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] bg-black">
                <tr>
                  <th className="p-6">User Identity</th>
                  <th className="p-6">Timestamp</th>
                  <th className="p-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-cyan-500 mb-4" size={32} />
                      <p className="text-xs font-black uppercase tracking-widest text-gray-600">Syncing with database...</p>
                    </td>
                  </tr>
                ) : emails.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.02] transition">
                    <td className="p-6">
                      <p className="text-sm font-black italic text-white group-hover:text-cyan-400 transition">{item.email}</p>
                      <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">ID: {item.id}</p>
                    </td>
                    <td className="p-6">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                        {item.timestamp?.toDate().toLocaleString() || 'Pending...'}
                      </p>
                    </td>
                    <td className="p-6 text-right">
                      <span className="bg-lime-400/10 text-lime-400 text-[9px] font-black px-3 py-1 rounded-full uppercase italic border border-lime-400/20">Verified Draft</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = "text-white" }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2rem] shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 border border-white/5">
          {icon}
        </div>
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
      </div>
      <p className={`text-4xl font-black italic uppercase mb-1 tracking-tighter ${color}`}>{value}</p>
      <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">{sub}</p>
    </div>
  );
}