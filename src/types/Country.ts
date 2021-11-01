// only added stuff that I will use
export interface Country {
  name: {
    common: string;
    official: string;
  };
  nativeName: string;
  flags: {
    png: string;
    svg: string;
  };

  /**
   * @see [https://en.wikipedia.org/wiki/International_Olympic_Committee](https://en.wikipedia.org/wiki/International_Olympic_Committee)
   */
  cioc: string;
}
