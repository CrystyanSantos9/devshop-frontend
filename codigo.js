onSubmit: async (values) => {
  const data = await auth(values);
  if (data && data.data) {
    localStorage.setItem("refreshToken", data.data.auth.refreshToken);
    localStorage.setItem("accessToken", data.data.auth.accessToken);
    router.push("/dashboard");
  } else {
    console.log("error");
  }
};
