# Send Emails with Attachments in a Next.js App
## 0 Prerequisites
You’ll need Node.js version 10.13 or later. This example uses npx and npm for node package management.

Run the following script in your terminal to bootstrap a Next.js app

```bash
npx create-next-app@latest resend-attachment-example
```
Select your options for scaffolding. This example uses Typescript, ESLint, and App Router.


Preview the boilerplate application on `localhost:3000`
```bash
cd resend-attachment-example
npm run dev
```

## 1 Install Resend
Install Resend Node.js SDK into your project
```bash
npm install resend
```

Create an [API key](https://resend.com/api-keys) and add it to an `.env` file in the project root.

```bash
RESEND_API_KEY=tHiS_iS_yOuR_kEy
```

## 2 Create Email Template
Add a `components` folder to the app and create a `email-template.tsx` file with this example code.

```js
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
```

## 2.5 Optional: Add React Email Components
This project uses `Html`, `Head`, `Font`, and `Text` [React Email Components](https://github.com/resendlabs/react-email/tree/main)

Install React Email Components: 
```bash
npm install @react-email/html @react-email/head @react-email/text @react-email/font -E
```

Use these components to customize the email template, make sure to include an import statement.

```js
import * as React from 'react';
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";
import { Text } from "@react-email/text";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <div>
        <h1>Hey {firstName}!</h1>
        <h2>It is great to be seen, in a world full of spam!</h3>
        <Text>
          There is so much to say about the integrity of a nicely crafted email.
        </Text>
      </div>
  </Html>
);
```

## 3 Add API Route
Create your API route by adding `route.ts` to `api/send`. Notice that the file uses your API key and Email Template.

```js
import { EmailTemplate } from '../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello Test',
      react: EmailTemplate({ firstName: 'Heather' }),
      text: 'test'
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
```

## 4 Add Attachments
Next, add attachments to your project and route. This example encodes a PDF and CSV file added to the root `public/static` folder. 

```js
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
      subject: 'Hello Test',
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
      react: EmailTemplate({ firstName: 'Heather' }),
      text: 'test'
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
```

## 5 Send and Receive Test Email
Now that the route and email template are added, start the project with `npm run dev`.

In another terminal, run a curl command to test the endpoint!
`curl --location --request POST 'http://localhost:3000/api/send'`

If successfully sent, an `id` will be returned. View your sent emails, logs, and more at [Resend](https://resend.com/overview).

## Learn More
For more information, look through the [documentation](https://resend.com/docs/introduction) and sample projects on [Github](https://github.com/resendlabs). 

Please join the Resend [Discord](https://react.email/discord) to connect with the community. Happy emailing!
