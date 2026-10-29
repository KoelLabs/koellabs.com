import LegalDocument from '@/components/legal-document';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Koel Labs Privacy Policy.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <LegalDocument document="PRIVACY" title="Koel Labs Privacy Policy" />;
}
