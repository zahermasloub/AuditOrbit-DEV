"use client"

import { useState } from "react"
import {
  Users,
  MoreVertical,
  Eye,
  Edit,
  Shield,
  Trash2,
  Search,
  UserPlus,
  Download,
  Mail,
  Phone,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@audit.com",
    role: "admin",
    department: "التدقيق الداخلي",
    status: "active",
    lastLogin: "2025-01-30 14:30",
    createdAt: "2024-01-15",
    phone: "+966501234567",
    tasksCompleted: 45,
    tasksInProgress: 8,
    findingsReported: 23,
  },
  {
    id: 2,
    name: "فاطمة علي",
    email: "fatima@audit.com",
    role: "ia_manager",
    department: "التدقيق الداخلي",
    status: "active",
    lastLogin: "2025-01-30 16:45",
    createdAt: "2024-02-20",
    phone: "+966502345678",
    tasksCompleted: 38,
    tasksInProgress: 5,
    findingsReported: 19,
  },
  {
    id: 3,
    name: "خالد سعيد",
    email: "khaled@audit.com",
    role: "auditor",
    department: "التدقيق المالي",
    status: "active",
    lastLogin: "2025-01-30 10:15",
    createdAt: "2024-03-10",
    phone: "+966503456789",
    tasksCompleted: 32,
    tasksInProgress: 6,
    findingsReported: 15,
  },
  {
    id: 4,
    name: "نورة عبدالله",
    email: "noura@audit.com",
    role: "auditor",
    department: "تدقيق العمليات",
    status: "inactive",
    lastLogin: "2025-01-25 09:20",
    createdAt: "2024-04-05",
    phone: "+966504567890",
    tasksCompleted: 28,
    tasksInProgress: 3,
    findingsReported: 12,
  },
]

const permissions = [
  { id: "annual_plans_view", label: "عرض الخطط السنوية", category: "الخطط السنوية" },
  { id: "annual_plans_create", label: "إنشاء الخطط السنوية", category: "الخطط السنوية" },
  { id: "annual_plans_edit", label: "تعديل الخطط السنوية", category: "الخطط السنوية" },
  { id: "annual_plans_delete", label: "حذف الخطط السنوية", category: "الخطط السنوية" },
  { id: "engagements_view", label: "عرض المهام", category: "المهام التدقيقية" },
  { id: "engagements_create", label: "إنشاء المهام", category: "المهام التدقيقية" },
  { id: "engagements_edit", label: "تعديل المهام", category: "المهام التدقيقية" },
  { id: "engagements_delete", label: "حذف المهام", category: "المهام التدقيقية" },
  { id: "findings_view", label: "عرض النتائج", category: "النتائج" },
  { id: "findings_create", label: "إنشاء النتائج", category: "النتائج" },
  { id: "findings_edit", label: "تعديل النتائج", category: "النتائج" },
  { id: "findings_delete", label: "حذف النتائج", category: "النتائج" },
  { id: "reports_view", label: "عرض التقارير", category: "التقارير" },
  { id: "reports_create", label: "إنشاء التقارير", category: "التقارير" },
  { id: "reports_approve", label: "اعتماد التقارير", category: "التقارير" },
  { id: "users_manage", label: "إدارة المستخدمين", category: "الإدارة" },
  { id: "settings_manage", label: "إدارة الإعدادات", category: "الإدارة" },
]

