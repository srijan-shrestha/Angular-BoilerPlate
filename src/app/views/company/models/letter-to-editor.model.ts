export class LetterToEditorModel {
  id: string;
  viewers: Array<{
    viewer: {
      id: number,
      fullName: string,
      profilePic: any
    }
  }>;
  createdAt: Date;
  title: string;
  content: string;
  quarter: string;
  year: string;
  user: {
    id: number,
    fullName: string,
    profilePic: any
  };

  constructor(
    id: string,
    viewers: Array<{
      viewer: {
        id: number,
        fullName: string,
        profilePic: any
      }
    }>,
    createdAt: Date,
    title: string,
    content: string,
    quarter: string,
    year: string,
    user: {
      id: number,
      fullName: string,
      profilePic: any
    }
  ) {
    this.id = id;
    this.viewers = viewers;
    this.createdAt = new Date(createdAt);
    this.title = title;
    this.content = content;
    this.quarter = quarter;
    this.year = year;
    this.user = user;
  }

  static adapt(item: any): LetterToEditorModel {
    return new LetterToEditorModel(
      item.id,
      item.viewers,
      item.createdAt,
      item.title,
      item.content,
      item.quarter,
      item.year,
      item.user
    );
  }
}
