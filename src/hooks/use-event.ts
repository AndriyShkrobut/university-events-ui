import { useContext } from "react";
import EventContext, { EventContextType } from "context/event.context";

function useEvent(): EventContextType {
  return useContext(EventContext);
}

export default useEvent;