export default function AdminPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Dialog states
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [permissionsDialog, setPermissionsDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    status: "",
  })

  // Permissions state
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewDetails = (user: any) => {
    setSelectedUser(user)
    setViewDetailsDialog(true)
  }

  const handleEdit = (user: any) => {
    setSelectedUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone,
      status: user.status,
    })
    setEditDialog(true)
  }

  const handleSaveEdit = () => {
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              ...editForm,
            }
          : u,
      ),
    )
    setEditDialog(false)
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات المستخدم بنجاح",
    })
  }

  const handleChangePermissions = (user: any) => {
    setSelectedUser(user)
    // Set default permissions based on role
    const defaultPermissions =
      user.role === "admin"
        ? permissions.map((p) => p.id)
        : user.role === "ia_manager"
          ? permissions.filter((p) => !p.id.includes("delete") && p.id !== "users_manage").map((p) => p.id)
          : permissions.filter((p) => p.id.includes("view") || p.id.includes("create")).map((p) => p.id)
    setSelectedPermissions(defaultPermissions)
    setPermissionsDialog(true)
  }

  const handleSavePermissions = () => {
    setPermissionsDialog(false)
    toast({
      title: "تم تحديث الصلاحيات",
      description: `تم تحديث صلاحيات ${selectedUser.name} بنجاح`,
    })
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    )
  }

  const handleDelete = (user: any) => {
    setSelectedUser(user)
    setDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id))
    setDeleteDialog(false)
    toast({
      title: "تم الحذف بنجاح",
      description: `تم حذف المستخدم ${selectedUser.name} من النظام`,
      variant: "destructive",
    })
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">مدير النظام</Badge>
      case "ia_manager":
        return <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">مدير التدقيق</Badge>
      case "auditor":
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">مدقق</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
        <CheckCircle className="h-3 w-3 ml-1" />
        نشط
      </Badge>
    ) : (
      <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">
        <XCircle className="h-3 w-3 ml-1" />
        غير نشط
      </Badge>
    )
  }

  // Group permissions by category
  const permissionsByCategory = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, typeof permissions>,
  )

  return (
    <div className="min-h-screen bg-slate-950 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">إدارة المستخدمين</h1>
            <p className="text-slate-400">إدارة حسابات المستخدمين والصلاحيات</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700">
            <UserPlus className="h-4 w-4 ml-2" />
            إضافة مستخدم جديد
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold text-white">{users.length}</p>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">المستخدمون النشطون</p>
                  <p className="text-3xl font-bold text-white">{users.filter((u) => u.status === "active").length}</p>
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
                  <p className="text-slate-400 text-sm mb-1">مديرو التدقيق</p>
                  <p className="text-3xl font-bold text-white">{users.filter((u) => u.role === "ia_manager").length}</p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">المدققون</p>
                  <p className="text-3xl font-bold text-white">{users.filter((u) => u.role === "auditor").length}</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <Activity className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="البحث عن مستخدم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="الدور الوظيفي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  <SelectItem value="admin">مدير النظام</SelectItem>
                  <SelectItem value="ia_manager">مدير التدقيق</SelectItem>
                  <SelectItem value="auditor">مدقق</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">قائمة المستخدمين</CardTitle>
            <CardDescription className="text-slate-400">{filteredUsers.length} مستخدم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">المستخدم</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">الدور</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">القسم</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">الحالة</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">آخر تسجيل دخول</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                      <td className="py-4 px-4">
                        <span className="text-slate-300">{user.department}</span>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                      <td className="py-4 px-4">
                        <span className="text-slate-400 text-sm">{user.lastLogin}</span>
                      </td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(user)}
                              className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                            >
                              <Eye className="h-4 w-4 ml-2" />
                              عرض التفاصيل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(user)}
                              className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                            >
                              <Edit className="h-4 w-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChangePermissions(user)}
                              className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                            >
                              <Shield className="h-4 w-4 ml-2" />
                              تغيير الصلاحيات
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(user)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* View Details Dialog */}
        <Dialog open={viewDetailsDialog} onOpenChange={setViewDetailsDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">تفاصيل المستخدم</DialogTitle>
              <DialogDescription className="text-slate-400">معلومات شاملة عن المستخدم وإحصائياته</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                    <p className="text-slate-400">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {getRoleBadge(selectedUser.role)}
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">البريد الإلكتروني</span>
                    </div>
                    <p className="text-white font-medium">{selectedUser.email}</p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">رقم الهاتف</span>
                    </div>
                    <p className="text-white font-medium">{selectedUser.phone}</p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">القسم</span>
                    </div>
                    <p className="text-white font-medium">{selectedUser.department}</p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">تاريخ الانضمام</span>
                    </div>
                    <p className="text-white font-medium">{selectedUser.createdAt}</p>
                  </div>
                </div>

                {/* Statistics */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">الإحصائيات</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <p className="text-emerald-400 text-sm mb-1">المهام المكتملة</p>
                      <p className="text-2xl font-bold text-white">{selectedUser.tasksCompleted}</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                      <p className="text-cyan-400 text-sm mb-1">المهام الجارية</p>
                      <p className="text-2xl font-bold text-white">{selectedUser.tasksInProgress}</p>
                    </div>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <p className="text-orange-400 text-sm mb-1">النتائج المبلغة</p>
                      <p className="text-2xl font-bold text-white">{selectedUser.findingsReported}</p>
                    </div>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm">آخر نشاط</span>
                  </div>
                  <p className="text-white font-medium">آخر تسجيل دخول: {selectedUser.lastLogin}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
              <DialogDescription className="text-slate-400">تحديث معلومات المستخدم في النظام</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-slate-300">
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-300">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-slate-300">
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-slate-300">
                  الدور الوظيفي
                </Label>
                <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدير النظام</SelectItem>
                    <SelectItem value="ia_manager">مدير التدقيق</SelectItem>
                    <SelectItem value="auditor">مدقق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department" className="text-slate-300">
                  القسم
                </Label>
                <Input
                  id="department"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-slate-300">
                  الحالة
                </Label>
                <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialog(false)} className="border-slate-700">
                إلغاء
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
              >
                حفظ التغييرات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Permissions Dialog */}
        <Dialog open={permissionsDialog} onOpenChange={setPermissionsDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إدارة الصلاحيات</DialogTitle>
              <DialogDescription className="text-slate-400">
                تحديد صلاحيات المستخدم {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">{category}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {perms.map((permission) => (
                      <div
                        key={`${category}-${permission.id}`}
                        className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <Checkbox
                          id={permission.id}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                          className="border-slate-600"
                        />
                        <Label htmlFor={permission.id} className="text-slate-300 cursor-pointer flex-1">
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPermissionsDialog(false)} className="border-slate-700">
                إلغاء
              </Button>
              <Button
                onClick={handleSavePermissions}
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
              >
                حفظ الصلاحيات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                تأكيد الحذف
              </DialogTitle>
              <DialogDescription className="text-slate-400">هذا الإجراء لا يمكن التراجع عنه</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-slate-300">
                  هل أنت متأكد من حذف المستخدم <span className="font-bold text-white">{selectedUser?.name}</span>؟
                </p>
                <p className="text-slate-400 text-sm mt-2">سيتم حذف جميع البيانات المرتبطة بهذا المستخدم نهائياً.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialog(false)} className="border-slate-700">
                إلغاء
              </Button>
              <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                <Trash2 className="h-4 w-4 ml-2" />
                تأكيد الحذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
