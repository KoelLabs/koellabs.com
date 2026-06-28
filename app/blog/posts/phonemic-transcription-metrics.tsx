// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';
import { Source_Serif_4 } from 'next/font/google';
import BlogBody from '../blog-components/body';
import BlogHeading from '../blog-components/heading';
import BlogHeroImage from '../blog-components/hero-image';
import BlogSubheading from '../blog-components/subheading';
import BlogCode from '../blog-components/code';
import BlogDecorations from '../blog-components/decorations';
import BlogImage from '../blog-components/image';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// formatDate moved to blog primitives; using internal from heading

export const metadata: Metadata = {
  title: 'A Deep Dive into Phonemic Transcription Metrics',
  slug: 'phonemic-transcription-metrics',
  date: '2024-12-30',
  published: true,
  image: '/images/blogPhonetic.png',
  summary:
    "The International Phonetic Alphabet (IPA) provides a useful phonetic alphabet that can detail a speaker's pronunciation. It is also the vocabulary of the Koel Labs phonetic transcription models, enabling us to model accent variation and develop amazing applications for language learning! In recent years, predicting these phonemic transcriptions from audio has become a popular machine learning task. But how do we calculate the accuracy of these models?",
  category: 'Technical Report',
  tags: [
    {
      text: 'Leaderboard',
      url: 'https://huggingface.co/spaces/KoelLabs/IPA-Transcription-EN',
    },
  ],
};

