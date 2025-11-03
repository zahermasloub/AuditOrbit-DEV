"use client"
import { Database, Server, Key, Globe, Shield, Bell } from "lucide-react"

export default function SettingsPage() {
  const settings = [
    {
      category: "قاعدة البيانات",
      icon: Database,
      color: "indigo",
      items: [
        { label: "نوع قاعدة البيانات", value: "PostgreSQL 15.2" },
        { label: "المضيف", value: "postgres:5432" },
        { label: "اسم القاعدة", value: "auditdb" },
        { label: "الاتصالات النشطة", value: "24 / 100" },
      ],
    },
    {
      category: "Redis",
      icon: Server,
      color: "orange",
      items: [
        { label: "الإصدار", value: "Redis 7.0.8" },
        { label: "المضيف", value: "redis:6379" },
        { label: "استخدام الذاكرة", value: "128 MB / 512 MB" },
        { label: "عدد المفاتيح", value: "1,234" },
      ],
    },
    {
      category: "MinIO",
      icon: Database,
      color: "cyan",
      items: [
        { label: "نقطة النهاية", value: "http://minio:9000" },
        { label: "Console", value: "http://minio:9001" },
        { label: "عدد الـ Buckets", value: "5" },
        { label: "المساحة المستخدمة", value: "8.7 GB" },
      ],
    },
    {
      category: "API Server",
      icon: Globe,
      color: "emerald",
      items: [
        { label: "الإصدار", value: "FastAPI 0.109.0" },
        { label: "البيئة", value: "Development" },
        { label: "المنفذ", value: "8000" },
        { label: "وقت التشغيل", value: "3d 14h 23m" },
      ],
    },
    {
      category: "الأمان",
      icon: Shield,
      color: "orange",
      items: [
        { label: "CORS", value: "مفعّل" },
        { label: "HTTPS", value: "غير مفعّل (محلي)" },
        { label: "JWT Expiry", value: "24 ساعة" },
        { label: "Rate Limiting", value: "100 req/min" },
      ],
    },
    {
      category: "الإشعارات",
      icon: Bell,
      color: "cyan",
      items: [
        { label: "Email", value: "مفعّل" },
        { label: "Webhooks", value: "مفعّل" },
        { label: "SSE", value: "متصل" },
        { label: "Alerts", value: "3 نشط" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-l from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          إعدادات النظام
        </h2>
        <p className="text-slate-400">عرض إعدادات وتكوينات البنية التحتية (للقراءة فقط)</p>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-sm text-blue-400 font-medium mb-1">وضع القراءة فقط</p>
            <p className="text-xs text-blue-400/80">
              هذه الصفحة تعرض الإعدادات الحالية للنظام. لتعديل الإعدادات، يرجى تحديث ملفات البيئة (.env) وإعادة تشغيل
              الخدمات.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settings.map((section, idx) => {
          const Icon = section.icon
          return (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-3 bg-${section.color}-500/10 border border-${section.color}-500/20 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${section.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-white">{section.category}</h3>
              </div>

              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0"
                  >
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Environment Variables */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">متغيرات البيئة</h3>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6">
          <div className="space-y-3">
            {[
              { key: "NEXT_PUBLIC_API_BASE", value: "http://localhost:8000" },
              { key: "NEXT_PUBLIC_OPS_BASE", value: "/ops" },
              { key: "DATABASE_URL", value: "postgresql://***:***@postgres:5432/auditdb" },
              { key: "REDIS_URL", value: "redis://redis:6379/0" },
              { key: "S3_ENDPOINT", value: "http://minio:9000" },
              { key: "S3_ACCESS_KEY", value: "***" },
            ].map((env, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-mono text-slate-300">{env.key}</span>
                </div>
                <span className="text-sm font-mono text-slate-400">{env.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
