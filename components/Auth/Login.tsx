"use client";

import React from 'react';
import { useLogin } from '@/hooks/useLogin';
import LoginForm from './LoginForm';

const Login = () => {
  const { 
    id, 
    password, 
    error, 
    success, 
    isLoading, 
    setId, 
    setPassword, 
    handleLogin 
  } = useLogin();

  return (
    <LoginForm
      id={id}
      password={password}
      error={error}
      success={success}
      isLoading={isLoading}
      setId={setId}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default Login; 