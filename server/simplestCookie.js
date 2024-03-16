const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const uuid = require("uuid");

const app = express();

// Enable CORS middleware with credentials
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your client's origin
    credentials: true,
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    console.log("No sessionId cookie on this request or expired");
    const newSessionId = uuid.v4();
    console.log("New sessionId: ", newSessionId);
    console.log("--------------------------------------------------");
    res.cookie("sessionId", newSessionId, {
      maxAge: 1000 * 10,
      // Make sure to set 'sameSite' attribute to 'none' and 'secure' to 'true' if your client is served over HTTPS
      // sameSite: 'none',
      // secure: true
    });
    req.sessionId = newSessionId;
  } else {
    console.log("SessionId cookie attached.");
    console.log("Id: ", sessionId);
    console.log("--------------------------------------------------");
    req.sessionId = sessionId;
  }
  next();
});

app.get("/target-endpoint", (req, res) => {
  const sessionId = req.sessionId;
  // Additional logic using sessionId
  res.send("Response from Express server");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
