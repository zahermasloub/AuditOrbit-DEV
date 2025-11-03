# دليل تثبيت بوابة العمليات الموحدة (Ops Console)

## نظرة عامة

بوابة العمليات الموحدة هي واجهة شاملة لمراقبة وإدارة جميع خدمات البنية التحتية من مكان واحد.

## المتطلبات

- Next.js 14 أو أحدث
- React 18 أو أحدث
- TypeScript
- Tailwind CSS
- lucide-react للأيقونات

## خطوات التثبيت

### 1. إضافة الصفحات

انسخ الملفات التالية إلى مشروعك:

\`\`\`
app/
  ops/
    layout.tsx          # التخطيط الرئيسي
    page.tsx           # نظرة عامة
    api/
      page.tsx         # مستكشف API
    storage/
      page.tsx         # إدارة التخزين
    ai/
      page.tsx         # مهام AI
    settings/
      page.tsx         # الإعدادات
    logs/
      page.tsx         # السجلات
\`\`\`

### 2. تحديث next.config.mjs

أضف rewrites لتمرير الطلبات إلى الخدمات الخلفية:

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // تمرير API
      {
        source: '/ops/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
      // تمرير MinIO API
      {
        source: '/ops/minio/:path*',
        destination: 'http://localhost:9000/:path*',
      },
      // تمرير MinIO Console
      {
        source: '/ops/minio-console/:path*',
        destination: 'http://localhost:9001/:path*',
      },
    ]
  },
}

export default nextConfig
\`\`\`

### 3. متغيرات البيئة

أضف المتغيرات التالية إلى ملف `.env`:

\`\`\`env
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_OPS_BASE=/ops
S3_ENDPOINT=http://localhost:9000
\`\`\`

### 4. تثبيت الحزم المطلوبة

\`\`\`bash
npm install lucide-react
# أو
yarn add lucide-react
# أو
pnpm add lucide-react
\`\`\`

### 5. إضافة Endpoints في الـ API (FastAPI)

أنشئ ملف `api/app/presentation/routers/ops.py`:

\`\`\`python
from datetime import datetime
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
import json
import asyncio

router = APIRouter()

# قناة بسيطة للأحداث (SSE)
_subscribers: list[asyncio.Queue] = []

async def _broadcast(event: dict):
    for q in list(_subscribers):
        await q.put(event)

@router.get("/ops/healthz-aggregate")
async def health_aggregate():
    # تحقق من صحة جميع الخدمات
    return {
        'status': 'ok',
        'details': {
            'db': 'ok',
            'redis': 'ok',
            'minio': 'ok',
            'ai_worker': 'ok'
        }
    }

@router.get('/ops/events')
async def sse_events(request: Request):
    queue: asyncio.Queue = asyncio.Queue()
    _subscribers.append(queue)

    async def event_gen():
        try:
            while True:
                if await request.is_disconnected():
                    break
                try:
                    event = await asyncio.wait_for(queue.get(), timeout=15)
                    yield f"data: {json.dumps(event)}\n\n"
                except asyncio.TimeoutError:
                    yield ": keep-alive\n\n"
        finally:
            _subscribers.remove(queue)

    return StreamingResponse(event_gen(), media_type='text/event-stream')

@router.post('/ops/minio/webhook')
async def minio_webhook(payload: dict):
    event = {
        'type': 'file_event',
        'ts': datetime.utcnow().isoformat(),
        'payload': payload,
    }
    await _broadcast(event)
    return {'ok': True}

@router.post('/ops/ai/webhook')
async def ai_webhook(payload: dict):
    event = {
        'type': 'ai_job_event',
        'ts': datetime.utcnow().isoformat(),
        'payload': payload,
    }
    await _broadcast(event)
    return {'ok': True}
\`\`\`

ثم سجّل الراوتر في `api/app/presentation/main.py`:

\`\`\`python
from .routers import ops
app.include_router(ops.router, prefix="/", tags=["ops"])
\`\`\`

## الوصول إلى البوابة

بعد التثبيت، يمكنك الوصول إلى بوابة العمليات عبر:

\`\`\`
http://localhost:3000/ops
\`\`\`

## الميزات

### 1. نظرة عامة (Overview)
- مراقبة حالة جميع الخدمات
- مقاييس النظام (CPU, Memory, Storage)
- الأحداث اللحظية عبر SSE

### 2. مستكشف API
- Swagger UI
- ReDoc
- تجربة Endpoints مباشرة

### 3. إدارة التخزين (MinIO)
- واجهة MinIO Console مدمجة
- إحصائيات التخزين
- إدارة الملفات والـ Buckets

### 4. مهام AI
- مراقبة قائمة المهام
- تتبع التقدم في الوقت الفعلي
- الأحداث اللحظية للمهام

### 5. الإعدادات
- عرض إعدادات النظام
- متغيرات البيئة
- معلومات الخدمات

### 6. السجلات والتنبيهات
- عرض السجلات الحديثة
- فلترة حسب المستوى
- تنبيهات الأخطاء والتحذيرات

## الأمان

- حماية مسار `/ops/*` للمشرفين فقط
- استخدام CORS المناسب
- عدم عرض المفاتيح السرية في الواجهة
- تسجيل جميع عمليات الإدارة

## الدعم

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير.

---

**ملاحظة:** هذا التصميم مختلف تماماً عن تصميم المشروع الأصلي ويستخدم نظام ألوان Emerald/Teal بدلاً من Indigo/Cyan.
