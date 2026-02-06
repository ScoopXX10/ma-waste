import { useEffect, useRef } from 'react'

function Drawer({ isOpen, onClose, title, children }) {
  const drawerRef = useRef(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-500 ease-out
          w-full md:w-[90vw] lg:w-[80vw] xl:w-[70vw] max-w-6xl
          bg-slate-950 border-l border-paper/10 shadow-2xl
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-950 border-b border-paper/10 px-6 py-4 flex items-center justify-between">
          <h2
            id="drawer-title"
            className="font-display text-2xl md:text-3xl text-blood-light truncate pr-4"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-paper/60 hover:text-warning
              hover:bg-paper/5 transition-colors group"
            aria-label="Close drawer"
          >
            <svg
              className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-73px)] overflow-y-auto overscroll-contain">
          <div className="p-6 md:p-8 lg:p-12">{children}</div>
        </div>

        {/* Close hint on desktop */}
        <div className="hidden md:block absolute bottom-6 left-6 font-mono text-xs text-paper/30">
          Press ESC to close
        </div>
      </div>
    </>
  )
}

export default Drawer
