'use client';
import React from 'react';
import { ContactDialog } from './1 - contact-dialog.jsx';
import MobileDrawer from './1 - mobile-drawer.jsx';
import { Button } from './button.jsx';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Code, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  var path = usePathname();

  if (path === '') {
    path = 'home';
  }

  const handleClickLogo = () => {
    navigator.clipboard.writeText(
      '<svg width="2806" height="870" viewBox="0 0 2806 870" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="2806" height="870" fill="white"/> <rect width="620.534" height="645" transform="translate(220 134)" fill="white"/> <rect x="717.598" y="432.777" width="158.655" height="318.052" rx="79.3276" transform="rotate(90 717.598 432.777)" fill="url(#paint0_linear_1690_777)" fill-opacity="0.6"/> <rect x="703.876" y="625.094" width="158.655" height="318.052" rx="79.3276" transform="rotate(135 703.876 625.094)" fill="url(#paint1_linear_1690_777)" fill-opacity="0.6"/> <rect x="717.598" y="432.777" width="158.655" height="318.052" rx="79.3276" transform="rotate(90 717.598 432.777)" fill="url(#paint2_linear_1690_777)" fill-opacity="0.6"/> <rect x="703.876" y="625.094" width="158.655" height="318.052" rx="79.3276" transform="rotate(135 703.876 625.094)" fill="url(#paint3_linear_1690_777)" fill-opacity="0.6"/> <rect x="717.598" y="432.777" width="158.655" height="318.052" rx="79.3276" transform="rotate(90 717.598 432.777)" fill="url(#paint4_linear_1690_777)" fill-opacity="0.6"/> <rect x="703.876" y="625.094" width="158.655" height="318.052" rx="79.3276" transform="rotate(135 703.876 625.094)" fill="url(#paint5_linear_1690_777)" fill-opacity="0.6"/> <path d="M430.056 411.278C388.981 396.038 351.242 302.564 352.918 298.046C354.594 293.528 444.169 247.291 485.245 262.531C526.32 277.771 547.264 323.423 532.024 364.499C516.784 405.574 471.132 426.518 430.056 411.278Z" fill="black"/> <path d="M867.661 612V339.76H925.22V459.795H928.809L1026.78 339.76H1095.77L994.742 461.657L1096.97 612H1028.11L953.534 500.073L925.22 534.635V612H867.661ZM1179.49 615.988C1158.84 615.988 1140.98 611.601 1125.92 602.828C1110.94 593.966 1099.37 581.648 1091.22 565.873C1083.07 550.01 1078.99 531.622 1078.99 510.708C1078.99 489.616 1083.07 471.183 1091.22 455.409C1099.37 439.546 1110.94 427.228 1125.92 418.454C1140.98 409.592 1158.84 405.161 1179.49 405.161C1200.14 405.161 1217.95 409.592 1232.92 418.454C1247.99 427.228 1259.6 439.546 1267.75 455.409C1275.91 471.183 1279.98 489.616 1279.98 510.708C1279.98 531.622 1275.91 550.01 1267.75 565.873C1259.6 581.648 1247.99 593.966 1232.92 602.828C1217.95 611.601 1200.14 615.988 1179.49 615.988ZM1179.75 572.121C1189.15 572.121 1196.99 569.462 1203.28 564.145C1209.57 558.739 1214.31 551.384 1217.5 542.079C1220.78 532.774 1222.42 522.184 1222.42 510.309C1222.42 498.434 1220.78 487.844 1217.5 478.539C1214.31 469.233 1209.57 461.878 1203.28 456.472C1196.99 451.066 1189.15 448.364 1179.75 448.364C1170.27 448.364 1162.29 451.066 1155.83 456.472C1149.44 461.878 1144.61 469.233 1141.34 478.539C1138.15 487.844 1136.55 498.434 1136.55 510.309C1136.55 522.184 1138.15 532.774 1141.34 542.079C1144.61 551.384 1149.44 558.739 1155.83 564.145C1162.29 569.462 1170.27 572.121 1179.75 572.121ZM1387.39 615.988C1366.39 615.988 1348.31 611.734 1333.16 603.227C1318.09 594.631 1306.48 582.49 1298.33 566.804C1290.18 551.03 1286.1 532.375 1286.1 510.84C1286.1 489.838 1290.18 471.405 1298.33 455.542C1306.48 439.679 1317.96 427.316 1332.76 418.454C1347.65 409.592 1365.11 405.161 1385.13 405.161C1398.6 405.161 1411.14 407.333 1422.75 411.675C1434.45 415.929 1444.64 422.354 1453.33 430.95C1462.1 439.546 1468.92 450.357 1473.8 463.385C1478.67 476.323 1481.11 491.477 1481.11 508.847V524.399H1308.7V489.306H1427.8C1427.8 481.153 1426.03 473.93 1422.49 467.638C1418.94 461.346 1414.02 456.428 1407.73 452.883C1401.53 449.25 1394.31 447.433 1386.06 447.433C1377.47 447.433 1369.85 449.427 1363.2 453.415C1356.64 457.314 1351.5 462.587 1347.78 469.233C1344.06 475.791 1342.15 483.102 1342.06 491.167V524.532C1342.06 534.635 1343.93 543.364 1347.65 550.719C1351.46 558.075 1356.82 563.747 1363.73 567.734C1370.64 571.722 1378.84 573.716 1388.32 573.716C1394.62 573.716 1400.38 572.83 1405.61 571.058C1410.83 569.285 1415.31 566.627 1419.03 563.082C1422.75 559.537 1425.59 555.195 1427.54 550.055L1479.91 553.511C1477.25 566.095 1471.8 577.084 1463.56 586.477C1455.41 595.783 1444.86 603.049 1431.93 608.278C1419.08 613.418 1404.23 615.988 1387.39 615.988ZM1552.23 339.76V612H1495.6V339.76H1552.23ZM1640.38 612V339.76H1697.93V564.544H1814.65V612H1640.38ZM1887.46 615.855C1874.44 615.855 1862.83 613.595 1852.64 609.076C1842.44 604.467 1834.38 597.688 1828.44 588.737C1822.59 579.698 1819.67 568.443 1819.67 554.973C1819.67 543.63 1821.75 534.103 1825.92 526.393C1830.08 518.683 1835.75 512.48 1842.93 507.783C1850.11 503.086 1858.26 499.541 1867.39 497.149C1876.61 494.756 1886.27 493.072 1896.37 492.097C1908.24 490.857 1917.82 489.705 1925.08 488.641C1932.35 487.489 1937.62 485.805 1940.9 483.59C1944.18 481.374 1945.82 478.095 1945.82 473.753V472.956C1945.82 464.537 1943.16 458.023 1937.84 453.415C1932.62 448.807 1925.17 446.503 1915.51 446.503C1905.32 446.503 1897.21 448.762 1891.19 453.282C1885.16 457.713 1881.17 463.296 1879.22 470.031L1826.85 465.777C1829.51 453.371 1834.73 442.648 1842.53 433.608C1850.33 424.48 1860.39 417.48 1872.71 412.605C1885.12 407.643 1899.47 405.161 1915.78 405.161C1927.12 405.161 1937.98 406.491 1948.35 409.149C1958.8 411.808 1968.06 415.929 1976.13 421.512C1984.28 427.095 1990.71 434.273 1995.4 443.046C2000.1 451.731 2002.45 462.144 2002.45 474.285V612H1948.74V583.686H1947.15C1943.87 590.067 1939.48 595.694 1933.99 600.568C1928.49 605.354 1921.89 609.12 1914.18 611.867C1906.47 614.526 1897.57 615.855 1887.46 615.855ZM1903.68 576.774C1912.01 576.774 1919.37 575.134 1925.75 571.855C1932.13 568.488 1937.13 563.968 1940.77 558.296C1944.4 552.625 1946.22 546.2 1946.22 539.022V517.354C1944.45 518.506 1942.01 519.57 1938.91 520.544C1935.89 521.431 1932.48 522.272 1928.67 523.07C1924.86 523.779 1921.05 524.444 1917.24 525.064C1913.43 525.596 1909.97 526.083 1906.87 526.526C1900.22 527.501 1894.42 529.052 1889.46 531.179C1884.49 533.306 1880.64 536.186 1877.89 539.819C1875.15 543.364 1873.77 547.795 1873.77 553.112C1873.77 560.822 1876.56 566.715 1882.15 570.792C1887.82 574.78 1895 576.774 1903.68 576.774ZM2024.98 612V339.76H2081.61V442.116H2083.34C2085.82 436.621 2089.41 431.038 2094.11 425.367C2098.89 419.606 2105.1 414.821 2112.72 411.01C2120.43 407.111 2130 405.161 2141.43 405.161C2156.32 405.161 2170.06 409.061 2182.64 416.859C2195.22 424.569 2205.28 436.223 2212.81 451.82C2220.35 467.328 2224.11 486.78 2224.11 510.176C2224.11 532.951 2220.44 552.182 2213.08 567.867C2205.81 583.464 2195.89 595.295 2183.3 603.36C2170.81 611.335 2156.81 615.323 2141.3 615.323C2130.31 615.323 2120.96 613.507 2113.25 609.873C2105.63 606.24 2099.38 601.676 2094.51 596.181C2089.63 590.598 2085.91 584.971 2083.34 579.299H2080.82V612H2024.98ZM2080.42 509.91C2080.42 522.051 2082.1 532.641 2085.47 541.68C2088.84 550.719 2093.71 557.765 2100.09 562.816C2106.47 567.779 2114.22 570.26 2123.35 570.26C2132.57 570.26 2140.37 567.734 2146.75 562.683C2153.13 557.543 2157.96 550.454 2161.24 541.414C2164.61 532.286 2166.29 521.785 2166.29 509.91C2166.29 498.124 2164.65 487.755 2161.37 478.804C2158.09 469.854 2153.26 462.853 2146.88 457.802C2140.5 452.75 2132.66 450.225 2123.35 450.225C2114.14 450.225 2106.34 452.662 2099.96 457.536C2093.67 462.41 2088.84 469.322 2085.47 478.273C2082.1 487.223 2080.42 497.769 2080.42 509.91ZM2409.32 466.043L2357.48 469.233C2356.59 464.802 2354.69 460.815 2351.76 457.27C2348.84 453.636 2344.99 450.756 2340.2 448.629C2335.5 446.414 2329.88 445.306 2323.32 445.306C2314.54 445.306 2307.14 447.167 2301.12 450.889C2295.09 454.523 2292.08 459.397 2292.08 465.511C2292.08 470.386 2294.03 474.506 2297.93 477.874C2301.83 481.241 2308.52 483.944 2318 485.983L2354.95 493.427C2374.81 497.503 2389.61 504.061 2399.35 513.1C2409.1 522.14 2413.98 534.015 2413.98 548.725C2413.98 562.107 2410.03 573.849 2402.14 583.952C2394.35 594.054 2383.62 601.942 2369.98 607.613C2356.42 613.196 2340.78 615.988 2323.05 615.988C2296.02 615.988 2274.49 610.361 2258.45 599.106C2242.5 587.762 2233.15 572.343 2230.4 552.846L2286.1 549.922C2287.78 558.163 2291.86 564.455 2298.33 568.798C2304.8 573.052 2313.08 575.178 2323.18 575.178C2333.11 575.178 2341.09 573.273 2347.11 569.462C2353.23 565.563 2356.33 560.556 2356.42 554.441C2356.33 549.301 2354.16 545.092 2349.9 541.813C2345.65 538.446 2339.09 535.876 2330.23 534.103L2294.87 527.058C2274.93 523.07 2260.09 516.158 2250.34 506.321C2240.68 496.484 2235.85 483.944 2235.85 468.702C2235.85 455.586 2239.39 444.287 2246.48 434.805C2253.66 425.322 2263.72 418.011 2276.66 412.871C2289.69 407.731 2304.93 405.161 2322.39 405.161C2348.18 405.161 2368.47 410.611 2383.27 421.512C2398.16 432.412 2406.84 447.256 2409.32 466.043Z" fill="url(#paint6_linear_1690_777)"/> <defs> <linearGradient id="paint0_linear_1690_777" x1="796.926" y1="432.777" x2="796.926" y2="750.829" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint1_linear_1690_777" x1="783.204" y1="625.094" x2="783.204" y2="943.145" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint2_linear_1690_777" x1="796.926" y1="432.777" x2="796.926" y2="750.829" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint3_linear_1690_777" x1="783.204" y1="625.094" x2="783.204" y2="943.145" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint4_linear_1690_777" x1="796.926" y1="432.777" x2="796.926" y2="750.829" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint5_linear_1690_777" x1="783.204" y1="625.094" x2="783.204" y2="943.145" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint6_linear_1690_777" x1="1641" y1="349" x2="2304" y2="905" gradientUnits="userSpaceOnUse"> <stop/> <stop offset="1" stop-color="#317EC5"/> </linearGradient> </defs> </svg> ',
    );
  };

  const handleClickBrandmark = () => {
    navigator.clipboard.writeText(
      '<svg width="870" height="870" viewBox="0 0 870 870" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="870" height="870" fill="white"/> <rect x="671.179" y="403" width="214" height="429" rx="107" transform="rotate(90 671.179 403)" fill="url(#paint0_linear_1691_806)" fill-opacity="0.6"/> <rect x="652.67" y="662.406" width="214" height="429" rx="107" transform="rotate(135 652.67 662.406)" fill="url(#paint1_linear_1691_806)" fill-opacity="0.6"/> <rect x="671.179" y="403" width="214" height="429" rx="107" transform="rotate(90 671.179 403)" fill="url(#paint2_linear_1691_806)" fill-opacity="0.6"/> <rect x="652.67" y="662.406" width="214" height="429" rx="107" transform="rotate(135 652.67 662.406)" fill="url(#paint3_linear_1691_806)" fill-opacity="0.6"/> <rect x="671.179" y="403" width="214" height="429" rx="107" transform="rotate(90 671.179 403)" fill="url(#paint4_linear_1691_806)" fill-opacity="0.6"/> <rect x="652.67" y="662.406" width="214" height="429" rx="107" transform="rotate(135 652.67 662.406)" fill="url(#paint5_linear_1691_806)" fill-opacity="0.6"/> <path d="M283.332 374.002C227.928 353.446 177.024 227.365 179.285 221.271C181.546 215.177 302.368 152.81 357.772 173.366C413.176 193.922 441.426 255.5 420.87 310.904C400.314 366.308 338.736 394.558 283.332 374.002Z" fill="black"/> <defs> <linearGradient id="paint0_linear_1691_806" x1="778.179" y1="403" x2="778.179" y2="832" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint1_linear_1691_806" x1="759.67" y1="662.406" x2="759.67" y2="1091.41" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint2_linear_1691_806" x1="778.179" y1="403" x2="778.179" y2="832" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint3_linear_1691_806" x1="759.67" y1="662.406" x2="759.67" y2="1091.41" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint4_linear_1691_806" x1="778.179" y1="403" x2="778.179" y2="832" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> <linearGradient id="paint5_linear_1691_806" x1="759.67" y1="662.406" x2="759.67" y2="1091.41" gradientUnits="userSpaceOnUse"> <stop stop-color="#317EC5"/> <stop offset="1"/> </linearGradient> </defs> </svg>',
    );
  };

  return (
    <header className="overflow-hidden h-fit w-full text-black bg-neutral-100/90 backdrop-blur-md border border-neutral-200">
      <nav className="flex justify-between items-center max-w-[1090px] px-8 w-full py-6 mx-auto">
        <ContextMenu>
          <ContextMenuTrigger>
            <a href="/" className="text-2xl font-semibold  tracking-[-0.04em] flex justify-center">
              <svg
                className="h-10 w-10 -mt-1.5"
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
              <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-br from-black via-sky-950 to-sky-500">
                Labs
              </span>
            </a>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-full p-1 flex flex-col">
            <button onClick={handleClickLogo}>
              <ContextMenuItem className="text-neutral-900 tracking-tight text-sm font-medium">
                <Copy className="mr-3 h-5 w-5" />
                Copy Logo as SVG
              </ContextMenuItem>
            </button>
            <button onClick={handleClickBrandmark}>
              <ContextMenuItem className="text-neutral-900 tracking-tight text-sm font-medium">
                {' '}
                <svg
                  className="mr-2 h-6 w-6"
                  width="493"
                  height="601"
                  viewBox="0 0 493 601"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {' '}
                  <rect
                    x="479.179"
                    y="247"
                    width="188"
                    height="403"
                    rx="94.0001"
                    transform="rotate(90 479.179 247)"
                    stroke="black"
                    stroke-width="40"
                  />{' '}
                  <rect
                    x="455.285"
                    y="493.406"
                    width="188"
                    height="403"
                    rx="94.0001"
                    transform="rotate(135 455.285 493.406)"
                    stroke="black"
                    stroke-width="40"
                  />{' '}
                  <path
                    d="M108.854 192.813C98.1134 188.828 86.3026 179.102 74.3071 164.925C62.5107 150.984 51.4888 133.887 42.0472 116.898C32.6292 99.9516 24.9668 83.4451 19.8286 70.8909C17.6616 65.5965 15.9875 61.1119 14.8314 57.6678C17.9542 55.8112 22.1483 53.5038 27.2441 50.904C39.3274 44.7394 55.902 37.2253 74.094 30.523C92.3318 23.8038 111.838 18.0333 129.873 15.1601C148.212 12.2384 163.509 12.5691 174.25 16.5541C222.923 34.6126 247.74 88.709 229.682 137.382C211.623 186.054 157.527 210.872 108.854 192.813Z"
                    stroke="black"
                    stroke-width="40"
                  />{' '}
                </svg>
                Copy Brandmark as SVG
              </ContextMenuItem>
            </button>
          </ContextMenuContent>
        </ContextMenu>

        <ul className="md:flex justify-between items-center gap-6 hidden pr-8">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a
                className={path === href ? 'text-black' : 'text-neutral-500 hover:text-neutral-700'}
                href={href}
              >
                {label}
              </a>
            </li>
          ))}
          <ContactDialog />
        </ul>
        <div className="md:hidden">
          <MobileDrawer className="" />
        </div>
        <div className="md:flex gap-2 hidden">
          <Button variant="outline" className="">
            Sign In
          </Button>
          <Button className=" bg-gradient-to-b py-0 border border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-900 to-blue-950">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
