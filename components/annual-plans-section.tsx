"use client"

import { useState } from "react"
import { Plus, Calendar, Target, Edit, Trash2, Eye, CheckCircle2, Clock, AlertTriangle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface DepartmentPriority {
  name: string
  priority: "high" | "medium" | "low"
}

interface AnnualPlan {
  id: number
  year: string
  startDate: string
  endDate: string
  title: string
  description: string
  status: "draft" | "approved" | "in-progress" | "completed"
  totalEngagements: number
  completedEngagements: number
  riskBasedHours: number
  actualHours: number
  approvedBy: string
  approvedDate: string
  departments: string[]
  departmentPriorities: DepartmentPriority[]
  vacationStartDate: string
  vacationEndDate: string
}

export function AnnualPlansSection() {
  const [plans, setPlans] = useState<AnnualPlan[]>([
    {
      id: 1,
      year: "2025",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      title: "الخطة السنوية للتدقيق الداخلي 2025",
      description: "خطة تدقيق شاملة قائمة على المخاطر تغطي جميع الإدارات الحرجة",
      status: "in-progress",
      totalEngagements: 24,
      completedEngagements: 8,
      riskBasedHours: 2400,
      actualHours: 850,
      approvedBy: "لجنة التدقيق",
      approvedDate: "2025-01-15",
      departments: ["المالية", "المشتريات", "تقنية المعلومات", "الموارد البشرية", "العمليات"],
      departmentPriorities: [
        { name: "المالية", priority: "high" },
        { name: "المشتريات", priority: "high" },
        { name: "تقنية المعلومات", priority: "medium" },
      ],
      vacationStartDate: "2025-07-01",
      vacationEndDate: "2025-07-31",
    },
    {
      id: 2,
      year: "2024",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      title: "الخطة السنوية للتدقيق الداخلي 2024",
      description: "خطة تدقيق سنوية مع التركيز على الضوابط المالية والتشغيلية",
      status: "completed",
      totalEngagements: 20,
      completedEngagements: 20,
      riskBasedHours: 2200,
      actualHours: 2150,
      approvedBy: "لجنة التدقيق",
      approvedDate: "2024-01-10",
      departments: ["المالية", "المشتريات", "العمليات"],
      departmentPriorities: [
        { name: "المالية", priority: "high" },
        { name: "المشتريات", priority: "high" },
        { name: "العمليات", priority: "medium" },
      ],
      vacationStartDate: "2024-07-01",
      vacationEndDate: "2024-07-31",
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<AnnualPlan | null>(null)
  const [formData, setFormData] = useState({
    year: "",
    startDate: "",
    endDate: "",
    title: "",
    description: "",
    totalEngagements: "",
    riskBasedHours: "",
    vacationStartDate: "",
    vacationEndDate: "",
    selectedDepartments: [] as string[],
  })

  const [departmentPriorities, setDepartmentPriorities] = useState<Record<string, "high" | "medium" | "low">>({})

  const availableDepartments = [
    "المالية",
    "المشتريات",
    "تقنية المعلومات",
    "الموارد البشرية",
    "العمليات",
    "التسويق",
    "المبيعات",
    "خدمة العملاء",
  ]

  const handleCreatePlan = () => {
    const newPlan: AnnualPlan = {
      id: plans.length + 1,
      year: formData.year,
      startDate: formData.startDate,
      endDate: formData.endDate,
      title: formData.title,
      description: formData.description,
      status: "draft",
      totalEngagements: Number.parseInt(formData.totalEngagements),
      completedEngagements: 0,
      riskBasedHours: Number.parseInt(formData.riskBasedHours),
      actualHours: 0,
      approvedBy: "",
      approvedDate: "",
      departments: formData.selectedDepartments,
      departmentPriorities: formData.selectedDepartments.map((dept) => ({
        name: dept,
        priority: departmentPriorities[dept] || "medium",
      })),
      vacationStartDate: formData.vacationStartDate,
      vacationEndDate: formData.vacationEndDate,
    }
    setPlans([newPlan, ...plans])
    setShowCreateDialog(false)
    setFormData({
      year: "",
      startDate: "",
      endDate: "",
      title: "",
      description: "",
      totalEngagements: "",
      riskBasedHours: "",
      vacationStartDate: "",
      vacationEndDate: "",
      selectedDepartments: [],
    })
    setDepartmentPriorities({})
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return ""
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
      case "approved":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "in-progress":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      default:
        return ""
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "مسودة"
      case "approved":
        return "معتمد"
      case "in-progress":
        return "قيد التنفيذ"
      case "completed":
        return "مكتمل"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">الخطط السنوية للتدقيق</h3>
          <p className="text-slate-400 mt-1">إدارة الخطط السنوية القائمة على المخاطر</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
        >
          <Plus className="h-4 w-4 ml-2" />
          خطة جديدة
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">إجمالي الخطط</p>
                <p className="text-3xl font-bold text-white">{plans.length}</p>
              </div>
              <Calendar className="h-10 w-10 text-indigo-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">المهام المخططة</p>
                <p className="text-3xl font-bold text-white">
                  {plans.reduce((sum, plan) => sum + plan.totalEngagements, 0)}
                </p>
              </div>
              <Target className="h-10 w-10 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">المهام المكتملة</p>
                <p className="text-3xl font-bold text-white">
                  {plans.reduce((sum, plan) => sum + plan.completedEngagements, 0)}
                </p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">الساعات المخططة</p>
                <p className="text-3xl font-bold text-white">
                  {plans.reduce((sum, plan) => sum + plan.riskBasedHours, 0)}
                </p>
              </div>
              <Clock className="h-10 w-10 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="bg-slate-900 border-slate-800 hover:border-indigo-500/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-semibold text-white">{plan.title}</h4>
                    <Badge className={getStatusColor(plan.status)}>{getStatusLabel(plan.status)}</Badge>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{plan.description}</p>
                  {plan.departments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {plan.departments.map((dept, idx) => (
                        <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300">
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedPlan(plan)
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">المهام</p>
                  <p className="text-lg font-semibold text-white">
                    {plan.completedEngagements} / {plan.totalEngagements}
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">الساعات</p>
                  <p className="text-lg font-semibold text-white">
                    {plan.actualHours} / {plan.riskBasedHours}
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">معتمد من</p>
                  <p className="text-lg font-semibold text-white">{plan.approvedBy || "-"}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">تاريخ الاعتماد</p>
                  <p className="text-lg font-semibold text-white">{plan.approvedDate || "-"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">نسبة الإنجاز</span>
                  <span className="text-white font-medium">
                    {Math.round((plan.completedEngagements / plan.totalEngagements) * 100)}%
                  </span>
                </div>
                <Progress value={(plan.completedEngagements / plan.totalEngagements) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              إنشاء خطة سنوية جديدة
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-base">
              أدخل تفاصيل الخطة السنوية للتدقيق الداخلي بدقة
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">المعلومات الأساسية</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-slate-300 font-medium flex items-center gap-2">
                      السنة المالية
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Input
                      id="year"
                      placeholder="2025"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalEngagements" className="text-slate-300 font-medium flex items-center gap-2">
                      عدد المهام المخططة
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Input
                      id="totalEngagements"
                      type="number"
                      placeholder="24"
                      value={formData.totalEngagements}
                      onChange={(e) => setFormData({ ...formData, totalEngagements: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-slate-300 font-medium flex items-center gap-2">
                      تاريخ بداية الخطة
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-slate-300 font-medium flex items-center gap-2">
                      تاريخ نهاية الخطة
                      <span className="text-cyan-400 text-lg">*</span>
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300 font-medium flex items-center gap-2">
                    عنوان الخطة
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="الخطة السنوية للتدقيق الداخلي 2025"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300 font-medium">
                    الوصف
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="وصف شامل للخطة السنوية..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors min-h-24 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskBasedHours" className="text-slate-300 font-medium flex items-center gap-2">
                    الساعات المخططة
                    <span className="text-cyan-400 text-lg">*</span>
                  </Label>
                  <Input
                    id="riskBasedHours"
                    type="number"
                    placeholder="2400"
                    value={formData.riskBasedHours}
                    onChange={(e) => setFormData({ ...formData, riskBasedHours: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white focus:border-cyan-500 transition-colors h-11"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white">الإدارات المستهدفة وأولويات التدقيق</h4>
                    <p className="text-sm text-slate-400 mt-1">اختر الإدارات المستهدفة وحدد أولوية التدقيق لكل إدارة</p>
                  </div>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  {availableDepartments.map((dept) => (
                    <div
                      key={dept}
                      className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`dept-${dept}`}
                          checked={formData.selectedDepartments.includes(dept)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                selectedDepartments: [...formData.selectedDepartments, dept],
                              })
                              setDepartmentPriorities({ ...departmentPriorities, [dept]: "medium" })
                            } else {
                              setFormData({
                                ...formData,
                                selectedDepartments: formData.selectedDepartments.filter((d) => d !== dept),
                              })
                              const newPriorities = { ...departmentPriorities }
                              delete newPriorities[dept]
                              setDepartmentPriorities(newPriorities)
                            }
                          }}
                          className="border-slate-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 w-5 h-5"
                        />
                        <Label htmlFor={`dept-${dept}`} className="text-white font-medium cursor-pointer text-base">
                          {dept}
                        </Label>
                      </div>
                      {formData.selectedDepartments.includes(dept) && (
                        <Select
                          value={departmentPriorities[dept] || "medium"}
                          onValueChange={(value: "high" | "medium" | "low") => {
                            setDepartmentPriorities({ ...departmentPriorities, [dept]: value })
                          }}
                        >
                          <SelectTrigger className="w-36 bg-slate-900 border-slate-600 text-white h-10 focus:border-cyan-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="high" className="focus:bg-red-500/20">
                              <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                عالي
                              </span>
                            </SelectItem>
                            <SelectItem value="medium" className="focus:bg-yellow-500/20">
                              <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                متوسط
                              </span>
                            </SelectItem>
                            <SelectItem value="low" className="focus:bg-green-500/20">
                              <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                منخفض
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                  <span className="text-sm text-indigo-300 font-medium">الإدارات المختارة</span>
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-base px-3 py-1">
                    {formData.selectedDepartments.length} / {availableDepartments.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white">فترة الإجازة السنوية</h4>
                    <p className="text-sm text-orange-200 mt-1">حدد فترة الإجازة لمنع جدولة المهام التدقيقية خلالها</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vacationStartDate" className="text-orange-100 font-medium">
                      تاريخ بداية الإجازة
                    </Label>
                    <Input
                      id="vacationStartDate"
                      type="date"
                      value={formData.vacationStartDate}
                      onChange={(e) => setFormData({ ...formData, vacationStartDate: e.target.value })}
                      className="bg-slate-900 border-orange-500/30 text-white focus:border-orange-500 transition-colors h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vacationEndDate" className="text-orange-100 font-medium">
                      تاريخ نهاية الإجازة
                    </Label>
                    <Input
                      id="vacationEndDate"
                      type="date"
                      value={formData.vacationEndDate}
                      onChange={(e) => setFormData({ ...formData, vacationEndDate: e.target.value })}
                      className="bg-slate-900 border-orange-500/30 text-white focus:border-orange-500 transition-colors h-11"
                    />
                  </div>
                </div>

                {formData.vacationStartDate && formData.vacationEndDate && (
                  <div className="p-4 bg-orange-500/20 border border-orange-500/40 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-orange-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base text-orange-200 font-semibold mb-1">تنبيه مهم</p>
                      <p className="text-sm text-orange-100 leading-relaxed">
                        سيتم منع جدولة أي مهام تدقيقية خلال الفترة من{" "}
                        <span className="font-bold">{formData.vacationStartDate}</span> إلى{" "}
                        <span className="font-bold">{formData.vacationEndDate}</span>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
            <Button
              onClick={handleCreatePlan}
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Plus className="h-5 w-5 ml-2" />
              إنشاء الخطة
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              className="flex-1 h-12 text-base font-semibold border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 bg-transparent transition-all"
            >
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Plan Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedPlan?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">{selectedPlan?.description}</DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="pt-4">
                    <p className="text-sm text-slate-400 mb-1">السنة</p>
                    <p className="text-2xl font-bold text-white">{selectedPlan.year}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="pt-4">
                    <p className="text-sm text-slate-400 mb-1">الحالة</p>
                    <Badge className={getStatusColor(selectedPlan.status)}>{getStatusLabel(selectedPlan.status)}</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">فترة الخطة</p>
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <span className="font-medium">
                    {selectedPlan.startDate} - {selectedPlan.endDate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">المهام المكتملة</p>
                  <p className="text-xl font-semibold text-white">
                    {selectedPlan.completedEngagements} / {selectedPlan.totalEngagements}
                  </p>
                  <Progress
                    value={(selectedPlan.completedEngagements / selectedPlan.totalEngagements) * 100}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">الساعات المستخدمة</p>
                  <p className="text-xl font-semibold text-white">
                    {selectedPlan.actualHours} / {selectedPlan.riskBasedHours}
                  </p>
                  <Progress value={(selectedPlan.actualHours / selectedPlan.riskBasedHours) * 100} className="h-2" />
                </div>
              </div>

              {selectedPlan.departmentPriorities && selectedPlan.departmentPriorities.length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-3">الإدارات المستهدفة وأولويات التدقيق</p>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPlan.departmentPriorities.map((dept, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="text-white">{dept.name}</span>
                        <Badge className={getPriorityColor(dept.priority)}>{getPriorityLabel(dept.priority)}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlan.vacationStartDate && selectedPlan.vacationEndDate && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-300">فترة الإجازة السنوية</p>
                  </div>
                  <p className="text-sm text-orange-200">
                    من {selectedPlan.vacationStartDate} إلى {selectedPlan.vacationEndDate}
                  </p>
                </div>
              )}

              {selectedPlan.departments.length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-2">جميع الإدارات المشمولة</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlan.departments.map((dept, idx) => (
                      <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
