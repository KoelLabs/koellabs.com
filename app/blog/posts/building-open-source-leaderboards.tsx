import type { Metadata } from '../posts';
import Link from 'next/link';
import { sourceSerif } from '@/app/fonts';
import BlogBody from '../blog-components/body';
import BlogHeading from '../blog-components/heading';
import BlogHeroImage from '../blog-components/hero-image';
import BlogSubheading from '../blog-components/subheading';
import BlogImage from '../blog-components/image';
import BlogDecorations from '../blog-components/decorations';
import Leaderboard from '@/app/previews/sections-previews/leaderboard';
import { LEADERBOARD_URL } from '@/lib/leaderboard';

export const metadata: Metadata = {
  title: 'Building Open Source Hugging Face Leaderboards',
  slug: 'building-open-source-leaderboards',
  date: '2025-01-11',
  published: true,
  image: '/api/leaderboard/image',
  summary:
    'How we built an open-source English speech-to-IPA leaderboard with Gradio, reproducible evaluation across five speech datasets, normalized PER and FER scoring, and live results from Hugging Face.',
  category: 'Technical Report',
  tags: [{ text: 'Hugging Face', url: 'https://huggingface.co/KoelLabs' }],
};

const source = `${LEADERBOARD_URL}/blob/main`;
const linkClass = 'text-sky-600 hover:underline';

