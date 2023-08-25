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
    <h2>It is great to be seen</h2>
    <h3>in a world full of spam!</h3>
    <Text>
      There is so much to say about the integrity of a nicely crafted email, yes?
    </Text>
  </div>
    </Html>
);