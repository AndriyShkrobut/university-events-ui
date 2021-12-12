import React from "react";
import { IEventCategory } from "interfaces/event-category.interface";

export type EventCategoryContextType = {
  eventCategories: IEventCategory[];
  isLoading: boolean;
  getAllEventCategories(): Promise<IEventCategory[]>;
};

const EventCategoryContext = React.createContext<EventCategoryContextType>(
  {} as EventCategoryContextType
);

export default EventCategoryContext;
