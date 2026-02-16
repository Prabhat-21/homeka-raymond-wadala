export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzV6vCI9Ls7lqj2HVG-j0p9dBPB66YHu9tT1S37oIVjNESgN3WM2RKMJ_vCxyTUxJGM/exec";

  const data = {
    name: req.body.input_name || '',
    mobile: req.body.input_phone_no || '',
    email: req.body.input_email || '',
    form: req.body.onclick || 'Enquire Now',
    project: 'Raymond Wadala',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    url: req.headers.referer || ''
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return res.redirect(302, '/thank-you/');
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return res.redirect(302, '/thank-you/');
  }
}
