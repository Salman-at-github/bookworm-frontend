import { useState } from "react";

export const useFormValidation=(initialState, validationRules)=> {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const fieldRules = validationRules[fieldName];
    let fieldError = '';

    if (fieldRules) {
      for (const rule of fieldRules) {
        if (rule.condition(value, formData)) {
          fieldError = rule.message;
          break;
        }
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: fieldError }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();

    const newErrors = {};
    for (const fieldName in validationRules) {
      const value = formData[fieldName];
      validateField(fieldName, value);
      if (errors[fieldName]) {
        newErrors[fieldName] = errors[fieldName];
      }
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}

