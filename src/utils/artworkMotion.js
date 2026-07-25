export function moveArtwork(event) {
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
  event.currentTarget.style.setProperty('--artwork-x', x.toFixed(3))
  event.currentTarget.style.setProperty('--artwork-y', y.toFixed(3))
}

export function resetArtwork(event) {
  event.currentTarget.style.setProperty('--artwork-x', 0)
  event.currentTarget.style.setProperty('--artwork-y', 0)
}
