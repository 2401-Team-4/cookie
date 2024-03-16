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

const SESSION_DURATION = 1000 * 10;

app.use((req, res, next) => {
  const sessionId = req.cookies.sessionId;
  const currentTime = new Date().getTime();

  if (!sessionId || currentTime - sessionId.lastActivity > SESSION_DURATION) {
    console.log("No sessionId cookie on this request or expired");
    const newSessionId = uuid.v4();
    res.cookie(
      "sessionId",
      { id: newSessionId, lastActivity: currentTime },
      {
        maxAge: SESSION_DURATION,
      }
    );
    req.sessionId = { id: newSessionId, lastActivity: currentTime };
  } else {
    console.log("SessionId cookie attached. Id: ", sessionId.id);
    // Update last activity time
    sessionId.lastActivity = currentTime;
    res.cookie("sessionId", sessionId, {
      maxAge: SESSION_DURATION,
    });
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
