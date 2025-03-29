/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(v) || 'Please enter a valid email address';
  },
  required: (v: unknown) => !!v || 'This field is required',
};

export const validateEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
