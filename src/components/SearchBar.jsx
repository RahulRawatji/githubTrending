import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useStore } from "@/store/store";


export default function SearchBar({ filterText }) {

  const { sortRepoData } = useStore(state=>state);

  function deBouncInput() {
    let timer = null;
    return function (e) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        filterText(e.target.value)
      }, 1000)
    }
  }

  const inpuTextHandler = deBouncInput();

  return <div className="flex px-2 mx-2 mb-6 gap-3 mt-3">
    <Input onChange={(e) => inpuTextHandler(e)} placeholder="Search Repository" className="border rounded-md w-full px-1 py-2" />
    <Select onValueChange={sortRepoData}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="stars">Most Stars</SelectItem>
          <SelectItem value="recent">Recently Updated</SelectItem>
          <SelectItem value="char">Alphabet [A-Z]</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
}