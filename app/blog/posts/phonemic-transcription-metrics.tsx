import type { Metadata } from '../posts';

export const metadata: Metadata = {
  title: 'A Deep Dive into Phonemic Transcription Metrics',
  slug: 'phonemic-transcription-metrics',
  date: '2024-12-16',
  published: true,
  image: '/images/bentoFeedback.png',
  summary:
    'The International Phonetic Alphabet (IPA) is like the Swiss Army knife of pronunciation—it gives us precise symbols to represent every sound humans make in language. In recent years, predicting these phonemic transcriptions from audio has become a popular machine learning task. But how do we calculate the accuracy of these models?',
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
    <div className="bg-white/50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-10">
        <h2 className="text-base/7 font-semibold text-sky-600">
          {metadata.category}, {metadata.date}
        </h2>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl">
          {metadata.title}
        </h1>
        <br></br>
        <div className="relative lg:col-span-3">
          <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          <div
            style={{ padding: '2em' }}
            className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]"
          >
            <p>{metadata.summary}</p>
            <p>At Koel Labs, we use two key metrics to evaluate phonemic transcription models:</p>
            <ol>
              <li>
                Phonemic Error Rate (PER): The classic "how many mistakes did you make?" metric
              </li>
              <li>
                Weighted Phonemic Edit Distance (WPED): A smarter approach that considers how
                similar sounds are to each other
              </li>
            </ol>
            <h3>Why Traditional Metrics Fall Short: A Tale of Three Words</h3>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
        </div>
      </div>
    </div>
  );
}
