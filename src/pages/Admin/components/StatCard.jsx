import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
  change,
  show = true,
  size = 'md',
}) => {
  if (!show) return null;

  const sizeClasses = {
    sm: 'py-1 px-2',
    md: 'py-2 px-3',
    lg: 'py-3 px-4',
    xl: 'py-4 px-5',
  };

  return (
    <Card className={`border-0 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl overflow-hidden ${sizeClasses[size]}`}>
      <CardContent className={`${sizeClasses[size]}`}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-[#222222]">{value}</p>
            {change && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <ArrowUpRight size={12} />
                {change} this month
              </span>
            )}
          </div>
          <div className={`p-3 rounded-xl ${bg}`}>
            <Icon size={22} className={color} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
