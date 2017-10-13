/**
 * NAME : PD_Prototype.js
 * DESC : Prototype 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

/**
 * StringBuilder Library
 * 
 * @author kang d.j
 * @since 2015/03/16
 */
function StringBuilder(value) {
  this.strings = new Array("");
  this.append(value);
}
StringBuilder.prototype.append = function(value) {
  if (value) {
    this.strings.push(value);
  }
};
StringBuilder.prototype.clear = function() {
  this.strings.length = 1;
};
StringBuilder.prototype.toString = function() {
  return this.strings.join("");
};
StringBuilder.prototype.length = function() {
  return this.strings.length;
};

/**
 * string String::fnCutByte(int len)
 */
String.prototype.fnCutByte = function(len) {
  var str = this;
  str = str.toString();
  var l = 0;
  for (var i = 0; i < str.length; i++) {
    l += (str.charCodeAt(i) > 128) ? 2 : 1;
    if (l > len)
      return str.substring(0, i);
  }
  return str;
};

/**
 * bool String::byte(void)
 */
String.prototype.fnGetByte = function() {
  var str = this;
  str = str.toString();
  var l = 0;
  for (var i = 0; i < str.length; i++)
    l += (str.charCodeAt(i) > 128) ? 2 : 1;
  return l;
  /*
   * var arr = this.match(/[^\x00-\xff]/ig); return arr == null ? this.length :
   * this.length + arr.length;
   */
};

/**
 * 자바스크립트 HashMap 구현함
 */
Map = function() {
  this.map = new Object();
};
Map.prototype = {
  put : function(key, value) {
    this.map[key] = value;
  },
  get : function(key) {
    return this.map[key];
  },
  getAll : function() {
    return this.map;
  },
  containsKey : function(key) {
    return key in this.map;
  },
  containsValue : function(value) {
    for ( var prop in this.map) {
      if (this.map[prop] == value)
        return true;
    }
    return false;
  },
  isEmpty : function(key) {
    return (this.size() == 0);
  },
  clear : function() {
    for ( var prop in this.map) {
      delete this.map[prop];
    }
  },
  remove : function(key) {
    delete this.map[key];
  },
  keys : function() {
    var keys = new Array();
    for ( var prop in this.map) {
      keys.push(prop);
    }
    return keys;
  },
  values : function() {
    var values = new Array();
    for ( var prop in this.map) {
      values.push(this.map[prop]);
    }
    return values;
  },
  toString : function() {
    var temp = '';
    for (i in this.map) {
      temp = temp + ',' + i + ':' + this.map[i];
    }
    temp = temp.replace(',', '');
    return temp;
  },
  size : function() {
    var count = 0;
    for ( var prop in this.map) {
      count++;
    }
    return count;
  }
};
