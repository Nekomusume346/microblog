import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Blog } from "@/types/blog";
import { client } from "@/libs/client";
import Pagination from '@/components/pagination';


const inter = Inter({ subsets: ['latin'] })

type Props = {
  blogs: Blog[];
  totalCount: number;
};

//topページ
export default function Home({ blogs, totalCount }: Props) {

  return (
    <>
    <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blogs.map((blog, index) => (
          <div key={index}>
              <div className="rounded overflow-hidden shadow-lg" >
                  <Image
                    className="w-full"
                    width={300}
                    height={200}
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    priority
                  />
                  <div className="py-5  mx-1">
                      <p className='text-center text-xl  md:text-base  font-bold leading-5'>
                          {blog.title}
                      </p>                      
                  </div>
                  <div className='flex justify-center items-center mx-auto w-full pt-10 pb-5'>
                  <Link href={`/blog/${blog.id}`} passHref>
                    <span className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-700  hover:bg-gray-300  border border-gray-700">
                      READ MORE                      
                    </span>
                  </Link>
                  </div>
              </div>
          </div>
        ))}      
    </div>

    <div className='flex justify-center items-center mx-auto w-full'>
      <Pagination totalCount={totalCount} />      
    </div>     

    </>

  )
}



// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  //const data = await client.get({ endpoint: "blogs" });
  const data = await client.get({ endpoint: "blogs", queries: { offset: 0, limit: 3 } })

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

