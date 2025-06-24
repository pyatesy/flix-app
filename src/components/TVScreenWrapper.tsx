import React from 'react';

interface TVScreenWrapperProps {
  children: React.ReactNode;
  isTVMode: boolean;
}

const TVScreenWrapper: React.FC<TVScreenWrapperProps> = ({ children, isTVMode }) => {
  if (!isTVMode) {
    return <>{children}</>;
  }

  return (
    <div className="tv-screen-container">
      <div className="tv-frame">
        <div className="tv-screen">
          <div className="tv-content">
            {children}
          </div>
        </div>
        <div className="tv-stand"></div>
      </div>
    </div>
  );
};

export default TVScreenWrapper; 