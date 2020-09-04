import React, { useEffect } from "react";
import './color-card.scss'

export const ColorCard = ({code,...props}) => {
  
  return (
    <div className="ccard-wrapper">
          <div className="ccard-cover" style={{"background": `${code}`}}/>
          <div className="ccard-body-wrapper">
            <p className="ccard-code">{code}</p>
          </div>
      </div>
  );
}