export default function PostBody() {
  return (
    <BlogBody>
      <BlogHeading
        category={metadata.category}
        categoryColorClass="text-purple-600"
        title={metadata.title}
        dateISO={metadata.date}
        maxWidth="3xl"
      />

      <BlogHeroImage src={metadata.image} alt="Phonemic Transcription Metrics" />
      <br></br>
      <div className="relative lg:col-span-3 max-w-3xl mx-auto mt-12">
        <BlogDecorations />
        <div
          className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
        >
          <BlogSubheading>An Introduction</BlogSubheading>
          <p className="mb-4">
            The{' '}
            <a
              href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"
              className="text-sky-600 hover:underline"
            >
              International Phonetic Alphabet (IPA)
            </a>{' '}
            provides a useful phonetic alphabet that can detail a speaker's pronunciation. It is
            also the vocabulary of the Koel Labs phonetic transcription models, enabling us to model
            accent variation and develop amazing applications for language learning! In recent
            years, predicting these phonemic transcriptions from audio has become a popular machine
            learning task. But how do we calculate the accuracy of these models?
          </p>
          <p className="mb-4">
            At Koel Labs, we use two key metrics to evaluate phonemic transcription models:
          </p>

          <ol className="list-decimal list-inside mb-4 pl-4">
            <li className="mb-2">
              Phonemic Error Rate (PER): The classic "how many mistakes did you make?" metric
            </li>
            <li className="mb-2">
              Weighted Phone Feature Error Rate (WPFER): A smarter approach that weights each
              mistake by how acoustically similar the sounds are
            </li>
          </ol>

          <BlogSubheading>Why Traditional Metrics Fall Short: A Tale of Three Words</BlogSubheading>

          <p className="mb-4">
            Let's say we're trying to transcribe the word "Bop". Our model could make different
            types of mistakes.
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
              'B' and 'P' are like cousins. They're both{' '}
              <a
                href="https://en.wikipedia.org/wiki/Bilabial_consonant"
                className="text-sky-600 hover:underline"
              >
                plosive bilabial consonants
              </a>
              , made by stopping airflow with your lips. The only difference is that 'B' is voiced
              (your vocal cords vibrate) and 'P' isn't.
            </li>
            <li className="mb-2">
              'B' and 'S', on the other hand, are more like distant relatives. 'S' is a{' '}
              <a
                href="https://en.wikipedia.org/wiki/Voiceless_alveolar_fricative"
                className="text-sky-600 hover:underline"
              >
                fricative alveolar consonant
              </a>
              , made by forcing air between your tongue and the ridge behind your upper teeth: a
              completely different sound.
            </li>
          </ul>

          <p className="mb-4">
            This is where traditional PER falls short. It calculates errors based on simple
            substitutions, deletions, and insertions. In our example:
          </p>

          <BlogCode
            code={`"Bop" → "Pop": 1 substitution = 33.33% error rate
"Bop" → "Sop": 1 substitution = 33.33% error rate`}
          />

          <p className="mb-4">
            That's like saying someone who just missed the bullseye did as poorly as someone who hit
            the wall next to the dartboard, which makes for misleading evaluations.
          </p>

          <BlogSubheading>Weighted Phone Feature Error Rate</BlogSubheading>

          <p className="mb-4">
            WPFER addresses this, powered by the{' '}
            <a href="https://github.com/dmort27/panphon" className="text-sky-600 hover:underline">
              Panphon library
            </a>
            . Instead of treating each phoneme as completely different or identical, it represents
            them as a sequence of features, things like:
          </p>

          <ul className="list-disc list-inside mb-4 pl-4">
            <li className="mb-2">Is it voiced?</li>
            <li className="mb-2">Where in the mouth is it made?</li>
            <li className="mb-2">How is the air released?</li>
          </ul>

          <p className="mb-4">Each phoneme becomes a feature vector, something like:</p>

          <BlogCode
            code={`B: [+voiced, +bilabial, +plosive, -fricative, ...]
P: [-voiced, +bilabial, +plosive, -fricative, ...]
S: [-voiced, +alveolar, -plosive, +fricative, ...]`}
          />

          <p className="mb-4">
            When we measure the distance between these vectors, we get a much more nuanced view. PER
            scores both errors identically, but WPFER pulls them apart:
          </p>

          <BlogCode
            code={`PER("Bop" → "Pop") = 0.33     WPFER("Bop" → "Pop") = 0.006  // b→p: just voicing
PER("Bop" → "Sop") = 0.33     WPFER("Bop" → "Sop") = 0.060  // b→s: place AND manner`}
          />

          <p className="mb-4">
            WPFER sums the feature-weighted cost of every edit and divides by the length of the
            ground truth, with a normalization factor (one over twice the total feature weight) that
            keeps it on a small, PER-comparable scale. Identical transcriptions score 0, and the
            further apart the sounds, the higher the number. That's why the "Sop" error lands about
            ten times higher than the near-miss "Pop", even though PER can't tell them apart. You
            can find the exact implementation in our{' '}
            <a
              href="https://github.com/KoelLabs/ML/blob/main/scripts/eval/metrics.py"
              className="text-sky-600 hover:underline"
            >
              ML repo
            </a>
            .
          </p>

          <div className="my-8">
            <BlogImage
              src="/images/blog1_visual.png"
              alt="Regular PER versus weighted PER: substituting B or I for the P in 'Pop' both score the same under PER, but very differently under WPFER, which reflects how acoustically close the sounds are"
              width={600}
              height={400}
              className="mx-auto"
              expanded={false}
            />
          </div>

          <BlogSubheading>Why This Matters</BlogSubheading>

          <p className="mb-4">
            When you're teaching a model to transcribe speech, you want it to understand that
            predicting a similar sound is better than predicting a completely different one. This is
            especially important because different models might use different phoneme vocabularies,
            with some using 40 symbols and others up to 400.
          </p>

          <p className="mb-4">
            Traditional PER might unfairly favor models that happen to use the exact same phoneme
            set as your ground truth data, even if other models are making more linguistically
            sensible predictions. WPFER helps level the playing field by considering phonetic
            similarity.
          </p>

          <BlogSubheading>The Takeaway</BlogSubheading>

          <p className="mb-4">
            Reporting WPFER alongside PER gives a fuller picture of how a model is really doing. It
            measures not just whether you picked the exact right symbol, but how close you came to
            the right sound, which is what matters for pronunciation feedback.
          </p>

          <p className="mb-4">
            You can compare both metrics across open models on our{' '}
            <a
              href="https://huggingface.co/spaces/KoelLabs/IPA-Transcription-EN"
              className="text-sky-600 hover:underline"
            >
              IPA transcription leaderboard
            </a>
            :
          </p>

          <div className="my-8">
            <BlogImage
              src="/images/huggingfaceLeaderboard.png"
              alt="Koel Labs IPA transcription leaderboard ranking models by average PER and WPFER"
              width={1000}
              height={300}
              className="mx-auto"
              expanded={false}
            />
          </div>

          <p className="mb-4">
            For the full details, including how we use WPFER to train and evaluate our models, see
            our paper,{' '}
            <a href="https://arxiv.org/abs/2606.16019" className="text-sky-600 hover:underline">
              Scaling Human and G2P Supervision for Robust Phonetic Transcription
            </a>
            .
          </p>
        </div>
      </div>
    </BlogBody>
  );
}
