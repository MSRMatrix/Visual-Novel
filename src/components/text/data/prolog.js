const narrator = "Erzähler";

export const prolog = {
  intro: {
    id: "intro",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Was? Wo bin ich? Ach ja...",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Heute ist es soweit! Bist du auch aufgeregt?",
      },
      {
        type: "text",
        speaker: narrator,
        text: "... du redest wohl nicht viel, oder?",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Also dann... Was möchtest du heute spielen?",
      },
      {
        type: "choice",
        options: [
          {
            text: "Eine heroische Geschichte voller Abenteuer!",
            next: { chapter: "prolog", scene: "choice_fail" },
          },
          {
            text: "Eine ruhige Geschichte über das Leben.",
            next: { chapter: "prolog", scene: "path_life" },
          },
        ],
      },
    ],
  },

  choice_fail: {
    id: "choice_fail",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Bereit für ein spannendes Abenteuer? Dann legen wir mal los!",
      },
      {
        type: "text",
        speaker: narrator,
        text: "...",
      },
      {
        type: "text",
        speaker: narrator,
        sfx: "paper_flip.mp3",
        text: "Ups... hab das Script verlegt...",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Dann nehmen wir einfach den anderen Storyteil!",
        next: { chapter: "prolog", scene: "path_life" },
      },
    ],
  },

  path_life: {
    id: "path_life",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Also gut... eine ruhige Geschichte über das Leben.",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Hm, wo fangen wir an?",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Ah, richtig. Bei dir.",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Kapitel Ende.",
        next: { chapter: "chapterOne", scene: "path_life_continue_1" },
      },
    ],
  },
};
