const narrator = "Erzähler";

export const end = {
  ending: {
    id: "ending",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Das ist das Ende unserer Reise...",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Ich hoffe doch, dass diese Geschichte dir gefallen hat!",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Abschluss: Zur Endszene",
        next: {chapter: "exit", scene: "close"},
      },
    ],
  },
};
