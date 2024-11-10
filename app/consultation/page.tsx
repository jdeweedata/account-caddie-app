import { ConsultationScheduler } from '@/components/ConsultationScheduler';

export default function ConsultationPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Schedule a Consultation</h1>
      <ConsultationScheduler />
    </div>
  );
} 