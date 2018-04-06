export interface Move {
  direction: number;
}

export interface Receipt {
  txhash: string;
  signature: string;
}

export interface Challenge {
  nonce: string;
}

export interface FullSignature {
  message: string;
  messageHash: string;
  v: number;
  r: string;
  s: string;
  signature: string;
}

export interface SignedGameState {
  score: number;
  gameover: boolean;
  signature: FullSignature;
  recoveredAddress: string;
  board: number[][];
}

export interface SignedScore {
  v: string;
  r: string;
  s: string;
  recoveredAddress: string;
  score: number;
}

export interface TransactionReceipt {
  transactionHash: string;
  status: string;
}

export interface ArcadeState {
  jackpot: number;
  highscore: number;
  round: number;
}

export interface MsgParams {
  type: string;
  name: string;
  value: string | number;
}

export interface Request {
  jsonrpc: string;
  method: string;
  params: any[];
  id: number;
}

export interface JsonRPCResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: string;
}

export interface Message {
  visible: boolean;
  value: string;
  level: string;
}

export interface Store {
  message: Message;
  game: SignedGameState;
  arcade: ArcadeState;
}
