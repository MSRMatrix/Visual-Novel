const narrator = "Erzähler";

export const chapterOne = {
    path_life_continue_1: {
        id: "path_life_continue_1",
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
      next: {chapter: "chapterOne", scene: "path_life_continue_2"},
    },

    path_life_continue_2: {
        id: "path_life_continue_2",
      steps: [
        {
          speaker: narrator,
          text: "Irgendwas zum auffüllen...",
        },
         {
          speaker: narrator,
          text: "Es kommt nocht Text...",
        },
      ],
      next: {chapter: "chapterTwo", scene: "the_beginning_1"},
    },
  }
 