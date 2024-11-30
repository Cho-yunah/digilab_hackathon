import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Selector() {
  return (
    <Select>
      <SelectTrigger className="w-[110px]">
        <SelectValue defaultValue={'location'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="location">거리순</SelectItem>
          <SelectItem value="banana">편의순</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Selector;
