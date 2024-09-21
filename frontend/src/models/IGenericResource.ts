export interface IGenericResource<T, O = undefined> {
  data: T | null;
  fetchData: O extends undefined
    ? () => Promise<unknown>
    : (options: O) => Promise<unknown>;
  loading: boolean;
  revalidate: () => void;
}
