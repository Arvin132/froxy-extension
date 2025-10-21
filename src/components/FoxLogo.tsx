export const FoxLogo: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fox ears */}
    <path d="M14 8 L18 18 L12 20 Z" fill="#FF6B35" />
    <path d="M34 8 L30 18 L36 20 Z" fill="#FF6B35" />
    
    {/* Fox head */}
    <circle cx="24" cy="26" r="14" fill="#FF8C42" />
    
    {/* Fox face details */}
    <path d="M24 32 L18 28 L18 24 L24 26 L30 24 L30 28 Z" fill="#FFF5E1" />
    <circle cx="19" cy="24" r="2" fill="#2C1810" />
    <circle cx="29" cy="24" r="2" fill="#2C1810" />
    
    {/* Fox nose */}
    <circle cx="24" cy="28" r="1.5" fill="#2C1810" />
  </svg>
);