import withPrepareValueProp from "../../hocs/withPrepareValueProp";
import withGetItems from "../../hocs/withGetItems";
import Autocomplete from "./Autocomplete";

export default withPrepareValueProp(withGetItems(Autocomplete));
