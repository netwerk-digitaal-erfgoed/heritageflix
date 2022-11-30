declare interface Intro {
  title: String,
  description: String,
  footer: String
};

declare interface Branding {
  name: string,
  logo: string,
  intro: Intro
};
