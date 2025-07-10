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