"use client"

import { useState } from "react"
import { Database, FolderOpen, Upload, Download, ExternalLink, RefreshCw } from "lucide-react"

export default function StoragePage() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-l from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          إدارة التخزين (MinIO)
        </h2>
        <p className="text-slate-400">إدارة الملفات والكائنات المخزنة في MinIO</p>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setRefreshKey((prev) => prev + 1)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-indigo-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          تحديث
        </button>

        <a
          href="/ops/minio-console"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 rounded-xl transition-all"
        >
          <ExternalLink className="h-4 w-4" />
          فتح في نافذة جديدة
        </a>

        <div className="mr-auto flex items-center gap-4 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-white">5</span> Buckets
            </span>
          </div>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-white">8.7 GB</span> مستخدم
            </span>
          </div>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <FolderOpen className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-slate-400 text-sm">إجمالي الكائنات</span>
          </div>
          <p className="text-3xl font-bold text-white">2,341</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <Upload className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="text-slate-400 text-sm">رفع اليوم</span>
          </div>
          <p className="text-3xl font-bold text-white">127</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <Download className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="text-slate-400 text-sm">تحميل اليوم</span>
          </div>
          <p className="text-3xl font-bold text-white">543</p>
        </div>
      </div>

      {/* MinIO Console Iframe */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5" />
        <div className="relative" style={{ height: "70vh" }}>
          <iframe
            key={refreshKey}
            src="/ops/minio-console"
            className="w-full h-full rounded-xl"
            title="MinIO Console"
          />
        </div>
      </div>

      {/* Info Note */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-sm text-blue-400">
          💡 <strong>ملاحظة:</strong> يمكنك استخدام واجهة MinIO Console أعلاه لإدارة الملفات والـ Buckets بشكل كامل.
          للوصول المباشر، استخدم الرابط في الأعلى.
        </p>
      </div>
    </div>
  )
}
