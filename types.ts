
export interface Poet {
  id: string;
  name: string;
  englishName: string;
  bio: string;
  image: string;
  century: string;
}

export interface Poem {
  id: string;
  poetId: string;
  title: string;
  verses: string[][]; // Array of couplets (misra)
  type: 'ghazal' | 'rubaie' | 'masnavi' | 'qasida';
}

export interface Interpretation {
  meaning: string;
  moral: string;
  context: string;
}
