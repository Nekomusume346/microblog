import { GetServerSideProps } from 'next';
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import Image from 'next/image';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AiFillTags } from 'react-icons/ai'
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';
import { renderToc } from '@/libs/render-toc'; //目次コンポーネント
import { TableOfContents }  from '@/components/TalbleOfContent'; 

// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

dayjs.extend(utc);
dayjs.extend(timezone);

type TocItem = {
  text: string;
  htmltag: string;
  id: string | undefined;
}

type Props = {
  blog: Blog;
  htmlcontent:string
};

const BlogId: React.FC<Props> = ({ blog, htmlcontent }: Props) => {
  const toc: TocItem[] = renderToc(htmlcontent);

  //console.log(toc);

  return (
  
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
          <div className="py-10">
              <Image
                  className="w-full"
                  width={1000}
                  height={800}
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  priority
              />
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

  //シンタックスハイライト対応
  const $ = cheerio.load(data.content);    // data.contentはmicroCMSから返されるリッチエディタ部分
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  
  //console.log($.html());    // ハイライト済みのHTML
  return {
    props: {
      blog: data,
      htmlcontent: $.html(),
    },
  };
};


// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const id = ctx.params?.id;
//   const idExceptArray = id instanceof Array ? id[0] : id;
//   const data = await client.get({
//     endpoint: 'blogs',
//     contentId: idExceptArray,
//   });

//   return {
//     props: {
//       blog: data,
//     },
//   };
// };
