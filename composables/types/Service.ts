export interface ServiceContent {
  image: string;
  anchor: string;
  type: string;
  title: string;
  description: string;
  isSupportText?: boolean;
}

export interface Service {
  id: number;
  title: string;
  contents: ServiceContent[];
}