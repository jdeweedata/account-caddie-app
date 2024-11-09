// app/api/zoho/auth/success/page.tsx
'use client';

export default function AuthSuccess() {
  // Close the window and send the code back to the parent
  const sendCodeToParent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && window.opener) {
      window.opener.postMessage({ code }, window.location.origin);
    }
  };

  // Execute when the page loads
  React.useEffect(() => {
    sendCodeToParent();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Authorization Successful!</h1>
      <p>You can close this window now.</p>
    </div>
  );
}