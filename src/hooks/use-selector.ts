import { MySlice } from "../utils/state-manager";
import { useEffect, useState } from "react";

export default function useSelector(
  slice: MySlice<any>,
  selector: (state: any) => any,
) {

  const [selectedState, setSelectedState] = useState(
    selector(slice.getState()),
  );

  useEffect(() => {
    const handleChange = () => {
      console.log("handlechange", slice.getState());

      setSelectedState(selector(slice.getState()));
    };

    slice.subscribe(handleChange);

    return () => {
      slice.unsubscribe(handleChange);
    };
  }, [slice, selector]);

  return selectedState;
}
