import _ from 'lodash';
import Model from '@vuex-orm/core/lib/model/Model';
import { request } from '@/utils/request';

export default class Record extends Model {
  static fields() {
    return {
      id: this.attr(null),
      created_at: this.attr(''),
      cn: this.attr(''),
      tn: this.attr(''),
    };
  }

  static api(cb) {
    const methods = ['get', 'delete', 'post', 'put', 'patch', 'request'];
    const obj = Object.create(request);
    methods.forEach(method => {
      obj[method] = async (...arg) => {
        const res = await request[method](...arg);
        if (cb) {
          cb(res);
        } else if (_.isArray(res.data)) {
          res.data = res.data.map(v => new this(v));
        } else {
          res.data = new this(res.data);
        }
        return res;
      };
    });
    return obj;
  }

  api() {
    return this.constructor.api(res => res.data = this.updateAttrs(res.data));
  }

  constructor(attrs) {
    super(attrs);
    _.keys(attrs).forEach(key => {
      if (!_.hasIn(this, key)) {
        this[key] = attrs[key];
      }
    });
  }

  updateAttrs(attrs) {
    if (!_.isPlainObject(attrs)) {
      // eslint-disable-next-line no-console
      console.warn('attrs 尽量传递[普通对象](https://www.html.cn/doc/lodash/#_isplainobjectvalue)');
    }
    const model = new this.constructor(attrs);
    const newAttr = _.pick(model, _.keys(attrs));
    return Object.assign(this, newAttr);
  }
}

/*  #ifdef MP-WEIXIN  */
Record.prototype.toJSON = require('@/utils/to-json-deep').default;
/*  #endif  */
