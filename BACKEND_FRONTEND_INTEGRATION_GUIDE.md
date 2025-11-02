# 🔗 دليل ربط Frontend مع Backend الموجود

## 📋 نظرة عامة

هذا الدليل يوضح كيفية ربط تطبيق Next.js الحالي مع Backend FastAPI الموجود بناءً على قاعدة البيانات PostgreSQL المُوثقة.

---

## 1️⃣ هيكل Backend الموجود

### التقنيات المستخدمة
- **Backend Framework:** FastAPI (Python)
- **Database:** PostgreSQL 13+
- **Authentication:** JWT Token-based
- **Migrations:** Alembic
- **Password Hashing:** bcrypt/pgcrypto

### الجداول الرئيسية
\`\`\`
users → roles → permissions (RBAC)
annual_plans → engagements → checklists → checklist_items
engagements → documents
engagements → engagement_team
audit_logs (سجل جميع العمليات)
settings (إعدادات النظام)
ai_jobs (مهام الذكاء الاصطناعي)
\`\`\`

---

## 2️⃣ تحديث API Client للتوافق مع Backend

### الهيكل الحالي للـ API Endpoints

بناءً على قاعدة البيانات، البنية المتوقعة للـ API:

\`\`\`
/api/auth/
  POST /login          → تسجيل الدخول
  POST /logout         → تسجيل الخروج
  POST /refresh        → تحديث Token
  GET  /me             → معلومات المستخدم الحالي

/api/admin/
  GET    /users        → قائمة المستخدمين
  POST   /users        → إنشاء مستخدم
  GET    /users/{id}   → تفاصيل مستخدم
  PUT    /users/{id}   → تحديث مستخدم
  DELETE /users/{id}   → حذف مستخدم
  
  GET    /roles        → قائمة الأدوار
  POST   /roles        → إنشاء دور
  PUT    /roles/{id}   → تحديث دور
  DELETE /roles/{id}   → حذف دور
  
  GET    /permissions  → قائمة الصلاحيات
  POST   /role-permissions → ربط دور بصلاحية

/api/annual-plans/
  GET    /             → قائمة الخطط السنوية
  POST   /             → إنشاء خطة سنوية
  GET    /{id}         → تفاصيل خطة
  PUT    /{id}         → تحديث خطة
  DELETE /{id}         → حذف خطة
  POST   /{id}/approve → اعتماد خطة

/api/engagements/
  GET    /             → قائمة المهام التدقيقية
  POST   /             → إنشاء مهمة
  GET    /{id}         → تفاصيل مهمة
  PUT    /{id}         → تحديث مهمة
  DELETE /{id}         → حذف مهمة
  
  GET    /{id}/team    → فريق المهمة
  POST   /{id}/team    → إضافة عضو للفريق
  DELETE /{id}/team/{user_id} → إزالة عضو
  
  GET    /{id}/checklists → قوائم التحقق
  POST   /{id}/checklists → إنشاء قائمة تحقق
  
  GET    /{id}/documents  → المستندات
  POST   /{id}/documents  → رفع مستند

/api/checklists/
  GET    /{id}         → تفاصيل قائمة التحقق
  PUT    /{id}         → تحديث قائمة
  DELETE /{id}         → حذف قائمة
  
  GET    /{id}/items   → بنود القائمة
  POST   /{id}/items   → إضافة بند
  PUT    /items/{id}   → تحديث بند (تحديد كمكتمل)
  DELETE /items/{id}   → حذف بند

/api/documents/
  GET    /{id}         → تفاصيل مستند
  DELETE /{id}         → حذف مستند
  GET    /{id}/download → تحميل مستند

/api/audit-logs/
  GET    /             → سجلات التدقيق (للمراجعة فقط)

/api/settings/
  GET    /             → جميع الإعدادات
  GET    /{key}        → إعداد محدد
  PUT    /{key}        → تحديث إعداد
  POST   /             → إنشاء إعداد جديد
  DELETE /{key}        → حذف إعداد

/api/ai-jobs/
  GET    /             → قائمة المهام
  POST   /             → إنشاء مهمة جديدة
  GET    /{id}         → تفاصيل مهمة
  POST   /{id}/cancel  → إلغاء مهمة
  POST   /{id}/retry   → إعادة محاولة
\`\`\`

---

## 3️⃣ تحديث Frontend API Client

### ملف: `lib/api/client.ts`

\`\`\`typescript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

interface ApiError {
  detail: string;
  status?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader(): HeadersInit {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('access_token') 
      : null;
    
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          detail: 'حدث خطأ غير متوقع',
          status: response.status,
        }));
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('فشل الاتصال بالخادم');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async upload<T>(endpoint: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const token = typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: 'فشل رفع الملف',
      }));
      throw new Error(error.detail);
    }

    return await response.json();
  }
}

export const apiClient = new ApiClient(API_BASE);
\`\`\`

### ملف: `lib/api/types.ts`

\`\`\`typescript
// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role_id: string;
  status: 'active' | 'suspended' | 'inactive';
  last_login?: string;
  created_at: string;
  updated_at: string;
  role?: Role;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
  created_at: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  user: User;
}

// Annual Plan Types
export interface AnnualPlan {
  id: string;
  name: string;
  fiscal_year: number;
  budget?: number;
  status: 'draft' | 'approved' | 'active' | 'completed';
  created_by: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

// Engagement Types
export interface Engagement {
  id: string;
  code: string;
  title: string;
  objective: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  assigned_to?: string;
  annual_plan_id?: string;
  progress: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  assigned_user?: User;
  annual_plan?: AnnualPlan;
}

export interface EngagementTeamMember {
  engagement_id: string;
  user_id: string;
  role: string;
  assigned_at: string;
  user?: User;
}

// Checklist Types
export interface Checklist {
  id: string;
  engagement_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  items?: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  checklist_id: string;
  section?: string;
  text: string;
  checked: boolean;
  notes?: string;
  checked_by?: string;
  checked_at?: string;
  order_index?: number;
  created_at: string;
  updated_at: string;
}

// Document Types
export interface Document {
  id: string;
  engagement_id: string;
  name: string;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
  uploader?: User;
}

// Settings Types
export interface Setting {
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  category?: string;
  description?: string;
  updated_by?: string;
  updated_at: string;
}

// AI Job Types
export interface AIJob {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  payload?: any;
  result?: any;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Audit Log Types
export interface AuditLog {
  id: number;
  actor_id: string;
  action: string;
  resource: string;
  resource_id?: string;
  at: string;
  ip?: string;
  actor?: User;
}

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Request Types
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role_id: string;
  status?: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  role_id?: string;
  status?: string;
  password?: string;
}

export interface CreateEngagementRequest {
  code: string;
  title: string;
  objective: string;
  assigned_to?: string;
  annual_plan_id?: string;
}

export interface UpdateEngagementRequest {
  code?: string;
  title?: string;
  objective?: string;
  status?: string;
  assigned_to?: string;
  progress?: number;
}
\`\`\`

### ملف: `lib/api/auth.ts`

\`\`\`typescript
import { apiClient } from './client';
import { LoginRequest, TokenResponse, User } from './types';

export const authApi = {
  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(
      '/api/auth/login',
      credentials
    );
    
    // Store tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.access_token);
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }
    }
    
    return response;
  },

  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/api/auth/me');
  },

  async refreshToken(): Promise<TokenResponse> {
    const refreshToken = typeof window !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : null;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<TokenResponse>('/api/auth/refresh', {
      refresh_token: refreshToken,
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.access_token);
    }

    return response;
  },
};
\`\`\`

### ملف: `lib/api/users.ts`

\`\`\`typescript
import { apiClient } from './client';
import { User, CreateUserRequest, UpdateUserRequest, PaginatedResponse } from './types';

export const usersApi = {
  async getAll(params?: { page?: number; size?: number; status?: string }): Promise<PaginatedResponse<User>> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.size) query.append('size', params.size.toString());
    if (params?.status) query.append('status', params.status);
    
    return apiClient.get<PaginatedResponse<User>>(`/api/admin/users?${query}`);
  },

  async getById(id: string): Promise<User> {
    return apiClient.get<User>(`/api/admin/users/${id}`);
  },

  async create(data: CreateUserRequest): Promise<User> {
    return apiClient.post<User>('/api/admin/users', data);
  },

  async update(id: string, data: UpdateUserRequest): Promise<User> {
    return apiClient.put<User>(`/api/admin/users/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/api/admin/users/${id}`);
  },
};
\`\`\`

### ملف: `lib/api/engagements.ts`

\`\`\`typescript
import { apiClient } from './client';
import {
  Engagement,
  CreateEngagementRequest,
  UpdateEngagementRequest,
  EngagementTeamMember,
  Checklist,
  Document,
  PaginatedResponse,
} from './types';

export const engagementsApi = {
  async getAll(params?: { page?: number; size?: number; status?: string }): Promise<PaginatedResponse<Engagement>> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.size) query.append('size', params.size.toString());
    if (params?.status) query.append('status', params.status);
    
    return apiClient.get<PaginatedResponse<Engagement>>(`/api/engagements?${query}`);
  },

  async getById(id: string): Promise<Engagement> {
    return apiClient.get<Engagement>(`/api/engagements/${id}`);
  },

  async create(data: CreateEngagementRequest): Promise<Engagement> {
    return apiClient.post<Engagement>('/api/engagements', data);
  },

  async update(id: string, data: UpdateEngagementRequest): Promise<Engagement> {
    return apiClient.put<Engagement>(`/api/engagements/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/api/engagements/${id}`);
  },

  // Team Management
  async getTeam(id: string): Promise<EngagementTeamMember[]> {
    return apiClient.get<EngagementTeamMember[]>(`/api/engagements/${id}/team`);
  },

  async addTeamMember(id: string, userId: string, role: string): Promise<EngagementTeamMember> {
    return apiClient.post<EngagementTeamMember>(`/api/engagements/${id}/team`, {
      user_id: userId,
      role,
    });
  },

  async removeTeamMember(id: string, userId: string): Promise<void> {
    return apiClient.delete(`/api/engagements/${id}/team/${userId}`);
  },

  // Checklists
  async getChecklists(id: string): Promise<Checklist[]> {
    return apiClient.get<Checklist[]>(`/api/engagements/${id}/checklists`);
  },

  async createChecklist(id: string, data: { name: string; description?: string }): Promise<Checklist> {
    return apiClient.post<Checklist>(`/api/engagements/${id}/checklists`, data);
  },

  // Documents
  async getDocuments(id: string): Promise<Document[]> {
    return apiClient.get<Document[]>(`/api/engagements/${id}/documents`);
  },

  async uploadDocument(id: string, file: File): Promise<Document> {
    return apiClient.upload<Document>(`/api/engagements/${id}/documents`, file);
  },
};
\`\`\`

---

## 4️⃣ تحديث صفحة تسجيل الدخول

### ملف: `app/login/page.tsx`

\`\`\`typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: `مرحباً ${response.user.name}`,
      });

      // Redirect based on role
      if (response.user.role?.name === 'System Admin') {
        router.push('/admin');
      } else if (response.user.role?.name === 'Ops Manager') {
        router.push('/ops');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'فشل تسجيل الدخول',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md p-8 bg-slate-900 border border-slate-800 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-6">تسجيل الدخول</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>
        </form>
      </div>
    </div>
  );
}
\`\`\`

---

## 5️⃣ خطوات التكامل

### الخطوة 1: إعداد متغيرات البيئة

أضف في ملف `.env.local`:

\`\`\`env
NEXT_PUBLIC_API_BASE=http://localhost:8000
\`\`\`

### الخطوة 2: تشغيل Backend

\`\`\`bash
cd api
python -m venv venv
source venv/bin/activate  # أو venv\Scripts\activate على Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload --port 8000
\`\`\`

### الخطوة 3: تشغيل Frontend

\`\`\`bash
npm install
npm run dev
\`\`\`

### الخطوة 4: اختبار الاتصال

1. افتح المتصفح على `http://localhost:3000/login`
2. سجل الدخول باستخدام بيانات مستخدم موجود
3. تحقق من تخزين Token في localStorage
4. تحقق من إعادة التوجيه الصحيحة

