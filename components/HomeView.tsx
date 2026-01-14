
import React from 'react';
import { SDKUser } from '../types';
/* Added ChevronRight to the imports from lucide-react */
import { Activity, Shield, Coins, Users, ExternalLink, ChevronRight } from 'lucide-react';

export const HomeView: React.FC<{ user: SDKUser | null, setActiveTab: (t: string) => void }> = ({ user, setActiveTab }) => {
  const stats = [
    { label: 'Ecosystem Users', value: '14.2k', icon: Users, color: 'text-blue-400' },
    { label: 'Total Volume', value: '$2.1M', icon: Coins, color: 'text-green-400' },
    { label: 'Petitions Active', value: '84', icon: Shield, color: 'text-purple-400' },
    { label: 'SDK Requests/s', value: '1.2k', icon: Activity, color: 'text-yellow-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Elmahrosa Sovereign Sandbox</h2>
        <p className="text-zinc-500 max-w-2xl">
          Build the next generation of Egyptian Web3 applications with a civic-first mindset. 
          Integration for TEOS, Pi, Solana, and EVM chains starts here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={24} className={stat.color} />
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">REAL-TIME</span>
            </div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="w-48 h-48 bg-yellow-500 blur-[100px]"></div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">Sovereign Mission</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Elmahrosa SDK provides developer-ready primitives for building applications that align with Egyptian financial 
              and data sovereignty standards. From national identity verification hooks to Sharia-compliant financial metadata, 
              we bridge the gap between global decentralization and local requirements.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setActiveTab('auth')} className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-zinc-200 transition-colors">
                Explore SDK
              </button>
              <button onClick={() => setActiveTab('docs')} className="px-6 py-2.5 bg-zinc-800 text-white font-bold rounded-xl text-sm hover:bg-zinc-700 transition-colors flex items-center space-x-2">
                <span>View Specs</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Recent Chain Events</h3>
            <div className="space-y-4">
              {[
                { type: 'TEOS', event: 'New Governance Proposal #441', time: '2m ago' },
                { type: 'PI', event: 'Wallet Signature Authenticated', time: '14m ago' },
                { type: 'SOL', event: 'Anchor Program Deployment', time: '1h ago' },
                { type: 'EVM', event: 'Audit Trail Committed to Mainnet', time: '3h ago' },
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-900 last:border-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 w-12 text-center">{ev.type}</span>
                    <span className="text-sm font-medium text-zinc-300">{ev.event}</span>
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">{ev.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest text-zinc-400">SDK Maintainer</h3>
            <div className="flex items-center space-x-4 mb-6">
              <img src="https://picsum.photos/seed/ayman/100/100" className="w-16 h-16 rounded-2xl grayscale" alt="Maintainer" />
              <div>
                <p className="text-lg font-bold text-white">Ayman Seif</p>
                <p className="text-xs text-zinc-500">TEOS Egypt • Lead Dev</p>
              </div>
            </div>
            <div className="space-y-3">
              <a href="mailto:ayman@teosegypt.com" className="block p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors text-center">
                Contact Lead Dev
              </a>
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <p className="text-[10px] text-yellow-500/60 font-medium mb-1 uppercase tracking-tighter">Status</p>
                <p className="text-xs text-yellow-500 font-bold italic">"Building the digital pyramids of Web3"</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-zinc-400">Quick Links</h3>
            <ul className="space-y-2">
              {['Cairo Dev Hub', 'ERT Staking Portal', 'Compliance Docs', 'API Keys'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-xl text-sm font-medium transition-colors">
                    <span>{link}</span>
                    <ChevronRight size={14} className="text-zinc-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
