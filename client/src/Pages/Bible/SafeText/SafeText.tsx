import DOMPurify from 'dompurify';

export const SafeHebrewText = ({ htmlContent }: { htmlContent: string | Node }) => {
  const safeHTML = DOMPurify.sanitize(htmlContent);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
};
