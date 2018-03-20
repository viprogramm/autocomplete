import React from "react";

import { storiesOf } from "@storybook/react";
import Demo from "./Demo";
import Demo2 from "./Demo2";

storiesOf("Autocomplete", module)
  .add("simplie", () => <Demo />)
  .add("with custom item render", () => <Demo2 />);
