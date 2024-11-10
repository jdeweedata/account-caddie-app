export default function AuthSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Authentication Successful
        </h1>
        <p className="text-gray-600">
          You can now close this window and return to the application.
        </p>
      </div>
    </div>
  );
} 