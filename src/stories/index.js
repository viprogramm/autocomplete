import React from "react";

import { storiesOf } from "@storybook/react";
import Demo from "./Demo";
import Demo2 from "./Demo2";
import Demo3 from "./Demo3";

storiesOf("Autocomplete", module)
  .add("simplie", () => <Demo />)
  .add("with custom item render", () => <Demo2 />)
  .add("with custom value component", () => <Demo3 />);
