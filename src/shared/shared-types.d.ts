type PromiseType<T> = T extends Promise<infer U> ? U : any

export type Credentials = {
  [key: string]: any
  addr?: string
  mail_user?: string
  mail_pw?: string
  mail_server?: string
  mail_port?: string
  mail_security?: 'automatic' | '' | 'ssl' | 'default'
  imap_certificate_checks?: any
  send_user?: string
  send_pw?: string
  send_server?: string
  send_port?: string
  send_security?: 'automatic' | '' | 'ssl' | 'starttls' | 'plain'
  smtp_certificate_checks?: any
}

export interface DesktopSettings {
  bounds:
    | {
        height: number
        width: number
        x: number
        y: number
      }
    | {}
  chatViewBgImg: string
  /** @deprecated replaced by lastAccount */
  credentials: Credentials
  /** path to last used/selected Account */
  lastAccount: string
  enableAVCalls: boolean
  enableOnDemandLocationStreaming: boolean
  enterKeySends: boolean
  locale: string | null
  notifications: boolean
  showNotificationContent: boolean
  lastChats: { [account_addr: string]: number }
  zoomFactor: number
  /** address to the active theme file scheme: "custom:name" or "dc:name" */
  activeTheme: string
  minimizeToTray: boolean
}

export interface AppState {
  saved: DesktopSettings
  logins: DeltaChatAccount[]
}

export interface RC_Config {
  'log-debug': boolean
  'log-to-console': boolean
  'machine-readable-stacktrace': boolean
  'multiple-instances': boolean
  theme: string | undefined
  'theme-watch': boolean
  debug: boolean
  'translation-watch': boolean
}

import { App } from 'electron'
import { LocaleData } from '../shared/localize'
import { QrState } from '../shared/constants'
import { C } from 'deltachat-node/dist/constants'

export interface ExtendedApp extends App {
  rc: RC_Config
  isQuitting: boolean
  ipcReady: boolean
  localeData?: LocaleData
  state?: AppState
}

import type { Contact } from 'deltachat-node'

export type ContactJSON = ReturnType<typeof Contact.prototype.toJson>
export interface ChatListItemType {
  /** chat id */
  id: number
  name: string
  avatarPath: string
  color: string
  lastUpdated: number
  summary:
    | {
        text1: any
        text2: any
        state: MessageState
      }
    | undefined
  deaddrop: any
  isProtected: boolean
  isGroup: boolean
  freshMessageCounter: number
  isArchiveLink: boolean
  contactIds: number[]
  isSelfTalk: boolean
  isDeviceTalk: boolean
  selfInGroup: boolean
  archived: boolean
  pinned: boolean
  muted: boolean
}

import type { Chat, Message } from 'deltachat-node'
import { MessageType2 } from './shared'

export type JsonChat = ReturnType<typeof Chat.prototype.toJson>

export type JsonContact = ReturnType<typeof Contact.prototype.toJson>

export type JsonLocations = {
  accuracy: number
  latitude: number
  longitude: number
  timestamp: number
  contactId: number
  msgId: number
  chatId: number
  isIndependent: boolean
  marker: string
}[] // ReturnType<typeof DeltaChat.prototype.getLocations>

export type JsonMessage = ReturnType<typeof Message.prototype.toJson>

export interface FullChat {
  id: number
  name: string
  isProtected: boolean
  profileImage: string
  archived: boolean
  subtitle: any
  type: number
  isUnpromoted: boolean
  isSelfTalk: boolean
  contacts: JsonContact[]
  contactIds: number[]
  color: string
  freshMessageCounter: number
  isGroup: boolean
  isDeaddrop: boolean
  isDeviceChat: boolean
  selfInGroup: boolean
  muted: boolean
  ephemeralTimer: number
}

type todo = any

export interface MessageTypeAttachment {
  url: string
  contentType: string
  fileName: string
  fileSize: string
}

export type MessageState = C.DC_STATE_IN_FRESH 
  | C.DC_STATE_IN_NOTICED
  | C.DC_STATE_OUT_DELIVERED
  | C.DC_STATE_OUT_DRAFT
  | C.DC_STATE_OUT_FAILED
  | C.DC_STATE_OUT_MDN_RCVD
  | C.DC_STATE_OUT_PENDING
  | C.DC_STATE_OUT_PREPARING

export type MessageStateString = 'error'
  | 'sending'
  | 'draft'
  | 'delivered'
  | 'read'
  | ''

export interface MessageType {
  id: number
  msg: {
    chatId: number;
    duration: number;
    file: string;
    fromId: number;
    id: number;
    quotedText: string;
    quotedMessageId: number;
    receivedTimestamp: number;
    sortTimestamp: number;
    text: string;
    timestamp: number;
    hasLocation: boolean;
    viewType: any;
    hasDeviatingTimestamp: any;
    showPadlock: boolean;
    summary: {
        state: number;
        text1: string;
        text1Meaning: string;
        text2: string;
        timestamp: number;
    };
    isSetupmessage: boolean;
    isInfo: boolean;
    isForwarded: boolean;
    dimensions: {
        height: number;
        width: number;
    };
    videochatType: number;
    videochatUrl: string;
    sentAt: number
    receivedAt: number
    direction: 'outgoing' | 'incoming'
    state: MessageState
    attachment?: MessageTypeAttachment
  }
  filemime: string
  filename: string
  filesize: todo
  viewType: todo
  fromId: number
  isMe: boolean
  contact: DCContact
  isInfo: boolean
  setupCodeBegin?: string
}

export type MessageDayMarker = {
  timestamp: number
}

export type MessageMarkerOne = null

export type Message2 = {
  type: MessageType2
  message: MessageMarkerOne | MessageDayMarker | MessageType | null
} | null

export type DCContact = Omit<JsonContact, 'color'> & { color: string }

export type Theme = {
  name: string
  description: string
  address: string
}

export type MessageSearchResult = {
  id: number
  authorProfileImage: string
  author_name: string
  author_color: string
  chat_name: null | string
  message: string
  timestamp: number
}

export type DeltaChatAccount = {
  path: string
  displayname: string
  addr: string
  size: number
  profileImage: string
  color: string
}

export declare type QrCodeResponse = {
  state: QrState
  id: number
  text1: string
}
