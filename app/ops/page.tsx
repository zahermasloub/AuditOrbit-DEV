"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  Database,
  Cpu,
  HardDrive,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Zap,
  Server,
  Wifi,
} from "lucide-react"

type HealthData = {
  status: string
  details: {
    db: string
    redis: string
    minio: string
    ai_worker: string
  }
}

type EventMsg = {
  type: string
  ts: string
  payload: any
}

export default function OpsOverview() {
  const [health, setHealth] = useState<HealthData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [events, setEvents] = useState<EventMsg[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch health data
    fetch("/ops/api/ops/healthz-aggregate")
      .then((r) => r.json())
      .then((data) => {
        setHealth(data)
        setLoading(false)
      })
      .catch(() => {
        setError("تعذر الاتصال بالـ API")
        setLoading(false)
      })

    // Connect to SSE for real-time events
    const es = new EventSource("/ops/api/ops/events")
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        setEvents((prev) => [data, ...prev].slice(0, 50))
      } catch {}
    }
    es.onerror = () => {
      console.log("[v0] SSE connection error, will retry automatically")
    }

    return () => es.close()
  }, [])

  const services = [
    {
      name: "API Server",
      status: health?.details?.db === "ok" ? "online" : "offline",
      icon: Server,
      color: "indigo",
      metrics: { uptime: "99.9%", requests: "1.2M", latency: "45ms" },
    },
    {
      name: "Database",
      status: health?.details?.db === "ok" ? "online" : "offline",
      icon: Database,
      color: "cyan",
      metrics: { connections: "24", queries: "8.5K", size: "2.4 GB" },
    },
    {
      name: "Redis Cache",
      status: health?.details?.redis === "ok" ? "online" : "offline",
      icon: Zap,
      color: "orange",
      metrics: { keys: "1,234", memory: "128 MB", hits: "94%" },
    },
    {
      name: "MinIO Storage",
      status: health?.details?.minio === "ok" ? "online" : "offline",
      icon: HardDrive,
      color: "indigo",
      metrics: { buckets: "5", objects: "2,341", size: "8.7 GB" },
    },
    {
      name: "AI Worker",
      status: health?.details?.ai_worker === "ok" ? "online" : "offline",
      icon: Cpu,
      color: "cyan",
      metrics: { jobs: "12", queue: "3", processed: "1,456" },
    },
    {
      name: "Network",
      status: "online",
      icon: Wifi,
      color: "emerald",
      metrics: { bandwidth: "125 Mbps", packets: "45K", errors: "0" },
    },
  ]

  const systemMetrics = [
    { label: "استخدام CPU", value: "42%", trend: "up", change: "+5%", icon: Cpu, color: "indigo" },
    { label: "استخدام الذاكرة", value: "68%", trend: "down", change: "-3%", icon: Activity, color: "cyan" },
    { label: "مساحة التخزين", value: "11.1 GB", trend: "up", change: "+1.2 GB", icon: HardDrive, color: "orange" },
    { label: "الطلبات/دقيقة", value: "1,234", trend: "up", change: "+12%", icon: TrendingUp, color: "emerald" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-300">جاري تحميل بيانات النظام...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-l from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          نظرة عامة على النظام
        </h2>
        <p className="text-slate-300">مراقبة شاملة لجميع خدمات البنية التحتية</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-rose-400" />
          <span className="text-rose-300">{error}</span>
        </div>
      )}

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, idx) => {
          const Icon = metric.icon
          const isUp = metric.trend === "up"

          return (
            <div
              key={idx}
              className="relative group overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 bg-${metric.color}-500/10 border border-${metric.color}-500/30 rounded-lg shadow-sm`}
                  >
                    <Icon className={`h-6 w-6 text-${metric.color}-400`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                      isUp
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {metric.change}
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Services Status Grid */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">حالة الخدمات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon
            const isOnline = service.status === "online"

            return (
              <div
                key={idx}
                className="relative group overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 bg-${service.color}-500/10 border border-${service.color}-500/30 rounded-lg shadow-sm`}
                    >
                      <Icon className={`h-6 w-6 text-${service.color}-400`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${isOnline ? "bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" : "bg-rose-400"}`}
                      />
                      <span className={`text-xs font-medium ${isOnline ? "text-emerald-300" : "text-rose-300"}`}>
                        {isOnline ? "نشط" : "غير متصل"}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-white font-semibold mb-3">{service.name}</h4>

                  <div className="space-y-2">
                    {Object.entries(service.metrics).map(([key, value], i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 capitalize">{key}</span>
                        <span className="text-slate-200 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">الأحداث الأخيرة</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-lg shadow-indigo-400/50" />
            <span className="text-xs text-indigo-300 font-medium">تحديث مباشر</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
          {events.length === 0 ? (
            <div className="p-8 text-center">
              <Clock className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300">في انتظار الأحداث...</p>
              <p className="text-slate-500 text-sm mt-1">سيتم عرض الأحداث الجديدة هنا تلقائياً</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50 max-h-96 overflow-y-auto">
              {events.map((event, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                      <Activity className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{event.type}</span>
                        <span className="text-xs text-slate-500">{event.ts}</span>
                      </div>
                      <pre className="text-xs text-slate-400 whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
