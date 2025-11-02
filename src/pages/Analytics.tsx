import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, Eye, Users, Heart, ShoppingCart, DollarSign, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsUpdated = () => {
  const { t } = useTranslation();

  // Mock analytics data
  const metricsData = [
    {
      title: t('analytics.impressions'),
      value: '24.8K',
      change: '+12.5%',
      icon: <Eye className="h-5 w-5" />,
      color: 'text-blue-600',
    },
    {
      title: t('analytics.reach'),
      value: '18.2K',
      change: '+8.2%',
      icon: <Users className="h-5 w-5" />,
      color: 'text-green-600',
    },
    {
      title: t('analytics.engagement'),
      value: '3.4K',
      change: '+15.8%',
      icon: <Heart className="h-5 w-5" />,
      color: 'text-red-600',
    },
    {
      title: t('analytics.conversions'),
      value: '127',
      change: '+22.1%',
      icon: <ShoppingCart className="h-5 w-5" />,
      color: 'text-purple-600',
    },
    {
      title: t('analytics.revenue'),
      value: '₹45,230',
      change: '+18.7%',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-primary',
    },
  ];

  const chartData = [
    { name: 'Jan', impressions: 12000, engagement: 1200, revenue: 25000 },
    { name: 'Feb', impressions: 15000, engagement: 1800, revenue: 32000 },
    { name: 'Mar', impressions: 18000, engagement: 2100, revenue: 38000 },
    { name: 'Apr', impressions: 22000, engagement: 2800, revenue: 42000 },
    { name: 'May', impressions: 25000, engagement: 3200, revenue: 45000 },
    { name: 'Jun', impressions: 24800, engagement: 3400, revenue: 45230 },
  ];

  // Performance Overview data with social media specific data
  const performanceData = [
    { month: 'Jan', Instagram: 4200, Facebook: 3100, Twitter: 2400 },
    { month: 'Feb', Instagram: 5100, Facebook: 3800, Twitter: 2900 },
    { month: 'Mar', Instagram: 4800, Facebook: 3600, Twitter: 2700 },
    { month: 'Apr', Instagram: 6200, Facebook: 4200, Twitter: 3100 },
    { month: 'May', Instagram: 5800, Facebook: 4000, Twitter: 2950 },
    { month: 'Jun', Instagram: 7100, Facebook: 4800, Twitter: 3400 },
    { month: 'Jul', Instagram: 6500, Facebook: 4500, Twitter: 3200 },
    { month: 'Aug', Instagram: 7800, Facebook: 5200, Twitter: 3600 },
    { month: 'Sep', Instagram: 7200, Facebook: 4900, Twitter: 3450 },
    { month: 'Oct', Instagram: 8500, Facebook: 5600, Twitter: 3800 },
    { month: 'Nov', Instagram: 8100, Facebook: 5400, Twitter: 3700 },
    { month: 'Dec', Instagram: 9200, Facebook: 6100, Twitter: 4100 },
  ];

  const platformData = [
    { platform: 'Instagram', followers: '12.5K', engagement: '4.2%', posts: 45, icon: <Instagram className="h-5 w-5" /> },
    { platform: 'Facebook', followers: '8.3K', engagement: '2.8%', posts: 32, icon: <Facebook className="h-5 w-5" /> },
    { platform: 'Twitter', followers: '5.1K', engagement: '1.9%', posts: 28, icon: <Twitter className="h-5 w-5" /> },
  ];

  const topPosts = [
    {
      id: 1,
      image: '🏺',
      title: 'Traditional Rajasthani Pottery',
      impressions: '5.2K',
      engagement: '12.4%',
      revenue: '₹8,500',
      platform: 'Instagram',
    },
    {
      id: 2,
      image: '🧶',
      title: 'Handwoven Silk Saree',
      impressions: '4.8K',
      engagement: '10.8%',
      revenue: '₹12,000',
      platform: 'Facebook',
    },
    {
      id: 3,
      image: '🪔',
      title: 'Brass Diya Collection',
      impressions: '3.9K',
      engagement: '9.2%',
      revenue: '₹6,200',
      platform: 'Instagram',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t('analytics.title')}
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              {t('analytics.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-muted ${metric.color}`}>
                      {metric.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Overview - Social Media Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Overview</CardTitle>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                    <span>Instagram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span>Facebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span>Twitter</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar 
                      dataKey="Instagram" 
                      fill="url(#instagramGradient)" 
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="Facebook" 
                      fill="#1877F2" 
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="Twitter" 
                      fill="#1DA1F2" 
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="instagramGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#833AB4" />
                        <stop offset="50%" stopColor="#C13584" />
                        <stop offset="100%" stopColor="#E1306C" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Trends</TabsTrigger>
              <TabsTrigger value="platforms">{t('analytics.platforms')}</TabsTrigger>
              <TabsTrigger value="posts">{t('analytics.top_posts')}</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Impressions Chart */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Impressions Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="impressions" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary) / 0.1)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Revenue Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="hsl(var(--secondary))" 
                            strokeWidth={3}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="platforms">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformData.map((platform, index) => (
                      <div key={platform.platform} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-background rounded-lg">
                            {platform.icon}
                          </div>
                          <div>
                            <p className="font-medium">{platform.platform}</p>
                            <p className="text-sm text-muted-foreground">{platform.followers} followers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{platform.engagement}</p>
                          <p className="text-sm text-muted-foreground">{platform.posts} posts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>{t('analytics.top_posts')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPosts.map((post, index) => (
                      <div key={post.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl">{post.image}</div>
                        <div className="flex-1">
                          <p className="font-medium">{post.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{post.impressions} views</span>
                            <span>{post.engagement} engagement</span>
                            <Badge variant="outline">{post.platform}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{post.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-card bg-gradient-primary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Want to Improve These Numbers?</h3>
              <p className="text-white/90 mb-6">
                Our AI can help you create even more engaging content to boost your metrics
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/demo'}
              >
                Create New Content
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsUpdated;