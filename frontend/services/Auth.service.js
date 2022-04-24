export async function signin(data) {
  const response = {
    jwt: "abc",
    user: {
      name: "arun",
    },
    statusCode: 200,
  };

  if (data.email == "a") {
    return {
      errorMessage: "Email error",
      statusCode: 400,
    };
  }
  return response;
}
export async function signup(data) {
  const response = {
    jwt: "abc",
    user: {
      name: "arun",
    },
    statusCode: 200,
  };

  if (data.email == "a") {
    return {
      errorMessage: "Email error",
      statusCode: 400,
    };
  }
  return response;
}
