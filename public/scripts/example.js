var gParams = {
  method: "GET",
  url: "/contacts"
};

var ParameterForm = React.createClass({
  DeleteMe: function(e) {
    e.preventDefault();
    this.props.data.delete();
    this.props.parentChangeState();
  },
  handleKeyChange: function(event) {
    this.props.data.key = event.target.value;
    this.forceUpdate();
  },
  handleValueChange: function(event) {
    this.props.data.value = event.target.value;
    this.forceUpdate();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <input type="text" placeholder="Key" className="form-control"
            value={this.props.data.key} onChange={this.handleKeyChange} />
        </div>
        <div className="col-xs-8">
          <input type="text" placeholder="Value" className="form-control col-xs-8"
            value={this.props.data.value} onChange={this.handleValueChange} />
        </div>
        <button className="btn btn-default"
          onClick={this.DeleteMe}><i className="glyphicon glyphicon-remove"></i></button>
      </div>
    );
  }
});

var RestRequestHeaderBox = React.createClass({
  getInitialState: function() {
    return {
      method: gParams.method,
      url: gParams.url
    };
  },
  changeMethod: function (event) {
    gParams.method = event.target.value;
    this.setState({
      method: event.target.value
    });
  },
  changeUrl: function (event) {
    gParams.url = event.target.value;
    this.setState({
      url: event.target.value
    });
  },
  render: function() {
    return (
      <section>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="restMethod" className="col-sm-2 control-label">Method</label>
            <div className="col-sm-10">
              <select id="restMethod" className="form-control" ref="method"
                value={this.state.method} onChange={this.changeMethod}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="restEndpoint" className="col-sm-2 control-label">Endpoint</label>
            <div className="col-sm-10">
              <input type="text" id="restEndpoint" className="form-control" ref="endpoint"
                value={this.state.url} onChange={this.changeUrl} />
            </div>
          </div>
        </div>
      </section>
    );
  }
});

var RestParameterListBox = React.createClass({
  getInitialState: function() {
    return {data: ParamModelManager.get()};
  },
  changeState: function (data) {
    this.setState({data: ParamModelManager.get()});
  },
  AddOne: function(e) {
    e.preventDefault();
    ParamModelManager.addParam({key: '', value: ''});
    render();
  },
  render: function() {
    var requestNodes = this.state.data.map(function(parameter, index) {
      return (
        <ParameterForm data={parameter} key={index} parentChangeState={this.changeState}>
        </ParameterForm>
      );
    }.bind(this));
    return (
      <div className="parameterList well">
        <button className="btn btn-primary" onClick={this.AddOne}>Add new value</button>
        {requestNodes}
      </div>
    );
  }
});

var RestRequestResultBox = React.createClass({
  getInitialState: function() {
    return {result: '{}'};
  },
  sendRequest: function () {
    RestService.fire(gParams.url, gParams.method, ParamModelManager.json(),
      function(data) {
        console.log('--- SUCCESS: ', data);
        this.setState({result: JSON.toString(data)});
      }.bind(this),
      function (xhr, status, err) {
        console.log('--- ERROR: ', xhr, status, err);
        this.setState({result: '{}'});
      }.bind(this)
    );
  },
  render: function () {
    return (
      <div>
        <div>
          <button className="btn btn-danger" onClick={this.sendRequest}>Send</button>
        </div>
        <h4> Result : </h4>
        <div className="well">
        {this.result}
        </div>
      </div>
    );
  }
});

var RestBox = React.createClass({

  render: function() {
    return (
      <div className="commentBox">
        <RestRequestHeaderBox />
        <RestParameterListBox />
        <RestRequestResultBox />
      </div>
    );
  }
});

var render = function () {
  React.render(
    <RestBox />,
    document.getElementById('content')
  );
};

render();
