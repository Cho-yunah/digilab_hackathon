import { Map } from '@/components/map/Map';
import CategoryButtonBox from '@/components/filter/CategoryButtonBox';
import { Filter } from 'lucide-react';
import { Select } from '@/components/ui/select';
import Selector from '@/components/select/Select';

const HomePage = () => {
  return (
    <div className="relative">
      <Map />
      <Selector />
    </div>
  );
};

export default HomePage;
