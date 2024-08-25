import Image from 'next/image'
import Link from 'next/link';
import Pagination from '@/components/pagination';
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import BlogItem from '@/components/blogitem';
import { load } from 'cheerio';
import hljs from 'highlight.js';

//const PER_PAGE = 3; 

type Props = {
    blogs: Blog[];
    totalCount: number;
  };

// pages/blog/[id].js
export default function BlogPageId({ blogs, totalCount }: Props) {

  return (
    <>
    <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blogs.map((blog, index) => (
            <BlogItem key={index} {...blog} />   
        ))}      
    </div>
    </>

  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content: any) => `/blog/category/${content.id}`);

  return { paths, fallback: false };
};

// データを取得(カテゴリで検索)
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", queries: { filters: `category[equals]${id}` } });
  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};