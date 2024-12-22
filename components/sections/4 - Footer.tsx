const navigation = {
  product: [{ name: 'Join Waitlist', href: '#waitlist' }],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: 'mailto:info@koellabs.com' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: '#',
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: props => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-md border border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <a href="/" className="text-2xl font-semibold  tracking-[-0.04em] h-fit w-fit">
            <svg
              className="h-10 w-10 -mt-1.5 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              width="870"
              height="870"
              fill="none"
              viewBox="0 0 870 870"
            >
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint0_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint1_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint2_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint3_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="671.179"
                y="403"
                fill="url(#paint4_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(90 671.179 403)"
              ></rect>
              <rect
                width="214"
                height="429"
                x="652.67"
                y="662.406"
                fill="url(#paint5_linear_1691_806)"
                fillOpacity="0.6"
                rx="107"
                transform="rotate(135 652.67 662.406)"
              ></rect>
              <path
                fill="#000"
                d="M283.332 374.002c-55.404-20.556-106.308-146.637-104.047-152.731 2.261-6.094 123.083-68.461 178.487-47.905 55.404 20.556 83.654 82.134 63.098 137.538-20.556 55.404-82.134 83.654-137.538 63.098z"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1691_806"
                  x1="778.179"
                  x2="778.179"
                  y1="403"
                  y2="832"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1691_806"
                  x1="759.67"
                  x2="759.67"
                  y1="662.406"
                  y2="1091.41"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#317EC5"></stop>
                  <stop offset="1"></stop>
                </linearGradient>
              </defs>
            </svg>
            Koel{' '}
            <span className=" -ml-px text-transparent bg-clip-text bg-gradient-to-br from-black via-sky-950 to-sky-500">
              Labs
            </span>
          </a>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 grid-flow-col">
            <div className="md:grid md:grid-cols-2 md:gap-8 ">
              <div></div>
              <div className="">
                <h3 className="text-sm/6 font-semibold text-neutral-900">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-neutral-600 hover:text-neutral-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-neutral-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-neutral-600 hover:text-neutral-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-neutral-900">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-neutral-600 hover:text-neutral-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-16 border-t border-neutral-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-neutral-900">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm/6 text-neutral-600">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-neutral-900 outline outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div> */}
        <div className="mt-12 border-y border-neutral-900/10 py-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-neutral-800"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-neutral-600 md:order-1 md:mt-0">
            &copy; 2024 Koel Labs. All rights reserved.
          </p>
        </div>
        <div className="max-h-[224px] h-full w-full overflow-hidden bg-gradient-to-b relative">
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            className="mt-10 opacity-15"
            viewBox="0 0 911 164"
          >
            <path
              className="path-trace"
              stroke="#878787"
              d="m907.047 75.174-30.484 1.876q-.782-3.908-3.361-7.035-2.58-3.204-6.8-5.08-4.143-1.954-9.927-1.954-7.738 0-13.054 3.282-5.315 3.205-5.315 8.599 0 4.299 3.439 7.269t11.803 4.768l21.73 4.377q17.509 3.596 26.107 11.568 8.598 7.974 8.598 20.948 0 11.803-6.957 20.714-6.879 8.91-18.916 13.913-11.958 4.924-27.592 4.924-23.84 0-37.987-9.926-14.07-10.005-16.493-27.202l32.751-1.719q1.485 7.27 7.191 11.099 5.706 3.752 14.616 3.752 8.755 0 14.07-3.361 5.393-3.44 5.472-8.833-.079-4.533-3.831-7.425-3.751-2.97-11.568-4.534l-20.792-4.142q-17.586-3.518-26.185-12.194-8.519-8.677-8.519-22.12 0-11.57 6.253-19.932 6.331-8.364 17.743-12.897 11.49-4.534 26.888-4.534q22.746 0 35.8 9.614 13.131 9.615 15.32 26.185ZM681.051 160.998V.918h33.298v60.186h1.016q2.188-4.845 6.331-9.848 4.221-5.08 10.943-8.442 6.801-3.44 16.884-3.44 13.131 0 24.231 6.88 11.099 6.8 17.743 20.556 6.644 13.68 6.644 34.315 0 20.087-6.488 33.923-6.41 13.757-17.509 20.87-11.02 7.034-24.699 7.034-9.693 0-16.493-3.204-6.723-3.205-11.021-8.051-4.3-4.924-6.566-9.927h-1.485v19.228zm32.594-60.03q0 10.709 2.971 18.681t8.598 12.429q5.628 4.377 13.678 4.377 8.13 0 13.757-4.456 5.628-4.533 8.52-12.506 2.97-8.05 2.97-18.525 0-10.395-2.892-18.29t-8.52-12.35q-5.627-4.456-13.835-4.456-8.129 0-13.757 4.3-5.549 4.298-8.519 12.193-2.971 7.895-2.971 18.603ZM600.186 163.265q-11.49 0-20.479-3.986-8.99-4.065-14.226-11.959-5.159-7.972-5.159-19.854 0-10.005 3.674-16.805t10.005-10.943 14.382-6.253q8.13-2.11 17.04-2.97 10.474-1.094 16.884-2.033 6.41-1.016 9.301-2.97t2.892-5.784v-.47q0-7.425-4.69-11.49-4.611-4.064-13.131-4.064-8.99 0-14.304 3.986-5.316 3.909-7.035 9.85l-30.797-2.502q2.345-10.942 9.224-18.916 6.878-8.05 17.743-12.35 10.943-4.377 25.325-4.377q10.005 0 19.15 2.345 9.224 2.344 16.337 7.27 7.191 4.923 11.333 12.662 4.143 7.66 4.143 18.368V161H636.22V144.35h-.938q-2.892 5.627-7.738 9.926-4.846 4.221-11.647 6.644-6.8 2.345-15.711 2.345Zm9.536-22.98q7.347 0 12.975-2.892 5.628-2.97 8.833-7.973 3.204-5.002 3.205-11.334v-12.74q-1.565 1.015-4.299 1.876a79 79 0 0 1-6.019 1.485q-3.361.625-6.722 1.172-3.361.469-6.097.86-5.862.86-10.24 2.736-4.377 1.875-6.8 5.08-2.423 3.127-2.423 7.817 0 6.8 4.924 10.396 5.003 3.517 12.663 3.517ZM454.896 160.998V.918h33.846v132.176h68.628v27.904zM403.067.918v160.08H369.77V.918zM361.245 109.488v-9.145q0-15.32-4.299-26.732-4.299-11.49-12.037-19.072-7.66-7.582-17.978-11.334-10.24-3.83-22.121-3.83-17.665 0-30.796 7.816Q260.96 55.007 253.769 69t-7.191 32.517q0 18.993 7.191 32.907 7.192 13.834 20.479 21.417 13.366 7.503 31.891 7.503q14.851 0 26.185-4.533 11.412-4.612 18.603-12.819 7.27-8.285 9.615-19.385l-30.797-2.032q-1.72 4.534-5.003 7.66-3.282 3.126-7.894 4.69-4.612 1.563-10.162 1.563-8.363 0-14.46-3.517-6.096-3.518-9.458-10.005-3.282-6.487-3.283-15.399zm0 0h-81.76m.032-20.635h50.384q0-7.191-3.126-12.74t-8.677-8.677q-5.47-3.205-12.74-3.205-7.582 0-13.445 3.518-5.784 3.439-9.067 9.301c-2.188 3.856-3.277 7.061-3.329 11.803ZM183.889 163.343q-18.212 0-31.5-7.738-13.21-7.817-20.401-21.729-7.191-13.992-7.191-32.439 0-18.602 7.191-32.516 7.19-13.991 20.401-21.73 13.288-7.815 31.5-7.816 18.213 0 31.422 7.816 13.288 7.739 20.479 21.73 7.191 13.914 7.191 32.516 0 18.447-7.191 32.439-7.19 13.912-20.479 21.729-13.209 7.738-31.422 7.738Zm.156-25.794q8.286 0 13.835-4.69 5.55-4.767 8.364-12.975 2.892-8.207 2.892-18.681t-2.892-18.681q-2.814-8.208-8.364-12.976-5.549-4.767-13.835-4.768-8.363 0-14.069 4.768-5.628 4.769-8.52 12.976-2.814 8.206-2.814 18.681t2.814 18.681q2.892 8.208 8.52 12.975 5.706 4.69 14.069 4.69Z"
            ></path>
            <path
              className="path-trace"
              stroke="#878787"
              d="M.531 160.998V.918h33.845V71.5h2.11L94.095.918h40.567L75.256 72.595l60.109 88.403h-40.49l-43.85-65.814-16.649 20.323v45.491z"
            ></path>

            <g className="" mask="url(#mask)">
              <circle className="pulse-effect path-trace-footer" cx="50" cy="50" r="25"></circle>
            </g>
          </svg>
        </div>
      </div>
    </footer>
  );
}
