import type { Metadata } from '../posts';
import Link from 'next/link';
import { sourceSerif } from '@/app/fonts';
import { Button } from '@/components/ui/base/button';
import BlogBody from '../blog-components/body';
import BlogHeading from '../blog-components/heading';
import BlogHeroImage from '../blog-components/hero-image';
import BlogSubheading from '../blog-components/subheading';
import BlogDecorations from '../blog-components/decorations';
import BlogFigure from '../blog-components/figure';

const paper = 'https://arxiv.org/abs/2610.17761';
const code = 'https://github.com/smfsamir/longitudinal-asr-eval';
const assets = '/blog/slt-2026';

export const metadata: Metadata = {
  title: 'Speech Recognition Keeps Improving. Why Are Some Accents Still Being Left Behind?',
  slug: 'connecting-the-dots-asr-gaps',
  date: '2026-11-07T00:00:00-08:00',
  published: true,
  image: `${assets}/paper-cover.webp`,
  imagePosition: 'top',
  socialImage: `${assets}/paper-og.jpg`,
  summary:
    'We followed 16 speech recognition systems released from 2021 to 2025 across eight accent-aware evaluations. Newer systems did not reliably close accent gaps, and selected minority accents faced larger regressions.',
  category: 'Technical Report',
  tags: [
    { text: 'IEEE SLT 2026', url: paper },
    { text: 'Code and data', url: code },
  ],
};

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
        width={1200}
        height={900}
        src={`${assets}/paper-hero.svg`}
        alt="First page of Connecting the Dots: Enduring Performance Gaps in ASR Systems Between Standard and Minority English Varieties"
      />
      <div className="relative max-w-3xl mx-auto mt-12">
        <BlogDecorations />
        <div
          className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
        >
          <p className="mb-4">
            Newer AI systems are supposed to be better at understanding speech. But that improvement
            isn't equally shared. In our study of 16 speech-recognition systems released between
            2021 and 2025, we found that performance gaps between mainstream and underrepresented
            English accents did not consistently narrow. Worse, when switching to a later system
            resulted in poorer transcription, the setbacks were often substantially larger for
            underrepresented accents.
          </p>
          <div className="mb-4 mt-2 flex w-full flex-col gap-2 gap-x-4 font-sans sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
            >
              <a href={paper} target="_blank" rel="noopener noreferrer">
                Read the paper
              </a>
            </Button>
            <Button
              asChild
              className="active:scale-[97%] transition-all duration-50 w-full sm:w-auto"
            >
              <a href={code} target="_blank" rel="noopener noreferrer">
                Explore the code and data
              </a>
            </Button>
          </div>

          <BlogSubheading>Following the gap across four years</BlogSubheading>
          <p className="mb-4">
            A benchmark is a shared test used to compare models. A model can perform well on that
            test while struggling with speech the test barely represents. We therefore evaluate
            systems on four multi-accent speech collections, divided into eight tasks, rather than
            relying on a single overall score.
          </p>
          <div className="my-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white font-sans text-sm/6">
            <table className="w-full min-w-[480px] text-left">
              <caption className="sr-only">
                Four speech collections yield eight separate evaluations.
              </caption>
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Speech collection
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Evaluations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium">
                    Speech Accent Archive
                  </th>
                  <td className="px-4 py-3">One shared reading passage</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium">
                    L2-Arctic
                  </th>
                  <td className="px-4 py-3">Read speech and spontaneous speech</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium">
                    OpenSLR-83
                  </th>
                  <td className="px-4 py-3">English varieties from the British Isles</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium">
                    ALLSTAR
                  </th>
                  <td className="px-4 py-3">
                    <em>The Little Prince</em>, Human Rights, and two Hearing in Noise Test (HINT)
                    sentence lists
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4">
            We measure word error rate (WER): the number of substituted, missing, or added words,
            divided by the number of words in the reference transcript. Lower is better. Ten errors
            against a 100-word reference give a WER of 10%.
          </p>
          <p className="mb-4">
            For each evaluation, we track the difference between the paper&apos;s selected minority
            accent and a standard-accent control. The control is Mainstream US English (MUSE),
            except in OpenSLR-83, where it is Southern British English. The comparison accent stays
            fixed across models. Here, &ldquo;minority&rdquo; refers to varieties underrepresented
            in mainstream ASR evaluation.
          </p>

          <BlogSubheading>The gap appears in every evaluation</BlogSubheading>
          <p className="mb-4">
            Averaged across the 16 systems, the gaps range from about 9 to 26 percentage points. A
            percentage-point gap is an absolute difference: 20% WER versus 5% WER is a 15-point gap.
          </p>
          <BlogFigure
            src={`${assets}/average-gaps.svg`}
            width={960}
            height={810}
            scrollOnMobile
            alt="Average WER gaps across eight evaluations range from 9.2 points on OpenSLR-83 to 26.2 points on ALLSTAR Little Prince. Each row names the fixed minority comparison accent."
          >
            Each bar averages the minority-minus-standard gap over the 16 systems.
          </BlogFigure>
          <p className="mb-4">
            Reading a same passage, recalling a story, and speaking spontaneously place different
            demands on a recognizer, so the datasets are not interchangeable measures of an
            accent&apos;s difficulty. Yet the common pattern is a persistent gap between minority
            accent and mainstream accent model performance.
          </p>

          <BlogSubheading>Some gaps narrow, but progress can reverse</BlogSubheading>
          <p className="mb-4">
            Looking at release dates, we find statistically significant evidence of a narrowing gap
            in only two of the eight evaluations: read L2-Arctic and OpenSLR-83. Their Spearman
            correlations are −0.60 and −0.75, respectively, with p &lt; 0.05. A negative correlation
            means later systems tend to have smaller gaps. The other six do not provide significant
            evidence of a downward trend.
          </p>
          <p className="mb-4">
            Even OpenSLR-83&apos;s encouraging overall trend contains a reversal. The Irish–Southern
            British English gap falls to about 0.7 points at Qwen3 ASR, then rises across the final
            three releases to about 8.5 points at Omnilingual. Progress over several years does not
            guarantee that the next available system will preserve it.
          </p>
          <BlogFigure
            src={`${assets}/gap-over-time.svg`}
            width={960}
            height={641}
            scrollOnMobile
            alt="OpenSLR-83 gap by model release date. The full-period trend declines, but the last four systems have gaps of 0.7, 5.1, 5.4, and 8.5 percentage points."
          >
            Each point is one system at its release date. The orange segment highlights the final
            four systems.
          </BlogFigure>

          <BlogSubheading>A later system can perform much worse</BlogSubheading>
          <p className="mb-4">
            A regression is an increase in errors relative to an earlier system. One striking
            example comes from ALLSTAR&apos;s second Hearing in Noise Test (HINT) sentence list. For
            Nkore-influenced English, mean WER rises from about 7.0% with Whisper large-v2 to 71.7%
            with MMS 1B: an increase of roughly 65 percentage points. The corresponding increase for
            MUSE is about 5.3 points.
          </p>
          <BlogFigure
            src={`${assets}/regression-example.svg`}
            width={960}
            height={608}
            scrollOnMobile
            alt="From Whisper large-v2 to MMS 1B on ALLSTAR HINT 2, Nkore English WER rises from 7.0% to 71.7%, while Mainstream US English rises from 1.3% to 6.6%."
          >
            The two systems transcribe the same evaluation recordings. This is a comparison between
            different developers&apos; systems.
          </BlogFigure>
          <p className="mb-4">
            This is a large individual regression, not the typical result of every release. To
            understand whether the pattern extends beyond one example, we need to measure setbacks
            across the whole series.
          </p>

          <BlogSubheading>Who bears the larger setbacks?</BlogSubheading>
          <p className="mb-4">
            We compare every chronologically ordered pair of systems, keep the pairs where WER
            increases, and average the size of those increases. We call this mean degradation (MD).
            It measures how severe the setbacks are when they occur, rather than how likely a new
            release is to perform worse. The pairs include non-adjacent releases.
          </p>
          <BlogFigure
            src={`${assets}/mean-degradation.svg`}
            width={960}
            height={820}
            scrollOnMobile
            alt="Mean degradation is higher for the selected minority accent in all eight evaluations. Six differences are significant; Speech Accent Archive and OpenSLR-83 are not."
          >
            Blue circles mark the standard control; orange diamonds mark the selected minority
            accent. Filled diamonds indicate significance under the paper&apos;s one-sided bootstrap
            test, using 1,000 resamples.
          </BlogFigure>
          <p className="mb-4">
            All eight point estimates are higher for the selected minority accent, and six
            differences are statistically significant. On ALLSTAR HINT 2, MD is 14.1 points for
            Nkore English versus 2.7 for MUSE.
          </p>

          <BlogSubheading>Whose speech do the benchmarks make visible?</BlogSubheading>
          <p className="mb-4">
            We also audit the evaluation datasets listed in the systems&apos; technical reports. Of
            61 model–dataset evaluations, only 12 explicitly consider accent diversity. Repeated
            uses of a benchmark count separately. Among 24 distinct benchmark families, seven
            explicitly consider multiple English varieties.
          </p>
          <BlogFigure
            src={`${assets}/benchmark-coverage.svg`}
            width={960}
            height={478}
            scrollOnMobile
            alt="Of 61 model-dataset evaluations audited in technical reports, 12 explicitly consider accent diversity and 49 do not."
          >
            Each square represents one benchmark use in the technical-report audit.
          </BlogFigure>
          <p className="mb-4">
            Mainstream US English appears throughout this evaluation infrastructure, often across
            several speaking styles and settings. Other English varieties receive more sporadic
            attention. Supporting more languages or collecting more hours of speech does not, by
            itself, tell us whether the full range of English accents is represented.
          </p>
          <p className="mb-4">
            We argue that these benchmark choices act as an implicit language policy: they help
            determine whose errors are visible and whose improvements count as progress. The
            longitudinal results are consistent with that concern. A necessary step towards
            addressing the accent gap and regressions is thus for model developers to incorporate
            more inclusive dialect-stratified evaluations of their systems.
          </p>

          <BlogSubheading>What the study can and cannot tell us</BlogSubheading>
          <p className="mb-4">
            This is a comparison of 16 systems from different teams, with different architectures,
            training data, and development goals. It is not a controlled experiment on model size or
            training-data volume, and it cannot identify which training decision caused a gap. The
            results describe the evaluated releases and speech collections, not every speaker or
            every ASR system available today.
          </p>
          <p className="mb-4">
            The eight evaluations also come from four corpora, so they are not eight independent
            samples of the world&apos;s English. Our fixed comparison groups make the timeline
            interpretable, but do not describe every accent in each collection. WER measures
            transcription errors; it does not capture the full practical cost of being
            misunderstood.
          </p>

          <BlogSubheading>Measure progress for the speakers who use the system</BlogSubheading>
          <p className="mb-4">
            The practical implication is to evaluate each release across accents and speaking
            situations, report those results separately, and check for regressions before replacing
            an existing system. A better average score is useful evidence, but it cannot establish
            that a new model works better for every community.
          </p>
          <p className="mb-4">
            Larger speech models can improve recognition. Our results show why inclusive speech
            technology also needs sustained attention to who appears in training and evaluation, and
            whether improvements survive the next release.
          </p>

          <BlogSubheading>How this informs our practices at Koel Labs</BlogSubheading>
          <p className="mb-4">
            At Koel Labs, these findings motivate us to choose evaluation data deliberately and
            examine performance across speaker groups. An overall score is most useful when we can
            also see whose speech the model handles well and where it struggles.
          </p>
          <p className="mb-4">
            Our{' '}
            <Link
              href="/blog/building-open-source-leaderboards"
              className="text-sky-600 hover:underline"
            >
              leaderboard blog
            </Link>{' '}
            describes how we apply this to phonetic transcription, which records individual speech
            sounds. We evaluate models on the same test set, with 100 clips from each of five
            datasets covering native English speech, several non-native accents, and post-stroke
            aphasia. Equal sampling prevents the largest corpus from dominating the overall score;
            dataset-specific results help reveal differences that the average can hide.
          </p>

          <p className="mb-4 font-sans text-sm/6 text-neutral-500">
            Paper authors: Alexander Metzger, Aruna Srivastava, Ruslan Mukhamedvaleev, Eunjung Yeo,
            Syed Ishtiaque Ahmed, Nina Markl, Sachin Kumar, and Farhan Samir. Read the{' '}
            <a
              href={paper}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline"
            >
              full paper and appendix
            </a>{' '}
            for all accent groups, results, and references.
          </p>
        </div>
      </div>
    </BlogBody>
  );
}
