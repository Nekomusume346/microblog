import React from 'react';

interface TocItem {
  text: string;
  htmltag: string;
  id: string | undefined;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  return (
    <div className='mokuji border border-blue-400 px-10 pb-5 pt-3 mb-10 bg-slate-100 '>
      <p className="text-xl lg:text-2xl">目次</p>
      <ul>
        {toc.map((data) => (
          <li key={data.id} className={data.htmltag}>
            <a href={`#${data.id}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;