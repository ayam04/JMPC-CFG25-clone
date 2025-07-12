// utils/pdfGenerator.js
import jsPDF from 'jspdf';

export const generatePdf = (text, title, language) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text(title, 10, 10);

  // Add language information
  doc.setFontSize(12);
  doc.text(`Language: ${language}`, 10, 20);

  // Add transcript text
  doc.setFontSize(10);
  const textLines = doc.splitTextToSize(text, 180); // Adjust width as needed
  doc.text(textLines, 10, 30);

  // Save the PDF
  doc.save(`${title}_transcript_${language}.pdf`);
};