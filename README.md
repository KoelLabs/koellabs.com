![The Template](https://github.com/digitalRM/FOYM-Template/assets/70782025/a7711b85-544e-4cd2-93cf-86ba294b9d02)

Template Series - Name #
---
This is a base Next.JS build preloaded with Shadcn/UI and a file structure system used for FOYM templates.

![Website Image](https://github.com/digitalRM/FOYM-Template/assets/70782025/95559860-79e0-4033-b128-585cdd2465d1)

Personal Note - Ruslan

Getting Started
---

To get a local copy up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- An IDE

### Installation

Clone the repository

```bash
git clone 
```

Install required packages

```bash
npm install
```

Customize the entire website across all the sections inside the `components/sections` folder
```js


```

There are also important files to edit in the `components/ui` folder. They are all marked with 1 in the front. 
```js

```

Delete Banner in `app/layout.js`

```js
// Delete this import below when you are ready to remove the banner
import Banner from "@/components/sections/999 - banner";

{/* This is the banner for the FOYM website. Feel free to delete this! */}
<Banner />
```
Delete Banner from the `components/sections` folder
```js
999 - banner.jsx
```

Customize your metadata in `app/layout.js`
```js
// This is the metadata for the website. Change the values to match your website. Upload the openGraph.png to your public folder
export const metadata = {
  metadataBase: new URL(''),
  title: " - An FOYM Template",
  description: "",
  openGraph: {
    title: " - An FOYM Template",
    description: "",
    url: '',
    siteName: ' - An FOYM Template',
    // images: [
    //   {
    //     url: '/openGraph.png',
    //     width: 1600,
    //     height: 900,
    //     alt: 'An image on the the website\s name "Template - FOYM" and star like characters in the background pointing at the name',
    //   },
    // ], 
    locale: 'en_US',
    type: 'website',
  },
}
```

Run the development server

```bash
npm run dev
```

## Contact 

If you are having trouble setting this up, please feel free to contact me via the [foym](https://www.foym.org) website. 

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.


