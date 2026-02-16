const narrator = "Erzähler";
const mainCharacter = "AJ"

export const chapterOne = {
  path_life_continue_1: {
    id: "path_life_continue_1",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: `Eine lange und schlaflose Nacht verging für ihn.`,
        pic: { background: "none"}
      },
      {
        type: "text",
        speaker: narrator,
        text: `Nur schwer konnte ${mainCharacter} die Augen öffnen`,
      },
 {
        type: "text",
        speaker: mainCharacter,
        text: `Ah...`,
        pic: {background: "beach-tent-day", protagonist: "none"}
      },
 {
        type: "text",
        speaker: narrator,
        text: `Langsam kam er aus dem Zelt, streckte und reckte sich einmal als das Sonnenlicht seine Augen zusammen zucken lies.`,
      },

 {
        type: "text",
        speaker: mainCharacter,
        text: `"Gähn." Bin ich etwa immernoch hier?`,
        pic: {protagonist: "thinking"}
      },
 {
        type: "text",
        speaker: mainCharacter,
        text: `Also war das doch kein einfacher Traum...`,
        pic: { protagonist: "reflect"}
      },
      {
        type: "text",
        speaker: narrator,
        text: `Blickte einmal aufs Wasser für einige Sekunden und atmete tief ein und aus.`,
      },

      // Fehlt nocht Text hier















      // Fehlt nocht Text hier
      {
        type: "game",
        mode: "number",
      },
    ],
  },


wrong_answer:{
 id: "wrong_answer",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Leider die falsche Antwort!",
          next: { chapter: "chapterOne", scene: "path_life_continue_2" },
      },
    ]
} ,


right_answer:{
 id: "right_answer",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Richtige Antwort!",
          next: { chapter: "chapterOne", scene: "path_life_continue_2" },
      },
    ]
} ,


  path_life_continue_2: {
    id: "path_life_continue_2",
    steps: [
      {
        type: "text",
        speaker: narrator,
        text: "Es kommt noch Text...",
      },
      {
        type: "choice",
        options: [
          {
            text: "Weiter...",
            next: { chapter: "chapterTwo", scene: "the_beginning_1" },
          },
          {
            text: "Zum Ende springen",
            next: { chapter: "end", scene: "ending" },
          },
        ],
      },
    ],
  },
};
