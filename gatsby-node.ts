import { GatsbyNode } from "gatsby"

export const onPreInit: GatsbyNode["onPreInit"] = ({ reporter }) => {
  reporter.info('I am working!')
}

type Character = {
  id: number
  name: string
}

const characters: Character[] = [
  {
    id: 1,
    name: `Harry`
  },
  {
    id: 2,
    name: `Hermione`
  },
  {
    id: 3,
    name: `Ron`
  }
]

export const sourceNodes: GatsbyNode["sourceNodes"] = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  characters.forEach((c) => {
    const node = {
      ...c,
      id: createNodeId(`characters-${c.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Character',
        content: JSON.stringify(c),
        contentDigest: createContentDigest(c),
      },
    }

    createNode(node)
  })
}