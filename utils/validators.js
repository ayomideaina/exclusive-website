export function validateEmailOrPhone(value) {
  if (!value.trim()) return "Email or phone number is required";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^\+?[0-9]{7,15}$/.test(value);
  if (!isEmail && !isPhone) return "Enter a valid email or phone number";
  return "";
}

export function validatePassword(value) {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  return "";
}

export function validateName(value) {
  if (!value.trim()) return "Name is required";
  if (value.trim().length < 2) return "Name is too short";
  return "";
}