export default function PostBody() {
  return (
    <BlogBody>
      <div>
        <BlogHeading
          category={metadata.category}
          categoryColorClass="text-sky-600"
          title={metadata.title}
          dateISO={metadata.date}
          maxWidth={600}
        />
        <BlogHeroImage
          src="/api/leaderboard/image?variant=hero"
          alt="The leading English speech-to-IPA models, ranked by average feature error rate"
        />
        <div className="relative lg:col-span-3 max-w-3xl mx-auto mt-12">
          <BlogDecorations />
          <div
            className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
          >
            <p className="mb-8 text-sm text-neutral-500 font-sans">
              Updated November 6, 2026. Leaderboard rankings refresh hourly from Hugging Face.
            </p>
            <BlogSubheading>An Introduction</BlogSubheading>
            <p className="mb-4">
              Comparing Speech2IPA models fairly with other systems is very involved: models use
              different output alphabets, evaluation datasets, and scoring conventions. Yet, without
              the ability to compare new systems accurately with prior systems, it becomes
              impossible to measure progress.
            </p>
            <p className="mb-4">
              We built the{' '}
              <Link
                className={linkClass}
                href={LEADERBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                English Speech-to-IPA Leaderboard
              </Link>{' '}
              to make model discovery and comparison easier and to give the speech community a clear
              target to work towards. It brings specialist phonetic recognizers, multilingual
              systems, compact models, and ensembles into a shared evaluation covering native,
              non-native, and post-stroke English speech.
            </p>

            <BlogSubheading>Reading the Leaderboard</BlogSubheading>
            <p className="mb-4">
              The table shows each model&apos;s size, average phoneme error rate (PER), average
              feature error rate (FER), repository link when supplied, and submission date. Lower
              error rates are better. The default ranking uses average FER; the Space also supports
              sorting by PER or model size and comparing FER for individual datasets. For each model
              repository, the table displays its latest submission rather than every historical
              evaluation.
            </p>
            <Leaderboard preview />

            <BlogSubheading>Evaluation Across Five Speech Datasets</BlogSubheading>
            <p className="mb-4">
              The benchmark uses a revision-pinned private test set of 500 clips, sampled as 100
              clips from each of five datasets:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <strong>TIMIT:</strong> native English speech.
              </li>
              <li className="mb-2">
                <strong>EpaDB:</strong> English spoken by people whose first language is Spanish.
              </li>
              <li className="mb-2">
                <strong>Speech Ocean:</strong> English spoken by people whose first language is
                Mandarin.
              </li>
              <li className="mb-2">
                <strong>ISLE:</strong> English spoken by people whose first language is Italian or
                German.
              </li>
              <li className="mb-2">
                <strong>PSST:</strong> speech from people with post-stroke aphasia.
              </li>
            </ul>
            <p className="mb-4">
              We score each utterance and average those scores across the test set. Dataset-specific
              FER helps show where an overall average can hide differences between speaker groups.
              In the Space, select datasets under <strong>Compare datasets</strong> to see their
              scores and descriptions of the speakers they represent.
            </p>

            <BlogImage
              src="/images/leaderboard-2026-11.jpg"
              alt="The Hugging Face leaderboard in desktop Chrome showing current models, size, PER, FER, and dataset controls"
              width={1140}
              height={908}
              expanded={false}
              className="my-10"
            />

            <BlogSubheading>Consistent IPA and Scoring</BlogSubheading>
            <p className="mb-4">
              Predictions and references pass through the same IPA normalization before scoring.
              Equivalent spellings are standardized, Unicode is normalized, and whitespace, stress
              marks, syllable dots, and tie bars are removed. Phonetic details such as vowel
              quality, rhoticity, length, aspiration, and nasalization are retained. Models that
              emit ARPAbet, TIMIT codes, or other supported alphabets use explicit conversion
              adapters before this step.
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li className="mb-3">
                <strong>PER (Phoneme Error Rate):</strong> the Levenshtein/edit distance between
                canonical IPA strings divided by the reference string&apos;s character length. This
                is just like character error rate (CER) but with the ipa phonemes.
              </li>
              <li className="mb-3">
                <strong>FER (Feature Error Rate):</strong> weighted articulatory-feature edit
                distance using Panphon. Just like PER but similar sounds can incur a smaller
                substitution cost than very different sounds.
              </li>
            </ol>

            <p className="mb-4">
              You can read more about these evaluation methods{' '}
              <Link
                href="/blog/phonemic-transcription-metrics"
                className="text-sky-600 hover:underline"
              >
                in our blog post here
              </Link>
              .
            </p>

            <BlogSubheading>How the Space Works</BlogSubheading>
            <p className="mb-4">
              The implementation combines a Gradio interface with background evaluation workers and
              a Hugging Face dataset for aggregate scores. Its main components are:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-3">
                <code>app.py</code> builds the leaderboard, dataset and sort controls, model
                submission form, sample inference interface, and status lookup.
              </li>
              <li className="mb-3">
                <code>tasks.py</code> starts evaluation in a separate process, tracks submitted,
                evaluating, completed, or failed states in memory, and collects the aggregate
                metrics.
              </li>
              <li className="mb-3">
                <code>inference.py</code> and model-specific adapters load supported architectures
                and produce transcriptions. <code>scoring.py</code> handles verified output-alphabet
                conversions, while <code>metrics.py</code> applies shared normalization and scoring.
              </li>
              <li className="mb-3">
                <code>hf.py</code> records model revision, size, submission details, scoring policy,
                and aggregate results in a private Hugging Face score dataset. The public interface
                shows the resulting rankings.
              </li>
              <li className="mb-3">
                <code>testset.py</code> loads the private evaluation sample at a fixed revision.
                Evaluation audio, references, and prediction caches remain outside the public Space
                repository.
              </li>
            </ul>
            <p className="mb-4">
              The source code and scoring rules are public; access to the private evaluation and
              score datasets is handled by the Space&apos;s credentials. The task list is
              process-local, so status lookup is tied to the running Space rather than a persistent
              JSON queue. Completed aggregate results are stored in the backing dataset.
            </p>

            <BlogSubheading>Submitting and Testing a Model</BlogSubheading>
            <ol className="list-decimal pl-6 mb-4">
              <li className="mb-2">
                Open <strong>Submit Model</strong> in the Space.
              </li>
              <li className="mb-2">
                Enter the model ID, a submission name, and an optional repository or project URL.
              </li>
              <li className="mb-2">
                Select the supported model type and its output phonetic code. Choose IPA if the
                model already emits IPA.
              </li>
              <li className="mb-2">
                Use <strong>Test Model</strong> with a sample audio clip to check that the adapter
                and output code work before requesting a full evaluation.
              </li>
              <li className="mb-2">
                Click <strong>Submit</strong>, keep the returned task ID, and check{' '}
                <strong>Submission Status</strong> using that ID or the model ID. Completed
                evaluations appear in the leaderboard after refresh.
              </li>
            </ol>
            <BlogImage
              src="/images/leaderboard-submit-2026-11.jpg"
              alt="The current Hugging Face submission form with model ID, submission name, model type, and output phonetic code"
              width={1140}
              height={908}
              expanded={false}
              className="my-10"
            />
            <p className="mb-4">
              The Space runs on a basic CPU environment with 16 GB RAM and 2 vCPUs. Evaluation time
              depends on the architecture and runtime; a full run can take hours. Larger systems and
              specialized adapters may need a separate evaluation environment. Adding a new
              architecture requires a compatible inference adapter and verified output conversion.
            </p>

            <BlogSubheading>Reusing the Implementation</BlogSubheading>
            <p className="mb-4">
              To adapt the project, start with the{' '}
              <Link
                className={linkClass}
                href={`${LEADERBOARD_URL}/tree/main`}
                target="_blank"
                rel="noopener noreferrer"
              >
                public source
              </Link>{' '}
              and follow{' '}
              <Link
                className={linkClass}
                href={`${source}/DEVELOPMENT.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                the development guide
              </Link>{' '}
              for the Python environment, dependencies, dataset access, and local startup. A
              deployment needs access to its evaluation dataset and write access to its score
              dataset; keep those credentials in server-side secrets. Test the inference adapters
              and scoring rules before publishing results.
            </p>
            <p className="mb-4">
              We welcome contributions to model adapters, evaluation coverage, scoring tests, and
              documentation. Visit the{' '}
              <Link
                className={linkClass}
                href={`${source}/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                contribution guide
              </Link>{' '}
              or{' '}
              <Link
                className={linkClass}
                href={`${LEADERBOARD_URL}/discussions`}
                target="_blank"
                rel="noopener noreferrer"
              >
                open a discussion
              </Link>{' '}
              to help make phonetic model discovery and comparison more accessible.
            </p>
          </div>
        </div>
      </div>
    </BlogBody>
  );
}
