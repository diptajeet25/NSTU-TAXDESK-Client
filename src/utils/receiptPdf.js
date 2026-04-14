import logo from '../assets/nstu-logo.png';

/* =========================
   FORMAT HELPERS
========================= */
const formatAmount = (amount) => {
  const value = Number(amount || 0);
  return `BDT ${value.toLocaleString('en-BD', {
    minimumFractionDigits: 2,
  })}`;
};

const formatDateTime = (paidAt) => {
  if (!paidAt) return { date: 'N/A', time: 'N/A' };

  const d = new Date(paidAt);

  return {
    date: d.toLocaleDateString('en-GB'),
    time: d.toLocaleTimeString('en-BD', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

/* =========================
   COLORS (MATCHED UI)
========================= */
const colors = {
  navy: [15, 23, 42],
  slate: [71, 85, 105],
  muted: [100, 116, 139],

  border: [226, 232, 240],
  line: [226, 232, 240],

  cardBg: [248, 250, 252], // soft gray
  white: [255, 255, 255],

  chipBg: [220, 252, 231],
  chipText: [22, 163, 74],
};

/* =========================
   DRAW CARD (SOFT STYLE)
========================= */
const drawCard = (pdf, x, y, w, h, fill = colors.cardBg) => {
  pdf.setDrawColor(...colors.border);
  pdf.setLineWidth(0.3);
  pdf.setFillColor(...fill);
  pdf.roundedRect(x, y, w, h, 3, 3, 'FD');
};

/* =========================
   MAIN FUNCTION
========================= */
export const buildReceiptPdf = (pdf, { id, user, receiptData }) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 16;
  const leftX = margin;
  const rightX = pageWidth - margin;
  const contentWidth = pageWidth - margin * 2;

  const { date, time } = formatDateTime(receiptData?.paidAt);

  /* ===== HEADER ===== */
  const headerY = margin + 10;

  pdf.addImage(logo, 'PNG', leftX, headerY, 16, 16);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(...colors.navy);
  pdf.text('NSTU TaxDesk', leftX + 22, headerY + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(...colors.slate);
  pdf.text(
    'National Board of Revenue Compliant Tax and VAT Payment System',
    leftX + 22,
    headerY + 12
  );

  pdf.setFontSize(9);
  pdf.text('OFFICIAL RECEIPT', rightX, headerY + 4, { align: 'right' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(...colors.navy);
  pdf.text(`#${id}`, rightX, headerY + 11, { align: 'right' });

  // STATUS CHIP
  const status = 'PAYMENT COMPLETED';
  const chipWidth = pdf.getTextWidth(status) + 10;

  pdf.setFillColor(...colors.chipBg);
  pdf.roundedRect(rightX - chipWidth, headerY + 15, chipWidth, 7, 3, 3, 'F');

  pdf.setFontSize(8);
  pdf.setTextColor(...colors.chipText);
  pdf.text(status, rightX - chipWidth / 2, headerY + 19.5, {
    align: 'center',
  });

  // divider
  pdf.setDrawColor(...colors.line);
  pdf.line(leftX, headerY + 28, rightX, headerY + 28);

  /* ===== TOP CARDS ===== */
  let y = headerY + 36;

  const gap = 8;
  const cardW = (contentWidth - gap) / 2;

  drawCard(pdf, leftX, y, cardW, 34);
  drawCard(pdf, leftX + cardW + gap, y, cardW, 34);

  pdf.setFontSize(8);
  pdf.setTextColor(...colors.muted);
  pdf.text('BILLED TO', leftX + 4, y + 6);
  pdf.text('TRANSACTION INFO', leftX + cardW + gap + 4, y + 6);

  pdf.setFontSize(11);
  pdf.setTextColor(...colors.navy);
  pdf.text(user?.displayName || 'N/A', leftX + 4, y + 14);

  pdf.setFontSize(9);
  pdf.setTextColor(...colors.slate);
  pdf.text(user?.email || '', leftX + 4, y + 20);

  pdf.text(`Date: ${date}`, leftX + cardW + gap + 4, y + 14);
  pdf.text(`Time: ${time}`, leftX + cardW + gap + 4, y + 20);
  pdf.text(`Method: ${receiptData?.method || ''}`, leftX + cardW + gap + 4, y + 26);

  /* ===== PAYMENT DETAILS ===== */
  y += 44;

  drawCard(pdf, leftX, y, contentWidth, 100, colors.white);

  pdf.setFontSize(10);
  pdf.setTextColor(...colors.navy);
  pdf.text('PAYMENT DETAILS', leftX + 6, y + 8);

  pdf.line(leftX, y + 12, rightX, y + 12);

  const col1 = leftX + 6;
  const col2 = rightX - 40;
  const col3 = rightX - 6;

  pdf.setFontSize(8);
  pdf.setTextColor(...colors.muted);
  pdf.text('ITEM', col1, y + 20);
  pdf.text('TYPE', col2, y + 20, { align: 'right' });
  pdf.text('AMOUNT', col3, y + 20, { align: 'right' });

  pdf.line(leftX + 6, y + 23, rightX - 6, y + 23);

  pdf.setFontSize(10);
  pdf.setTextColor(...colors.navy);
  pdf.text(receiptData?.name || '', col1, y + 32);

  pdf.setFontSize(9);
  pdf.setTextColor(...colors.slate);
  pdf.text(receiptData?.category || '', col2, y + 32, { align: 'right' });

  pdf.setTextColor(...colors.navy);
  pdf.text(formatAmount(receiptData?.baseAmount), col3, y + 32, {
    align: 'right',
  });

  /* ===== SUMMARY ===== */
  const sY = y + 50;

  pdf.setFontSize(9);
  pdf.setTextColor(...colors.slate);

  pdf.text('Base Amount', col1, sY);
  pdf.text(formatAmount(receiptData?.baseAmount), col3, sY, { align: 'right' });

  pdf.text('VAT Amount', col1, sY + 8);
  pdf.text(formatAmount(receiptData?.vatAmount), col3, sY + 8, { align: 'right' });

  pdf.text('Tax Amount', col1, sY + 16);
  pdf.text(formatAmount(receiptData?.taxAmount), col3, sY + 16, { align: 'right' });

  pdf.line(leftX + 6, sY + 22, rightX - 6, sY + 22);

  /* ===== TOTAL ===== */
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.5);
  pdf.setTextColor(...colors.navy);

  pdf.text('Total Paid', col1, sY + 30);
  pdf.text(formatAmount(receiptData?.totalAmount), col3, sY + 30, {
    align: 'right',
  });

  /* ===== NOTE ===== */
  const noteY = y + 110;

  drawCard(pdf, leftX, noteY, contentWidth, 20);

  pdf.setFontSize(8.5);
  pdf.setTextColor(...colors.slate);
  pdf.text(
    'This is a system-generated payment receipt. Please keep this document for audit and verification purposes.',
    leftX + 6,
    noteY + 10,
    { maxWidth: contentWidth - 12 }
  );

  /* ===== FOOTER ===== */
  const footerY = pageHeight - 10;

  pdf.setDrawColor(...colors.line);
  pdf.line(leftX, footerY - 6, rightX, footerY - 6);

  pdf.setFontSize(8);
  pdf.setTextColor(...colors.muted);
  pdf.text(
    `NSTU TaxDesk | Generated on ${new Date().toLocaleDateString('en-GB')}`,
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );
};

export default buildReceiptPdf;