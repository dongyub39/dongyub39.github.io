// Cloudflare Worker 배포 후 발급되는 workers.dev URL로 교체하세요.
// (worker/README.md 의 안내를 따라 배포하면 URL이 출력됩니다)
const LOG_ENDPOINT = 'https://dongyub39-visit-logger.YOUR-SUBDOMAIN.workers.dev/hit'

export function logVisit(path: string) {
  if (LOG_ENDPOINT.includes('YOUR-SUBDOMAIN')) return
  const img = new Image()
  img.src = `${LOG_ENDPOINT}?p=${encodeURIComponent(path)}`
}
