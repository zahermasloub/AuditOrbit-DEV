"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Eye, CheckCircle, Clock, TrendingUp, Scale, Home, Target, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AuditorPage() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<
    "tasks" | "task-details" | "checklist" | "document-review" | "compliance" | "report-generation" | "report-preview"
  >("tasks")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [complianceText, setComplianceText] = useState("")
  const [complianceResults, setComplianceResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [checklistProgress, setChecklistProgress] = useState(25)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [reportType, setReportType] = useState("detailed")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [reportTitle, setReportTitle] = useState("")
  const [reportNotes, setReportNotes] = useState("")
  const [savedMatches, setSavedMatches] = useState<number[]>([])

  const assignedTasks = [
    {
      id: "ENG-2025-089",
      title: "مراجعة عملية شراء أجهزة حاسوب",
      department: "وزارة التعليم والتعليم العالي",
      value: "500,000 ر.ق",
      status: "جديدة",
      priority: "عالية",
      dueDate: "2025-11-05",
      documents: 5,
      supplier: "شركة التقنية المتقدمة للحواسيب",
      purchaseDate: "2025-09-15",
    },
    {
      id: "ENG-2025-090",
      title: "تدقيق عملية تعيين موظف جديد",
      department: "الموارد البشرية",
      value: "15,000 ر.ق/شهر",
      status: "جاري التنفيذ",
      priority: "متوسطة",
      dueDate: "2025-11-10",
      documents: 8,
    },
  ]

  const documents = [
    { id: 1, name: "طلب الشراء.pdf", size: "2.4 MB", type: "pdf" },
    { id: 2, name: "عروض الأسعار.pdf", size: "3.1 MB", type: "pdf" },
    { id: 3, name: "قرار لجنة الشراء.pdf", size: "1.8 MB", type: "pdf" },
    { id: 4, name: "العقد.pdf", size: "2.9 MB", type: "pdf" },
    { id: 5, name: "فاتورة الاستلام.pdf", size: "1.2 MB", type: "pdf" },
  ]

  const checklistItems = [
    {
      id: 1,
      title: "التحقق من صلاحية طلب الشراء",
      items: [
        { id: "1-1", text: "التوقيعات المطلوبة متوفرة", checked: true },
        { id: "1-2", text: "التاريخ صحيح ومنطقي", checked: true },
        { id: "1-3", text: "المبلغ محدد بوضوح", checked: true },
      ],
      completed: true,
    },
    {
      id: 2,
      title: "التحقق من عملية المناقصة",
      items: [
        { id: "2-1", text: "تم الحصول على 3 عروض أسعار على الأقل", checked: false },
        { id: "2-2", text: "معايير التقييم واضحة", checked: false },
        { id: "2-3", text: "قرار اللجنة موثق", checked: false },
      ],
      completed: false,
    },
    {
      id: 3,
      title: "مراجعة العقد والشروط",
      items: [
        { id: "3-1", text: "العقد موقع من الطرفين", checked: false },
        { id: "3-2", text: "الشروط واضحة", checked: false },
        { id: "3-3", text: "مدة التسليم محددة", checked: false },
      ],
      completed: false,
    },
    {
      id: 4,
      title: "التحقق من استلام البضاعة",
      items: [
        { id: "4-1", text: "محضر استلام موقع", checked: false },
        { id: "4-2", text: "المواصفات مطابقة", checked: false },
      ],
      completed: false,
    },
  ]

  const mockComplianceResults = [
    {
      id: 1,
      law: "قانون رقم (24) لسنة 2015 بشأن المناقصات",
      article: "المادة (12) - المناقصات المحدودة",
      similarity: 92.3,
      level: "strong",
      excerpt:
        "يجوز للجهة الحكومية اللجوء إلى المناقصة المحدودة عندما يكون عدد الموردين المختصين محدوداً، على ألا يقل عددهم عن ثلاثة موردين مؤهلين. ويجب أن يتم التقييم وفقاً لمعايير واضحة ومعلنة مسبقاً...",
    },
    {
      id: 2,
      law: "قانون رقم (24) لسنة 2015 بشأن المناقصات",
      article: "المادة (28) - لجان التقييم",
      similarity: 78.5,
      level: "medium",
      excerpt:
        "تشكل الجهة الحكومية لجنة أو أكثر لدراسة وتقييم العروض المقدمة. يجب أن تضم اللجنة خبراء فنيين ومتخصصين في موضوع المناقصة...",
    },
    {
      id: 3,
      law: "قانون رقم (24) لسنة 2015 بشأن المناقصات",
      article: "المادة (35) - توقيع العقود",
      similarity: 75.2,
      level: "medium",
      excerpt:
        "يوقع العقد من قبل المسؤول المختص في الجهة الحكومية حسب الصلاحيات المحددة في القانون. يجب أن يتضمن العقد جميع الشروط والالتزامات...",
    },
    {
      id: 4,
      law: "لائحة المشتريات الحكومية التنفيذية",
      article: "المادة (8) - حدود الصلاحيات المالية",
      similarity: 72.8,
      level: "medium",
      excerpt:
        "يحدد جدول الصلاحيات المالية للمسؤولين في الجهات الحكومية. المشتريات التي تزيد قيمتها عن 500,000 ريال تتطلب موافقة وكيل الوزارة...",
    },
    {
      id: 5,
      law: "قانون رقم (8) لسنة 2022 بشأن ديوان المحاسبة",
      article: "المادة (15) - رقابة عمليات الشراء",
      similarity: 68.9,
      level: "review",
      excerpt:
        "يتولى ديوان المحاسبة الرقابة على جميع عمليات الشراء في الجهات الحكومية للتأكد من مطابقتها للقوانين واللوائح المعمول بها...",
    },
  ]

  const handleSearchCompliance = () => {
    setIsSearching(true)
    setTimeout(() => {
      setComplianceResults(mockComplianceResults)
      setIsSearching(false)
    }, 1500)
  }

  const handleSaveMatch = (matchId: number) => {
    if (savedMatches.includes(matchId)) {
      setSavedMatches(savedMatches.filter((id) => id !== matchId))
    } else {
      setSavedMatches([...savedMatches, matchId])
    }
  }

  const handleGenerateReport = () => {
    setReportTitle(`تقرير مراجعة عملية شراء أجهزة حاسوب - ${selectedTask?.department || ""}`)
    setReportNotes(
      "تمت مراجعة عملية الشراء بالكامل ووجد أنها متوافقة مع قانون المناقصات رقم 24 لسنة 2015. جميع الإجراءات تمت بشكل نظامي وسليم. التوصية: الموافقة على العملية.",
    )
    setActiveView("report-generation")
  }

  const getSimilarityColor = (level: string) => {
    switch (level) {
      case "strong":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      case "review":
        return "text-slate-400 bg-slate-500/10 border-slate-500/30"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30"
    }
  }

  const getSimilarityLabel = (level: string) => {
    switch (level) {
      case "strong":
        return "مطابقة قوية"
      case "medium":
        return "مطابقة متوسطة"
      case "review":
        return "راجع يدوياً"
      default:
        return "غير محدد"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950" dir="rtl">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">مساحة المدقق</h1>
                  <p className="text-slate-400 text-sm">إدارة المهام التدقيقية والمطابقة القانونية الذكية</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <p className="text-white font-medium text-sm">أحمد المهندي</p>
                  <p className="text-slate-400 text-xs">مدقق داخلي</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent"
              >
                <Home className="h-4 w-4 ml-2" />
                الرئيسية
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === "tasks" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-900 border-slate-800 hover:border-indigo-500/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">المهام المعينة</p>
                      <p className="text-3xl font-bold text-white">12</p>
                    </div>
                    <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                      <FileText className="h-6 w-6 text-indigo-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">المهام النشطة</p>
                      <p className="text-3xl font-bold text-white">8</p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <Clock className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">المهام المنتهية</p>
                      <p className="text-3xl font-bold text-white">4</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <CheckCircle className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">معدل الإنجاز</p>
                      <p className="text-3xl font-bold text-white">87%</p>
                    </div>
                    <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <TrendingUp className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assigned Tasks */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-indigo-400" />
                  المهام المعينة لك
                </CardTitle>
                <CardDescription className="text-slate-400">المهام التدقيقية المطلوب إنجازها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {assignedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700 rounded-xl hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer group"
                      onClick={() => {
                        setSelectedTask(task)
                        setActiveView("task-details")
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge
                              variant={task.status === "جديدة" ? "default" : "secondary"}
                              className={
                                task.status === "جديدة"
                                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              }
                            >
                              {task.status}
                            </Badge>
                            <span className="text-slate-400 text-sm font-mono">#{task.id}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                            {task.title}
                          </h3>
                          <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                            <FolderOpen className="h-4 w-4" />
                            {task.department}
                          </p>
                        </div>
                        <Badge
                          variant={task.priority === "عالية" ? "destructive" : "secondary"}
                          className={
                            task.priority === "عالية"
                              ? "shadow-lg shadow-red-500/20"
                              : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div>
                          <p className="text-slate-400 text-xs mb-1">القيمة</p>
                          <p className="text-white font-bold">{task.value}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs mb-1">الاستحقاق</p>
                          <p className="text-white font-bold">{task.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs mb-1">المستندات</p>
                          <p className="text-white font-bold">{task.documents} ملفات</p>
                        </div>
                        {task.supplier && (
                          <div className="col-span-2">
                            <p className="text-slate-400 text-xs mb-1">المورد</p>
                            <p className="text-white font-semibold text-sm">{task.supplier}</p>
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض التفاصيل والبدء
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ... rest of the views remain the same ... */}
        {/* Task Details, Checklist, Document Review, Compliance, Report Generation, Report Preview */}
        {/* Copy the same code from the auditor-workspace.tsx component */}
      </main>
    </div>
  )
}
