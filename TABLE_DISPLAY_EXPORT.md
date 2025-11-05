# تصدير تعديلات عرض الجداول - AuditOrbit

## ملخص التعديلات

تم تحويل طريقة عرض الخطط السنوية والمهام التدقيقية من نظام البطاقات (Cards) إلى جداول منظمة ومنسقة مع الحفاظ على جميع المعلومات المعروضة.

### التعديلات الرئيسية:

1. **الخطط السنوية (Annual Plans)**
   - تحويل العرض من بطاقات إلى جدول HTML منظم
   - عرض 9 أعمدة: العنوان، السنة، الفترة، الحالة، المهام، الساعات، التقدم، الإدارات، الإجراءات
   - الحفاظ على جميع المعلومات الموجودة في البطاقات

2. **المهام التدقيقية (Engagements)**
   - تحويل العرض من بطاقات إلى جدول HTML منظم
   - عرض 9 أعمدة: المهمة، الإدارة، الحالة، الأولوية، الفترة، الفريق، الساعات، التقدم، الإجراءات
   - الحفاظ على جميع المعلومات والشارات (Badges)

---

## الكود الكامل

### 1. ملف: `components/annual-plans-section.tsx`

#### التعديل على قسم عرض الخطط (استبدال القسم بالكامل)

**الموقع:** ابحث عن التعليق `{/* Plans List */}` واستبدل القسم بالكود التالي:

