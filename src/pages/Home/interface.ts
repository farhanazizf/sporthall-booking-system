export type CategoryTypes =
  | "BASKETBALL"
  | "FUTSAL"
  | "MINSOC"
  | "BADMINTON"
  | "FOOTBALL";

export type FilterTypes = {
  limit: number;
  page: number;
  offset: number;
};

export interface IArena {
  id: string;
  name: string;
  category: CategoryTypes;
  image: string | null;
  city: string;
}

export interface IResponseArenaList {
  data: IArena[];
  meta: { total: number };
}
