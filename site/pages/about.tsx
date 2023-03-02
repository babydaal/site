import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      description: 'farah makes some bomb ass granola.',
    },
  }
}

export default function About({
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  return router.isFallback ? <h1>Loading...</h1> : <h1>{description}</h1>
}
About.Layout = Layout
