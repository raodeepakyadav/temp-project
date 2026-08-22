export function validateEmail(email) {
  if (!email || !email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
  return null;
}

export function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

export function validateRequired(value, fieldName = 'This field') {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateRollNumber(rollNo) {
  if (!rollNo || !rollNo.trim()) return 'Roll number is required';
  if (rollNo.trim().length < 4) return 'Roll number must be at least 4 characters';
  return null;
}
