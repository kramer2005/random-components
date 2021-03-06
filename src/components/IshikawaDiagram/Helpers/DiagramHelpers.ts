import { IshikawaNode, IshikawaRoot } from '../../../types'

/**
 * Adiciona um filho à um nó do diagrama de Ishikawa
 * @param value String a ser colocada
 * @param parent Nó pai
 * @returns Nó pai com o filho
 */
export const addNode = (
  value: string,
  parent: IshikawaNode | IshikawaRoot,
  key: number
): IshikawaNode => {
  const newParent = { ...parent }
  newParent.children?.push({
    value: value,
    children: [],
    parent: parent,
    key
  } as IshikawaNode)
  return newParent
}

/**
 * Encontra um nó
 * @param id Id do nó a ser encontrado
 * @param actualNode Nó atual da iteração
 * @returns Nó atualizado
 */
export const findNode = (
  id: number | undefined,
  actualNode: IshikawaNode
): IshikawaNode | void => {
  for (const n of actualNode.children) {
    if (n.key === id) {
      return n
    }
    const nextLayer = findNode(id, n)
    if (nextLayer) {
      return nextLayer
    }
  }
}

/**
 * Remove um filho de um nó do diagrama de Ishikawa
 * @param node Filho a ser removido
 * @param parent Nó pai que terá o filho removido
 * @returns Nó pai atualizado
 */
export const removeNode = (
  node: IshikawaNode,
  parent: IshikawaNode | IshikawaRoot
): IshikawaNode | IshikawaRoot => {
  const newParent = {
    ...parent,
    children: parent.children.filter(el => el.key !== node.key)
  }
  return newParent
}

/**
 * Atualiza um nó filho
 * @param parent Nó pai
 * @param children Novo filho
 * @returns Nó pai atualizado
 */
export const updateChildren = (
  parent: IshikawaNode | IshikawaRoot,
  children: IshikawaNode
): IshikawaNode | IshikawaRoot => {
  return {
    ...parent,

    children: parent.children.map(el =>
      el.key === children.key ? children : el
    )
  }
}

/**
 * Atualiza o problema do diagrama
 * @param e Evento que disparou a função
 * @param state Estado do diagrama
 * @param setState Setter do estado do diagrama
 * @param nodeName ref renderizado
 */
export const updateProblema = (
  e:
    | React.FocusEvent<HTMLHeadingElement>
    | React.KeyboardEvent<HTMLHeadingElement>,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>,
  nodeName: React.RefObject<HTMLHeadingElement>
): void => {
  setState({ ...state, value: (e.target as HTMLHeadingElement).innerHTML })
  if (nodeName.current) {
    nodeName.current.contentEditable = 'false'
  }
}
