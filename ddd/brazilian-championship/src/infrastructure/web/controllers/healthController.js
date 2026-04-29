export class HealthController {
  register(app) {
    app.get("/health", (req, res) => {
      res.json({ status: "ok" });
    });
  }
}
