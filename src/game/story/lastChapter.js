const narrator = "Erzähler";

export const lastChapter = {
  the_ending: {
    id: "the_ending",
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
        text: "Abschluss",
        next: { chapter: "end", scene: "ending" },
      },
    ],
  },
};
