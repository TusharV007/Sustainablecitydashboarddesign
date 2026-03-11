import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImpactBadge } from '../components/ImpactBadge';
import { cities, globalStats } from '../data/cities';
import {
  ArrowRight,
  TrendingUp,
  Globe,
  Award,
  LeafyGreen,
  MapPin,
} from 'lucide-react';

export function Dashboard() {
  const topCities = cities.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Global Sustainability Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building a Sustainable Future, One City at a Time
            </h1>
            <p className="text-xl text-green-50 mb-8 leading-relaxed">
              Comprehensive environmental impact rankings for cities worldwide. Data-driven insights
              to help urban planners, policymakers, and citizens make informed decisions for a
              greener tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rankings">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  Explore Rankings
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/methodology">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn Our Methodology
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Cities Analyzed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{globalStats.totalCities}</span>
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Across 6 continents</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{globalStats.averageScore}</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Global sustainability rating</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Low Impact Cities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-700">
                  {globalStats.lowImpactCities}
                </span>
                <LeafyGreen className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Leading in sustainability</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Top Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{globalStats.topCity.name}</span>
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Score: {globalStats.topCity.score}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Cities Leaderboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Sustainable Cities</h2>
            <p className="text-gray-600 mt-1">Leading the way in environmental responsibility</p>
          </div>
          <Link to="/rankings">
            <Button variant="outline">
              View All Cities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {topCities.map((city, index) => (
            <Link key={city.id} to={`/city/${city.id}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {index === 0 ? (
                        <Award className="w-8 h-8 text-yellow-500" />
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      )}
                    </div>

                    {/* City Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                          {city.name}
                        </h3>
                        <ImpactBadge impact={city.impact} size="sm" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {city.country} • {city.region}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-700">{city.score}</div>
                      <div className="text-sm text-gray-500">Sustainability Score</div>
                    </div>

                    {/* Key Metrics Preview */}
                    <div className="hidden lg:flex items-center gap-6 px-6 border-l border-gray-200">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {city.metrics.co2Emissions}
                        </div>
                        <div className="text-xs text-gray-500">CO₂ t/capita</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {city.metrics.renewableEnergy}%
                        </div>
                        <div className="text-xs text-gray-500">Renewable</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {city.metrics.wasteRecycling}%
                        </div>
                        <div className="text-xs text-gray-500">Recycling</div>
                      </div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Impact Distribution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card>
          <CardHeader>
            <CardTitle>Global Impact Distribution</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Environmental impact classification across analyzed cities
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-700 mb-2">
                  {globalStats.lowImpactCities}
                </div>
                <div className="text-sm font-medium text-green-800 mb-1">Low Impact Cities</div>
                <p className="text-xs text-green-600">
                  {((globalStats.lowImpactCities / globalStats.totalCities) * 100).toFixed(0)}% of
                  total
                </p>
              </div>

              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-4xl font-bold text-yellow-700 mb-2">
                  {globalStats.mediumImpactCities}
                </div>
                <div className="text-sm font-medium text-yellow-800 mb-1">Medium Impact Cities</div>
                <p className="text-xs text-yellow-600">
                  {((globalStats.mediumImpactCities / globalStats.totalCities) * 100).toFixed(0)}%
                  of total
                </p>
              </div>

              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">
                  {globalStats.highImpactCities}
                </div>
                <div className="text-sm font-medium text-red-800 mb-1">High Impact Cities</div>
                <p className="text-xs text-red-600">
                  {((globalStats.highImpactCities / globalStats.totalCities) * 100).toFixed(0)}% of
                  total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Explore the Data?
            </h2>
            <p className="text-gray-600 mb-8">
              Dive deep into city-specific metrics, compare sustainability performance, and discover
              actionable recommendations for improvement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/rankings">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Browse All Rankings
                </Button>
              </Link>
              <Link to="/compare">
                <Button size="lg" variant="outline">
                  Compare Cities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
