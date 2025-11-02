import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPalette } from "@/components/design-system/color-palette"
import { TypographyShowcase } from "@/components/design-system/typography-showcase"
import { SpacingShowcase } from "@/components/design-system/spacing-showcase"
import { ShadowShowcase } from "@/components/design-system/shadow-showcase"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">نظام التصميم</h1>
          <p className="text-lg text-muted-foreground">دليل شامل لنظام التصميم الخاص بمنصة AuditOrbit</p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="colors">الألوان</TabsTrigger>
            <TabsTrigger value="typography">الطباعة</TabsTrigger>
            <TabsTrigger value="spacing">المسافات</TabsTrigger>
            <TabsTrigger value="shadows">الظلال</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-6">
            <div className="border rounded-lg bg-card">
              <ColorPalette />
            </div>
          </TabsContent>

          <TabsContent value="typography" className="mt-6">
            <div className="border rounded-lg bg-card">
              <TypographyShowcase />
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="mt-6">
            <div className="border rounded-lg bg-card">
              <SpacingShowcase />
            </div>
          </TabsContent>

          <TabsContent value="shadows" className="mt-6">
            <div className="border rounded-lg bg-card">
              <ShadowShowcase />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
