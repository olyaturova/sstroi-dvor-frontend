export { Filter } from './ui/filter';
export { AllCategories } from './ui/AllCategories';
export { setCategory, resetCategory } from './model/categoryFilterSlice';
export { 
    selectSelectedCategory, 
    selectIsCategoryActive, 
    selectHasActiveFilter 
} from './lib/selectors';

export { setCategory as filterCategory } from './model/categoryFilterSlice';
export { selectSelectedCategory as getSelectedCategory } from './lib/selectors';