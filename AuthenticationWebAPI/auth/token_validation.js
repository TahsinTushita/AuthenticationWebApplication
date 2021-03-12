const { verify } = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.TOKEN_KEY, (err, decoded, req) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token",
          });
        }  else {
          next();
        }
      });

      //   if (decoded.result.id == req.body.id) {
      //     next();
      //   } else {
      //     res.json({
      //       success: 0,
      //       message: "Invalid token",
      //     });
      //   }

      // try {
      //   let decoded = jwt.verify(token, process.env.TOKEN_KEY);
      //   req.body = decoded.result;
      //   next();
      // } catch (e) {
      //   res.json({
      //     success: 0,
      //     message: "Invalid token",
      //   });
      // }
    } else {
      res.json({
        success: 0,
        message: "Access denied! Unauthorizaed user",
      });
    }
  },
};
