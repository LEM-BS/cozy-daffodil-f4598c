const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  let data = req.body || {};
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch (e) { data = {}; }
  }

  const required = ['name', 'email', 'survey-type'];
  if ('contact' in data) required.push('contact');
  if ('phone' in data) required.push('phone');
  if ('postcode' in data) required.push('postcode');
  if ('bedrooms' in data) required.push('bedrooms');
  if ('contact-method' in data) required.push('contact-method');

  const missing = required.filter(f => !data[f]);
  if (missing.length) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: `Missing fields: ${missing.join(', ')}` }));
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const from = `Website Enquiry <no-reply@${process.env.MAIL_DOMAIN}>`;
  const to = process.env.CONTACT_TO;
  const subject = `New enquiry from ${data.name}`;
  const text = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    await transporter.sendMail({ from, to, subject, text });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Email sent' }));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to send email' }));
  }
};
