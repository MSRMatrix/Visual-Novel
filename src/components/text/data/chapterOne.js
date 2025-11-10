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
     game: 
      { 
        speaker: narrator,
        text: "An welche Zahl denke ich gerade?",
        mode: "number",
        next: { chapter: "chapterOne", scene: "path_life_continue_2" },
      },
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

      choices: 
         [
      {
        text: "Weiter...",
        next: { chapter: "chapterOne", scene: "path_life_continue_2" },
      },
      {
        text: "Zum Ende springe",
        next: { chapter: "end", scene: "ending" },
      },
    ],
      next: {chapter: "chapterTwo", scene: "the_beginning_1"},
    },
  }
 