import React, { useState } from 'react';
import iller from '../data/iller.json';

export interface CityData {
  id: string;
  plateNumber: number;
  name: string;
}

export interface TurkeyMapProps {
  /**
   * Callback fired when a city is clicked.
   */
  onClick?: (cityData: CityData) => void;
  
  /**
   * Callback fired when mouse hovers over a city. Null when mouse leaves.
   */
  onHover?: (cityData: CityData | null) => void;
  
  /**
   * Function to determine the fill color of a city.
   */
  getCityColor?: (cityData: CityData) => string;
  
  /**
   * CSS class name for the wrapper div.
   */
  className?: string;
  
  /**
   * Hover color for cities. Default is '#dc3522'.
   */
  hoverColor?: string;
  
  /**
   * Default fill color for cities if getCityColor is not provided. Default is '#2d3748'.
   */
  defaultColor?: string;
  
  /**
   * Stroke color for city borders. Default is '#fff'.
   */
  strokeColor?: string;
  
  /**
   * Stroke width for city borders. Default is 1.
   */
  strokeWidth?: number;
  
  /**
   * Stroke width for city borders on hover. Default is 2.
   */
  hoverStrokeWidth?: number;
  
  /**
   * Enable or disable drop shadow effect. Default is true.
   */
  showDropShadow?: boolean;
}

const TurkeyMap: React.FC<TurkeyMapProps> = ({
  onClick,
  onHover,
  getCityColor,
  className = '',
  hoverColor = '#dc3522',
  defaultColor = '#2d3748',
  strokeColor = '#fff',
  strokeWidth = 1,
  hoverStrokeWidth = 2,
  showDropShadow = true,
}) => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className={`turkey-map-container ${className}`}>
      <svg viewBox="0 0 1000 500" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
        {showDropShadow && (
          <filter id="mapDropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        
        <g transform="translate(0, 0)" style={showDropShadow ? { filter: 'url(#mapDropshadow)' } : undefined}>
          {iller.map((city) => {
            const cityProps: CityData = {
              id: city.id,
              plateNumber: city.plateNumber,
              name: city.name,
            };

            return (
              <g
                key={city.id}
                id={city.id}
                data-name={city.name}
                style={{ cursor: onClick || onHover ? 'pointer' : 'default', transition: 'all 0.3s ease-in-out' }}
                onMouseEnter={() => {
                  setHoveredPath(city.id);
                  if (onHover) onHover(cityProps);
                }}
                onMouseLeave={() => {
                  setHoveredPath(null);
                  if (onHover) onHover(null);
                }}
                onClick={() => {
                  if (onClick) onClick(cityProps);
                }}
              >
                {city.paths.map((p, i) => {
                  const isHovered = hoveredPath === city.id;
                  const isShape = i === 0;

                  let fill = strokeColor;

                  if (isShape) {
                    if (isHovered && hoverColor) {
                      fill = hoverColor;
                    } else if (getCityColor) {
                      fill = getCityColor(cityProps) || defaultColor;
                    } else {
                      fill = defaultColor;
                    }
                  }

                  const stroke = isShape ? strokeColor : 'none';
                  const currentStrokeWidth = isShape ? (isHovered ? hoverStrokeWidth : strokeWidth) : 0;

                  return (
                    <path
                      key={i}
                      d={p}
                      fill={fill}
                      shapeRendering="geometricPrecision"
                      style={{
                        stroke: stroke,
                        strokeWidth: currentStrokeWidth,
                        transition: 'fill 0.3s ease-in-out, stroke-width 0.3s ease-in-out'
                      }}
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default TurkeyMap;
