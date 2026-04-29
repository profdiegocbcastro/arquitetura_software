import { serializeEvent } from "../presenters/serializers.js";

export class EventController {
  constructor({ listEvents, createEvent, findEvent, updateEvent, deleteEvent }) {
    this.listEvents = listEvents;
    this.createEvent = createEvent;
    this.findEvent = findEvent;
    this.updateEvent = updateEvent;
    this.deleteEvent = deleteEvent;
  }

  register(app) {
    app.get("/championships/:championshipId/matches/:matchId/events", (req, res) => {
      const events = this.listEvents.execute(req.params.championshipId, req.params.matchId);

      res.json(events.map(serializeEvent));
    });

    app.post("/championships/:championshipId/matches/:matchId/events", (req, res) => {
      const event = this.createEvent.execute(req.params.championshipId, req.params.matchId, req.body);

      res.status(201).json(serializeEvent(event));
    });

    app.get("/championships/:championshipId/matches/:matchId/events/:eventId", (req, res) => {
      const event = this.findEvent.execute(
        req.params.championshipId,
        req.params.matchId,
        req.params.eventId
      );

      res.json(serializeEvent(event));
    });

    app.put("/championships/:championshipId/matches/:matchId/events/:eventId", (req, res) => {
      const event = this.updateEvent.execute(
        req.params.championshipId,
        req.params.matchId,
        req.params.eventId,
        req.body
      );

      res.json(serializeEvent(event));
    });

    app.delete("/championships/:championshipId/matches/:matchId/events/:eventId", (req, res) => {
      this.deleteEvent.execute(req.params.championshipId, req.params.matchId, req.params.eventId);

      res.status(204).send();
    });
  }
}
