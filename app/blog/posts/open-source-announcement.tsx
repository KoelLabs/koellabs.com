// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';

export const metadata: Metadata = {
  title: 'Hello World! — Our Open Source Project Launch',
  slug: 'open-source-project',
  date: '2024-12-16',
  published: true,
  image: '/images/blogLaunch.png',
  summary: `
    At Koel Labs, our goal is to make pronunciation learning more accessible and inclusive.
    To represent the diversity of language and dialects, we're excited to announce that everything 
    from model weights and training code to datasets, research papers, and the frontend UI is 
    officially open source! We believe that together, we can build a better future for language 
    learning.
  `,
  category: 'Announcement',
  tags: [
    {
      text: 'GitHub',
      url: 'https://github.com/KoelLabs',
    },
    {
      text: 'Hugging Face',
      url: 'https://huggingface.co/KoelLabs',
    },
  ],
};

export default function PostBody() {
  return (
    <div className="bg-white/50 py-24 sm:py-32 relative">
      <div className="bg-white absolute h-full w-full mt-96 border-y border-neutral-200"></div>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl lg:px-8 z-10">
        <h2 className="text-base/7 font-semibold text-sky-600 text-center">{metadata.category}</h2>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl text-center">
          {metadata.title}
        </h1>
        <img
          src={metadata.image}
          alt={metadata.title}
          className="w-full h-auto mt-16 rounded-lg z-10 relative"
        />
        <br></br>
        <div className="relative lg:col-span-3">
          <div className="relative flex h-full flex-col overflow-hidden tracking-[-0.010em] text-lg">
            <p>{metadata.summary}</p>
            <h3 className="mt-8 text-pretty text-2xl font-semibold tracking-tighter text-gray-950 mb-4">
              The problem of pronunciation learning
            </h3>
            <p className="mb-4">
              At Koel Labs, our goal is to make pronunciation learning more accessible and
              inclusive. To represent the diversity of language and dialects, we're excited to
              announce that everything from model weights and training code to datasets, research
              papers, and the frontend UI is officially open source! We can build a better future
              for language learning.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">
              The problem of pronunciation learning
            </h2>

            <p className="mb-4">
              Currently, 48% of foreign speakers are anxious about their accents [1]. Pronunciation
              is one of the most complex parts of learning a language. It's difficult to hear the
              difference between what you're saying and what you should be saying (sometimes, it's
              impossible without a teacher, which is not affordable for many). Once you hear the
              difference, it is also super hard to learn to make sounds you've never made in your
              native language.
            </p>

            <p className="mb-4">
              Technology can bridge this gap; only existing language learning tools do not value the
              diversity of languages and dialects. A good solution should be able to understand and
              teach any accent, not just define a "standard." Moreover, the feedback should be
              nuanced, actionable, and personalized based on your native language background, not
              just a human-void ASR system saying "yes" if it recognizes each word you're saying.
            </p>

            <p className="mb-4">
              We want to collect datasets that represent the diversity of languages and dialects and
              make the entire process of training and evaluating models and then interpreting the
              results to surface explainable feedback to users reflect the diversity of backgrounds
              that language learners have.
            </p>

            <p className="mb-4">
              For us, as immigrants and children of immigrants, pronunciation learning has a special
              meaning because we see not only the importance of fitting into our new communities but
              also of fitting into our extended families.
            </p>

            <p className="mb-4">
              For others, pronunciation learning has other meanings, and we want to make sure that
              our tools can help everyone. This is why we're making the project open source — it
              allows for discussion and ideas from a worldwide audience.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">
              Current progress and plans
            </h2>

            <p className="mb-4">
              We were fortunate to join the{' '}
              <a
                href="https://blog.mozilla.org/en/mozilla/14-ai-projects-to-watch-mozillas-first-builders-accelerator-cohort-kicks-off/"
                className="text-sky-600 hover:underline"
              >
                2024 Mozilla Builders program
              </a>
              . This has provided us with the resources to train state-of-the-art audio models for
              the first version of our tool targeting foreign English speakers. We are in the
              process of publishing an academic paper on our approach. We are planning on continuing
              to iterate on the pipeline to support more languages, dialects, and use cases such as
              speech pathology for speech-impaired children.
            </p>

            <p className="mb-4">
              Our web application is not yet ready, but we are gearing up for a closed beta launch
              soon. In the meantime, check out our models on{' '}
              <a
                href="https://huggingface.co/KoelLabs/xlsr-timit-b0"
                className="text-sky-600 hover:underline"
              >
                Hugging Face
              </a>{' '}
              and training code on{' '}
              <a href="https://github.com/KoelLabs/ML" className="text-sky-600 hover:underline">
                GitHub
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">
              How do I get involved?
            </h2>

            <p className="mb-4">
              If your institution is interested in collaborating, please reach out to us at{' '}
              <a href="mailto:info@koellabs.com" className="text-sky-600 hover:underline">
                info@koellabs.com
              </a>
              . We have already partnered with several leading HCI, Phonology, and Linguistics
              researchers from institutions like CMU, BCU, and UW.
            </p>

            <p className="mb-4">
              If you are a developer, designer, or just interested in language learning, please
              partake in the discussion on our GitHub after consulting our{' '}
              <a
                href="https://github.com/KoelLabs/.github/blob/main/CONTRIBUTING.md"
                className="text-sky-600 hover:underline"
              >
                contribution guidelines
              </a>
              . Any feedback is welcome. User feedback is especially important to us, so if you are
              open to joining the beta testing program, please sign up{' '}
              <a
                href="https://forms.gle/12A9e2YYd9Ptzi2X6"
                className="text-sky-600 hover:underline"
              >
                here
              </a>
              .
            </p>

            <hr className="my-8 border-t border-gray-200" />

            <p className="text-sm text-gray-600">
              [1] Babbel Anxiety Study. Retrieved from{' '}
              <a
                href="https://www.babbel.com/en/magazine/accent-anxiety-study"
                className="text-sky-600 hover:underline"
              >
                https://www.babbel.com/en/magazine/accent-anxiety-study
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
