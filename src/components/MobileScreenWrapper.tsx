import React from 'react';

interface MobileScreenWrapperProps {
  children: React.ReactNode;
  isMobileMode: boolean;
}

const MobileScreenWrapper: React.FC<MobileScreenWrapperProps> = ({ children, isMobileMode }) => {
  if (!isMobileMode) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-screen-container">
      <div className="mobile-frame">
        <div className="mobile-notch">
          <div className="mobile-dynamic-island"></div>
        </div>
        <div className="mobile-screen">
          <div className="mobile-content">
            {children}
          </div>
        </div>
        <div className="mobile-home-indicator"></div>
      </div>
    </div>
  );
};

export default MobileScreenWrapper; 