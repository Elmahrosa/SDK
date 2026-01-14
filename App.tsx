
import React, { useState } from 'react';
import { ElmahrosaSDK } from './sdk/index';
import { SDKUser, UserSession } from './types';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Wallet, 
  Vote, 
  BookOpen, 
  ChevronRight,
  User,
  LogOut,
  Globe,
  Bell,
  Sparkles
} from 'lucide-react';

// Components
import { AuthView } from './components/AuthView';
import { WalletView } from './components/WalletView';
import { GovernanceView } from './components/GovernanceView';
import { DocsView } from './components/DocsView';
import { HomeView } from './components/HomeView';
import { AIAssistantView } from './components/AIAssistantView';

const SDK_INSTANCE = new ElmahrosaSDK({
  environment: 'development',
  chains: ['teos', 'pi', 'solana']
});

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<SDKUser | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  const handleLogout = () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('elmahrosa_session');
    setActiveTab('home');
  };

  const onAuthSuccess = (data: { user: SDKUser, session: UserSession }) => {
    setUser(data.user);
    setSession(data.session);
    setActiveTab('home');
  };

  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'auth', icon: ShieldCheck, label: 'Auth Sandbox' },
    { id: 'wallet', icon: Wallet, label: 'Unified Wallet' },
    { id: 'governance', icon: Vote, label: 'Civic Governance' },
    { id: 'ai', icon: Sparkles, label: 'Sovereign AI' },
    { id: 'docs', icon: BookOpen, label: 'Documentation' },
  ];

  return (
    <div className="flex h-screen overflow-hidden egyptian-gradient text-zinc-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 gold-bg rounded-lg flex items-center justify-center font-bold text-black text-xl">E</div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">ELMAHROSA</h1>
            <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">Sovereign SDK</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-zinc-800 text-white border border-zinc-700' 
                  : 'hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'gold-accent' : 'group-hover:text-zinc-400'} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          {user ? (
            <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{user.username || 'User'}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{user.walletAddress}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <LogOut size={14} />
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setActiveTab('auth')}
              className="w-full py-3 gold-bg text-black font-bold text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              Connect SDK
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-950/20 backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-zinc-500 text-sm">
            <span>Core</span>
            <ChevronRight size={14} />
            <span className="text-zinc-300 font-medium capitalize">{activeTab}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors">
              <Globe size={20} />
            </button>
            <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full border border-black"></span>
            </button>
            <div className="h-6 w-px bg-zinc-800 mx-2"></div>
            <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Mainnet Ready</span>
            </div>
          </div>
        </header>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto h-full">
            {activeTab === 'home' && <HomeView user={user} setActiveTab={setActiveTab} />}
            {activeTab === 'auth' && <AuthView sdk={SDK_INSTANCE} user={user} onAuthSuccess={onAuthSuccess} />}
            {activeTab === 'wallet' && <WalletView user={user} />}
            {activeTab === 'governance' && <GovernanceView user={user} />}
            {activeTab === 'ai' && <AIAssistantView />}
            {activeTab === 'docs' && <DocsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
