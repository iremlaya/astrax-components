import React, { useEffect } from "react";
import './text-card.scss'

export const TextCard = ({header, subheader, style, ...props}) => {
  
  return (
    <div className="tcard-wrapper">
          <p className="tcard-header" style={style}>{header}</p>
          <p className="tcard-subheader">{subheader}</p>
      </div>
  );
}
