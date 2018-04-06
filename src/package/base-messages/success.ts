import Visible from './visible';

export default class Success extends Visible {
  value: string;
  level: string;
  constructor(value: string) {
    super();
    this.value = value;
    this.level = 'alert-success';
  }
}
