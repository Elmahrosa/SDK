
import React, { useState } from 'react';
import { ElmahrosaSDK } from '../sdk/index';
import { SDKUser, UserSession } from '../types';
import { ShieldCheck, Cpu, Fingerprint, MapPin, RefreshCw, AlertCircle } from 'lucide-react';

interface AuthViewProps {
  sdk: ElmahrosaSDK;
  user: SDKUser | null;
  onAuthSuccess: (data: { user: SDKUser, session: UserSession }) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ sdk, user, onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<'pi' | 'teos' | 'wallet'>('pi');
  const [config, setConfig] = useState({
    biometric: true,
    egyptianId: false
  });

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      // For wallet method, we simulate signature payload
      const credentials = method === 'wallet' ? {
        walletAddress: '0x123...456',
        signature: '0x_SIMULATED_SIG_DATA_XYZ',
        message: 'Authenticate to Elmahrosa SDK Sandbox',
        chain: 'evm'
      } : {};

      const result = await sdk.auth.authenticate({
        method,
        credentials,
        biometric: config.biometric,
        egyptianId: config.egyptianId
      });

      if (result.success) {
        onAuthSuccess({ user: result.user, session: result.session });
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <ShieldCheck className="gold-accent" size={32} />
            <span>Auth Sandbox</span>
          </h2>
          <p className="text-zinc-500 mt-2">Test multi-factor authentication flows with sovereign adapters.</p>
        </div>
        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full flex items-center space-x-2">
          <Cpu size={16} className="text-zinc-600" />
          <span className="text-xs font-mono text-zinc-400">sdk-ver: 1.0.0-beta.4</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Select Provider</label>
              <div className="grid grid-cols-3 gap-3">
                {(['pi', 'teos', 'wallet'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center space-y-2 ${
                      method === m 
                        ? 'bg-zinc-800 border-yellow-500/50 text-white shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-lg font-bold uppercase">{m}</span>
                    <span className="text-[10px] opacity-60">Network</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Security Factors</label>
              <div className="space-y-3">
                <button 
                  onClick={() => setConfig(prev => ({ ...prev, biometric: !prev.biometric }))}
                  className="w-full flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Fingerprint size={18} className={config.biometric ? 'text-yellow-500' : 'text-zinc-600'} />
                    <span className="text-sm font-medium">Biometric Gating (WebAuthn)</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${config.biometric ? 'bg-yellow-500' : 'bg-zinc-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.biometric ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </button>

                <button 
                  onClick={() => setConfig(prev => ({ ...prev, egyptianId: !prev.egyptianId }))}
                  className="w-full flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin size={18} className={config.egyptianId ? 'text-yellow-500' : 'text-zinc-600'} />
                    <span className="text-sm font-medium">National ID Verification</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${config.egyptianId ? 'bg-yellow-500' : 'bg-zinc-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.egyptianId ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full py-4 gold-bg text-black font-black text-sm rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center space-x-3 uppercase tracking-widest"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Processing Session...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Initiate Authentication</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl flex items-start space-x-3">
                <AlertCircle className="text-red-400 mt-0.5" size={16} />
                <p className="text-xs font-medium text-red-300">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 h-full">
            <h3 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-6">Execution Log</h3>
            <div className="space-y-4 font-mono text-[11px]">
              <div className="flex space-x-3">
                <span className="text-zinc-700">14:02:01</span>
                <span className="text-green-500">[INFO]</span>
                <span className="text-zinc-400">SDK Instance initialized successfully</span>
              </div>
              <div className="flex space-x-3">
                <span className="text-zinc-700">14:02:02</span>
                <span className="text-blue-500">[DEBUG]</span>
                <span className="text-zinc-400">Environment: development (TEOS)</span>
              </div>
              {loading && (
                <div className="flex space-x-3 animate-pulse">
                  <span className="text-zinc-700">14:03:15</span>
                  <span className="text-yellow-500">[WAIT]</span>
                  <span className="text-zinc-400">Awaiting multi-factor resolution...</span>
                </div>
              )}
              {user && (
                <div className="flex space-x-3">
                  <span className="text-zinc-700">14:03:16</span>
                  <span className="text-green-500">[SUCCESS]</span>
                  <span className="text-zinc-300">Identity established for UID {user.id}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
