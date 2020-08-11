import { ThunkDispatch, useReducerWithThunk } from "./useReducerWithThunk";
import { State } from "./reducer";
import { fetchProfile } from "./networking";
import { PublicUser, MinimalUser } from "../server/src/user";
import { Room } from "./room";
import { Message } from "./message";

export type Action =
  | ReceivedMyProfileAction
  | UpdatedCurrentRoomAction
  | UpdatedRoomDataAction
  | UpdatedPresenceAction
  | UpdatedVideoPresenceAction
  | PlayerConnectedAction
  | PlayerDisconnectedAction
  | ChatMessageAction
  | ModMessageAction
  | LoadMessageArchiveAction
  | WhisperAction
  | ShoutAction
  | EmoteAction
  | PlayerEnteredAction
  | PlayerLeftAction
  | UserMapAction
  | P2PDataReceivedAction
  | P2PStreamReceivedAction
  | P2PConnectionClosedAction
  | P2PWaitingForConnectionsAction
  | LocalMediaStreamOpenedAction
  | LocalMediaDeviceListReceivedAction
  | MediaReceivedSpeakingDataAction
  | StopVideoChatAction
  | ErrorAction
  | SendMessageAction
  | SetNameAction
  | StartWhisperAction
  | ShowProfileAction
  | ShowEditProfileAction
  | AuthenticateAction
  | IsRegisteredAction
  | BanToggleAction;

export enum ActionType {
  // Server-driven action
  ReceivedMyProfile = "RECEIVED_MY_PROFILE",
  UpdatedCurrentRoom = "UPDATED_CURRENT_ROOM",
  UpdatedRoomData = "UPDATED_ROOM_DATA",
  UpdatedPresence = "UPDATED_PRESENCE",
  UpdatedVideoPresence = "UPDATED_VIDEO_PRESENCE",
  PlayerConnected = "PLAYER_CONNECTED",
  PlayerDisconnected = "PLAYER_DISCONNECTED",
  ChatMessage = "CHAT_MESSAGE",
  ModMessage = "MOD_MESSAGE",
  Whisper = "WHISPER",
  Shout = "SHOUT",
  Emote = "EMOTE",
  PlayerEntered = "PLAYER_ENTERED",
  PlayerLeft = "PLAYER_LEFT",
  Error = "ERROR",
  UserMap = "USER_MAP",
  // WebRTC
  P2PDataReceived = "P2P_DATA_RECEIVED",
  P2PStreamReceived = "P2P_STREAM_RECEIVED",
  P2PConnectionClosed = "P2P_CONNECTION_CLOSED",
  P2PWaitingForConnections = "P2P_WAITING_FOR_CONNECTIONS",
  LocalMediaStreamOpened = "LOCAL_MEDIASTREAM_OPENED",
  StopVideoChat = "STOP_VIDEO_CHAT",
  LocalMediaDeviceListReceived = "LOCAL_MEDIA_DEVICE_LIST_RECEIVED",
  MediaReceivedSpeakingData = "MEDIA_RECEIVED_SPEAKING_DATA",
  // UI actions
  SendMessage = "SEND_MESSAGE",
  SetName = "SET_NAME",
  StartWhisper = "START_WHISPER",
  ShowProfile = "SHOW_PROFILE",
  ShowEditProfile = "SHOW_EDIT_PROFILE",
  //
  Authenticate = "AUTHENTICATE",
  IsRegistered = "IS_REGISTERED",
  BanToggle = "BAN_TOGGLE",
  LoadMessageArchive = "LOAD_MESSAGE_ARCHIVE",
}

interface ReceivedMyProfileAction {
  type: ActionType.ReceivedMyProfile;
  value: PublicUser;
}

export const ReceivedMyProfileAction = (
  user: PublicUser
): ReceivedMyProfileAction => {
  return {
    type: ActionType.ReceivedMyProfile,
    value: user,
  };
};

interface UpdatedCurrentRoomAction {
  type: ActionType.UpdatedCurrentRoom;
  value: string;
}

export const UpdatedCurrentRoomAction = (
  roomId: string
): UpdatedCurrentRoomAction => {
  return {
    type: ActionType.UpdatedCurrentRoom,
    value: roomId,
  };
};

interface UpdatedRoomDataAction {
  type: ActionType.UpdatedRoomData;
  value: { [roomId: string]: Room };
}

export const UpdatedRoomDataAction = (roomData: {
  [roomId: string]: Room;
}): UpdatedRoomDataAction => {
  return {
    type: ActionType.UpdatedRoomData,
    value: roomData,
  };
};

