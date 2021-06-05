const endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:";
const api_key = "AIzaSyDuMzWJCOWzgHPLr2YJIVsuUUONb7GdeC0";
const SIGN_IN_URL = endpoint + "signInWithPassword?key=" + api_key;
const SIGN_UP_URL = endpoint + "signUp?key=" + api_key;

// FIXME: Values: any
export const loginApi = async (values: any) => {
  const enteredEmail = values.emailAddress;
  const enteredPassword = values.password;

  const response = await fetch(SIGN_IN_URL, {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch data.");
  } else {
    alert("Login Successful");
  }
};

export const signUpApi = async (values: any) => {
  const enteredEmail = values.emailAddress;
  const enteredPassword = values.password;

  const response = await fetch(SIGN_UP_URL, {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch data.");
  } else {
    alert("Registration Successful");
  }
};
