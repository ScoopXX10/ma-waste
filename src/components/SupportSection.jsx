import { useState } from 'react'

const wallets = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1p0863rdqpwu6w9s6sptvqagp4tveamfrwxvmtwwkgtdtzaqldts3spjgmkj',
    color: '#F7931A',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" />
      </svg>
    ),
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x3109a1c704a679239fF4d35529a8944C2d0D95aA',
    color: '#627EEA',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z" />
      </svg>
    ),
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    address: '8HHN91iNdw4iY2HPYL3Vu6TjkN2bfWNENJw5zAit6DMu',
    color: '#9945FF',
    icon: (
      <svg viewBox="0 0 397.7 311.7" className="w-8 h-8" fill="currentColor">
        <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
        <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
        <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
      </svg>
    ),
  },
]

function WalletCard({ wallet }) {
  const [copied, setCopied] = useState(false)

  const truncateAddress = (addr) => {
    if (addr.length <= 20) return addr
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-slate-900/50 border border-paper/10 p-4 flex flex-col items-center text-center">
      {/* Icon */}
      <div style={{ color: wallet.color }} className="mb-3">
        {wallet.icon}
      </div>

      {/* Name */}
      <div className="font-mono text-xs text-paper/50 uppercase tracking-wider mb-1">
        {wallet.name}
      </div>

      {/* Truncated address */}
      <div className="font-mono text-sm text-paper/70 mb-3 break-all">
        {truncateAddress(wallet.address)}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
          copied
            ? 'bg-green-600/20 text-green-400 border border-green-500/30'
            : 'bg-paper/5 text-paper/60 border border-paper/20 hover:border-paper/40 hover:text-paper'
        }`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function SupportSection() {
  return (
    <section className="py-12 bg-slate-950 border-t border-paper/5">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl text-paper/80 mb-2">
              Support This Project
            </h3>
            <p className="font-serif text-sm text-paper/50 max-w-lg mx-auto">
              This site is independently researched and maintained. If you found
              it valuable, consider supporting continued development.
            </p>
          </div>

          {/* Wallet cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wallets.map((wallet) => (
              <WalletCard key={wallet.symbol} wallet={wallet} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportSection
