import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AuthFormContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  footerContent?: React.ReactNode; // For links like "Forgot password?" or "Don't have an account?"
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  description,
  children,
  className = 'w-full max-w-md',
  footerContent,
}) => {
  console.log("Rendering AuthFormContainer with title:", title);
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children}
        </div>
      </CardContent>
      {footerContent && (
        <div className="p-6 pt-0 text-center text-sm text-gray-600">
          {footerContent}
        </div>
      )}
    </Card>
  );
};

export default AuthFormContainer;