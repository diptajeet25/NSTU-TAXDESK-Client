import React from 'react';
import logo from '../assets/nstu-logo.png';

const ReceiptTemplate = ({ id, user, receiptData, forPdf = false, className = '' }) => {
  const amountFormat = (amount) => {
    const value = Number(amount || 0);
    return value.toLocaleString('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 2,
    });
  };

  const paidDate = receiptData?.paidAt
    ? new Date(receiptData.paidAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  const paidTime = receiptData?.paidAt
    ? new Date(receiptData.paidAt).toLocaleTimeString('en-BD', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A';

  if (forPdf) {
    return (
      <div
        style={{
          width: '595px',
          minHeight: '842px',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          boxSizing: 'border-box',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ padding: '28px 32px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '24px',
              paddingBottom: '20px',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={logo} alt="NSTU TaxDesk logo" style={{ width: '64px', height: '64px', objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ textAlign: 'left' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>NSTU TaxDesk</h1>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>National Board of Revenue Compliant Tax and VAT Payment System</p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#64748b' }}>Official Receipt</p>
              <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>#{id}</p>
              <p
                style={{
                  display: 'inline-block',
                  margin: '8px 0 0',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: '#ecfdf5',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#047857',
                }}
              >
                Payment Completed
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', backgroundColor: '#f8fafc', padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Billed To</p>
              <p style={{ margin: '8px 0 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{user?.displayName || 'N/A'}</p>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>{user?.email || 'N/A'}</p>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', backgroundColor: '#f8fafc', padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Transaction Info</p>
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#0f172a' }}>Date:</span> {paidDate}</p>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#0f172a' }}>Time:</span> {paidTime}</p>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#0f172a' }}>Method:</span> {receiptData?.method || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '12px 16px' }}>
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#334155' }}>Payment Details</h2>
            </div>

            <div style={{ padding: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '8px', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
                <p style={{ margin: 0 }}>Item</p>
                <p style={{ margin: 0, textAlign: 'right' }}>Type</p>
                <p style={{ margin: 0, textAlign: 'right' }}>Amount</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '8px', alignItems: 'center', padding: '12px 0', fontSize: '14px', color: '#334155' }}>
                <p style={{ margin: 0, fontWeight: 500, color: '#0f172a' }}>{receiptData?.name || 'Tax and VAT Payment'}</p>
                <p style={{ margin: 0, textAlign: 'right', textTransform: 'capitalize' }}>{receiptData?.category || 'N/A'}</p>
                <p style={{ margin: 0, textAlign: 'right', fontWeight: 500 }}>{amountFormat(receiptData?.baseAmount)}</p>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#475569' }}>
                  <span>Base Amount</span>
                  <span style={{ fontWeight: 500, color: '#0f172a' }}>{amountFormat(receiptData?.baseAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', color: '#475569' }}>
                  <span>VAT Amount</span>
                  <span style={{ fontWeight: 500, color: '#0f172a' }}>{amountFormat(receiptData?.vatAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', color: '#475569' }}>
                  <span>Tax Amount</span>
                  <span style={{ fontWeight: 500, color: '#0f172a' }}>{amountFormat(receiptData?.taxAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                  <span>Total Paid</span>
                  <span>{amountFormat(receiptData?.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', border: '1px dashed #cbd5e1', borderRadius: '10px', backgroundColor: '#f8fafc', padding: '12px 16px' }}>
            <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#475569' }}>
              This is a system-generated payment receipt. Please keep this document for audit and verification purposes.
            </p>
          </div>

          <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>NSTU TaxDesk | Generated on {new Date().toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: forPdf ? '595px' : 'min(595px, 100%)',
        minHeight: '842px',
        backgroundColor: '#ffffff',
        color: '#0f172a',
      }}
      className={`overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#ffffff] ${forPdf ? '' : 'shadow-lg'} ${className}`}
    >
      <div className='!px-8 !py-7'>
        <div className='flex flex-col gap-6 border-b border-[#e2e8f0] !pb-5 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-center gap-4'>
            <img src={logo} alt="NSTU TaxDesk logo" className='h-16 w-16 shrink-0 object-contain' />
            <div className='text-left'>
              <h1 className='text-2xl font-extrabold tracking-tight text-[#0f172a]'>NSTU TaxDesk</h1>
              <p className='text-xs text-[#64748b]'>National Board of Revenue Compliant Tax and VAT Payment System</p>
            </div>
          </div>

          <div className='text-left sm:text-right'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]'>Official Receipt</p>
            <p className='!mt-1 text-xl font-bold text-[#0f172a]'>#{id}</p>
            <p className='!mt-2 inline-block rounded-full bg-[#ecfdf5] !px-3 !py-1 text-[11px] font-semibold uppercase tracking-wide text-[#047857]'>Payment Completed</p>
          </div>
        </div>

        <div className='!mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='rounded-lg border border-[#e2e8f0] bg-[#f8fafc] !p-4'>
            <p className='text-[11px] font-semibold uppercase tracking-wider text-[#64748b]'>Billed To</p>
            <p className='!mt-2 text-sm font-semibold text-[#0f172a]'>{user?.displayName || 'N/A'}</p>
            <p className='!mt-1 text-sm text-[#475569]'>{user?.email || 'N/A'}</p>
          </div>

          <div className='rounded-lg border border-[#e2e8f0] bg-[#f8fafc] !p-4'>
            <p className='text-[11px] font-semibold uppercase tracking-wider text-[#64748b]'>Transaction Info</p>
            <div className='!mt-2 space-y-1 text-sm text-[#334155]'>
              <p><span className='font-semibold text-[#0f172a]'>Date:</span> {paidDate}</p>
              <p><span className='font-semibold text-[#0f172a]'>Time:</span> {paidTime}</p>
              <p><span className='font-semibold text-[#0f172a]'>Method:</span> {receiptData?.method || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className='!mt-6 rounded-lg border border-[#e2e8f0]'>
          <div className='border-b border-[#e2e8f0] bg-[#f8fafc] !px-4 !py-3'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-[#334155]'>Payment Details</h2>
          </div>

          <div className='!px-4 !py-4'>
            <div className='grid grid-cols-[1.5fr,1fr,1fr] items-center gap-2 border-b border-[#f1f5f9] !pb-3 text-[11px] font-semibold uppercase tracking-wide text-[#64748b]'>
              <p>Item</p>
              <p className='text-right'>Type</p>
              <p className='text-right'>Amount</p>
            </div>

            <div className='grid grid-cols-[1.5fr,1fr,1fr] items-center gap-2 !py-3 text-sm text-[#334155]'>
              <p className='font-medium text-[#0f172a]'>{receiptData?.name || 'Tax and VAT Payment'}</p>
              <p className='text-right capitalize'>{receiptData?.category || 'N/A'}</p>
              <p className='text-right font-medium'>{amountFormat(receiptData?.baseAmount)}</p>
            </div>

            <div className='space-y-2 border-t border-[#f1f5f9] !pt-4 text-sm'>
              <div className='flex items-center justify-between text-[#475569]'>
                <span>Base Amount</span>
                <span className='font-medium text-[#0f172a]'>{amountFormat(receiptData?.baseAmount)}</span>
              </div>
              <div className='flex items-center justify-between text-[#475569]'>
                <span>VAT Amount</span>
                <span className='font-medium text-[#0f172a]'>{amountFormat(receiptData?.vatAmount)}</span>
              </div>
              <div className='flex items-center justify-between text-[#475569]'>
                <span>Tax Amount</span>
                <span className='font-medium text-[#0f172a]'>{amountFormat(receiptData?.taxAmount)}</span>
              </div>
              <div className='!mt-2 flex items-center justify-between border-t border-[#e2e8f0] !pt-3 text-base font-bold text-[#0f172a]'>
                <span>Total Paid</span>
                <span>{amountFormat(receiptData?.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='!mt-6 rounded-lg border border-dashed border-[#cbd5e1] bg-[#f8fafc] !px-4 !py-3'>
          <p className='text-xs leading-relaxed text-[#475569]'>
            This is a system-generated payment receipt. Please keep this document for audit and verification purposes.
          </p>
        </div>

        <div className='!mt-8 border-t border-[#e2e8f0] !pt-4 text-center'>
          <p className='text-xs text-[#64748b]'>NSTU TaxDesk | Generated on {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTemplate;