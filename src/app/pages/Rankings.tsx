import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ImpactBadge } from '../components/ImpactBadge';
import { cities } from '../data/cities';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  ChevronRight,
  Award,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

type SortOption = 'rank' | 'name' | 'score' | 'country';

export function Rankings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [impactFilter, setImpactFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rank');

  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(cities.map((c) => c.region)));
    return uniqueRegions.sort();
  }, []);

  const filteredAndSortedCities = useMemo(() => {
    let filtered = cities.filter((city) => {
      const matchesSearch =
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesImpact = impactFilter === 'all' || city.impact === impactFilter;
      const matchesRegion = regionFilter === 'all' || city.region === regionFilter;
      return matchesSearch && matchesImpact && matchesRegion;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return a.rank - b.rank;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'score':
          return b.score - a.score;
        case 'country':
          return a.country.localeCompare(b.country);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, impactFilter, regionFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">City Rankings</h1>
          <p className="text-gray-600">
            Comprehensive environmental sustainability rankings for {cities.length} cities worldwide
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search cities or countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Impact Filter */}
              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Impact Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact Levels</SelectItem>
                  <SelectItem value="Low">Low Impact</SelectItem>
                  <SelectItem value="Medium">Medium Impact</SelectItem>
                  <SelectItem value="High">High Impact</SelectItem>
                </SelectContent>
              </Select>

              {/* Region Filter */}
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger>
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rank">Rank</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Summary */}
            {(searchQuery || impactFilter !== 'all' || regionFilter !== 'all') && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <SlidersHorizontal className="w-4 h-4" />
                <span>
                  Showing {filteredAndSortedCities.length} of {cities.length} cities
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setImpactFilter('all');
                    setRegionFilter('all');
                  }}
                  className="text-green-600 hover:text-green-700"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cities List */}
        <div className="space-y-3">
          {filteredAndSortedCities.map((city, index) => (
            <Link key={city.id} to={`/city/${city.id}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-16 text-center">
                      {city.rank === 1 ? (
                        <Award className="w-6 h-6 text-yellow-500 mx-auto" />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">#{city.rank}</span>
                      )}
                    </div>

                    {/* City Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
                        {city.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {city.country} • {city.region}
                        </span>
                      </div>
                    </div>

                    {/* Impact Badge */}
                    <div className="hidden sm:block">
                      <ImpactBadge impact={city.impact} />
                    </div>

                    {/* Key Metrics */}
                    <div className="hidden md:grid grid-cols-3 gap-4 px-6 border-l border-gray-200">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {city.metrics.co2Emissions}
                        </div>
                        <div className="text-xs text-gray-500">CO₂</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {city.metrics.renewableEnergy}%
                        </div>
                        <div className="text-xs text-gray-500">Renewable</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {city.metrics.airQualityIndex}
                        </div>
                        <div className="text-xs text-gray-500">AQI</div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right px-6 border-l border-gray-200">
                      <div className="text-2xl font-bold text-green-700">{city.score}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Mobile Impact Badge */}
                  <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
                    <ImpactBadge impact={city.impact} size="sm" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedCities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No cities found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setImpactFilter('all');
                  setRegionFilter('all');
                }}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
