
var ParamModelManager = {
  counter: 0,
  data: [],
  get: function () {
    return ParamModelManager.data;
  },
  addParam: function (param) {
    var model = new ParamModel(param);
    ParamModelManager.data.push(model);
  },
  deleteParam: function (param) {
    var idx = -1;
    ParamModelManager.data.forEach(function (el, index) {
      if(el.id === param.id) {
        idx = index;
      }
    });
    ParamModelManager.data.splice(idx, 1);
  },
  json: function () {
    return ParamModelManager.data.reduce(function(prev, cur) {
      if (cur.key !== "") {
        prev[cur.key] = cur.value;
      }
      return prev;
    }, {});
  }
};

var ParamModel = function(param) {
  this.id = param.id || ParamModelManager.counter++;
  this.key = param.key || "";
  this.value = param.value || "";
};

ParamModel.prototype.delete = function() {
  ParamModelManager.deleteParam(this);
};


