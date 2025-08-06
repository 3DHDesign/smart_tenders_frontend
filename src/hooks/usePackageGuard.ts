// src/hooks/usePackageGuard.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';

interface PackageGuardResult {
  isReady: boolean;
  canAccess: boolean;
}

export const usePackageGuard = (): PackageGuardResult => {
  const navigate = useNavigate();
  const { isLoggedIn, isPackageActive, isLoading: authLoading } = useAuthStore();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isLoggedIn) {
      toast.warn("Please log in to view this content.");
      navigate('/login');
      return;
    }

    if (!isPackageActive) {
      toast.info("Please activate your package to view tender details.");
      navigate('/dashboard');
    }
  }, [authLoading, isLoggedIn, isPackageActive, navigate]);

  const isReady = !authLoading;
  const canAccess = isLoggedIn && isPackageActive;

  return { isReady, canAccess };
};