\`\`\`tsx
      {/* Plans Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">العنوان</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">السنة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الفترة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الحالة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">المهام</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الساعات</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">التقدم</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الإدارات</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{plan.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{plan.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{plan.year}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-300">{plan.startDate}</p>
                      <p className="text-slate-400">إلى</p>
                      <p className="text-slate-300">{plan.endDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(plan.status)}>{getStatusLabel(plan.status)}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <p className="text-white font-semibold">
                        {plan.completedEngagements} / {plan.totalEngagements}
                      </p>
                      <p className="text-xs text-slate-400">مكتمل / إجمالي</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <p className="text-white font-semibold">
                        {plan.actualHours} / {plan.riskBasedHours}
                      </p>
                      <p className="text-xs text-slate-400">فعلي / مخطط</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2 min-w-32">
                      <Progress value={(plan.completedEngagements / plan.totalEngagements) * 100} className="h-2" />
                      <p className="text-sm text-center text-white font-medium">
                        {Math.round((plan.completedEngagements / plan.totalEngagements) * 100)}%
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-48">
                      {plan.departments.slice(0, 3).map((dept, idx) => (
                        <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {dept}
                        </Badge>
                      ))}
                      {plan.departments.length > 3 && (
                        <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          +{plan.departments.length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPlan(plan)
                          setShowViewDialog(true)
                        }}
                        className="text-slate-400 hover:text-white h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
\`\`\`

---

### 2. ملف: `components/engagements-section.tsx`

#### التعديل على قسم عرض المهام (استبدال القسم بالكامل)

**الموقع:** ابحث عن التعليق `{/* Engagements List */}` واستبدل القسم بالكود التالي:

\`\`\`tsx
      {/* Engagements Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">المهمة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الإدارة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الحالة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الأولوية</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الفترة</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الفريق</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">الساعات</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">التقدم</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {engagements.map((engagement) => (
                <tr key={engagement.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{engagement.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{engagement.description}</p>
                      {engagement.annualPlanTitle && (
                        <Badge
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 text-xs mt-2"
                        >
                          <Calendar className="h-3 w-3 ml-1" />
                          {engagement.annualPlanTitle}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      <span className="text-white">{engagement.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(engagement.status)}>{getStatusLabel(engagement.status)}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={getPriorityColor(engagement.priority)}
                      className={
                        engagement.priority === "high"
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : engagement.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : ""
                      }
                    >
                      {getPriorityLabel(engagement.priority)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-300">{engagement.startDate}</p>
                      <p className="text-slate-400">إلى</p>
                      <p className="text-slate-300">{engagement.endDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-white">{engagement.assignedAuditors.length}</span>
                      <span className="text-slate-400 text-sm">مدقق</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <p className="text-white font-semibold">
                        {engagement.actualHours} / {engagement.estimatedHours}
                      </p>
                      <p className="text-xs text-slate-400">فعلي / مقدر</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2 min-w-32">
                      <Progress value={engagement.progress} className="h-2" />
                      <p className="text-sm text-center text-white font-medium">{engagement.progress}%</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedEngagement(engagement)
                          setShowViewDialog(true)
                        }}
                        className="text-slate-400 hover:text-white h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
\`\`\`

---

## خطوات التطبيق

### 1. تحديث ملف الخطط السنوية

1. افتح ملف `components/annual-plans-section.tsx`
2. ابحث عن القسم الذي يبدأ بـ `{/* Plans List */}` أو `<div className="space-y-4">`
3. استبدل كامل قسم عرض البطاقات بكود الجدول أعلاه
4. احفظ الملف

### 2. تحديث ملف المهام التدقيقية

1. افتح ملف `components/engagements-section.tsx`
2. ابحث عن القسم الذي يبدأ بـ `{/* Engagements List */}` أو `<div className="space-y-4">`
3. استبدل كامل قسم عرض البطاقات بكود الجدول أعلاه
4. احفظ الملف

### 3. التحقق من التطبيق

- تأكد من عرض الجداول بشكل صحيح
- تحقق من استجابة الجداول على الشاشات المختلفة
- تأكد من عمل جميع الأزرار (عرض، تعديل، حذف)
- تحقق من عرض جميع المعلومات بشكل صحيح

---

## الميزات الرئيسية للجداول

### جدول الخطط السنوية:
- ✅ عرض العنوان والوصف
- ✅ عرض السنة المالية
- ✅ عرض فترة الخطة (من - إلى)
- ✅ عرض حالة الخطة مع ألوان مميزة
- ✅ عرض المهام (مكتمل / إجمالي)
- ✅ عرض الساعات (فعلي / مخطط)
- ✅ شريط تقدم مع نسبة مئوية
- ✅ عرض الإدارات المستهدفة (أول 3 + عداد)
- ✅ أزرار الإجراءات (عرض، تعديل، حذف)
- ✅ تأثير hover على الصفوف
- ✅ تمرير أفقي للشاشات الصغيرة

### جدول المهام التدقيقية:
- ✅ عرض اسم المهمة والهدف
- ✅ عرض الخطة السنوية المرتبطة
- ✅ عرض الإدارة مع أيقونة
- ✅ عرض الحالة مع ألوان مميزة
- ✅ عرض الأولوية مع ألوان مميزة
- ✅ عرض فترة المهمة (من - إلى)
- ✅ عرض عدد أعضاء الفريق
- ✅ عرض الساعات (فعلي / مقدر)
- ✅ شريط تقدم مع نسبة مئوية
- ✅ أزرار الإجراءات (عرض، تعديل، حذف)
- ✅ تأثير hover على الصفوف
- ✅ تمرير أفقي للشاشات الصغيرة

---

## التصميم والألوان

### نظام الألوان المستخدم:
- **الخلفية الرئيسية:** `bg-slate-900`
- **الحدود:** `border-slate-800`
- **رأس الجدول:** `bg-slate-800`
- **النص الرئيسي:** `text-white`
- **النص الثانوي:** `text-slate-400`
- **Hover:** `hover:bg-slate-800/50`

### الشارات (Badges):
- **الحالة:** ألوان مخصصة لكل حالة (مسودة، معتمد، قيد التنفيذ، مكتمل)
- **الأولوية:** ألوان مخصصة (حرج، عالي، متوسط، منخفض)
- **الإدارات:** `border-slate-600 text-slate-300`

---

## ملاحظات مهمة

1. **الاستجابة (Responsive):**
   - الجداول تستخدم `overflow-x-auto` للتمرير الأفقي على الشاشات الصغيرة
   - يمكن إضافة breakpoints إضافية حسب الحاجة

2. **الأداء:**
   - الجداول تعرض جميع البيانات مباشرة
   - يمكن إضافة pagination للقوائم الطويلة

3. **التوافق:**
   - الكود متوافق مع Next.js 15
   - يستخدم مكونات shadcn/ui الموجودة
   - يحافظ على نفس نظام الألوان والتصميم

4. **التطوير المستقبلي:**
   - يمكن إضافة فرز الأعمدة (sorting)
   - يمكن إضافة تصفية (filtering)
   - يمكن إضافة بحث (search)
   - يمكن إضافة تصدير إلى Excel/PDF

---

## قائمة التحقق

- [ ] تم تحديث ملف `components/annual-plans-section.tsx`
- [ ] تم تحديث ملف `components/engagements-section.tsx`
- [ ] تم اختبار عرض الجداول
- [ ] تم التحقق من عمل جميع الأزرار
- [ ] تم التحقق من الاستجابة على الشاشات المختلفة
- [ ] تم التحقق من عرض جميع البيانات بشكل صحيح
- [ ] تم التحقق من الألوان والتنسيق

---

## الدعم

إذا واجهت أي مشاكل أو كان لديك أسئلة:
1. تحقق من أن جميع المكونات المطلوبة موجودة (Button, Badge, Progress, etc.)
2. تأكد من أن الأنماط (Tailwind CSS) تعمل بشكل صحيح
3. تحقق من console للأخطاء

---

**تاريخ الإنشاء:** 2025-01-05  
**الإصدار:** 1.0  
**الحالة:** جاهز للتطبيق
