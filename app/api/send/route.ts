import { EmailTemplate } from '../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import path from 'path';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);

async function bufferFile(fileName: string) {
    return await fs.promises.readFile(
        path.join(process.cwd(), 'public', 'static', fileName)
    );
}

export async function POST() {
  try {
    const pdfBuffer = await bufferFile('sample.pdf');
    const csvBuffer = await bufferFile('sample2.csv');

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello World',
      attachments: [
        {
          content: pdfBuffer,
          filename: 'sample.pdf',
        },
        {
          content: csvBuffer,
          filename: 'sample2.csv'
        }
      ],
      react: EmailTemplate({ firstName: 'H' }),
      text: 'test'
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}