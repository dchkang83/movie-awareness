/**
 * NAME : PD_Storage.js
 * DESC : Client Storage 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

/*
 * 로컬/세션 스토리지 생성
 * var local	= browserStorage('local', function (e, type, url, oldValue, newValue) { alert(e); });
 * var session	= browserStorage('session', function (e, type, url, oldValue, newValue) { alert(e); });
 */
var browserStorage = (function(win, doc) {
  return function(type, onStorage) {
    function init() {
      this.type = type || 'session';
      this.storage = win[this.type === 'local' ? 'localStorage' : 'sessionStorage'];
      this.length = this.storage.length;

      // events
      this.onStorage = onStorage || function() {
        ;
      };

      // add evnets
      appendEvent.call(this);

      return this;
    }
    ;

    init.prototype = {
      set : set,
      get : get,
      remove : remove,
      removeAll : removeAll
    };

    return new init;
  };

  function appendEvent() {
    var that = this;
    // storage 이벤트는 다른 document 기준에서 동일키 값 변경 시 발생된다.
    // (자기 document 안에서는 발생이 되지않는다. 즉, 탭을 하나 열고 테스트한다.)
    bind(window, 'storage', function(e) {
      that.onStorage.apply(that, [ e, that.type, e.url, e.key, e.oldValue, e.newValue ]);
    });
  }
  ;

  // 스토리지 key value 생성
  function set(key, value) {
    key = key || '';
    // JSON 객체담기
    // value = value && value.constructor === Object ? JSON.stringify(value) :
    // value;
    value = value && (value.constructor === Object || value.constructor === Array) ? JSON.stringify(value) : value;

    this.storage.setItem(key, value);
    this.length = this.storage.length;

    return this;
  }
  ;

  // 스토리지 key value 가져오기
  function get(key) {
    var item = this.storage.getItem(key);
    try {
      // item = "test";
      // alert(item);
      // alert(JSON.parse(item).constructor + "\n" + JSON.parse(item));
      // alert(JSON.parse(item).constructor === Object && JSON.parse(item));
      // alert("JSON.parse(item).constructor : " +
      // JSON.parse(item).constructor);

      // JSON 객체 가져오기
      // return JSON.parse(item).constructor === Object && JSON.parse(item);
      // return JSON.parse(item);
      return (JSON.parse(item).constructor === Object || JSON.parse(item).constructor === Array) && JSON.parse(item);
    } catch (e) {
      return item;
    }
  }
  ;

  // 스토리지 삭제
  function remove(key) {
    this.storage.removeItem(key);
    this.length = this.storage.length;
    return this;
  }
  ;

  // 스토리지 전체 삭제
  function removeAll() {
    this.storage.clear();

    this.length = this.storage.length;
    return this;
  }
  ;
})(window, document);

// 이벤트 할당
function bind(elem, type, handler, capture) {
  type = typeof type === 'string' && type || '';
  handler = handler || function() {
    ;
  };
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, capture);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, handler);
  }
  return elem;
};

/*
 * 로컬/세션 스토리지 생성 var local = browserStorage('local', function (e, type, url,
 * oldValue, newValue) { alert(e); }); var session = browserStorage('session',
 * function (e, type, url, oldValue, newValue) { alert(e); });
 */
var PD_Storage = {
  copyright : '덕준님',
  provider : 'pd-storage',
  worker : null,
  storage : null,
  storageData : null,
  init : function(worker) {
    this.storage = browserStorage('local', function(e, type, url, oldValue, newValue) { /* alert(e); */
    }); // Create Storage
    this.worker = typeof worker != "undefined" ? "-" + worker : "";
    this.storageData = this.storage.get(this.provider + this.worker);
    this.storageData = this.storageData == null ? {} : this.storageData;
    this.storageData.fnPush = function(key, value) {
      this[key] = value;
      return this;
    }
  },
  set : function(key, val, worker) {
    this.init(worker);
    this.storageData.fnPush(key, val);
    this.storage.set(this.provider + this.worker, this.storageData);
  },
  get : function(key, worker) {
    this.init(worker);
    return this.storageData[key];
  },
  remove : function(worker) {
    this.init(worker);
    this.storage.remove(this.provider + this.worker);
  },
  removeAll : function(worker) {
    this.init(worker);
    this.storage.removeAll();
  },
  removeElement : function(key, worker) {
    this.init(worker);
    delete this.storageData[key];
    this.storage.set(this.provider + this.worker, this.storageData);
  }
};

/*
 * 로컬/세션 스토리지 생성 var local = browserStorage('local', function (e, type, url,
 * oldValue, newValue) { alert(e); }); var session = browserStorage('session',
 * function (e, type, url, oldValue, newValue) { alert(e); });
 */
var PD_SessionStorage = {
  copyright : '덕준님',
  provider : 'pd-storage',
  worker : null,
  storage : null,
  storageData : null,
  init : function(worker) {
    this.storage = browserStorage('session', function(e, type, url, oldValue, newValue) { /* alert(e); */
    }); // Create Storage
    this.worker = typeof worker != "undefined" ? "-" + worker : "";
    this.storageData = this.storage.get(this.provider + this.worker);
    this.storageData = this.storageData == null ? {} : this.storageData;
    this.storageData.fnPush = function(key, value) {
      this[key] = value;
      return this;
    }
  },
  set : function(key, val, worker) {
    this.init(worker);
    this.storageData.fnPush(key, val);
    this.storage.set(this.provider + this.worker, this.storageData);
  },
  get : function(key, worker) {
    this.init(worker);
    return this.storageData[key];
  },
  remove : function(worker) {
    this.init(worker);
    this.storage.remove(this.provider + this.worker);
  },
  removeAll : function(worker) {
    this.init(worker);
    this.storage.removeAll();
  }
};