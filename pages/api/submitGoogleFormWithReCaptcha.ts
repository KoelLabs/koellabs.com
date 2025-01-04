// this endpoint submits one of the selected google forms with reCaptcha verification
// we explicitly define the form URLs here to not let the client pass any URL and to
// keep the underlying form URLs hidden (otherwise a bad actor could spam the form directly thus bypassing reCaptcha)

import { NextApiRequest, NextApiResponse } from 'next';
import * as formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const FORMS = {
  contact: process.env.CONTACT_FORM_URL!,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // return new Response(JSON.stringify({ message: 'Only POST requests allowed' }), { status: 405 });
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  // verify the request parameters
  const form = new formidable.IncomingForm();
  const ip = req.headers['x-forwarded-for'];
  const formName = req.query.formName as string;
  const token = req.query.token as string;
  if (!formName || !FORMS[formName]) {
    res.status(400).json({ message: 'FormName not found' });
    return;
  }
  if (!token) {
    res.status(400).json({ message: 'Token not found' });
    return;
  }
  const formURL = FORMS[formName];
  const secretKey: string = process.env.RECAPTCHA_PRIVATE_KEY!;

  // verify the reCaptcha token
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${ip}`,
    {
      method: 'POST',
    },
  );
  console.log({
    secret: secretKey,
    response: token,
    remoteip: ip,
  });
  const responseJson = await response.json();
  if (!responseJson['success']) {
    res.status(403).json({ message: 'Failed to verify because ' + responseJson['error-codes'] });
  }

  // parse the form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({ message: 'Failed to parse form data' });
      return;
    }
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key]);
    });
    Object.keys(files).forEach(key => {
      formData.append(key, files[key]);
    });

    // submit the form
    fetch(formURL, {
      method: 'POST',
      body: formData,
    });
    res.status(200).json({ message: 'Success' });
  });
}
