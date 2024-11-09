// pages/api/zoho/webhook.ts
export default async function handler(req, res) {
  const { type, data } = req.body;
  
  switch(type) {
    case "CONSULTATION_BOOKED":
      await handleConsultationBooked(data);
      break;
    case "MEETING_COMPLETED":
      await handleMeetingCompleted(data);
      break;
  }
  
  res.status(200).json({ success: true });
}