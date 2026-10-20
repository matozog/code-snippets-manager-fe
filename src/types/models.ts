export interface ICodeSnippet {
  idSnippet?: number;
  name: string;
  description: string;
  content: string;
  favorite: boolean;
  programmingLanguage: string | null;
  type: string;
  addedFrom: string;
  // assigned by the server (ISO date-time)
  addedDate?: string;
  tags: Array<ITag>;
  img?: string;
}

export const defaultCodeSnippet: ICodeSnippet = {
  name: '',
  description: '',
  content: '',
  favorite: false,
  programmingLanguage: null,
  type: '',
  addedFrom: '',
  tags: [],
};

export interface ITag {
  idTag?: number;
  name: string;
  addedDate?: string;
}
