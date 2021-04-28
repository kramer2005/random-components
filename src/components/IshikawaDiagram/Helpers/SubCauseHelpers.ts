import { IshikawaNode, IshikawaRoot } from '../../../types'
import { addNode, findNode, removeNode, updateChildren } from './DiagramHelpers'

/**
 * Adiciona uma subcausa a uma causa do diagrama de Ishikawa,
 * @param value Subcausa a ser adicionada
 * @param parent Causa pai da Subcausa
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const createSubCause = (
  value: string,
  parent: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  // Adiciona subcausa a causa
  const newCause = addNode(value, parent, state.actualId)

  // Atualiza tópico
  const newTopic = updateChildren({ ...parent }, newCause)

  // Atualiza estado do diagrama
  const newState = {
    ...updateChildren({ ...state }, newTopic),
    actualId: state.actualId + 1
  }
  setState(newState)
}

/**
 * Atualiza uma subcausa do diagrama de Ishikawa
 * @param node Subcausa a ser atualizada
 * @param name Novo nome da subcausa
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const updateSubCause = (
  node: IshikawaNode,
  value: string,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newSubCause = { ...node, value }
  const newCause = updateChildren(
    { ...findNode(node.parent?.key, state) } as IshikawaNode,
    newSubCause
  )
  const newTopic = updateChildren(
    { ...findNode(newCause.parent?.key, state) } as IshikawaNode,
    newCause
  )
  const newState = updateChildren({ ...state }, newTopic) as IshikawaRoot
  setState(newState)
}

/**
 * Remove uma subcausa de uma causa do diagrama de Ishikawa
 * @param node Subcausa a ser removida
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const removeSubCause = (
  node: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newCause = removeNode(node, {
    ...findNode(node.parent?.key, state)
  } as IshikawaNode)
  const newTopic = updateChildren(
    { ...newCause.parent } as IshikawaNode,
    newCause as IshikawaNode
  )
  const newState = updateChildren({ ...state }, newTopic) as IshikawaRoot
  setState(newState)
}
