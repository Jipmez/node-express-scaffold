const DataHandlerService = require("../../services/DataHandler.service");

module.exports = class TemplateRoute {
  constructor(route, protection) {
    this.route = route;
    this._protection = protection;
  }
  setup() {
    this.route.get("/", (req, res) => {
      return DataHandlerService.response(
        res,
        200,
        "Error occurred. Please try again",
        {
          home: "asdhih",
        },
        "",
        "index"
      );
    });
    // set up routes
    //  this.route.post('page', controller);
  }
};
