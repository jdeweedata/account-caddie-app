import { NextResponse } from 'next/server';

export async function GET() {
  // Return HTML for a test form
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Calendar Test</title>
        <style>
          body { font-family: Arial; max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
          .form-group { margin-bottom: 1rem; }
          label { display: block; margin-bottom: 0.5rem; }
          input, textarea { width: 100%; padding: 0.5rem; }
          button { padding: 0.5rem 1rem; background: #0070f3; color: white; border: none; border-radius: 4px; }
          #response { margin-top: 1rem; padding: 1rem; background: #f0f0f0; }
        </style>
      </head>
      <body>
        <h1>Calendar Scheduling Test</h1>
        <form id="calendarForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" required value="Test User">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" required value="test@example.com">
          </div>
          <div class="form-group">
            <label for="date">Date:</label>
            <input type="date" id="date" required>
          </div>
          <div class="form-group">
            <label for="time">Time:</label>
            <input type="time" id="time" required>
          </div>
          <div class="form-group">
            <label for="reason">Reason:</label>
            <textarea id="reason">Test Consultation</textarea>
          </div>
          <button type="submit">Schedule Appointment</button>
        </form>
        <div id="response"></div>

        <script>
          document.getElementById('calendarForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = 'Submitting...';
            
            try {
              const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                reason: document.getElementById('reason').value
              };

              console.log('Submitting data:', formData);

              const response = await fetch('/api/zoho/calendar/schedule', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              });

              const data = await response.json();
              console.log('Response:', data);
              
              responseDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
              
              if (!response.ok) {
                throw new Error(data.error || 'Failed to schedule');
              }
            } catch (error) {
              console.error('Full error:', error);
              responseDiv.innerHTML = 'Error: ' + error.message;
            }
          });

          // Set default date to tomorrow
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
          
          // Set default time to 10:00
          document.getElementById('time').value = '10:00';
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 