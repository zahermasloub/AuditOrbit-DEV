import { designSystem } from "@/lib/design-system"

export function ShadowShowcase() {
  const shadowValues = Object.entries(designSystem.shadows)

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">نظام الظلال</h2>
        <p className="text-muted-foreground mb-6">مستويات الظلال المستخدمة لإضافة العمق والبعد</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shadowValues.map(([name, value]) => (
          <div key={name} className="space-y-2">
            <div className="text-sm font-medium">{name}</div>
            <div className="h-32 bg-card rounded-lg flex items-center justify-center" style={{ boxShadow: value }}>
              <span className="text-muted-foreground">مثال على الظل</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono break-all">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
