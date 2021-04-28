import { IshikawaNode, IshikawaRoot } from '../../../types'
import { addNode, findNode, removeNode, updateChildren } from './DiagramHelpers'

/**
 * Adiciona uma causa a um tópico do diagrama de Ishikawa,
 * @param value Causa a ser adicionada
 * @param parent Tópico pai da causa
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const createCause = (
  value: string,
  parent: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newParent = addNode(value, parent, state.actualId)
  const newState = {
    ...updateChildren({ ...state }, newParent),
    actualId: state.actualId + 1
  }
  setState(newState)
}

/**
 * Atualiza uma causa do diagrama de Ishikawa
 * @param node Causa a ser atualizada
 * @param name Novo nome da causa
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const updateCause = (
  node: IshikawaNode,
  value: string,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newCause = { ...node, value }
  const newTopic = updateChildren(
    { ...findNode(node.parent?.key, state) } as IshikawaNode,
    newCause
  )
  const newState = updateChildren({ ...state }, newTopic) as IshikawaRoot
  setState(newState)
}

/**
 * Remove uma causa de um tópico do diagrama de Ishikawa
 * @param node Causa a ser removida
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const removeCause = (
  node: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newTopic = removeNode(node, {
    ...findNode(node.parent?.key, state)
  } as IshikawaNode)
  const newState = updateChildren({ ...state }, newTopic) as IshikawaRoot
  setState(newState)
}

/**
 * Atualiza o nome de uma causa
 * @param e Evento que disparou a função
 * @param node Causa a ser editada
 * @param state Estado do diagrama
 * @param setState Setter do estado do diagrama
 * @param nodeName ref renderizado
 */
export const updateCauseName = (
  e:
    | React.FocusEvent<HTMLHeadingElement>
    | React.KeyboardEvent<HTMLHeadingElement>,
  node: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>,
  nodeName: React.RefObject<HTMLHeadingElement>
): void => {
  updateCause(node, (e.target as HTMLHeadingElement).innerHTML, state, setState)
  if (nodeName.current) {
    nodeName.current.contentEditable = 'false'
  }
}
