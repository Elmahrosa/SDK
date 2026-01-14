
import React from 'react';
import { SDKUser } from '../types';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, History } from 'lucide-react';

export const WalletView: React.FC<{ user: SDKUser | null }> = ({ user }) => {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-700 border border-zinc-800">
          <Wallet size={40} />
        </div>
        <h3 className="text-xl font-bold text-white">Connect SDK to view Unified Wallet</h3>
        <p className="text-zinc-500 max-w-sm">You need an active session to interact with cross-chain balances and assets.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Wallet size={120} />
             </div>
             
             <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Sovereign Balance</p>
             <h3 className="text-4xl font-black text-white mb-8">$2,450.12</h3>
             
             <div className="space-y-4">
               <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-2xl border border-zinc-800">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 gold-bg rounded-lg flex items-center justify-center font-bold text-black text-xs">ERT</div>
                   <div>
                     <p className="text-xs font-bold text-white">ERT (Elmahrosa)</p>
                     <p className="text-[10px] text-zinc-500">{user.ertBalance?.toLocaleString() || '0'} Staked</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-white">{(user.ertBalance || 0).toLocaleString()}</p>
                   <p className="text-[10px] text-zinc-500">Mainnet</p>
                 </div>
               </div>

               <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-2xl border border-zinc-800">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">PI</div>
                   <div>
                     <p className="text-xs font-bold text-white">Pi Network</p>
                     <p className="text-[10px] text-zinc-500">SSO Linked</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-white">{(user.piBalance || 0).toLocaleString()}</p>
                   <p className="text-[10px] text-zinc-500">Browser SDK</p>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-3 mt-8">
                <button className="flex items-center justify-center space-x-2 py-3 bg-zinc-100 text-black font-bold text-xs rounded-xl hover:bg-white transition-colors">
                  <Plus size={14} />
                  <span>Receive</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-zinc-800 text-white font-bold text-xs rounded-xl hover:bg-zinc-700 transition-colors">
                  <ArrowUpRight size={14} />
                  <span>Send</span>
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden">
            <div className="px-8 py-6 border-b border-zinc-900 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center space-x-2">
                <History size={18} className="text-zinc-500" />
                <span>Unified Activity Log</span>
              </h3>
              <button className="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-widest">Download CSV</button>
            </div>
            <div className="divide-y divide-zinc-900">
              {[
                { type: 'IN', amount: '+450 ERT', from: 'teos1...902', date: 'Oct 12, 10:45 AM', status: 'confirmed' },
                { type: 'OUT', amount: '-12.5 PI', to: 'pi_market_99', date: 'Oct 11, 09:20 PM', status: 'confirmed' },
                { type: 'IN', amount: '+0.1 SOL', from: 'sol_faucet', date: 'Oct 10, 04:15 PM', status: 'confirmed' },
                { type: 'SWAP', amount: '100 PI -> 50 ERT', from: 'Dolphin Aggregator', date: 'Oct 09, 11:30 AM', status: 'confirmed' },
              ].map((tx, i) => (
                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-zinc-900/30 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'IN' ? 'bg-green-500/10 text-green-500' : 
                      tx.type === 'OUT' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {tx.type === 'IN' ? <ArrowDownLeft size={20} /> : tx.type === 'OUT' ? <ArrowUpRight size={20} /> : <Plus size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:gold-accent transition-colors">{tx.amount}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{tx.from ? `From: ${tx.from}` : `To: ${tx.to}`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-zinc-300">{tx.date}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-zinc-900 text-[10px] font-bold text-zinc-500 rounded uppercase tracking-tighter">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
