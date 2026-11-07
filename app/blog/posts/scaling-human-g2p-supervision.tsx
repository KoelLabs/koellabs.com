import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from '../posts';
import { sourceSerif } from '@/app/fonts';
import BlogBody from '../blog-components/body';
import BlogHeading from '../blog-components/heading';
import BlogHeroImage from '../blog-components/hero-image';
import BlogSubheading from '../blog-components/subheading';
import BlogDecorations from '../blog-components/decorations';
import { Button } from '@/components/ui/base/button';

export const metadata: Metadata = {
  title: 'Scaling Human and G2P Supervision for Robust Phonetic Transcription',
  slug: 'scaling-human-g2p-supervision',
  date: '2026-11-07T00:00:00-08:00',
  published: true,
  image: '/blog/interspeech-2026/paper-hero.svg',
  socialImage: '/blog/interspeech-2026/paper-hero.png',
  summary:
    'Our Interspeech 2026 study examines when synthetic G2P labels help phonetic transcription, where expert annotation becomes more effective, and how ASR pretraining improves robustness across English accents.',
  category: 'Technical Report',
  tags: [
    {
      text: 'Interspeech 2026',
      url: 'https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.html',
    },
    { text: 'Models and code', url: 'https://github.com/KoelLabs/ML' },
  ],
};

const linkClass = 'text-sky-600 hover:underline';

