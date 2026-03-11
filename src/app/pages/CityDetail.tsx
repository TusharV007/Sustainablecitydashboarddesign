import { useParams, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImpactBadge } from '../components/ImpactBadge';
import { MetricCard } from '../components/MetricCard';
import { cities } from '../data/cities';
import {
  ArrowLeft,
  MapPin,
  Award,
  TrendingUp,
  Wind,
  Droplet,
  Leaf,
  Recycle,
  Trees,
  Bus,
  Zap,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function CityDetail() {
  const { id } = useParams();
  const city = cities.find((c) => c.id === id);

  if (!city) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">City Not Found</h2>
            <p className="text-gray-600 mb-6">The requested city data could not be found.</p>
            <Link to="/rankings">
              <Button>Back to Rankings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare radar chart data
  const radarData = [
    {
      metric: 'Renewable Energy',
      value: city.metrics.renewableEnergy,
    },
    {
      metric: 'Recycling',
      value: city.metrics.wasteRecycling,
    },
    {
      metric: 'Public Transport',
      value: city.metrics.publicTransport,
    },
    {
      metric: 'Water Quality',
      value: city.metrics.waterQuality,
    },
    {
      metric: 'Energy Efficiency',
      value: city.metrics.energyEfficiency,
    },
    {
      metric: 'Air Quality',
      value: 100 - (city.metrics.airQualityIndex / 5), // Convert AQI to 0-100 scale (lower is better)
    },
  ];

  // Get impact classification explanation
  const getImpactExplanation = () => {
    if (city.impact === 'Low') {
      return 'This city demonstrates excellent environmental performance with low CO₂ emissions, high renewable energy adoption, and strong sustainability practices across all metrics.';
    } else if (city.impact === 'Medium') {
      return 'This city shows moderate environmental impact with room for improvement in key areas such as emissions reduction, renewable energy adoption, or waste management.';
    } else {
      return 'This city faces significant environmental challenges with high emissions, lower renewable energy usage, or poor air quality. Urgent action is recommended to improve sustainability.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/rankings">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Rankings
          </Button>
        </Link>

        {/* City Header */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6" />
                <span className="text-sm font-medium opacity-90">
                  {city.country} • {city.region}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{city.name}</h1>
              <div className="flex items-center gap-4">
                <ImpactBadge impact={city.impact} size="lg" />
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Rank #{city.rank} Globally</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center min-w-[140px]">
              <div className="text-5xl font-bold mb-2">{city.score}</div>
              <div className="text-sm opacity-90">Sustainability Score</div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Environmental Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="CO₂ Emissions"
              value={city.metrics.co2Emissions}
              unit="tons/capita"
              icon={Wind}
              progress={100 - city.metrics.co2Emissions * 10}
              reverseProgress={true}
              description="Lower is better"
            />
            <MetricCard
              title="Air Quality Index"
              value={city.metrics.airQualityIndex}
              unit="AQI"
              icon={Wind}
              progress={100 - (city.metrics.airQualityIndex / 5)}
              reverseProgress={true}
              description="0-50 is good"
            />
            <MetricCard
              title="Renewable Energy"
              value={city.metrics.renewableEnergy}
              unit="%"
              icon={Zap}
              progress={city.metrics.renewableEnergy}
              description="% of total energy"
            />
            <MetricCard
              title="Waste Recycling"
              value={city.metrics.wasteRecycling}
              unit="%"
              icon={Recycle}
              progress={city.metrics.wasteRecycling}
              description="Recycling rate"
            />
            <MetricCard
              title="Green Space"
              value={city.metrics.greenSpace}
              unit="m²/capita"
              icon={Trees}
              progress={Math.min(city.metrics.greenSpace * 2, 100)}
              description="Per capita"
            />
            <MetricCard
              title="Public Transport"
              value={city.metrics.publicTransport}
              unit="%"
              icon={Bus}
              progress={city.metrics.publicTransport}
              description="Usage rate"
            />
            <MetricCard
              title="Water Quality"
              value={city.metrics.waterQuality}
              unit="/100"
              icon={Droplet}
              progress={city.metrics.waterQuality}
              description="Quality score"
            />
            <MetricCard
              title="Energy Efficiency"
              value={city.metrics.energyEfficiency}
              unit="/100"
              icon={Leaf}
              progress={city.metrics.energyEfficiency}
              description="Efficiency score"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Overview - Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <p className="text-sm text-gray-600">Sustainability metrics comparison</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                  <Radar
                    name={city.name}
                    dataKey="value"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Historical Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Trends</CardTitle>
              <p className="text-sm text-gray-600">Sustainability score over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={city.historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280' }} />
                  <YAxis domain={[50, 100]} tick={{ fill: '#6b7280' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#16a34a"
                    strokeWidth={3}
                    name="Sustainability Score"
                    dot={{ fill: '#16a34a', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Emissions and Renewable Energy Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>CO₂ Emissions & Renewable Energy Trends</CardTitle>
            <p className="text-sm text-gray-600">Progress in key environmental indicators</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={city.historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fill: '#6b7280' }} />
                <YAxis yAxisId="left" tick={{ fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280' }} />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="co2Emissions"
                  fill="#ef4444"
                  name="CO₂ Emissions (tons/capita)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="renewableEnergy"
                  fill="#16a34a"
                  name="Renewable Energy (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impact Classification */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Impact Classification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <ImpactBadge impact={city.impact} size="lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Why is {city.name} classified as {city.impact} Impact?
                </h3>
                <p className="text-gray-600 leading-relaxed">{getImpactExplanation()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
              Actionable Recommendations
            </CardTitle>
            <p className="text-sm text-gray-600">
              Data-driven suggestions to improve sustainability
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {city.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-green-50 border border-green-100 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/compare">
            <Button size="lg" variant="outline">
              Compare with Other Cities
            </Button>
          </Link>
          <Link to="/rankings">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              View All Rankings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
