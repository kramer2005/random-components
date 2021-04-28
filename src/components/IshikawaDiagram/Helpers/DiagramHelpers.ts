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
  if (newParent?.children.find(el => el.value === value)) {
    throw new Error('NÓS NÃO PODEM TER NOMES REPETIDOS')
  }
  newParent.children?.push({
    value: key.toString(),
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
