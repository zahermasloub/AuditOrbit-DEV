import { designSystem } from "@/lib/design-system"

export function TypographyShowcase() {
  const fontSizes = Object.entries(designSystem.typography.fontSize)
  const fontWeights = Object.entries(designSystem.typography.fontWeight)

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">نظام الطباعة</h2>
        <p className="text-muted-foreground mb-6">أحجام وأوزان الخطوط المستخدمة في المنصة</p>
      </div>

      {/* Font Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">أحجام الخطوط</h3>
        <div className="space-y-4">
          {fontSizes.map(([name, size]) => (
            <div key={name} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-20 text-sm text-muted-foreground font-mono">{name}</div>
              <div className="w-24 text-sm text-muted-foreground font-mono">{size}</div>
              <div style={{ fontSize: size }}>نموذج نص عربي - Sample English Text</div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 className="text-lg font-semibold mb-4">أوزان الخطوط</h3>
        <div className="space-y-4">
          {fontWeights.map(([name, weight]) => (
            <div key={name} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-32 text-sm text-muted-foreground font-mono">
                {name} ({weight})
              </div>
              <div style={{ fontWeight: weight }} className="text-lg">
                نموذج نص عربي - Sample English Text
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Heights */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ارتفاع الأسطر</h3>
        <div className="space-y-4">
          {Object.entries(designSystem.typography.lineHeight).map(([name, height]) => (
            <div key={name} className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground font-mono mb-2">
                {name} ({height})
              </div>
              <p style={{ lineHeight: height }}>
                هذا نص تجريبي لعرض ارتفاع الأسطر في النظام. يمكن استخدام هذا النص لفهم كيفية ظهور النصوص الطويلة مع
                ارتفاعات مختلفة للأسطر. This is a sample text to demonstrate line height in the system.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
