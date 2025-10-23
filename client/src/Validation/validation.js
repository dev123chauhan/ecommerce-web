export const validateUsername = (username) => {
  if (!username) return { isValid: false, message: "Name is required" };
  if (username.length < 2)
    return { isValid: false, message: "Name must be at least 2 characters long" };
  if (username.length > 50)
    return { isValid: false, message: "Name cannot exceed 50 characters" };
  return { isValid: true, message: "" };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { isValid: false, message: "Email is required" };
  if (!emailRegex.test(email))
    return { isValid: false, message: "Please enter a valid email address" };
  return { isValid: true, message: "" };
};

export const validatePassword = (password) => {
  if (!password) return { isValid: false, message: "Password is required" };
  if (password.length < 8)
    return { isValid: false, message: "Password must be at least 8 characters long" };

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
    return {
      isValid: false,
      message:
        "Password must include uppercase, lowercase, number, and special character",
    };
  }

  return { isValid: true, message: "" };
};
export const validateName = (name) => {
  if (!name) return { isValid: false, message: "Name is required" };
  if (name.length < 2)
    return { isValid: false, message: "Name must be at least 2 characters long" };
  if (!/^[a-zA-Z\s]+$/.test(name))
    return { isValid: false, message: "Name can only contain letters" };
  return { isValid: true, message: "" };
};

export const validateMessage = (message) => {
  if (!message) return { isValid: false, message: "Message is required" };
  if (message.length < 10)
    return { isValid: false, message: "Message must be at least 10 characters long" };
  return { isValid: true, message: "" };
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phone) return { isValid: false, message: "Phone Number is required" };
  if (phone.length > 10)
    return { isValid: false, message: "Phone number cannot exceed 10 digits" };
  if (phone.length < 10)
    return { isValid: false, message: "Phone number must be 10 digits" };
  if (!phoneRegex.test(phone))
    return { isValid: false, message: "Please enter a valid Indian phone number" };

  return { isValid: true, message: "" };
};

export const validateStreetAddress = (address) => {
  if (!address) return { isValid: false, message: "Street Address is required" };
  if (address.length < 5)
    return {
      isValid: false,
      message: "Street Address must be at least 5 characters long",
    };
  return { isValid: true, message: "" };
};

export const validateTownCity = (town) => {
  if (!town) return { isValid: false, message: "Town/City is required" };
  if (town.length < 2)
    return {
      isValid: false,
      message: "Town/City must be at least 2 characters long",
    };
  return { isValid: true, message: "" };
};

export const validateFirstName = (name) => {
  if (!name) return { isValid: false, message: "First Name is required" };
  if (name.length < 2)
    return {
      isValid: false,
      message: "First Name must be at least 2 characters long",
    };
  return { isValid: true, message: "" };
};