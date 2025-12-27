"use client";
import React, { useState } from "react";
import Welcome from "../../components/Welcome";

function Register() {
  const [step, setStep] = useState(1);
  return <div>{step == 1 ? <Welcome  nextStep={setStep}/> : <Register />}</div>;
}

export default Register;
