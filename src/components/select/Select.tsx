import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Selector() {
  return (
    <Select>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder="거리순" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="location">거리순</SelectItem>
        <SelectItem value="convinence">편의순</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Selector;
