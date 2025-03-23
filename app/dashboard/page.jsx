'use server';
import SearchCenter from '@/components/ui/dashboard/SearchCenter';

const clips = [
  {
    title: 'Michael is a Terrible Secret Keeper - The Office US',
    thumbnail: '/images/thumbnails/the-office-michael-secret-keeper-full-res.jpg',
    vtt: '/videos/the-office-michael-secret-keeper.vtt',
    video: '/videos/the-office-michael-secret-keeper.mp4',
    link: 'E6LpBIwGyA4',
    id: 'eWOKwlFQJAjQ',
    badge: 'Hard',
    difficulty: 'Hard',
    dialect: 'US Midlands',
    dialectFlag: '🇺🇸',
    dialectIcon:
      '<svg     xmlns="http://www.w3.org/2000/svg"     width="14"     height="14"     fill="none"     viewBox="0 0 14 14"   >     <g clipPath="url(#clip0_104_209)">       <path         fill="#FEE2E2"         stroke="#991B1B"         d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"       ></path>       <path         fill="#991B1B"         d="M7.008 10.09q-.659 0-1.176-.227a2 2 0 0 1-.815-.63 1.67 1.67 0 0 1-.32-.94h1.004a.87.87 0 0 0 .195.505q.18.211.466.326.288.115.64.115.385 0 .684-.134.3-.135.47-.374a.95.95 0 0 0 .169-.56q0-.328-.17-.578-.165-.252-.489-.396a1.9 1.9 0 0 0-.773-.144H6.34v-.805h.553q.364 0 .64-.131.278-.131.434-.365a1 1 0 0 0 .156-.553 1 1 0 0 0-.137-.527.92.92 0 0 0-.384-.355 1.25 1.25 0 0 0-.581-.127q-.32 0-.598.118a1.1 1.1 0 0 0-.447.332.86.86 0 0 0-.186.515h-.955q.015-.531.313-.933.3-.404.793-.63a2.6 2.6 0 0 1 1.093-.227q.63 0 1.086.246.46.243.71.649.252.406.249.888.003.55-.307.934a1.5 1.5 0 0 1-.818.514v.051q.652.1 1.01.518.36.419.358 1.039.003.54-.3.968-.3.428-.822.675a2.8 2.8 0 0 1-1.192.242"       ></path>     </g>     <defs>       <clipPath id="clip0_104_209">         <path fill="#fff" d="M0 0h14v14H0z"></path>       </clipPath>     </defs>   </svg>',
    practicableSections: [
      {
        start: 2,
        end: 9,
        thumbnail: 'd1.png',
      },
      {
        start: 143,
        end: 153,
        thumbnail: 'd2.png',
      },
      {
        start: 200,
        end: 210,
        thumbnail: 'd3.png',
      },
      {
        start: 250,
        end: 262,
        thumbnail: 'd4.png',
      },
    ],
    completedSections: 0,
    duration: '4:29',
  },
  {
    title: "Michael's Pyramid Scheme - The Office US",
    thumbnail: '/images/thumbnails/the-office-michael-pyramid-scheme-full-res.jpg',
    vtt: '/videos/the-office-michael-pyramid-scheme.vtt',
    video: '/videos/the-office-michael-pyramid-scheme.mp4',
    link: 'QIoVaphXbz8',
    id: '0A4Dq41bPQZ1',
    badge: 'Medium',
    difficulty: 'Medium',
    dialect: 'US Midlands',
    dialectFlag: '🇺🇸',
    dialectIcon:
      '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#FFEDD5"       stroke="#9A3413"       d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"     ></path>     <path       fill="#9A3413"       d="M4.87 10v-.716L7.085 6.99q.354-.373.585-.655.232-.285.348-.54t.115-.543a1 1 0 0 0-.153-.563 1 1 0 0 0-.42-.367 1.3 1.3 0 0 0-.597-.131q-.352 0-.613.143a1 1 0 0 0-.403.406q-.14.263-.14.614h-.944q0-.597.275-1.045.276-.447.755-.694.479-.249 1.09-.249.616 0 1.086.246.473.243.738.665.266.418.266.946 0 .364-.138.713-.135.348-.47.776-.335.426-.933 1.033l-1.3 1.361v.048h2.946V10z"     ></path>   </svg>',
    practicableSections: [
      {
        start: 9.6,
        end: 13.7,
        thumbnail: 'd1.png',
      },
      {
        start: 39,
        end: 43,
        thumbnail: 'd2.png',
      },
      {
        start: 63,
        end: 64.5,
        thumbnail: 'd3.png',
      },
      {
        start: 77,
        end: 78.2,
        thumbnail: 'd4.png',
      },
    ],
    completedSections: 0,
    duration: '1:40',
  },
  {
    title: 'April joins the great resignation - Parks and Recreation',
    thumbnail: '/images/thumbnails/parks-and-recreation-april-great-resignation-full-res.jpg',
    vtt: '/videos/parks-and-recreation-april-great-resignation.vtt',
    video: '/videos/parks-and-recreation-april-great-resignation.mp4',
    link: 'WaaANll8h18',
    id: 'JQMDL16t8isF',
    badge: 'Medium',
    difficulty: 'Medium',
    dialect: 'US Midlands',
    dialectFlag: '🇺🇸',
    dialectIcon:
      '<svg     xmlns="http://www.w3.org/2000/svg"     width="15"     height="15"     fill="none"     viewBox="0 0 15 15"   >     <path       fill="#FFEDD5"       stroke="#9A3413"       d="M13.66 7.08A6.58 6.58 0 1 1 7.08.5c3.852 0 6.58 2.935 6.58 6.58Z"     ></path>     <path       fill="#9A3413"       d="M4.87 10v-.716L7.085 6.99q.354-.373.585-.655.232-.285.348-.54t.115-.543a1 1 0 0 0-.153-.563 1 1 0 0 0-.42-.367 1.3 1.3 0 0 0-.597-.131q-.352 0-.613.143a1 1 0 0 0-.403.406q-.14.263-.14.614h-.944q0-.597.275-1.045.276-.447.755-.694.479-.249 1.09-.249.616 0 1.086.246.473.243.738.665.266.418.266.946 0 .364-.138.713-.135.348-.47.776-.335.426-.933 1.033l-1.3 1.361v.048h2.946V10z"     ></path>   </svg>',
    practicableSections: [
      {
        start: 5.5,
        end: 9,
        thumbnail: 'd1.png',
      },
      {
        start: 23.2,
        end: 25,
        thumbnail: 'd2.png',
      },
      {
        start: 60,
        end: 66,
        thumbnail: 'd3.png',
      },
      {
        start: 106,
        end: 108,
        thumbnail: 'd4.png',
      },
    ],
    duration: '3:36',
    completedSections: 0,
  },
];

export default async function Page() {
  return (
    <div className="h-full rounded-md relative">
      <SearchCenter clips={clips} />
    </div>
  );
}
