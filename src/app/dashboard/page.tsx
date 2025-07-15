'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import Card from '../components/ui/Card';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    completedPayments: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // Fetch statistics and recent activity
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics
        const statsResponse = await fetch('/api/invoices/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Fetch recent activity
        const activityResponse = await fetch('/api/invoices/recent');
        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          setRecentActivity(activityData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (session?.user?.id) {
      fetchData();
    }
  }, [session?.user?.id, refreshKey]);

  // Handle button actions
  const handleExportData = () => {
    setShowExportModal(true);
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch('/api/invoices/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setShowExportModal(false);
      }
    } catch (error) {
      console.error('Failed to export data:', error);
      alert('Failed to export data');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/invoices/export-pdf');
      if (response.ok) {
        const pdfData = await response.json();
        
        // Use simple HTML-based PDF generation
        const { openPrintableReport } = await import('@/lib/simple-pdf-generator');
        openPrintableReport(pdfData);
        
        setShowExportModal(false);
      } else {
        throw new Error('Failed to fetch PDF data');
      }
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF: ' + error.message);
    }
  };

  const handleViewAllInvoices = () => {
    // Scroll to invoice list
    document.querySelector('.invoice-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInvoiceCreated = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome to Your Dashboard
          </h1>
          <p className="text-white/70 text-lg">
            Manage your invoices and track payments with ease
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
            <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalInvoices}</div>
            <div className="text-white/70 text-sm">Total Invoices</div>
            <div className="text-white/50 text-xs mt-1">
              {stats.totalInvoices > 0 ? `+${((stats.completedPayments / stats.totalInvoices) * 100).toFixed(1)}% success rate` : 'No data yet'}
            </div>
          </Card>
          <Card className="p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              Rp {stats.totalRevenue.toLocaleString('id-ID')}
            </div>
            <div className="text-white/70 text-sm">Total Revenue</div>
            <div className="text-white/50 text-xs mt-1">
              {stats.completedPayments > 0 ? `Avg: Rp ${Math.round(stats.totalRevenue / stats.completedPayments).toLocaleString('id-ID')}` : 'No revenue yet'}
            </div>
          </Card>
          <Card className="p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.pendingPayments}</div>
            <div className="text-white/70 text-sm">Pending Payments</div>
            <div className="text-white/50 text-xs mt-1">
              {stats.pendingPayments > 0 ? 'Awaiting payment' : 'All caught up!'}
            </div>
          </Card>
          <Card className="p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
            <div className="text-3xl font-bold text-purple-400 mb-2">{stats.completedPayments}</div>
            <div className="text-white/70 text-sm">Completed Payments</div>
            <div className="text-white/50 text-xs mt-1">
              {stats.completedPayments > 0 ? 'Successfully processed' : 'No payments yet'}
            </div>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={handleViewAllInvoices}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="ri-eye-line"></i>
            View All Invoices
          </button>
          <button 
            onClick={handleExportData}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="ri-download-line"></i>
            Export Data
          </button>
          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <i className="ri-refresh-line"></i>
            Refresh Data
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 invoice-list">
            <InvoiceList refreshKey={refreshKey} />
          </div>
          <div className="space-y-6">
            <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
            
            {/* Payment Methods */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Supported Payment Methods</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <i className="ri-bank-card-line text-2xl text-blue-400 mb-2"></i>
                  <div className="text-white text-xs">Credit Card</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <i className="ri-bank-line text-2xl text-green-400 mb-2"></i>
                  <div className="text-white text-xs">Bank Transfer</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <i className="ri-wallet-line text-2xl text-purple-400 mb-2"></i>
                  <div className="text-white text-xs">E-Wallet</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <i className="ri-qr-code-line text-2xl text-yellow-400 mb-2"></i>
                  <div className="text-white text-xs">QR Code</div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleViewAllInvoices}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-left transition-colors"
                >
                  <i className="ri-file-list-line mr-3"></i>
                  View All Invoices
                </button>
                <button 
                  onClick={handleExportData}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-left transition-colors"
                >
                  <i className="ri-download-line mr-3"></i>
                  Export Data
                </button>
                <button 
                  onClick={() => router.push('/settings')}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-left transition-colors"
                >
                  <i className="ri-settings-line mr-3"></i>
                  Account Settings
                </button>
                <button 
                  onClick={() => window.open('mailto:support@logynpay.com')}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-left transition-colors"
                >
                  <i className="ri-customer-service-line mr-3"></i>
                  Contact Support
                </button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'payment' ? 'bg-green-500/20' :
                        activity.type === 'invoice' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <i className={`text-sm ${
                          activity.type === 'payment' ? 'ri-money-dollar-circle-line text-green-400' :
                          activity.type === 'invoice' ? 'ri-file-add-line text-blue-400' : 'ri-time-line text-yellow-400'
                        }`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{activity.description}</div>
                        <div className="text-white/50 text-xs">{activity.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-white/70 text-sm text-center py-8">
                    <i className="ri-history-line text-2xl mb-2 block"></i>
                    No recent activity
                  </div>
                )}
              </div>
            </Card>

            {/* Security Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">SSL Certificate</span>
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <i className="ri-shield-check-line"></i>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">2FA Enabled</span>
                  <span className="text-yellow-400 text-sm flex items-center gap-1">
                    <i className="ri-shield-line"></i>
                    Recommended
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Last Login</span>
                  <span className="text-white/50 text-sm">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-secure-payment-line text-2xl text-green-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Secure Payments</h3>
              <p className="text-white/70 text-sm">
                Bank-level security with encrypted transactions
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-dashboard-line text-2xl text-blue-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Real-time Dashboard</h3>
              <p className="text-white/70 text-sm">
                Track all your payments and invoices in real-time
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-customer-service-line text-2xl text-purple-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">24/7 Support</h3>
              <p className="text-white/70 text-sm">
                Get help whenever you need it with our support team
              </p>
            </div>
          </div>
        </Card>

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Export Invoice Data</h3>
              <p className="text-white/70 mb-6">Choose the format to export your invoice data:</p>
              <div className="space-y-3">
                <button
                  onClick={handleDownloadCSV}
                  className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <i className="ri-file-excel-line"></i>
                  Export as CSV
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <i className="ri-printer-line"></i>
                  Print / Save as PDF
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-full p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}