import { Resend } from "resend";
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

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Email service is not configured. Please add RESEND_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",   // free Resend sender (no domain needed)
      to: ["m6784104@gmail.com"],
      replyTo: email,
      subject: `New Message from ${name} via Portfolio`,
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
            <p style="margin: 0; font-size: 15px; font-weight: 500;"><a href="mailto:${email}" style="color: #10B981; text-decoration: none;">${email}</a></p>
          </div>
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; font-weight: bold; color: #6b7280; letter-spacing: 0.05em;">Message</p>
            <div style="padding: 16px; background-color: #f9fafb; border-left: 4px solid #10B981; border-radius: 6px; font-size: 14px; color: #374151; white-space: pre-wrap; line-height: 1.5; margin: 0;">${message}</div>
          </div>
          <div style="text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 32px;">
            Sent from your portfolio contact form at <strong>m6784104@gmail.com</strong>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send email.";
    console.error("Contact route error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
