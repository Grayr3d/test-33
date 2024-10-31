import React from 'react';

export function PaymentTimeline() {
  const steps = [
    {
      step: '01',
      title: '10% Reservation deposit',
      description: 'Preparing architecture drawings for building permit'
    },
    {
      step: '02',
      title: '40% Payment',
      description: 'Signing contract & start production'
    },
    {
      step: '03',
      title: '40% Payment',
      description: 'Confirming shipping ordering transport'
    },
    {
      step: '04',
      title: '10% Final payment',
      description: 'Releasing shipment'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl">Payment and Production timeline</h3>
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.step} className="space-y-2">
            <div className="text-sm font-medium">{step.step}</div>
            <div className="text-sm font-medium">{step.title}</div>
            <div className="text-sm text-gray-500">{step.description}</div>
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        Note - Production will take 6-9 weeks to complete
      </div>
    </div>
  );
}