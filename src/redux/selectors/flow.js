import * as styles from "../../styles/flow_graph.module.css"

export const getNodes = (store) => store.flow.nodes;

export const getLinks = (store) => store.flow.links;

export const getNodeStyle = (store, id) => {
  let s = store.flow.nodeStyles.filter((node) => {
    return node.id === id;
  })[0]?.styleClass;
  return s ? styles[s] : styles["species"];
}

export const getLinkStyle = (store, id) => {
  let l = store.flow.linkStyles.filter((link) => {
    return link.id === id;
  })[0]?.styleClass;
  return l ? styles[l] : styles["reaction"];
}