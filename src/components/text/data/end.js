const narrator = "Erzähler";

export const end = {
    ending: {
        id: "ending",
      steps: [
        {
          speaker: narrator,
          text: "Jetzt folgen die Credits...",
        },
      ],
      next: {chapter: "exit", scene: "close"},
    },
  }
 