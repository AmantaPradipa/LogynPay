interface InvoiceData {
  id: string;
  externalId: string;
  amount: number;
  status: string;
  createdAt: string;
  paymentDate: string | null;
  checkoutUrl: string;
}

interface PDFData {
  user: {
    email: string;
    exportDate: string;
  };
  invoices: InvoiceData[];
  summary: {
    totalInvoices: number;
    totalAmount: number;
    paidInvoices: number;
    pendingInvoices: number;
    expiredInvoices: number;
  };
}

export function generatePrintableHTML(data: PDFData): string {
  const formatCurrency = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>LogynPay - Invoice Report</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');
        
        @media print {
          body { 
            margin: 0; 
            background: white !important;
            color: #000000 !important;
          }
          .no-print { display: none; }
          .bubble-bg { display: none; }
          
          .container {
            background: white !important;
            color: #000000 !important;
          }
          
          .glass-effect { 
            background: white !important; 
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
          }
          
          .header h1 {
            color: #22c55e !important;
            -webkit-text-fill-color: #22c55e !important;
            text-shadow: none !important;
          }
          
          .header .subtitle,
          .header .meta-item,
          .summary h2,
          .invoices h2 {
            color: #374151 !important;
          }
          
          .header .meta-item i,
          .summary h2 i,
          .invoices h2 i {
            color: #22c55e !important;
          }
          
          .summary-item {
            background: #f9fafb !important;
            border: 1px solid #e5e7eb !important;
            color: #000000 !important;
          }
          
          .summary-item .label {
            color: #6b7280 !important;
          }
          
          .summary-item .value {
            color: #111827 !important;
          }
          
          .table-container {
            background: white !important;
            border: 1px solid #e5e7eb !important;
          }
          
          th {
            background: #22c55e !important;
            color: white !important;
          }
          
          td {
            color: #374151 !important;
            border-bottom: 1px solid #e5e7eb !important;
          }
          
          tr:nth-child(even) {
            background: #f9fafb !important;
          }
          
          .status.PAID {
            background: #dcfce7 !important;
            color: #166534 !important;
            border: 1px solid #22c55e !important;
          }
          
          .status.PENDING {
            background: #fef3c7 !important;
            color: #92400e !important;
            border: 1px solid #f59e0b !important;
          }
          
          .status.EXPIRED {
            background: #fee2e2 !important;
            color: #991b1b !important;
            border: 1px solid #ef4444 !important;
          }
          
          .footer {
            color: #6b7280 !important;
            border-top: 1px solid #e5e7eb !important;
          }
          
          .footer .logo {
            color: #22c55e !important;
          }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%);
          color: #ffffff;
          line-height: 1.6;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        /* Animated Background Bubbles */
        .bubble-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        
        .bubble {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          filter: blur(40px);
          animation: float 6s ease-in-out infinite;
        }
        
        .bubble-1 {
          width: 300px;
          height: 300px;
          background: #22c55e;
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .bubble-2 {
          width: 250px;
          height: 250px;
          background: #3b82f6;
          bottom: 20%;
          right: 20%;
          animation-delay: 2s;
        }
        
        .bubble-3 {
          width: 200px;
          height: 200px;
          background: #10b981;
          bottom: 50%;
          right: 30%;
          opacity: 0.1;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #22c55e, #3b82f6);
          border-radius: 2px;
        }
        
        .header h1 {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          font-size: 3rem;
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          text-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
        }
        
        .header .subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
          font-weight: 500;
        }
        
        .header .meta {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        
        .header .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        .header .meta-item i {
          color: #22c55e;
          font-size: 1.1rem;
        }
        
        .summary {
          padding: 30px;
          margin-bottom: 40px;
          position: relative;
        }
        
        .summary h2 {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.8rem;
          color: #ffffff;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .summary h2 i {
          color: #22c55e;
          font-size: 1.5rem;
        }
        
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        
        .summary-item {
          padding: 25px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .summary-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #3b82f6);
        }
        
        .summary-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(34, 197, 94, 0.2);
        }
        
        .summary-item .label {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        
        .summary-item .value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
        }
        
        .invoices {
          padding: 30px;
          margin-top: 40px;
        }
        
        .invoices h2 {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.8rem;
          color: #ffffff;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .invoices h2 i {
          color: #22c55e;
          font-size: 1.5rem;
        }
        
        .table-container {
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #ffffff;
          font-weight: 600;
          padding: 18px 16px;
          text-align: left;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        td {
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }
        
        tr:nth-child(even) {
          background: rgba(255, 255, 255, 0.02);
        }
        
        tr:hover {
          background: rgba(34, 197, 94, 0.1);
        }
        
        .status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
        }
        
        .status.PAID {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        
        .status.PENDING {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }
        
        .status.EXPIRED {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .footer {
          margin-top: 50px;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          padding: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer p {
          margin: 8px 0;
        }
        
        .footer .logo {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          color: #22c55e;
          font-size: 1.1rem;
        }
        
        .print-controls {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 12px;
          z-index: 1000;
        }
        
        .print-button {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
        }
        
        .print-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(34, 197, 94, 0.4);
        }
        
        .print-button.secondary {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          box-shadow: 0 4px 20px rgba(107, 114, 128, 0.3);
        }
        
        .print-button.secondary:hover {
          box-shadow: 0 8px 30px rgba(107, 114, 128, 0.4);
        }
        
        .amount {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <!-- Animated Background Bubbles -->
      <div class="bubble-bg">
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
      </div>

      <!-- Print Controls -->
      <div class="no-print print-controls">
        <button class="print-button" onclick="window.print()">
          <i class="ri-printer-line"></i>
          Print / Save as PDF
        </button>
        <button class="print-button secondary" onclick="window.close()">
          <i class="ri-close-line"></i>
          Close
        </button>
      </div>
      
      <div class="container">
        <!-- Header Section -->
        <div class="header glass-effect">
          <h1>LogynPay</h1>
          <div class="subtitle">Invoice Report & Analytics</div>
          <div class="meta">
            <div class="meta-item">
              <i class="ri-user-line"></i>
              <span>${data.user.email}</span>
            </div>
            <div class="meta-item">
              <i class="ri-calendar-line"></i>
              <span>${data.user.exportDate}</span>
            </div>
            <div class="meta-item">
              <i class="ri-file-list-line"></i>
              <span>${data.summary.totalInvoices} Invoices</span>
            </div>
          </div>
        </div>
        
        <!-- Summary Section -->
        <div class="summary glass-effect">
          <h2>
            <i class="ri-bar-chart-line"></i>
            Summary Analytics
          </h2>
          <div class="summary-grid">
            <div class="summary-item">
              <div class="label">Total Invoices</div>
              <div class="value">${data.summary.totalInvoices}</div>
            </div>
            <div class="summary-item">
              <div class="label">Total Revenue</div>
              <div class="value amount">${formatCurrency(data.summary.totalAmount)}</div>
            </div>
            <div class="summary-item">
              <div class="label">Paid Invoices</div>
              <div class="value">${data.summary.paidInvoices}</div>
            </div>
            <div class="summary-item">
              <div class="label">Pending Invoices</div>
              <div class="value">${data.summary.pendingInvoices}</div>
            </div>
            <div class="summary-item">
              <div class="label">Expired Invoices</div>
              <div class="value">${data.summary.expiredInvoices}</div>
            </div>
          </div>
        </div>
        
        <!-- Invoice Details Section -->
        <div class="invoices glass-effect">
          <h2>
            <i class="ri-file-list-3-line"></i>
            Invoice Details
          </h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th><i class="ri-hashtag"></i> External ID</th>
                  <th><i class="ri-money-dollar-circle-line"></i> Amount</th>
                  <th><i class="ri-checkbox-circle-line"></i> Status</th>
                  <th><i class="ri-calendar-event-line"></i> Created</th>
                  <th><i class="ri-calendar-check-line"></i> Paid Date</th>
                </tr>
              </thead>
              <tbody>
                ${data.invoices.map(invoice => `
                  <tr>
                    <td><strong>${invoice.externalId}</strong></td>
                    <td class="amount">${formatCurrency(invoice.amount)}</td>
                    <td><span class="status ${invoice.status}">${invoice.status}</span></td>
                    <td>${formatDate(invoice.createdAt)}</td>
                    <td>${invoice.paymentDate ? formatDate(invoice.paymentDate) : '<span style="color: rgba(255,255,255,0.5);">-</span>'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Footer Section -->
        <div class="footer">
          <div class="logo">LogynPay</div>
          <p>Digital Payment Solutions • Generated on ${new Date().toLocaleString('id-ID')}</p>
          <p>Report Summary: ${data.summary.totalInvoices} invoice(s) • Total Value: ${formatCurrency(data.summary.totalAmount)}</p>
          <p style="margin-top: 15px; font-size: 0.8rem; opacity: 0.7;">
            <i class="ri-shield-check-line"></i> 
            This report is generated securely and contains confidential financial information
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function openPrintableReport(data: PDFData) {
  const htmlContent = generatePrintableHTML(data);
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-focus the print window
    printWindow.focus();
  } else {
    // Fallback: create a blob and download as HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoices-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}