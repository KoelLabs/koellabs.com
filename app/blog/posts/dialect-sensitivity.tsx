// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';
import { CodeBlock } from '@/components/ui/code-block';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dialect Sensitivity — Why it matters for the future of language acquisition',
  slug: 'dialect-sensitivity',
  date: '2024-12-17',
  published: true,
  image: '/images/blogDialect.png',
  summary:
    'Dialect sensitivity is a crucial aspect of language learning. It refers to the ability of a language learning platform to adapt to the specific pronunciation and accent of a learner. This is important because it allows learners to better understand and speak the language, and it can also help them avoid making mistakes that could be embarrassing or even harmful in certain contexts.',
  category: 'Language Learning',
  tags: [],
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
          alt="Phonemic Transcription Metrics"
          className="w-full h-auto mt-16 rounded-lg z-10 relative"
        />
        <br></br>
        <div className="relative lg:col-span-3">
          <div className="relative flex h-full flex-col overflow-hidden tracking-[-0.010em] text-lg">
            <p className="mb-4">{metadata.summary}</p>
            <p className="mb-4">
              At Koel Labs, we use two key metrics to evaluate phonemic transcription models:
            </p>

            <ol className="list-decimal list-inside mb-4 pl-4">
              <li className="mb-2">
                Phonemic Error Rate (PER): The classic "how many mistakes did you make?" metric
              </li>
              <li className="mb-2">
                Weighted Phonemic Edit Distance (WPED): A smarter approach that considers how
                similar sounds are to each other
              </li>
            </ol>

            <h2 className="text-2xl font-semibold tracking-tight mt-4 mb-4">
              Why Traditional Metrics Fall Short: A Tale of Three Words
            </h2>

            <p className="mb-4">
              Let's say we're trying to transcribe the word "Bop". Our model could make different
              types of mistakes, and this is where things get interesting.
            </p>

            <p className="mb-4">Consider two models making different predictions:</p>

            <ul className="list-disc list-inside mb-4 pl-4">
              <li className="mb-2">Model 1 predicts: "Pop"</li>
              <li className="mb-2">Model 2 predicts: "Sop"</li>
            </ul>

            <p className="mb-4">
              From a linguistics perspective, these mistakes are not created equal:
            </p>

            <ul className="list-disc list-inside mb-4 pl-4">
              <li className="mb-2">
                'B' and 'P' are like cousins—they're both plosive bilabial consonants, made by
                stopping airflow with your lips. The only difference is that 'B' is voiced (your
                vocal cords vibrate) and 'P' isn't.
              </li>
              <li className="mb-2">
                'B' and 'S', on the other hand, are more like distant relatives. 'S' is a fricative
                alveolar consonant, made by forcing air between your tongue and the ridge behind
                your upper teeth—a completely different sound!
              </li>
            </ul>

            <p className="mb-4">
              This is where traditional PER falls short. It calculates errors based on simple
              substitutions, deletions, and insertions. In our example:
            </p>

            <div className="p-4 mb-4 bg-white/50 border border-neutral-200 rounded-xl">
              <CodeBlock
                code={`"Bop" → "Pop": 1 substitution = 33.33% error rate
"Bop" → "Sop": 1 substitution = 33.33% error rate`}
              />
            </div>

            <p className="mb-4">
              This is like saying someone who almost hit the bullseye did just as poorly as someone
              who hit the wall next to the dartboard. You can imagine that this would create very
              misleading evaluations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight">
              Weighted Phonemic Edit Distance
            </h2>

            <p className="mb-4">
              This is where WPED comes to the rescue, powered by the{' '}
              <a href="https://github.com/dmort27/panphon" className="text-sky-600 hover:underline">
                Panphon library
              </a>
              . Instead of treating each phoneme as completely different or identical, it represents
              them as a sequence of features—things like:
            </p>

            <ul className="list-disc list-inside mb-4 pl-4">
              <li className="mb-2">Is it voiced?</li>
              <li className="mb-2">Where in the mouth is it made?</li>
              <li className="mb-2">How is the air released?</li>
            </ul>

            <p className="mb-4">Each phoneme becomes a feature vector, something like:</p>

            <div className="p-4 mb-4 bg-white/50 border border-neutral-200 rounded-xl">
              <CodeBlock
                code={`B: [+voiced, +bilabial, +plosive, -fricative, ...]
P: [-voiced, +bilabial, +plosive, -fricative, ...]
S: [-voiced, +alveolar, -plosive, +fricative, ...]`}
              />
            </div>

            <p className="mb-4">
              When we calculate the distance between these vectors, we get a much more nuanced view:
            </p>

            <div className="p-4 mb-4 bg-white/50 border border-neutral-200 rounded-xl">
              <CodeBlock
                code={`Distance("Bop" → "Pop") = 0.2  // Small difference
Distance("Bop" → "Sop") = 0.8  // Large difference`}
              />
            </div>

            <div className="my-8">
              <Image
                src="/placeholder.svg"
                alt="Diagram illustrating phonemic distances"
                width={600}
                height={400}
                className="mx-auto"
              />
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight">Why This Matters</h2>

            <p className="mb-4">
              When you're teaching a model to transcribe speech, you want it to understand that
              predicting a similar sound is better than predicting a completely different one. This
              is especially important because different models might use different phoneme
              vocabularies—some might have 40 symbols, others up to 400.
            </p>

            <p className="mb-4">
              Traditional PER might unfairly favor models that happen to use the exact same phoneme
              set as your ground truth data, even if other models are making more linguistically
              sensible predictions. WPED helps level the playing field by considering phonetic
              similarity.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight">The Takeaway</h2>

            <p className="mb-4">
              By using WPED alongside traditional metrics like PER, we can better understand how
              well our models are really performing at phonemic transcription. It's not just about
              getting the exact right symbol—it's about understanding the underlying sounds of
              language.
            </p>

            <p className="mb-4">
              As we continue to develop better speech recognition models, metrics like WPED will be
              crucial in helping us measure progress in a way that actually reflects linguistic
              reality. After all, in the world of pronunciation, being close sometimes counts for a
              lot more than traditional metrics might suggest!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
