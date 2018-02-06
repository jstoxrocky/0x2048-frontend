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
export const GetGameStateRejected = new Danger('Fetching the game-state was rejected.');
export const MoveRejected = new Danger('Your move was rejected.');
export const PaymentRejected = new Danger('Your payment was rejected.');
export const GetArcadeStateRejected = new Danger('Fetching the arcade-state was rejected.');
export const UploadRejected = new Danger('Your upload was rejected.');
export const AdjustPriceRejected = new Danger('Your price adjustment was rejected.');
export const PaySuccess = new Success('Your payment was successful.');
export const UploadScoreSuccess = new Success('Your score upload was successful.');
export const AdjustPriceSuccess = new Success('Your price adjustment was successful.');
