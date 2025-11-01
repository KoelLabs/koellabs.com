import type { Metadata } from '../posts';
import BlogBody from '../blog-components/body';
import BlogHeading from '../blog-components/heading';
import BlogHeroImage from '../blog-components/hero-image';
import BlogSubheading from '../blog-components/subheading';
import BlogDecorations from '../blog-components/decorations';
import BlogCode from '../blog-components/code';
import { Source_Serif_4 } from 'next/font/google';
import BlogImage from '../blog-components/image';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'The Underlying Intuition of Wav2Vec2’s Transformer',
  slug: 'transformer-deep-dive',
  date: '2025-10-25',
  published: true,
  image: '/blog/transformer/blogTransformer.png',
  summary:
    'Wav2Vec2’s Transformer handles encoded audio features and aligns them to text. Building on our blog post about the feature extractor, this post dives into positional encodings tailored to audio and how CTC loss solves alignment without frame-level labels.',
  category: 'Technical Report',
  tags: [
    { text: 'Audio Processing', url: '/tags/audio-processing' },
    { text: 'Wav2Vec2', url: '/tags/wav2vec2' },
    { text: 'Transformer', url: '/tags/transformer' },
  ],
};

export default function PostBody() {
  return (
    <BlogBody>
      <div className="">
        <BlogHeading
          category={metadata.category}
          categoryColorClass="text-sky-600"
          title={metadata.title}
          dateISO={metadata.date}
          maxWidth={700}
        />
        <BlogHeroImage
          src="/blog/transformer/blogTransformer.png"
          alt="Wav2Vec2 Architecture Diagram"
        />
        <br></br>
        <div className="relative lg:col-span-3 max-w-3xl mx-auto mt-12">
          <BlogDecorations />
          <div
            className={`relative flex h-full flex-col tracking-[-0.010em] text-lg ${sourceSerif.className}`}
          >
            <p className="mb-4">
              Typically, every explanation of the{' '}
              <a
                href="https://arxiv.org/pdf/2006.11477"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                Wav2vec2 architecture
              </a>{' '}
              begins with this iconic diagram (Baevski et. al). But without extensive background, it
              is hard to know how this yellow block compares to the traditional Transformer.
            </p>
            <p className="mb-4">
              The Wav2Vec2 architecture distinguishes itself from other Transformer-based
              architectures largely in processing audio input and aligning the output. In our last
              article, we discuss Wav2Vec2's Feature Extractor: turning raw audio into feature
              vectors. Now we'll trace how Wav2Vec2 encodes positional information of sound in the
              Transformer and how it aligns its predictions to text.
            </p>

            <BlogSubheading>Wav2Vec2 Transformer: Processing Input</BlogSubheading>
            <p className="mb-4">
              Also called the Context Network, the Transformer processes feature vectors using self-
              <a
                href="https://arxiv.org/pdf/1706.03762"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                attention
              </a>
              , which lets each feature attend to all other features in the sequence.
            </p>
            <BlogImage
              src="/blog/transformer/image-one.png"
              alt="Wav2Vec2 diagram"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="text-center text-sm font-medium text-neutral-700 mb-12">
              Visual glimpse into attention matrix computation of self-attention
            </p>
            <p className="mb-4">
              But a critical challenge is that attention naturally ignores the order of the input
              sequence.
            </p>
            <p className="mb-4">
              When we take the dot product of the query and key vectors, a different ordering of the
              input sequence can produce equivalent vectors. This goes back to the dot product being
              commutative.
            </p>
            <p className="mb-4">
              We can look at another commutative operation as a <strong>toy example</strong>:
              addition. You can see that there is{' '}
              <strong>
                no way to distinguish a 1 in the very first position from a 1 in the very last
                position,
              </strong>{' '}
              the attention mechanism understands the sequences equivalently.
            </p>
            <BlogImage
              src="/blog/transformer/image-two.png"
              alt="image2"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />

            <BlogSubheading>Why is this a problem?</BlogSubheading>
            <p className="mb-4">
              The sounds we produce are often influenced by surrounding sounds. For example, in many
              dialects, a vowel before the “L” in “bottle” gets inserted, to create the syllabic “
              <strong>l̩</strong>” : “bottal”. Understanding each sound individually would likely
              mean that these syllabic sounds like “<strong>l̩</strong>” would be poorly predicted by
              the model. Surrounding consonants and vowels influence our speech making embeddings
              that encode these temporal relationships essential.
            </p>

            <BlogSubheading>Positional Embeddings</BlogSubheading>
            <p className="mb-4">
              Before we understand how Wav2Vec2 handles position, let's look at various attempts to
              develop positional embeddings. We will start with absolute positional embeddings.
            </p>
            <p className="mb-4">
              The simplest approach is to give each position in the sequence a unique vector, almost
              like a name tag:
            </p>
            <p className="mb-4">
              Position <strong>0</strong> gets vector A, Position <strong>1</strong> gets vector B,
              Position <strong>2</strong> gets vector C, …
            </p>
            <p className="mb-4">
              But hardcoded positions are limiting. You can only have as many tags as the{' '}
              <strong>longest training</strong> example so generalizing to unseen, longer lengths
              during inference is difficult.
            </p>
            <BlogImage
              src="/blog/transformer/image-three.png"
              alt="image3"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              <strong>Sinusoidal Positional Embeddings</strong>
            </p>
            <p className="mb-4">
              In an attempt to develop a method that could handle unseen sequence lengths, the
              authors of{' '}
              <a
                href="https://arxiv.org/pdf/1706.03762"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                <em>Attention Is All You Need</em>
              </a>{' '}
              introduced <strong>sinusoidal embeddings</strong>.
            </p>
            <BlogImage
              src="/blog/transformer/image-four.png"
              link="https://arxiv.org/pdf/1706.03762"
              alt="Sinusoidal Positional Embeddings"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />

            <p className="text-center text-sm font-medium text-neutral-700 mb-12 max-w-md mx-auto">
              They use sine and cosine functions on even and odd positions, denoted as{' '}
              <em>PE(pos, 2i)</em> and <em>PE(pos, 2i+1)</em>, respectively.
            </p>

            <BlogSubheading>Break: Story Time</BlogSubheading>
            <p className="mb-4">
              For an intuition of sinusoidal embeddings, let me tell you a story.
            </p>
            <p className="mb-4">
              My friend Helen was attending school in Germany and told me that they did terribly in
              English class, she had gotten a 4! I laughed and said she was being dramatic: “A 4
              isn’t bad at all!” To make her feel better, I told her: “I got a <strong>D</strong> in
              science”.
            </p>
            <p className="mb-4">
              But then, she told me that a 5 was the worst grade you could get. Turns out, I was
              doing about as badly in science as she was in English…
            </p>
            <p className="">
              Funny enough, our poor academics illustrate the sine function quite well. The sine
              function allows for strong local understanding. Within my American school system, my
              classmates all knew how grades compared: an A is better than a B, a B is better than a
              C. Within Helen’s German system, her peers also understood the relative order. So
              global distance is harder to understand but local relative distance can be well
              understood.
            </p>
            <BlogImage
              src="/blog/transformer/image-five.png"
              alt="image5"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />

            <p className="mb-4">
              For a model that cares more about local distance, this function is very practical.
              Instead of giving every position its own unique number, which would quickly become
              unmanageable, they use a smaller set of values along a few smooth repeating functions.
              Note that the authors added cosine for additional expressability so more numbers could
              be represented but it follows the same principle as the sine function.
            </p>
            <BlogImage
              src="/blog/transformer/image-six.png"
              alt="image6"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="text-center text-sm font-medium text-neutral-700 mb-12">
              Sine and cosine functions for arbitrarily chosen dimension 16
            </p>
            <p className="mb-4">
              Funny enough,{' '}
              <a
                href="https://arxiv.org/pdf/1706.03762"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                <em>Attention Is All You Need</em>
              </a>{' '}
              spent time adding in sinusoidal embeddings for it to perform identically to simple
              indexing.
            </p>
            <p className="mb-4">
              The challenge appears not to be formulating positional understanding but preserving
              it.{' '}
              <a
                href="https://arxiv.org/pdf/1911.04474"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                Yan et al.
              </a>{' '}
              finds that relative positional understanding in the input embedding gets destroyed
              during the attention mechanism when projected through the weight matrices (W_Q and
              W_K).
            </p>
            <BlogImage
              src="/blog/transformer/image-seven.png"
              alt="image7"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              <a
                href="https://arxiv.org/pdf/1911.04474"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                https://arxiv.org/pdf/1911.04474
              </a>
            </p>
            <p className="mb-4">
              In the Figure, (Yan et al.), distance information is preserved in the raw positional
              encodings (blue line) as shown by the symmetrical peak where positions close to each
              other (in the center) have a higher dot product . However, after multiplication by the
              attention weight matrices, we get seemingly random patterns (orange/green lines) that
              no longer clearly encode distance.
            </p>

            <BlogSubheading>Limitations of Absolute Positional Embeddings</BlogSubheading>
            <p className="mb-4">
              Both methods of absolute positional embeddings are limited by the fact that you can
              only recover positional information by some global lookup table telling you the
              sinusoidal values and simple indices which every feature corresponds to.
            </p>
            <p className="">
              Instead, a good way to find the positional information of a feature could be to bake
              it into the feature itself. Positional information would be innate to the feature like
              a puzzle piece. Each piece has grooves from the neighboring pieces that inform you
              where it should go. Even though the puzzle piece does not have a number indicating its
              position, it can be determined where the puzzle piece belongs using other neighboring
              pieces.
            </p>
            <BlogImage
              src="/blog/transformer/image-eight.png"
              alt="image8"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />

            <BlogSubheading>Wav2Vec2 positional encodings</BlogSubheading>
            <p className="mb-4">
              Wav2Vec2 accomplishes positional understanding by capturing local dependencies through{' '}
              <a
                href="https://arxiv.org/pdf/1904.11660"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                convolutions at the input level
              </a>
              , before features reach the transformer (
              <em>
                methods like RoPE achieve similar goals by modifying the attention mechanism itself,
                but that's a story for{' '}
                <a
                  href="http://koellabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline"
                >
                  another pos
                </a>
              </em>
              <a
                href="http://koellabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                t
              </a>
              ).
            </p>
            <p className="mb-4">
              As we covered in our{' '}
              <a
                href="http://koellabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                previous post
              </a>{' '}
              on the feature extractor (CNN), convolutions are used to naturally encode positions by
              using a sliding window over adjacent frames. They effectively represent relative local
              patterns like "a pattern across frames t-1, t, and t+1" rather than absolute global
              ones like "frame t with a position tag."
            </p>
            <p className="mb-4">
              Likewise, convolutions can be applied to the output feature vectors after linear
              projection from the feature extractor for positional understanding.
            </p>
            <BlogImage
              src="/blog/transformer/image-nine.png"
              alt="image9"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="">
              The wav2vec2 architecture uses grouped convolutions, where different groups specialize
              in different temporal relationships. Some might focus on quick changes between sounds,
              while others capture longer patterns like rhythm and intonation.
            </p>
            <BlogImage
              src="/blog/transformer/image-ten.png"
              alt="image10"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="">
              So now the positional information survives as it is intrinsic to what the feature
              represents. If a feature encodes "a rising pitch across three frames," that relational
              pattern persists through linear transformations.
            </p>

            <BlogImage
              src="/blog/transformer/image-eleven.png"
              alt="image11"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />

            <p className="mb-4">
              From here, every 25 millisecond frame processed has positional information that the
              Transformer processes, outputting a single token prediction.
            </p>
            <p className="mb-4">
              But this creates obvious problems: people don’t speak one character every 20
              milliseconds! For example, the “o” in “hello” probably takes ~1/10th a second which is
              100 milliseconds, much more than 20 milliseconds.
            </p>
            <p className="mb-4">
              Finding what parts of the audio correspond to the predicted transcription is quite
              challenging. The audio datasets the model is trained on will (most of the time) not
              include timing information that says which word or syllable occurs where in the audio
              file because annotating this is super labor intensive. How will we know how to align
              the sequence to text?
            </p>

            <BlogSubheading>CTC Loss: Aligning The Output</BlogSubheading>
            <p className="mb-4">
              <strong>Training with CTC Loss:</strong>
            </p>
            <p className="mb-4">
              Goal: Train the model to assign high probability to paths that match the target
              sequence as shown below.
            </p>
            <BlogImage
              src="/blog/transformer/image-twelve.png"
              alt="image11"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              Note that we will “collapse” sequences by merging repeated characters and dropping the
              ε character:
            </p>
            <p className="mb-4">
              The challenging part of this task is that there are many ways to predict this
              distribution such that you collapse to the correct target sequence. For example,
              “CAAB” and “εCAεB” both collapse to “CAB”. So how do we train a model with a multitude
              of possible sequences?.
            </p>
            <p className="mb-4">
              Your intuition may be to sum across the probabilities of paths that produce correct
              sequences.
            </p>
            <BlogImage
              src="/blog/transformer/image-thirteen.png"
              alt="image12"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              Not a bad idea! But this will just give us some arbitrary number like 5.76 which is
              hard to know how well the model is performing.
            </p>
            <p className="mb-4">
              In an ideal world where the model has 100% certainty of the path that produces a
              correct sequence, it should receive 0 penalty. Likewise, if the model is very
              uncertain but still produces a correct sequence, it should receive more penalty.
            </p>
            <p className="mb-4">
              <em>
                It is like a multiple choice exam, two students can score well but one may have
                guessed more than another. If we know each student’s own personal certainty can we
                write a function that reflects this?
              </em>
            </p>
            <p className="mb-4">
              Easy! We use the function -log(x). For certainty of 1, we have penalty -log(1) = 0.
              Likewise for low certainty like 0.2, we have penalty -log(0.2) = 0.69
            </p>
            <BlogImage
              src="/blog/transformer/image-fourteen.png"
              alt="image13"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">Nice! This is a good loss function for training.</p>

            <BlogSubheading>Efficiency</BlogSubheading>
            <p className="mb-4">
              But a brute force approach to sum path probabilities as illustrated above would be
              very slow. Dynamic programming can be used instead where we use memoization to store
              total probabilities at each timestep. Here is what the DP table could look like:
            </p>
            <BlogImage
              src="/blog/transformer/image-fifteen.png"
              alt="image14"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              <strong>Inference with CTC Loss:</strong>
            </p>
            <p className="mb-4">
              Goal: Given the trained model’s outputs, find the most likely text sequence.
            </p>
            <BlogImage
              src="/blog/transformer/image-sixteen.png"
              alt="image15"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              We could simply use{' '}
              <a
                href="https://en.wikipedia.org/wiki/Greedy_algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                greedy search
              </a>{' '}
              to grab the maximum probability at each timestep, but greedy makes locally optimal
              choices that can miss the globally best path. A slightly lower probability token now
              might enable much higher probabilities later. So, a modified beam search is used to
              optimally find the best sequence even when you have multiple possible alignments
              mapping to the same output.
            </p>
            <p className="mb-4">
              So this modified beam search on the CTC head outputs allows us to find our final
              output!
            </p>

            <BlogSubheading>Conclusion</BlogSubheading>
            <p className="mb-4">
              To summarize, we started with a fundamental problem: attention mechanisms don’t
              naturally understand order. To fix this, Wav2Vec2 uses convolutional positional
              encodings that capture local context in sound rather than absolute positions (crucial
              for variable-length audio and how adjacent sounds influence each other).
            </p>
            <p className="mb-4">
              Then we tackled the alignment challenge. Without knowing exactly when each character
              appears in the audio, CTC provides an elegant solution: consider all possible
              alignments, predict at regular 20ms intervals, use blank tokens for silence, and
              collapse duplicates during decoding.
            </p>
            <BlogImage
              src="/blog/transformer/image-seventeen.png"
              alt="image16"
              width={1200}
              height={600}
              expanded={false}
              className="my-8"
            />
            <p className="mb-4">
              By focusing on relationships rather than absolute positions, and probabilities rather
              than hard alignments, Wav2Vec2 can learn from audio at scale.
            </p>
            <p className="mb-4">Ready for more? Our next article explores [next topic]!</p>
          </div>
        </div>
      </div>
    </BlogBody>
  );
}
