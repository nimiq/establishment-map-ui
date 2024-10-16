export default defineLazyEventHandler(() => {
  let a = 1
  return defineEventHandler(() => {
    a = a + 1
    return a
  })
})
