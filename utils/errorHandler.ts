// utils/errorHandler.ts
export const handleFlowError = async (error, context) => {
  if (error.code === "TOKEN_EXPIRED") {
    await refreshZohoToken();
    return retryOperation(context);
  }
  
  logError({
    source: "ZohoFlow",
    error: error,
    context: context
  });
  
  return {
    success: false,
    error: error.message
  };
}
