import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  progress?: number;
  reverseProgress?: boolean;
  description?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  progress,
  reverseProgress = false,
  description,
}: MetricCardProps) {
  const displayProgress = progress ?? value;
  const progressColor = reverseProgress
    ? displayProgress > 66
      ? 'bg-red-500'
      : displayProgress > 33
      ? 'bg-yellow-500'
      : 'bg-green-500'
    : displayProgress > 66
    ? 'bg-green-500'
    : displayProgress > 33
    ? 'bg-yellow-500'
    : 'bg-red-500';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <Icon className="w-5 h-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900">{value}</span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={displayProgress} className="h-2" indicatorClassName={progressColor} />
              {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
