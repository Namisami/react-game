import React from 'react';

import './Portrait.css';

interface PortraitProps {
  // In future SRC field must be REQUIRED or has default value
  portraitSrc?: string
  className?: string
}

const Portrait = ({
  portraitSrc,
  className,
}: PortraitProps) => {
  return (
    <div className={`${className} portrait`}>
      {/* Image of character who talks */}
    </div>
  )
};

export default Portrait;