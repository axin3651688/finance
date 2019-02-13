export function SET_FULLSCREEN_LOADING (val) {
  if (val === undefined) return false
  try {
    if (localStorage.fullscreenLoading) {
      localStorage.fullscreenLoading = val
    } else {
      localStorage.setItem('fullscreenLoading', val)
    }
  } catch (e) {
    console.log(e)
  }
}

