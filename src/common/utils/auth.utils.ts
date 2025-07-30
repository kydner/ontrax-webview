import { useAuthenticationStore } from 'src/stores/authentication.store'

export function getidleTime(): number {
  const authStore = useAuthenticationStore()
  const idle = authStore.$state.idle
  return idle
}

/** default value accessTokenExpired as minutes  */
export function getTokenExpired() {
  const authStore = useAuthenticationStore()
  const accessTokenExpired = authStore.$state.accessTokenExpired ?? 0
  return accessTokenExpired
}

/** get return boolean if idle large than accessTokenExpired */
export function isIdle() {
  const accessTokenExpired = getTokenExpired()
  return idleTime() >= accessTokenExpired
}

/** get idle time (seconds) */
export function idleTime() {
  const idleTime = getidleTime()
  return Math.floor(now() - idleTime)
}

/** check idle, if idle equals true then set idle */
export function refreshidleTime() {
  isIdle() || setIdleTime()
}

/** set as seconds */
export function setIdleTime() {
  const authStore = useAuthenticationStore()
  authStore.$state.idle = now()
}

/** get current time by seconds */
export function now() {
  return new Date().getTime() / 1000
}
