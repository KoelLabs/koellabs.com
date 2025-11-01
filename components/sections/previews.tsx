const previews = [
  {
    title: 'Phonetic Models',
    status: 'Available',
    description:
      'XLSR-English-01, the state-of-the-art model for phonetic transcription, is available on Huggingface, alongside our other models, various datasets, and our IPA transcription leaderboard.',
    image: '/images/card-one.svg',
  },
  {
    title: 'Phrase Segmentation',
    status: 'In Beta',
    description:
      'Phrase Segmentation, our demonstration tool for how phonetic transcription models will eventually interact with users in conjunction with language learning materials, is now available in closed beta.  ',
    image: '/images/card-two.svg',
  },
  {
    title: 'Speech Analysis',
    status: 'Upcoming',
    description:
      'A robust and open speech analysis tool, powered by our own models, to allow for real-time feedback to users about speech, based on an actor reference, not a restricted, arbitrary standard.',
    image: '/images/card-three.svg',
  },
];

export default function Previews() {
  return (
    <div id="previews" className=" relative">
      <svg
        width="75"
        height="905"
        viewBox="0 0 75 905"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-24 left-0 z-[1] hidden lg:block"
      >
        <g clipPath="url(#clip0_3877_301)">
          <path
            d="M69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433C-69.6808 97.3525 69.9825 -0.460876 69.9963 96.9968C70.0013 132.346 70.0002 294.846 69.9986 452.469C70.0002 610.092 70.0014 772.592 69.9964 807.941Z"
            fill="#ffffff"
          />
          <path
            d="M69.9963 196.941C69.9963 360.607 70.0045 750.741 69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433M-69.8022 -0.0624878C-69.8022 -0.0201653 -69.8022 0.0220944 -69.8022 0.0643433M69.9964 707.997C69.9964 544.33 70.0044 154.197 69.9963 96.9968C69.9825 -0.460854 -69.6808 97.3525 -69.8022 0.0643433"
            stroke="#E5E5E5"
          />
        </g>
        <defs>
          <clipPath id="clip0_3877_301">
            <rect
              width="75.0001"
              height="905"
              fill="white"
              transform="translate(75 905) rotate(180)"
            />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="75"
        height="905"
        viewBox="0 0 75 905"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-24 right-0 z-[1] rotate-180 hidden lg:block"
      >
        <g clipPath="url(#clip0_3877_301)">
          <path
            d="M69.9963 196.941C69.9963 360.607 70.0045 750.741 69.9964 807.941C69.9826 905.441 -69.8021 807.5 -69.8022 905L-69.8022 0.0643433M-69.8022 -0.0624878C-69.8022 -0.0201653 -69.8022 0.0220944 -69.8022 0.0643433M69.9964 707.997C69.9964 544.33 70.0044 154.197 69.9963 96.9968C69.9825 -0.460854 -69.6808 97.3525 -69.8022 0.0643433"
            stroke="#E5E5E5"
          />
        </g>
        <defs>
          <clipPath id="clip0_3877_301">
            <rect
              width="75.0001"
              height="905"
              fill="white"
              transform="translate(75 905) rotate(180)"
            />
          </clipPath>
        </defs>
      </svg>
      <div className=" w-full h-[50px] overflow-hidden flex items-start justify-center bg-neutral-50 border-b">
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
      <div className="mx-auto">
        <section
          aria-labelledby="features-heading"
          className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-b border-neutral-200 overflow-hidden"
        >
          <div
            data-cursor-opacity="0.3"
            data-cursor-size="24"
            data-cursor-color="#2A4BCC"
            className="bg-white py-24 sm:py-32"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-[1000] relative bg-white">
              <p className="text-base/7 font-semibold text-blue-800 relative z-10">Previews</p>
              <h2
                id="features-heading"
                className="mt-2 text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10 text-balance"
              >
                Building your favorite language tools
              </h2>
              <ul
                role="list"
                data-cursor-opacity="1"
                data-cursor-size="340"
                className="mt-12 grid lg:p-2 z-10 grid-cols-1 lg:grid-cols-3 relative gap-4 bg-white overflow-hidden group"
              >
                <div className="h-1/2 w-1/4 bg-blue-700 rounded-full absolute top-1/5 left-1/4 mix-blend-color blur-2xl animate-[float-left-right_8s_ease-in-out_infinite] group-hover:-translate-y-full transition-transform z-100 pointer-events-none scale-200"></div>
                <div className="h-1/2 w-1/4 bg-sky-700 rounded-full absolute top-1/5 left-4/7 mix-blend-color blur-2xl animate-[float-right-left_8s_ease-in-out_infinite_2s] group-hover:-translate-y-full transition-transform z-100 pointer-events-none scale-200"></div>

                {previews.map(preview => (
                  <a href="/previews" key={preview.title} target="_blank">
                    <li
                      key={preview.title}
                      className="flex flex-col gap-2 border border-neutral-200 rounded-3xl p-2 relative group/item"
                      data-cursor-size="2"
                    >
                      <div className="p-4 pb-2 rounded-2xl bg-white border border-neutral-200">
                        <div className="flex flex-row gap-2 items-center justify-between pb-2">
                          <h3 className="text-lg font-medium tracking-[-0.03em] text-black w-full">
                            {preview.title}
                          </h3>

                          <span className="transition-all inline-flex items-center px-2 py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500  sm:w-fit flex-row justify-between hover:shadow-sm group">
                            <div
                              className={`h-2 w-2 rounded-full relative transition-all mr-1`}
                              style={{
                                backgroundColor:
                                  preview.status === 'Available'
                                    ? '#3779B5'
                                    : preview.status === 'In Beta'
                                      ? '#154063'
                                      : 'black',
                              }}
                            ></div>
                            <span className="w-full sm:w-fit text-nowrap">{preview.status}</span>
                          </span>
                        </div>
                      </div>
                      <div
                        className=" rounded-2xl bg-white border border-neutral-200 aspect-square relative overflow-hidden"
                        data-cursor-size="320"
                      >
                        <div className="h-5/6 w-5/6 bg-sky-700 rounded-full absolute top-1/2 left-1/2 transition-transform blur-xl mix-blend-color scale-200 hidden group-hover/item:block z-10"></div>
                        <div className="h-5/6 w-5/6 bg-[#2A4BCC] rounded-full absolute -top-1/4 -left-1/4 transition-transform blur-xl  mix-blend-color scale-200 hidden group-hover/item:block z-10"></div>

                        <img
                          src={preview.image}
                          alt={preview.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className="p-4 rounded-2xl bg-white border border-neutral-200 z-100 relative"
                        data-cursor-collision="true"
                      >
                        <p className="text-[0.87rem] text-neutral-600 text-">
                          {preview.description}
                        </p>
                      </div>
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
