export default {
  html: {
    htmlEncode(html: string) {
      let temp = document.createElement('div')
      temp.textContent !== undefined ? temp.textContent = html : temp.innerText = html
      let output = temp.innerHTML
      temp.remove()
      return output
    },
  },
}
