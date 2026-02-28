"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/signup/verify/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      const data = await response.json();
      setPaymentData(data);
      setStatus('success');
    } catch (error) {
      console.error('Error verifying payment:', error);
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifying your payment...</h2>
          <p className="text-slate-600">Please wait while we confirm your enrollment.</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Verification Failed</h1>
          <p className="text-slate-600 mb-6">
            We couldn't verify your payment. Please contact support if you believe this is an error.
          </p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome to FractionalPro Academy! 🎉
          </h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Your enrollment has been confirmed. We're excited to have you join the cohort!
          </p>

          {paymentData && (
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-slate-900 mb-4">Enrollment Details</h3>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium">Name:</span> {paymentData.name}</p>
                <p><span className="font-medium">Email:</span> {paymentData.email}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Confirmed</span></p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-3">What's Next?</h3>
            <ul className="text-left space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Check your email for a confirmation message with course details</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You'll receive calendar invites for all 6 live sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Access to course materials will be sent 48 hours before the first session</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Join our private community to connect with fellow participants</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
            <a 
              href="mailto:support@fractionalpro.com"
              className="inline-block bg-slate-100 text-slate-700 px-8 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}