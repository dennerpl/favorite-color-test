const unauthorizedErrorHandler = async (error: any, instance: any) => {
  if (error.response.status === 401) {
    //TODO: limpar a sessão
  }

  return Promise.reject(error);
};

export default unauthorizedErrorHandler;