interface UpdatedPresenceAction {
  type: ActionType.UpdatedPresence;
  value: { [roomId: string]: string[] };
}

export const UpdatedPresenceAction = (data: {
  [roomId: string]: string[];
}): UpdatedPresenceAction => {
  return {
    type: ActionType.UpdatedPresence,
    value: data,
  };
};

interface UpdatedVideoPresenceAction {
  type: ActionType.UpdatedVideoPresence;
  value: { 
    roomId: string,
    users: string[]
  }
}

export const UpdatedVideoPresenceAction = (roomId: string, users: string[]): UpdatedVideoPresenceAction => {
  return {
    type: ActionType.UpdatedVideoPresence,
    value: {roomId, users},
  };
};

interface PlayerConnectedAction {
  type: ActionType.PlayerConnected;
  value: MinimalUser;
}

export const PlayerConnectedAction = (
  user: MinimalUser
): PlayerConnectedAction => {
  return {
    type: ActionType.PlayerConnected,
    value: user,
  };
};

interface PlayerDisconnectedAction {
  type: ActionType.PlayerDisconnected;
  value: string;
}

export const PlayerDisconnectedAction = (
  name: string
): PlayerDisconnectedAction => {
  return {
    type: ActionType.PlayerDisconnected,
    value: name,
  };
};

interface ChatMessageAction {
  type: ActionType.ChatMessage;
  value: {
    name: string;
    message: string;
  };
}

export const ChatMessageAction = (
  name: string,
  message: string
): ChatMessageAction => {
  return {
    type: ActionType.ChatMessage,
    value: { name, message },
  };
};

interface WhisperAction {
  type: ActionType.Whisper;
  value: {
    name: string;
    message: string;
  };
}

export const WhisperAction = (name: string, message: string): WhisperAction => {
  return {
    type: ActionType.Whisper,
    value: { name, message },
  };
};

interface ModMessageAction {
  type: ActionType.ModMessage;
  value: {
    name: string;
    message: string;
  };
}

export const ModMessageAction = (
  name: string,
  message: string
): ModMessageAction => {
  return {
    type: ActionType.ModMessage,
    value: { name, message },
  };
};

export const ShoutAction = (name: string, message: string): ShoutAction => {
  return {
    type: ActionType.Shout,
    value: { name, message },
  };
};

interface ShoutAction {
  type: ActionType.Shout;
  value: {
    name: string;
    message: string;
  };
}

interface EmoteAction {
  type: ActionType.Emote;
  value: {
    name: string;
    message: string;
  }
}

export const EmoteAction = (name: string, message: string): EmoteAction => {
  return {
    type: ActionType.Emote,
    value: { name, message }
  }
}

interface PlayerEnteredAction {
  type: ActionType.PlayerEntered;
  value: {
    name: string;
    from: string;
  };
}

export const PlayerEnteredAction = (
  name: string,
  from: string
): PlayerEnteredAction => {
  return {
    type: ActionType.PlayerEntered,
    value: { name, from },
  };
};

interface PlayerLeftAction {
  type: ActionType.PlayerLeft;
  value: {
    name: string;
    to: string;
  };
}

export const PlayerLeftAction = (
  name: string,
  to: string
): PlayerLeftAction => {
  return {
    type: ActionType.PlayerLeft,
    value: { name, to },
  };
};

interface UserMapAction {
  type: ActionType.UserMap;
  value: { [userId: string]: MinimalUser };
}

export const UserMapAction = (map: {
  [userId: string]: MinimalUser;
}): UserMapAction => {
  return {
    type: ActionType.UserMap,
    value: map,
  };
};

interface P2PDataReceivedAction {
  type: ActionType.P2PDataReceived;
  value: {
    peerId: string;
    data: string;
  };
}

export const P2PDataReceivedAction = (
  peerId: string,
  data: string
): P2PDataReceivedAction => {
  return {
    type: ActionType.P2PDataReceived,
    value: { peerId, data },
  };
};

interface P2PStreamReceivedAction {
  type: ActionType.P2PStreamReceived;
  value: string;
}

export const P2PStreamReceivedAction = (
  peerId: string
): P2PStreamReceivedAction => {
  return {
    type: ActionType.P2PStreamReceived,
    value: peerId,
  };
};

interface P2PConnectionClosedAction {
  type: ActionType.P2PConnectionClosed;
  value: string;
}

export const P2PConnectionClosedAction = (
  peerId: string
): P2PConnectionClosedAction => {
  return {
    type: ActionType.P2PConnectionClosed,
    value: peerId,
  };
};

