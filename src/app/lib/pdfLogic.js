import { jsPDF } from "jspdf"

const getImageDimensions = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ img, w: img.width, h: img.height })
    img.src = src
  })
}

export const generateImagePdf = async (images, fileName = "NoMarkScan") => {
  if (images.length === 0) return alert("Carica almeno un'immagine!")

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  const imagesData = await Promise.all(
    images.map((img) => getImageDimensions(img.preview)),
  )

  imagesData.forEach((data, index) => {
    if (index > 0) doc.addPage()

    const { img, w, h } = data
    const ratio = w / h

    let printWidth = pageWidth
    let printHeight = pageWidth / ratio

    if (printHeight > pageHeight) {
      printHeight = pageHeight
      printWidth = pageHeight * ratio
    }

    const xMargin = (pageWidth - printWidth) / 2
    const yMargin = (pageHeight - printHeight) / 2

    doc.addImage(
      img,
      "JPEG",
      xMargin,
      yMargin,
      printWidth,
      printHeight,
      undefined,
      "FAST",
    )
  })

  const safeName = fileName.trim() || "NoMarkScan"
  doc.save(safeName.endsWith(".pdf") ? safeName : `${safeName}.pdf`)
}
