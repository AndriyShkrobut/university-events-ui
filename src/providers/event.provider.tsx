import React, { useCallback, useState } from "react";

import eventApi from "api/event.api";
import EventContext from "context/event.context";
import { ICreateEventPayload, IEvent, IUpdateEventPayload } from "interfaces/event.interface";

const EventProvider: React.FC = ({ children }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllEvents = useCallback((): Promise<IEvent[]> => {
    setIsLoading(true);

    return eventApi
      .getAll()
      .then((response) => {
        const { data } = response;

        setEvents(data);
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getEventById = useCallback((id: number) => {
    return eventApi.getOne(id).then((response) => {
      const { data } = response;
      return data;
    });
  }, []);

  const createEvent = useCallback((payload: ICreateEventPayload) => {
    return eventApi.create(payload).then((response) => {
      const { data } = response;

      setEvents((prevState) => [...prevState, data]);
      return data;
    });
  }, []);

  const updateEvent = useCallback((id: number, payload: IUpdateEventPayload) => {
    return eventApi.update(id, payload).then((response) => {
      const { data } = response;

      setEvents((prevState) => prevState.map((item) => (item.id === id ? data : item)));
      return data;
    });
  }, []);

  const deleteEvent = useCallback((id: number) => {
    return eventApi.delete(id).then((response) => {
      const { data } = response;
      setEvents((prevState) => prevState.filter((item) => item.id !== id));
      return data;
    });
  }, []);

  const value = {
    events,
    isLoading,
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export default EventProvider;
