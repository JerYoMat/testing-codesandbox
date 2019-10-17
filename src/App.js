import React, { useState } from "react";
import Dropdown from "./Dropdown";
import sampleSearches from "./sample_data/sampleSearches";

const App = () => {
  const [selection, setSelection] = useState({
    id: 148,
    name: "Spotfront - VP of Product",
    outreach_email:
      "stagingoutreach-W8B+A95YN892GqnZseVuu3AVSnBh@connect.thrivetrm.com"
  });

  return (
    <>
      <Dropdown
        selectedOption={selection}
        options={sampleSearches}
        onChange={setSelection}
      />
      <h1>BLAh BLAH BLAH</h1>
    </>
  );
};

export default App;
