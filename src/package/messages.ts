import Danger from './base-messages/danger';
import Info from './base-messages/info';
import Success from './base-messages/success';

export const Loading = new Info('Loading...');
export const GameOver = new Danger('Gameover!');
export const GetNewGameRejected = new Danger('Error starting new game.');
export const GetGameStateRejected = new Danger('Error fetching game-state.');
export const MoveRejected = new Danger('Error submitting move.');
export const GetArcadeStateRejected = new Danger('Error fetching arcade-state.');
export const UploadRejected = new Danger('Error uploading score.');
export const UploadScoreSuccess = new Success('Success uploading score.');
