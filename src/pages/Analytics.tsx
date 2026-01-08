import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { StarField } from '@/components/horoscope/StarField';

interface AnalyticsSummary {
  period: { start: string; end: string; days: number };
  totals: {
    events: number;
    unique_sessions: number;
    page_views: number;
    cta_clicks: number;
    conversion_rate: string;
  };
  event_breakdown: Record<string, number>;
  popular_signs: Array<{ sign: string; count: number }>;
  recent_events: Array<{ event: string; data: Record<string, unknown>; time: string }>;
}

const SIGN_COLORS: Record<string, string> = {
  aries: '#EF4444',
  taurus: '#22C55E',
  gemini: '#F59E0B',
  cancer: '#3B82F6',
  leo: '#F97316',
  virgo: '#84CC16',
  libra: '#EC4899',
  scorpio: '#8B5CF6',
  sagittarius: '#A855F7',
  capricorn: '#6B7280',
  aquarius: '#06B6D4',
  pisces: '#8B5CF6',
};

const SIGN_SYMBOLS: Record<string, string> = {
  aries: '♈',
  taurus: '♉',
  gemini: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  scorpio: '♏',
  sagittarius: '♐',
  capricorn: '♑',
  aquarius: '♒',
  pisces: '♓',
};

export default function Analytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(0);

  const fetchAnalytics = async (daysToFetch: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke('analytics-summary', {
        body: { days: daysToFetch },
      });
      
      if (fnError) {
        console.error('Function error:', fnError);
        setError(fnError.message || 'Failed to load analytics');
        return;
      }
      
      if (result) {
        setData(result);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(days);
  }, [days]);

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
  };

  const pieData = data?.popular_signs.map(item => ({
    name: item.sign,
    symbol: SIGN_SYMBOLS[item.sign] || '★',
    value: item.count,
    color: SIGN_COLORS[item.sign] || '#888',
  })) || [];

  const totalEvents = data?.totals.events || 0;

  const getPeriodLabel = () => {
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return "7 Days";
  };

  return (
    <div className="min-h-screen pb-10 relative overflow-x-hidden">
      <StarField />
      
      {/* Header */}
      <motion.header 
        className="pt-5 pb-4 px-4 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <Link to="/">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          </Link>
          <div className="flex-1">
            <h1 className="font-serif text-xl text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Cosmic Insights
            </h1>
            <p className="text-xs text-muted-foreground">
              {getPeriodLabel()} • Live
            </p>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchAnalytics(days)}
            disabled={loading}
            className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-foreground"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Period Tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { label: 'Today', value: 0 },
            { label: 'Yesterday', value: 1 },
            { label: '7 Days', value: 7 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleDaysChange(option.value)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-full transition-all ${
                days === option.value
                  ? 'bg-primary text-primary-foreground shadow-lg glow-celestial'
                  : 'bg-secondary/60 text-muted-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.header>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-xs"
        >
          {error}
        </motion.div>
      )}

      <div className="px-4 space-y-4 relative z-10">
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            label="Visitors"
            value={data?.totals.unique_sessions || 0}
            icon="👁️"
            loading={loading}
          />
          <StatCard
            label="Views"
            value={data?.totals.page_views || 0}
            icon="✨"
            loading={loading}
          />
          <StatCard
            label="Interactions"
            value={totalEvents}
            icon="🔮"
            loading={loading}
          />
          <StatCard
            label="Clicks"
            value={data?.totals.cta_clicks || 0}
            icon="⚡"
            loading={loading}
          />
        </motion.div>

        {/* Popular Signs */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-serif text-base text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            Popular Signs
          </h2>
          
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 bg-muted/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : pieData.length > 0 ? (
            <div className="space-y-2.5">
              {pieData.map((item, i) => {
                const maxValue = Math.max(...pieData.map(p => p.value));
                const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-lg w-6 text-center" style={{ color: item.color }}>
                      {item.symbol}
                    </span>
                    <span className="text-sm text-foreground capitalize w-20 truncate">
                      {item.name}
                    </span>
                    <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-6 text-right">
                      {item.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm py-4">
              No readings yet
            </p>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-serif text-base text-foreground mb-3 flex items-center gap-2">
            <span className="text-lg">🌙</span>
            Recent Activity
          </h2>
          
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : data?.recent_events && data.recent_events.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
              {data.recent_events.slice(0, 10).map((event, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40"
                >
                  <span className="text-base">
                    {event.event === 'page_view' ? '👁️' : 
                     event.event === 'sign_selected' ? '⭐' :
                     event.event === 'horoscope_loaded' ? '🔮' :
                     event.event === 'cta_clicked' ? '⚡' : '✨'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground capitalize truncate">
                      {event.event.replace(/_/g, ' ')}
                    </p>
                    {event.data && Object.keys(event.data).length > 0 && (
                      <p className="text-[10px] text-muted-foreground truncate">
                        {Object.entries(event.data).slice(0, 2).map(([k, v]) => 
                          `${k}: ${String(v).slice(0, 15)}`
                        ).join(' • ')}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(event.time).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm py-4">
              No activity yet
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  loading?: boolean;
}

function StatCard({ label, value, icon, loading }: StatCardProps) {
  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{icon}</span>
      </div>
      {loading ? (
        <div className="h-7 w-16 bg-muted/50 rounded-lg animate-pulse" />
      ) : (
        <p className="text-2xl font-serif text-foreground">{value}</p>
      )}
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </motion.div>
  );
}
