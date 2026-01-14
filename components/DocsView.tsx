
import React from 'react';
import { Book, Code, Terminal, Server, Globe, Shield } from 'lucide-react';

export const DocsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-white mb-2">Technical Specifications</h2>
        <p className="text-zinc-500">Master the ELMAHROSA-SDK with our comprehensive integration guides and API references.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Terminal, title: 'Quick Start', desc: 'Install and authenticate in under 5 minutes.' },
          { icon: Server, title: 'Core Modules', desc: 'Auth, Wallet, and Governance primitives.' },
          { icon: Shield, title: 'Compliance', desc: 'Integrating Egyptian ID and audit trails.' },
          { icon: Code, title: 'Chain Adapters', desc: 'Native support for TEOS, Pi, and EVM.' },
          { icon: Globe, title: 'i18n Engine', desc: 'Building RTL applications for MENA.' },
          { icon: Book, title: 'Use Cases', desc: 'Marketplaces, Petitions, and Staking.' },
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center mb-4 text-zinc-500 group-hover:gold-accent transition-colors">
              <item.icon size={24} />
            </div>
            <h4 className="text-white font-bold mb-1">{item.title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 font-mono text-sm overflow-hidden">
        <div className="flex items-center space-x-2 mb-6 border-b border-zinc-900 pb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-zinc-500 text-xs">example-usage.js</span>
        </div>
        <pre className="text-zinc-400 space-y-1">
          <code className="block"><span className="text-purple-400">import</span> {'{ ElmahrosaSDK }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@elmahrosa/sdk'</span>;</code>
          <code className="block"> </code>
          <code className="block"><span className="text-zinc-600">// Initialize Sovereign SDK</span></code>
          <code className="block"><span className="text-purple-400">const</span> sdk = <span className="text-purple-400">new</span> <span className="text-yellow-400">ElmahrosaSDK</span>({'{'}</code>
          <code className="block">  environment: <span className="text-green-400">'production'</span>,</code>
          <code className="block">  apiKey: process.env.ELMAHROSA_KEY,</code>
          <code className="block">  chains: [<span className="text-green-400">'teos'</span>, <span className="text-green-400">'pi'</span>]</code>
          <code className="block">{'}'});</code>
          <code className="block"> </code>
          <code className="block"><span className="text-zinc-600">// Multi-Factor Sovereign Auth</span></code>
          <code className="block"><span className="text-purple-400">const</span> result = <span className="text-purple-400">await</span> sdk.auth.<span className="text-blue-400">authenticate</span>({'{'}</code>
          <code className="block">  method: <span className="text-green-400">'pi'</span>,</code>
          <code className="block">  biometric: <span className="text-purple-400">true</span>,</code>
          <code className="block">  egyptianId: <span className="text-purple-400">true</span></code>
          <code className="block">{'}'});</code>
          <code className="block"> </code>
          {/* Fix the usage of template literal syntax in documentation to avoid React/TS confusion if needed, though this is just rendered text */}
          <code className="block"><span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-green-400">{'`Welcome, ${result.user.username}`'}</span>);</code>
        </pre>
      </div>

      <div className="flex items-center justify-between p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
        <div className="flex items-center space-x-6">
          <img src="https://picsum.photos/seed/sdk/80/80" className="w-20 h-20 rounded-2xl grayscale" alt="SDK Avatar" />
          <div>
            <h4 className="text-xl font-bold text-white">Need enterprise support?</h4>
            <p className="text-zinc-500 max-w-sm">Direct integration assistance from Elmahrosa International — TEOS Egypt core team.</p>
          </div>
        </div>
        <a href="mailto:ayman@teosegypt.com" className="px-8 py-4 bg-white text-black font-black text-sm rounded-2xl hover:bg-zinc-200 transition-colors uppercase tracking-widest">
          Email Maintainer
        </a>
      </div>
    </div>
  );
};
