import Visible from './visible';

export default  class Danger extends Visible {
  value: string;
  level: string;
  constructor(value: string) {
    super();
    this.value = value;
    this.level = 'alert-danger';
  }
}
