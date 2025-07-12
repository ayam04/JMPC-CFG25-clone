// components/VolunteerCard.js
import { useState } from 'react';

function VolunteerCard({ volunteer }) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendSMS = async () => {
    setSending(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: volunteer.phoneNumber,
          message: message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(`SMS sent successfully! SID: ${data.sid}`);
        setMessage(''); // Clear the message input
      } else {
        setErrorMessage(`Failed to send SMS: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold">{volunteer.name}</h3>
      <p>Phone: {volunteer.phoneNumber}</p>
      <p>Email: {volunteer.email}</p>
      {/* other volunteer details */}

      <div className="mt-4">
        <label htmlFor="smsMessage" className="block text-sm font-medium text-gray-700">
          Message:
        </label>
        <textarea
          id="smsMessage"
          className="mt-1 p-2 border rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-50"
          onClick={handleSendSMS}
          disabled={sending || !message}
        >
          {sending ? 'Sending...' : 'Send SMS'}
        </button>
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default VolunteerCard;