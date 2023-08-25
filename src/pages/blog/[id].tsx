import { GetServerSideProps } from 'next';
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import Image from 'next/image';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AiFillTags } from 'react-icons/ai'
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  blog: Blog;
};

const BlogId: React.FC<Props> = ({ blog }: Props) => {
  return (
    <main className="flex justify-center items-center mx-auto w-full">
      <div>
          
          <div>
              <h1 className="lg:text-2xl text-xl py-3">{blog.title}</h1>
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

          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.content}`,
            }}
          />
      </div>

    </main>
  );
};

export default BlogId;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const data = await client.get({
    endpoint: 'blogs',
    contentId: idExceptArray,
  });

  return {
    props: {
      blog: data,
    },
  };
};

// export const getStaticPaths = async () => {
//   const data = await client.get({ endpoint: "blogs" });

//   const paths = data.contents.map(
//     (content: { id: string }) => `/blog/${content.id}`
//   );
//   return { paths, fallback: false };
// };

// export const getStaticProps = async (context: { params: { id: string } }) => {
//   const id = context.params.id;
//   const data = await client.get({ endpoint: "blogs", contentId: id });

//   return {
//     props: {
//       blog: data,
//     },
//   };
// };
