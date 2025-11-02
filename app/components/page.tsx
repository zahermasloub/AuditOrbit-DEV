import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Mail, Plus, Save, Search, Settings, Trash2 } from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">مكتبة المكونات</h1>
          <p className="text-lg text-muted-foreground">مجموعة شاملة من المكونات القابلة لإعادة الاستخدام</p>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="buttons">الأزرار</TabsTrigger>
            <TabsTrigger value="forms">النماذج</TabsTrigger>
            <TabsTrigger value="cards">البطاقات</TabsTrigger>
            <TabsTrigger value="navigation">التنقل</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-8 pt-6">
            {/* Button Variants */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">أنواع الأزرار</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">زر أساسي</Button>
                <Button variant="secondary">زر ثانوي</Button>
                <Button variant="outline">زر محدد</Button>
                <Button variant="ghost">زر شفاف</Button>
                <Button variant="destructive">زر حذف</Button>
                <Button variant="link">رابط</Button>
              </div>
            </Card>

            {/* Button Sizes */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">أحجام الأزرار</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">صغير</Button>
                <Button size="default">متوسط</Button>
                <Button size="lg">كبير</Button>
              </div>
            </Card>

            {/* Buttons with Icons */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">أزرار مع أيقونات</h2>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Mail />
                  إرسال بريد
                </Button>
                <Button variant="secondary">
                  <Download />
                  تحميل
                </Button>
                <Button variant="outline">
                  <Search />
                  بحث
                </Button>
                <Button variant="destructive">
                  <Trash2 />
                  حذف
                </Button>
              </div>
            </Card>

            {/* Icon Only Buttons */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">أزرار الأيقونات فقط</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="icon-sm" variant="outline">
                  <Plus />
                </Button>
                <Button size="icon" variant="outline">
                  <Settings />
                </Button>
                <Button size="icon-lg" variant="outline">
                  <Save />
                </Button>
              </div>
            </Card>

            {/* Loading State */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">حالة التحميل</h2>
              <div className="flex flex-wrap gap-4">
                <Button loading>جاري التحميل...</Button>
                <Button variant="secondary" loading>
                  جاري الحفظ...
                </Button>
                <Button variant="outline" loading>
                  جاري الإرسال...
                </Button>
              </div>
            </Card>

            {/* Disabled State */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">حالة التعطيل</h2>
              <div className="flex flex-wrap gap-4">
                <Button disabled>زر معطل</Button>
                <Button variant="secondary" disabled>
                  زر معطل
                </Button>
                <Button variant="outline" disabled>
                  زر معطل
                </Button>
              </div>
            </Card>

            {/* Full Width */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">عرض كامل</h2>
              <div className="space-y-4">
                <Button fullWidth>زر بعرض كامل</Button>
                <Button variant="secondary" fullWidth>
                  <Mail />
                  زر بعرض كامل مع أيقونة
                </Button>
                <Button variant="outline" fullWidth loading>
                  زر بعرض كامل مع تحميل
                </Button>
              </div>
            </Card>

            {/* Combined Examples */}
            <Card className="p-6">
              <h2 className="mb-6 text-2xl font-semibold">أمثلة مركبة</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">نموذج تسجيل الدخول</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      إلغاء
                    </Button>
                    <Button className="flex-1">
                      <Mail />
                      تسجيل الدخول
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">شريط الأدوات</h3>
                  <div className="flex gap-2">
                    <Button size="icon-sm" variant="ghost">
                      <Plus />
                    </Button>
                    <Button size="icon-sm" variant="ghost">
                      <Save />
                    </Button>
                    <Button size="icon-sm" variant="ghost">
                      <Download />
                    </Button>
                    <div className="flex-1" />
                    <Button size="icon-sm" variant="ghost">
                      <Settings />
                    </Button>
                    <Button size="icon-sm" variant="ghost">
                      <Trash2 />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">إجراءات البطاقة</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary">
                      عرض التفاصيل
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download />
                      تحميل
                    </Button>
                    <Button size="sm" variant="ghost">
                      مشاركة
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="pt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold">مكونات النماذج</h2>
              <p className="mt-2 text-muted-foreground">قريباً...</p>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="pt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold">مكونات البطاقات</h2>
              <p className="mt-2 text-muted-foreground">قريباً...</p>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="pt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold">مكونات التنقل</h2>
              <p className="mt-2 text-muted-foreground">قريباً...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
