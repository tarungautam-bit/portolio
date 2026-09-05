import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactApi } from "../api/ContactApi";

const useContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [apiError, setApiError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const submitContactForm = async (data) => {
    setApiError("");
    setApiErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const res = await contactApi(data);

      setSuccessMessage(
        res?.message || "Your message has been sent successfully."
      );

      reset();
    } catch (e) {
      if (e.response?.status === 422) {
        const errors = e.response?.data?.errors || {};

        setApiErrors(errors);

        setApiError(
          e.response?.data?.message ||
            "Please check the form and correct the errors."
        );
      } else {
        setApiError(
          e.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    submitContactForm,
    apiError,
    apiErrors,
    isSubmitting,
    successMessage,
  };
};

export default useContact;