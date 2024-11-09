export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleZohoError(error: any): never {
  if (error.code === 'AUTHENTICATION_FAILURE') {
    throw new APIError('Authentication failed. Please try again.', 401, error.code)
  }
  
  if (error.code === 'INVALID_TOKEN') {
    throw new APIError('Invalid token. Please refresh and try again.', 401, error.code)
  }

  if (error.code === 'INVALID_DATA') {
    throw new APIError('Invalid data provided. Please check your input.', 400, error.code)
  }

  throw new APIError(
    error.message || 'An unexpected error occurred',
    error.status || 500,
    error.code
  )
}