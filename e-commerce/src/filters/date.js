export default function (timestamp) {
  const date = new Date(timestamp * 1000).toLocaleDateString()
  return date
}
