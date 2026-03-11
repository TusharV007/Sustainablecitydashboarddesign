import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { ImpactBadge } from '../components/ImpactBadge';
import { cities } from '../data/cities';
import { MapPin, Info } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

export function MapView() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const getMarkerColor = (impact: string) => {
    switch (impact) {
      case 'Low':
        return '#16a34a';
      case 'Medium':
        return '#eab308';
      case 'High':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Sustainability Map</h1>
          <p className="text-gray-600">
            Interactive map showing environmental impact levels across cities worldwide
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Click on any city marker to view detailed information. Markers are color-coded: Green
            (Low Impact), Yellow (Medium Impact), Red (High Impact).
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50">
                {/* SVG Map Visualization */}
                <svg className="w-full h-full" viewBox="0 0 1000 600">
                  {/* World map simplified representation */}
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="1000" height="600" fill="url(#grid)" />

                  {/* City Markers */}
                  {cities.map((city) => {
                    // Convert lat/lng to x/y coordinates (simplified projection)
                    const x = ((city.lng + 180) / 360) * 1000;
                    const y = ((90 - city.lat) / 180) * 600;
                    const isSelected = selectedCity.id === city.id;

                    return (
                      <g
                        key={city.id}
                        onClick={() => setSelectedCity(city)}
                        className="cursor-pointer transition-all"
                        style={{ transform: isSelected ? 'scale(1.2)' : 'scale(1)' }}
                      >
                        {/* Marker shadow */}
                        <circle
                          cx={x}
                          cy={y + 2}
                          r={isSelected ? 10 : 8}
                          fill="rgba(0,0,0,0.2)"
                          className="transition-all"
                        />
                        {/* Marker */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 10 : 8}
                          fill={getMarkerColor(city.impact)}
                          stroke="white"
                          strokeWidth={isSelected ? 3 : 2}
                          className="transition-all hover:opacity-80"
                        />
                        {/* Pulse effect for selected */}
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r={10}
                            fill="none"
                            stroke={getMarkerColor(city.impact)}
                            strokeWidth={2}
                            opacity={0.5}
                          >
                            <animate
                              attributeName="r"
                              from="10"
                              to="20"
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              from="0.5"
                              to="0"
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        {/* City name label */}
                        {isSelected && (
                          <text
                            x={x}
                            y={y - 15}
                            textAnchor="middle"
                            fill="#1f2937"
                            fontSize="12"
                            fontWeight="600"
                            className="pointer-events-none"
                          >
                            {city.name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-3">Impact Level</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-600"></div>
                      <span className="text-sm text-gray-700">Low Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-gray-700">Medium Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-600"></div>
                      <span className="text-sm text-gray-700">High Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* City Details Panel */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {selectedCity.country} • {selectedCity.region}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedCity.name}</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Sustainability Score</div>
                    <div className="text-3xl font-bold text-green-700">{selectedCity.score}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Environmental Impact</div>
                    <ImpactBadge impact={selectedCity.impact} />
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Global Rank</div>
                    <div className="text-xl font-semibold text-gray-900">
                      #{selectedCity.rank} of {cities.length}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CO₂ Emissions</span>
                      <span className="font-semibold">
                        {selectedCity.metrics.co2Emissions} t/capita
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Renewable Energy</span>
                      <span className="font-semibold">
                        {selectedCity.metrics.renewableEnergy}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Air Quality Index</span>
                      <span className="font-semibold">{selectedCity.metrics.airQualityIndex}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Recycling Rate</span>
                      <span className="font-semibold">
                        {selectedCity.metrics.wasteRecycling}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Green Space</span>
                      <span className="font-semibold">
                        {selectedCity.metrics.greenSpace} m²/capita
                      </span>
                    </div>
                  </div>
                </div>

                <Link to={`/city/${selectedCity.id}`} className="block">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Full Details
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cities List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedCity.id === city.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getMarkerColor(city.impact) }}
                  ></div>
                  <span className="font-semibold text-sm text-gray-900 truncate">
                    {city.name}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{city.country}</div>
                <div className="text-xs font-semibold text-green-700 mt-1">{city.score}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
