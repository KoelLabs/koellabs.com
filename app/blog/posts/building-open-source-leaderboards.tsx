// This is the individual blog post page content. It is rendered insides [slug]/page.tsx.
// The metadata object is used to display the blog post on the main blog page (app/blog/page.tsx).
// It will also be used to set meta tags for SEO once I get around to adding that.

import type { Metadata } from '../posts';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="bg-white absolute h-full w-full mt-96 border-y border-neutral-200"></div>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl lg:px-8 z-10">
        <h2 className="text-base/7 font-semibold text-sky-600 text-center">{metadata.category}</h2>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl text-center">
          {metadata.title}
        </h1>
        <div className="flex justify-center mt-4">
          <time dateTime={metadata.date} className="text-neutral-600">
            {formatDate(metadata.date)}
          </time>
        </div>
        <div className="p-px mt-16 relative z-10 bg-linear-to-b from-transparent via-neutral-200 to-transparent rounded-lg">
          <img
            src="/images/blogLeaderboardsAlt.png"
            alt="Building Open Source Leaderboards"
            className="w-full h-auto rounded-lg z-10 relative"
          />
        </div>

        <br></br>
        <div className="relative lg:col-span-3">
          <div className="relative flex h-full flex-col overflow-hidden tracking-[-0.010em] text-lg">
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
            <h2 className="text-2xl font-semibold mt-8 mb-4">
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

            <h2 className="text-2xl font-semibold mt-8 mb-4">
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
                <span className="font-semibold text-sky-700">app.py:</span> Handles the front-end
                logic using Gradio, providing a clean interface for viewing the leaderboard,
                checking model status, and submitting new models
              </li>
              <li className="mb-2">
                <span className="font-semibold text-sky-700">tasks.py:</span> Manages the back-end
                operations, interfacing with three JSON files in the queue directory:
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>
                    <span className="font-semibold text-sky-700">leaderboard.json:</span> Stores the
                    final, processed rankings
                  </li>
                  <li>
                    <span className="font-semibold text-sky-700">tasks.json:</span> Tracks newly
                    submitted models
                  </li>
                  <li>
                    <span className="font-semibold text-sky-700">results.json:</span> Contains
                    detailed metadata for completed evaluations
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
              className="my-6 rounded-md p-2 bg-white/50 border border-neutral-200"
            />

            <p className="mb-4">
              This openness and automation represent a step toward the kind of standardized
              evaluation infrastructure that has helped accelerate progress in other areas of
              machine learning but has been notably absent in phonemic transcription.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Technical Implementation Details</h2>

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

            <h2 className="text-2xl font-semibold mt-8 mb-4">We Need More of These Projects</h2>

            <p className="mb-4">
              The success of platforms like the Open LLM Leaderboard, with nearly 3,000 submissions,
              demonstrates the community's appetite for transparent model comparison. While some
              argue that gamifying model development could lead to metric gaming, we've seen how
              leaderboards can transform competition into collaboration. They provide standardized
              benchmarks, foster innovation through transparency, and create an engaging entry point
              for newcomers to the field. Most importantly, they help surface promising but
              lesser-known models that might otherwise remain undiscovered.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Looking Forward</h2>

            <Image
              src="/images/blogLeaderboard2.png"
              alt="Hosting your leaderboard"
              width={1200}
              height={600}
              className="mb-6 rounded-md p-2 bg-white/50 border border-neutral-200"
            />

            <p className="mb-4">
              Creating leaderboards has historically been challenging, with many templates becoming
              quickly outdated. Hugging Face has recently streamlined this process through their
              Space SDK, which is ideal for evaluating models of varying sizes and computational
              requirements. To create a leaderboard using their template:
            </p>

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
