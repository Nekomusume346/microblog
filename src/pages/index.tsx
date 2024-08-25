import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Blog } from "@/types/blog";
import { client } from "@/libs/client";
import Pagination from '@/components/pagination';
import BlogItem from '@/components/blogitem';
import Meta from '@/components/meta'; 
import eyecatch from '@/img/ogp.png';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  blogs: Blog[];
  totalCount: number;
};

//topページ
export default function Home({ blogs, totalCount }: Props) {
  
  const pageTitle = "トップページ";
  const pageDesc ="";
  const pageImg = eyecatch.src;
  const pageImgW = eyecatch.width;
  const pageImgH = eyecatch.height;

  return (
    <>
    <Meta pageTitle={pageTitle} pageDesc={pageDesc} pageImg={pageImg} pageImgW={pageImgW} pageImgH={pageImgH} />
    <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blogs.map((blog, index) => (
          <BlogItem key={index} {...blog} /> 
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
  const data = await client.get({ endpoint: "blogs", queries: { offset: 0, limit: 12 } })

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

