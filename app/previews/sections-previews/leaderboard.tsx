'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

const leaderboard = [
  {
    model: 'Koel Labs XLSR English 01',
    average_per: '20.59%',
    average_fer: '3.31%',
    link: 'https://github.com/KoelLabs/ML',
    submission_date: '2025-09-03',
    koel_labs: true,
  },
  {
    model: 'Facebook Wav2Vec2 53 Espeak',
    average_per: '114.40%',
    average_fer: '7.68%',
    link: 'https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec#wav2vec-20',
    submission_date: '2025-09-03',
  },
  {
    model: 'Facebook Wav2Vec2 60 Espeak',
    average_per: '116.98%',
    average_fer: '7.96%',
    link: 'https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec#wav2vec-20',
    submission_date: '2025-09-03',
  },
  {
    model: 'MrRubino XLSR 53 L2-Arctic',
    average_per: '58.83%',
    average_fer: '8.12%',
    link: 'https://doi.org/10.1109/ichi61247.2024.00045',
    submission_date: '2025-09-07',
  },
  {
    model: 'Vitouphy XLSR TIMIT',
    average_per: '59.91%',
    average_fer: '8.55%',
    link: 'https://www.kaggle.com/code/vitouphy/phoneme-recognition-with-wav2vec2',
    submission_date: '2025-09-03',
  },
  {
    model: 'Ginic XLSR 53 Buckeye',
    average_per: '42.12%',
    average_fer: '8.89%',
    link: 'https://github.com/ginic/multipa',
    submission_date: '2025-09-03',
  },
  {
    model: 'Facebook XLSR 53 Phon',
    average_per: '50.01%',
    average_fer: '9.35%',
    link: 'N/A',
    submission_date: '2025-09-07',
  },
  {
    model: 'DahmL XLSR MFA',
    average_per: '122.82%',
    average_fer: '10.05%',
    link: 'N/A',
    submission_date: '2025-09-08',
  },
  {
    model: 'Koel Labs B0',
    average_per: '44.36%',
    average_fer: '10.30%',
    link: 'https://github.com/KoelLabs/ML',
    submission_date: '2025-09-03',
    koel_labs: true,
  },
  {
    model: 'Facebook XLSR 53 BABEL',
    average_per: '54.83%',
    average_fer: '10.89%',
    link: 'http://www.lrec-conf.org/lrec1998/midwich.reading.ac.uk/research/speechlab/babel/index.html',
    submission_date: '2025-09-07',
  },
  {
    model: 'Speech31 XLSR English IPA',
    average_per: '117.12%',
    average_fer: '12.37%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Speech31 Wav2Vec2 TIMIT-IPA3',
    average_per: '68.59%',
    average_fer: '12.64%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Chihiro Taguchi XLSR japlmthufielta',
    average_per: '73.07%',
    average_fer: '12.89%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Speech31 WavLM English IPA',
    average_per: '118.56%',
    average_fer: '13.29%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Snu Nia Wav2Vec2 TIMIT',
    average_per: '141.47%',
    average_fer: '13.46%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Speech31 TIMIT-IPA2',
    average_per: '141.47%',
    average_fer: '13.46%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Speech31 Hubert English IPA',
    average_per: '109.03%',
    average_fer: '14.16%',
    link: 'N/A',
    submission_date: '2025-09-04',
  },
  {
    model: 'SNU-SLP Lab XLSR 53 TIMIT',
    average_per: '71.75%',
    average_fer: '14.71%',
    link: 'N/A',
    submission_date: '2025-09-08',
  },
  {
    model: 'Jubliano XLSR International 1.5',
    average_per: '83.61%',
    average_fer: '16.46%',
    link: 'N/A',
    submission_date: '2025-09-03',
  },
  {
    model: 'Vikramanantha Wav2Vec2-base LJSpeech Gruut',
    average_per: '141.09%',
    average_fer: '22.98%',
    link: 'https://huggingface.co/bookbot/wav2vec2-ljspeech-gruut/tree/main',
    submission_date: '2025-09-07',
  },
  {
    model: 'Excalibur12 Wav2Vec2 TIMIT Simplified',
    average_per: '283.05%',
    average_fer: '57.73%',
    link: 'N/A',
    submission_date: '2025-09-07',
  },
  {
    model: 'Excalibur12 Wav2Vec2 lv60 TIMIT',
    average_per: '289.38%',
    average_fer: '59.85%',
    link: 'N/A',
    submission_date: '2025-09-07',
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function tag(status: string) {
  return (
    <span className="bg-white transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
      {status}
    </span>
  );
}

type SortKey =
  | 'model'
  | 'average_per'
  | 'average_per_fer'
  | 'average_fer'
  | 'link'
  | 'submission_date';
type SortDirection = 'asc' | 'desc';

function SortIndicator({ direction }: { direction: SortDirection | null }) {
  if (!direction)
    return (
      <span className="">
        <ChevronsUpDown className="size-4" />
      </span>
    );
  return direction === 'asc' ? (
    <span className="">
      <ChevronUp className="size-4" />
    </span>
  ) : (
    <span className="">
      <ChevronDown className="size-4" />
    </span>
  );
}

function tagLink(link: string) {
  if (link == 'N/A') {
    return (
      <span className="bg-white text-neutral-500 transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
        N/A
      </span>
    );
  }

  return (
    <a href={link} target="_blank">
      <span className="bg-white transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
        {link == 'N/A' ? 'N/A' : 'Repository'}
        <ArrowUpRight className="size-4 -mb-px ml-0.5" />
      </span>
    </a>
  );
}

export default function Leaderboard() {
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey;
    direction: SortDirection;
  } | null>(null);

  const requestSort = (key: SortKey) => {
    setSortConfig(prev => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getDirectionFor = (key: SortKey): SortDirection | null =>
    sortConfig?.key === key ? sortConfig.direction : null;

  const sortedLeaderboard = React.useMemo(() => {
    if (!sortConfig) return leaderboard;
    const items = leaderboard.map((item, idx) => ({ ...item, __i: idx }));
    items.sort((a: any, b: any) => {
      let cmp = 0;
      switch (sortConfig.key) {
        case 'model':
        case 'link':
          cmp = String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]));
          break;
        case 'average_per':
        case 'average_per_fer':
          const aNum = parseFloat(String(a[sortConfig.key].average_per).replace('%', ''));
          const bNum = parseFloat(String(b[sortConfig.key]).replace('%', ''));
          cmp = aNum - bNum;
          break;
        case 'average_fer': {
          const aNum = parseFloat(String(a[sortConfig.key]).replace('%', ''));
          const bNum = parseFloat(String(b[sortConfig.key]).replace('%', ''));
          cmp = aNum - bNum;
          break;
        }
        case 'submission_date':
          cmp = new Date(a.submission_date).getTime() - new Date(b.submission_date).getTime();
          break;
      }
      if (cmp === 0) cmp = a.__i - b.__i;
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [sortConfig]);
  return (
    <div id="models" className="">
      <svg
        width="75"
        height="905"
        viewBox="0 0 75 905"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-4 left-0 z-[1] hidden 2xl:block"
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
        className="absolute top-4 right-0 z-[1] rotate-180 hidden 2xl:block"
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

      <div className="mx-auto">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <section
          aria-labelledby="features-heading"
          className="mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 overflow-hidden"
        >
          <div
            data-cursor-opacity="0.8"
            data-cursor-size="240"
            data-cursor-color="#2A4BCC"
            className="bg-white py-24 sm:py-32"
          >
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-[1000] relative">
              <p className="text-base/7 font-semibold text-sky-600 relative z-10">Leaderboard</p>
              <h2
                id="features-heading"
                className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10"
              >
                Setting a new standard in phonetic transcription
              </h2>
              {/* <ul
                role="list"
                data-cursor-opacity="1"
                data-cursor-size="340"
                className="mt-12 grid lg:p-2 z-10 grid-cols-1 lg:grid-cols-2 relative gap-4 bg-white overflow-hidden group"
              >
                <p className="leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Quasi
                  voluptatibus atque eum quam velit? Sequi, autem cumque consequatur laborum. Ipsum
                  dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
                <p className="leading-relaxed">
                  Quisquam, quos. Quasi voluptatibus atque eum quam velit? Sequi, autem cumque
                  consequatur laborum. Ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                  quos. Quasi voluptatibus atque eum quam velit? Sequi, autem cumque consequatur
                  laborum.
                </p>
              </ul> */}

              <div className="p-2 mt-12 border rounded-[24px] bg-white">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-10 sm:gap-20 z-10 relative overflow-x-scroll rounded-2xl border"
                >
                  <table className="border-collapse overflow-x-scroll">
                    <thead className="bg-neutral-100 border-b">
                      <tr className="*:font-semibold *:tracking-tight *:py-3 *:px-4 *:border-r last:border-r-0! *:min-w-[150px] sm:*:min-w-[100px]">
                        <th
                          className="text-center sm:text-left"
                          aria-sort={
                            getDirectionFor('model')
                              ? getDirectionFor('model') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('model')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none"
                          >
                            <span>Model</span>
                            <SortIndicator direction={getDirectionFor('model')} />
                          </button>
                        </th>
                        <th
                          className="text-center hidden sm:table-cell"
                          aria-sort={
                            getDirectionFor('average_per')
                              ? getDirectionFor('average_per') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('average_per')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none justify-center w-full"
                          >
                            <span>Average PER</span>
                            <SortIndicator direction={getDirectionFor('average_per')} />
                          </button>
                        </th>
                        <th
                          className="text-center hidden sm:table-cell"
                          aria-sort={
                            getDirectionFor('average_fer')
                              ? getDirectionFor('average_fer') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('average_fer')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none justify-center w-full"
                          >
                            <span>Average FER</span>
                            <SortIndicator direction={getDirectionFor('average_fer')} />
                          </button>
                        </th>
                        <th
                          className="text-center w-[110px] hidden sm:table-cell"
                          aria-sort={
                            getDirectionFor('link')
                              ? getDirectionFor('link') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('link')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none justify-center w-full"
                          >
                            <span>Link</span>
                            <SortIndicator direction={getDirectionFor('link')} />
                          </button>
                        </th>
                        <th
                          className="text-center w-[160px] hidden sm:table-cell border-0!"
                          aria-sort={
                            getDirectionFor('submission_date')
                              ? getDirectionFor('submission_date') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('submission_date')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none justify-center w-full"
                          >
                            <span>Submission</span>
                            <SortIndicator direction={getDirectionFor('submission_date')} />
                          </button>
                        </th>
                        <th
                          className="text-center sm:hidden table-cell min-w-[165px]!"
                          aria-sort={
                            getDirectionFor('average_per_fer')
                              ? getDirectionFor('average_per_fer') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('average_per_fer')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none justify-center w-full"
                          >
                            <span>PER / FER</span>
                            <SortIndicator direction={getDirectionFor('average_per_fer')} />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedLeaderboard.map((item, index) => (
                        <tr
                          key={item.model}
                          className={`border-y h-[100px] sm:h-auto last:border-b-0 ${
                            item.koel_labs
                              ? 'bg-sky-100 outline outline-sky-200 z-10'
                              : index % 2 === 0
                                ? 'bg-white'
                                : 'bg-neutral-50'
                          }`}
                        >
                          <td
                            className={`text-left py-3 px-4 border-r ${item.koel_labs ? 'border-sky-200' : 'border-neutral-200'}`}
                          >
                            {item.model}
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-sky-200' : 'border-neutral-200'}`}
                          >
                            {item.average_per}
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-sky-200' : 'border-neutral-200'}`}
                          >
                            {item.average_fer}
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-sky-200' : 'border-neutral-200'}`}
                          >
                            {tagLink(item.link)}
                          </td>
                          <td className="text-center py-3 px-4 hidden sm:table-cell">
                            {tag(formatDate(item.submission_date))}
                          </td>
                          <td className="text-center sm:hidden table-cell">
                            {item.average_per} / {item.average_fer}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ul>
              </div>
              <p className="text-center text-sm text-neutral-500 mt-8">
                Last updated: November 1, 2025 from{' '}
                <a
                  href="https://huggingface.co/spaces/KoelLabs/IPA-Transcription-EN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline"
                >
                  https://huggingface.co/spaces/KoelLabs/IPA-Transcription-EN
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
