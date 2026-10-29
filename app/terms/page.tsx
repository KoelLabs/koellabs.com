import LegalDocument from '@/components/legal-document';

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Koel Labs Terms and Conditions.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <LegalDocument document="TERMS" title="Koel Labs Terms and Conditions" />;
}
