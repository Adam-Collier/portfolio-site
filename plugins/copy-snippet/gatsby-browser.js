/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
// You can delete this file if you're not using it

exports.onClientEntry = () => {
  window.copyToClipboard = (buttontext, str) => {
    const el = document.createElement("textarea")
    el.className = "gatsby-code-button-buffer"
    el.innerHTML = str
    document.body.appendChild(el)

    buttontext.textContent = "Copied to clipboard!"
    buttontext.disabled = true

    setTimeout(() => {
      buttontext.textContent = "Copy"
      buttontext.disabled = false
    }, 2000)

    const range = document.createRange()
    range.selectNode(el)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)

    document.execCommand(`copy`)
    document.activeElement.blur()

    setTimeout(() => {
      document.getSelection().removeAllRanges()
      document.body.removeChild(el)
    }, 100)
  }
}
