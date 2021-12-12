import React, { useCallback, useState } from "react";

import { IEventCategory } from "../interfaces/event-category.interface";
import eventCategoryApi from "../api/event-category.api";
import EventCategoryContext from "context/event-category.context";

const EventCategoryProvider: React.FC = ({ children }) => {
  const [eventCategories, setEventCategories] = useState<IEventCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllEventCategories = useCallback((): Promise<IEventCategory[]> => {
    setIsLoading(true);

    return eventCategoryApi
      .getAll()
      .then((response) => {
        const { data } = response;

        setEventCategories(data);
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = { eventCategories, getAllEventCategories, isLoading };

  return <EventCategoryContext.Provider value={value}>{children}</EventCategoryContext.Provider>;
};

export default EventCategoryProvider;
