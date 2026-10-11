interface ProgressBarProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'accent' | 'warning';
}

const colorClasses = {
  primary: 'bg-primary-500',
  accent: 'bg-accent-500',
  warning: 'bg-amber-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({ percentage, size = 'md', showLabel = false, color = 'primary' }: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="flex items-center gap-3 w-full">
      <div className={`flex-1 bg-surface-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-surface-600 min-w-[3ch] text-right">
          {clampedPercentage}%
        </span>
      )}
    </div>
  );
}
