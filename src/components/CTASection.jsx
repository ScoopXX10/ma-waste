import { useState } from 'react'

function CTASection() {
  const [copied, setCopied] = useState(false)

  const siteUrl = 'https://scoopxx10.github.io/ma-waste/'
  const shareText =
    '182,000 people left Massachusetts in 2025. $10.6B in income fled since 2020. See the data:'

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const shareToReddit = () => {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(siteUrl)}&title=${encodeURIComponent('MA-WASTE: The Data Behind Massachusetts Exodus')}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  return (
    <section className="py-20 md:py-28 bg-blood-dark/20 border-t border-blood-light/20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="font-display text-5xl md:text-7xl text-blood-light mb-6">
            WHAT CAN YOU DO?
          </h2>
          <p className="font-serif text-xl text-paper/70 mb-12">
            Information is power. Share the data with others.
          </p>

          {/* Share buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-2 bg-slate-950 border border-paper/20 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10
                px-6 py-3 font-mono text-sm text-paper/80 hover:text-[#1DA1F2] transition-all group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share on X</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="flex items-center gap-2 bg-slate-950 border border-paper/20 hover:border-[#1877F2] hover:bg-[#1877F2]/10
                px-6 py-3 font-mono text-sm text-paper/80 hover:text-[#1877F2] transition-all group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Share on Facebook</span>
            </button>

            <button
              onClick={shareToLinkedIn}
              className="flex items-center gap-2 bg-slate-950 border border-paper/20 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10
                px-6 py-3 font-mono text-sm text-paper/80 hover:text-[#0A66C2] transition-all group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Share on LinkedIn</span>
            </button>

            <button
              onClick={shareToReddit}
              className="flex items-center gap-2 bg-slate-950 border border-paper/20 hover:border-[#FF4500] hover:bg-[#FF4500]/10
                px-6 py-3 font-mono text-sm text-paper/80 hover:text-[#FF4500] transition-all group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
              <span>Share on Reddit</span>
            </button>
          </div>

          {/* Copy link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center bg-slate-950 border border-paper/20 px-4 py-2">
              <span className="font-mono text-sm text-paper/50 truncate max-w-[200px] sm:max-w-none">
                {siteUrl}
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-6 py-2 font-mono text-sm transition-all ${
                copied
                  ? 'bg-green-600 text-paper'
                  : 'bg-blood-light hover:bg-blood-light/80 text-paper'
              }`}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Other actions */}
          <div className="border-t border-paper/10 pt-12">
            <h3 className="font-display text-2xl text-paper mb-6">
              OTHER WAYS TO HELP
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-slate-950 border border-paper/10 p-6">
                <div className="text-2xl mb-3">📊</div>
                <h4 className="font-display text-lg text-warning mb-2">Verify the Data</h4>
                <p className="font-serif text-sm text-paper/60">
                  All sources are cited. Click through, fact-check, and draw your own conclusions.
                </p>
              </div>
              <div className="bg-slate-950 border border-paper/10 p-6">
                <div className="text-2xl mb-3">🗳️</div>
                <h4 className="font-display text-lg text-warning mb-2">Vote Informed</h4>
                <p className="font-serif text-sm text-paper/60">
                  Use this data when evaluating candidates and ballot questions.
                </p>
              </div>
              <div className="bg-slate-950 border border-paper/10 p-6">
                <div className="text-2xl mb-3">💬</div>
                <h4 className="font-display text-lg text-warning mb-2">Start Conversations</h4>
                <p className="font-serif text-sm text-paper/60">
                  Share with neighbors, colleagues, and local representatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
