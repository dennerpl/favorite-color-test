const unauthorizedErrorHandler = async (error: any) => {
  if (error.response.status === 401) {
    localStorage.removeItem("favorite-color-token");
  }

  return Promise.reject(error);
};

export default unauthorizedErrorHandler;
