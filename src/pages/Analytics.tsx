import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, MousePointerClick, Eye, RefreshCw, Activity, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

const SIGN_NAMES: Record<string, string> = {
  aries: 'Aries ♈',
  taurus: 'Taurus ♉',
  gemini: 'Gemini ♊',
  cancer: 'Cancer ♋',
  leo: 'Leo ♌',
  virgo: 'Virgo ♍',
  libra: 'Libra ♎',
  scorpio: 'Scorpio ♏',
  sagittarius: 'Sagittarius ♐',
  capricorn: 'Capricorn ♑',
  aquarius: 'Aquarius ♒',
  pisces: 'Pisces ♓',
};

const EVENT_ICONS: Record<string, string> = {
  page_view: '👁️',
  horoscope_loaded: '🔮',
  sign_selected: '⭐',
  day_changed: '📅',
  cta_clicked: '🖱️',
};

export default function Analytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

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
    name: SIGN_NAMES[item.sign] || item.sign,
    value: item.count,
    color: SIGN_COLORS[item.sign] || '#888',
  })) || [];

  const eventData = data?.event_breakdown 
    ? Object.entries(data.event_breakdown)
        .map(([name, count]) => ({
          name: name.replace(/_/g, ' '),
          fullName: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          count,
          icon: EVENT_ICONS[name] || '📊',
        }))
        .sort((a, b) => b.count - a.count)
    : [];

  const conversionRate = parseFloat(data?.totals.conversion_rate || '0');
  const totalEvents = data?.totals.events || 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-4 sm:space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-white h-9 w-9">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
                <span className="truncate">Analytics</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                {data?.period ? (
                  <>Tracking: {formatDate(data.period.start)}</>
                ) : (
                  <>Last {days === 1 ? 'day' : `${days} days`}</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex flex-1 rounded-lg bg-white/5 p-0.5">
              {[
                { label: 'Today', value: 1 },
                { label: '7D', value: 7 },
                { label: '30D', value: 30 },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDaysChange(option.value)}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    days === option.value
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => fetchAnalytics(days)}
              disabled={loading}
              className="rounded-lg bg-white/5 border-white/10 hover:bg-white/10 text-white h-8 w-8 flex-shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Stat Cards - 2x2 grid on mobile, 5 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          <StatCard
            icon={<Activity className="w-4 h-4" />}
            label="Events"
            value={totalEvents}
            color="from-blue-500 to-cyan-500"
            loading={loading}
          />
          <StatCard
            icon={<Users className="w-4 h-4" />}
            label="Sessions"
            value={data?.totals.unique_sessions || 0}
            color="from-purple-500 to-pink-500"
            loading={loading}
          />
          <StatCard
            icon={<Eye className="w-4 h-4" />}
            label="Views"
            value={data?.totals.page_views || 0}
            color="from-emerald-500 to-teal-500"
            loading={loading}
          />
          <StatCard
            icon={<MousePointerClick className="w-4 h-4" />}
            label="Clicks"
            value={data?.totals.cta_clicks || 0}
            color="from-orange-500 to-amber-500"
            loading={loading}
          />
          <StatCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Conv. %"
            value={`${conversionRate}%`}
            color="from-rose-500 to-red-500"
            loading={loading}
            highlight={conversionRate > 5}
            className="col-span-2 sm:col-span-1"
          />
        </div>

        {/* Charts - Stack on mobile */}
        <div className="grid gap-4">
          {/* Popular Signs */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Popular Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              {loading ? (
                <div className="h-40 flex items-center justify-center">
                  <div className="animate-pulse text-slate-400 text-sm">Loading...</div>
                </div>
              ) : pieData.length > 0 ? (
                <div className="space-y-3">
                  {/* Sign list with inline bars - better for mobile */}
                  {pieData.map((item, i) => {
                    const maxValue = Math.max(...pieData.map(p => p.value));
                    const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div 
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="text-white text-xs sm:text-sm font-medium w-24 sm:w-28 truncate">{item.name}</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                        <span className="text-slate-300 text-xs font-semibold w-8 text-right">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center text-slate-400 text-xs">
                  No data yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Events Breakdown */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Events
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              {loading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="animate-pulse text-slate-400 text-sm">Loading...</div>
                </div>
              ) : eventData.length > 0 ? (
                <div className="space-y-2.5">
                  {eventData.map((event, i) => {
                    const percentage = totalEvents > 0 ? (event.count / totalEvents) * 100 : 0;
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{event.icon}</span>
                          <span className="text-white text-xs font-medium capitalize flex-1 truncate">{event.fullName}</span>
                          <span className="text-slate-400 text-[10px]">{percentage.toFixed(0)}%</span>
                          <span className="text-white font-semibold text-xs bg-white/10 px-1.5 py-0.5 rounded-md min-w-[28px] text-center">
                            {event.count}
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center text-slate-400 text-xs">
                  No events yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-sm sm:text-base font-semibold text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                Recent
              </div>
              <span className="text-[10px] sm:text-xs font-normal text-slate-400">
                {data?.recent_events?.length || 0} events
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : data?.recent_events && data.recent_events.length > 0 ? (
              <div className="space-y-1.5 max-h-60 overflow-y-auto scrollbar-hide">
                {data.recent_events.slice(0, 15).map((event, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
                  >
                    <span className="text-sm flex-shrink-0">{EVENT_ICONS[event.event] || '📊'}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-xs font-medium capitalize block truncate">
                        {event.event.replace(/_/g, ' ')}
                      </span>
                      {event.data && Object.keys(event.data).length > 0 && (
                        <span className="text-slate-500 text-[10px] block truncate">
                          {Object.entries(event.data).slice(0, 2).map(([k, v]) => `${k}: ${String(v).slice(0, 12)}`).join(' • ')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 flex-shrink-0">
                      {new Date(event.time).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-16 flex items-center justify-center text-slate-400 text-xs">
                No events yet
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  loading?: boolean;
  highlight?: boolean;
  className?: string;
}

function StatCard({ icon, label, value, color, loading, highlight, className = '' }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-2.5 sm:p-3 ${
        highlight ? 'ring-1 ring-orange-500/50' : ''
      } ${className}`}
    >
      <div className={`absolute inset-0 opacity-15 bg-gradient-to-br ${color}`} />
      <div className="relative">
        <div className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br ${color} text-white mb-1.5`}>
          {icon}
        </div>
        {loading ? (
          <div className="h-6 w-12 bg-white/10 rounded animate-pulse" />
        ) : (
          <div className="text-lg sm:text-xl font-bold text-white">
            {value}
          </div>
        )}
        <div className="text-[10px] sm:text-xs text-slate-400">{label}</div>
      </div>
    </div>
  );
}
