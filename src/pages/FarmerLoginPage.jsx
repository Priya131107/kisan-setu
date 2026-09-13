import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Phone, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import farmerService from '../services/farmerService';
import { useLanguage } from '../hooks/useLanguage';

export default function FarmerLoginPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mobile, setMobile] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setOtpSent(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const res = farmerService.login(mobile, otp);
      setLoading(false);
      if (res && res.success) {
        navigate('/farmer/dashboard');
      } else {
        setError(res?.error || 'Invalid OTP. Demo OTP is 1234');
      }
    }, 400);
  };

  const handleInstantDemoLogin = () => {
    farmerService.login('9876543210', '1234');
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-primary-500/30 text-white mb-4">
            <Sprout size={32} />
          </div>
          <h2 className="font-heading text-3xl font-bold text-neutral-900">
            {t.farmer.login}
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Access slot booking, live token tracking, and MSP status
          </p>
        </div>

        {/* Login Box */}
        <Card className="p-6 sm:p-8 shadow-xl border border-neutral-200">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Input
                label={t.farmer.mobile}
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
                required
              />
              <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>Demo mobile pre-filled: <b>9876543210</b></span>
              </div>
              <Button type="submit" size="lg" className="w-full">
                {t.farmer.sendOtp}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 flex items-center justify-between">
                <span>{t.farmer.otpSent}</span>
                <Badge variant="success">Code: 1234</Badge>
              </div>

              <Input
                label={t.farmer.otp}
                id="otp"
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                required
              />

              <Button type="submit" size="lg" loading={loading} className="w-full">
                {t.farmer.verifyOtp}
              </Button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-xs text-neutral-500 hover:text-neutral-800 w-full text-center block pt-1"
              >
                Change mobile number
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-neutral-100">
            <button
              onClick={handleInstantDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-primary-300 bg-primary-50/50 hover:bg-primary-100/60 text-primary-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 size={15} className="text-primary-600" />
              <span>1-Click Auto Login (Ramesh Kumar - RJ)</span>
            </button>
          </div>
        </Card>

        {/* Help Note */}
        <div className="text-center text-xs text-neutral-500">
          No smartphone? Use our toll-free phone IVR at <b>1800-180-SETU</b>
        </div>
      </div>
    </div>
  );
}