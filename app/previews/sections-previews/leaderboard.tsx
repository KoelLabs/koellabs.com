'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { SideCurve } from '@/components/ui/side-curve';
import { useLeaderboard } from '@/lib/use-leaderboard';
import { leaderboardDate, LEADERBOARD_URL } from '@/lib/leaderboard';

// Small Koel Labs logomark used to mark our own models in the table (same art as the header logo)
function KoelMark() {
  const maskId = React.useId();
  return (
    <svg viewBox="0 0 770 859" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <rect
        x="686.844"
        y="353.266"
        width="263.361"
        height="527.953"
        rx="131.681"
        transform="rotate(90 686.844 353.266)"
        fill="#154063"
      />
      <rect
        x="664.07"
        y="672.516"
        width="263.361"
        height="527.953"
        rx="131.681"
        transform="rotate(135 664.07 672.516)"
        fill="#3779B5"
      />
      <mask
        id={maskId}
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="158"
        y="353"
        width="529"
        height="264"
      >
        <rect
          x="686.844"
          y="353.266"
          width="263.361"
          height="527.953"
          rx="131.681"
          transform="rotate(90 686.844 353.266)"
          fill="white"
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect
          x="664.07"
          y="672.516"
          width="263.361"
          height="527.953"
          rx="131.681"
          transform="rotate(135 664.07 672.516)"
          fill="#122438"
        />
      </g>
      <path
        d="M209.534 317.593C141.351 292.296 78.7053 137.133 81.4879 129.634C84.2704 122.134 232.961 45.3817 301.145 70.6792C369.328 95.9767 404.094 171.758 378.796 239.941C353.499 308.125 277.718 342.891 209.534 317.593Z"
        fill="black"
      />
    </svg>
  );
}

function formatDate(date: string) {
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
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
  'model' | 'size' | 'average_per' | 'average_per_fer' | 'average_fer' | 'link' | 'submission_date';
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
    <a href={link} target="_blank" rel="noopener noreferrer">
      <span className="bg-white transition-all inline-flex items-center px-2 w-full py-1.5 border text-sm leading-4 font-medium tracking-tight rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:w-fit flex-row justify-between hover:shadow-sm group">
        {link == 'N/A' ? 'N/A' : 'Link'}
        <ArrowUpRight className="size-4 -mb-px ml-0.5" />
      </span>
    </a>
  );
}

