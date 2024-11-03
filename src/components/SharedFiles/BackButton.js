// src/common/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import styles from './BackButton.module.css';

function BackButton({ label = 'Go Back' }) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>{label}</button>;
}

export default BackButton;