import React from 'react'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function PDFViewer() {
  return (
    <div className='pdf__container'>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
            {}
        </Worker>
    </div>
  )
}