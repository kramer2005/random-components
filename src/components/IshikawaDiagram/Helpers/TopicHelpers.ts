import { IshikawaNode, IshikawaRoot } from '../../../types'
import { addNode, removeNode, updateChildren } from './DiagramHelpers'

/**
 * Adiciona um novo tópico ao diagrama de Ishikawa
 * @param value Nome do tópico
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const createTopic = (
  value: string,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  if (state.children.length < 6) {
    const newState = {
      ...addNode(value, { ...state }, state.actualId),
      actualId: state.actualId + 1
    }
    setState(newState)
  }
}

/**
 * Atualiza um tópico do diagrama de Ishikawa
 * @param node Tópico a ser atualizado
 * @param name Novo nome do tópico
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const updateTopic = (
  node: IshikawaNode,
  value: string,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newTopic = { ...node, value }
  const newState = updateChildren({ ...state }, newTopic) as IshikawaRoot
  setState(newState)
}

/**
 * Remove um tópico do diagrama de Ishikawa
 * @param node Tópico a ser removido
 * @param state Estado atual do diagrama
 * @param setState Setter do estado do diagrama
 */
export const removeTopic = (
  node: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
): void => {
  const newState = removeNode(node, { ...state }) as IshikawaRoot
  setState(newState)
}

/**
 * Atualiza o nome de um tópico
 * @param e Evento que disparou a função
 * @param node Tópico a ser editado
 * @param state Estado do diagrama
 * @param setState Setter do estado do diagrama
 * @param nodeName ref renderizado
 */
export const updateTopicName = (
  e:
    | React.FocusEvent<HTMLHeadingElement>
    | React.KeyboardEvent<HTMLHeadingElement>,
  node: IshikawaNode,
  state: IshikawaRoot,
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>,
  nodeName: React.RefObject<HTMLHeadingElement>
): void => {
  updateTopic(node, (e.target as HTMLHeadingElement).innerHTML, state, setState)
  if (nodeName.current) {
    nodeName.current.contentEditable = 'false'
  }
}
