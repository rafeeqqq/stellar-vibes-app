import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-slate-900/50">
      {/* Phone frame wrapper - only visible on larger screens */}
      <div className="w-full max-w-[430px] min-h-screen relative shadow-2xl">
        {/* Phone bezel effect on desktop */}
        <div className="hidden sm:block absolute -inset-2 bg-slate-800 rounded-[2.5rem] -z-10 shadow-xl" />
        <div className="hidden sm:block absolute -inset-1 bg-slate-900 rounded-[2rem] -z-10" />
        
        {/* App content */}
        <div className="w-full min-h-screen bg-background overflow-x-hidden sm:rounded-[1.5rem] sm:overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
