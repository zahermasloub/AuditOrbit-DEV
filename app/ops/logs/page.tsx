"use client"

import { useState } from "react"
import { FileText, AlertCircle, Info, CheckCircle, XCircle, Filter, Download, RefreshCw } from "lucide-react"

type LogLevel = "info" | "warning" | "error" | "success"

type LogEntry = {
  id: string
  timestamp: string
  level: LogLevel
  service: string
  message: string
  details?: string
}

export default function LogsPage() {
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | "all">("all")

  const logs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2025-01-29 14:32:15",
      level: "info",
      service: "API",
      message: "تم بدء تشغيل الخادم بنجاح",
      details: "Server started on port 8000",
    },
    {
      id: "2",
      timestamp: "2025-01-29 14:32:18",
      level: "success",
      service: "Database",
      message: "تم الاتصال بقاعدة البيانات",
      details: "Connected to PostgreSQL at postgres:5432",
    },
    {
      id: "3",
      timestamp: "2025-01-29 14:32:20",
      level: "success",
      service: "Redis",
      message: "تم الاتصال بـ Redis",
      details: "Connected to Redis at redis:6379",
    },
    {
      id: "4",
      timestamp: "2025-01-29 14:35:42",
      level: "warning",
      service: "MinIO",
      message: "استخدام مساحة التخزين مرتفع",
      details: "Storage usage: 8.7 GB / 10 GB (87%)",
    },
    {
      id: "5",
      timestamp: "2025-01-29 14:38:11",
      level: "error",
      service: "AI Worker",
      message: "فشل في معالجة المهمة job-045",
      details: "Error: Timeout after 300 seconds",
    },
    {
      id: "6",
      timestamp: "2025-01-29 14:40:23",
      level: "info",
      service: "API",
      message: "طلب جديد: POST /api/documents",
      details: "User: admin@audit.com, IP: 192.168.1.100",
    },
  ]

  const filteredLogs = selectedLevel === "all" ? logs : logs.filter((log) => log.level === selectedLevel)

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case "info":
        return <Info className="h-5 w-5 text-cyan-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-400" />
      case "error":
        return <XCircle className="h-5 w-5 text-rose-400" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
    }
  }

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case "info":
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
      case "warning":
        return "bg-orange-500/10 border-orange-500/30 text-orange-400"
      case "error":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400"
      case "success":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
    }
  }

  const alerts = [
    { level: "warning", count: 3, label: "تحذيرات" },
    { level: "error", count: 1, label: "أخطاء" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-l from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          السجلات والتنبيهات
        </h2>
        <p className="text-slate-400">عرض سجلات النظام والتنبيهات الحديثة</p>
      </div>

      {/* Alerts Banner */}
      {alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                alert.level === "warning"
                  ? "bg-orange-500/10 border-orange-500/30"
                  : "bg-rose-500/10 border-rose-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className={`h-6 w-6 ${alert.level === "warning" ? "text-orange-400" : "text-rose-400"}`} />
                <div>
                  <p className={`font-semibold ${alert.level === "warning" ? "text-orange-400" : "text-rose-400"}`}>
                    {alert.count} {alert.label}
                  </p>
                  <p className="text-sm text-slate-400">تتطلب انتباهك</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-slate-400" />
          <span className="text-sm text-slate-400">تصفية:</span>
        </div>

        {(["all", "info", "success", "warning", "error"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedLevel === level
                ? "bg-gradient-to-l from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
            }`}
          >
            {level === "all"
              ? "الكل"
              : level === "info"
                ? "معلومات"
                : level === "success"
                  ? "نجاح"
                  : level === "warning"
                    ? "تحذيرات"
                    : "أخطاء"}
          </button>
        ))}

        <div className="mr-auto flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 rounded-lg transition-all">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 rounded-lg transition-all">
            <Download className="h-4 w-4" />
            تصدير
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="divide-y divide-slate-700/50">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-5 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getLevelIcon(log.level)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                    <span className="px-2 py-1 bg-slate-700/50 rounded-md text-xs text-slate-300">{log.service}</span>
                    <span className="text-xs text-slate-500">{log.timestamp}</span>
                  </div>

                  <p className="text-white font-medium mb-1">{log.message}</p>
                  {log.details && <p className="text-sm text-slate-400 font-mono">{log.details}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="p-8 text-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl">
          <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">لا توجد سجلات مطابقة للفلتر المحدد</p>
        </div>
      )}
    </div>
  )
}
