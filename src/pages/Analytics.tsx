import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, MousePointerClick, Eye, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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
  aries: '#E85A4F',
  taurus: '#4A7C59',
  gemini: '#F4A261',
  cancer: '#6B9AC4',
  leo: '#E98A61',
  virgo: '#7B9E89',
  libra: '#D4A5A5',
  scorpio: '#8B4A6B',
  sagittarius: '#9B59B6',
  capricorn: '#5D5D5D',
  aquarius: '#00B4D8',
  pisces: '#A78BFA',
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

export default function Analytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('analytics-summary', {
        body: {},
        method: 'GET',
      });
      
      if (error) throw error;
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const pieData = data?.popular_signs.map(item => ({
    name: SIGN_NAMES[item.sign] || item.sign,
    value: item.count,
    color: SIGN_COLORS[item.sign] || '#888',
  })) || [];

  const eventData = data?.event_breakdown 
    ? Object.entries(data.event_breakdown).map(([name, count]) => ({
        name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count,
      }))
    : [];

  const conversionRate = parseFloat(data?.totals.conversion_rate || '0');

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
              <p className="text-sm text-muted-foreground">
                Last {data?.period.days || 7} days
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchAnalytics}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Sessions"
            value={data?.totals.unique_sessions || 0}
            color="text-blue-500"
            loading={loading}
          />
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            label="Page Views"
            value={data?.totals.page_views || 0}
            color="text-purple-500"
            loading={loading}
          />
          <StatCard
            icon={<MousePointerClick className="w-5 h-5" />}
            label="CTA Clicks"
            value={data?.totals.cta_clicks || 0}
            color="text-green-500"
            loading={loading}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Conversion"
            value={`${conversionRate}%`}
            color="text-orange-500"
            loading={loading}
            highlight={conversionRate > 5}
          />
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Popular Signs Pie Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Popular Signs</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-48 flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading...</div>
                </div>
              ) : pieData.length > 0 ? (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {pieData.slice(0, 5).map((item, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                  No data yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Events Bar Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Event Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-48 flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading...</div>
                </div>
              ) : eventData.length > 0 ? (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eventData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={100}
                        tick={{ fontSize: 11 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                  No data yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-muted/50 rounded animate-pulse" />
                ))}
              </div>
            ) : data?.recent_events && data.recent_events.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {data.recent_events.map((event, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                        {event.event.replace(/_/g, ' ')}
                      </span>
                      {event.data && Object.keys(event.data).length > 0 && (
                        <span className="text-muted-foreground text-xs">
                          {JSON.stringify(event.data).slice(0, 40)}...
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.time).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center text-muted-foreground text-sm">
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
    <Card className={highlight ? 'ring-2 ring-primary/50' : ''}>
      <CardContent className="p-3 sm:p-4">
        <div className={`${color} mb-2`}>{icon}</div>
        {loading ? (
          <div className="h-8 w-16 bg-muted rounded animate-pulse" />
        ) : (
          <div className="text-xl sm:text-2xl font-bold text-foreground">{value}</div>
        )}
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