---

## 6️⃣ معالجة الأخطاء الشائعة

### خطأ CORS

إذا ظهر خطأ CORS، أضف في Backend (FastAPI):

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
\`\`\`

### خطأ 401 Unauthorized

تأكد من:
- Token موجود في localStorage
- Token صالح وغير منتهي
- Header Authorization يتم إرساله بشكل صحيح

### خطأ في تحميل الملفات

تأكد من:
- Backend يدعم multipart/form-data
- حجم الملف ضمن الحد المسموح
- المسار الصحيح للـ endpoint

---

## 7️⃣ الخطوات التالية

1. ✅ تحديث جميع ملفات API في `lib/api/`
2. ✅ تحديث صفحة تسجيل الدخول
3. ⏳ تحديث صفحة Admin لاستخدام API الحقيقي
4. ⏳ تحديث صفحة Dashboard لجلب البيانات من Backend
5. ⏳ تحديث صفحة Auditor لإدارة المهام التدقيقية
6. ⏳ إضافة معالجة الأخطاء الشاملة
7. ⏳ إضافة Loading States في جميع الصفحات
8. ⏳ اختبار جميع العمليات CRUD

---

## ✅ الخلاصة

هذا الدليل يوفر:
- ✅ هيكل API Client محدث يتوافق مع Backend الموجود
- ✅ جميع Types المطلوبة بناءً على قاعدة البيانات
- ✅ أمثلة عملية لكل API endpoint
- ✅ خطوات التكامل الكاملة
- ✅ معالجة الأخطاء الشائعة

الآن يمكنك البدء في ربط Frontend مع Backend بثقة كاملة!
