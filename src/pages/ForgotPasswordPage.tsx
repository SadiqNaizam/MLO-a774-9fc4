import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandingLogoDisplay from '@/components/auth/BrandingLogoDisplay';
import AuthFormContainer from '@/components/auth/AuthFormContainer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  console.log('ForgotPasswordPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    console.log('Password reset request for:', email);
    // Dummy logic: Simulate sending reset link
    setMessage(`If an account with ${email} exists, a password reset link has been sent.`);
    toast({
      title: "Password Reset Link Sent",
      description: `If an account with ${email} exists, a password reset link has been sent.`,
      variant: "default", // Or 'success' if you have that variant
    });
    setEmail(''); // Clear field after submission
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <BrandingLogoDisplay appName="MyApp" logoUrl="https://via.placeholder.com/150x50?text=MyAppLogo" />
      <AuthFormContainer
        title="Forgot Your Password?"
        description="No worries! Enter your email below and we'll send you a link to reset it."
        className="mt-8 w-full max-w-md"
        footerContent={
          <p>
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {message && (
            <Alert variant="default" className="bg-green-50 border-green-300 text-green-700">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Check Your Email</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </span>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </div>
        </form>
      </AuthFormContainer>
    </div>
  );
};

export default ForgotPasswordPage;