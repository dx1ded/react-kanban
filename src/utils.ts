export const getEmptyImage = (): HTMLImageElement => {
  const image = new Image()
  image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
  return image
}