function PosterFigure({
  name,
  alt,
  width,
  height,
  children,
  narrow = false,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  const src = `/blog/interspeech-2026/${name}.svg`;
  return (
    <figure className={`my-8 ${narrow ? 'max-w-sm mx-auto' : ''}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open figure: ${alt}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          sizes={narrow ? '(max-width: 420px) 100vw, 384px' : '(max-width: 768px) 100vw, 768px'}
          className="h-auto w-full rounded-2xl border border-neutral-200"
        />
      </a>
      <figcaption className="mt-3 text-sm/6 text-neutral-500 font-sans">{children}</figcaption>
    </figure>
  );
}

export default function PostBody() {
  return (
    <BlogBody>
      <BlogHeading
        category={metadata.category}
        title={metadata.title}
        dateISO={metadata.date}
        maxWidth="4xl"
      />
      <BlogHeroImage
        src={metadata.image}
        alt="First page of our Interspeech 2026 paper Scaling Human and G2P Supervision for Robust Phonetic Transcription"
      />
      <div className="relative max-w-3xl mx-auto mt-12">
        <BlogDecorations />
        <div
          className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
        >
          <p className="mb-4">
            Speech recognition identifies words. Phonetic transcription records the sounds a person
            makes. Pronunciation feedback, speech therapy, and accent research need those details:
            two people can say the same word differently.
          </p>
          <p className="mb-4">
            A phonetic model learns this task from recordings paired with sound transcriptions,
            called labels. Grapheme-to-phoneme (G2P) software generates labels from written words,
            giving us a cheaper source of training data.
          </p>
          <p className="mb-4">
            Machine-generated G2P labels are commonly used to pretrain phonetic models, giving them
            a starting point before they learn from expert transcriptions. In our Interspeech 2026
            study, we find that once more than 20–30 hours of expert-labeled phonetic data are
            available, G2P supervision stops improving these models. Beyond this threshold,
            pretraining on broader automatic speech recognition (ASR) word transcripts and then
            fine-tuning with expert labels yields 2.3 times lower error rates than prior systems.
          </p>
          <div className="mb-4 mt-2 flex w-full flex-col gap-2 gap-x-4 font-sans sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
            >
              <a
                href="https://www.isca-archive.org/interspeech_2026/metzger26_interspeech.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the paper
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
            >
              <a href="https://github.com/KoelLabs/ML" target="_blank" rel="noopener noreferrer">
                Explore the code and data
              </a>
            </Button>
            <Button
              asChild
              className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
            >
              <a
                href="https://huggingface.co/KoelLabs/xlsr-english-01"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try the model
              </a>
            </Button>
          </div>

          <BlogSubheading>Background</BlogSubheading>
          <p className="mb-4">
            Expert-annotated phonetic labels are scarce, so it is common to combine self-supervised
            pretraining with synthetic, machine-generated phonetic labels. Self-supervised
            pretraining learns patterns directly from recordings without requiring someone to
            transcribe each one. G2P generates a pronunciation from a word&apos;s spelling rather
            than directly from the audio. As a result, its labels can miss mispronunciations and
            disfluencies, such as repetitions or interrupted sounds, in non-native speech and speech
            affected by a medical condition.
          </p>
          <PosterFigure
            name="g2p-vs-human"
            alt="Spanish-accented speech transcribed through ASR and G2P from spelling, compared with an expert listening directly to the audio"
            width={692}
            height={380}
          >
            G2P labels follow the spelling of “shampoo,” while an expert can label the pronunciation
            heard in the recording.
          </PosterFigure>
          <p className="mb-4">
            Human labels, where an expert listens to the audio and transcribes the exact
            pronunciation patterns, are the gold standard, but they cannot scale as easily as G2P
            labels. We investigate the scaling thresholds at which G2P is advantageous for building
            a state-of-the-art English phonetic transcription model.
          </p>

          <BlogSubheading>Questions</BlogSubheading>
          <p className="mb-4">
            We ask how the quantity and quality of labeled training data trade off in phonetic model
            performance, particularly for non-standard English speech patterns. We also ask whether
            a threshold in the amount of expert annotation can help determine when to use G2P, ASR,
            and human supervision.
          </p>

          <BlogSubheading>Contributions</BlogSubheading>
          <p className="mb-4">
            Our model reduces the error rate by a factor of 2.3 over prior systems, with the largest
            gains on non-native speech and speech affected by aphasia, a language disorder, reaching
            3.4% weighted phone feature error rate (WPFER). We also curate expert phone-labeled data
            into an English phonetic transcription benchmark.
          </p>
          <p className="mb-4">
            We identify a supervision-quality threshold: G2P helps only below about 20–30 hours of
            human annotation. Beyond that point, ASR pretraining is an effective way to introduce
            speaker diversity without averaging out important disfluency details through approximate
            G2P labels.
          </p>

          <BlogSubheading>Supervision Quality Threshold</BlogSubheading>
          <p className="mb-4">
            A training curriculum is the order and mix of data used to teach a model.
          </p>
          <p className="mb-4">
            Each stack in the figures below represents a training curriculum we evaluated. All start
            with an XLSR self-supervised model and ASR word transcripts. The final layer mixes
            expert and G2P labels in the proportions shown, and we compare curricula with and
            without an additional stage of 5,300 hours of G2P supervision.
          </p>
          <p className="mb-4">
            With 20.4 hours of expert labels and 20.4 hours of G2P labels in the final stage, adding
            the extra G2P stage lowers WPFER from 4.60% to 4.28%. With 40.8 hours of expert labels,
            however, extra G2P does not provide a significant gain: WPFER is 3.40% without that
            stage and 3.45% with it.
          </p>
          <PosterFigure
            name="threshold-under-30"
            alt="Two training curricula using 20.4 hours each of expert and G2P labels: WPFER is 4.60% without extra G2P and 4.28% with 5,300 extra G2P hours"
            width={692}
            height={456}
          >
            Below 30 hours of human annotation, extra G2P reduces error. The 95% confidence
            intervals are 4.49–4.70% and 4.19–4.37%, respectively.
          </PosterFigure>
          <PosterFigure
            name="threshold-over-30"
            alt="Two training curricula using 40.8 hours of expert labels: WPFER is 3.40% without extra G2P and 3.45% with 5,300 extra G2P hours"
            width={691}
            height={456}
          >
            Above 30 hours of human annotation, extra G2P provides no significant gain. The 95%
            confidence intervals are 3.33–3.46% and 3.39–3.52%, respectively.
          </PosterFigure>

          <BlogSubheading>Data</BlogSubheading>
          <p className="mb-4">
            Our dataset combines eight speech collections, or corpora, spanning 17 dialects,
            including eight non-native varieties. After standardization and cleaning, it contains 55
            hours of annotated speech: 41 hours for training and 14 hours for testing. The test data
            include 10 hours from unseen dialects. Keeping test recordings out of training lets us
            check whether the model can handle new speakers and ways of speaking.
          </p>
          <PosterFigure
            name="data"
            alt="Dataset overview for DARPA TIMIT, EpaDB, PSST, L2-ARCTIC, Speech Ocean, Buckeye, DoReCo, and ISLE, with speakers, hours, dialects, and test-set membership"
            width={691}
            height={282}
          >
            The benchmark includes native, non-native, and post-stroke aphasic speech.
            L2-ARCTIC&apos;s scripted and spontaneous speech appear separately in the table.
          </PosterFigure>

          <BlogSubheading>Evaluation Metrics</BlogSubheading>
          <p className="mb-4">
            A phone is one speech sound, and its features describe how it is produced, such as where
            the tongue or lips are placed.
          </p>
          <p className="mb-4">
            We use WPFER, weighted phone feature error rate, based on Panphon articulatory features.
            It enables fairer comparison across transcriptions with different phonetic mappings by
            giving partial credit to similar sounds. Our confidence intervals use 2,000 bootstrap
            samples: we repeatedly resample the test results to estimate uncertainty. The intervals
            and whiskers in the figures show how precise each estimate is. Lower error rates
            indicate better performance.
          </p>
          <PosterFigure
            name="metrics"
            alt="Regular PER assigns equal penalties to substitutions in Pop, Bop, and Iop, while weighted feature error distinguishes how similar the substituted sounds are"
            width={366}
            height={339}
            narrow
          >
            Feature-weighted scoring distinguishes near misses from less similar sounds. Read more
            in our{' '}
            <Link className={linkClass} href="/blog/phonemic-transcription-metrics">
              phonetic transcription metrics guide
            </Link>
            .
          </PosterFigure>

          <BlogSubheading>ASR Helps on Unseen Accents</BlogSubheading>
          <p className="mb-4">
            On ISLE, which contains unseen Italian and German accents, XLSR trained with expert
            labels achieves 3.84% WPFER. Adding ASR pretraining lowers that to 3.62%, while adding
            both ASR and G2P gives 3.69%. All three runs use 40.8 hours of expert labels. The
            figure&apos;s whiskers show 95% confidence intervals.
          </p>
          <PosterFigure
            name="unseen-accents"
            alt="ISLE WPFER comparison: XLSR plus experts 3.84%, plus ASR 3.62%, and plus ASR and G2P 3.69%, with 95% confidence intervals"
            width={691}
            height={124}
          >
            ASR pretraining improves performance on accents that were not present in the
            expert-labeled training data.
          </PosterFigure>

          <BlogSubheading>Limitations &amp; Future Work</BlogSubheading>
          <p className="mb-4">
            Future work should explore more low-resource languages, dialects, and types of speech
            affected by medical conditions. Our experiments only explore up to about 40 hours of
            human phonetic labels, so further work should investigate how the pattern evolves with
            more human data.
          </p>
          <p className="mb-4">
            Human annotations also contain annotator bias: experts can disagree about the same
            sound, so labels reflect individual judgments too. Future work should account for
            annotator agreement and explore approaches such as contrastive learning to reduce this
            source of training noise.
          </p>

          <section aria-labelledby="pronunciation-demo-heading" className="mt-8">
            <h2
              id="pronunciation-demo-heading"
              className="text-2xl font-semibold mt-8 mb-4 font-sans scroll-mt-28"
            >
              Try pronunciation feedback
            </h2>
            <p className="mb-4">
              Watch a short clip, repeat the phrase, and get pronunciation feedback from our
              phonetic transcription models. Choose Start Practice to use your microphone; your
              recording is sent to our servers for analysis.
            </p>
            <iframe
              src="/demos/pronunciation/index.html"
              title="Interactive Slay Speech pronunciation feedback demo"
              allow="microphone; autoplay"
              loading="lazy"
              className="block w-full max-w-[440px] h-[770px] mx-auto border-0"
            />
            <p className="mt-6 mb-4">
              For more stories, translations, personalized practice, and deeper pronunciation
              feedback, download{' '}
              <a
                className={linkClass}
                href="https://slayspeech.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slay Speech
              </a>
              , our English-speaking practice app.
            </p>
            <div className="flex flex-wrap gap-3 font-sans">
              <a
                href="https://apps.apple.com/us/app/slay-speech-english-speaking/id6766172003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Download for iOS
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.slayspeech.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Download for Android
              </a>
            </div>
          </section>
        </div>
      </div>
    </BlogBody>
  );
}
