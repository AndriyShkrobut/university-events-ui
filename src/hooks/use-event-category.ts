import { useContext } from "react";
import EventCategoryContext, { EventCategoryContextType } from "context/event-category.context";

function useEventCategory(): EventCategoryContextType {
  return useContext(EventCategoryContext);
}

export default useEventCategory;
