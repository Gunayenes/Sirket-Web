import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${data.subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr/>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  });
}

export async function sendQuoteNotification(data: {
  name: string;
  email: string;
  company?: string;
  description: string;
  services: string[];
  budget?: string;
}) {
  await transporter.sendMail({
    from: `"Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Quote Request from ${data.name}`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
      <p><strong>Services:</strong> ${data.services.join(', ')}</p>
      <hr/>
      <p>${data.description.replace(/\n/g, '<br>')}</p>
    `,
  });
}

export async function sendContactConfirmation(to: string, name: string) {
  await transporter.sendMail({
    from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: `We received your message`,
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for reaching out. We have received your message and will get back to you within 1-2 business days.</p>
      <p>Best regards,<br/>${process.env.COMPANY_NAME}</p>
    `,
  });
}
