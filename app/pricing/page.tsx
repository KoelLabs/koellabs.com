'use client';

import { useState, Fragment } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import Header from '@/components/ui/1 - header';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Check, Minus, X } from 'lucide-react';
import { Dashboard } from '@/components/ui/dashboard';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/month billed yearly' },
];
const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    clickMessage: 'Start Practicing',
    href: '#',
    price: { monthly: '$0', annually: '$0' },
    description:
      'Get started with our free plan, no credit card required. The perfect way to get started.',
    features: [
      'Import up to 10 of your favorite clips',
      'Real-time insights and feedback',
      'Basic analytics on your sessions',
      'Professional tips and tricks',
    ],
    notIncluded: [
      'Limited to 10 minutes of practice per day',
      'Maximum of 1 hour analyzed per month',
    ],
    mostPopular: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',

    href: '#',
    price: { monthly: '$5.99', annually: '$4.99' },
    description:
      'Everything you need to take your practice to the next level, with advanced analytics and higher limits.',
    features: [
      'Import up to 500 of your favorite clips',
      'Real-time insights and feedback',
      'Advanced analytics on your practice sessions and growth',
      'Unlimited practice time per day',
      'Access to new features first',
    ],
    mostPopular: true,
  },
  {
    name: 'Institution',
    id: 'tier-institution',
    clickMessage: 'Get in Touch',
    href: '#',
    price: { monthly: '', annually: '' },
    description: 'Custom plans for schools, teams, and organizations.',
    features: [
      'Unlimited clip imports',
      'SSO and user management',
      'Real-time insights and feedback',
      "Advanced analytics on student's practice sessions and growth",
      'Dedicated support and infrastructure',
    ],
    mostPopular: false,
  },
];
const sections = [
  {
    name: 'Features',
    features: [
      { name: 'Integrations', tiers: { Basic: true, Essential: true, Premium: true } },
      { name: 'Shared links', tiers: { Basic: true, Essential: true, Premium: true } },
      { name: 'Importing and exporting', tiers: { Essential: true, Premium: true } },
      { name: 'Team members', tiers: { Essential: 'Up to 20 users', Premium: 'Up to 50 users' } },
    ],
  },
  {
    name: 'Reporting',
    features: [
      { name: 'Advanced analytics', tiers: { Basic: true, Essential: true, Premium: true } },
      { name: 'Basic reports', tiers: { Essential: true, Premium: true } },
      { name: 'Professional reports', tiers: { Premium: true } },
      { name: 'Custom report builder', tiers: { Premium: true } },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: '24/7 online support', tiers: { Basic: true, Essential: true, Premium: true } },
      { name: 'Quarterly product workshops', tiers: { Essential: true, Premium: true } },
      { name: 'Priority phone support', tiers: { Essential: true, Premium: true } },
      { name: '1:1 onboarding tour', tiers: { Premium: true } },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function page() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  return (
    // <Dashboard />
    <div className="flex-col flex w-screen relative scroll-smooth">
      <div className="z-[2] sticky top-0 mx-auto w-full">
        <Header />
      </div>
      <div className="min-h-screen">
        <div className="color-bg h-full w-11/12 left-0 right-0 mx-auto absolute z-[0] blur-[64px] opacity-10 top-48"></div>
        <div className=" py-24 sm:py-32 z-[1] relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base font-semibold leading-7 text-transparent bg-clip-text bg-gradient-to-br from-black to-sky-600">
                Pricing
              </h2>
              <p className="text-4xl font-bold tracking-[-0.04em] text-neutral-900 sm:text-5xl">
                Simple Pricing for Everyone.
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-neutral-600">
              Choose the plan that best fits your needs, goals, and budget.
            </p>
            <div className="mt-16 flex justify-center">
              <fieldset aria-label="Payment frequency">
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-neutral-200 bg-white"
                >
                  {frequencies.map(option => (
                    <Radio
                      key={option.value}
                      value={option}
                      className="cursor-pointer rounded-full px-2.5 py-1 text-neutral-500 data-[checked]:bg-gradient-to-br data-[checked]:from-black data-[checked]:to-sky-800 data-[checked]:text-white"
                    >
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative">
              {tiers.map(tier => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? 'ring-2 ring-sky-800 bg-gradient-to-b shadow-sky-950/50'
                      : 'ring-1 ring-neutral-200 mt-8',
                    'rounded-3xl p-8 xl:p-10 bg-white shadow-lg flex flex-col justify-between',
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3
                        id={tier.id}
                        className={classNames(
                          tier.mostPopular ? 'text-sky-800' : 'text-neutral-900',
                          'text-lg font-semibold leading-8',
                        )}
                      >
                        {tier.name}
                      </h3>
                      {tier.mostPopular ? (
                        <p className="rounded-full bg-sky-900/10 px-2.5 py-1 text-xs font-semibold leading-5 text-sky-800">
                          Most popular
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-neutral-600">{tier.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-bold tracking-tight text-neutral-900">
                        {tier.name === 'Institution' ? 'Contact Us' : tier.price[frequency.value]}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-neutral-600">
                        {tier.name === 'Institution' ? '' : frequency.priceSuffix}
                      </span>
                    </p>
                    <ul
                      role="list"
                      className="mt-8 space-y-3 text-sm leading-6 text-neutral-600 xl:mt-10"
                    >
                      {tier.features.map(feature => (
                        <li key={feature} className="flex gap-x-3">
                          <Check aria-hidden="true" className="h-6 w-5 flex-none text-sky-600" />
                          {feature}
                        </li>
                      ))}
                      {tier.notIncluded?.map(
                        feature =>
                          (
                            <li key={feature} className="flex gap-x-3 text-neutral-600">
                              <X aria-hidden="true" className="h-6 w-5 flex-none" />
                              {feature}
                            </li>
                          ) || null,
                      )}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? 'border bg-gradient-to-br border-double outline-white/50 outline outline-[0.1px] outline-offset-[-2px] border-black from-sky-800 to-blue-950 dark:outline-black/50 dark:from-sky-600 dark:to-blue-800 text-white shadow shadow-sky-950 hover:shadow-sky-700'
                        : 'text-black ring-1 ring-inset ring-sky-800/50 hover:ring-sky-900/60',
                      'mt-8 transition-all hover:-translate-y-0.5 hover:shadow block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    )}
                  >
                    {tier.clickMessage || 'Try for Free'}
                  </a>
                </div>
              ))}
            </div>
            {/* xs to lg */}
            <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
              {tiers.map(tier => (
                <section
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? 'rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200'
                      : '',
                    'p-8',
                  )}
                >
                  <h3 id={tier.id} className="text-sm font-semibold leading-6 text-gray-900">
                    {tier.name}
                  </h3>
                  <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
                    <span className="text-4xl font-bold">{tier.priceMonthly}</span>
                    <span className="text-sm font-semibold">/month</span>
                  </p>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                      'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    )}
                  >
                    Buy plan
                  </a>
                  <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-gray-900">
                    {sections.map(section => (
                      <li key={section.name}>
                        <ul role="list" className="space-y-4">
                          {section.features.map(feature =>
                            feature.tiers[tier.name] ? (
                              <li key={feature.name} className="flex gap-x-3">
                                <Check
                                  aria-hidden="true"
                                  className="h-6 w-5 flex-none text-indigo-600"
                                />
                                <span>
                                  {feature.name}{' '}
                                  {typeof feature.tiers[tier.name] === 'string' ? (
                                    <span className="text-sm leading-6 text-gray-500">
                                      ({feature.tiers[tier.name]})
                                    </span>
                                  ) : null}
                                </span>
                              </li>
                            ) : null,
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* lg+ */}
            <div className="isolate mt-20 hidden lg:block">
              <div className="relative -mx-8">
                {tiers.some(tier => tier.mostPopular) ? (
                  <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                    <div
                      style={{
                        marginLeft: `${(tiers.findIndex(tier => tier.mostPopular) + 1) * 25}%`,
                      }}
                      aria-hidden="true"
                      className="flex w-1/4 px-4"
                    >
                      <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                    </div>
                  </div>
                ) : null}
                <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
                  <caption className="sr-only">Pricing plan comparison</caption>
                  <colgroup>
                    <col className="w-1/4" />
                    <col className="w-1/4" />
                    <col className="w-1/4" />
                    <col className="w-1/4" />
                  </colgroup>
                  <thead>
                    <tr>
                      <td />
                      {tiers.map(tier => (
                        <th key={tier.id} scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
                          <div className="text-sm font-semibold leading-7 text-gray-900">
                            {tier.name}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <span className="sr-only">Price</span>
                      </th>
                      {tiers.map(tier => (
                        <td key={tier.id} className="px-6 pt-2 xl:px-8">
                          <div className="flex items-baseline gap-x-1 text-gray-900">
                            <span className="text-4xl font-bold">{tier.priceMonthly}</span>
                            <span className="text-sm font-semibold leading-6">/month</span>
                          </div>
                          <a
                            href={tier.href}
                            className={classNames(
                              tier.mostPopular
                                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                              'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                            )}
                          >
                            Buy plan
                          </a>
                        </td>
                      ))}
                    </tr>
                    {sections.map((section, sectionIdx) => (
                      <Fragment key={section.name}>
                        <tr>
                          <th
                            scope="colgroup"
                            colSpan={4}
                            className={classNames(
                              sectionIdx === 0 ? 'pt-8' : 'pt-16',
                              'pb-4 text-sm font-semibold leading-6 text-gray-900',
                            )}
                          >
                            {section.name}
                            <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                          </th>
                        </tr>
                        {section.features.map(feature => (
                          <tr key={feature.name}>
                            <th
                              scope="row"
                              className="py-4 text-sm font-normal leading-6 text-gray-900"
                            >
                              {feature.name}
                              <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                            </th>
                            {tiers.map(tier => (
                              <td key={tier.id} className="px-6 py-4 xl:px-8">
                                {typeof feature.tiers[tier.name] === 'string' ? (
                                  <div className="text-center text-sm leading-6 text-gray-500">
                                    {feature.tiers[tier.name]}
                                  </div>
                                ) : (
                                  <>
                                    {feature.tiers[tier.name] === true ? (
                                      <Check
                                        aria-hidden="true"
                                        className="mx-auto h-5 w-5 text-indigo-600"
                                      />
                                    ) : (
                                      <Minus
                                        aria-hidden="true"
                                        className="mx-auto h-5 w-5 text-gray-400"
                                      />
                                    )}

                                    <span className="sr-only">
                                      {feature.tiers[tier.name] === true
                                        ? 'Included'
                                        : 'Not included'}{' '}
                                      in {tier.name}
                                    </span>
                                  </>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
