export interface Podcast {
  category: {
    attributes: {
      'im:id': string;
      term: string;
      label: string;
    };
  };
  id: {
    attributes: {
      'im:id': string;
    };
    label: string;
  };
  ['im:artist']: {
    attributes: {
      href: string;
    };
    label: string;
  };
  ['im:image']: [
    {
      attributes: {
        height: string;
      };
      label: string;
    }
  ];
  ['im:name']: {
    label: string;
  };
  ['im:price']: {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  ['im:releaseDate']: {
    label: string;
    attributes: {
      label: string;
    };
  };
  link: {
    attributes: {
      href: string;
      rel: string;
      type: string;
    };
  };
  rights: {
    label: string;
  };
  summary: {
    label: string;
  };
  title: {
    label: string;
  };
}

export interface Episode {
  artistIds: number[];
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl160: string;
  artworkUrl600: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  description: string;
  episodeContentType: string;
  episodeFileExtension: string;
  episodeGuid: string;
  episodeUrl: string;
  feedUrl: string;
  genres: { name: string; id: string }[];
  kind: string;
  previewUrl: string;
  releaseDate: string;
  shortDescription: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}
