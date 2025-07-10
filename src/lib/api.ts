import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import type { 
  User, 
  Template, 
  Landing, 
  Lead, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ApiResponse,
  DashboardStats,
  LandingAnalytics
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Interceptor para agregar el token JWT automáticamente
    this.api.interceptors.request.use((config) => {
      const token = Cookies.get('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar errores de autenticación
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // ====================================
  // AUTHENTICATION METHODS
  // ====================================
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/login', credentials);
    const { token } = response.data;
    
    // Guardar token en cookie
    Cookies.set('auth_token', token, { expires: 1 }); // 1 día
    
    return response.data;
  }

  async register(data: RegisterData): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.post('/register', data);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/logout');
    } catch (error) {
      console.log('Error during logout:', error);
    } finally {
      Cookies.remove('auth_token');
    }
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/who');
    return response.data;
  }

  async refreshToken(): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/refresh');
    const { token } = response.data;
    
    // Actualizar token en cookie
    Cookies.set('auth_token', token, { expires: 1 });
    
    return response.data;
  }

  // ====================================
  // TEMPLATES METHODS
  // ====================================
  async getTemplates(): Promise<ApiResponse<Template[]>> {
    const response: AxiosResponse<ApiResponse<Template[]>> = await this.api.get('/templates');
    return response.data;
  }

  async getFreeTemplates(): Promise<ApiResponse<Template[]>> {
    const response: AxiosResponse<ApiResponse<Template[]>> = await this.api.get('/templates/free');
    return response.data;
  }

  async getPremiumTemplates(): Promise<ApiResponse<Template[]>> {
    const response: AxiosResponse<ApiResponse<Template[]>> = await this.api.get('/templates/premium');
    return response.data;
  }

  async getTemplate(id: number): Promise<ApiResponse<Template>> {
    const response: AxiosResponse<ApiResponse<Template>> = await this.api.get(`/templates/${id}`);
    return response.data;
  }

  // ====================================
  // LANDING PAGES METHODS
  // ====================================
  async getLandings(): Promise<ApiResponse<Landing[]>> {
    const response: AxiosResponse<ApiResponse<Landing[]>> = await this.api.get('/landings');
    return response.data;
  }

  async createLanding(data: Partial<Landing>): Promise<ApiResponse<Landing>> {
    const response: AxiosResponse<ApiResponse<Landing>> = await this.api.post('/landings', data);
    return response.data;
  }

  async getLanding(id: number): Promise<ApiResponse<Landing>> {
    const response: AxiosResponse<ApiResponse<Landing>> = await this.api.get(`/landings/${id}`);
    return response.data;
  }

  async updateLanding(id: number, data: Partial<Landing>): Promise<ApiResponse<Landing>> {
    const response: AxiosResponse<ApiResponse<Landing>> = await this.api.put(`/landings/${id}`, data);
    return response.data;
  }

  async deleteLanding(id: number): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await this.api.delete(`/landings/${id}`);
    return response.data;
  }

  async duplicateLanding(id: number): Promise<ApiResponse<Landing>> {
    const response: AxiosResponse<ApiResponse<Landing>> = await this.api.post(`/landings/${id}/duplicate`);
    return response.data;
  }

  async getLandingAnalytics(id: number): Promise<ApiResponse<LandingAnalytics>> {
    const response: AxiosResponse<ApiResponse<LandingAnalytics>> = await this.api.get(`/landings/${id}/analytics`);
    return response.data;
  }

  // Método público para ver landing page por slug
  async getLandingBySlug(slug: string): Promise<ApiResponse<Landing>> {
    const response: AxiosResponse<ApiResponse<Landing>> = await this.api.get(`/l/${slug}`);
    return response.data;
  }

  // ====================================
  // LEADS METHODS
  // ====================================
  async getLeads(): Promise<ApiResponse<Lead[]>> {
    const response: AxiosResponse<ApiResponse<Lead[]>> = await this.api.get('/leads');
    return response.data;
  }

  async getLead(id: number): Promise<ApiResponse<Lead>> {
    const response: AxiosResponse<ApiResponse<Lead>> = await this.api.get(`/leads/${id}`);
    return response.data;
  }

  async updateLead(id: number, data: Partial<Lead>): Promise<ApiResponse<Lead>> {
    const response: AxiosResponse<ApiResponse<Lead>> = await this.api.put(`/leads/${id}`, data);
    return response.data;
  }

  async deleteLead(id: number): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await this.api.delete(`/leads/${id}`);
    return response.data;
  }

  async getLeadsStats(): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await this.api.get('/leads/stats');
    return response.data;
  }

  async exportLeads(): Promise<Blob> {
    const response = await this.api.get('/leads/export', {
      responseType: 'blob',
    });
    return response.data;
  }

  // Método público para enviar leads (formulario público)
  async submitLead(data: {
    landing_id: number;
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }): Promise<ApiResponse<Lead>> {
    const response: AxiosResponse<ApiResponse<Lead>> = await this.api.post('/submit-lead', data);
    return response.data;
  }

  // ====================================
  // DASHBOARD METHODS
  // ====================================
  async getDashboardStats(userId?: number): Promise<ApiResponse<DashboardStats>> {
    const params = userId ? { user_id: userId } : {};
    const response: AxiosResponse<ApiResponse<DashboardStats>> = await this.api.get('/dashboard/stats', { params });
    return response.data;
  }

  // ====================================
  // UTILITIES METHODS
  // ====================================
  async checkSlugAvailability(slug: string): Promise<ApiResponse<{ available: boolean; suggested: string }>> {
    const response = await this.api.get(`/utils/check-slug/${slug}`);
    return response.data;
  }

  // Método público para incrementar vistas de landing page
  async incrementLandingViews(landingId: number): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.api.post(`/landings/${landingId}/increment-views`);
    return response.data;
  }

  // Método para generar slug
  async generateSlug(title: string): Promise<ApiResponse<{ slug: string }>> {
    const response: AxiosResponse<ApiResponse<{ slug: string }>> = await this.api.post('/utils/generate-slug', { title });
    return response.data;
  }

  // ====================================
  // HELPER METHODS
  // ====================================
  isAuthenticated(): boolean {
    return !!Cookies.get('auth_token');
  }

  getToken(): string | undefined {
    return Cookies.get('auth_token');
  }
}

// Exportar instancia singleton
export const apiService = new ApiService();
export default apiService; 