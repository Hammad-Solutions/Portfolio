import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER || "m6784104@gmail.com";
    const pass = process.env.SMTP_PASSWORD;
    const to = process.env.CONTACT_RECEIVER_EMAIL || "m6784104@gmail.com";

    // If SMTP_PASSWORD is not configured, we'll log it and return a helpful error
    if (!pass) {
      console.error("Nodemailer error: SMTP_PASSWORD is not configured in environment variables.");
      return NextResponse.json(
        { error: "SMTP_PASSWORD environment variable is not configured. Please add it to your .env.local or Vercel settings." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports (like 587)
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`, // Must be sent from the authenticated SMTP user
      to,
      replyTo: email, // Allows replying directly to the person who filled the contact form
      subject: `New Message from ${name} via Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1f2937; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #10B981; font-size: 20px; font-weight: bold; margin-bottom: 24px; border-bottom: 2px solid #10B981; padding-bottom: 8px;">
            New Message from Portfolio
          </h2>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #6b7280; letter-spacing: 0.05em;">Sender Name</p>
            <p style="margin: 0; font-size: 15px; font-weight: 500; color: #111827;">${name}</p>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #6b7280; letter-spacing: 0.05em;">Email Address</p>
            <p style="margin: 0; font-size: 15px; font-weight: 500; color: #10B981;"><a href="mailto:${email}" style="color: #10B981; text-decoration: none;">${email}</a></p>
          </div>
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #6b7280; letter-spacing: 0.05em;">Message</p>
            <div style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #10B981; border-radius: 6px; font-size: 14px; color: #374151; white-space: pre-wrap; line-height: 1.5; margin: 0;">${message}</div>
          </div>
          <div style="text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 32px;">
            This email was sent directly from your portfolio contact form.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
