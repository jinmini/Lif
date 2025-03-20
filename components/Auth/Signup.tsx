"use client";

import React from 'react';
import { useSignup } from '@/hooks/useSignup';
import SignupForm from './SignupForm';

const Signup = () => {
  const {
    data,
    error,
    isLoading,
    handleChange,
    handleSubmit,
  } = useSignup();

  return (
    <SignupForm
      data={data}
      error={error}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
