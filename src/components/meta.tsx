import Head from "next/head";
import { siteMeta } from "@/libs/constants";
import { useRouter } from "next/router";
import siteImg from '@/img/ogp.png'

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta

type MetaProps = {
    pageTitle: string | null;
    pageDesc: string;
    pageImg: string | null;
    pageImgW: number;
    pageImgH: number;
  };
  

const Meta: React.FC<MetaProps> = ({ pageTitle, pageDesc, pageImg, pageImgW, pageImgH }) => {
    //ページの説明
    const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle

    //ページの説明
    const desc = pageDesc ?? siteDesc

    //ページのURL
    const router = useRouter()
    const url = `${siteUrl}${router.asPath}`

    //OGP画像
    const img = pageImg || siteImg.src
    const imgW = pageImgW || siteImg.width
    const imgH = pageImgH || siteImg.height
    const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`

    return(
        <Head>
            <title> {pageTitle} | {siteTitle} </title>
            <meta property="og:title" content={ `${pageTitle} | ${siteTitle}` }/>
            <meta name="description" content = {desc} />
            <meta property="og:description" content={desc} />

            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />

            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:type" content={siteType} />
            <meta property="og:locale" content={siteLocale} />

            <link rel="icon" href={siteIcon} />
            <link rel="apple-touch-icon" href={siteIcon} />

            <meta property="og:image" content={imgUrl} />
            <meta property="og:image:width" content={imgW.toString()} />
            <meta property="og:image:height" content={imgH.toString()} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}
export default Meta