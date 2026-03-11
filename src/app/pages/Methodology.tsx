import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  BookOpen,
  Database,
  LineChart,
  CheckCircle2,
  Wind,
  Zap,
  Recycle,
  Trees,
  Bus,
  Droplet,
  Leaf,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

export function Methodology() {
  const metrics = [
    {
      name: 'CO₂ Emissions',
      icon: Wind,
      weight: 20,
      description: 'Annual carbon dioxide emissions per capita in tons',
      calculation: 'Lower emissions = higher score. Normalized on a scale of 0-100',
      impact: 'Primary indicator of climate impact',
    },
    {
      name: 'Air Quality Index',
      icon: Wind,
      weight: 15,
      description: 'EPA Air Quality Index measuring major air pollutants',
      calculation: 'Lower AQI = better score. Good (0-50) scores highest',
      impact: 'Direct impact on public health and environmental quality',
    },
    {
      name: 'Renewable Energy',
      icon: Zap,
      weight: 18,
      description: 'Percentage of total energy from renewable sources',
      calculation: 'Direct percentage contribution to overall score',
      impact: 'Key indicator of sustainable energy transition',
    },
    {
      name: 'Waste Recycling Rate',
      icon: Recycle,
      weight: 12,
      description: 'Percentage of municipal waste that is recycled',
      calculation: 'Higher recycling rate = higher score',
      impact: 'Measures circular economy implementation',
    },
    {
      name: 'Green Space',
      icon: Trees,
      weight: 10,
      description: 'Square meters of green space per capita',
      calculation: 'Normalized based on WHO recommendations (9 m²/capita minimum)',
      impact: 'Affects air quality, mental health, and urban biodiversity',
    },
    {
      name: 'Public Transport Usage',
      icon: Bus,
      weight: 10,
      description: 'Percentage of population using public transportation',
      calculation: 'Higher usage = higher score, reduces private vehicle emissions',
      impact: 'Indicates sustainable mobility infrastructure',
    },
    {
      name: 'Water Quality',
      icon: Droplet,
      weight: 8,
      description: 'Water quality index based on chemical and biological parameters',
      calculation: 'Score from 0-100, higher is better',
      impact: 'Essential for ecosystem and human health',
    },
    {
      name: 'Energy Efficiency',
      icon: Leaf,
      weight: 7,
      description: 'Overall energy efficiency in buildings and infrastructure',
      calculation: 'Composite score of building standards and efficiency programs',
      impact: 'Reduces overall energy demand and emissions',
    },
  ];

  const impactClassification = [
    {
      level: 'Low Impact',
      range: '80-100',
      color: 'bg-green-100 text-green-800 border-green-300',
      description:
        'Cities demonstrating excellent environmental performance with comprehensive sustainability programs and low emissions.',
    },
    {
      level: 'Medium Impact',
      range: '60-79',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      description:
        'Cities with moderate environmental impact showing good progress but requiring improvements in specific areas.',
    },
    {
      level: 'High Impact',
      range: '0-59',
      color: 'bg-red-100 text-red-800 border-red-300',
      description:
        'Cities facing significant environmental challenges requiring urgent action and comprehensive sustainability initiatives.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Methodology & Data Sources</h1>
          <p className="text-gray-600">
            Understanding how we rank cities and generate sustainability recommendations
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-green-600" />
              <CardTitle>Ranking Algorithm Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our Sustainable City Ranking System uses a comprehensive, data-driven approach to
              evaluate environmental performance across multiple dimensions. Each city receives a
              sustainability score from 0-100 based on eight key environmental metrics.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Scoring System
              </h3>
              <p className="text-green-800 text-sm">
                Final Score = Σ (Metric Score × Weight) where weights are assigned based on global
                climate priorities and environmental impact research. Cities are then ranked
                globally and classified into Low, Medium, or High environmental impact categories.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <LineChart className="w-6 h-6 text-green-600" />
              <CardTitle>Environmental Metrics & Weights</CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Total weight: 100% distributed across eight sustainability indicators
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                          <p className="text-sm text-gray-600">{metric.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-600 text-white">{metric.weight}%</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-13">
                      <div>
                        <div className="text-xs font-semibold text-gray-700 mb-1">Calculation</div>
                        <p className="text-sm text-gray-600">{metric.calculation}</p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-700 mb-1">
                          Environmental Impact
                        </div>
                        <p className="text-sm text-gray-600">{metric.impact}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Impact Classification */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-green-600" />
              <CardTitle>Impact Classification System</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {impactClassification.map((classification, index) => (
                <div
                  key={index}
                  className={`border-2 ${classification.color} rounded-lg p-5`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{classification.level}</h3>
                    <Badge variant="outline" className={classification.color}>
                      Score: {classification.range}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{classification.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-green-600" />
              <CardTitle>Data Sources & Collection</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              This platform uses simulated data for demonstration purposes. In a production
              environment, data would be collected from the following authoritative sources:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Government Sources</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• EPA Air Quality Database</li>
                  <li>• National emissions inventories</li>
                  <li>• Municipal waste management reports</li>
                  <li>• Urban planning departments</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">International Organizations</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• World Bank Open Data</li>
                  <li>• UN Environment Programme</li>
                  <li>• International Energy Agency</li>
                  <li>• WHO Air Quality Database</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Research Institutions</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Climate research centers</li>
                  <li>• University environmental studies</li>
                  <li>• Think tanks and NGOs</li>
                  <li>• Sustainability consortiums</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Air quality sensor networks</li>
                  <li>• Energy consumption meters</li>
                  <li>• Public transport usage data</li>
                  <li>• Satellite environmental monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Generation */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-green-600" />
              <CardTitle>Recommendation Generation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Actionable recommendations are generated through a multi-step analytical process:
            </p>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Gap Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Identify areas where the city underperforms compared to top performers and
                    global benchmarks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Best Practice Matching</h3>
                  <p className="text-sm text-gray-600">
                    Match the city's context with proven successful interventions from similar
                    cities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Priority Scoring</h3>
                  <p className="text-sm text-gray-600">
                    Rank recommendations based on potential impact, feasibility, and alignment with
                    climate goals.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Specific Action Items</h3>
                  <p className="text-sm text-gray-600">
                    Generate concrete, implementable recommendations tailored to the city's unique
                    characteristics and needs.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transparency Statement */}
        <Card>
          <CardHeader>
            <CardTitle>Transparency & Continuous Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We are committed to transparency and scientific rigor in our methodology. Our ranking
              system is continuously reviewed and updated based on:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Latest climate science research and IPCC recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Feedback from urban planners, policymakers, and environmental experts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Emerging best practices in sustainable urban development</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Data quality improvements and new measurement technologies</span>
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> This demonstration platform uses simulated data. For research
                or policy decisions, please consult official government statistics and peer-reviewed
                environmental studies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
