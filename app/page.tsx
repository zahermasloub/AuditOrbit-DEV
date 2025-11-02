import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, FileText, CheckSquare, Users, Settings, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">AuditOrbit</h1>
            </div>
            <Button asChild>
              <Link href="/dashboard">الدخول إلى لوحة التحكم</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">نظام إدارة التدقيق الداخلي</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            منصة متكاملة لإدارة عمليات التدقيق الداخلي بكفاءة واحترافية عالية
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/dashboard">ابدأ الآن</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/design-system">نظام التصميم</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <LayoutDashboard className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>لوحة تحكم شاملة</CardTitle>
              <CardDescription>عرض شامل لجميع عمليات التدقيق والمهام والتقارير في مكان واحد</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>إدارة التقارير</CardTitle>
              <CardDescription>إنشاء وإدارة تقارير التدقيق بسهولة مع قوالب جاهزة ومخصصة</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckSquare className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>قوائم المراجعة</CardTitle>
              <CardDescription>قوائم مراجعة تفاعلية لضمان اكتمال جميع خطوات التدقيق</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>إدارة الفريق</CardTitle>
              <CardDescription>تعيين المهام وتتبع تقدم أعضاء الفريق في عمليات التدقيق</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>التحليلات والإحصائيات</CardTitle>
              <CardDescription>رؤى تحليلية شاملة لأداء عمليات التدقيق والنتائج</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Settings className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>إعدادات مرنة</CardTitle>
              <CardDescription>تخصيص النظام ليناسب احتياجات مؤسستك الخاصة</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 AuditOrbit. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
