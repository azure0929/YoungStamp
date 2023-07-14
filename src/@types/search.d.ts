/** 설명 */
declare interface FoodItem {
  id: number;
  DESC_KOR: string;
  NUTR_CONT1: number;
  NUTR_CONT2: number;
  NUTR_CONT3: number;
  NUTR_CONT4: number;
  NUTR_CONT5: number;
  NUTR_CONT6: number;
  SERVING_WT: number;
}

/** 설명 */
declare interface Item {
  id: number;
  title: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugar: number;
  sodium: number;
  serving: number;
}

/** 설명 */
declare interface SearchPagingProps {
  page: number;
  count: number;
  setPage: (page: number) => void;
}

/** 설명 */
declare interface FoodContextType {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

/** 설명 */
declare interface FoodAddContextType {
  /** 설명 */
  addFoodItem: {
    id: number;
    title: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    sugar: number;
    sodium: number;
    serving: number;
  };
  /** 설명 */
  setAddFoodItem: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
      sugar: number;
      sodium: number;
      serving: number;
    }>
  >;
}

/** 설명 */
declare interface FoodDelContextProps {
  delFoodItem: number;
  setDelFoodItem: Dispatch<SetStateAction<number>>;
}

/** 적절한 타입값 찾을때까지 any 타입 사용 */
declare type FoodAddsContext = any;

/** 적절한 타입값 찾을때까지 any 타입 사용 */
declare type FoodDelsContext = any;
