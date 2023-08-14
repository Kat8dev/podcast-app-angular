export interface Podcast {
  category: any,
  id: {
    attributes: {
      'im:id': string;
    },
    label: string,
  },
  ['im:artist']: {
    attributes: {
      href: string
    },
    label: string,
  },
  ['im:image']: [
    {
      attributes: {
        height: string,
      },
      label: string,
    },
  ],
  ['im:name']: {
    label: string,
  },
  ['im:price']: any,
  ['im:releaseDate']: any,
  link: {
    attributes: {
      href: string,
      rel: string,
      type: string,
    },
  },
  rights: any,
  summary: any,
  title: any,
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
}
