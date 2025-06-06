import React from 'react';
import { ShieldCheck } from 'lucide-react'; // Example icon

interface BrandingLogoDisplayProps {
  appName?: string;
  logoUrl?: string; // Optional: if you have an image logo
  className?: string;
}

const BrandingLogoDisplay: React.FC<BrandingLogoDisplayProps> = ({
  appName = "YourApp",
  logoUrl,
  className = '',
}) => {
  console.log("Rendering BrandingLogoDisplay");
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {logoUrl ? (
        <img src={logoUrl} alt={`${appName} Logo`} className="h-12 w-auto mb-2" />
      ) : (
        <ShieldCheck className="h-12 w-12 text-blue-600 mb-2" /> // Default icon
      )}
      <h1 className="text-2xl font-semibold text-gray-800">{appName}</h1>
      {/* Optional: Add a tagline below the app name if needed */}
      {/* <p className="text-sm text-gray-500 mt-1">Your secure portal</p> */}
    </div>
  );
};

export default BrandingLogoDisplay;