export default function Leaderboard({ preview = false }: { preview?: boolean }) {
  const data = useLeaderboard();
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
    const leaderboard = preview ? data.entries.slice(0, 8) : data.entries;
    if (!sortConfig) return leaderboard;
    const items = leaderboard.map((item, idx) => ({ ...item, __i: idx }));
    items.sort((a, b) => {
      let cmp = 0;
      switch (sortConfig.key) {
        case 'model':
        case 'link':
          cmp = String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]));
          break;
        case 'size': {
          const bytes = (size: string) => {
            const value = parseFloat(size);
            const unit = size.match(/[KMGT]?B$/)?.[0] ?? 'B';
            return Number.isFinite(value)
              ? value * 1024 ** ['B', 'KB', 'MB', 'GB', 'TB'].indexOf(unit)
              : null;
          };
          const aSize = bytes(a.size);
          const bSize = bytes(b.size);
          if (aSize === null || bSize === null)
            return aSize === bSize ? a.__i - b.__i : aSize === null ? 1 : -1;
          cmp = aSize - bSize;
          break;
        }
        case 'average_per':
        case 'average_per_fer':
          const aNum = parseFloat(String(a.average_per).replace('%', ''));
          const bNum = parseFloat(String(b.average_per).replace('%', ''));
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
  }, [sortConfig, data.entries, preview]);
  return (
    <div
      id={preview ? undefined : 'models'}
      className={preview ? 'relative font-sans my-12' : 'relative'}
    >
      {!preview && <SideCurve side="left" inset="top-4 bottom-4" />}
      {!preview && <SideCurve side="right" inset="top-4 bottom-4" />}

      <div className="mx-auto">
        <div className="mx-auto absolute h-full flex justify-between z-[-1]"></div>

        <section
          aria-label={preview ? 'Latest leaderboard preview' : 'Phonetic transcription leaderboard'}
          className={
            preview
              ? 'w-full'
              : 'mx-auto w-full h-fit bg-neutral-50/20 backdrop-blur-md border-y border-neutral-200 overflow-hidden'
          }
        >
          <div
            data-cursor-opacity="0.8"
            data-cursor-size="240"
            data-cursor-color="#2A4BCC"
            className={preview ? 'bg-white' : 'bg-white py-24 sm:py-32'}
          >
            <div
              className={
                preview
                  ? 'relative text-sm'
                  : 'mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 z-[1000] relative'
              }
            >
              {!preview && (
                <>
                  <p className="text-base/7 font-semibold text-sky-600 relative z-10">
                    Leaderboard
                  </p>
                  <h2
                    id="features-heading"
                    className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-gray-950 sm:text-5xl relative z-10"
                  >
                    Setting a new standard in phonetic transcription
                  </h2>
                </>
              )}

              <div className={`p-2 border rounded-[24px] bg-white ${preview ? '' : 'mt-12'}`}>
                <div
                  role="region"
                  aria-label="Leaderboard scores"
                  tabIndex={0}
                  className="grid grid-cols-1 gap-10 sm:gap-20 z-10 relative overflow-x-auto rounded-2xl border"
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
                            getDirectionFor('size')
                              ? getDirectionFor('size') === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                        >
                          <button
                            type="button"
                            onClick={() => requestSort('size')}
                            className="inline-flex items-center gap-1 cursor-pointer select-none justify-center w-full"
                          >
                            <span>Size</span>
                            <SortIndicator direction={getDirectionFor('size')} />
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
                          key={`${item.model}-${item.link}-${index}`}
                          className={`border-y h-[100px] sm:h-auto last:border-b-0 ${
                            item.koel_labs
                              ? 'bg-blue-50 border-blue-300/70'
                              : index % 2 === 0
                                ? 'bg-white'
                                : 'bg-neutral-50'
                          } ${
                            // Collapsed borders: the row above owns a shared edge, so it carries the blue top line
                            !item.koel_labs && sortedLeaderboard[index + 1]?.koel_labs
                              ? 'border-b-blue-300/70'
                              : ''
                          }`}
                        >
                          <td
                            className={`text-left py-3 px-4 border-r ${item.koel_labs ? 'border-blue-300/70' : 'border-neutral-200'}`}
                          >
                            <span
                              className={item.koel_labs ? 'font-semibold text-neutral-950' : ''}
                            >
                              {item.model}
                            </span>
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-blue-300/70' : 'border-neutral-200'}`}
                          >
                            <span
                              className={item.koel_labs ? 'font-semibold text-neutral-950' : ''}
                            >
                              {item.size}
                            </span>
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-blue-300/70' : 'border-neutral-200'}`}
                          >
                            <span
                              className={item.koel_labs ? 'font-semibold text-neutral-950' : ''}
                            >
                              {item.average_per}
                            </span>
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-blue-300/70' : 'border-neutral-200'}`}
                          >
                            <span
                              className={item.koel_labs ? 'font-semibold text-neutral-950' : ''}
                            >
                              {item.average_fer}
                            </span>
                          </td>
                          <td
                            className={`text-center py-3 px-4 border-r hidden sm:table-cell ${item.koel_labs ? 'border-blue-300/70' : 'border-neutral-200'}`}
                          >
                            {tagLink(item.link)}
                          </td>
                          <td className="text-center py-3 px-4 hidden sm:table-cell">
                            {tag(formatDate(item.submission_date))}
                          </td>
                          <td className="text-center sm:hidden table-cell">
                            <span
                              className={item.koel_labs ? 'font-semibold text-neutral-950' : ''}
                            >
                              {item.average_per} / {item.average_fer}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-center text-sm text-neutral-500 mt-8">
                {data.source === 'huggingface' ? 'Latest submissions' : 'Saved snapshot'}:{' '}
                {leaderboardDate(data.updated_at)}.{' '}
                <a
                  href={LEADERBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline"
                >
                  View {preview ? 'all models' : 'the live leaderboard'} on Hugging Face
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
