import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BrandingLogoDisplay from '@/components/auth/BrandingLogoDisplay';
import AuthFormContainer from '@/components/auth/AuthFormContainer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = searchParams.get('token');

  console.log('ResetPasswordPage loaded, token:', token);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
      toast({
        title: "Invalid Link",
        description: "The password reset link is invalid or has expired.",
        variant: "destructive",
      });
    }
  }, [token, toast]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!token) {
        setError("Cannot reset password without a valid token.");
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    console.log('Password reset attempt for token:', token, 'with new password.');
    // Dummy logic: Simulate password reset
    setMessage('Your password has been successfully reset. You can now login with your new password.');
    toast({
      title: "Password Reset Successful",
      description: "You can now log in with your new password.",
    });
    // Wait a bit before redirecting to allow user to read message
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <BrandingLogoDisplay appName="MyApp" logoUrl="https://via.placeholder.com/150x50?text=MyAppLogo" />
      <AuthFormContainer
        title="Set Your New Password"
        description="Choose a strong password to secure your account."
        className="mt-8 w-full max-w-md"
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
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {!token && error && (
             <div className="text-center">
                <Link to="/forgot-password">
                    <Button variant="link">Request a new reset link</Button>
                </Link>
             </div>
          )}
          {token && (
            <>
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="mt-1 relative">
                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </span>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-10 pr-10"
                  />
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full" disabled={!!message}>
                  Reset Password
                </Button>
              </div>
            </>
          )}
        </form>
      </AuthFormContainer>
    </div>
  );
};

export default ResetPasswordPage;