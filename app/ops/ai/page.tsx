"use client"

import { useEffect, useState } from "react"
import { Cpu, Activity, Clock, CheckCircle, XCircle, Loader2, TrendingUp, Zap } from "lucide-react"

type EventMsg = {
  type: string
  ts: string
  payload: any
}

type JobStatus = "pending" | "processing" | "completed" | "failed"

type Job = {
  id: string
  type: string
  status: JobStatus
  progress: number
  created: string
  duration?: string
}

export default function AiPage() {
  const [events, setEvents] = useState<EventMsg[]>([])
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "job-001",
      type: "document_analysis",
      status: "processing",
      progress: 65,
      created: "2025-01-29 14:23:15",
      duration: "2m 34s",
    },
    {
      id: "job-002",
      type: "compliance_check",
      status: "completed",
      progress: 100,
      created: "2025-01-29 14:20:08",
      duration: "1m 12s",
    },
    {
      id: "job-003",
      type: "risk_assessment",
      status: "pending",
      progress: 0,
      created: "2025-01-29 14:25:42",
    },
  ])

  useEffect(() => {
    const es = new EventSource("/ops/api/ops/events")
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        if (data.type === "ai_job_event") {
          setEvents((prev) => [data, ...prev].slice(0, 100))
        }
      } catch {}
    }
    es.onerror = () => {
      console.log("[v0] SSE connection error for AI events")
    }

    return () => es.close()
  }, [])

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-400" />
      case "processing":
        return <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-400" />
    }
  }

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
      case "processing":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400"
      case "completed":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
      case "failed":
        return "bg-red-500/10 border-red-500/30 text-red-400"
    }
  }

  const stats = [
    { label: "المهام النشطة", value: "12", icon: Activity, color: "indigo" },
    { label: "في الانتظار", value: "3", icon: Clock, color: "orange" },
    { label: "مكتملة اليوم", value: "45", icon: CheckCircle, color: "emerald" },
    { label: "معدل النجاح", value: "98.5%", icon: TrendingUp, color: "cyan" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-l from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          مهام الذكاء الاصطناعي
        </h2>
        <p className="text-slate-400">مراقبة وإدارة مهام AI Worker في الوقت الفعلي</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 bg-${stat.color}-500/10 border border-${stat.color}-500/20 rounded-lg`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-400`} />
                </div>
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Jobs Queue */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">قائمة المهام</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <Zap className="h-4 w-4 text-indigo-400" />
            <span className="text-xs text-indigo-400 font-medium">{jobs.length} مهمة</span>
          </div>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <h4 className="text-white font-semibold">{job.id}</h4>
                    <p className="text-slate-400 text-sm">{job.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>

              {job.status === "processing" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">التقدم</span>
                    <span className="text-white font-medium">{job.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-indigo-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.created}</span>
                </div>
                {job.duration && (
                  <>
                    <div className="w-px h-4 bg-slate-700" />
                    <span>المدة: {job.duration}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">الأحداث المباشرة</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">SSE متصل</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden">
          {events.length === 0 ? (
            <div className="p-8 text-center">
              <Cpu className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">في انتظار أحداث AI Worker...</p>
              <p className="text-slate-500 text-sm mt-1">سيتم عرض الأحداث الجديدة هنا تلقائياً</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50 max-h-96 overflow-y-auto">
              {events.map((event, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
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