interface P2PWaitingForConnectionsAction {
  type: ActionType.P2PWaitingForConnections;
}

export const P2PWaitingForConnectionsAction = (): P2PWaitingForConnectionsAction => {
  return {
    type: ActionType.P2PWaitingForConnections,
  };
};

interface LocalMediaStreamOpenedAction {
  type: ActionType.LocalMediaStreamOpened;
  value: {
    streamId: string;
    videoDeviceId: string;
    audioDeviceId: string;
  };
}

export const LocalMediaStreamOpenedAction = (
  streamId: string,
  devices: { videoDeviceId: string; audioDeviceId: string }
): LocalMediaStreamOpenedAction => {
  const { videoDeviceId, audioDeviceId } = devices;
  return {
    type: ActionType.LocalMediaStreamOpened,
    value: { streamId, videoDeviceId, audioDeviceId },
  };
};

interface LocalMediaDeviceListReceivedAction {
  type: ActionType.LocalMediaDeviceListReceived;
  value: MediaDeviceInfo[];
}

export const LocalMediaDeviceListReceivedAction = (
  devices: MediaDeviceInfo[]
): LocalMediaDeviceListReceivedAction => {
  return {
    type: ActionType.LocalMediaDeviceListReceived,
    value: devices,
  };
};

interface MediaReceivedSpeakingDataAction {
  type: ActionType.MediaReceivedSpeakingData;
  value: string[];
}

export const MediaReceivedSpeakingDataAction = (
  peerIds: string[]
): MediaReceivedSpeakingDataAction => {
  return {
    type: ActionType.MediaReceivedSpeakingData,
    value: peerIds,
  };
};

interface StopVideoChatAction {
  type: ActionType.StopVideoChat;
}

export const StopVideoChatAction = (): StopVideoChatAction => {
  return { type: ActionType.StopVideoChat };
};

interface ErrorAction {
  type: ActionType.Error;
  value: string;
}

export const ErrorAction = (error: string): ErrorAction => {
  return {
    type: ActionType.Error,
    value: error,
  };
};

// UI Actions

interface SendMessageAction {
  type: ActionType.SendMessage;
  value: string;
}

export const SendMessageAction = (message: string): SendMessageAction => {
  return {
    type: ActionType.SendMessage,
    value: message,
  };
};

interface SetNameAction {
  type: ActionType.SetName;
  value: string;
}

export const SetNameAction = (name: string): SetNameAction => {
  return {
    type: ActionType.SetName,
    value: name,
  };
};

interface StartWhisperAction {
  type: ActionType.StartWhisper;
  value: string;
}

export const StartWhisperAction = (name: string): StartWhisperAction => {
  return { type: ActionType.StartWhisper, value: name };
};

interface ShowProfileAction {
  type: ActionType.ShowProfile;
  value: PublicUser;
}

export const ShowProfileAction = (
  name: string
): ((dispatch: ThunkDispatch<Action, State>) => void) => {
  return async (dispatch: ThunkDispatch<Action, State>) => {
    console.log("lol");
    const user = await fetchProfile(name);
    if (!user) {
      console.log("No user");
      return;
    }
    dispatch(ShowProfileActionForFetchedUser(user));
  };
};

export const ShowProfileActionForFetchedUser = (
  user: PublicUser
): ShowProfileAction => {
  return {
    type: ActionType.ShowProfile,
    value: user,
  };
};

interface ShowEditProfileAction {
  type: ActionType.ShowEditProfile;
}

export const ShowEditProfileAction = (): ShowEditProfileAction => {
  return {
    type: ActionType.ShowEditProfile,
  };
};

interface AuthenticateAction {
  type: ActionType.Authenticate;
  value: { name: string; userId: string };
}

export const AuthenticateAction = (
  userId: string | undefined,
  name: string | undefined
): AuthenticateAction => {
  return { type: ActionType.Authenticate, value: { userId, name } };
};

interface IsRegisteredAction {
  type: ActionType.IsRegistered;
}

export const IsRegisteredAction = (): IsRegisteredAction => {
  return { type: ActionType.IsRegistered };
};

interface BanToggleAction {
  type: ActionType.BanToggle;
  value: string;
}

export const BanToggleAction = (userId: string): BanToggleAction => {
  return { type: ActionType.BanToggle, value: userId };
};

interface LoadMessageArchiveAction {
  type: ActionType.LoadMessageArchive;
  value: Message[];
}

export const LoadMessageArchiveAction = (messages: Message[]): LoadMessageArchiveAction => {
  return { type: ActionType.LoadMessageArchive, value: messages };
};
