import { ss } from '@/utils/storage'
const LOCAL_NAME = 'chatStorage'

const defaultConversation = {
  uuid: 'default',
  title: 'New Chat',
  remark: '',
  aiSystemMessage: '',
  understandContextEnable: false,
  loadedAll: false,
  loadedFirstPageMsg: false,
  usedPreset: false,
}

export function defaultState(): Chat.ChatState {
  return {
    active: defaultConversation.uuid,
    usingContext: true,
    presetConvs: [],
    conversations: [defaultConversation],
    chats: [{ uuid: defaultConversation.uuid, data: [] }],
    loadingMsgs: new Set<string>(),
  }
}

export function defaultConv(): Chat.Conversation {
  return defaultConversation
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}

export function findMessageFromConv(conv: Chat.ConvWithMessages, messageUuid: string): Chat.ChatMessage | null {
  const questions = conv.data
  for (const question of questions) {
    if (question.uuid === messageUuid) {
      return question
    } else {
      const result = question.children.find(child => child.uuid === messageUuid)
      if (result)
        return result
    }
  }
  return null
}
