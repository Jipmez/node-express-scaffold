const { DataHandlerService } = require("./services/DataHandler.service");
const { TokenService } = require("./services/token.service");

module.exports = class Guard {
  constructor() {
    this._token = "";
    this._users = {};
  }

  async protectedAuthenticated(req, next) {
    try {
      console.log(
        " ------------------- CONNECTED AUTH USER ------------------------"
      );
      console.log(
        ".................................................................."
      );
      console.log("-----------  IP ADDRESS:         " + req.request.ip);
      console.log(
        "......................................................................"
      );
      console.log(
        "---------------  Date  " +
          new Date().toISOString() +
          " .................."
      );
      console.log(
        "....................................................................."
      );
      console.log(
        "........................... body ......................................"
      );
      console.log(req.body);
      console.log("header ", req.request.headers);

      if (!req.request.headers || !req.headers.authorization) {
        req.body = DataHandlerService.response(req, 403, "Unauthorized", []);
        return;
      }

      this._token = req.headers.authorization;

      const decodedToken = await TokenService.verify(this._token);

      if (decodedToken.type !== TokenEnum.LOGIN) {
        req.body = DataHandlerService.response(req, 403, "Invalid token", []);
        return;
      }

      const user = await req.db.User.findOne({
        where: {
          id: decodedToken.id,
        },
        include: [req.db.Country],
      });

      if (!user || !user.id) {
        req.body = DataHandlerService.response(req, 403, "Invalid token", []);
        return;
      }
      req.state = {};
      req.state.firstname = user.firstname;
      req.state.lastname = user.lastname;
      req.state.picture = user.picture;
      req.state.headline = user.headline;
      req.state.id = user.id;
      req.state.email = user.email;
      req.state.Country = user.Country;
      await next();
    } catch (e) {
      console.log(e);
      console.log(
        "   -------------- FAILED ATTEMPT TO AUTHENTICATED ----------"
      );
      req.body = DataHandlerService.response(req, 403, "Unauthorized", []);
    }
  }
};
