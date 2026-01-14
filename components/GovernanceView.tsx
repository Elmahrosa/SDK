
import React from 'react';
import { SDKUser } from '../types';
import { Vote, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const GovernanceView: React.FC<{ user: SDKUser | null }> = ({ user }) => {
  const petitions = [
    { 
      id: 'PET-2023-09', 
      title: 'Infrastructure Upgrade for Cairo Data Node', 
      description: 'Allocation of 500k ERT for high-speed fiber backbone connection.',
      status: 'voting', 
      progress: 78, 
      quorum: 50,
      deadline: '2 days left'
    },
    { 
      id: 'PET-2023-10', 
      title: 'Merchant Integration Grant Program', 
      description: 'Support for local startups integrating Pi Network and TEOS payments.',
      status: 'passed', 
      progress: 92, 
      quorum: 40,
      deadline: 'Closed'
    },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Vote className="text-purple-400" size={32} />
            <span>Civic Governance</span>
          </h2>
          <p className="text-zinc-500 mt-2">Transparent decision-making for the sovereign community.</p>
        </div>
        <button className="px-6 py-3 gold-bg text-black font-black text-xs rounded-xl hover:opacity-90 uppercase tracking-widest">
          Create Petition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {petitions.map((pet) => (
          <div key={pet.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 relative overflow-hidden group">
            {pet.status === 'passed' && (
              <div className="absolute top-4 right-4 text-green-500 rotate-12 opacity-20">
                <CheckCircle2 size={80} />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{pet.id}</span>
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                pet.status === 'voting' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
              }`}>
                {pet.status}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:gold-accent transition-colors">{pet.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{pet.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                <span className="text-zinc-600">Progress</span>
                <span className="text-zinc-300">{pet.progress}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${pet.status === 'passed' ? 'bg-green-500' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]'}`} 
                  style={{ width: `${pet.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600">
                <span>Quorum: {pet.quorum}% required</span>
                <span className="flex items-center space-x-1">
                  <Clock size={10} />
                  <span>{pet.deadline}</span>
                </span>
              </div>
            </div>

            {user?.permissions.includes('community_voting') ? (
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest">
                  Reject
                </button>
                <button className="py-3 bg-zinc-100 text-black rounded-xl text-xs font-black hover:bg-white transition-colors uppercase tracking-widest">
                  Vote Support
                </button>
              </div>
            ) : (
              <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex items-center space-x-3 text-zinc-600">
                <AlertCircle size={16} />
                <span className="text-xs font-medium">Connect wallet with voting permissions to participate.</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
