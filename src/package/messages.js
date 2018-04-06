class Visible {
  constructor() {
    this.visible = true;
  }
}

class Danger extends Visible {
  constructor(value) {
    super();
    this.value = value;
    this.level = 'alert-danger';
  }
}

class Info extends Visible {
  constructor(value) {
    super();
    this.value = value;
    this.level = 'alert-info';
  }
}

class Success extends Visible {
  constructor(value) {
    super();
    this.value = value;
    this.level = 'alert-success';
  }
}

export const Loading = new Info('Loading...');
export const GameOver = new Danger('Gameover!');
export const GetNewGameRejected = new Danger('Error starting new game.');
export const GetGameStateRejected = new Danger('Error fetching game-state.');
export const MoveRejected = new Danger('Error submitting move.');
export const GetArcadeStateRejected = new Danger('Error fetching arcade-state.');
export const UploadRejected = new Danger('Error uploading score.');
export const UploadScoreSuccess = new Success('Success uploading score.');
