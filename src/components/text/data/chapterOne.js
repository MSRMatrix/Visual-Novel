const narrator = "Erzähler";

export const chapterOne = {
  path_life_continue_1: {
    id: "path_life_continue_1",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Noch gibt es keinen Text...",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Sei nicht traurig...",
      },
      {
        type: "game",
        speaker: narrator,
        text: "An welche Zahl denke ich gerade?",
        mode: "number",
        next: { chapter: "chapterOne", scene: "path_life_continue_2" },
      },
    ],
  },

  path_life_continue_2: {
    id: "path_life_continue_2",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Irgendwas zum Auffüllen...",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Es kommt noch Text...",
      },
      {
        type: "choice",
        options: [
          {
            text: "Weiter...",
            next: { chapter: "chapterTwo", scene: "the_beginning_1" },
          },
          {
            text: "Zum Ende springen",
            next: { chapter: "end", scene: "ending" },
          },
        ],
      },
    ],
  },
};
