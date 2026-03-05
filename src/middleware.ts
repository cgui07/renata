import { NextRequest, NextResponse } from "next/server"

function getHost(req: NextRequest) {
  return (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "").toLowerCase()
}

function splitHostPort(host: string) {
  const [hostname, ...rest] = host.split(":")
  const port = rest.length > 0 ? rest.join(":") : ""
  return { hostname, port }
}

function buildAdminHost(host: string) {
  const { hostname, port } = splitHostPort(host)
  if (!hostname) return ""
  if (hostname.startsWith("admin.")) return host
  const adminHostname = `admin.${hostname}`
  return port ? `${adminHostname}:${port}` : adminHostname
}

function stripAdminPrefix(pathname: string) {
  if (pathname === "/admin") return "/"
  if (pathname.startsWith("/admin/")) return pathname.slice("/admin".length)
  return pathname
}

function isIgnoredPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[^/]+$/.test(pathname)
  )
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (isIgnoredPath(pathname)) return NextResponse.next()

  const host = getHost(req)
  const { hostname } = splitHostPort(host)
  const isAdminHost = hostname.startsWith("admin.")
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/")

  function withAdminAreaHeader() {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-admin-area", "1")
    return requestHeaders
  }

  if (!isAdminHost && isAdminPath) {
    const adminHost = buildAdminHost(host)
    if (adminHost && adminHost !== host) {
      const redirectedUrl = req.nextUrl.clone()
      redirectedUrl.host = adminHost
      redirectedUrl.pathname = stripAdminPrefix(pathname)
      redirectedUrl.protocol = req.nextUrl.protocol
      return NextResponse.redirect(redirectedUrl)
    }
  }

  if (isAdminHost && pathname.startsWith("/admin")) {
    const canonicalUrl = req.nextUrl.clone()
    canonicalUrl.pathname = stripAdminPrefix(pathname)
    return NextResponse.redirect(canonicalUrl)
  }

  if (isAdminHost) {
    const internalPath = pathname === "/" ? "/admin" : `/admin${pathname}`
    const publicLoginPath = "/login"
    const internalLoginPath = "/admin/login"

    if (internalPath !== internalLoginPath) {
      const session = req.cookies.get("admin_session")
      if (session?.value !== "authenticated") {
        const loginUrl = req.nextUrl.clone()
        loginUrl.pathname = publicLoginPath
        loginUrl.searchParams.set("from", pathname)
        return NextResponse.redirect(loginUrl)
      }
    }

    const rewriteUrl = req.nextUrl.clone()
    rewriteUrl.pathname = internalPath
    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: withAdminAreaHeader(),
      },
    })
  }

  if (isAdminPath && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("admin_session")
    if (session?.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", req.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (isAdminPath) {
    return NextResponse.next({
      request: {
        headers: withAdminAreaHeader(),
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
