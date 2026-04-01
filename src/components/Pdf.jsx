import React from 'react'

const Pdf = ({ data = [] }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '40px',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      width: '100%',
      boxSizing: 'border-box'
    }} className="pdf-content">
      {/* Header */}
      <div style={{
        borderBottom: '3px solid #6366f1',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>Tax & VAT Rates Report</h1>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0',
          fontWeight: '500'
        }}>Official tax and VAT rates based on National Board of Revenue guidelines</p>
      </div>

      {/* Meta Information */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '16px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px'
      }}>
        <div>
          <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Generated Date</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>
            {currentDate}
          </p>
        </div>
        <div>
          <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Total Records</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>
            {data.length}
          </p>
        </div>
      </div>

      {/* Table */}
      {data.length > 0 ? (
        <div style={{ marginBottom: '30px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#6366f1',
                color: 'white'
              }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  borderBottom: '2px solid #4f46e5'
                }}>Serial No</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: '600',
                  borderBottom: '2px solid #4f46e5'
                }}>Product/Service Name</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottom: '2px solid #4f46e5'
                }}>Type</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottom: '2px solid #4f46e5'
                }}>VAT (%)</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottom: '2px solid #4f46e5'
                }}>Tax (%)</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottom: '2px solid #4f46e5'
                }}>Total Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const isProduct = item.category?.toLowerCase() === 'product'
                const totalRate = (parseFloat(item.vatRate) + parseFloat(item.incomeTaxRate)).toFixed(2)

                return (
                  <tr key={item.id} style={{
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff'
                  }}>
                    <td style={{
                      padding: '12px',
                      color: '#374151',
                      fontWeight: '500'
                    }}>{item.id}</td>
                    <td style={{
                      padding: '12px',
                      color: '#374151',
                      fontWeight: '500'
                    }}>{item.name}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      color: '#374151'
                    }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: isProduct ? '#dbeafe' : '#e9d5ff',
                        color: isProduct ? '#1e40af' : '#6b21a8'
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#1e40af'
                    }}>
                      {item.vatRate}%
                    </td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#16a34a'
                    }}>
                      {item.incomeTaxRate}%
                    </td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#7c3aed'
                    }}>
                      {totalRate}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          No data available to display
        </div>
      )}

      {/* Footer Information */}
      <div style={{
        borderTop: '2px solid #e5e7eb',
        paddingTop: '20px',
        marginTop: '30px'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '12px'
        }}>Important Information</h3>
        <ul style={{
          margin: '0',
          paddingLeft: '20px',
          fontSize: '12px',
          color: '#4b5563',
          lineHeight: '1.6'
        }}>
          <li>All rates are subject to change based on NBR guidelines</li>
          <li>VAT and Tax are calculated on the gross amount of the service</li>
          <li>For detailed calculation, please use the Tax Calculator</li>
          <li>Contact the Finance Department for any clarifications</li>
        </ul>
      </div>

      {/* Document Footer */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #d1d5db',
        textAlign: 'center',
        fontSize: '11px',
        color: '#9ca3af'
      }}>
        <p style={{ margin: '0' }}>This document was automatically generated by NSTU TaxDesk System</p>
        <p style={{ margin: '4px 0 0 0' }}>© {new Date().getFullYear()} National Board of Revenue. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Pdf