import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Users,
  Settings,
  BarChart3,
  Calendar,
  AlertCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">AuditOrbit</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/design-system">نظام التصميم</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/components">المكونات</Link>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
          <p className="text-muted-foreground">نظرة عامة على عمليات التدقيق والمهام</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">عمليات التدقيق النشطة</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+2</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">التقارير المعلقة</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3 text-orange-500" />
                <span className="text-orange-500">3</span> تحتاج مراجعة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">المهام المكتملة</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-muted-foreground">من أصل 60 مهمة</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">أعضاء الفريق</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-green-500">18</span> نشط الآن
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="audits">عمليات التدقيق</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="tasks">المهام</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>عمليات التدقيق الأخيرة</CardTitle>
                  <CardDescription>آخر 5 عمليات تدقيق تم تحديثها</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "تدقيق الأمن السيبراني Q1", status: "قيد التنفيذ", progress: 75 },
                      { name: "مراجعة العمليات المالية", status: "مكتمل", progress: 100 },
                      { name: "تدقيق الامتثال التنظيمي", status: "قيد التنفيذ", progress: 45 },
                      { name: "مراجعة إدارة المخاطر", status: "معلق", progress: 20 },
                      { name: "تدقيق الموارد البشرية", status: "قيد التنفيذ", progress: 60 },
                    ].map((audit, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{audit.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{audit.status}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{audit.progress}%</span>
                          <Button size="sm" variant="ghost">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المهام القادمة</CardTitle>
                  <CardDescription>المهام المجدولة لهذا الأسبوع</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { task: "مراجعة تقرير الأمن السيبراني", date: "اليوم", priority: "عالية" },
                      { task: "اجتماع فريق التدقيق", date: "غداً", priority: "متوسطة" },
                      { task: "تحديث قوائم المراجعة", date: "الأربعاء", priority: "منخفضة" },
                      { task: "إعداد تقرير ربع سنوي", date: "الخميس", priority: "عالية" },
                      { task: "مراجعة الوثائق", date: "الجمعة", priority: "متوسطة" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.task}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.priority === "عالية"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                              : item.priority === "متوسطة"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                                : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audits">
            <Card>
              <CardHeader>
                <CardTitle>جميع عمليات التدقيق</CardTitle>
                <CardDescription>إدارة ومتابعة عمليات التدقيق</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">سيتم عرض قائمة عمليات التدقيق هنا</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>التقارير</CardTitle>
                <CardDescription>عرض وإدارة التقارير</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">سيتم عرض قائمة التقارير هنا</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>المهام</CardTitle>
                <CardDescription>إدارة المهام والتكليفات</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">سيتم عرض قائمة المهام هنا</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
