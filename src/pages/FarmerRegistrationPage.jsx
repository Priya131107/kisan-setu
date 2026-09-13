import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sprout, Phone, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2,
  User, MapPin, Wheat, Landmark, Sparkles, Check, ChevronRight
} from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import farmerService from '../services/farmerService';
import { REGISTRATION_OTP } from '../utils/constants';
import { CROPS } from '../data/crops';
import { useLanguage } from '../hooks/useLanguage';

const STEPS = [
  { id: 1, icon: Phone, key: 'step1' },
  { id: 2, icon: User, key: 'step2' },
  { id: 3, icon: Wheat, key: 'step3' },
  { id: 4, icon: Landmark, key: 'step4' },
];

const STATE_OPTIONS = [
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'punjab', label: 'Punjab' },
];

const SEASON_OPTIONS = [
  { value: 'kharif', label: 'Kharif (Summer)' },
  { value: 'rabi', label: 'Rabi (Winter)' },
  { value: 'zaid', label: 'Zaid (Spring)' },
];

export default function FarmerRegistrationPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const r = t.registration || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [registeredFarmer, setRegisteredFarmer] = useState(null);
  const [loading, setLoading] = useState(false);

  // Step 1 — Mobile Verification
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);

  // Step 2 — Farmer Details
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState('');
  const [village, setVillage] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  // Step 3 — Farm & Crop Details
  const [landArea, setLandArea] = useState('');
  const [landUnit, setLandUnit] = useState('acres');
  const [landType, setLandType] = useState('');
  const [crop, setCrop] = useState('');
  const [expectedQuantity, setExpectedQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('quintal');
  const [harvestSeason, setHarvestSeason] = useState('');

  // Step 4 — Bank Details
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setErrors({ mobile: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== REGISTRATION_OTP) {
      setErrors({ otp: `Invalid OTP. ${r.demoOtpNote || 'Demo OTP: 123456'}` });
      return;
    }
    setErrors({});
    setMobileVerified(true);
    setCurrentStep(2);
  };

  const validateStep2 = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!fatherName.trim()) errs.fatherName = "Father's/Husband's name is required";
    if (!dob) errs.dob = 'Date of birth is required';
    if (!state) errs.state = 'State is required';
    if (!district.trim()) errs.district = 'District is required';
    if (!village.trim()) errs.village = 'Village is required';
    return errs;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!landArea || isNaN(landArea) || Number(landArea) <= 0) errs.landArea = 'Valid land area is required';
    if (!landType) errs.landType = 'Land type is required';
    if (!crop) errs.crop = 'Crop is required';
    if (!expectedQuantity || isNaN(expectedQuantity) || Number(expectedQuantity) <= 0) errs.expectedQuantity = 'Valid quantity is required';
    if (!harvestSeason) errs.harvestSeason = 'Harvest season is required';
    return errs;
  };

  const validateStep4 = () => {
    const errs = {};
    if (!accountHolderName.trim()) errs.accountHolderName = 'Account holder name is required';
    if (!bankName.trim()) errs.bankName = 'Bank name is required';
    if (!accountNumber.trim()) errs.accountNumber = 'Account number is required';
    if (!ifscCode.trim()) errs.ifscCode = 'IFSC code is required';
    return errs;
  };

  const handleNext = () => {
    let errs = {};
    if (currentStep === 2) errs = validateStep2();
    if (currentStep === 3) errs = validateStep3();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrors({});
    if (currentStep === 2 && mobileVerified) {
      setCurrentStep(1);
      return;
    }
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    const errs = validateStep4();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      const result = farmerService.register({
        mobile, fullName, fatherName, dob, state, district, block, village, aadhaar,
        landArea, landUnit, landType, crop, expectedQuantity, quantityUnit, harvestSeason,
        accountHolderName, bankName, accountNumber, ifscCode,
      });
      setLoading(false);

      if (result.success) {
        setRegisteredFarmer(result.farmer);
        setCurrentStep(5); // success
      }
    }, 800);
  };

  // ─── Stepper ───
  const renderStepper = () => (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 ring-4 ring-primary-200'
                    : 'bg-neutral-100 text-neutral-400 border-2 border-neutral-200'
                }`}
              >
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1.5 font-medium text-center max-w-[70px] sm:max-w-[80px] ${
                  isActive || isCompleted ? 'text-primary-700' : 'text-neutral-400'
                }`}
              >
                {r[step.key] || `Step ${step.id}`}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 sm:mx-3 rounded-full transition-all duration-300 ${
                  currentStep > step.id ? 'bg-primary-500' : 'bg-neutral-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // ─── Step 1: Mobile Verification ───
  const renderStep1 = () => (
    <Card className="p-6 sm:p-8 shadow-xl border border-neutral-200">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary-500/30 text-white mb-3">
          <Phone size={28} />
        </div>
        <h3 className="font-heading text-xl font-bold text-neutral-900">
          {r.step1 || 'Mobile Verification'}
        </h3>
      </div>

      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <Input
            label={r.mobileNumber || 'Mobile Number'}
            id="reg-mobile"
            type="tel"
            placeholder="Enter 10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            maxLength={10}
            required
            error={errors.mobile}
          />
          <Button type="submit" size="lg" className="w-full">
            {r.sendOtp || 'Send OTP'}
          </Button>
        </form>
      ) : !mobileVerified ? (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 flex items-center justify-between">
            <span>OTP sent to {mobile}</span>
            <Badge variant="success">{r.demoOtpNote || 'Demo OTP: 123456'}</Badge>
          </div>
          <Input
            label={r.enterOtp || 'Enter OTP'}
            id="reg-otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            required
            error={errors.otp}
          />
          <Button type="submit" size="lg" className="w-full">
            <ShieldCheck size={18} />
            {r.verifyAndContinue || 'Verify & Continue'}
          </Button>
          <button
            type="button"
            onClick={() => { setOtpSent(false); setOtp(''); }}
            className="text-xs text-neutral-500 hover:text-neutral-800 w-full text-center block pt-1"
          >
            Change mobile number
          </button>
        </form>
      ) : (
        <div className="text-center py-4">
          <CheckCircle2 size={40} className="text-green-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-green-700">Mobile verified!</p>
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
        <p className="text-xs text-neutral-500 mb-2">{r.alreadyRegistered || 'Already Registered? Login'}</p>
        <Link
          to="/login"
          className="text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline inline-flex items-center gap-1"
        >
          Go to Login <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );

  // ─── Step 2: Farmer Details ───
  const renderStep2 = () => (
    <Card className="p-6 sm:p-8 shadow-xl border border-neutral-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center">
          <User size={22} />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-neutral-900">{r.step2 || 'Farmer Details'}</h3>
          <p className="text-xs text-neutral-500">Enter your personal information</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={r.fullName || 'Full Name'}
            id="reg-fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            required
            error={errors.fullName}
          />
          <Input
            label={r.fatherName || "Father's / Husband's Name"}
            id="reg-fatherName"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Enter name"
            required
            error={errors.fatherName}
          />
        </div>

        <Input
          label={r.dob || 'Date of Birth'}
          id="reg-dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          error={errors.dob}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label={r.state || 'State'}
            id="reg-state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={STATE_OPTIONS}
            placeholder="Select state"
            required
            error={errors.state}
          />
          <Input
            label={r.district || 'District'}
            id="reg-district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district"
            required
            error={errors.district}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={r.block || 'Block / Tehsil'}
            id="reg-block"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            placeholder="Enter block/tehsil"
          />
          <Input
            label={r.village || 'Village'}
            id="reg-village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            placeholder="Enter village"
            required
            error={errors.village}
          />
        </div>

        <div>
          <Input
            label={r.aadhaar || 'Farmer ID / Aadhaar Number'}
            id="reg-aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="Enter 12-digit Aadhaar"
            maxLength={12}
          />
          <p className="text-[10px] text-amber-600 mt-1 flex items-center gap-1">
            <Sparkles size={11} />
            {r.aadhaarNote || 'Prototype only — not connected to UIDAI'}
          </p>
        </div>
      </div>

      {renderNavButtons()}
    </Card>
  );

  // ─── Step 3: Farm & Crop Details ───
  const renderStep3 = () => (
    <Card className="p-6 sm:p-8 shadow-xl border border-neutral-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
          <Wheat size={22} />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-neutral-900">{r.step3 || 'Farm & Crop Details'}</h3>
          <p className="text-xs text-neutral-500">Tell us about your farm and crop</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={r.landArea || 'Land Area'}
            id="reg-landArea"
            type="number"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            placeholder="e.g. 5"
            required
            error={errors.landArea}
          />
          <Select
            label={r.landUnit || 'Land Unit'}
            id="reg-landUnit"
            value={landUnit}
            onChange={(e) => setLandUnit(e.target.value)}
            options={[
              { value: 'acres', label: r.acres || 'Acres' },
              { value: 'hectares', label: r.hectares || 'Hectares' },
            ]}
          />
        </div>

        <Select
          label={r.landType || 'Land Type'}
          id="reg-landType"
          value={landType}
          onChange={(e) => setLandType(e.target.value)}
          options={[
            { value: 'irrigated', label: r.irrigated || 'Irrigated' },
            { value: 'rainfed', label: r.rainfed || 'Rainfed' },
          ]}
          placeholder="Select land type"
          required
          error={errors.landType}
        />

        <Select
          label={r.crop || 'Crop'}
          id="reg-crop"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          options={CROPS.map((c) => ({ value: c.id, label: `${c.name} (${c.nameHi}) — MSP ₹${c.msp}/q` }))}
          placeholder="Select crop"
          required
          error={errors.crop}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={r.expectedQuantity || 'Expected Quantity'}
            id="reg-expectedQuantity"
            type="number"
            value={expectedQuantity}
            onChange={(e) => setExpectedQuantity(e.target.value)}
            placeholder="e.g. 50"
            required
            error={errors.expectedQuantity}
          />
          <Select
            label={r.quantityUnit || 'Quantity Unit'}
            id="reg-quantityUnit"
            value={quantityUnit}
            onChange={(e) => setQuantityUnit(e.target.value)}
            options={[
              { value: 'quintal', label: r.quintal || 'Quintal' },
              { value: 'tonne', label: r.tonne || 'Tonne' },
            ]}
          />
        </div>

        <Select
          label={r.harvestSeason || 'Harvest Season'}
          id="reg-harvestSeason"
          value={harvestSeason}
          onChange={(e) => setHarvestSeason(e.target.value)}
          options={SEASON_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
          placeholder="Select season"
          required
          error={errors.harvestSeason}
        />
      </div>

      {renderNavButtons()}
    </Card>
  );

  // ─── Step 4: Bank Details ───
  const renderStep4 = () => (
    <Card className="p-6 sm:p-8 shadow-xl border border-neutral-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
          <Landmark size={22} />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-neutral-900">{r.step4 || 'Bank Details'}</h3>
          <p className="text-xs text-neutral-500">For MSP payment disbursement</p>
        </div>
      </div>

      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 mb-4 flex items-center gap-2">
        <Sparkles size={14} className="text-amber-500 flex-shrink-0" />
        <span>{r.bankNote || 'Prototype / demo data only'}</span>
      </div>

      <div className="space-y-4">
        <Input
          label={r.accountHolderName || 'Account Holder Name'}
          id="reg-accountHolderName"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          placeholder="Enter account holder name"
          required
          error={errors.accountHolderName}
        />

        <Input
          label={r.bankName || 'Bank Name'}
          id="reg-bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="e.g. State Bank of India"
          required
          error={errors.bankName}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={r.accountNumber || 'Account Number'}
            id="reg-accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter account number"
            required
            error={errors.accountNumber}
          />
          <Input
            label={r.ifscCode || 'IFSC Code'}
            id="reg-ifscCode"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            placeholder="e.g. SBIN0001234"
            required
            error={errors.ifscCode}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-neutral-100">
        <Button variant="secondary" size="md" onClick={handleBack}>
          <ArrowLeft size={16} />
          {r.back || 'Back'}
        </Button>
        <Button size="lg" onClick={handleSubmit} loading={loading} className="w-full sm:w-auto">
          <CheckCircle2 size={18} />
          {r.submitRegistration || 'Complete Registration'}
        </Button>
      </div>
    </Card>
  );

  // ─── Step 5: Success ───
  const renderSuccess = () => (
    <Card className="p-8 sm:p-10 shadow-xl border-2 border-primary-200 text-center bg-gradient-to-b from-white to-primary-50/30">
      <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-green-500/30 text-white mb-5 animate-bounce">
        <CheckCircle2 size={40} />
      </div>

      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
        {r.successTitle || 'Registration Successful!'}
      </h2>
      <p className="text-sm text-neutral-500 mb-8">
        {r.successSubtitle || 'Your farmer account has been created successfully.'}
      </p>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 max-w-sm mx-auto shadow-sm space-y-4 mb-8">
        <div>
          <span className="text-xs text-neutral-500 block">{r.farmerId || 'Farmer ID'}</span>
          <span className="text-xl font-heading font-bold text-primary-700 font-mono">
            {registeredFarmer?.farmerId}
          </span>
        </div>
        <div className="h-px bg-neutral-100" />
        <div>
          <span className="text-xs text-neutral-500 block">{r.farmerName || 'Farmer Name'}</span>
          <span className="text-base font-semibold text-neutral-800">
            {registeredFarmer?.name}
          </span>
        </div>
        <div className="h-px bg-neutral-100" />
        <div>
          <span className="text-xs text-neutral-500 block">{r.registeredMobile || 'Registered Mobile'}</span>
          <span className="text-base font-semibold text-neutral-800">
            {registeredFarmer?.mobile}
          </span>
        </div>
      </div>

      <Button
        size="lg"
        onClick={() => navigate('/farmer/dashboard')}
        className="min-w-[240px] shadow-lg"
      >
        {r.goToDashboard || 'Go to Farmer Dashboard'}
        <ArrowRight size={18} />
      </Button>
    </Card>
  );

  // ─── Nav Buttons (Steps 2-3) ───
  const renderNavButtons = () => (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
      <Button variant="secondary" size="md" onClick={handleBack}>
        <ArrowLeft size={16} />
        {r.back || 'Back'}
      </Button>
      <Button size="md" onClick={handleNext}>
        {r.next || 'Next'}
        <ChevronRight size={16} />
      </Button>
    </div>
  );

  // ─── Main Render ───
  const isSuccess = currentStep === 5;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          {!isSuccess && (
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-primary-500/30 text-white mb-4">
                <Sprout size={28} />
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
                {r.title || 'Farmer Registration'}
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                {r.subtitle || 'Register to access slot booking, live tracking, and MSP benefits'}
              </p>
            </div>
          )}

          {/* Stepper (not on success) */}
          {!isSuccess && currentStep > 0 && renderStepper()}

          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderSuccess()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
