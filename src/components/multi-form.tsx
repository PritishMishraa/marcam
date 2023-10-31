"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MultiFormDialog: React.FC = () => {
  const [activeForm, setActiveForm] = useState(0);
  const forms = [
    // Define your forms here
    <Form1 />,
    <Form2 />,
    <Form3 />,
  ];

  const handleNext = () => {
    setActiveForm((prevForm) =>
      prevForm < forms.length - 1 ? prevForm + 1 : prevForm
    );
  };

  const handlePrev = () => {
    setActiveForm((prevForm) => (prevForm > 0 ? prevForm - 1 : prevForm));
  };

  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Multi-Step Form</DialogTitle>
        </DialogHeader>
        {forms[activeForm]}
        <DialogFooter>
          {activeForm > 0 && (
            <button
              onClick={handlePrev}
              className="bg-blue-500 text-white rounded-md px-4 py-2 m-2"
            >
              Prev
            </button>
          )}
          {activeForm < forms.length - 1 && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white rounded-md px-4 py-2 m-2"
            >
              Next
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Form1: React.FC = () => {
  // Define the first form content here
  return (
    <div>
      <h1>Form 1</h1>
      {/* Add form fields and inputs */}
    </div>
  );
};

const Form2: React.FC = () => {
  // Define the second form content here
  return (
    <div>
      <h1>Form 2</h1>
      {/* Add form fields and inputs */}
    </div>
  );
};

const Form3: React.FC = () => {
  // Define the third form content here
  return (
    <div>
      <h1>Form 3</h1>
      {/* Add form fields and inputs */}
    </div>
  );
};

export default MultiFormDialog;
