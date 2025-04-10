import RadionButtonFilter from "./RadioButton/RadionButtonFilter";
import CalendarFilter from "./CalendarFilter";
import SearchTextFilter from "./SearchTextFilter";
import { valuePair } from "@/src/Interfaces/valuePair";
import PRIORITY from "../../Enums/Priority";
import STATUS from "../../Enums/Status";
import React from "react";
interface prop {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setInterval: React.Dispatch<React.SetStateAction<valuePair>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
const FilterPanelDependency = ({
  setPriority,
  setInterval,
  setSearchText,
}: prop) => {
  return (
    <div className="resp-table-body">
      <div className="resp-table-row ">
        <div className="table-body-cell">
          <RadionButtonFilter
            setFunction={setPriority}
            buttonsProperty={[
              { label: PRIORITY.HIGH, value: PRIORITY.HIGH },
              { label: PRIORITY.MEDIUM, value: PRIORITY.MEDIUM },
              { label: PRIORITY.LOW, value: PRIORITY.LOW },
            ]}
          />
        </div>

        <div className="table-body-cell">
          <CalendarFilter setFunction={setInterval} />
        </div>

        <div className="table-body-cell">
          <SearchTextFilter setFunction={setSearchText} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterPanelDependency);
