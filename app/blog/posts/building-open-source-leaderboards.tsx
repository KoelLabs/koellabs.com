// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';
import Image from 'next/image';
import Link from 'next/link';
import { Source_Serif_4 } from 'next/font/google';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Added formatDate function
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const metadata: Metadata = {
  title: 'Building Open Source Hugging Face Leaderboards',
  slug: 'building-open-source-leaderboards',
  date: '2025-01-11',
  published: true,
  image: '/images/blogLeaderboards.png',
  summary:
    "Sometimes, the best machine learning models are hidden in plain sight. During our work on phonemic transcription, we stumbled upon a specialized ginic model that had been finetuned on Facebook's XLSR-53 model using the Buckeye corpus. This discovery proved significant: Ginic performs 1.2x better than Facebook, and iterating on their approach, our model performs 2.2x better than ginic. However, finding this model was more a product of extensive searching than systematic discovery, highlighting a broader challenge in the phoneme transcription space.",
  category: 'Technical Report',
  tags: [
    {
      text: 'Hugging Face',
      url: 'https://huggingface.co/KoelLabs',
    },
  ],
};

export default function PostBody() {
  return (
    <div className="bg-white/50 py-24 sm:py-32 relative">
      <div className="mx-auto absolute opacity-25 sm:opacity-100 top-0 left-0 right-0 bottom-0 lg:max-w-[1346px] flex justify-between z-[-1] h-[1300px]">
        <div className="h-full"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-400"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-white via-30% via-neutral-200 to-neutral-400"></div>
        <div className="h-full"></div>
      </div>

      <div className="bg-white absolute h-full w-full mt-96 border-y border-neutral-200">
        <div className="absolute left-0 top-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute right-0 top-0 w-[49.3px] h-[49px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute left-0 top-[225px] w-[49.3px] h-[48px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>

        <div className="absolute right-0 top-[225px] w-[49.3px] h-[48px] bg-neutral-50 p-1 z-[5] hidden 2xl:block">
          <div className="rounded-full w-full h-full border bg-white"></div>
        </div>
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b absolute top-0 left-0 z-[1]">
          <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
            {Array(500)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-full w-px bg-neutral-200 dark:bg-neutral-800 -mb-12"
                ></div>
              ))}
          </div>
        </div>
        <div className=" w-full h-[250px] overflow-hidden bg-neutral-50 absolute top-0 left-0"></div>
        <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-y absolute top-56 left-0">
          <div className="flex h-full items-start gap-[7.99px] ml-[0.2px]">
            {Array(500)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="h-full w-px bg-neutral-200 dark:bg-neutral-800 -mb-12"
                ></div>
              ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-6xl lg:px-8 z-10">
        <div className="relative lg:max-w-5xl">
          <h2 className="text-sm tracking-tight font-semibold text-sky-600 text-center border border-neutral-200 rounded-full w-fit mx-auto px-3 mb-4 py-1">
            {metadata.category}
          </h2>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl text-center">
            {metadata.title}
          </h1>
          <div className="flex justify-center mt-4">
            <time dateTime={metadata.date} className="text-neutral-600">
              {formatDate(metadata.date)} • By Koel Labs
            </time>
          </div>
        </div>
        <div className="border rounded-2xl overflow-hidden mt-16 relative z-10 p-2 bg-neutral-50">
          <img
            src="/images/blogLeaderboardsAlt.png"
            alt="Building Open Source Leaderboards"
            className="w-full h-auto rounded-lg z-10 relative border"
          />
        </div>

        <br></br>
        <div className="relative lg:col-span-3 max-w-3xl mx-auto mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1121"
            height="1308"
            fill="none"
            viewBox="0 0 1121 1308"
            className="absolute -top-128 -left-[890px] scale-50"
          >
            <path
              stroke="#E5E5E5"
              d="M53 .5h710c28.443 0 51.5 23.057 51.5 51.5v217.25c0 28.995 23.505 52.5 52.5 52.5h201.5c28.44 0 51.5 23.057 51.5 51.5v882.72c0 28.44-23.06 51.5-51.5 51.5H53c-28.443 0-51.5-23.06-51.5-51.5V52C1.5 23.557 24.557.5 53 .5Z"
            ></path>
            <path fill="url(#paint0_linear_4063_253)" d="M1 599h1120v709H1z"></path>
            <path
              fill="url(#paint1_linear_4063_253)"
              d="M554.5 0h1308v554h-1308z"
              transform="rotate(90 554.5 0)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_4063_253"
                x1="561"
                x2="561"
                y1="599"
                y2="1308"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#fff"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_4063_253"
                x1="1208.5"
                x2="1208.5"
                y1="0"
                y2="554"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" stopOpacity="0"></stop>
                <stop offset="0.87" stopColor="#fff"></stop>
              </linearGradient>
            </defs>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1121"
            height="1308"
            fill="none"
            viewBox="0 0 1121 1308"
            className="absolute -top-128 -right-[890px] scale-50 rotate-y-180"
          >
            <path
              stroke="#E5E5E5"
              d="M53 .5h710c28.443 0 51.5 23.057 51.5 51.5v217.25c0 28.995 23.505 52.5 52.5 52.5h201.5c28.44 0 51.5 23.057 51.5 51.5v882.72c0 28.44-23.06 51.5-51.5 51.5H53c-28.443 0-51.5-23.06-51.5-51.5V52C1.5 23.557 24.557.5 53 .5Z"
            ></path>
            <path fill="url(#paint0_linear_4063_253)" d="M1 599h1120v709H1z"></path>
            <path
              fill="url(#paint1_linear_4063_253)"
              d="M554.5 0h1308v554h-1308z"
              transform="rotate(90 554.5 0)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_4063_253"
                x1="561"
                x2="561"
                y1="599"
                y2="1308"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#fff"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_4063_253"
                x1="1208.5"
                x2="1208.5"
                y1="0"
                y2="554"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" stopOpacity="0"></stop>
                <stop offset="0.87" stopColor="#fff"></stop>
              </linearGradient>
            </defs>
          </svg>

          <div
            className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
          >
            <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">An Introduction</h2>
            <p className="mb-4">
              Sometimes, the best machine learning models are hidden in plain sight. During our work
              on phonemic transcription, we stumbled upon a specialized{' '}
              <Link
                className="text-sky-600 hover:underline"
                href="https://huggingface.co/ginic"
                target="_blank"
                rel="noopener noreferrer"
              >
                ginic model
              </Link>{' '}
              that had been finetuned on{' '}
              <Link
                className="text-sky-600 hover:underline"
                href="https://huggingface.co/facebook/wav2vec2-large-xlsr-53"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook's XLSR-53 model
              </Link>{' '}
              using the Buckeye corpus. This discovery proved significant: Ginic performs 1.2x
              better than Facebook, and iterating on their approach, our model performs 2.2x better
              than ginic. However, finding this model was more a product of extensive searching than
              systematic discovery, highlighting a broader challenge in the phoneme transcription
              space that led us to build{' '}
              <Link
                className="text-sky-600 hover:underline"
                href="https://huggingface.co/spaces/KoelLabs/IPA-Transcription-EN"
                target="_blank"
                rel="noopener noreferrer"
              >
                this open-source leaderboard
              </Link>
              .
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">
              The Need for Better Model Discovery and Standardized Evaluation
            </h2>

            <p className="mb-4">
              While leaderboards have become fundamental infrastructure in many areas of machine
              learning - from{' '}
              <Link
                href="https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard#/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                large language models
              </Link>{' '}
              to{' '}
              <Link
                href="https://huggingface.co/spaces/hf-audio/open_asr_leaderboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                automatic speech recognition
              </Link>{' '}
              - the field of phonemic transcription notably lacks such standardized evaluation
              frameworks. This gap isn't just about missing leaderboards - it reflects a broader
              absence of unified evaluation standards and comprehensive survey papers that could
              allow researchers and practitioners to track progress and compare approaches
              effectively.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">
              A Streamlined Architecture for Open Evaluation
            </h2>

            <p className="mb-4">
              To address this gap, we implemented a system that handles both the queue backend and
              the leaderboard frontend. This design prioritizes transparency and accessibility -
              crucial elements often missing in evaluation. Our architecture consists of two main
              components:
            </p>

            <ul className="list-disc list-inside mb-4 pl-4">
              <li className="mb-2">
                <span className="font-semibold text-sky-600 font-sans">app.py:</span> Handles the
                front-end logic using Gradio, providing a clean interface for viewing the
                leaderboard, checking model status, and submitting new models
              </li>
              <li className="mb-2">
                <span className="font-semibold text-sky-600 font-sans">tasks.py:</span> Manages the
                back-end operations, interfacing with three JSON files in the queue directory:
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>
                    <span className="font-semibold text-sky-600 font-sans">leaderboard.json:</span>{' '}
                    Stores the final, processed rankings
                  </li>
                  <li>
                    <span className="font-semibold text-sky-600 font-sans">tasks.json:</span> Tracks
                    newly submitted models
                  </li>
                  <li>
                    <span className="font-semibold text-sky-600 font-sans">results.json:</span>{' '}
                    Contains detailed metadata for completed evaluations
                  </li>
                </ul>
              </li>
            </ul>

            <p className="mb-4">
              Transparency was a key consideration in our design. Unlike some existing leaderboards
              like{' '}
              <Link
                href="https://huggingface.co/spaces/hf-audio/open_asr_leaderboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                Open ASR
              </Link>{' '}
              that require users to request model evaluation and wait, our system automates the
              process. Most models can be evaluated on the whole test set within hours of
              submission.
            </p>

            <p className="mb-4">
              Additionally, the front-end leaderboard and queue backend are visible to all Hugging
              Face users - a deliberate choice to promote transparency. The results file provides
              detailed metadata about evaluations and model outputs, allowing users to understand
              precisely how models perform and evaluations are conducted. that require users to
              request model evaluation and wait, our system automates the process.
            </p>

            <Image
              src="/images/blogLeaderboard1.png"
              alt="Check status of your model"
              width={1200}
              height={600}
              className="rounded-2xl p-1.5 bg-neutral-50 border-[0.75px] scale-150 my-32 mb-36"
            />

            <p className="mb-4">
              This openness and automation represent a step toward the kind of standardized
              evaluation infrastructure that has helped accelerate progress in other areas of
              machine learning but has been notably absent in phonemic transcription.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">
              Technical Implementation Details
            </h2>

            <p className="mb-4">
              Our evaluation system measures model performance using two key metrics:
            </p>

            <ol className="list-decimal list-inside mb-4 pl-4">
              <li className="mb-2">
                PER (Phoneme Error Rate): Calculated using Levenshtein distance between predicted
                and actual phoneme sequences
              </li>
              <li className="mb-2">
                PWED (Phoneme Weighted Edit Distance): A more nuanced metric that considers phonemic
                feature distances, implemented using the panphon library
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

            <p className="mb-4">
              We use the TIMIT speech corpus as our evaluation dataset, providing a standardized
              benchmark widely recognized in the speech recognition community. The evaluation runs
              on a consistent compute environment (16GB RAM, 2vCPUs) to ensure reproducibility.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">
              We Need More of These Projects
            </h2>

            <p className="mb-4">
              The success of platforms like the Open LLM Leaderboard, with nearly 3,000 submissions,
              demonstrates the community's appetite for transparent model comparison. While some
              argue that gamifying model development could lead to metric gaming, we've seen how
              leaderboards can transform competition into collaboration. They provide standardized
              benchmarks, foster innovation through transparency, and create an engaging entry point
              for newcomers to the field. Most importantly, they help surface promising but
              lesser-known models that might otherwise remain undiscovered.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-sans">Looking Forward</h2>

            <p className="mb-4">
              Creating leaderboards has historically been challenging, with many templates becoming
              quickly outdated. Hugging Face has recently streamlined this process through their
              Space SDK, which is ideal for evaluating models of varying sizes and computational
              requirements. To create a leaderboard using their template:
            </p>

            <Image
              src="/images/blogLeaderboard2.png"
              alt="Hosting your leaderboard"
              width={1200}
              height={600}
              className="rounded-2xl p-1.5 bg-white border-[0.75px] scale-150 my-36"
            />

            <ol className="list-decimal list-inside mb-4 pl-4 italic">
              <li className="mb-2">
                Navigate to{' '}
                <Link
                  href="https://huggingface.co/new-space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline"
                >
                  https://huggingface.co/new-space
                </Link>
              </li>
              <li className="mb-2">Select "Space SDK" as the template type</li>
              <li className="mb-2">Choose "Gradio" as the framework</li>
              <li className="mb-2">Select "Leaderboard" from the template options</li>
              <li className="mb-2">
                You will be asked for an access token in the UI before you create the space. This
                can be created in{' '}
                <Link
                  href="https://huggingface.co/login?next=%2Fsettings%2Ftokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline"
                >
                  your settings
                </Link>{' '}
                and needs read access for the leaderboard to function.
              </li>
            </ol>

            <p className="mb-4">
              For evaluating collections of smaller models that don't require extensive pre-testing,
              our lightweight implementation offers a practical working example. It demonstrates a
              complete end-to-end leaderboard system while maintaining simplicity in both setup and
              maintenance. We've made our codebase publicly available - feel free to duplicate it
              for your own specialized evaluation needs or use it as a reference implementation when
              building more complex systems. We are actively working on adding more evaluation
              datasets/metrics and support for more model architectures and{' '}
              <Link
                href="https://github.com/KoelLabs/.github/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                welcome contributions
              </Link>
              !
            </p>

            <p className="mb-4">
              The path to better model evaluation shouldn't be blocked by infrastructure complexity.
              Whether using Hugging Face's template or our simpler architecture, the goal remains
              the same: making model discovery and comparison more accessible to the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
