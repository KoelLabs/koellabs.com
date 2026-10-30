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

function parseForm(req: NextApiRequest) {
  return new Promise<formidable.Fields>((resolve, reject) => {
    new formidable.IncomingForm().parse(req, (err, fields) =>
      err ? reject(err) : resolve(fields),
    );
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  // verify the request parameters
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

  // verify the reCaptcha token (secret goes in the body so it never ends up in URLs or logs)
  const ip = req.headers['x-forwarded-for'];
  const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_PRIVATE_KEY!,
      response: token,
      ...(typeof ip === 'string' ? { remoteip: ip.split(',')[0].trim() } : {}),
    }),
  });
  const verificationJson = await verification.json();
  if (!verificationJson['success']) {
    res
      .status(403)
      .json({ message: 'Failed to verify because ' + verificationJson['error-codes'] });
    return;
  }

  // parse the form data
  let fields: formidable.Fields;
  try {
    fields = await parseForm(req);
  } catch {
    res.status(400).json({ message: 'Failed to parse form data' });
    return;
  }
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    // formidable returns every field as an array of values
    for (const v of Array.isArray(value) ? value : [value]) {
      if (v !== undefined) formData.append(key, String(v));
    }
  }

  // submit the form and only report success if Google accepted it
  try {
    const submission = await fetch(formURL, { method: 'POST', body: formData });
    // a closed form can still answer 200 with a "no longer accepting responses" page
    const closed = (await submission.text()).includes('no longer accepting responses');
    if (!submission.ok || closed) {
      console.error(
        `Google Form "${formName}" rejected the submission (status ${submission.status}${closed ? ', form is closed' : ''})`,
      );
      res.status(502).json({ message: 'The form did not accept the submission' });
      return;
    }
  } catch (err) {
    console.error(`Could not reach Google Form "${formName}"`, err);
    res.status(502).json({ message: 'Could not reach the form' });
    return;
  }
  res.status(200).json({ message: 'Success' });
}
