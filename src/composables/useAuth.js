import { ref } from 'vue'

/**
 * ============================================================================
 *  ACCESS GATE CONFIGURATION
 * ============================================================================
 *  CHANGE THE PASSWORD HERE to control who can access the site.
 *
 *  ⚠️ IMPORTANT: This is a CLIENT-SIDE gate. The password ships inside the
 *  built site, so a determined person could inspect the source and find it.
 *  This is a quick/free way to block casual visitors only.
 *  For real "organization-only" security, use Vercel Authentication (Pro).
 * ============================================================================
 */
const ACCESS_PASSWORD = 'bt-docs-2026'

// Cookie name + how long the session lasts (in days)
const AUTH_COOKIE = 'bt_docs_auth'
const SESSION_DAYS = 7

function getCookie(name) {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function setCookie(name, value, days) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`
}

function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}

// Is the user already authenticated (persisted across reloads)?
const isAuthenticated = ref(getCookie(AUTH_COOKIE) === 'true')

export function useAuth() {
  function login(password) {
    if (password === ACCESS_PASSWORD) {
      isAuthenticated.value = true
      setCookie(AUTH_COOKIE, 'true', SESSION_DAYS)
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    clearCookie(AUTH_COOKIE)
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
}