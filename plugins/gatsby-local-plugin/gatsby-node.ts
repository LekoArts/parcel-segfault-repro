import { GatsbyNode } from "gatsby"

export const onPreInit: GatsbyNode["onPreInit"] = ({ reporter }) => {
  reporter.info('I am working in a local plugin!')
}