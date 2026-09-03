// 1x1 transparent GIF used as a tracking pixel.
const PIXEL = Uint8Array.from(
  atob('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='),
  (c) => c.charCodeAt(0)
)

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]))
}

async function handleHit(request, env) {
  const url = new URL(request.url)
  const cf = request.cf || {}

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const country = cf.country || 'unknown'
  const city = cf.city || ''
  const path = url.searchParams.get('p') || '/'
  const referer = request.headers.get('Referer') || ''
  const userAgent = request.headers.get('User-Agent') || ''
  const ts = new Date().toISOString()

  try {
    await env.DB.prepare(
      'INSERT INTO visits (ts, ip, country, city, path, referer, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(ts, ip, country, city, path, referer, userAgent).run()
  } catch (err) {
    // Never break the pixel response even if the DB write fails.
  }

  return new Response(PIXEL, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

async function handleStats(request, env) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (!env.STATS_TOKEN || token !== env.STATS_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  const totalRow = await env.DB.prepare('SELECT COUNT(*) as c FROM visits').first()
  const byCountry = await env.DB.prepare(
    'SELECT country, COUNT(*) as count FROM visits GROUP BY country ORDER BY count DESC'
  ).all()
  const recent = await env.DB.prepare(
    'SELECT ts, ip, country, city, path FROM visits ORDER BY ts DESC LIMIT 100'
  ).all()

  if (url.searchParams.get('format') === 'json') {
    return Response.json({
      total: totalRow.c,
      byCountry: byCountry.results,
      recent: recent.results,
    })
  }

  const countryRows = byCountry.results
    .map((r) => `<tr><td>${escapeHtml(r.country)}</td><td>${r.count}</td></tr>`)
    .join('')
  const recentRows = recent.results
    .map(
      (r) =>
        `<tr><td>${escapeHtml(r.ts)}</td><td>${escapeHtml(r.ip)}</td><td>${escapeHtml(r.country)}</td><td>${escapeHtml(r.city || '')}</td><td>${escapeHtml(r.path)}</td></tr>`
    )
    .join('')

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Visit Stats</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; background: #0b0b0f; color: #eee; }
  h1, h2 { font-weight: 600; }
  table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
  th, td { border: 1px solid #333; padding: 6px 10px; text-align: left; font-size: 14px; }
  th { background: #1a1a22; }
</style>
</head>
<body>
  <h1>Total visits: ${totalRow.c}</h1>
  <h2>By country</h2>
  <table><tr><th>Country</th><th>Count</th></tr>${countryRows}</table>
  <h2>Recent 100</h2>
  <table><tr><th>Time (UTC)</th><th>IP</th><th>Country</th><th>City</th><th>Path</th></tr>${recentRows}</table>
</body>
</html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'GET' && url.pathname === '/hit') {
      return handleHit(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/stats') {
      return handleStats(request, env)
    }

    return new Response('Not found', { status: 404 })
  },
}
