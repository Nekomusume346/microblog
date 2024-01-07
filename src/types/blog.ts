export type Blog = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    body: string;
    eyecatch: {
      url: string;
      width: number;
      height: number;
    };
    category: {
      id?: string | null;
      name?: string | null;
    }
    content:string;
    tag: string;
    toc_visible: boolean;
};