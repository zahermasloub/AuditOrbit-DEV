"use client"

import { useState } from "react"
import {
  FileText,
  CheckSquare,
  Upload,
  Download,
  Eye,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Scale,
  Sparkles,
  FileCheck,
  ArrowLeft,
  Printer,
  Mail,
  Save,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AuditorWorkspace() {
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

  // Mock data
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
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
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

        <Card className="bg-slate-900 border-slate-800">
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

        <Card className="bg-slate-900 border-slate-800">
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

        <Card className="bg-slate-900 border-slate-800">
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

      {/* Main Content */}
      {activeView === "tasks" && (
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5" />
              المهام المعينة لك
            </CardTitle>
            <CardDescription className="text-slate-400">المهام التدقيقية المطلوب إنجازها</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-indigo-500/50 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedTask(task)
                    setActiveView("task-details")
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
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
                        <span className="text-slate-400 text-sm">#{task.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{task.department}</p>
                    </div>
                    <Badge
                      variant={task.priority === "عالية" ? "destructive" : "secondary"}
                      className={
                        task.priority === "عالية" ? "" : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                      }
                    >
                      أولوية {task.priority}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">القيمة</p>
                      <p className="text-white font-semibold">{task.value}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">تاريخ الاستحقاق</p>
                      <p className="text-white font-semibold">{task.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">المستندات</p>
                      <p className="text-white font-semibold">{task.documents} ملفات</p>
                    </div>
                    {task.supplier && (
                      <div>
                        <p className="text-slate-400 text-xs mb-1">المورد</p>
                        <p className="text-white font-semibold text-sm">{task.supplier}</p>
                      </div>
                    )}
                  </div>

                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Eye className="h-4 w-4 ml-2" />
                    عرض التفاصيل
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeView === "task-details" && selectedTask && (
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2">{selectedTask.title}</CardTitle>
                  <CardDescription className="text-slate-400">رقم المشروع: {selectedTask.id}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("tasks")}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة للمهام
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">الجهة</p>
                  <p className="text-white font-semibold">{selectedTask.department}</p>
                </div>
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">القيمة</p>
                  <p className="text-white font-semibold">{selectedTask.value}</p>
                </div>
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">تاريخ الشراء</p>
                  <p className="text-white font-semibold">{selectedTask.purchaseDate}</p>
                </div>
                {selectedTask.supplier && (
                  <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg md:col-span-2">
                    <p className="text-slate-400 text-sm mb-1">المورد</p>
                    <p className="text-white font-semibold">{selectedTask.supplier}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  المستندات المرفقة ({documents.length} ملفات)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                          <FileText className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{doc.name}</p>
                          <p className="text-slate-400 text-xs">{doc.size}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => setActiveView("checklist")}
                >
                  <CheckSquare className="h-4 w-4 ml-2" />
                  بدء المراجعة
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent"
                >
                  <Upload className="h-4 w-4 ml-2" />
                  رفع مستند
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "checklist" && (
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2">قائمة فحص عملية الشراء</CardTitle>
                  <CardDescription className="text-slate-400">تقدم المراجعة: {checklistProgress}%</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("task-details")}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={checklistProgress} className="h-3" />
              </div>

              <div className="space-y-6">
                {checklistItems.map((section, idx) => (
                  <div key={section.id} className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            section.completed
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <h3 className="text-white font-semibold text-lg">{section.title}</h3>
                      </div>
                      {section.completed && (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          <CheckCircle className="h-3 w-3 ml-1" />
                          مكتمل
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                          />
                          <label
                            htmlFor={item.id}
                            className={`flex-1 text-sm cursor-pointer ${
                              item.checked ? "text-slate-400 line-through" : "text-white"
                            }`}
                          >
                            {item.text}
                          </label>
                        </div>
                      ))}
                    </div>

                    {!section.completed && (
                      <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => {
                          if (idx === 0) {
                            setSelectedDocument(documents[0])
                            setActiveView("document-review")
                          }
                        }}
                      >
                        <Search className="h-4 w-4 ml-2" />
                        فحص الآن
                      </Button>
                    )}
                  </div>
                ))}

                <div className="p-6 bg-gradient-to-br from-indigo-900/30 to-cyan-900/30 border-2 border-indigo-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                      <Scale className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        المطابقة القانونية
                        <Sparkles className="h-5 w-5 text-yellow-400" />
                      </h3>
                      <p className="text-slate-400 text-sm">ميزة جديدة مدعومة بالذكاء الاصطناعي</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <Checkbox
                        id="compliance-1"
                        className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                      <label htmlFor="compliance-1" className="flex-1 text-sm text-white cursor-pointer">
                        مطابقة مع قانون المناقصات
                      </label>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <Checkbox
                        id="compliance-2"
                        className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                      <label htmlFor="compliance-2" className="flex-1 text-sm text-white cursor-pointer">
                        مطابقة مع لائحة المشتريات
                      </label>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/30"
                    onClick={() => setActiveView("compliance")}
                  >
                    <Scale className="h-4 w-4 ml-2" />
                    تشغيل المطابقة الذكية
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "document-review" && selectedDocument && (
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2">فحص: {selectedDocument.name}</CardTitle>
                  <CardDescription className="text-slate-400">مراجعة المستند والتحقق من المتطلبات</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("checklist")}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Document Preview */}
              <div className="mb-6 p-8 bg-slate-800/50 border border-slate-700 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <FileText className="h-12 w-12 text-red-400" />
                  </div>
                  <div className="max-w-2xl mx-auto p-6 bg-white/5 rounded-lg border border-slate-600">
                    <h3 className="text-white font-bold text-xl mb-4">وزارة التعليم والتعليم العالي</h3>
                    <p className="text-slate-300 mb-2">طلب شراء رقم: PR-2025-1234</p>
                    <div className="border-t border-slate-600 my-4" />
                    <div className="text-right space-y-2 text-slate-300">
                      <p>الموضوع: شراء أجهزة حاسوب للمدارس</p>
                      <p>الكمية: 100 جهاز</p>
                      <p>القيمة المقدرة: 500,000 ر.ق</p>
                      <p>التاريخ: 2025-08-20</p>
                    </div>
                    <div className="border-t border-slate-600 my-4" />
                    <div className="text-right space-y-2 text-slate-300">
                      <p className="font-semibold">التوقيعات:</p>
                      <p>✓ مدير الإدارة: [توقيع]</p>
                      <p>✓ المدير المالي: [توقيع]</p>
                      <p>✓ وكيل الوزارة: [توقيع]</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">قائمة الفحص:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-300">التوقيعات المطلوبة متوفرة (3/3)</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-300">التاريخ صحيح ومنطقي</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-300">المبلغ محدد بوضوح</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <Label htmlFor="reviewer-notes" className="text-white mb-2 block">
                  ملاحظات المراجع:
                </Label>
                <Textarea
                  id="reviewer-notes"
                  placeholder="أدخل ملاحظاتك هنا..."
                  className="min-h-[100px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setActiveView("checklist")}
                >
                  <CheckCircle className="h-4 w-4 ml-2" />
                  تم الفحص - التالي
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                >
                  <AlertCircle className="h-4 w-4 ml-2" />
                  تسجيل ملاحظة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "compliance" && (
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2 flex items-center gap-2">
                    <Scale className="h-6 w-6" />
                    المطابقة القانونية الذكية
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                  </CardTitle>
                  <CardDescription className="text-slate-400">مدعومة بالذكاء الاصطناعي - AI Powered</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("checklist")}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-lg mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">ما هذه الميزة؟</h4>
                    <p className="text-slate-300 text-sm">
                      هذه الأداة تستخدم الذكاء الاصطناعي لمطابقة نصوص المستندات مع القوانين واللوائح القطرية تلقائياً!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="compliance-text" className="text-white mb-2 block">
                    النص المراد مطابقته
                  </Label>
                  <Textarea
                    id="compliance-text"
                    value={complianceText}
                    onChange={(e) => setComplianceText(e.target.value)}
                    placeholder="اكتب أو الصق النص هنا... مثال: تم شراء أجهزة حاسوب بقيمة 500,000 ريال عن طريق مناقصة محدودة شارك فيها 3 موردين"
                    className="min-h-[150px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    maxLength={10000}
                  />
                  <p className="text-slate-400 text-xs mt-1">{complianceText.length} / 10,000 حرف</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="results-count" className="text-white mb-2 block">
                      عدد النتائج
                    </Label>
                    <Select defaultValue="5">
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="min-accuracy" className="text-white mb-2 block">
                      الحد الأدنى للدقة
                    </Label>
                    <Select defaultValue="70">
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50%</SelectItem>
                        <SelectItem value="60">60%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/30"
                  onClick={handleSearchCompliance}
                  disabled={!complianceText || isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2" />
                      جاري البحث...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 ml-2" />
                      بحث عن المطابقات القانونية
                    </>
                  )}
                </Button>
              </div>

              {isSearching && (
                <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">جاري المطابقة القانونية...</h3>
                  <p className="text-slate-400 text-sm mb-4">يرجى الانتظار</p>
                  <div className="space-y-2 max-w-md mx-auto">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">✓ تحليل النص</span>
                      <span className="text-emerald-400">مكتمل</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">✓ توليد التضمينات (Embeddings)</span>
                      <span className="text-emerald-400">مكتمل</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">⏳ البحث في قاعدة القوانين...</span>
                      <span className="text-yellow-400">جاري...</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mt-4">💡 النظام يبحث في أكثر من 1000 مادة قانونية!</p>
                </div>
              )}

              {complianceResults.length > 0 && !isSearching && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-400" />
                      <div>
                        <h3 className="text-white font-semibold">تم إيجاد المطابقات القانونية!</h3>
                        <p className="text-slate-400 text-sm">
                          النتائج ({complianceResults.length}) • وقت البحث: 487 ms
                        </p>
                      </div>
                    </div>
                  </div>

                  {complianceResults.map((result, idx) => (
                    <div
                      key={result.id}
                      className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">{result.law}</h4>
                            <p className="text-slate-400 text-sm flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {result.article}
                            </p>
                          </div>
                        </div>
                        <Badge className={getSimilarityColor(result.level)}>
                          {getSimilarityLabel(result.level)} {result.similarity}%
                        </Badge>
                      </div>

                      <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg mb-4">
                        <p className="text-slate-400 text-xs mb-2">الاقتباس:</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.excerpt}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent"
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          عرض المادة كاملة
                        </Button>
                        <Button
                          size="sm"
                          className={
                            savedMatches.includes(result.id)
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }
                          onClick={() => handleSaveMatch(result.id)}
                        >
                          {savedMatches.includes(result.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 ml-1" />
                              تم الحفظ
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 ml-1" />
                              حفظ كدليل تدقيق
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                      <FileCheck className="h-4 w-4 ml-2" />
                      حفظ جميع النتائج
                    </Button>
                    <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white" onClick={handleGenerateReport}>
                      <FileText className="h-4 w-4 ml-2" />
                      توليد تقرير
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "report-generation" && (
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2">توليد تقرير المراجعة</CardTitle>
                  <CardDescription className="text-slate-400">إنشاء تقرير شامل للمهمة التدقيقية</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("compliance")}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-4 w-4 ml-2" />
                  إلغاء
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Report Type */}
                <div>
                  <Label className="text-white mb-3 block">اختر نوع التقرير:</Label>
                  <RadioGroup value={reportType} onValueChange={setReportType} className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors">
                      <RadioGroupItem value="summary" id="summary" />
                      <label htmlFor="summary" className="flex-1 cursor-pointer">
                        <p className="text-white font-medium">تقرير مختصر</p>
                        <p className="text-slate-400 text-sm">ملخص النتائج فقط</p>
                      </label>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <label htmlFor="detailed" className="flex-1 cursor-pointer">
                        <p className="text-white font-medium">تقرير مفصل</p>
                        <p className="text-slate-400 text-sm">مع جميع الأدلة والمطابقات</p>
                      </label>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors">
                      <RadioGroupItem value="comprehensive" id="comprehensive" />
                      <label htmlFor="comprehensive" className="flex-1 cursor-pointer">
                        <p className="text-white font-medium">تقرير شامل</p>
                        <p className="text-slate-400 text-sm">مع الصور والمرفقات</p>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Report Format */}
                <div>
                  <Label className="text-white mb-3 block">صيغة التقرير:</Label>
                  <RadioGroup value={reportFormat} onValueChange={setReportFormat} className="flex gap-4">
                    <div className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors flex-1">
                      <RadioGroupItem value="pdf" id="pdf" />
                      <label htmlFor="pdf" className="text-white cursor-pointer">
                        PDF
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors flex-1">
                      <RadioGroupItem value="word" id="word" />
                      <label htmlFor="word" className="text-white cursor-pointer">
                        Word
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors flex-1">
                      <RadioGroupItem value="excel" id="excel" />
                      <label htmlFor="excel" className="text-white cursor-pointer">
                        Excel
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Report Title */}
                <div>
                  <Label htmlFor="report-title" className="text-white mb-2 block">
                    عنوان التقرير:
                  </Label>
                  <Input
                    id="report-title"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                {/* Report Notes */}
                <div>
                  <Label htmlFor="report-notes" className="text-white mb-2 block">
                    ملاحظات ختامية (اختياري):
                  </Label>
                  <Textarea
                    id="report-notes"
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    className="min-h-[120px] bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/30"
                    onClick={() => setActiveView("report-preview")}
                  >
                    <Download className="h-4 w-4 ml-2" />
                    توليد التقرير الآن
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveView("compliance")}
                    className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent"
                  >
                    <X className="h-4 w-4 ml-2" />
                    إلغاء
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "report-preview" && (
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2">معاينة التقرير</CardTitle>
                  <CardDescription className="text-slate-400">مراجعة التقرير قبل التحميل</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("report-generation")}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Report Content */}
              <div className="p-8 bg-white/5 border border-slate-700 rounded-lg mb-6 max-h-[600px] overflow-y-auto">
                <div className="space-y-6 text-right">
                  {/* Header */}
                  <div className="text-center pb-6 border-b border-slate-700">
                    <h1 className="text-2xl font-bold text-white mb-2">نظام AuditOrbit للتدقيق الداخلي</h1>
                    <h2 className="text-xl text-slate-300 mb-4">{reportTitle}</h2>
                  </div>

                  {/* Audit Info */}
                  <div>
                    <h3 className="text-white font-bold mb-3">معلومات المراجعة:</h3>
                    <div className="space-y-2 text-slate-300">
                      <p>• رقم المهمة: {selectedTask?.id}</p>
                      <p>• المراجع: أحمد المهندي</p>
                      <p>• تاريخ المراجعة: 28 أكتوبر 2025</p>
                      <p>• حالة المراجعة: مكتملة ✓</p>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div>
                    <h3 className="text-white font-bold mb-3">ملخص تنفيذي:</h3>
                    <p className="text-slate-300 leading-relaxed">
                      تمت مراجعة عملية شراء 100 جهاز حاسوب بقيمة 500,000 ريال قطري من شركة التقنية المتقدمة. العملية تمت
                      وفق قانون المناقصات رقم (24) لسنة 2015، وجميع الإجراءات المتبعة سليمة ونظامية.
                    </p>
                    <div className="mt-3 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                      <p className="text-emerald-300 font-semibold">✅ النتيجة: الموافقة على العملية</p>
                    </div>
                  </div>

                  {/* Inspection Results */}
                  <div>
                    <h3 className="text-white font-bold mb-3">نتائج الفحص:</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                        <p className="text-white font-semibold mb-2">1. صلاحية طلب الشراء: ✅ متوافق</p>
                        <ul className="text-slate-300 text-sm space-y-1 mr-4">
                          <li>- التوقيعات: 3/3 ✓</li>
                          <li>- التاريخ: صحيح ✓</li>
                          <li>- المبلغ: محدد بوضوح ✓</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                        <p className="text-white font-semibold mb-2">2. عملية المناقصة: ✅ متوافق</p>
                        <ul className="text-slate-300 text-sm space-y-1 mr-4">
                          <li>- عدد العروض: 3 عروض ✓</li>
                          <li>- معايير التقييم: واضحة ✓</li>
                          <li>- قرار اللجنة: موثق ✓</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Legal Compliance */}
                  <div>
                    <h3 className="text-white font-bold mb-3">المطابقات القانونية (بواسطة AI):</h3>
                    <div className="space-y-3">
                      {complianceResults.slice(0, 3).map((result, idx) => (
                        <div key={idx} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-semibold">{result.law}</p>
                            <Badge className={getSimilarityColor(result.level)}>
                              {result.similarity}% ({getSimilarityLabel(result.level)})
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm">{result.article}</p>
                          <p className="text-slate-300 text-sm mt-2">الحكم: العملية متطابقة مع متطلبات القانون</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-white font-bold mb-3">التوصيات:</h3>
                    <div className="space-y-2 text-slate-300">
                      <p>✅ الموافقة على العملية</p>
                      <p>✅ جميع الإجراءات متطابقة مع القوانين</p>
                      <p>📌 التوصية: أرشفة المعاملة كنموذج مرجعي</p>
                    </div>
                  </div>

                  {/* Notes */}
                  {reportNotes && (
                    <div>
                      <h3 className="text-white font-bold mb-3">ملاحظات ختامية:</h3>
                      <p className="text-slate-300 leading-relaxed">{reportNotes}</p>
                    </div>
                  )}

                  {/* Signature */}
                  <div className="pt-6 border-t border-slate-700">
                    <p className="text-slate-300">التوقيع:</p>
                    <p className="text-white font-semibold">أحمد المهندي - مدقق داخلي</p>
                    <p className="text-slate-400 text-sm">28 أكتوبر 2025</p>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                  <div>
                    <h3 className="text-white font-semibold">تم إنشاء التقرير بنجاح!</h3>
                    <p className="text-slate-400 text-sm">
                      اسم الملف: تقرير_مراجعة_{selectedTask?.id}.{reportFormat} • الحجم: 2.4 MB • التاريخ: 2025-10-28
                      14:35
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل التقرير
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent"
                >
                  <Mail className="h-4 w-4 ml-2" />
                  إرسال بالبريد
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent"
                >
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveView("tasks")}
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                >
                  <CheckCircle className="h-4 w-4 ml-2" />
                  إنهاء المهمة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
