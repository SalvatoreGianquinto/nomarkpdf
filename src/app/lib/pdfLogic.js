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

export const generateTextPdf = async (
  text,
  fileName,
  logo,
  companyName,
  companyDetails,
) => {
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" })
  const margin = 20
  let cursorY = margin

  if (logo || companyName || companyDetails) {
    if (logo) {
      try {
        const format = logo.includes("png") ? "PNG" : "JPEG"
        doc.addImage(logo, format, margin, cursorY, 22, 22, undefined, "FAST")
      } catch (err) {
        console.error("Errore nel caricamento del logo:", err)
      }
    }

    if (companyName) {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.setTextColor(30, 41, 59)
      const nameX = logo ? margin + 26 : margin
      doc.text(companyName.toUpperCase(), nameX, cursorY + 7)
    }

    if (companyDetails) {
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8)
      doc.setTextColor(100, 116, 139)
      const detailsLines = doc.splitTextToSize(companyDetails, 70)
      doc.text(detailsLines, 190, cursorY + 5, { align: "right" })
    }

    cursorY += 32

    doc.setDrawColor(241, 245, 249)
    doc.line(margin, cursorY - 5, 190, cursorY - 5)
  }

  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(0, 0, 0)

  const maxLineWidth = 170
  const lines = doc.splitTextToSize(text, maxLineWidth)

  lines.forEach((line) => {
    if (cursorY > 275) {
      doc.addPage()
      cursorY = margin
    }
    doc.text(line, margin, cursorY, { baseline: "top" })
    cursorY += 7
  })

  const finalName = fileName || "Documento_NoMark"
  doc.save(`${finalName}.pdf`)
}
