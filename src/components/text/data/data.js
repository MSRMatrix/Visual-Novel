const narrator = "Erzähler";

export const story = {
  prolog: {
    intro: {
      id: "intro",
      steps: [
        {
          speaker: narrator,
          text: "Willkommen, Spieler! Was möchtest du heute spielen?",
        },
      ],
      choices: [
        {
          text: "Eine heroische Geschichte voller Abenteuer!",
          next: {chapter: "prolog", scene: "choice_fail"},
        },
        { text: "Eine ruhige Geschichte über das Leben.", next: {chapter: "prolog", scene: "path_life"} },
      ],
    },

    choice_fail: {
      id: "choice_fail",
      steps: [
        {
          speaker: narrator,
          sfx: "paper_flip.mp3",
          text: "Ups... hab das Script verlegt...",
        },
        {
          speaker: narrator,
          text: "Dann nehmen wir einfach den anderen Storyteil!",
        },
      ],
      next: {chapter: "prolog", scene: "path_life"},
    },

    path_life: {
      id: "path_life",
      steps: [
        {
          speaker: narrator,
          text: "Also gut... eine ruhige Geschichte über das Leben.",
        },
        {
          speaker: narrator,
          text: "Hm, wo fangen wir an?",
        },
        {
          speaker: narrator,
          text: "Ah, richtig. Bei dir.",
        },
        {
          speaker: narrator,
          text: "Kapitel Ende",
        },
      ],
      next: {chapter: "chapterOne", scene: "path_life_continue"},
    },
  },

  chapterOne: {
    path_life_continue: {
        id: "path_life_continue",
      steps: [
        {
          speaker: narrator,
          text: "Noch gibt es keinen Text...",
        },
         {
          speaker: narrator,
          text: "Sei nicht traurig...",
        },
      ],
      next: {chapter: "chapterOne", scene: "example"},
    },
  },
};
