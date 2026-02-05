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
      {
        type: "text",
        speaker: mainCharacter,
        text: `Doch wo soll ich hin? Hier ist keine Menschenseele.`,
        pic: { protagonist: "walking"}
      },
      {
        type: "text",
        speaker: mainCharacter,
        text: `Ich könnte in den Wald gehen... Vielleicht sich dort jemand.`,
        pic: { protagonist: "walking"}
      },

      {
        type: "choice",
        options: [
          {
            text: "In den Wald gehen",
            next: { chapter: "prolog", scene: "choice_fail" },
          },
          {
            text: "Am Strand bleiben",
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
        text: `AJ entschliesst sich in den Wald zu schreiten.`,
        pic: { protagonist: "none", background: "forest"}
      },
     {
        type: "text",
        speaker: mainCharacter,
        text: `Ganz schön dunkel hier...`,
        pic: { protagonist: "thinking"}
      },
{
        type: "text",
        speaker: mainCharacter,
        text: `Moment... Was ist denn das?`,
      },
{
        type: "text",
        speaker: narrator,
        text: `Mitten im tiefen Wald findet er eine Art Bunkertür.`,
        pic: {background: "forest-door"}
      },
// Fehlt noch was

// Fehlt noch was
      {
        type: "text",
        speaker: narrator,
        text: "Er kehrt zurück zum Strand",
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
