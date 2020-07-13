import { SortService } from '../_services/sort.service';
import { SortableTableDirective } from './sort-table.directive';

describe('SortTableDirective', () => {
  it('should create an instance', () => {
    const directive = new SortableTableDirective(new SortService);
    expect(directive).toBeTruthy();
  });
});
