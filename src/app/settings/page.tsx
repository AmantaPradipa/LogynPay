'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [userInfo, setUserInfo] = useState({
    email: '',
    createdAt: '',
    totalInvoices: 0
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    
    // Set user info from session
    setUserInfo(prev => ({
      ...prev,
      email: session.user?.email || ''
    }));

    // Fetch additional user data
    fetchUserData();
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setUserInfo(prev => ({
          ...prev,
          createdAt: data.createdAt,
          totalInvoices: data.totalInvoices
        }));
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage(data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      setMessage('An error occurred while changing password');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full opacity-20 filter blur-3xl bubble"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full opacity-20 filter blur-3xl bubble bubble-2"></div>
        <div className="absolute bottom-1/2 right-1/3 w-60 h-60 bg-green-400 rounded-full opacity-10 filter blur-2xl bubble bubble-3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Navbar />
        
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
            >
              <i className="ri-arrow-left-line text-white text-xl"></i>
            </button>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <i className="ri-user-line text-green-400"></i>
                Account Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Email Address</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                    {userInfo.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Member Since</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                    {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Loading...'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Total Invoices</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                    {userInfo.totalInvoices} invoices created
                  </div>
                </div>
              </div>
            </Card>

            {/* Change Password */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <i className="ri-lock-line text-green-400"></i>
                Change Password
              </h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                
                {message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    message.includes('successfully') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {message}
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Changing Password...
                    </div>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Additional Settings */}
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <i className="ri-settings-line text-green-400"></i>
              Preferences
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Export Settings</h3>
                <p className="text-white/70 text-sm">
                  Configure your default export preferences for invoice data.
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center justify-center gap-2 w-auto px-6"
                  >
                    <i className="ri-download-line"></i>
                    Go to Export
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Account Actions</h3>
                <p className="text-white/70 text-sm">
                  Manage your account and data.
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center justify-center gap-2 w-auto px-6"
                  >
                    <i className="ri-dashboard-line"></i>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}