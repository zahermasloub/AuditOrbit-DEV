"use client"

import { useState } from "react"
import {
  Plus,
  FileText,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
  AlertTriangle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox" // Added

interface Engagement {
  id: number
  title: string
  description: string
  department: string
  status: "planning" | "fieldwork" | "reporting" | "follow-up" | "completed"
  priority: "critical" | "high" | "medium" | "low"
  progress: number
  startDate: string
  endDate: string
  assignedAuditors: string[]
  objectives: string[]
  scope: string
  criteria: string
  estimatedHours: number
  actualHours: number
  riskLevel: "high" | "medium" | "low"
  annualPlanId?: number
  annualPlanTitle?: string
}

interface AnnualPlan {
  id: number
  year: string
  title: string
  status: string
  vacationStartDate?: string // Added
  vacationEndDate?: string // Added
}

interface EngagementsSectionProps {
  annualPlans?: AnnualPlan[]
}

export function EngagementsSection({ annualPlans = [] }: EngagementsSectionProps) {
  const [engagements, setEngagements] = useState<Engagement[]>([
    {
      id: 1,
      title: "تدقيق نظام المشتريات",
      description: "مراجعة شاملة لعمليات المشتريات والضوابط الداخلية",
      department: "المشتريات",
      status: "fieldwork",
      priority: "high",
      progress: 65,
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      assignedAuditors: ["أحمد محمد", "سارة علي"],
      objectives: ["تقييم فعالية ضوابط المشتريات", "التحقق من الامتثال للسياسات", "تقييم كفاءة العمليات"],
      scope: "جميع عمليات المشتريات للربع الأخير من 2024",
      criteria: "سياسات المشتريات الداخلية، معايير ISO 9001",
      estimatedHours: 120,
      actualHours: 78,
      riskLevel: "high",
      annualPlanId: 1,
      annualPlanTitle: "الخطة السنوية للتدقيق الداخلي 2025",
    },
    {
      id: 2,
      title: "مراجعة الضوابط المالية",
      description: "تدقيق الضوابط المالية والمحاسبية",
      department: "المالية",
      status: "planning",
      priority: "medium",
      progress: 30,
      startDate: "2025-02-01",
      endDate: "2025-03-01",
      assignedAuditors: ["محمد خالد"],
      objectives: ["تقييم الضوابط المالية", "مراجعة التقارير المالية"],
      scope: "العمليات المالية للسنة المالية 2024",
      criteria: "المعايير المحاسبية الدولية، السياسات المالية الداخلية",
      estimatedHours: 100,
      actualHours: 30,
      riskLevel: "high",
      annualPlanId: 1,
      annualPlanTitle: "الخطة السنوية للتدقيق الداخلي 2025",
    },
    {
      id: 3,
      title: "تدقيق أمن المعلومات",
      description: "تقييم أمن البنية التحتية لتقنية المعلومات",
      department: "تقنية المعلومات",
      status: "reporting",
      priority: "critical",
      progress: 90,
      startDate: "2025-01-01",
      endDate: "2025-01-30",
      assignedAuditors: ["فاطمة حسن", "عمر يوسف"],
      objectives: ["تقييم الضوابط الأمنية", "اختبار الاختراق", "مراجعة السياسات"],
      scope: "جميع أنظمة تقنية المعلومات والشبكات",
      criteria: "ISO 27001، NIST Cybersecurity Framework",
      estimatedHours: 150,
      actualHours: 135,
      riskLevel: "high",
      annualPlanId: 1,
      annualPlanTitle: "الخطة السنوية للتدقيق الداخلي 2025",
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    priority: "medium",
    status: "planning",
    startDate: "",
    endDate: "",
    estimatedHours: "",
    objectives: "",
    scope: "",
    criteria: "",
    annualPlanId: "",
    responsibleAuditor: "",
    teamMembers: [] as string[],
  })

  const availableAuditors = [
    "أحمد محمد",
    "سارة علي",
    "محمد خالد",
    "فاطمة حسن",
    "عمر يوسف",
    "نورة أحمد",
    "خالد عبدالله",
    "ليلى محمود",
  ]

  const isDateInVacationPeriod = (date: string, planId: string) => {
    const plan = annualPlans.find((p) => p.id === Number.parseInt(planId))
    if (!plan || !plan.vacationStartDate || !plan.vacationEndDate) return false

    const checkDate = new Date(date)
    const vacationStart = new Date(plan.vacationStartDate)
    const vacationEnd = new Date(plan.vacationEndDate)

    return checkDate >= vacationStart && checkDate <= vacationEnd
  }

  const [vacationWarning, setVacationWarning] = useState<string | null>(null)

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setFormData({ ...formData, [field]: value })

    if (formData.annualPlanId && value) {
      if (isDateInVacationPeriod(value, formData.annualPlanId)) {
        setVacationWarning(`التاريخ المحدد يقع ضمن فترة الإجازة السنوية. يرجى اختيار تاريخ آخر.`)
      } else {
        setVacationWarning(null)
      }
    }
  }

  const handleCreateEngagement = () => {
    if (
      formData.annualPlanId &&
      (isDateInVacationPeriod(formData.startDate, formData.annualPlanId) ||
        isDateInVacationPeriod(formData.endDate, formData.annualPlanId))
    ) {
      alert("لا يمكن جدولة مهمة خلال فترة الإجازة السنوية")
      return
    }

    const selectedPlan = annualPlans.find((plan) => plan.id === Number.parseInt(formData.annualPlanId))

    const newEngagement: Engagement = {
      id: engagements.length + 1,
      title: formData.title,
      description: formData.description,
      department: formData.department,
      status: formData.status as "planning" | "fieldwork" | "reporting" | "follow-up" | "completed",
      priority: formData.priority as "critical" | "high" | "medium" | "low",
      progress: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      assignedAuditors: formData.responsibleAuditor
        ? [formData.responsibleAuditor, ...formData.teamMembers.filter((m) => m !== formData.responsibleAuditor)]
        : formData.teamMembers,
      objectives: formData.objectives.split("\n").filter((o) => o.trim()),
      scope: formData.scope,
      criteria: formData.criteria,
      estimatedHours: Number.parseInt(formData.estimatedHours),
      actualHours: 0,
      riskLevel: "medium",
      annualPlanId: formData.annualPlanId ? Number.parseInt(formData.annualPlanId) : undefined,
      annualPlanTitle: selectedPlan?.title,
    }
    setEngagements([newEngagement, ...engagements])
    setShowCreateDialog(false)
    setFormData({
      title: "",
      description: "",
      department: "",
      priority: "medium",
      status: "planning",
      startDate: "",
      endDate: "",
      estimatedHours: "",
      objectives: "",
      scope: "",
      criteria: "",
      annualPlanId: "",
      responsibleAuditor: "",
      teamMembers: [],
    })
    setVacationWarning(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "fieldwork":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
      case "reporting":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "follow-up":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      default:
        return ""
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planning":
        return "التخطيط"
      case "fieldwork":
        return "العمل الميداني"
      case "reporting":
        return "إعداد التقرير"
      case "follow-up":
        return "المتابعة"
      case "completed":
        return "مكتمل"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "critical":
        return "حرج"
      case "high":
        return "عالي"
      case "medium":
        return "متوسط"
      case "low":
        return "منخفض"
      default:
        return priority
    }
  }

  const statusCounts = {
    planning: engagements.filter((e) => e.status === "planning").length,
    fieldwork: engagements.filter((e) => e.status === "fieldwork").length,
    reporting: engagements.filter((e) => e.status === "reporting").length,
    followUp: engagements.filter((e) => e.status === "follow-up").length,
    completed: engagements.filter((e) => e.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">المهام التدقيقية</h3>
          <p className="text-slate-400 mt-1">إدارة دورة حياة المهام التدقيقية الكاملة</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
        >
          <Plus className="h-4 w-4 ml-2" />
          مهمة جديدة
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">التخطيط</p>
                <p className="text-3xl font-bold text-cyan-400">{statusCounts.planning}</p>
              </div>
              <Target className="h-10 w-10 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">العمل الميداني</p>
                <p className="text-3xl font-bold text-indigo-400">{statusCounts.fieldwork}</p>
              </div>
              <FileText className="h-10 w-10 text-indigo-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">إعداد التقرير</p>
                <p className="text-3xl font-bold text-orange-400">{statusCounts.reporting}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">المتابعة</p>
                <p className="text-3xl font-bold text-yellow-400">{statusCounts.followUp}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">مكتمل</p>
                <p className="text-3xl font-bold text-emerald-400">{statusCounts.completed}</p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagements List */}
      <div className="space-y-4">
        {engagements.map((engagement) => (
          <Card
            key={engagement.id}
            className="bg-slate-900 border-slate-800 hover:border-indigo-500/50 transition-colors"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-semibold text-white">{engagement.title}</h4>
                    <Badge className={getStatusColor(engagement.status)}>{getStatusLabel(engagement.status)}</Badge>
                    <Badge
                      variant={getPriorityColor(engagement.priority)}
                      className={
                        engagement.priority === "high"
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : engagement.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : ""
                      }
                    >
                      {getPriorityLabel(engagement.priority)}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{engagement.description}</p>
                  {engagement.annualPlanTitle && (
                    <div className="mb-3">
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
                        <Calendar className="h-3 w-3 ml-1" />
                        {engagement.annualPlanTitle}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{engagement.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{engagement.assignedAuditors.length} مدقق</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {engagement.startDate} - {engagement.endDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedEngagement(engagement)
                      setShowViewDialog(true)
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">الساعات</p>
                  <p className="text-lg font-semibold text-white">
                    {engagement.actualHours} / {engagement.estimatedHours}
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">مستوى المخاطر</p>
                  <Badge
                    variant={engagement.riskLevel === "high" ? "destructive" : "secondary"}
                    className={
                      engagement.riskLevel === "medium"
                        ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                        : engagement.riskLevel === "low"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : ""
                    }
                  >
                    {engagement.riskLevel === "high" ? "عالي" : engagement.riskLevel === "medium" ? "متوسط" : "منخفض"}
                  </Badge>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">الأهداف</p>
                  <p className="text-lg font-semibold text-white">{engagement.objectives.length}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">التقدم</span>
                  <span className="text-white font-medium">{engagement.progress}%</span>
                </div>
                <Progress value={engagement.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Engagement Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              إنشاء مهمة تدقيقية جديدة
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-base">
              أدخل تفاصيل المهمة التدقيقية وفقاً لمعايير IIA الدولية
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">المعلومات الأساسية</h4>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualPlan" className="text-slate-300 font-medium flex items-center gap-2">
                    الخطة السنوية
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Select
                    value={formData.annualPlanId}
                    onValueChange={(value) => {
                      setFormData({ ...formData, annualPlanId: value })
                      setVacationWarning(null)
                    }}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white h-11 focus:border-cyan-500">
                      <SelectValue placeholder="اختر الخطة السنوية" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {annualPlans.length > 0 ? (
                        annualPlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.title} ({plan.year})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          لا توجد خطط سنوية متاحة
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">اربط هذه المهمة بخطة سنوية محددة</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300 font-medium flex items-center gap-2">
                    اسم المهمة
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="تدقيق نظام المشتريات"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300 font-medium flex items-center gap-2">
                    الهدف من المهمة
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="وصف مختصر للهدف من المهمة التدقيقية..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors min-h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-slate-300 font-medium flex items-center gap-2">
                      الإدارة الخاضعة للتدقيق
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-white h-11 focus:border-cyan-500">
                        <SelectValue placeholder="اختر الإدارة" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="المالية">المالية</SelectItem>
                        <SelectItem value="المشتريات">المشتريات</SelectItem>
                        <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                        <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                        <SelectItem value="العمليات">العمليات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-slate-300 font-medium">
                      الأولوية
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-white h-11 focus:border-cyan-500">
                        <SelectValue placeholder="اختر الأولوية" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="critical">حرج</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="low">منخفض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">الجدولة والحالة</h4>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-slate-300 font-medium flex items-center gap-2">
                      تاريخ البدء
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleDateChange("startDate", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-slate-300 font-medium flex items-center gap-2">
                      تاريخ الانتهاء
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleDateChange("endDate", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedHours" className="text-slate-300 font-medium">
                      الساعات المقدرة
                    </Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      placeholder="120"
                      value={formData.estimatedHours}
                      onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                </div>

                {vacationWarning && (
                  <div className="p-4 bg-orange-500/20 border border-orange-500/40 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertTriangle className="h-6 w-6 text-orange-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base text-orange-200 font-semibold mb-1">تحذير</p>
                      <p className="text-sm text-orange-100">{vacationWarning}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-slate-300 font-medium flex items-center gap-2">
                    حالة المهمة
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white h-11 focus:border-cyan-500">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="planning">مجدولة</SelectItem>
                      <SelectItem value="fieldwork">جارية</SelectItem>
                      <SelectItem value="reporting">تحت المراجعة</SelectItem>
                      <SelectItem value="completed">منتهية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">تعيين الفريق</h4>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibleAuditor" className="text-slate-300 font-medium flex items-center gap-2">
                    المدقق المسؤول
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Select
                    value={formData.responsibleAuditor}
                    onValueChange={(value) => setFormData({ ...formData, responsibleAuditor: value })}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white h-11 focus:border-cyan-500">
                      <SelectValue placeholder="اختر المدقق المسؤول" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {availableAuditors.map((auditor) => (
                        <SelectItem key={auditor} value={auditor}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {auditor}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">المدقق الرئيسي المسؤول عن المهمة</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium">فريق المدققين المشاركين</Label>
                  <div className="space-y-2 max-h-64 overflow-y-auto p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    {availableAuditors
                      .filter((auditor) => auditor !== formData.responsibleAuditor)
                      .map((auditor) => (
                        <div
                          key={auditor}
                          className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors"
                        >
                          <Checkbox
                            id={`auditor-${auditor}`}
                            checked={formData.teamMembers.includes(auditor)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, teamMembers: [...formData.teamMembers, auditor] })
                              } else {
                                setFormData({
                                  ...formData,
                                  teamMembers: formData.teamMembers.filter((m) => m !== auditor),
                                })
                              }
                            }}
                            className="border-slate-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 w-5 h-5"
                          />
                          <Label
                            htmlFor={`auditor-${auditor}`}
                            className="text-white font-medium cursor-pointer flex-1"
                          >
                            {auditor}
                          </Label>
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <span className="text-sm text-indigo-300 font-medium">أعضاء الفريق</span>
                    <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-base px-3 py-1">
                      {formData.teamMembers.length}
                      {formData.responsibleAuditor && " + المسؤول"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">تفاصيل التدقيق</h4>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives" className="text-slate-300 font-medium">
                    الأهداف (سطر لكل هدف)
                  </Label>
                  <Textarea
                    id="objectives"
                    placeholder="تقييم فعالية الضوابط&#10;التحقق من الامتثال للسياسات&#10;تقييم كفاءة العمليات"
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors min-h-28 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope" className="text-slate-300 font-medium">
                    النطاق
                  </Label>
                  <Textarea
                    id="scope"
                    placeholder="جميع عمليات المشتريات للربع الأخير من 2024"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors min-h-24 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="criteria" className="text-slate-300 font-medium">
                    المعايير
                  </Label>
                  <Textarea
                    id="criteria"
                    placeholder="سياسات المشتريات الداخلية، معايير ISO 9001"
                    value={formData.criteria}
                    onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors min-h-24 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
            <Button
              onClick={handleCreateEngagement}
              disabled={!!vacationWarning}
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="h-5 w-5 ml-2" />
              إنشاء المهمة
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false)
                setVacationWarning(null)
              }}
              className="flex-1 h-12 text-base font-semibold border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 bg-transparent transition-all"
            >
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Engagement Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEngagement?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">{selectedEngagement?.description}</DialogDescription>
          </DialogHeader>
          {selectedEngagement && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="bg-slate-800 border border-slate-700">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="planning">التخطيط</TabsTrigger>
                <TabsTrigger value="team">الفريق</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-400 mb-1">الحالة</p>
                      <Badge className={getStatusColor(selectedEngagement.status)}>
                        {getStatusLabel(selectedEngagement.status)}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-400 mb-1">الأولوية</p>
                      <Badge
                        variant={getPriorityColor(selectedEngagement.priority)}
                        className={
                          selectedEngagement.priority === "high"
                            ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                            : selectedEngagement.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                              : ""
                        }
                      >
                        {getPriorityLabel(selectedEngagement.priority)}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">التقدم</p>
                  <Progress value={selectedEngagement.progress} className="h-3" />
                  <p className="text-right text-sm text-white font-medium">{selectedEngagement.progress}%</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">الساعات المستخدمة</p>
                    <p className="text-xl font-semibold text-white">
                      {selectedEngagement.actualHours} / {selectedEngagement.estimatedHours}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">مستوى المخاطر</p>
                    <Badge
                      variant={selectedEngagement.riskLevel === "high" ? "destructive" : "secondary"}
                      className={
                        selectedEngagement.riskLevel === "medium"
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : selectedEngagement.riskLevel === "low"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : ""
                      }
                    >
                      {selectedEngagement.riskLevel === "high"
                        ? "عالي"
                        : selectedEngagement.riskLevel === "medium"
                          ? "متوسط"
                          : "منخفض"}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="planning" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">الأهداف</h4>
                  <ul className="space-y-2">
                    {selectedEngagement.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <Target className="h-4 w-4 text-indigo-400 mt-1 flex-shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">النطاق</h4>
                  <p className="text-slate-300">{selectedEngagement.scope}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">المعايير</h4>
                  <p className="text-slate-300">{selectedEngagement.criteria}</p>
                </div>
              </TabsContent>
              <TabsContent value="team" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">المدققون المعينون</h4>
                  <div className="space-y-2">
                    {selectedEngagement.assignedAuditors.map((auditor, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {auditor.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{auditor}</p>
                          <p className="text-sm text-slate-400">مدقق داخلي</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
