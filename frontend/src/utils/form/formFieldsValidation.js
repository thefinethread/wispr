const errorMessage = (message = "", isValid = true) => ({ message, isValid });

const usernameCheck = (value) => {
  if (value?.trim() === "") {
    return errorMessage("Username is required", false);
  } else {
    return errorMessage();
  }
};

const emailCheck = (value) => {
  if (value?.trim() === "") {
    return errorMessage("Email is required", false);
  } else if (!value?.includes("@") || !value?.includes(".")) {
    return errorMessage("Email is invalid", false);
  } else {
    return errorMessage();
  }
};

const passwordCheck = (value) => {
  if (value?.trim() === "") {
    return errorMessage("Password is required", false);
  } else if (value?.trim()?.length < 4) {
    return errorMessage("Password must contain at least 4 characters", false);
  } else {
    return errorMessage();
  }
};

export { usernameCheck, emailCheck, passwordCheck };
