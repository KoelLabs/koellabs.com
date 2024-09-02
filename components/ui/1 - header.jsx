import React from 'react';
import { ContactDialog } from './1 - contact-dialog.jsx';
import MobileDrawer from './1 - mobile-drawer.jsx';
import { Button } from './button.jsx';

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
];

export default function Header() {
    return (
        <header className=" overflow-hidden h-fit w-full text-black sticky bg-neutral-100/90 backdrop-blur-md border border-neutral-200">
            <nav className="flex justify-between items-center max-w-[1090px] px-8 w-full py-6 mx-auto">
                <a
                    href="/"
                    className="text-2xl font-semibold  tracking-[-0.04em] flex justify-center"
                >
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
                <ul className="md:flex justify-between items-center gap-6 hidden pr-12">
                    {links.map(({ href, label }) => (
                        <li key={`${href}${label}`}>
                            <a className="tracking-tight text-neutral-600 font-medium" href={href}>
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
                        Get Started
                    </Button>
                </div>
            </nav>
        </header>
    );
}
