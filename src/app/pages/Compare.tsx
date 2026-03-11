import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImpactBadge } from '../components/ImpactBadge';
import { cities } from '../data/cities';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Check,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  AlertCircle,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function Compare() {
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>([cities[0].id, cities[3].id]);

  const selectedCities = selectedCityIds
    .map((id) => cities.find((c) => c.id === id))
    .filter(Boolean);

  const addCity = (cityId: string) => {
    if (selectedCityIds.length < 4 && !selectedCityIds.includes(cityId)) {
      setSelectedCityIds([...selectedCityIds, cityId]);
    }
  };

  const removeCity = (cityId: string) => {
    setSelectedCityIds(selectedCityIds.filter((id) => id !== cityId));
  };

  // Prepare comparison data for charts
  const metricsComparisonData = [
    {
      metric: 'Sustainability Score',
      ...Object.fromEntries(selectedCities.map((city) => [city!.name, city!.score])),
    },
    {
      metric: 'Renewable Energy %',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.renewableEnergy])
      ),
    },
    {
      metric: 'Recycling Rate %',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.wasteRecycling])
      ),
    },
    {
      metric: 'Public Transport %',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.publicTransport])
      ),
    },
    {
      metric: 'Water Quality',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.waterQuality])
      ),
    },
    {
      metric: 'Energy Efficiency',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.energyEfficiency])
      ),
    },
  ];

  const colors = ['#16a34a', '#2563eb', '#d97706', '#dc2626'];

  const radarData = [
    {
      metric: 'Renewable',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.renewableEnergy])
      ),
    },
    {
      metric: 'Recycling',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.wasteRecycling])
      ),
    },
    {
      metric: 'Transport',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.publicTransport])
      ),
    },
    {
      metric: 'Water',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.waterQuality])
      ),
    },
    {
      metric: 'Efficiency',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, city!.metrics.energyEfficiency])
      ),
    },
    {
      metric: 'Air Quality',
      ...Object.fromEntries(
        selectedCities.map((city) => [city!.name, 100 - city!.metrics.airQualityIndex / 5])
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Cities</h1>
          <p className="text-gray-600">
            Select up to 4 cities to compare their sustainability metrics side by side
          </p>
        </div>

        {/* City Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Cities to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => {
                const cityId = selectedCityIds[index];
                const city = cityId ? cities.find((c) => c.id === cityId) : null;

                return (
                  <div key={index}>
                    {city ? (
                      <div className="border-2 border-green-600 bg-green-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{city.name}</h3>
                            <p className="text-sm text-gray-600">{city.country}</p>
                          </div>
                          <button
                            onClick={() => removeCity(cityId)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-2xl font-bold text-green-700 mb-2">{city.score}</div>
                        <ImpactBadge impact={city.impact} size="sm" />
                      </div>
                    ) : (
                      <Select onValueChange={addCity}>
                        <SelectTrigger className="h-auto min-h-[140px] border-2 border-dashed">
                          <div className="flex flex-col items-center justify-center gap-2 py-4">
                            <Plus className="w-6 h-6 text-gray-400" />
                            <SelectValue placeholder="Add City" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {cities
                            .filter((c) => !selectedCityIds.includes(c.id))
                            .map((city) => (
                              <SelectItem key={city.id} value={city.id}>
                                {city.name} ({city.country})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedCities.length < 2 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select at least 2 cities to compare
              </h3>
              <p className="text-gray-600">
                Choose cities from the dropdowns above to see detailed comparisons
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overall Comparison */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Overall Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                        {selectedCities.map((city, index) => (
                          <th
                            key={city!.id}
                            className="text-center py-3 px-4 font-semibold text-gray-700"
                          >
                            {city!.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          Sustainability Score
                        </td>
                        {selectedCities.map((city) => (
                          <td key={city!.id} className="text-center py-3 px-4">
                            <span className="text-lg font-bold text-green-700">{city!.score}</span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Global Rank</td>
                        {selectedCities.map((city) => (
                          <td key={city!.id} className="text-center py-3 px-4">
                            <span className="font-semibold">#{city!.rank}</span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Impact Level</td>
                        {selectedCities.map((city) => (
                          <td key={city!.id} className="text-center py-3 px-4">
                            <div className="flex justify-center">
                              <ImpactBadge impact={city!.impact} size="sm" />
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          CO₂ Emissions (t/capita)
                        </td>
                        {selectedCities.map((city) => {
                          const lowestCO2 = Math.min(
                            ...selectedCities.map((c) => c!.metrics.co2Emissions)
                          );
                          const isBest = city!.metrics.co2Emissions === lowestCO2;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.co2Emissions}
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Air Quality Index</td>
                        {selectedCities.map((city) => {
                          const lowestAQI = Math.min(
                            ...selectedCities.map((c) => c!.metrics.airQualityIndex)
                          );
                          const isBest = city!.metrics.airQualityIndex === lowestAQI;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.airQualityIndex}
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          Renewable Energy (%)
                        </td>
                        {selectedCities.map((city) => {
                          const highest = Math.max(
                            ...selectedCities.map((c) => c!.metrics.renewableEnergy)
                          );
                          const isBest = city!.metrics.renewableEnergy === highest;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.renewableEnergy}%
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Recycling Rate (%)</td>
                        {selectedCities.map((city) => {
                          const highest = Math.max(
                            ...selectedCities.map((c) => c!.metrics.wasteRecycling)
                          );
                          const isBest = city!.metrics.wasteRecycling === highest;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.wasteRecycling}%
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          Green Space (m²/capita)
                        </td>
                        {selectedCities.map((city) => {
                          const highest = Math.max(
                            ...selectedCities.map((c) => c!.metrics.greenSpace)
                          );
                          const isBest = city!.metrics.greenSpace === highest;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.greenSpace}
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          Public Transport Usage (%)
                        </td>
                        {selectedCities.map((city) => {
                          const highest = Math.max(
                            ...selectedCities.map((c) => c!.metrics.publicTransport)
                          );
                          const isBest = city!.metrics.publicTransport === highest;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.publicTransport}%
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Water Quality</td>
                        {selectedCities.map((city) => {
                          const highest = Math.max(
                            ...selectedCities.map((c) => c!.metrics.waterQuality)
                          );
                          const isBest = city!.metrics.waterQuality === highest;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.waterQuality}
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Energy Efficiency</td>
                        {selectedCities.map((city) => {
                          const highest = Math.max(
                            ...selectedCities.map((c) => c!.metrics.energyEfficiency)
                          );
                          const isBest = city!.metrics.energyEfficiency === highest;
                          return (
                            <td key={city!.id} className="text-center py-3 px-4">
                              <span className={isBest ? 'text-green-700 font-semibold' : ''}>
                                {city!.metrics.energyEfficiency}
                              </span>
                              {isBest && <Check className="w-4 h-4 text-green-600 inline ml-1" />}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Comparison Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={metricsComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip />
                    <Legend />
                    {selectedCities.map((city, index) => (
                      <Bar key={city!.id} dataKey={city!.name} fill={colors[index]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280' }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                    {selectedCities.map((city, index) => (
                      <Radar
                        key={city!.id}
                        name={city!.name}
                        dataKey={city!.name}
                        stroke={colors[index]}
                        fill={colors[index]}
                        fillOpacity={0.2}
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
