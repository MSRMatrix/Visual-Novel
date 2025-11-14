const narrator = "Erzähler";

export const chapterTwo = {
  the_beginning_1: {
    id: "the_beginning_1",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Das zweite Kapitel!",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Die Spannung steigt!",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Kapitelende: Weiter zum letzten Kapitel",
        // next: { chapter: "lastChapter", scene: "the_ending" },
      },

       {
        type: "game",
        mode: "memorie",
      },
    ],
  },
};
