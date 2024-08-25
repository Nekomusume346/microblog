import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface OgpData {
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
}

const OgpCard: React.FC<{ url: string }> = ({ url }) => {
  const [ogpData, setOgpData] = useState<OgpData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    const fetchOgpData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/ogp?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        setOgpData(data);
      } catch (err) {
        setError('Failed to load OGP data');
      } finally {
        setLoading(false);
      }
    };

    fetchOgpData();
  }, [url, BASE_URL]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    ogpData ? (
      <div className="ogp-card">
        <Image
          src={ogpData.ogImageUrl}
          alt={ogpData.ogTitle}
          width={300}
          height={200}
          unoptimized={true}  // 最適化を無効化
        />
        <h3>{ogpData.ogTitle}</h3>
        <p>{ogpData.ogDescription}</p>
      </div>
    ) : null
  );
};

export default OgpCard;
