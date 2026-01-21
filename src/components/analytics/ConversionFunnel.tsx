import { motion } from 'framer-motion';

interface FunnelStep {
  label: string;
  value: number;
  icon: string;
  color: string;
}

interface ConversionFunnelProps {
  pageViews: number;
  signSelections: number;
  astrologerClicks: number;
  loading?: boolean;
}

export function ConversionFunnel({ 
  pageViews, 
  signSelections, 
  astrologerClicks, 
  loading 
}: ConversionFunnelProps) {
  const steps: FunnelStep[] = [
    { label: 'Page Views', value: pageViews, icon: '👁️', color: 'hsl(var(--primary))' },
    { label: 'Sign Selected', value: signSelections, icon: '⭐', color: 'hsl(var(--accent))' },
    { label: 'Talk to Astrologer', value: astrologerClicks, icon: '📞', color: 'hsl(142, 76%, 36%)' },
  ];

  const maxValue = Math.max(...steps.map(s => s.value), 1);

  const getConversionRate = (current: number, previous: number) => {
    if (previous === 0) return '0%';
    return `${((current / previous) * 100).toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-card">
        <h2 className="font-serif text-base text-foreground mb-4 flex items-center gap-2">
          <span className="text-lg">📊</span>
          Conversion Funnel
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-muted/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <h2 className="font-serif text-base text-foreground mb-4 flex items-center gap-2">
        <span className="text-lg">📊</span>
        Conversion Funnel
      </h2>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const widthPercent = (step.value / maxValue) * 100;
          const prevStep = index > 0 ? steps[index - 1] : null;
          const conversionRate = prevStep ? getConversionRate(step.value, prevStep.value) : null;

          return (
            <div key={step.label}>
              {/* Conversion arrow */}
              {conversionRate && (
                <div className="flex items-center justify-center gap-1 py-1.5 text-muted-foreground">
                  <div className="flex-1 h-px bg-border/50" />
                  <motion.span 
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/60"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    ↓ {conversionRate}
                  </motion.span>
                  <div className="flex-1 h-px bg-border/50" />
                </div>
              )}

              {/* Funnel bar */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <div 
                  className="relative overflow-hidden rounded-xl"
                  style={{ 
                    marginLeft: `${(100 - widthPercent) / 2}%`,
                    marginRight: `${(100 - widthPercent) / 2}%`,
                  }}
                >
                  <motion.div
                    className="px-3 py-3 rounded-xl flex items-center justify-between"
                    style={{ backgroundColor: step.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{step.icon}</span>
                      <span className="text-xs font-medium text-white truncate">
                        {step.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {step.value.toLocaleString()}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Overall conversion rate */}
      <motion.div 
        className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-xs text-muted-foreground">Overall Conversion</span>
        <span className="text-sm font-semibold text-primary">
          {getConversionRate(astrologerClicks, pageViews)}
        </span>
      </motion.div>
    </motion.div>
  );
}
