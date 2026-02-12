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
      },

      {
        type: "game",
        mode: "memorie",
      },
    ],
  },
  lost: {
    id: "lost",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Leider verloren",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Geb dir mal Mühe, um Gottes Willen",
        next: { chapter: "chapterTwo", scene: "the_beginning_2" },
      },
    ],
  },

  win: {
    id: "win",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Gute Arbeit! Ich bin beeindruckt!",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Viele wären daran gescheitert!",
        next: { chapter: "chapterTwo", scene: "the_beginning_2" },
      },
    ],
  },

  the_beginning_2: {
    id: "the_beginning_2",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Wir sind fast am Ende angelangt, geehrter Spieler!",
        next: { chapter: "lastChapter", scene: "the_ending" },
      },
    ],
  },
};
