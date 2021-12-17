import React from "react";
import { ICreateEventPayload, IEvent, IUpdateEventPayload } from "../interfaces/event.interface";

export type EventContextType = {
  events: IEvent[];
  isLoading: boolean;
  getAllEvents(): Promise<IEvent[]>;
  getEventById(id: number): Promise<IEvent>;
  createEvent(payload: ICreateEventPayload): Promise<IEvent>;
  updateEvent(id: number, payload: IUpdateEventPayload): Promise<IEvent>;
  deleteEvent(id: number): Promise<IEvent>;
  visitEvent(id: number): Promise<void>;
  unVisitEvent(id: number): Promise<void>;
};

const EventContext = React.createContext<EventContextType>({} as EventContextType);

export default EventContext;
