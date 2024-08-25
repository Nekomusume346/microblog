import { GetServerSideProps } from 'next';
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import Image from 'next/image';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AiFillTags } from 'react-icons/ai'
import  cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';
import { renderToc } from '@/libs/render-toc'; //目次コンポーネント
import { TableOfContents }  from '@/components/TalbleOfContent'; 
import Meta from '@/components/meta'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
//import ogpParser from 'ogp-parser'; // ← 外した
import { useEffect } from 'react';

// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

dayjs.extend(utc);
dayjs.extend(timezone);

//ogp情報格納用
type OgpData = {
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
};

type TocItem = {
  text: string;
  htmltag: string;
  id: string | undefined;
}

type Props = {
  blog: Blog;
  htmlcontent:string;
};

//iframely対応
declare global {
  interface Window {
    iframely: {
      load: () => void;
    };
  }
}


const BlogId: React.FC<Props> =  ({ blog, htmlcontent }: Props) =>  {

  const toc: TocItem[] = renderToc(htmlcontent);
  const pageTitle = "投稿記事";
  const pageDesc ="";
  const pageImg = "";
  const pageImgW = 0;
  const pageImgH = 0;

  //console.log(toc);


  //Iframelyを初回でも読み込めるように対応
  useEffect(() => {
    if (window.iframely) {
      window.iframely.load(); // Iframelyのスクリプトがすでに読み込まれている場合
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.iframe.ly/embed.js';
      script.async = true;
      script.onload = () => {
        window.iframely.load(); // Iframelyのスクリプトが読み込まれた後に初期化
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
    <Meta pageTitle={pageTitle}  pageDesc={pageDesc} pageImg={pageImg} pageImgW={pageImgW} pageImgH={pageImgH}  />
    <article className="post-body flex justify-center items-center mx-auto w-full md:w-2/3 ">

      <div>         
          <div>
              <h1>{blog.title}</h1>
              <p className="text-sm text-gray-600">
              {dayjs
                .utc(blog.publishedAt)
                .tz("Asia/Tokyo")
                .format(
                  "YYYY" +
                    "年" +
                    "MM" +
                    "月" +
                    "DD" +
                    "日" 
                )
              }
              </p>

              <p>
                <span className='py-3 text-gray-700 text-sm inline-flex items-center'>
                  <span className='text-base mt-1'><AiFillTags/></span>
                  <span>{blog.category.name}</span>
                </span>
              </p>
          </div>

          <div className="py-10 ">
              <figure className="py-10">
                <LazyLoadImage
                  className="w-full"
                  alt={blog.title}
                  src={blog.eyecatch.url}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  sizes="100vw"
                  effect="blur"
                  placeholder={<Image src={blog.eyecatch.url} width={1280} height = {720} alt="Loading..." />}
              />
              </figure>
          </div>

          {blog.toc_visible && (
          <TableOfContents toc={toc} />
          )}        
          <div
            dangerouslySetInnerHTML={{
              __html: `${htmlcontent}`,
            }}
          />

      </div>

    </article>
    </>

  );
};

export default BlogId;

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blogs", contentId: id });
    //console.log(data.content)

    // HTMLがロードされる
    const $ = cheerio.load(data.content);    // data.contentはmicroCMSから返されるリッチエディタ部分

    //シンタックスハイライト対応
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text());//要素のテキスト内容を取得し、hljs.highlightAuto()メソッドに渡しています。このメソッドはテキストを自動的に解析し、適切なプログラミング言語のシンタックスハイライトを適用したHTMLを生成。
      $(elm).html(result.value);//元の<code>要素の内容をハイライトされたHTMLに置き換え。
      $(elm).addClass('hljs');//スタイルシートに定義されているhljsクラスを<code>要素に追加。
    });

    // URLを格納するための配列
    //const links: string[] = [];


  //console.log(links); // URLの配列を表示
  //console.log($.html());    // ハイライト済みのHTML


  return {
    props: {
      blog: data,
      htmlcontent: $.html(),
    },
  };
};

