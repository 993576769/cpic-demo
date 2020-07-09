import Record from './record';

export default class User extends Record {
  static fields() {
    return {
      ...super.fields(),
      nickname: this.attr(''),
      avatar: this.attr(''),
    };
  }

  get wechat_authorized() {
    return this.avatar && this.nickname;
  }
}
