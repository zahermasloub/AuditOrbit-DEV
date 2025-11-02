import { designSystem } from "@/lib/design-system"

export function ColorPalette() {
  const colorScales = Object.entries(designSystem.colors)

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">نظام الألوان</h2>
        <p className="text-muted-foreground mb-6">مجموعة الألوان المستخدمة في منصة AuditOrbit</p>
      </div>

      <div className="grid gap-8">
        {colorScales.map(([name, scale]) => (
          <div key={name}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {typeof scale === "string" ? (
                <div className="space-y-1">
                  <div className="h-20 rounded-lg border shadow-sm" style={{ backgroundColor: scale }} />
                  <p className="text-xs text-center font-mono">{scale}</p>
                </div>
              ) : (
                Object.entries(scale).map(([shade, color]) => (
                  <div key={shade} className="space-y-1">
                    <div className="h-20 rounded-lg border shadow-sm" style={{ backgroundColor: color }} />
                    <p className="text-xs text-center font-medium">{shade}</p>
                    <p className="text-xs text-center font-mono text-muted-foreground">{color}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
