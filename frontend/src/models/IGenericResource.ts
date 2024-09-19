export interface IGenericResource<T, O = unknown> {
  data: T | null;
  fetchData: (options?: O) => Promise<unknown>;
  loading: boolean;
  revalidate: () => void;
}
