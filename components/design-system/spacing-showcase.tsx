import { designSystem } from "@/lib/design-system"

export function SpacingShowcase() {
  const spacingValues = Object.entries(designSystem.spacing)

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">نظام المسافات</h2>
        <p className="text-muted-foreground mb-6">قيم المسافات المستخدمة في التباعد والهوامش</p>
      </div>

      <div className="space-y-4">
        {spacingValues.map(([name, value]) => (
          <div key={name} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-20 text-sm text-muted-foreground font-mono">{name}</div>
            <div className="w-24 text-sm text-muted-foreground font-mono">{value}</div>
            <div className="flex items-center gap-2">
              <div className="bg-primary" style={{ width: value, height: "2rem" }} />
              <span className="text-sm text-muted-foreground">{value === "0" ? "بدون مسافة" : "مسافة"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
