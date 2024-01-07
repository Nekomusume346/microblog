import * as cheerio from 'cheerio';

interface TocItem {
  text: string;
  htmltag: string;
  id: string | undefined;
}

export const renderToc = (body: string): TocItem[] => {
  const $ = cheerio.load(body);
  const headings = $('h1, h2, h3').toArray();

  const toc: TocItem[] = headings.map((data) => {

    // タグの型を指定
    const tagElement = data as cheerio.TagElement;

    const text = tagElement.children[0]?.data || ''; // nullish coalescing演算子を使って安全にアクセス
    const htmlelement = tagElement.name;
    const id = tagElement.attribs.id;
    var htmltag = '';

    switch (htmlelement) {
      case 'h1':
        htmltag = 'tagstyle1';
        break;
  
      case 'h2':
        htmltag = 'tagstyle2';
        break;
      
      case 'h3':
        htmltag = 'tagstyle3';
        break;
  
      default:
        htmltag = 'tagstyle4';
        break;
    }
    
    return { text, htmltag, id };
  });

  return toc;
}