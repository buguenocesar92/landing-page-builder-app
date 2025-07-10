// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

// Template Types
export interface Template {
  id: number;
  name: string;
  description: string;
  content: Record<string, any>;
  preview_image?: string;
  is_active: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

// Landing Page Types
export interface Landing {
  id: number;
  user_id: number;
  template_id: number;
  title: string;
  slug: string;
  description?: string;
  content: Record<string, any>;
  custom_domain?: string;
  is_active: boolean;
  views_count: number;
  leads_count: number;
  created_at: string;
  updated_at: string;
  template?: Template;
  user?: User;
}

// Lead Types
export interface Lead {
  id: number;
  landing_id: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  extra_data?: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
  landing?: Landing;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  token_type: string;
  expires_in: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Dashboard Stats Types
export interface DashboardStats {
  total_landings: number;
  total_leads: number;
  total_views: number | string;
  active_landings: number;
  conversion_rate: number;
  recent_activity: {
    recent_leads: Lead[];
    recent_landings: Landing[];
  };
}

// Analytics Types
export interface LandingAnalytics {
  total_views: number;
  total_leads: number;
  conversion_rate: number;
  recent_leads: Pick<Lead, 'name' | 'email' | 'created_at'>[];
  leads_by_day: {
    date: string;
    count: number;
  }[];
}

export interface AdvancedAnalytics {
  // Métricas básicas
  views: number;
  unique_visitors: number;
  leads: number;
  conversion_rate: number;
  
  // Métricas temporales
  views_by_hour: Array<{ hour: string; views: number }>;
  views_by_day: Array<{ date: string; views: number; leads: number }>;
  views_by_device: { desktop: number; mobile: number; tablet: number };
  
  // Geolocalización
  visitors_by_country: Array<{ country: string; visitors: number }>;
  visitors_by_city: Array<{ city: string; visitors: number }>;
  
  // Fuentes de tráfico
  traffic_sources: {
    direct: number;
    social: number;
    search: number;
    referral: number;
    email: number;
    ads: number;
  };
  
  // Comportamiento
  avg_time_on_page: number;
  bounce_rate: number;
  scroll_depth: number;
  form_abandonment_rate: number;
  
  // Heatmaps
  click_heatmap: Array<{ x: number; y: number; clicks: number }>;
  scroll_heatmap: Array<{ position: number; users: number }>;
} 

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: 'summary' | 'summary_large_image';
  canonical_url?: string;
  robots?: 'index,follow' | 'noindex,nofollow';
  structured_data?: Record<string, any>;
}

export interface PerformanceSettings {
  lazy_loading: boolean;
  image_optimization: boolean;
  css_minification: boolean;
  js_minification: boolean;
  caching_enabled: boolean;
  cdn_enabled: boolean;
} 

export interface NotificationConfig {
  email_notifications: {
    new_lead: boolean;
    daily_summary: boolean;
    weekly_report: boolean;
    conversion_milestones: boolean;
  };
  
  slack_webhook?: string;
  discord_webhook?: string;
  
  sms_notifications: {
    enabled: boolean;
    phone_number?: string;
    high_value_leads_only: boolean;
  };
  
  push_notifications: {
    enabled: boolean;
    immediate_leads: boolean;
    daily_summary: boolean;
  };
}

export interface Alert {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  action_url?: string;
  read: boolean;
  created_at: string;
} 

export interface Plan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: PlanFeatures;
  limits: PlanLimits;
  popular?: boolean;
}

export interface PlanFeatures {
  landing_pages: number | 'unlimited';
  monthly_views: number | 'unlimited';
  leads_storage: number | 'unlimited';
  custom_domains: number;
  templates_access: 'free' | 'premium' | 'all';
  ab_testing: boolean;
  analytics_advanced: boolean;
  integrations: string[];
  support: 'community' | 'email' | 'priority';
  white_label: boolean;
  team_members: number;
}

export interface PlanLimits {
  current_usage: {
    landing_pages: number;
    monthly_views: number;
    leads_count: number;
    custom_domains: number;
  };
  limits: PlanFeatures;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  stripe_subscription_id?: string;
} 