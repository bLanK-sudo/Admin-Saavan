// import { serialize } from 'next-mdx-remote/serialize'
// import { MDXRemote } from 'next-mdx-remote/rsc'
import Markdown from 'markdown-to-jsx'
import { Heading1, OrderedList, Paragraph, UnorderedList, EventDetails } from './EventShards'


const components = {
  h1: {
    component: Heading1
  },
  p: {
    component: Paragraph
  },
  ul: {
    component: UnorderedList
  },
  ol: {
    component: OrderedList
  },
}

export default function CustomMDX({ source }) {
  return (
    <EventDetails>
      <Markdown
        options={{
          overrides: {
            ...components
          },
        }}
      >
        {source}
      </Markdown>
    </EventDetails>
  )
}