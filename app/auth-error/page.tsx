export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Failed
        </h1>
        <p className="text-gray-600">
          There was an error during authentication. Please try again or contact support.
        </p>
      </div>
    </div>
  );
} 