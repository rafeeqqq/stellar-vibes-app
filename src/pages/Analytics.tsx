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
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                <Activity className="w-7 h-7 text-orange-400" />
                Analytics Dashboard
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {data?.period ? (
                  <>Tracking from {formatDate(data.period.start)} to {formatDate(data.period.end)}</>
                ) : (
                  <>Last {days === 1 ? 'day' : `${days} days`}</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-white/5 p-1 backdrop-blur-sm">
              {[
                { label: 'Today', value: 1 },
                { label: '7 Days', value: 7 },
                { label: '30 Days', value: 30 },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDaysChange(option.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    days === option.value
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
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
              className="rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-white"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            label="Total Events"
            value={totalEvents}
            color="from-blue-500 to-cyan-500"
            loading={loading}
          />
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Unique Sessions"
            value={data?.totals.unique_sessions || 0}
            color="from-purple-500 to-pink-500"
            loading={loading}
          />
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            label="Page Views"
            value={data?.totals.page_views || 0}
            color="from-emerald-500 to-teal-500"
            loading={loading}
          />
          <StatCard
            icon={<MousePointerClick className="w-5 h-5" />}
            label="CTA Clicks"
            value={data?.totals.cta_clicks || 0}
            color="from-orange-500 to-amber-500"
            loading={loading}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Conversion Rate"
            value={`${conversionRate}%`}
            color="from-rose-500 to-red-500"
            loading={loading}
            highlight={conversionRate > 5}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Popular Signs */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Popular Zodiac Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse text-slate-400">Loading...</div>
                </div>
              ) : pieData.length > 0 ? (
                <div className="flex flex-col lg:flex-row items-center gap-4">
                  <div className="w-full lg:w-1/2 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="rgba(0,0,0,0.3)"
                          strokeWidth={2}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(15,23,42,0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff'
                          }}
                          formatter={(value: number) => [`${value} views`, 'Count']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-2">
                    {pieData.map((item, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full shadow-lg" 
                            style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}50` }} 
                          />
                          <span className="text-white text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-slate-300 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                  No horoscope views recorded yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Events Breakdown */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Event Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse text-slate-400">Loading...</div>
                </div>
              ) : eventData.length > 0 ? (
                <div className="space-y-3">
                  {eventData.map((event, i) => {
                    const percentage = totalEvents > 0 ? (event.count / totalEvents) * 100 : 0;
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{event.icon}</span>
                            <span className="text-white text-sm font-medium capitalize">{event.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">{percentage.toFixed(1)}%</span>
                            <span className="text-white font-semibold text-sm bg-white/10 px-2 py-0.5 rounded-full">
                              {event.count}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
                  No events recorded yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Recent Activity
              </div>
              <span className="text-sm font-normal text-slate-400">
                {data?.recent_events?.length || 0} events
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : data?.recent_events && data.recent_events.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-hide">
                {data.recent_events.map((event, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{EVENT_ICONS[event.event] || '📊'}</span>
                      <div>
                        <span className="text-white text-sm font-medium capitalize">
                          {event.event.replace(/_/g, ' ')}
                        </span>
                        {event.data && Object.keys(event.data).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(event.data).slice(0, 3).map(([key, value], idx) => (
                              <span 
                                key={idx} 
                                className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-slate-300"
                              >
                                {key}: {String(value).slice(0, 20)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors whitespace-nowrap">
                      {new Date(event.time).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center text-slate-400 text-sm">
                No events recorded yet
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
}

function StatCard({ icon, label, value, color, loading, highlight }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 ${
        highlight ? 'ring-2 ring-orange-500/50' : ''
      }`}
    >
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${color}`} />
      <div className="relative">
        <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${color} text-white mb-3`}>
          {icon}
        </div>
        {loading ? (
          <div className="h-8 w-20 bg-white/10 rounded animate-pulse" />
        ) : (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            {value}
          </motion.div>
        )}
        <div className="text-xs text-slate-400 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}
