export class Layout {
  id: number;
  title: string;
  image: string;
  code: string;

  constructor(
    id ?: number,
    title ?: string,
    image ?: string,
    code ?: string,
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.code = code;
  }

  static adapt(item: any): Layout {
    return new Layout(
      item.id,
      item.title,
      item.image,
      item.code,
    );
  }
}
