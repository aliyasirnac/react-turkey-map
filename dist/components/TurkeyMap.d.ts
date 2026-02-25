import { default as React } from 'react';

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
declare const TurkeyMap: React.FC<TurkeyMapProps>;
export default TurkeyMap;
