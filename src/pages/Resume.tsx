import { useEffect } from 'react';

const Resume = () => {
  useEffect(() => {
    window.location.href = '/Konstantin_Filipovich_CV.pdf';
  }, []);

  return null;
};

export default Resume;