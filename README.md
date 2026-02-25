# React Turkey Map

A reusable React component for displaying an interactive SVG map of Turkey. Extracted from a custom implementation.

## Installation

You can install this package by linking it locally or publishing it to an npm registry.
If you are using it locally:

```bash
# In your main project:
npm install /path/to/react-turkey-map
# or with bun
bun add /path/to/react-turkey-map
```

## Usage

```tsx
import React, { useState } from "react";
import { TurkeyMap, CityData } from "react-turkey-map";

function App() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);

  const getCityColor = (city: CityData) => {
    // You can color logic by plateNumber or name
    if (city.name === "İzmir") return "#dc3522";
    if (city.plateNumber === 34) return "#ffaa00";
    return "#2d3748";
  };

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <h2>Turkey Map</h2>
      <TurkeyMap
        onClick={(city) => setSelectedCity(city)}
        onHover={(city) => setHoveredCity(city)}
        getCityColor={getCityColor}
        hoverColor="#dc3522"
        defaultColor="#2d3748"
        strokeColor="#ffffff"
        showDropShadow={true}
      />

      {selectedCity && <p>Clicked: {selectedCity.name}</p>}
      {hoveredCity && <p>Hovering: {hoveredCity.name}</p>}
    </div>
  );
}

export default App;
```

## Props

The `TurkeyMap` component accepts the following props:

- `onClick?: (cityData: CityData) => void`: Callback fired when a city is clicked.
- `onHover?: (cityData: CityData | null) => void`: Callback fired when mouse hovers over a city. Null when mouse leaves.
- `getCityColor?: (cityData: CityData) => string`: Function to dynamically determine the fill color of each city.
- `className?: string`: Custom CSS class for the wrapper div.
- `hoverColor?: string`: Hover color for cities. (Default: `#dc3522`)
- `defaultColor?: string`: Default fill color for cities if `getCityColor` is not provided. (Default: `#2d3748`)
- `strokeColor?: string`: Stroke color for city borders. (Default: `#fff`)
- `strokeWidth?: number`: Stroke width for city borders. (Default: `1`)
- `hoverStrokeWidth?: number`: Stroke width for city borders on hover. (Default: `2`)
- `showDropShadow?: boolean`: Enable a drop shadow filter under the SVG map. (Default: `true`)
