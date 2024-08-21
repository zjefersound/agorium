import { MdOutlineEdit } from "react-icons/md";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <div className="flex flex-1 flex-col bg-agorium-900 text-agorium-50 overflow-auto">
      {/* <SmartFieldExamples /> */}
      <div className="p-4 space-y-4">
        <Button color="primary">
          <MdOutlineEdit className="size-6 mr-2" /> Example
        </Button>
        <Button color="secondary">
          <MdOutlineEdit className="size-6 mr-2" />
          Example
        </Button>
        <Button color="primary" size="sm">
          <MdOutlineEdit className="size-5 mr-2" /> Edit
        </Button>
        <Button color="secondary" size="sm">
          <MdOutlineEdit className="size-5 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  );
}

export default App;
