export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

type nullAble<Type> = Type | null;

export interface IEditePhoto {
  id: nullAble<number>;
  title: string;
  thumbnailUrl: string | ArrayBuffer;
}
