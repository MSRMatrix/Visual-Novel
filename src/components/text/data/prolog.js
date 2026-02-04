const narrator = "Erzähler";
const mainCharacter = "AJ"

export const prolog = {
  intro: {
    id: "intro",
    steps: [
      {
        type: "text",
        speaker: "???",
        text: "...",
      },
      {
        type: "text",
        speaker: "???",
        text: "Wo bin ich?",
      },
      {
        type: "text",
        speaker: narrator,
        text: "Unser junger Hauptcharakter öffnete langsam seine Augen... Er lag noch schwer im Sand und richtete seinen Oberkörper auf.",
      },
      {
        type: "text",
        speaker: "???",
        text: "Was zum...?",
      },
{
        type: "text",
        speaker: narrator,
        text: "Vor ihm tat sich eine wunderschöne und mysteriöse Insel auf. Langsam richtete er sich auf und versuchte einen klaren Kopf zu bekommen.",
        pic: { background: "island"}
      },
      {
        type: "text",
        speaker: "???",
        text: "Was ein abgefahrener Ort...",
        pic: { protagonist: "thinking"}
      },


        {
        type: "text",
        speaker: narrator,
        text: `Das ist ${mainCharacter}. Ein junger aufstrebender Sportler.`,
      },
{
        type: "text",
        speaker: mainCharacter,
        text: `Verdammt... Ich träume wiedermal zuviel...`,
        pic: { protagonist: "reflect"}
      },
{
        type: "text",
        speaker: mainCharacter,
        text: `Bevor ich hier Wurzeln schlage, sollte ich weitergehen...`,
        pic: { protagonist: "thinking"}
      },
       {
        type: "text",
        speaker: narrator,
        text: `So fing der junge Mann an langsam am Strand zu spazieren.`,
        pic: { background: "beachDay", protagonist: "none" }
      },
      {
        type: "text",
        speaker: mainCharacter,
        text: `Diese Insel ist so schön...`,
        pic: { protagonist: "walking"}
      },

// Fehlt noch was



// Fehlt noch was
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
